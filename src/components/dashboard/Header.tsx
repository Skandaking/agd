'use client';

import { useState } from 'react';
import { 
  Menu, 
  Bell, 
  User, 
  Search, 
  Settings, 
  LogOut,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
  onSidebarToggle?: () => void;
  isSidebarCollapsed?: boolean;
}

export default function Header({ onMobileMenuToggle, onSidebarToggle, isSidebarCollapsed }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'New document uploaded', time: '2 min ago', unread: true },
    { id: 2, title: 'Event registration deadline', time: '1 hour ago', unread: true },
    { id: 3, title: 'System maintenance scheduled', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left side - Mobile menu button and sidebar toggle */}
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={onMobileMenuToggle}
          className="md:hidden text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        {/* Sidebar collapse/expand icon (desktop only) */}
        <button
          onClick={onSidebarToggle}
          className="hidden md:flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? (
            <ChevronsRight className="w-5 h-5" />
          ) : (
            <ChevronsLeft className="w-5 h-5" />
          )}
        </button>
        {/* Search bar - hidden on mobile */}
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all duration-200 w-64"
          />
        </div>
      </div>

      {/* Right side - Notifications and User menu */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--secondary)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
                      notification.unread ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.unread ? 'bg-[var(--secondary)]' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100">
                <button className="text-sm text-[var(--primary)] hover:text-[var(--primary)]/80 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            <div className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {/* User dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-gray-100">
                <p className="font-medium text-gray-900">Admin User</p>
                <p className="text-sm text-gray-500">admin@agd.gov.mw</p>
              </div>
              <div className="py-2">
                <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>
              <div className="py-2 border-t border-gray-100">
                <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
} 