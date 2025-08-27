import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQuerySingle } from '@/lib/database';
import { getCurrentUserId } from '@/lib/auth-utils';

interface DatabaseDocument {
  id: number;
  title: string;
  summary: string | null;
  category: string;
  department: string | null;
  status: 'draft' | 'published' | 'archived';
  author: string | null;
  year: number | null;
  file_name: string;
  file_url: string;
  file_mime: string;
  file_size_bytes: number;
  created_by: number;
  updated_by: number;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
  views: number;
  downloads: number;
  tags: string | null;
  created_by_name?: string;
  updated_by_name?: string;
}

// GET /api/documents - Fetch all documents
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const department = searchParams.get('department');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = `
      SELECT 
        d.*,
        u1.full_name as created_by_name,
        u2.full_name as updated_by_name
      FROM documents d
      LEFT JOIN users u1 ON d.created_by = u1.id
      LEFT JOIN users u2 ON d.updated_by = u2.id
      WHERE 1=1
    `;
    const params: unknown[] = [];

    // Add filters
    if (status) {
      query += ' AND d.status = ?';
      params.push(status);
    }

    if (category) {
      query += ' AND d.category = ?';
      params.push(category);
    }

    if (department) {
      query += ' AND d.department = ?';
      params.push(department);
    }

    // Add ordering and pagination
    query += ' ORDER BY d.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const documents = await executeQuery<DatabaseDocument>(query, params);

    // Transform database format to frontend format
    const transformedDocuments = documents.map(doc => ({
      id: doc.id.toString(),
      title: doc.title,
      summary: doc.summary,
      category: doc.category,
      department: doc.department,
      status: doc.status,
      author: doc.author,
      year: doc.year,
      file_name: doc.file_name,
      file_url: doc.file_url,
      file_mime: doc.file_mime,
      file_size_bytes: doc.file_size_bytes,
      publishedAt: doc.published_at ? doc.published_at.toISOString() : null,
      createdAt: doc.created_at.toISOString(),
      updatedAt: doc.updated_at.toISOString(),
      views: doc.views,
      downloads: doc.downloads,
      tags: doc.tags ? JSON.parse(doc.tags) : [],
      created_by_name: doc.created_by_name,
      updated_by_name: doc.updated_by_name,
    }));

    return NextResponse.json({
      success: true,
      items: transformedDocuments,
      total: transformedDocuments.length,
    });

  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch documents'
    }, { status: 500 });
  }
}

// POST /api/documents - Create new document
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      summary,
      category,
      department,
      status,
      author,
      year,
      file_name,
      file_url,
      file_mime,
      file_size_bytes,
      tags,
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
    if (!title || !file_name || !file_url || !file_mime) {
      return NextResponse.json({
        success: false,
        error: 'Title, file name, file URL, and file MIME type are required'
      }, { status: 400 });
    }

    // Set published_at if status is published
    const publishedAt = status === 'published' ? new Date() : null;

    // Insert document into database
    const result = await executeQuery(
      `INSERT INTO documents (
        title, summary, category, department, status, author, year,
        file_name, file_url, file_mime, file_size_bytes,
        created_by, updated_by, published_at, tags
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        summary || null,
        category || 'report',
        department || null,
        status || 'draft',
        author || null,
        year || null,
        file_name,
        file_url,
        file_mime,
        file_size_bytes || 0,
        userId,
        userId,
        publishedAt,
        tags ? JSON.stringify(tags) : null,
      ]
    );

    // Get the inserted ID
    const insertId = (result as unknown as { insertId: number }).insertId;

    // Fetch the created document with user names
    const createdDocument = await executeQuerySingle<DatabaseDocument>(
      `SELECT 
        d.*,
        u1.full_name as created_by_name,
        u2.full_name as updated_by_name
      FROM documents d
      LEFT JOIN users u1 ON d.created_by = u1.id
      LEFT JOIN users u2 ON d.updated_by = u2.id
      WHERE d.id = ?`,
      [insertId]
    );

    if (!createdDocument) {
      return NextResponse.json({
        success: false,
        error: 'Failed to retrieve created document'
      }, { status: 500 });
    }

    // Transform to frontend format
    const transformedDocument = {
      id: createdDocument.id.toString(),
      title: createdDocument.title,
      summary: createdDocument.summary,
      category: createdDocument.category,
      department: createdDocument.department,
      status: createdDocument.status,
      author: createdDocument.author,
      year: createdDocument.year,
      file_name: createdDocument.file_name,
      file_url: createdDocument.file_url,
      file_mime: createdDocument.file_mime,
      file_size_bytes: createdDocument.file_size_bytes,
      publishedAt: createdDocument.published_at ? createdDocument.published_at.toISOString() : null,
      createdAt: createdDocument.created_at.toISOString(),
      updatedAt: createdDocument.updated_at.toISOString(),
      views: createdDocument.views,
      downloads: createdDocument.downloads,
      tags: createdDocument.tags ? JSON.parse(createdDocument.tags) : [],
      created_by_name: createdDocument.created_by_name,
      updated_by_name: createdDocument.updated_by_name,
    };

    return NextResponse.json({
      success: true,
      item: transformedDocument,
    });

  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create document'
    }, { status: 500 });
  }
}
