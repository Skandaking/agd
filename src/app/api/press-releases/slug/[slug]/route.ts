import { NextRequest, NextResponse } from 'next/server';
import { executeQuerySingle, executeQuery } from '@/lib/database';

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

// GET /api/press-releases/slug/[slug] - Fetch single press release by slug (fallback to numeric id if no slug)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Try find by slug first
    let release = await executeQuerySingle<DatabasePressRelease>(`
      SELECT 
        pr.*, u1.full_name as created_by_name, u2.full_name as updated_by_name
      FROM press_releases pr
      LEFT JOIN users u1 ON pr.created_by = u1.id
      LEFT JOIN users u2 ON pr.updated_by = u2.id
      WHERE pr.slug = ?
      LIMIT 1
    `, [slug]);

    // If not found and slug is numeric, fallback to id
    if (!release && /^\d+$/.test(slug)) {
      release = await executeQuerySingle<DatabasePressRelease>(`
        SELECT 
          pr.*, u1.full_name as created_by_name, u2.full_name as updated_by_name
        FROM press_releases pr
        LEFT JOIN users u1 ON pr.created_by = u1.id
        LEFT JOIN users u2 ON pr.updated_by = u2.id
        WHERE pr.id = ?
        LIMIT 1
      `, [Number(slug)]);
    }

    if (!release) {
      return NextResponse.json({ success: false, error: 'Press release not found' }, { status: 404 });
    }

    // Increment views count (best-effort; don't fail the request if this errors)
    try {
      await executeQuery('UPDATE press_releases SET views = views + 1 WHERE id = ?', [release.id]);
    } catch (e) {
      console.error('Error incrementing press release views:', e);
    }

    // Re-fetch the release to get the updated views count
    const updatedRelease = await executeQuerySingle<DatabasePressRelease>(`
      SELECT 
        pr.*, u1.full_name as created_by_name, u2.full_name as updated_by_name
      FROM press_releases pr
      LEFT JOIN users u1 ON pr.created_by = u1.id
      LEFT JOIN users u2 ON pr.updated_by = u2.id
      WHERE pr.id = ?
      LIMIT 1
    `, [release.id]);

    const finalRelease = updatedRelease || release;

    const transformedRelease = {
      id: finalRelease.id.toString(),
      title: finalRelease.title,
      excerpt: finalRelease.excerpt,
      content: finalRelease.content,
      category: finalRelease.category,
      status: finalRelease.status,
      author: finalRelease.author,
      publishedAt: finalRelease.published_at ? finalRelease.published_at.toISOString() : null,
      createdAt: finalRelease.created_at.toISOString(),
      updatedAt: finalRelease.updated_at.toISOString(),
      views: finalRelease.views || 0,
      featured: Boolean(finalRelease.featured),
      slug: finalRelease.slug,
      meta_title: finalRelease.meta_title,
      meta_description: finalRelease.meta_description,
      tags: finalRelease.tags ? JSON.parse(finalRelease.tags) : [],
      image_url: finalRelease.image_url,
      reading_time_minutes: finalRelease.reading_time_minutes,
      created_by_name: finalRelease.created_by_name,
      updated_by_name: finalRelease.updated_by_name,
    };

    return NextResponse.json({ success: true, item: transformedRelease });
  } catch (error) {
    console.error('Error fetching press release by slug:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch press release' }, { status: 500 });
  }
}
