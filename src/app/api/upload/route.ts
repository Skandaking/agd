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
  'documents', // Added for document uploads
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

    // Validate file type based on folder
    let allowedTypes: string[];
    let maxSize: number;
    let resourceType: 'image' | 'raw' = 'image';

    if (folder === 'documents') {
      // Allow document types for documents folder
      allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
        'text/plain'
      ];
      maxSize = 20 * 1024 * 1024; // 20MB for documents
      resourceType = 'raw'; // Use 'raw' for non-image files in Cloudinary
    } else {
      // Default to images for other folders
      allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      maxSize = 5 * 1024 * 1024; // 5MB for images
      resourceType = 'image';
    }

    if (!allowedTypes.includes(file.type)) {
      const fileTypeLabel = folder === 'documents' ? 'documents (PDF, Word, Excel, CSV, Text)' : 'images';
      return NextResponse.json(
        { success: false, error: `Invalid file type. Only ${fileTypeLabel} are allowed.` },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > maxSize) {
      const sizeLabel = folder === 'documents' ? '20MB' : '5MB';
      return NextResponse.json(
        { success: false, error: `File too large. Maximum size is ${sizeLabel}.` },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Always save documents locally, use Cloudinary only for images
    if (folder === 'documents') {
      // Force local storage for documents
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
      return NextResponse.json({ 
        success: true, 
        url: publicUrl, 
        provider: 'local', 
        folder,
        file_name: file.name,
        file_size: file.size,
        file_mime: file.type
      });
    }

    // Use Cloudinary for images when credentials exist
    if (hasCloudinaryCreds) {
      const root = process.env.CLOUDINARY_UPLOAD_ROOT || 'agd';
      const folderPath = `${root}/${folder}`;

      type CloudinaryUploadResult = { secure_url: string; public_id: string };
      const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { folder: folderPath, resource_type: resourceType },
          (error: unknown, res: unknown) => (error ? reject(error as Error) : resolve(res as CloudinaryUploadResult))
        );
        upload.end(buffer);
      });
      return NextResponse.json({ 
        success: true, 
        url: result.secure_url, 
        public_id: result.public_id, 
        provider: 'cloudinary',
        file_name: file.name,
        file_size: file.size,
        file_mime: file.type
      });
    }

    // Fallback: save locally for images when Cloudinary is not available
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
    return NextResponse.json({ 
      success: true, 
      url: publicUrl, 
      provider: 'local', 
      folder,
      file_name: file.name,
      file_size: file.size,
      file_mime: file.type
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    );
  }
} 