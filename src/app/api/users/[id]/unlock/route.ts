import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQuerySingle } from '@/lib/database';

// PUT /api/users/[id]/unlock - Unlock user account
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const userId = parseInt(resolvedParams.id);

    // Validate user exists
    const existingUser = await executeQuerySingle(
      'SELECT id FROM users WHERE id = ?',
      [userId]
    );

    if (!existingUser) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    // Unlock user account
    const query = `
      UPDATE users 
      SET locked_until = NULL, login_attempts = 0, updated_at = NOW()
      WHERE id = ?
    `;

    await executeQuery(query, [userId]);

    // Fetch updated user
    const updatedUser = await executeQuerySingle(`
      SELECT 
        id, email, full_name, role, is_active, 
        login_attempts, locked_until, last_login, 
        created_at, updated_at 
      FROM users 
      WHERE id = ?
    `, [userId]);

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: 'User unlocked successfully'
    });

  } catch (error) {
    console.error('Error unlocking user:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to unlock user'
    }, { status: 500 });
  }
}