'use client';

import { DashboardProvider, useDashboard } from '@/contexts/DashboardContext';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed } = useDashboard();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content area */}
      <div 
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          // Adjust margin based on sidebar state
          isSidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        {/* Header */}
        <Header />
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 lg:px-6">
            {children}
          </div>
        </main>
      </div>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>
        {children}
      </DashboardLayoutContent>
    </DashboardProvider>
  );
} 