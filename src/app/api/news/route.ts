import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQuerySingle } from '@/lib/database';
import { DatabaseNewsArticle } from '@/lib/types';
import { getCurrentUserId } from '@/lib/auth-utils';

// GET /api/news - Fetch all news articles
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
        n.*,
        u1.full_name as created_by_name,
        u2.full_name as updated_by_name
      FROM news n
      LEFT JOIN users u1 ON n.created_by = u1.id
      LEFT JOIN users u2 ON n.updated_by = u2.id
      WHERE 1=1
    `;
    const params: unknown[] = [];

    // Add filters
    if (status) {
      query += ' AND n.status = ?';
      params.push(status);
    }

    if (category) {
      query += ' AND n.category = ?';
      params.push(category);
    }

    if (featured !== null) {
      query += ' AND n.featured = ?';
      params.push(featured === 'true' ? 1 : 0);
    }

    // Add ordering and pagination
    query += ' ORDER BY n.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const news = await executeQuery<DatabaseNewsArticle>(query, params);

    // Transform database format to frontend format
    const transformedNews = news.map(article => ({
      id: article.id.toString(),
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      status: article.status,
      author: article.author,
      publishedAt: article.published_at ? article.published_at.toISOString() : null,
      createdAt: article.created_at.toISOString(),
      updatedAt: article.updated_at.toISOString(),
      views: article.views,
      featured: Boolean(article.featured),
      slug: article.slug,
      meta_title: article.meta_title,
      meta_description: article.meta_description,
      tags: article.tags ? JSON.parse(article.tags) : [],
      image_url: article.image_url,
      reading_time_minutes: article.reading_time_minutes,
      created_by_name: article.created_by_name,
      updated_by_name: article.updated_by_name,
    }));

    return NextResponse.json({
      success: true,
      news: transformedNews,
      total: transformedNews.length,
    });

  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch news articles'
    }, { status: 500 });
  }
}

// POST /api/news - Create new news article
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
        'SELECT id FROM news WHERE slug = ?',
        [slug]
      );
      if (existingSlug) {
        return NextResponse.json({
          success: false,
          error: 'A news article with this slug already exists'
        }, { status: 400 });
      }
    }

    // Prepare tags as JSON string
    const tagsJson = tags && Array.isArray(tags) ? JSON.stringify(tags) : null;

    // Insert new news article
    const insertQuery = `
      INSERT INTO news (
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

    // Fetch the created news article
    const newNews = await executeQuerySingle<DatabaseNewsArticle>(`
      SELECT 
        n.*,
        u1.full_name as created_by_name,
        u2.full_name as updated_by_name
      FROM news n
      LEFT JOIN users u1 ON n.created_by = u1.id
      LEFT JOIN users u2 ON n.updated_by = u2.id
      WHERE n.title = ? AND n.author = ?
      ORDER BY n.created_at DESC
      LIMIT 1
    `, [title, author]);

    if (!newNews) {
      throw new Error('Failed to fetch created news article');
    }

    // Transform to frontend format
    const transformedNews = {
      id: newNews.id.toString(),
      title: newNews.title,
      excerpt: newNews.excerpt,
      content: newNews.content,
      category: newNews.category,
      status: newNews.status,
      author: newNews.author,
      publishedAt: newNews.published_at ? newNews.published_at.toISOString() : null,
      createdAt: newNews.created_at.toISOString(),
      updatedAt: newNews.updated_at.toISOString(),
      views: newNews.views,
      featured: Boolean(newNews.featured),
      slug: newNews.slug,
      meta_title: newNews.meta_title,
      meta_description: newNews.meta_description,
      tags: newNews.tags ? JSON.parse(newNews.tags) : [],
      image_url: newNews.image_url,
      reading_time_minutes: newNews.reading_time_minutes,
      created_by_name: newNews.created_by_name,
      updated_by_name: newNews.updated_by_name,
    };

    return NextResponse.json({
      success: true,
      news: transformedNews
    });

  } catch (error) {
    console.error('Error creating news:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create news article';
    
    if (error instanceof Error) {
      if (error.message.includes('foreign key constraint fails')) {
        errorMessage = 'Database constraint error: Please ensure you are logged in with a valid user account.';
      } else if (error.message.includes('Duplicate entry')) {
        errorMessage = 'A news article with this title or slug already exists.';
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