import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGD Admin Dashboard",
  description: "Administration dashboard for the Accountant General Department website",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white p-6 hidden md:block">
        <div className="font-bold text-xl mb-8">AGD Admin</div>
        <nav className="space-y-6">
          <div className="space-y-2">
            <div className="text-white/60 text-sm font-medium uppercase">Main</div>
            <a 
              href="/dashboard" 
              className="block py-2 px-3 rounded-md bg-white/10 text-white hover:bg-white/20"
            >
              Dashboard
            </a>
          </div>
          
          <div className="space-y-2">
            <div className="text-white/60 text-sm font-medium uppercase">Content</div>
            <a 
              href="/dashboard/news" 
              className="block py-2 px-3 rounded-md text-white hover:bg-white/10"
            >
              News
            </a>
            <a 
              href="/dashboard/media" 
              className="block py-2 px-3 rounded-md text-white hover:bg-white/10"
            >
              Media
            </a>
            <a 
              href="/dashboard/press-releases" 
              className="block py-2 px-3 rounded-md text-white hover:bg-white/10"
            >
              Press Releases
            </a>
          </div>
          
          <div className="space-y-2">
            <div className="text-white/60 text-sm font-medium uppercase">Settings</div>
            <a 
              href="/dashboard/profile" 
              className="block py-2 px-3 rounded-md text-white hover:bg-white/10"
            >
              Profile
            </a>
            <button 
              className="block w-full text-left py-2 px-3 rounded-md text-white hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </nav>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top navigation */}
        <header className="h-16 border-b bg-white flex items-center px-6 justify-between">
          <button className="md:hidden text-gray-500">
            {/* Menu icon - would use an actual icon in production */}
            ☰
          </button>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* Notification bell - would use an actual icon in production */}
              🔔
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200">
              {/* User avatar */}
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
} 