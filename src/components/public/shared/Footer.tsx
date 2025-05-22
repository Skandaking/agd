'use client';

import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[var(--primary)] to-[#045830] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b-2 border-white/20 pb-2">
              About AGD
            </h3>
            <p className="text-white/90 leading-relaxed text-sm">
              The Accountant General&apos;s Department is responsible for the
              management of public finances in Malawi, ensuring transparency and
              accountability in all financial operations.
            </p>
            <div className="flex items-center gap-5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Facebook className="h-5 w-5 text-white/90 hover:text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Twitter className="h-5 w-5 text-white/90 hover:text-white" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Linkedin className="h-5 w-5 text-white/90 hover:text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Instagram className="h-5 w-5 text-white/90 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b-2 border-white/20 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { text: "About Us", href: "/about" },
                { text: "Services", href: "/services" },
                { text: "Publications", href: "/publications" },
                { text: "News & Updates", href: "/news" },
                { text: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"
                  >
                    <span className="text-sm">→</span>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b-2 border-white/20 pb-2">
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                "Financial Management",
                "IFMIS Support",
                "Budget Execution",
                "Treasury Operations",
                "Financial Reporting",
              ].map((service) => (
                <li
                  key={service}
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-sm">•</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b-2 border-white/20 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/80 group hover:text-white transition-colors">
                <MapPin className="h-5 w-5 text-white/90 flex-shrink-0 mt-1 group-hover:text-white" />
                <span className="text-sm">
                  Capital Hill, P.O. Box 30049, Lilongwe 3, Malawi
                </span>
              </li>
              <li className="flex items-center gap-3 text-white/80 group hover:text-white transition-colors">
                <Phone className="h-5 w-5 text-white/90 group-hover:text-white" />
                <span className="text-sm">+265 1 789 000</span>
              </li>
              <li className="flex items-center gap-3 text-white/80 group hover:text-white transition-colors">
                <Mail className="h-5 w-5 text-white/90 group-hover:text-white" />
                <a
                  href="mailto:info@agd.gov.mw"
                  className="text-sm hover:text-white transition-colors"
                >
                  info@agd.gov.mw
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Accountant General&apos;s Department. All
              rights reserved.
            </p>
            <div className="flex items-center gap-8 text-sm">
              {["Privacy Policy", "Terms of Use", "Sitemap"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 