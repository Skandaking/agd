'use client';

import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
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
  const contactsDivMountedClass = "w-full md:w-[25%] bg-primary text-white py-3 px-4";
  const contactsInnerDivBaseClass = "flex items-center justify-start space-x-6";
  const contactsInnerDivMountedClass = "flex flex-col items-center space-y-2 md:flex-row md:items-center md:justify-start md:space-y-0 md:space-x-4";

  const workingHoursDivBaseClass = "w-[50%] bg-primary text-white py-3"; // No order-first initially
  const workingHoursDivMountedClass = "w-full md:w-[50%] bg-primary text-white py-3 px-2 md:px-0 order-first md:order-none";
  const workingHoursInnerDivBaseClass = "flex justify-center items-center";
  const workingHoursInnerDivMountedClass = "flex justify-center items-center text-center";

  const socialDivBaseClass = "w-[25%] bg-primary text-white py-3 px-4";
  const socialDivMountedClass = "w-full md:w-[25%] bg-primary text-white py-3 px-4";
  const socialInnerDivBaseClass = "flex items-center justify-center gap-4";
  const socialInnerDivMountedClass = "flex items-center justify-center gap-3 sm:gap-4";

  return (
    <div className={hasMounted ? mainDivMountedClass : mainDivBaseClass}>
      {/* Contacts Section - DOM order: 1st */}
      <div className={hasMounted ? contactsDivMountedClass : contactsDivBaseClass}>
        <div className={hasMounted ? contactsInnerDivMountedClass : contactsInnerDivBaseClass}>
          <div className="flex items-center gap-1">
            <Phone size={14} />
            <span>+265 1 788 533</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail size={14} />
            <span>ag@agd.gov.mw</span>
          </div>
        </div>
      </div>

      {/* Working Hours Section - DOM order: 2nd */}
      {/* `order-first md:order-none` will apply on mount if needed */}
      <div className={hasMounted ? workingHoursDivMountedClass : workingHoursDivBaseClass}>
        <div className={hasMounted ? workingHoursInnerDivMountedClass : workingHoursInnerDivBaseClass}>
          <span>Working Hours: Mon - Fri, 7:30 AM - 4:30 PM</span>
        </div>
      </div>

      {/* Social Icons & Login Section - DOM order: 3rd */}
      <div className={hasMounted ? socialDivMountedClass : socialDivBaseClass}>
        <div className={hasMounted ? socialInnerDivMountedClass : socialInnerDivBaseClass}>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={16} />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={16} />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </Link>
          <Link
            href="/login"
            className="hover:text-accent transition-colors"
            aria-label="User login"
          >
            <User size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}