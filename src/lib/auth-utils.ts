import { cookies } from 'next/headers';
import { executeQuerySingle } from '@/lib/database';

interface UserRecord {
  id: number;
  email?: string;
  full_name?: string;
  role?: string;
  is_active?: boolean;
}

// Get current user ID from session/cookies
export async function getCurrentUserId(): Promise<number> {
  try {
    const cookieStore = await cookies();
    const userToken = cookieStore.get('agd_user_token');
    
    if (userToken) {
      try {
        // Decode the token and extract user ID
        const userData = JSON.parse(userToken.value);
        const userId = userData.id;
        
        if (userId && typeof userId === 'number') {
          // Verify the user exists in the database
          const user = await executeQuerySingle<UserRecord>(
            'SELECT id FROM users WHERE id = ? AND is_active = 1',
            [userId]
          );
          
          if (user) {
            return userId;
          }
        }
      } catch (error) {
        console.error('Error parsing user token:', error);
      }
    }
    
    // If no valid session, try to get the first administrator user
    const adminUser = await executeQuerySingle<UserRecord>(
      'SELECT id FROM users WHERE role = "administrator" AND is_active = 1 ORDER BY id LIMIT 1',
      []
    );
    
    if (adminUser) {
      return adminUser.id;
    }
    
    // If no administrator exists, throw an error
    throw new Error('No valid user found. Please ensure at least one administrator user exists in the database.');
    
  } catch (error) {
    console.error('Error getting current user ID:', error);
    throw new Error('Authentication failed. Please log in again.');
  }
}

// Get current user from session/cookies
export async function getCurrentUser() {
  const userId = await getCurrentUserId();
  
  // Fetch the full user data from database
  const user = await executeQuerySingle<UserRecord>(
    'SELECT id, email, full_name, role, is_active FROM users WHERE id = ?',
    [userId]
  );
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
} 