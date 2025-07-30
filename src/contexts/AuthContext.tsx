'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
// User interface for authentication (without password)
interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'user' | 'administrator';
  is_active: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user;

  // Check for existing session on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const savedUser = localStorage.getItem('agd_user');
      const sessionExpiry = localStorage.getItem('agd_session_expiry');
      
      if (savedUser && sessionExpiry) {
        const expiry = parseInt(sessionExpiry);
        if (Date.now() < expiry) {
          setUser(JSON.parse(savedUser));
        } else {
          // Session expired
          logout();
        }
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Call authentication API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      
      if (!result.success) {
        return { success: false, error: result.error };
      }

      if (!result.user) {
        return { success: false, error: 'Authentication failed' };
      }

      // Set session expiry (24 hours)
      const expiry = Date.now() + (24 * 60 * 60 * 1000);
      
      // Save to localStorage
      localStorage.setItem('agd_user', JSON.stringify(result.user));
      localStorage.setItem('agd_session_expiry', expiry.toString());
      
      setUser(result.user);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('agd_user');
    localStorage.removeItem('agd_session_expiry');
    setUser(null);
    router.push('/login');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 