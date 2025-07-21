'use client';

import Link from 'next/link';
import {
  Facebook,
  Linkedin,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useState, useEffect } from 'react';

export default function Topbar() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Determine class strings based on mounted state
  const mainDivBaseClass = "flex";
  const mainDivMountedClass = "flex flex-col md:flex-row";

  const contactsDivBaseClass = "w-[25%] bg-primary text-white py-3 px-4";
  const contactsDivMountedClass = "w-full md:w-[25%] bg-primary text-white py-3 px-4 hidden sm:block";
  const contactsInnerDivBaseClass = "flex items-center justify-start space-x-6";
  const contactsInnerDivMountedClass = "flex flex-col items-center space-y-2 md:flex-row md:items-center md:justify-start md:space-y-0 md:space-x-4";

  const workingHoursDivBaseClass = "w-[50%] bg-primary text-white py-3"; // No order-first initially
  const workingHoursDivMountedClass = "w-full md:w-[50%] bg-primary text-white py-3 px-2 md:px-0 order-first md:order-none hidden sm:block";
  const workingHoursInnerDivBaseClass = "flex justify-center items-center";
  const workingHoursInnerDivMountedClass = "flex justify-center items-center text-center";

  const socialDivBaseClass = "w-[25%] bg-primary text-white py-3 px-4";
  const socialDivMountedClass = "w-full md:w-[25%] bg-primary text-white py-3 px-4";
  const socialInnerDivBaseClass = "flex items-center justify-center gap-4";
  const socialInnerDivMountedClass = "flex items-center justify-center gap-6 sm:gap-4";

  return (
    <div className={hasMounted ? mainDivMountedClass : mainDivBaseClass}>
      {/* Contacts Section - DOM order: 1st - Hidden on small screens */}
      <div className={hasMounted ? contactsDivMountedClass : contactsDivBaseClass}>
        <div className={hasMounted ? contactsInnerDivMountedClass : contactsInnerDivBaseClass}>
          <div className="flex items-center gap-1">
            <Phone size={14} />
            <a 
              href="tel:+2651788533" 
              className="hover:text-secondary transition-colors"
              aria-label="Call +265 1 788 533"
            >
              +265 1 788 533
            </a>
          </div>
          <div className="flex items-center gap-1">
            <Mail size={14} />
            <a 
              href="mailto:ag@agd.gov.mw" 
              className="hover:text-secondary transition-colors"
              aria-label="Email ag@agd.gov.mw"
            >
              ag@agd.gov.mw
            </a>
          </div>
        </div>
      </div>

      {/* Working Hours Section - DOM order: 2nd - Hidden on small screens */}
      {/* `order-first md:order-none` will apply on mount if needed */}
      <div className={hasMounted ? workingHoursDivMountedClass : workingHoursDivBaseClass}>
        <div className={hasMounted ? workingHoursInnerDivMountedClass : workingHoursInnerDivBaseClass}>
          <span>Working Hours: Mon - Fri, 7:30 AM - 4:30 PM</span>
        </div>
      </div>

      {/* Social Icons & Login Section - DOM order: 3rd - Always visible */}
      <div className={hasMounted ? socialDivMountedClass : socialDivBaseClass}>
        <div className={hasMounted ? socialInnerDivMountedClass : socialInnerDivBaseClass}>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={16} />
          </Link>
          
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </Link>
          <Link
            href="https://wa.me/2651788533"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
            aria-label="WhatsApp"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.405 3.488"/>
            </svg>
          </Link>
          <Link
            href="/login"
            className="hover:text-secondary transition-colors"
            aria-label="User login"
          >
            <User size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}