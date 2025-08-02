import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQuerySingle } from '@/lib/database';

// PUT /api/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const userId = parseInt(resolvedParams.id);
    const body = await request.json();
    const { full_name, email, phone } = body;

    // Validate required fields
    if (!full_name || !email) {
      return NextResponse.json({
        success: false,
        error: 'Full name and email are required'
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        error: 'Please enter a valid email address'
      }, { status: 400 });
    }

    // Validate phone number format if provided
    if (phone && phone.trim() !== '') {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
        return NextResponse.json({
          success: false,
          error: 'Please enter a valid phone number'
        }, { status: 400 });
      }
    }

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

    // Get current user data to preserve unchanged fields
    const currentUser = await executeQuerySingle(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );

    if (!currentUser) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    // Update user with provided fields, preserving existing values for undefined fields
    const query = `
      UPDATE users 
      SET full_name = ?, email = ?, phone = ?, updated_at = NOW()
      WHERE id = ?
    `;

    await executeQuery(query, [full_name, email, phone || null, userId]);

    // Fetch updated user
    const updatedUser = await executeQuerySingle(`
      SELECT 
        id, email, full_name, phone, role, is_active, 
        login_attempts, locked_until, last_login, 
        created_at, updated_at 
      FROM users 
      WHERE id = ?
    `, [userId]);

    return NextResponse.json({
      success: true,
      user: updatedUser
    });

  } catch (error: unknown) {
    const apiError = error as { code?: string; message?: string };
    
    // Provide more specific error messages based on error type
    let errorMessage = 'Failed to update user';
    
    if (apiError.code === 'ER_LOCK_WAIT_TIMEOUT') {
      errorMessage = 'Database is temporarily busy. Please try again.';
    } else if (apiError.code === 'ER_DUP_ENTRY') {
      errorMessage = 'Email address is already in use by another user.';
    } else if (apiError.message) {
      errorMessage = apiError.message;
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 });
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
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