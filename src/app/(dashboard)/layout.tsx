'use client';

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleSidebarCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[var(--primary)] transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar onClose={closeMobileMenu} />
      </aside>

      {/* Desktop sidebar - Fixed and collapsible */}
      <aside className={`hidden md:flex flex-col fixed inset-y-0 left-0 z-50 bg-[var(--primary)] transition-all duration-300 ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
        />
      </aside>
      
      {/* Main content area - Adjusts based on sidebar state */}
      <div className={`flex-1 flex flex-col transition-all duration-300 w-full max-w-none ${
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      }`}>
        {/* Header - Sticky */}
        <Header 
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onSidebarToggle={toggleSidebarCollapse}
          isSidebarCollapsed={isSidebarCollapsed}
        />
        
        {/* Page content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-gray-50 w-full max-w-none">
          <div className="p-4 md:p-6 w-full max-w-none">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 