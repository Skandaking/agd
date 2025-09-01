import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQuerySingle } from '@/lib/database';
import { getCurrentUserId } from '@/lib/auth-utils';
import { DatabaseMediaItem, MediaItem } from '@/lib/types';

// Transform database media item to API format
function transformDatabaseMediaItem(dbItem: DatabaseMediaItem): MediaItem {
  return {
    id: dbItem.id.toString(),
    title: dbItem.title,
    alt_text: dbItem.alt_text,
    description: dbItem.description,
    category: dbItem.category,
    file_name: dbItem.file_name,
    file_url: dbItem.file_url,
    file_mime: dbItem.file_mime,
    file_size_bytes: dbItem.file_size_bytes,
    width: dbItem.width,
    height: dbItem.height,
    duration: dbItem.duration,
    status: dbItem.status,
    tags: dbItem.tags ? dbItem.tags.split(',').map(tag => tag.trim()) : [],
    usage_count: dbItem.usage_count,
    createdAt: dbItem.created_at,
    updatedAt: dbItem.updated_at,
    created_by_name: dbItem.created_by_name,
    updated_by_name: dbItem.updated_by_name,
  };
}

// GET /api/media/[id] - Fetch single media item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Fetching media item:', id);

    const query = `
      SELECT 
        m.*,
        creator.full_name as created_by_name,
        updater.full_name as updated_by_name
      FROM media m
      LEFT JOIN users creator ON m.created_by = creator.id
      LEFT JOIN users updater ON m.updated_by = updater.id
      WHERE m.id = ?
    `;

    const dbItem = await executeQuerySingle<DatabaseMediaItem>(query, [id]);

    if (!dbItem) {
      return NextResponse.json({
        success: false,
        error: 'Media item not found'
      }, { status: 404 });
    }

    const item = transformDatabaseMediaItem(dbItem);

    return NextResponse.json({
      success: true,
      item
    });

  } catch (error) {
    console.error('Error fetching media item:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch media item'
    }, { status: 500 });
  }
}

// PUT /api/media/[id] - Update media item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    console.log('Updating media item:', id, body);

    // Get current user ID
    const userId = await getCurrentUserId();

    // Check if media item exists
    const existingItem = await executeQuerySingle<DatabaseMediaItem>(
      'SELECT * FROM media WHERE id = ?',
      [id]
    );

    if (!existingItem) {
      return NextResponse.json({
        success: false,
        error: 'Media item not found'
      }, { status: 404 });
    }

    // Validate required fields
    if (!body.title || !body.file_name || !body.file_url || !body.file_mime) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: title, file_name, file_url, file_mime'
      }, { status: 400 });
    }

    // Prepare tags for database (comma-separated string)
    const tagsString = Array.isArray(body.tags) && body.tags.length > 0 
      ? body.tags.join(', ') 
      : null;

    const updateQuery = `
      UPDATE media SET
        title = ?, 
        alt_text = ?, 
        description = ?, 
        category = ?, 
        file_name = ?, 
        file_url = ?, 
        file_mime = ?, 
        file_size_bytes = ?, 
        width = ?, 
        height = ?, 
        duration = ?, 
        status = ?, 
        tags = ?, 
        usage_count = ?,
        updated_by = ?, 
        updated_at = NOW()
      WHERE id = ?
    `;

    const updateParams = [
      body.title,
      body.alt_text || null,
      body.description || null,
      body.category || existingItem.category,
      body.file_name,
      body.file_url,
      body.file_mime,
      body.file_size_bytes || existingItem.file_size_bytes,
      body.width || null,
      body.height || null,
      body.duration || null,
      body.status || existingItem.status,
      tagsString,
      body.usage_count !== undefined ? body.usage_count : existingItem.usage_count,
      userId,
      id
    ];

    await executeQuery(updateQuery, updateParams);

    // Fetch the updated media item with user names
    const selectQuery = `
      SELECT 
        m.*,
        creator.full_name as created_by_name,
        updater.full_name as updated_by_name
      FROM media m
      LEFT JOIN users creator ON m.created_by = creator.id
      LEFT JOIN users updater ON m.updated_by = updater.id
      WHERE m.id = ?
    `;

    const updatedDbItem = await executeQuerySingle<DatabaseMediaItem>(selectQuery, [id]);
    
    if (!updatedDbItem) {
      throw new Error('Failed to retrieve updated media item');
    }

    const item = transformDatabaseMediaItem(updatedDbItem);

    console.log('Media item updated successfully:', item);

    return NextResponse.json({
      success: true,
      item
    });

  } catch (error) {
    console.error('Error updating media item:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update media item'
    }, { status: 500 });
  }
}

// DELETE /api/media/[id] - Delete media item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Deleting media item:', id);

    // Check if media item exists
    const existingItem = await executeQuerySingle<DatabaseMediaItem>(
      'SELECT * FROM media WHERE id = ?',
      [id]
    );

    if (!existingItem) {
      return NextResponse.json({
        success: false,
        error: 'Media item not found'
      }, { status: 404 });
    }

    // Delete the media item
    await executeQuery('DELETE FROM media WHERE id = ?', [id]);

    console.log('Media item deleted successfully');

    return NextResponse.json({
      success: true,
      message: 'Media item deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting media item:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete media item'
    }, { status: 500 });
  }
}
