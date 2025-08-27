import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQuerySingle } from '@/lib/database';

// GET /api/documents/[id]/download - Track download and redirect
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get document
    const document = await executeQuerySingle<{ file_url: string; downloads: number }>(
      'SELECT file_url, downloads FROM documents WHERE id = ? AND status = ?',
      [id, 'published']
    );

    if (!document) {
      return NextResponse.json({
        success: false,
        error: 'Document not found or not published'
      }, { status: 404 });
    }

    // Increment download count
    await executeQuery(
      'UPDATE documents SET downloads = downloads + 1 WHERE id = ?',
      [id]
    );

    // Redirect to file URL
    return NextResponse.redirect(document.file_url);

  } catch (error) {
    console.error('Error tracking download:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process download'
    }, { status: 500 });
  }
}
