import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQuerySingle } from '@/lib/database';

// PUT /api/users/[id]/toggle-status - Toggle user active status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);

    // Validate user exists and get current status
    const existingUser = await executeQuerySingle<{ id: number; is_active: boolean }>(
      'SELECT id, is_active FROM users WHERE id = ?',
      [userId]
    );

    if (!existingUser) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    // Toggle active status
    const newStatus = !existingUser.is_active;
    const query = `
      UPDATE users 
      SET is_active = ?, updated_at = NOW()
      WHERE id = ?
    `;

    await executeQuery(query, [newStatus, userId]);

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
      message: `User ${newStatus ? 'activated' : 'deactivated'} successfully`
    });

  } catch (error) {
    console.error('Error toggling user status:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update user status'
    }, { status: 500 });
  }
}