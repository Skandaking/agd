'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDashboard } from '@/contexts/DashboardContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { ProfileDialog } from '@/components/dashboard/ProfileDialog';
import { 
  Menu,
  Bell,
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  ChevronsRight,
  ChevronsLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const { 
    setMobileSidebarOpen,
    pageTitle,
    breadcrumbs,
    theme,
    setTheme,
    compactMode,
    setCompactMode,
    isSidebarCollapsed,
    setSidebarCollapsed,
  } = useDashboard();
  const { user, logout } = useAuth();
  
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Memoize user initials to prevent unnecessary re-renders
  const userInitials = React.useMemo(() => {
    if (!user) return '';
    return getInitials(user.full_name);
  }, [user?.full_name]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleToggleCollapse = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutDialog(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>

          {/* Desktop sidebar toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
            onClick={handleToggleCollapse}
          >
            <ChevronsLeft
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isSidebarCollapsed && "rotate-180"
              )}
            />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          {/* Breadcrumbs */}
          <div className="flex-1 flex items-center gap-2 overflow-hidden">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {crumb.href ? (
                    <Link 
                      href={crumb.href} 
                      className="hover:text-foreground transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <ChevronsRight className="h-4 w-4 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Page title on mobile */}
            <h1 className="md:hidden text-lg font-semibold text-foreground truncate">
              {pageTitle}
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden md:flex hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Notifications bell - simple version */}
            <Button variant="ghost" size="icon" className="hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]">
              <Bell className="h-4 w-4" />
              <span className="sr-only">View notifications</span>
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-[var(--primary)]/10">
                  <div className="h-10 w-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
                    {user ? (
                      <span className="text-sm font-medium text-[var(--primary-foreground)]">
                        {userInitials}
                      </span>
                    ) : (
                      <User className="h-5 w-5 text-[var(--primary-foreground)]" />
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.full_name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || 'user@example.com'}
                    </p>
                    {user?.role && (
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {user.role === 'administrator' ? 'Administrator' : 'User'}
                        </span>
                      </div>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowProfileDialog(true)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setCompactMode(!compactMode)}
                  className="md:hidden"
                >
                  <span>Compact mode: {compactMode ? 'On' : 'Off'}</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={toggleTheme}
                  className="md:hidden"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light mode</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogoutClick}
                  className="text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Profile Dialog */}
      <ProfileDialog 
        isOpen={showProfileDialog} 
        onClose={() => setShowProfileDialog(false)} 
      />

      {/* Logout Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogoutConfirm}
        title="Confirm Logout"
        description="Are you sure you want to logout? You will need to sign in again to access the administration system."
        confirmText="Logout"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
} 