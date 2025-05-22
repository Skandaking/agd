'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/home") {
      return pathname === "/home";
    }
    return pathname?.startsWith(path);
  };

  const navItems = [
    { label: "Home", href: "/home" },
    { label: "About Us", href: "/about" },
    { label: "Divisions", href: "/divisions" },
    { label: "Publications", href: "/publications" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Text */}
          <div className="flex items-center gap-1">
            <Image
              src="/logo.png"
              alt="Accountant General Logo"
              width={64}
              height={64}
              className="h-16 w-auto"
              priority
            />
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">A</span>
                <span className="text-4xl font-bold text-red-700">G</span>
                <span className="text-4xl font-bold text-primary">D</span>
              </div>
              <div className="text-xs uppercase tracking-wider font-bold">
                ACCOUNTANT GENERAL DEPARTMNET
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              // Home link
              if (item.label === "Home") {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "transition-colors",
                      isActive(item.href)
                        ? "text-primary font-bold"
                        : "text-gray-700 hover:text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }
              
              // About dropdown
              if (item.label === "About Us") {
                return (
                  <div key={item.label} className="relative group">
                    <button
                      className={cn(
                        "flex items-center gap-1 transition-colors",
                        isActive("/about") || isActive("/organization-structure")
                          ? "text-primary font-bold"
                          : "text-gray-700 hover:text-primary"
                      )}
                    >
                      About
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <Link
                        href="/about"
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors",
                          isActive("/about")
                            ? "text-primary font-bold"
                            : "text-gray-700"
                        )}
                      >
                        About AGD
                      </Link>
                      <Link
                        href="/organization-structure"
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors",
                          isActive("/organization-structure")
                            ? "text-primary font-bold"
                            : "text-gray-700"
                        )}
                      >
                        Organization Structure
                      </Link>
                    </div>
                  </div>
                );
              }
              
              // Divisions dropdown
              if (item.label === "Divisions") {
                return (
                  <div key={item.label} className="relative group">
                    <button
                      className={cn(
                        "flex items-center gap-1 transition-colors",
                        isActive("/divisions")
                          ? "text-primary font-bold"
                          : "text-gray-700 hover:text-primary"
                      )}
                    >
                      Divisions
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <Link
                        href="/divisions/accounting-services"
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors",
                          isActive("/divisions/accounting-services")
                            ? "text-primary font-bold"
                            : "text-gray-700"
                        )}
                      >
                        Accounting Services
                      </Link>
                      <Link
                        href="/divisions/banking-asset-management"
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors",
                          isActive("/divisions/banking-asset-management")
                            ? "text-primary font-bold"
                            : "text-gray-700"
                        )}
                      >
                        Banking & Asset Management
                      </Link>
                      <Link
                        href="/divisions/pay-services"
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors",
                          isActive("/divisions/pay-services")
                            ? "text-primary font-bold"
                            : "text-gray-700"
                        )}
                      >
                        Pay Services
                      </Link>
                      <Link
                        href="/divisions/ifmis"
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors",
                          isActive("/divisions/ifmis")
                            ? "text-primary font-bold"
                            : "text-gray-700"
                        )}
                      >
                        IFMIS Division
                      </Link>
                      <Link
                        href="/divisions/administration"
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors",
                          isActive("/divisions/administration")
                            ? "text-primary font-bold"
                            : "text-gray-700"
                        )}
                      >
                        Administration & Support Services
                      </Link>
                    </div>
                  </div>
                );
              }
              
              // Projects dropdown
              if (item.label === "Projects") {
                return (
                  <div key={item.label} className="relative group">
                    <button
                      className={cn(
                        "flex items-center gap-1 transition-colors",
                        isActive("/projects")
                          ? "text-primary font-bold"
                          : "text-gray-700 hover:text-primary"
                      )}
                    >
                      Projects
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <Link
                        href="/projects/ifmis-implementations"
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors",
                          isActive("/projects/ifmis-implementations")
                            ? "text-primary font-bold"
                            : "text-gray-700"
                        )}
                      >
                        IFMIS Implementations
                      </Link>
                      <Link
                        href="/projects/ipsas-implementation"
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors",
                          isActive("/projects/ipsas-implementation")
                            ? "text-primary font-bold"
                            : "text-gray-700"
                        )}
                      >
                        IPSAS Implementation
                      </Link>
                    </div>
                  </div>
                );
              }
              
              // Publications dropdown
              if (item.label === "Publications") {
                return (
                  <div key={item.label} className="relative group">
                    <button
                      className={cn(
                        "flex items-center gap-1 transition-colors",
                        isActive("/publications")
                          ? "text-primary font-bold"
                          : "text-gray-700 hover:text-primary"
                      )}
                    >
                      Publications
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <Link
                        href="/publications/news-events"
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors",
                          isActive("/publications/news-events")
                            ? "text-primary font-bold"
                            : "text-gray-700"
                        )}
                      >
                        News and Events
                      </Link>
                      <Link
                        href="/publications/press-release"
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors",
                          isActive("/publications/press-release")
                            ? "text-primary font-bold"
                            : "text-gray-700"
                        )}
                      >
                        Press Release
                      </Link>
                    </div>
                  </div>
                );
              }
              
              // Other simple links (Services, Contact)
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    isActive(item.href)
                      ? "text-primary font-bold"
                      : "text-gray-700 hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/home"
              className={cn(
                "block py-2 transition-colors",
                isActive("/home")
                  ? "text-primary font-bold"
                  : "text-gray-700 hover:text-primary"
              )}
            >
              Home
            </Link>
            
            {/* About Mobile Section */}
            <div className="py-2">
              <span
                className={cn(
                  "block font-medium mb-2",
                  isActive("/about")
                    ? "text-primary font-bold"
                    : "text-gray-700"
                )}
              >
                About
              </span>
              <Link
                href="/about"
                className={cn(
                  "block pl-4 py-2 transition-colors",
                  isActive("/about")
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                About AGD
              </Link>
              <Link
                href="/organization-structure"
                className={cn(
                  "block pl-4 py-2 transition-colors",
                  isActive("/organization-structure")
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                Organization Structure
              </Link>
            </div>
            
            {/* Divisions Mobile Section */}
            <div className="py-2">
              <span
                className={cn(
                  "block font-medium mb-2",
                  isActive("/divisions")
                    ? "text-primary font-bold"
                    : "text-gray-700"
                )}
              >
                Divisions
              </span>
              <Link
                href="/divisions/accounting-services"
                className={cn(
                  "block pl-4 py-2 transition-colors",
                  isActive("/divisions/accounting-services")
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                Accounting Services
              </Link>
              <Link
                href="/divisions/banking-asset-management"
                className={cn(
                  "block pl-4 py-2 transition-colors",
                  isActive("/divisions/banking-asset-management")
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                Banking & Asset Management
              </Link>
              <Link
                href="/divisions/pay-services"
                className={cn(
                  "block pl-4 py-2 transition-colors",
                  isActive("/divisions/pay-services")
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                Pay Services
              </Link>
              <Link
                href="/divisions/ifmis"
                className={cn(
                  "block pl-4 py-2 transition-colors",
                  isActive("/divisions/ifmis")
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                IFMIS Division
              </Link>
              <Link
                href="/divisions/administration"
                className={cn(
                  "block pl-4 py-2 transition-colors",
                  isActive("/divisions/administration")
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                Administration & Support Services
              </Link>
            </div>
            
            {/* Projects Mobile Section */}
            <div className="py-2">
              <span
                className={cn(
                  "block font-medium mb-2",
                  isActive("/projects")
                    ? "text-primary font-bold"
                    : "text-gray-700"
                )}
              >
                Projects
              </span>
              <Link
                href="/projects/ifmis-implementations"
                className={cn(
                  "block pl-4 py-2 transition-colors",
                  isActive("/projects/ifmis-implementations")
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                IFMIS Implementations
              </Link>
              <Link
                href="/projects/ipsas-implementation"
                className={cn(
                  "block pl-4 py-2 transition-colors",
                  isActive("/projects/ipsas-implementation")
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                IPSAS Implementation
              </Link>
            </div>

            {/* Publications Mobile Section */}
            <div className="py-2">
              <span
                className={cn(
                  "block font-medium mb-2",
                  isActive("/publications")
                    ? "text-primary font-bold"
                    : "text-gray-700"
                )}
              >
                Publications
              </span>
              <Link
                href="/publications/news-events"
                className={cn(
                  "block pl-4 py-2 transition-colors",
                  isActive("/publications/news-events")
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                News and Events
              </Link>
              <Link
                href="/publications/press-release"
                className={cn(
                  "block pl-4 py-2 transition-colors",
                  isActive("/publications/press-release")
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                Press Release
              </Link>
            </div>
            
            {/* Other mobile navigation items */}
            <Link
              href="/services"
              className={cn(
                "block px-3 py-2 hover:bg-gray-50 active:text-primary rounded-md transition-colors",
                isActive("/services")
                  ? "text-primary font-bold"
                  : "text-gray-700 hover:text-primary"
              )}
            >
              Services
            </Link>
            
            <Link
              href="/contact"
              className={cn(
                "block px-3 py-2 hover:bg-gray-50 active:text-primary rounded-md transition-colors",
                isActive("/contact")
                  ? "text-primary font-bold"
                  : "text-gray-700 hover:text-primary"
              )}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 