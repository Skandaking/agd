'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  isMobile?: boolean;
}

export default function Navbar({ isMobile = false }: NavbarProps) {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Divisions', href: '/divisions' },
    { name: 'Projects', href: '/projects' },
    { name: 'Media', href: '/media' },
  ];

  return (
    <nav className={`${isMobile ? 'flex flex-col space-y-3' : 'flex gap-6'}`}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`${isActive 
              ? 'text-primary font-medium' 
              : 'text-foreground hover:text-primary'
            } transition-colors ${isMobile ? 'py-2' : ''}`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
} 