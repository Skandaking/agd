'use client';

import Link from 'next/link';
import {
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
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
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Linkedin className="h-5 w-5 text-white/90 hover:text-white" />
              </a>
              <a
                href="https://wa.me/2651788533"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="WhatsApp"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className="w-5 h-5 text-white/90 hover:text-white"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.405 3.488"/>
                </svg>
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
                  href="mailto:enquiries@agd.gov.mw"
                  className="text-sm hover:text-white transition-colors"
                >
                  enquiries@agd.gov.mw
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