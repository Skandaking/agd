import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';
import { DEFAULT_USER_PASSWORD } from '@/lib/constants';
import bcrypt from 'bcryptjs';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const userId = parseInt(resolvedParams.id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    // Hash the default password
    const hashedPassword = await bcrypt.hash(DEFAULT_USER_PASSWORD, 10);

    // Reset password to default and clear login attempts
    const updateQuery = `
      UPDATE users 
      SET password = ?, login_attempts = 0, locked_until = NULL, updated_at = NOW()
      WHERE id = ?
    `;

    await executeQuery(updateQuery, [hashedPassword, userId]);

    // Fetch the updated user
    const selectQuery = `
      SELECT id, email, full_name, phone, role, is_active, login_attempts, 
             locked_until, last_login, created_at, updated_at
      FROM users 
      WHERE id = ?
    `;

    const users = await executeQuery(selectQuery, [userId]) as unknown[];
    
    if (users.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: users[0],
      message: `Password has been reset to: ${DEFAULT_USER_PASSWORD}`
    });

  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset password' },
      { status: 500 }
    );
  }
} 