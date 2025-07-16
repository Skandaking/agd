'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Newspaper, 
  Megaphone, 
  Calendar, 
  FileText, 
  Image, 
  User, 
  LogOut,
  Building2,
  X
} from 'lucide-react';

const navigation = [
  {
    name: 'Main',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    name: 'Content',
    items: [
      { name: 'News', href: '/dashboard/news', icon: Newspaper },
      { name: 'Press Releases', href: '/dashboard/press-releases', icon: Megaphone },
      { name: 'Events', href: '/dashboard/events', icon: Calendar },
      { name: 'Documents', href: '/dashboard/documents', icon: FileText },
      { name: 'Media Gallery', href: '/dashboard/media', icon: Image },
    ],
  },
  {
    name: 'Settings',
    items: [
      { name: 'Profile', href: '/dashboard/profile', icon: User },
    ],
  },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--primary)] text-white">
      {/* Logo/Brand */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl">AGD Admin</h1>
            <p className="text-white/70 text-xs">Dashboard</p>
          </div>
        </div>
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
        {navigation.map((section) => (
          <div key={section.name}>
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 px-2">
              {section.name}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                        active
                          ? 'bg-white/15 text-white shadow-sm'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 transition-transform duration-200 ${
                        active ? 'scale-110' : 'group-hover:scale-105'
                      }`} />
                      <span>{item.name}</span>
                      {active && (
                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 group">
          <LogOut className="w-4 h-4 group-hover:scale-105 transition-transform duration-200" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
} 