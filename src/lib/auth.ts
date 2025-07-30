import bcrypt from 'bcryptjs';
import { executeQuerySingle, executeQuery, DatabaseUser } from './database';

// User interface for authentication (without password)
export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'user' | 'administrator';
  is_active: boolean;
}

// Login result interface
export interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
}

// Find user by email
export async function findUserByEmail(email: string): Promise<DatabaseUser | null> {
  const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
  return executeQuerySingle<DatabaseUser>(query, [email]);
}

// Verify user password
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

// Update user's last login time
export async function updateLastLogin(userId: number): Promise<void> {
  const query = 'UPDATE users SET last_login = NOW(), updated_at = NOW() WHERE id = ?';
  await executeQuery(query, [userId]);
}

// Update login attempts
export async function updateLoginAttempts(userId: number, attempts: number): Promise<void> {
  const query = 'UPDATE users SET login_attempts = ?, updated_at = NOW() WHERE id = ?';
  await executeQuery(query, [attempts, userId]);
}

// Lock user account
export async function lockUserAccount(userId: number, lockUntil: Date): Promise<void> {
  const query = 'UPDATE users SET locked_until = ?, login_attempts = ?, updated_at = NOW() WHERE id = ?';
  await executeQuery(query, [lockUntil, 3, userId]);
}

// Reset login attempts
export async function resetLoginAttempts(userId: number): Promise<void> {
  const query = 'UPDATE users SET login_attempts = 0, locked_until = NULL, updated_at = NOW() WHERE id = ?';
  await executeQuery(query, [userId]);
}

// Check if user account is locked
export function isAccountLocked(user: DatabaseUser): boolean {
  if (!user.locked_until) return false;
  return new Date() < new Date(user.locked_until);
}

// Convert database user to auth user (removing sensitive data)
export function toAuthUser(dbUser: DatabaseUser): User {
  return {
    id: dbUser.id,
    email: dbUser.email,
    full_name: dbUser.full_name,
    role: dbUser.role,
    is_active: dbUser.is_active,
  };
}

// Main login function
export async function authenticateUser(email: string, password: string): Promise<LoginResult> {
  try {
    // Find user by email
    const dbUser = await findUserByEmail(email);
    
    if (!dbUser) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Check if account is locked
    if (isAccountLocked(dbUser)) {
      const lockUntil = new Date(dbUser.locked_until!);
      const remainingTime = Math.ceil((lockUntil.getTime() - Date.now()) / (1000 * 60));
      return { 
        success: false, 
        error: `Account is locked. Try again in ${remainingTime} minutes.` 
      };
    }

    // Check if account is active
    if (!dbUser.is_active) {
      return { success: false, error: 'Account is deactivated. Contact administrator.' };
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, dbUser.password);
    
    if (!isPasswordValid) {
      // Increment login attempts
      const newAttempts = dbUser.login_attempts + 1;
      
      if (newAttempts >= 3) {
        // Lock account for 30 minutes
        const lockUntil = new Date(Date.now() + 30 * 60 * 1000);
        await lockUserAccount(dbUser.id, lockUntil);
        return { 
          success: false, 
          error: 'Account locked due to too many failed attempts. Try again in 30 minutes.' 
        };
      } else {
        await updateLoginAttempts(dbUser.id, newAttempts);
        const remainingAttempts = 3 - newAttempts;
        return { 
          success: false, 
          error: `Invalid email or password. ${remainingAttempts} attempts remaining.` 
        };
      }
    }

    // Successful login
    await Promise.all([
      updateLastLogin(dbUser.id),
      resetLoginAttempts(dbUser.id)
    ]);

    return {
      success: true,
      user: toAuthUser(dbUser)
    };

  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, error: 'An error occurred during login. Please try again.' };
  }
} 