import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQuerySingle } from '@/lib/database';
import { getCurrentUserId } from '@/lib/auth-utils';
import { DatabaseEventItem } from '@/lib/types';

// GET /api/events/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const row = await executeQuerySingle<DatabaseEventItem>(
      `SELECT e.*, u1.full_name AS created_by_name, u2.full_name AS updated_by_name
       FROM events e
       LEFT JOIN users u1 ON e.created_by = u1.id
       LEFT JOIN users u2 ON e.updated_by = u2.id
       WHERE e.id = ?`,
      [id]
    );
    if (!row) return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });

    const item = {
      id: row.id.toString(),
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      type: row.type,
      state: row.state,
      status: row.status,
      start_at: row.start_at.toISOString(),
      end_at: row.end_at ? row.end_at.toISOString() : null,
      location: row.location,
      venue: row.venue,
      registration_required: Boolean(row.registration_required),
      registration_deadline: row.registration_deadline ? row.registration_deadline.toISOString() : null,
      registration_url: row.registration_url,
      max_attendees: row.max_attendees,
      current_attendees: row.current_attendees,
      publishedAt: row.published_at ? row.published_at.toISOString() : null,
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
      views: row.views,
      featured: Boolean(row.featured),
      slug: row.slug,
      meta_title: row.meta_title,
      meta_description: row.meta_description,
      tags: row.tags ? JSON.parse(row.tags) : [],
      image_url: row.image_url,
      created_by_name: row.created_by_name,
      updated_by_name: row.updated_by_name,
    };

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch event' }, { status: 500 });
  }
}

// PUT /api/events/[id]
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
      type,
      state,
      status,
      start_at,
      end_at,
      location,
      venue,
      registration_required,
      registration_deadline,
      registration_url,
      max_attendees,
      current_attendees,
      featured,
      slug,
      meta_title,
      meta_description,
      tags,
      image_url,
    } = body;

    // Auth
    const userId = await getCurrentUserId();

    // existence
    const exists = await executeQuerySingle('SELECT id, status FROM events WHERE id = ?', [id]);
    if (!exists) return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });

    // unique slug if changed
    if (slug) {
      const dup = await executeQuerySingle('SELECT id FROM events WHERE slug = ? AND id != ?', [slug, id]);
      if (dup) return NextResponse.json({ success: false, error: 'An event with this slug already exists' }, { status: 400 });
    }

    const tagsJson = tags && Array.isArray(tags) ? JSON.stringify(tags) : null;

    // published_at logic
    const current = await executeQuerySingle<DatabaseEventItem>('SELECT status, published_at FROM events WHERE id = ?', [id]);
    let publishedAt = current?.published_at || null;
    if (status === 'published' && current?.status !== 'published') {
      publishedAt = new Date();
    } else if (status !== 'published') {
      publishedAt = null;
    }

    const update = `
      UPDATE events SET
        title=?, excerpt=?, content=?, type=?, state=?, status=?,
        start_at=?, end_at=?, location=?, venue=?,
        registration_required=?, registration_deadline=?, registration_url=?,
        max_attendees=?, current_attendees=?,
        image_url=?, featured=?, slug=?, meta_title=?, meta_description=?, tags=?,
        published_at=?, updated_by=?
      WHERE id=?
    `;

    await executeQuery(update, [
      title,
      excerpt,
      content,
      type,
      state,
      status,
      start_at ? new Date(start_at) : null,
      end_at ? new Date(end_at) : null,
      location,
      venue || null,
      registration_required ? 1 : 0,
      registration_deadline ? new Date(registration_deadline) : null,
      registration_url || null,
      max_attendees ?? null,
      current_attendees ?? 0,
      image_url || null,
      featured ? 1 : 0,
      slug || null,
      meta_title || null,
      meta_description || null,
      tagsJson,
      publishedAt,
      userId,
      id,
    ]);

    const updated = await executeQuerySingle<DatabaseEventItem>(
      `SELECT e.*, u1.full_name AS created_by_name, u2.full_name AS updated_by_name
       FROM events e
       LEFT JOIN users u1 ON e.created_by = u1.id
       LEFT JOIN users u2 ON e.updated_by = u2.id
       WHERE e.id = ?`,
      [id]
    );

    if (!updated) throw new Error('Failed to fetch updated event');

    const item = {
      id: updated.id.toString(),
      title: updated.title,
      excerpt: updated.excerpt,
      content: updated.content,
      type: updated.type,
      state: updated.state,
      status: updated.status,
      start_at: updated.start_at.toISOString(),
      end_at: updated.end_at ? updated.end_at.toISOString() : null,
      location: updated.location,
      venue: updated.venue,
      registration_required: Boolean(updated.registration_required),
      registration_deadline: updated.registration_deadline ? updated.registration_deadline.toISOString() : null,
      registration_url: updated.registration_url,
      max_attendees: updated.max_attendees,
      current_attendees: updated.current_attendees,
      publishedAt: updated.published_at ? updated.published_at.toISOString() : null,
      createdAt: updated.created_at.toISOString(),
      updatedAt: updated.updated_at.toISOString(),
      views: updated.views,
      featured: Boolean(updated.featured),
      slug: updated.slug,
      meta_title: updated.meta_title,
      meta_description: updated.meta_description,
      tags: updated.tags ? JSON.parse(updated.tags) : [],
      image_url: updated.image_url,
      created_by_name: updated.created_by_name,
      updated_by_name: updated.updated_by_name,
    };

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ success: false, error: 'Failed to update event' }, { status: 500 });
  }
}

// DELETE /api/events/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const exists = await executeQuerySingle('SELECT id FROM events WHERE id = ?', [id]);
    if (!exists) return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });

    await executeQuery('DELETE FROM events WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete event' }, { status: 500 });
  }
}


