import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQuerySingle } from '@/lib/database';

// PUT /api/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    const body = await request.json();
    const { full_name, email, role, is_active } = body;

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

    // Update user
    const query = `
      UPDATE users 
      SET full_name = ?, email = ?, role = ?, is_active = ?, updated_at = NOW()
      WHERE id = ?
    `;

    await executeQuery(query, [full_name, email, role, is_active, userId]);

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
      user: updatedUser
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update user'
    }, { status: 500 });
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);

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

    // Delete user
    await executeQuery('DELETE FROM users WHERE id = ?', [userId]);

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete user'
    }, { status: 500 });
  }
}