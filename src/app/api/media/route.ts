import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';
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

// GET /api/media - Fetch all media items
export async function GET(request: NextRequest) {
  try {
    console.log('Fetching media items...');

    const query = `
      SELECT 
        m.*,
        creator.full_name as created_by_name,
        updater.full_name as updated_by_name
      FROM media m
      LEFT JOIN users creator ON m.created_by = creator.id
      LEFT JOIN users updater ON m.updated_by = updater.id
      ORDER BY m.created_at DESC
    `;

    const dbItems = await executeQuery<DatabaseMediaItem>(query);
    console.log(`Found ${dbItems.length} media items`);

    const items = dbItems.map(transformDatabaseMediaItem);

    return NextResponse.json({
      success: true,
      items,
      count: items.length
    });

  } catch (error) {
    console.error('Error fetching media items:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch media items'
    }, { status: 500 });
  }
}

// POST /api/media - Create new media item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Creating media item:', body);

    // Get current user ID
    const userId = await getCurrentUserId();

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

    const insertQuery = `
      INSERT INTO media (
        title, alt_text, description, category, file_name, file_url, 
        file_mime, file_size_bytes, width, height, duration, status, 
        tags, usage_count, created_by, updated_by, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const insertParams = [
      body.title,
      body.alt_text || null,
      body.description || null,
      body.category || 'other',
      body.file_name,
      body.file_url,
      body.file_mime,
      body.file_size_bytes || 0,
      body.width || null,
      body.height || null,
      body.duration || null,
      body.status || 'active',
      tagsString,
      body.usage_count || 0,
      userId,
      userId
    ];

    const result = await executeQuery(insertQuery, insertParams);
    const insertId = (result as any).insertId;

    // Fetch the created media item with user names
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

    const [createdItem] = await executeQuery<DatabaseMediaItem>(selectQuery, [insertId]);
    
    if (!createdItem) {
      throw new Error('Failed to retrieve created media item');
    }

    const item = transformDatabaseMediaItem(createdItem);

    console.log('Media item created successfully:', item);

    return NextResponse.json({
      success: true,
      item
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating media item:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create media item'
    }, { status: 500 });
  }
}
