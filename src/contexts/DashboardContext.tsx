'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface DashboardContextType {
  // Sidebar state
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  isMobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  
  // Theme and appearance
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  
  // User preferences
  compactMode: boolean;
  setCompactMode: (compact: boolean) => void;
  
  // Toast notifications using Sonner
  showToast: {
    success: (message: string, description?: string) => void;
    error: (message: string, description?: string) => void;
    info: (message: string, description?: string) => void;
    warning: (message: string, description?: string) => void;
    promise: (
      promise: Promise<unknown>,
      options: {
        loading: string;
        success: (data: unknown) => string;
        error: (error: Error) => string;
      }
    ) => void;
  };
  
  // Page state
  pageTitle: string;
  setPageTitle: (title: string) => void;
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  // Track if component has mounted to prevent hydration issues
  const [isMounted, setIsMounted] = useState(false);
  
  // Sidebar state
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // User preferences
  const [compactMode, setCompactMode] = useState(false);
  
  // Page state
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { label: 'Home', href: '/dashboard' },
  ]);

  // Set mounted state on client-side only
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load preferences from localStorage only after mounting
  useEffect(() => {
    if (!isMounted) return;
    
    const saved = localStorage.getItem('dashboard-preferences');
    if (saved) {
      try {
        const preferences = JSON.parse(saved);
        if (preferences.isSidebarCollapsed !== undefined) {
          setSidebarCollapsed(preferences.isSidebarCollapsed);
        }
        if (preferences.theme) {
          setTheme(preferences.theme);
        }
        if (preferences.compactMode !== undefined) {
          setCompactMode(preferences.compactMode);
        }
      } catch (error) {
        console.error('Failed to load dashboard preferences:', error);
      }
    }
  }, [isMounted]);

  // Save preferences to localStorage only after mounting
  useEffect(() => {
    if (!isMounted) return;
    
    const preferences = {
      isSidebarCollapsed,
      theme,
      compactMode,
    };
    localStorage.setItem('dashboard-preferences', JSON.stringify(preferences));
  }, [isMounted, isSidebarCollapsed, theme, compactMode]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Close mobile sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sonner toast functions
  const showToast = {
    success: (message: string, description?: string) => {
      toast.success(message, {
        description,
        duration: 4000,
      });
    },
    error: (message: string, description?: string) => {
      toast.error(message, {
        description,
        duration: 5000,
      });
    },
    info: (message: string, description?: string) => {
      toast.info(message, {
        description,
        duration: 4000,
      });
    },
    warning: (message: string, description?: string) => {
      toast.warning(message, {
        description,
        duration: 4000,
      });
    },
    promise: (
      promise: Promise<unknown>,
      options: {
        loading: string;
        success: (data: unknown) => string;
        error: (error: Error) => string;
      }
    ) => {
      toast.promise(promise, options);
    },
  };

  const value: DashboardContextType = {
    // Sidebar state
    isSidebarCollapsed,
    setSidebarCollapsed,
    isMobileSidebarOpen,
    setMobileSidebarOpen,
    
    // Theme and appearance
    theme,
    setTheme,
    
    // User preferences
    compactMode,
    setCompactMode,
    
    // Toast notifications
    showToast,
    
    // Page state
    pageTitle,
    setPageTitle,
    breadcrumbs,
    setBreadcrumbs,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
} 