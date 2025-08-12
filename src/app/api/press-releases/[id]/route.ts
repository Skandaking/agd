import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQuerySingle } from '@/lib/database';
import { getCurrentUserId } from '@/lib/auth-utils';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

interface DatabasePressRelease {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  created_by: number;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
  views: number;
  featured: boolean;
  slug: string | null;
  meta_title: string | null;
  meta_description: string | null;
  tags: string | null;
  image_url: string | null;
  reading_time_minutes: number;
  updated_by: number;
  created_by_name?: string;
  updated_by_name?: string;
}

// GET /api/press-releases/[id] - Fetch single press release
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const release = await executeQuerySingle<DatabasePressRelease>(`
      SELECT 
        pr.*,
        u1.full_name as created_by_name,
        u2.full_name as updated_by_name
      FROM press_releases pr
      LEFT JOIN users u1 ON pr.created_by = u1.id
      LEFT JOIN users u2 ON pr.updated_by = u2.id
      WHERE pr.id = ?
    `, [id]);

    if (!release) {
      return NextResponse.json({
        success: false,
        error: 'Press release not found'
      }, { status: 404 });
    }

    // Transform to frontend format
    const transformedRelease = {
      id: release.id.toString(),
      title: release.title,
      excerpt: release.excerpt,
      content: release.content,
      category: release.category,
      status: release.status,
      author: release.author,
      publishedAt: release.published_at ? release.published_at.toISOString() : null,
      createdAt: release.created_at.toISOString(),
      updatedAt: release.updated_at.toISOString(),
      views: release.views,
      featured: Boolean(release.featured),
      slug: release.slug,
      meta_title: release.meta_title,
      meta_description: release.meta_description,
      tags: release.tags ? JSON.parse(release.tags) : [],
      image_url: release.image_url,
      reading_time_minutes: release.reading_time_minutes,
      created_by_name: release.created_by_name,
      updated_by_name: release.updated_by_name,
    };

    return NextResponse.json({
      success: true,
      item: transformedRelease
    });

  } catch (error) {
    console.error('Error fetching press release:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch press release'
    }, { status: 500 });
  }
}

// PUT /api/press-releases/[id] - Update press release
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      excerpt,
      content,
      category,
      status,
      author,
      featured,
      slug,
      meta_title,
      meta_description,
      tags,
      image_url,
      reading_time_minutes,
    } = body;

    // Get current user ID
    const userId = await getCurrentUserId();

    // Check if press release exists
    const existingRelease = await executeQuerySingle(
      'SELECT id FROM press_releases WHERE id = ?',
      [id]
    );

    if (!existingRelease) {
      return NextResponse.json({
        success: false,
        error: 'Press release not found'
      }, { status: 404 });
    }

    // Check if slug is unique (if provided and changed)
    if (slug) {
      const existingSlug = await executeQuerySingle(
        'SELECT id FROM press_releases WHERE slug = ? AND id != ?',
        [slug, id]
      );
      if (existingSlug) {
        return NextResponse.json({
          success: false,
          error: 'A press release with this slug already exists'
        }, { status: 400 });
      }
    }

    // Prepare tags as JSON string
    const tagsJson = tags && Array.isArray(tags) ? JSON.stringify(tags) : null;

    // Determine published_at based on status change
    const currentRelease = await executeQuerySingle<DatabasePressRelease>(
      'SELECT status, published_at FROM press_releases WHERE id = ?',
      [id]
    );

    let publishedAt = currentRelease?.published_at;
    if (status === 'published' && currentRelease?.status !== 'published') {
      publishedAt = new Date();
    } else if (status !== 'published') {
      publishedAt = null;
    }

    // Update press release
    const updateQuery = `
      UPDATE press_releases SET
        title = ?, excerpt = ?, content = ?, category = ?, status = ?, author = ?,
        published_at = ?, featured = ?, slug = ?, meta_title = ?,
        meta_description = ?, tags = ?, image_url = ?, reading_time_minutes = ?, updated_by = ?
      WHERE id = ?
    `;

    await executeQuery(updateQuery, [
      title,
      excerpt,
      content,
      category || 'announcement',
      status || 'draft',
      author,
      publishedAt,
      featured ? 1 : 0,
      slug,
      meta_title,
      meta_description,
      tagsJson,
      image_url,
      reading_time_minutes || 0,
      userId,
      id,
    ]);

    // Fetch the updated press release
    const updatedRelease = await executeQuerySingle<DatabasePressRelease>(`
      SELECT 
        pr.*,
        u1.full_name as created_by_name,
        u2.full_name as updated_by_name
      FROM press_releases pr
      LEFT JOIN users u1 ON pr.created_by = u1.id
      LEFT JOIN users u2 ON pr.updated_by = u2.id
      WHERE pr.id = ?
    `, [id]);

    if (!updatedRelease) {
      throw new Error('Failed to fetch updated press release');
    }

    // Transform to frontend format
    const transformedRelease = {
      id: updatedRelease.id.toString(),
      title: updatedRelease.title,
      excerpt: updatedRelease.excerpt,
      content: updatedRelease.content,
      category: updatedRelease.category,
      status: updatedRelease.status,
      author: updatedRelease.author,
      publishedAt: updatedRelease.published_at ? updatedRelease.published_at.toISOString() : null,
      createdAt: updatedRelease.created_at.toISOString(),
      updatedAt: updatedRelease.updated_at.toISOString(),
      views: updatedRelease.views,
      featured: Boolean(updatedRelease.featured),
      slug: updatedRelease.slug,
      meta_title: updatedRelease.meta_title,
      meta_description: updatedRelease.meta_description,
      tags: updatedRelease.tags ? JSON.parse(updatedRelease.tags) : [],
      image_url: updatedRelease.image_url,
      reading_time_minutes: updatedRelease.reading_time_minutes,
      created_by_name: updatedRelease.created_by_name,
      updated_by_name: updatedRelease.updated_by_name,
    };

    return NextResponse.json({
      success: true,
      item: transformedRelease
    });

  } catch (error) {
    console.error('Error updating press release:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update press release'
    }, { status: 500 });
  }
}

// DELETE /api/press-releases/[id] - Delete press release
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if press release exists and get image URL
    const existingRelease = await executeQuerySingle<DatabasePressRelease>(
      'SELECT id, image_url FROM press_releases WHERE id = ?',
      [id]
    );

    if (!existingRelease) {
      return NextResponse.json({
        success: false,
        error: 'Press release not found'
      }, { status: 404 });
    }

    // Delete the associated image file if it exists
    if (existingRelease.image_url) {
      try {
        // Extract filename from the URL (e.g., "/uploads/press-releases/1234567890_image.jpg")
        const urlPath = existingRelease.image_url;
        if (urlPath.startsWith('/uploads/press-releases/')) {
          const fileName = urlPath.replace('/uploads/press-releases/', '');
          const filePath = join(process.cwd(), 'public', 'uploads', 'press-releases', fileName);
          
          // Check if file exists before trying to delete
          if (existsSync(filePath)) {
            await unlink(filePath);
            console.log(`Deleted image file: ${filePath}`);
          } else {
            console.log(`Image file not found: ${filePath}`);
          }
        }
      } catch (imageError) {
        console.error('Error deleting image file:', imageError);
        // Continue with press release deletion even if image deletion fails
      }
    }

    // Delete the press release
    await executeQuery('DELETE FROM press_releases WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Press release deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting press release:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete press release'
    }, { status: 500 });
  }
}
