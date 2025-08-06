import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQuerySingle } from '@/lib/database';
import { DatabaseNewsArticle } from '@/lib/types';
import { getCurrentUserId } from '@/lib/auth-utils';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// GET /api/news/[id] - Fetch single news article
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const news = await executeQuerySingle<DatabaseNewsArticle>(`
      SELECT 
        n.*,
        u1.full_name as created_by_name,
        u2.full_name as updated_by_name
      FROM news n
      LEFT JOIN users u1 ON n.created_by = u1.id
      LEFT JOIN users u2 ON n.updated_by = u2.id
      WHERE n.id = ?
    `, [id]);

    if (!news) {
      return NextResponse.json({
        success: false,
        error: 'News article not found'
      }, { status: 404 });
    }

    // Transform to frontend format
    const transformedNews = {
      id: news.id.toString(),
      title: news.title,
      excerpt: news.excerpt,
      content: news.content,
      category: news.category,
      status: news.status,
      author: news.author,
      publishedAt: news.published_at ? news.published_at.toISOString() : null,
      createdAt: news.created_at.toISOString(),
      updatedAt: news.updated_at.toISOString(),
      views: news.views,
      featured: Boolean(news.featured),
      slug: news.slug,
      meta_title: news.meta_title,
      meta_description: news.meta_description,
      tags: news.tags ? JSON.parse(news.tags) : [],
      image_url: news.image_url,
      reading_time_minutes: news.reading_time_minutes,
      created_by_name: news.created_by_name,
      updated_by_name: news.updated_by_name,
    };

    return NextResponse.json({
      success: true,
      news: transformedNews
    });

  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch news article'
    }, { status: 500 });
  }
}

// PUT /api/news/[id] - Update news article
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

    // Check if news article exists
    const existingNews = await executeQuerySingle(
      'SELECT id FROM news WHERE id = ?',
      [id]
    );

    if (!existingNews) {
      return NextResponse.json({
        success: false,
        error: 'News article not found'
      }, { status: 404 });
    }

    // Check if slug is unique (if provided and changed)
    if (slug) {
      const existingSlug = await executeQuerySingle(
        'SELECT id FROM news WHERE slug = ? AND id != ?',
        [slug, id]
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

    // Determine published_at based on status change
    const currentNews = await executeQuerySingle<DatabaseNewsArticle>(
      'SELECT status, published_at FROM news WHERE id = ?',
      [id]
    );

    let publishedAt = currentNews?.published_at;
    if (status === 'published' && currentNews?.status !== 'published') {
      publishedAt = new Date();
    } else if (status !== 'published') {
      publishedAt = null;
    }

    // Update news article
    const updateQuery = `
      UPDATE news SET
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

    // Fetch the updated news article
    const updatedNews = await executeQuerySingle<DatabaseNewsArticle>(`
      SELECT 
        n.*,
        u1.full_name as created_by_name,
        u2.full_name as updated_by_name
      FROM news n
      LEFT JOIN users u1 ON n.created_by = u1.id
      LEFT JOIN users u2 ON n.updated_by = u2.id
      WHERE n.id = ?
    `, [id]);

    if (!updatedNews) {
      throw new Error('Failed to fetch updated news article');
    }

    // Transform to frontend format
    const transformedNews = {
      id: updatedNews.id.toString(),
      title: updatedNews.title,
      excerpt: updatedNews.excerpt,
      content: updatedNews.content,
      category: updatedNews.category,
      status: updatedNews.status,
      author: updatedNews.author,
      publishedAt: updatedNews.published_at ? updatedNews.published_at.toISOString() : null,
      createdAt: updatedNews.created_at.toISOString(),
      updatedAt: updatedNews.updated_at.toISOString(),
      views: updatedNews.views,
      featured: Boolean(updatedNews.featured),
      slug: updatedNews.slug,
      meta_title: updatedNews.meta_title,
      meta_description: updatedNews.meta_description,
      tags: updatedNews.tags ? JSON.parse(updatedNews.tags) : [],
      image_url: updatedNews.image_url,
      reading_time_minutes: updatedNews.reading_time_minutes,
      created_by_name: updatedNews.created_by_name,
      updated_by_name: updatedNews.updated_by_name,
    };

    return NextResponse.json({
      success: true,
      news: transformedNews
    });

  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update news article'
    }, { status: 500 });
  }
}

// DELETE /api/news/[id] - Delete news article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if news article exists and get image URL
    const existingNews = await executeQuerySingle<DatabaseNewsArticle>(
      'SELECT id, image_url FROM news WHERE id = ?',
      [id]
    );

    if (!existingNews) {
      return NextResponse.json({
        success: false,
        error: 'News article not found'
      }, { status: 404 });
    }

    // Delete the associated image file if it exists
    if (existingNews.image_url) {
      try {
        // Extract filename from the URL (e.g., "/uploads/news/1234567890_image.jpg")
        const urlPath = existingNews.image_url;
        if (urlPath.startsWith('/uploads/news/')) {
          const fileName = urlPath.replace('/uploads/news/', '');
          const filePath = join(process.cwd(), 'public', 'uploads', 'news', fileName);
          
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
        // Continue with article deletion even if image deletion fails
      }
    }

    // Delete the news article
    await executeQuery('DELETE FROM news WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'News article deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete news article'
    }, { status: 500 });
  }
} 