'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Topbar() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-primary text-white py-2 text-sm">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-4">
          <div>{formatDate(currentDateTime)}</div>
          <div className="hidden md:block">|</div>
          <div className="hidden md:flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Hotline: +265 xxx xxxx</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/careers" className="hover:underline">Careers</Link>
          <span>|</span>
          <Link href="/tenders" className="hover:underline">Tenders</Link>
          <span>|</span>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </div>
  );
} 