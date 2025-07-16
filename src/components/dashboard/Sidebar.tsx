'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useDashboard } from '@/contexts/DashboardContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2,
  LayoutDashboard, 
  Newspaper, 
  Megaphone, 
  Calendar, 
  FileText, 
  Image, 
  Settings,
  LogOut,
  ChevronLeft,
  X
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'Content Management',
    items: [
      {
        title: 'News',
        href: '/dashboard/news',
        icon: Newspaper,
        badge: '3',
        badgeVariant: 'secondary',
      },
      {
        title: 'Press Releases',
        href: '/dashboard/press-releases',
        icon: Megaphone,
        badge: '2',
        badgeVariant: 'secondary',
      },
      {
        title: 'Events',
        href: '/dashboard/events',
        icon: Calendar,
      },
      {
        title: 'Documents',
        href: '/dashboard/documents',
        icon: FileText,
      },
      {
        title: 'Media Gallery',
        href: '/dashboard/media',
        icon: Image,
      },
    ],
  },
  {
    title: 'System',
    items: [
      {
        title: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { 
    isSidebarCollapsed, 
    setSidebarCollapsed, 
    isMobileSidebarOpen, 
    setMobileSidebarOpen 
  } = useDashboard();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const handleMobileClose = () => {
    setMobileSidebarOpen(false);
  };

  const handleToggleCollapse = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={handleMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-border transition-all duration-300",
          // Mobile styles
          "lg:translate-x-0",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop styles
          isSidebarCollapsed ? "lg:w-16" : "lg:w-64",
          // Mobile width
          "w-64"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-foreground">AGD Admin</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            )}
          </div>
          
          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={handleMobileClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {/* Desktop collapse button */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={handleToggleCollapse}
          >
            <ChevronLeft 
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isSidebarCollapsed && "rotate-180"
              )} 
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
          {navigation.map((section) => (
            <div key={section.title} className="space-y-1">
              {!isSidebarCollapsed && (
                <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleMobileClose}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        active 
                          ? "bg-accent text-accent-foreground" 
                          : "text-muted-foreground",
                        isSidebarCollapsed && "justify-center"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {!isSidebarCollapsed && (
                        <>
                          <span className="truncate">{item.title}</span>
                          {item.badge && (
                            <Badge 
                              variant={item.badgeVariant || 'default'} 
                              className="ml-auto h-5 w-5 shrink-0 items-center justify-center rounded-full p-0 text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-muted-foreground hover:text-foreground",
              isSidebarCollapsed && "justify-center"
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!isSidebarCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </aside>
    </>
  );
} 