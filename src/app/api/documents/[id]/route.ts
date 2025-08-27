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

// GET /api/documents/[id] - Get single document
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const document = await executeQuerySingle<DatabaseDocument>(
      `SELECT 
        d.*,
        u1.full_name as created_by_name,
        u2.full_name as updated_by_name
      FROM documents d
      LEFT JOIN users u1 ON d.created_by = u1.id
      LEFT JOIN users u2 ON d.updated_by = u2.id
      WHERE d.id = ?`,
      [id]
    );

    if (!document) {
      return NextResponse.json({
        success: false,
        error: 'Document not found'
      }, { status: 404 });
    }

    // Transform to frontend format
    const transformedDocument = {
      id: document.id.toString(),
      title: document.title,
      summary: document.summary,
      category: document.category,
      department: document.department,
      status: document.status,
      author: document.author,
      year: document.year,
      file_name: document.file_name,
      file_url: document.file_url,
      file_mime: document.file_mime,
      file_size_bytes: document.file_size_bytes,
      publishedAt: document.published_at ? document.published_at.toISOString() : null,
      createdAt: document.created_at.toISOString(),
      updatedAt: document.updated_at.toISOString(),
      views: document.views,
      downloads: document.downloads,
      tags: document.tags ? JSON.parse(document.tags) : [],
      created_by_name: document.created_by_name,
      updated_by_name: document.updated_by_name,
    };

    return NextResponse.json({
      success: true,
      item: transformedDocument,
    });

  } catch (error) {
    console.error('Error fetching document:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch document'
    }, { status: 500 });
  }
}

// PUT /api/documents/[id] - Update document
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    const userId = await getCurrentUserId();

    // Check if document exists
    const existingDocument = await executeQuerySingle(
      'SELECT id FROM documents WHERE id = ?',
      [id]
    );

    if (!existingDocument) {
      return NextResponse.json({
        success: false,
        error: 'Document not found'
      }, { status: 404 });
    }

    // Set published_at if status is being changed to published
    const currentDoc = await executeQuerySingle<DatabaseDocument>(
      'SELECT status, published_at FROM documents WHERE id = ?',
      [id]
    );

    let publishedAt = currentDoc?.published_at;
    if (status === 'published' && currentDoc?.status !== 'published') {
      publishedAt = new Date();
    } else if (status !== 'published') {
      publishedAt = null;
    }

    // Update document
    await executeQuery(
      `UPDATE documents SET 
        title = ?, summary = ?, category = ?, department = ?, status = ?, 
        author = ?, year = ?, file_name = ?, file_url = ?, file_mime = ?, 
        file_size_bytes = ?, updated_by = ?, published_at = ?, tags = ?
      WHERE id = ?`,
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
        publishedAt,
        tags ? JSON.stringify(tags) : null,
        id,
      ]
    );

    // Fetch updated document with user names
    const updatedDocument = await executeQuerySingle<DatabaseDocument>(
      `SELECT 
        d.*,
        u1.full_name as created_by_name,
        u2.full_name as updated_by_name
      FROM documents d
      LEFT JOIN users u1 ON d.created_by = u1.id
      LEFT JOIN users u2 ON d.updated_by = u2.id
      WHERE d.id = ?`,
      [id]
    );

    if (!updatedDocument) {
      return NextResponse.json({
        success: false,
        error: 'Failed to retrieve updated document'
      }, { status: 500 });
    }

    // Transform to frontend format
    const transformedDocument = {
      id: updatedDocument.id.toString(),
      title: updatedDocument.title,
      summary: updatedDocument.summary,
      category: updatedDocument.category,
      department: updatedDocument.department,
      status: updatedDocument.status,
      author: updatedDocument.author,
      year: updatedDocument.year,
      file_name: updatedDocument.file_name,
      file_url: updatedDocument.file_url,
      file_mime: updatedDocument.file_mime,
      file_size_bytes: updatedDocument.file_size_bytes,
      publishedAt: updatedDocument.published_at ? updatedDocument.published_at.toISOString() : null,
      createdAt: updatedDocument.created_at.toISOString(),
      updatedAt: updatedDocument.updated_at.toISOString(),
      views: updatedDocument.views,
      downloads: updatedDocument.downloads,
      tags: updatedDocument.tags ? JSON.parse(updatedDocument.tags) : [],
      created_by_name: updatedDocument.created_by_name,
      updated_by_name: updatedDocument.updated_by_name,
    };

    return NextResponse.json({
      success: true,
      item: transformedDocument,
    });

  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update document'
    }, { status: 500 });
  }
}

// DELETE /api/documents/[id] - Delete document
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if document exists
    const existingDocument = await executeQuerySingle(
      'SELECT id FROM documents WHERE id = ?',
      [id]
    );

    if (!existingDocument) {
      return NextResponse.json({
        success: false,
        error: 'Document not found'
      }, { status: 404 });
    }

    // Delete document
    await executeQuery('DELETE FROM documents WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete document'
    }, { status: 500 });
  }
}
