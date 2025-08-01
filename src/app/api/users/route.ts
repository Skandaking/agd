import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQuerySingle } from '@/lib/database';
import bcrypt from 'bcryptjs';

// GET /api/users - Fetch all users
export async function GET() {
  try {
    const query = `
      SELECT 
        id, email, full_name, phone, role, is_active, 
        login_attempts, locked_until, last_login, 
        created_at, updated_at 
      FROM users 
      ORDER BY created_at DESC
    `;
    
    const users = await executeQuery(query);
    
    // Convert MySQL boolean fields (tinyint) to proper booleans
    const formattedUsers = users.map((user: unknown) => {
      const userObj = user as Record<string, unknown>;
      return {
        ...userObj,
        is_active: Boolean(userObj.is_active),
        phone: userObj.phone || null,
        locked_until: userObj.locked_until || null,
        last_login: userObj.last_login || null
      };
    });
    
    return NextResponse.json({
      success: true,
      users: formattedUsers
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch users'
    }, { status: 500 });
  }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { email, password, full_name, phone } = body;
    const { role, is_active } = body;

    // Trim whitespace
    email = email?.trim();
    password = password?.trim();
    full_name = full_name?.trim();
    phone = phone?.trim() || null;

    // Validate input
    if (!email || !password || !full_name) {
      return NextResponse.json({
        success: false,
        error: 'Email, password, and full name are required'
      }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = await executeQuerySingle(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: 'A user with this email already exists'
      }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const query = `
      INSERT INTO users (
        email, password, full_name, phone, role, is_active,
        login_attempts, locked_until, last_login,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, 0, NULL, NULL, NOW(), NOW())
    `;

    await executeQuery(query, [
      email,
      hashedPassword,
      full_name,
      phone,
      role || 'user',
      is_active !== undefined ? is_active : true
    ]);

    // Fetch the created user
    const newUser = await executeQuerySingle(`
      SELECT 
        id, email, full_name, phone, role, is_active, 
        login_attempts, locked_until, last_login, 
        created_at, updated_at 
      FROM users 
      WHERE email = ?
    `, [email]);

    return NextResponse.json({
      success: true,
      user: newUser
    });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create user'
    }, { status: 500 });
  }
}