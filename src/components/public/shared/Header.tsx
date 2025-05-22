'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navbar from './Navbar';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b bg-background shadow-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link 
            href="/home"
            className="font-bold text-2xl text-primary flex items-center gap-2"
          >
            {/* Logo could be replaced with an actual image */}
            <span className="w-8 h-8 bg-primary text-white rounded-md flex items-center justify-center">
              AGD
            </span>
            <span className="hidden sm:inline">Accountant General Department</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <Navbar />
        </div>

        {/* Admin Link */}
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard" 
            className="rounded-md px-4 py-2 bg-primary text-white hover:opacity-90 transition-opacity"
          >
            Admin
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-500 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-3">
            <Navbar isMobile={true} />
          </div>
        </div>
      )}
    </header>
  );
} 