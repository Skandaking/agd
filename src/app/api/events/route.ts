import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQuerySingle } from '@/lib/database';
import { getCurrentUserId } from '@/lib/auth-utils';
import { DatabaseEventItem } from '@/lib/types';

// GET /api/events - list with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const state = searchParams.get('state');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = `
      SELECT 
        e.*, 
        u1.full_name AS created_by_name,
        u2.full_name AS updated_by_name
      FROM events e
      LEFT JOIN users u1 ON e.created_by = u1.id
      LEFT JOIN users u2 ON e.updated_by = u2.id
      WHERE 1=1
    `;
    const params: unknown[] = [];

    if (status) { query += ' AND e.status = ?'; params.push(status); }
    if (type) { query += ' AND e.type = ?'; params.push(type); }
    if (state) { query += ' AND e.state = ?'; params.push(state); }
    if (featured !== null) { query += ' AND e.featured = ?'; params.push(featured === 'true' ? 1 : 0); }

    query += ' ORDER BY e.start_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const rows = await executeQuery<DatabaseEventItem>(query, params);

    const items = rows.map((e) => ({
      id: e.id.toString(),
      title: e.title,
      excerpt: e.excerpt,
      content: e.content,
      type: e.type,
      state: e.state,
      status: e.status,
      start_at: e.start_at.toISOString(),
      end_at: e.end_at ? e.end_at.toISOString() : null,
      location: e.location,
      venue: e.venue,
      registration_required: Boolean(e.registration_required),
      registration_deadline: e.registration_deadline ? e.registration_deadline.toISOString() : null,
      registration_url: e.registration_url,
      max_attendees: e.max_attendees,
      current_attendees: e.current_attendees,
      publishedAt: e.published_at ? e.published_at.toISOString() : null,
      createdAt: e.created_at.toISOString(),
      updatedAt: e.updated_at.toISOString(),
      views: e.views,
      featured: Boolean(e.featured),
      // no slug/meta/tags
      image_url: e.image_url,
      created_by_name: e.created_by_name,
      updated_by_name: e.updated_by_name,
    }));

    return NextResponse.json({ success: true, items, total: items.length });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST /api/events - create
export async function POST(request: NextRequest) {
  try {
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
      image_url,
    } = body;

    // auth
    let userId: number;
    try {
      userId = await getCurrentUserId();
    } catch (err) {
      return NextResponse.json({ success: false, error: 'Authentication failed. Please log in again.' }, { status: 401 });
    }

    // validation
    if (!title || !excerpt || !content || !type || !start_at || !location) {
      return NextResponse.json({ success: false, error: 'Title, excerpt, content, type, start date/time, and location are required' }, { status: 400 });
    }

    // no slug/tags

    const publishedAt = status === 'published' ? new Date() : null;
    const initialState = state || 'upcoming';

    const insert = `
      INSERT INTO events (
        title, excerpt, content, type, state, status,
        start_at, end_at, location, venue,
        registration_required, registration_deadline, registration_url,
        max_attendees, current_attendees,
        image_url, featured, views,
        created_by, updated_by, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?)
    `;

    await executeQuery(insert, [
      title,
      excerpt,
      content,
      type,
      initialState,
      status || 'draft',
      new Date(start_at),
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
      userId,
      userId,
      publishedAt,
    ]);

    const created = await executeQuerySingle<DatabaseEventItem>(
      `SELECT e.*, u1.full_name AS created_by_name, u2.full_name AS updated_by_name
       FROM events e
       LEFT JOIN users u1 ON e.created_by = u1.id
       LEFT JOIN users u2 ON e.updated_by = u2.id
       WHERE e.title = ? AND e.created_by = ?
       ORDER BY e.created_at DESC
       LIMIT 1`,
      [title, userId]
    );

    if (!created) throw new Error('Failed to fetch created event');

    const item = {
      id: created.id.toString(),
      title: created.title,
      excerpt: created.excerpt,
      content: created.content,
      type: created.type,
      state: created.state,
      status: created.status,
      start_at: created.start_at.toISOString(),
      end_at: created.end_at ? created.end_at.toISOString() : null,
      location: created.location,
      venue: created.venue,
      registration_required: Boolean(created.registration_required),
      registration_deadline: created.registration_deadline ? created.registration_deadline.toISOString() : null,
      registration_url: created.registration_url,
      max_attendees: created.max_attendees,
      current_attendees: created.current_attendees,
      publishedAt: created.published_at ? created.published_at.toISOString() : null,
      createdAt: created.created_at.toISOString(),
      updatedAt: created.updated_at.toISOString(),
      views: created.views,
      featured: Boolean(created.featured),
      // no slug/meta/tags
      image_url: created.image_url,
      created_by_name: created.created_by_name,
      updated_by_name: created.updated_by_name,
    };

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ success: false, error: 'Failed to create event' }, { status: 500 });
  }
}


