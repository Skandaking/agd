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

export default function Topbar() {
  return (
    <div className="flex">
      <div className="w-[25%] bg-primary text-white py-3 px-4">
        <div className="flex items-center justify-start space-x-6">
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

      <div className="w-[50%] bg-primary text-white py-3">
        <div className="flex justify-center items-center">
          <span>Working Hours: Mon - Fri, 7:30 AM - 4:30 PM</span>
        </div>
      </div>

      <div className="w-[25%] bg-primary text-white py-3 px-4">
        <div className="flex items-center justify-center gap-4">
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