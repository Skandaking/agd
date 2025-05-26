'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/home") {
      return pathname === "/home";
    }
    return pathname?.startsWith(path);
  };

  const toggleMobileDropdown = (section: string) => {
    setOpenMobileDropdown(openMobileDropdown === section ? null : section);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
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
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Text */}
          <div className="flex items-center gap-1">
            <Image
              src="/logo.png"
              alt="Accountant General Logo"
              width={64}
              height={64}
              className="h-12 sm:h-16 w-auto"
              priority
            />
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-2xl sm:text-4xl font-bold">A</span>
                <span className="text-2xl sm:text-4xl font-bold text-red-700">G</span>
                <span className="text-2xl sm:text-4xl font-bold text-primary">D</span>
              </div>
              <div className="text-[8px] sm:text-xs uppercase tracking-wider font-bold">
                ACCOUNTANT GENERAL DEPARTMENT
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
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
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="px-2 pt-2 pb-4 space-y-1 bg-gray-50 rounded-lg mt-2">
            {/* Home Link */}
            <Link
              href="/home"
              onClick={closeMobileMenu}
              className={cn(
                "block px-4 py-3 rounded-md text-base font-medium transition-colors",
                isActive("/home")
                  ? "text-primary bg-primary/10 font-bold"
                  : "text-gray-700 hover:text-primary hover:bg-gray-100"
              )}
            >
              Home
            </Link>
            
            {/* About Mobile Section */}
            <div className="space-y-1">
              <button
                onClick={() => toggleMobileDropdown('about')}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3 rounded-md text-base font-medium transition-colors",
                  isActive("/about") || isActive("/organization-structure")
                    ? "text-primary bg-primary/10 font-bold"
                    : "text-gray-700 hover:text-primary hover:bg-gray-100"
                )}
              >
                About
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openMobileDropdown === 'about' ? "rotate-180" : ""
                  )} 
                />
              </button>
              <div className={cn(
                "overflow-hidden transition-all duration-200 ease-in-out",
                openMobileDropdown === 'about' ? "max-h-40" : "max-h-0"
              )}>
                <div className="pl-4 space-y-1">
                  <Link
                    href="/about"
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-4 py-2 rounded-md text-sm transition-colors",
                      isActive("/about")
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-gray-600 hover:text-primary hover:bg-gray-100"
                    )}
                  >
                    About AGD
                  </Link>
                  <Link
                    href="/organization-structure"
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-4 py-2 rounded-md text-sm transition-colors",
                      isActive("/organization-structure")
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-gray-600 hover:text-primary hover:bg-gray-100"
                    )}
                  >
                    Organization Structure
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Divisions Mobile Section */}
            <div className="space-y-1">
              <button
                onClick={() => toggleMobileDropdown('divisions')}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3 rounded-md text-base font-medium transition-colors",
                  isActive("/divisions")
                    ? "text-primary bg-primary/10 font-bold"
                    : "text-gray-700 hover:text-primary hover:bg-gray-100"
                )}
              >
                Divisions
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openMobileDropdown === 'divisions' ? "rotate-180" : ""
                  )} 
                />
              </button>
              <div className={cn(
                "overflow-hidden transition-all duration-200 ease-in-out",
                openMobileDropdown === 'divisions' ? "max-h-80" : "max-h-0"
              )}>
                <div className="pl-4 space-y-1">
                  <Link
                    href="/divisions/accounting-services"
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-4 py-2 rounded-md text-sm transition-colors",
                      isActive("/divisions/accounting-services")
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-gray-600 hover:text-primary hover:bg-gray-100"
                    )}
                  >
                    Accounting Services
                  </Link>
                  <Link
                    href="/divisions/banking-asset-management"
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-4 py-2 rounded-md text-sm transition-colors",
                      isActive("/divisions/banking-asset-management")
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-gray-600 hover:text-primary hover:bg-gray-100"
                    )}
                  >
                    Banking & Asset Management
                  </Link>
                  <Link
                    href="/divisions/pay-services"
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-4 py-2 rounded-md text-sm transition-colors",
                      isActive("/divisions/pay-services")
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-gray-600 hover:text-primary hover:bg-gray-100"
                    )}
                  >
                    Pay Services
                  </Link>
                  <Link
                    href="/divisions/ifmis"
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-4 py-2 rounded-md text-sm transition-colors",
                      isActive("/divisions/ifmis")
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-gray-600 hover:text-primary hover:bg-gray-100"
                    )}
                  >
                    IFMIS Division
                  </Link>
                  <Link
                    href="/divisions/administration"
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-4 py-2 rounded-md text-sm transition-colors",
                      isActive("/divisions/administration")
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-gray-600 hover:text-primary hover:bg-gray-100"
                    )}
                  >
                    Administration & Support Services
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Projects Mobile Section */}
            <div className="space-y-1">
              <button
                onClick={() => toggleMobileDropdown('projects')}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3 rounded-md text-base font-medium transition-colors",
                  isActive("/projects")
                    ? "text-primary bg-primary/10 font-bold"
                    : "text-gray-700 hover:text-primary hover:bg-gray-100"
                )}
              >
                Projects
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openMobileDropdown === 'projects' ? "rotate-180" : ""
                  )} 
                />
              </button>
              <div className={cn(
                "overflow-hidden transition-all duration-200 ease-in-out",
                openMobileDropdown === 'projects' ? "max-h-32" : "max-h-0"
              )}>
                <div className="pl-4 space-y-1">
                  <Link
                    href="/projects/ifmis-implementations"
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-4 py-2 rounded-md text-sm transition-colors",
                      isActive("/projects/ifmis-implementations")
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-gray-600 hover:text-primary hover:bg-gray-100"
                    )}
                  >
                    IFMIS Implementations
                  </Link>
                  <Link
                    href="/projects/ipsas-implementation"
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-4 py-2 rounded-md text-sm transition-colors",
                      isActive("/projects/ipsas-implementation")
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-gray-600 hover:text-primary hover:bg-gray-100"
                    )}
                  >
                    IPSAS Implementation
                  </Link>
                </div>
              </div>
            </div>

            {/* Publications Mobile Section */}
            <div className="space-y-1">
              <button
                onClick={() => toggleMobileDropdown('publications')}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3 rounded-md text-base font-medium transition-colors",
                  isActive("/publications")
                    ? "text-primary bg-primary/10 font-bold"
                    : "text-gray-700 hover:text-primary hover:bg-gray-100"
                )}
              >
                Publications
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openMobileDropdown === 'publications' ? "rotate-180" : ""
                  )} 
                />
              </button>
              <div className={cn(
                "overflow-hidden transition-all duration-200 ease-in-out",
                openMobileDropdown === 'publications' ? "max-h-32" : "max-h-0"
              )}>
                <div className="pl-4 space-y-1">
                  <Link
                    href="/publications/news-events"
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-4 py-2 rounded-md text-sm transition-colors",
                      isActive("/publications/news-events")
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-gray-600 hover:text-primary hover:bg-gray-100"
                    )}
                  >
                    News and Events
                  </Link>
                  <Link
                    href="/publications/press-release"
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-4 py-2 rounded-md text-sm transition-colors",
                      isActive("/publications/press-release")
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-gray-600 hover:text-primary hover:bg-gray-100"
                    )}
                  >
                    Press Release
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Other mobile navigation items */}
            <Link
              href="/services"
              onClick={closeMobileMenu}
              className={cn(
                "block px-4 py-3 rounded-md text-base font-medium transition-colors",
                isActive("/services")
                  ? "text-primary bg-primary/10 font-bold"
                  : "text-gray-700 hover:text-primary hover:bg-gray-100"
              )}
            >
              Services
            </Link>
            
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className={cn(
                "block px-4 py-3 rounded-md text-base font-medium transition-colors",
                isActive("/contact")
                  ? "text-primary bg-primary/10 font-bold"
                  : "text-gray-700 hover:text-primary hover:bg-gray-100"
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