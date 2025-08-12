import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQuerySingle } from '@/lib/database';
import { getCurrentUserId } from '@/lib/auth-utils';

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

// GET /api/press-releases - Fetch all press releases
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = `
      SELECT 
        pr.*,
        u1.full_name as created_by_name,
        u2.full_name as updated_by_name
      FROM press_releases pr
      LEFT JOIN users u1 ON pr.created_by = u1.id
      LEFT JOIN users u2 ON pr.updated_by = u2.id
      WHERE 1=1
    `;
    const params: unknown[] = [];

    // Add filters
    if (status) {
      query += ' AND pr.status = ?';
      params.push(status);
    }

    if (category) {
      query += ' AND pr.category = ?';
      params.push(category);
    }

    if (featured !== null) {
      query += ' AND pr.featured = ?';
      params.push(featured === 'true' ? 1 : 0);
    }

    // Add ordering and pagination
    query += ' ORDER BY pr.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const releases = await executeQuery<DatabasePressRelease>(query, params);

    // Transform database format to frontend format
    const transformedReleases = releases.map(release => ({
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
    }));

    return NextResponse.json({
      success: true,
      items: transformedReleases,
      total: transformedReleases.length,
    });

  } catch (error) {
    console.error('Error fetching press releases:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch press releases'
    }, { status: 500 });
  }
}

// POST /api/press-releases - Create new press release
export async function POST(request: NextRequest) {
  try {
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
    let userId: number;
    try {
      userId = await getCurrentUserId();
    } catch (error) {
      console.error('Authentication error:', error);
      return NextResponse.json({
        success: false,
        error: 'Authentication failed. Please log in again.'
      }, { status: 401 });
    }

    // Validate required fields
    if (!title || !excerpt || !content || !author) {
      return NextResponse.json({
        success: false,
        error: 'Title, excerpt, content, and author are required'
      }, { status: 400 });
    }

    // Check if slug is unique (if provided)
    if (slug) {
      const existingSlug = await executeQuerySingle(
        'SELECT id FROM press_releases WHERE slug = ?',
        [slug]
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

    // Insert new press release
    const insertQuery = `
      INSERT INTO press_releases (
        title, excerpt, content, category, status, author,
        created_by, published_at, featured, slug, meta_title,
        meta_description, tags, image_url, reading_time_minutes, updated_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const publishedAt = status === 'published' ? new Date() : null;

    await executeQuery(insertQuery, [
      title,
      excerpt,
      content,
      category || 'announcement',
      status || 'draft',
      author,
      userId,
      publishedAt,
      featured ? 1 : 0,
      slug,
      meta_title,
      meta_description,
      tagsJson,
      image_url,
      reading_time_minutes || 0,
      userId,
    ]);

    // Fetch the created press release
    const newRelease = await executeQuerySingle<DatabasePressRelease>(`
      SELECT 
        pr.*,
        u1.full_name as created_by_name,
        u2.full_name as updated_by_name
      FROM press_releases pr
      LEFT JOIN users u1 ON pr.created_by = u1.id
      LEFT JOIN users u2 ON pr.updated_by = u2.id
      WHERE pr.title = ? AND pr.author = ?
      ORDER BY pr.created_at DESC
      LIMIT 1
    `, [title, author]);

    if (!newRelease) {
      throw new Error('Failed to fetch created press release');
    }

    // Transform to frontend format
    const transformedRelease = {
      id: newRelease.id.toString(),
      title: newRelease.title,
      excerpt: newRelease.excerpt,
      content: newRelease.content,
      category: newRelease.category,
      status: newRelease.status,
      author: newRelease.author,
      publishedAt: newRelease.published_at ? newRelease.published_at.toISOString() : null,
      createdAt: newRelease.created_at.toISOString(),
      updatedAt: newRelease.updated_at.toISOString(),
      views: newRelease.views,
      featured: Boolean(newRelease.featured),
      slug: newRelease.slug,
      meta_title: newRelease.meta_title,
      meta_description: newRelease.meta_description,
      tags: newRelease.tags ? JSON.parse(newRelease.tags) : [],
      image_url: newRelease.image_url,
      reading_time_minutes: newRelease.reading_time_minutes,
      created_by_name: newRelease.created_by_name,
      updated_by_name: newRelease.updated_by_name,
    };

    return NextResponse.json({
      success: true,
      item: transformedRelease
    });

  } catch (error) {
    console.error('Error creating press release:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create press release';
    
    if (error instanceof Error) {
      if (error.message.includes('foreign key constraint fails')) {
        errorMessage = 'Database constraint error: Please ensure you are logged in with a valid user account.';
      } else if (error.message.includes('Duplicate entry')) {
        errorMessage = 'A press release with this title or slug already exists.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 });
  }
}
