import { NextRequest, NextResponse } from 'next/server';
import { executeQuerySingle, executeQuery } from '@/lib/database';
import { DatabaseNewsArticle } from '@/lib/types';

// GET /api/news/slug/[slug] - Fetch single news article by slug (fallback to numeric id if no slug)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Try find by slug first
    let news = await executeQuerySingle<DatabaseNewsArticle>(`
      SELECT 
        n.*, u1.full_name as created_by_name, u2.full_name as updated_by_name
      FROM news n
      LEFT JOIN users u1 ON n.created_by = u1.id
      LEFT JOIN users u2 ON n.updated_by = u2.id
      WHERE n.slug = ?
      LIMIT 1
    `, [slug]);

    // If not found and slug is numeric, fallback to id
    if (!news && /^\d+$/.test(slug)) {
      news = await executeQuerySingle<DatabaseNewsArticle>(`
        SELECT 
          n.*, u1.full_name as created_by_name, u2.full_name as updated_by_name
        FROM news n
        LEFT JOIN users u1 ON n.created_by = u1.id
        LEFT JOIN users u2 ON n.updated_by = u2.id
        WHERE n.id = ?
        LIMIT 1
      `, [Number(slug)]);
    }

    if (!news) {
      return NextResponse.json({ success: false, error: 'News article not found' }, { status: 404 });
    }

    // Increment views count (best-effort; don't fail the request if this errors)
    try {
      await executeQuery('UPDATE news SET views = views + 1 WHERE id = ?', [news.id]);
    } catch (e) {
      console.error('Error incrementing news views:', e);
    }

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
      views: (news.views || 0) + 1,
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

    return NextResponse.json({ success: true, news: transformedNews });
  } catch (error) {
    console.error('Error fetching news by slug:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch news article' }, { status: 500 });
  }
}


