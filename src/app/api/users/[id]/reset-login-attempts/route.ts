import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

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

    // Reset login attempts to 0 and clear locked_until
    const updateQuery = `
      UPDATE users 
      SET login_attempts = 0, locked_until = NULL, updated_at = NOW()
      WHERE id = ?
    `;

    await executeQuery(updateQuery, [userId]);

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
      user: users[0]
    });

  } catch (error) {
    console.error('Error resetting login attempts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset login attempts' },
      { status: 500 }
    );
  }
} 