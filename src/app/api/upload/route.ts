import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { v2 as cloudinary } from 'cloudinary';

// Allowed logical folders per content type
const allowedFolders = [
  'news',
  'gallery',
  'publications',
  'events',
  'press-releases',
  'avatars',
];

// Configure Cloudinary if credentials are provided
const hasCloudinaryCreds = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (hasCloudinaryCreds) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const requestedFolder = (formData.get('folder') as string | null)?.toString().trim().toLowerCase() || '';
    const folder = allowedFolders.includes(requestedFolder) ? requestedFolder : 'news';
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Prefer Cloudinary when credentials exist
    if (hasCloudinaryCreds) {
      const root = process.env.CLOUDINARY_UPLOAD_ROOT || 'agd';
      const folderPath = `${root}/${folder}`;

      type CloudinaryUploadResult = { secure_url: string; public_id: string };
      const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { folder: folderPath, resource_type: 'image' },
          (error: unknown, res: unknown) => (error ? reject(error as Error) : resolve(res as CloudinaryUploadResult))
        );
        upload.end(buffer);
      });
      return NextResponse.json({ success: true, url: result.secure_url, public_id: result.public_id, provider: 'cloudinary' });
    }

    // Fallback: save locally
    const uploadsDir = join(process.cwd(), 'public', 'uploads', folder);
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}_${originalName}`;
    const filePath = join(uploadsDir, fileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${folder}/${fileName}`;
    return NextResponse.json({ success: true, url: publicUrl, provider: 'local', folder });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    );
  }
} 