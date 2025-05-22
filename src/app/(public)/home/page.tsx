import { Hero } from '@/components/public/home/Hero';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* About AGD */}
          <div className="lg:col-span-4">
            <section className="bg-white rounded-xl shadow-lg border border-gray-100 h-[600px] flex flex-col overflow-hidden">
              <div className="p-6 pb-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
                  <h2 className="text-2xl font-bold text-[var(--accent)]">
                    About AGD
                  </h2>
                </div>
              </div>

              <div className="flex-1 px-6 overflow-auto">
                <div className="space-y-4 py-4">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    The Accountant General&apos;s Department (AGD) is responsible for
                    the management of public finances in Malawi. Our mission is
                    to ensure transparency, accountability, and efficiency in
                    the use of public resources.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We strive to maintain the highest standards of financial
                    management and accountability in the public sector,
                    leveraging modern technology and best practices to serve the
                    nation.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    As the central accounting office of the Government, AGD is entrusted 
                    with the responsibility of managing and safeguarding public funds,
                    ensuring that they are utilized effectively and in accordance with
                    established financial regulations.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our department plays a crucial role in the implementation of the
                    Integrated Financial Management Information System (IFMIS), which
                    has significantly improved the efficiency and transparency of
                    financial operations across government agencies.
                  </p>
                </div>
              </div>

              <div className="p-4 border-t bg-white">
                <Link
                  href="/about"
                  className="flex items-center justify-center gap-2 py-2 px-4 bg-[var(--primary)]/10 text-[var(--primary)] font-semibold rounded-lg hover:bg-[var(--primary)]/20 transition-all duration-300"
                >
                  Learn More About AGD
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          </div>
          
          {/* Additional sections can be added here */}
          <div className="lg:col-span-8">
            {/* Placeholder for news or other content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <section className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
                <div className="p-6 pb-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-1 bg-[var(--secondary)] rounded-full" />
                    <h2 className="text-2xl font-bold text-[var(--accent)]">
                      Latest News
                    </h2>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <p className="text-sm text-gray-500">May 15, 2024</p>
                      <h3 className="text-lg font-semibold">Launch of New Financial Portal</h3>
                      <p className="text-gray-600">AGD has launched a new financial portal to improve service delivery...</p>
                    </div>
                    <div className="border-b pb-4">
                      <p className="text-sm text-gray-500">April 28, 2024</p>
                      <h3 className="text-lg font-semibold">IFMIS Upgrade Complete</h3>
                      <p className="text-gray-600">The upgrade of the IFMIS has been successfully completed ahead of schedule...</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t bg-white">
                  <Link
                    href="/news"
                    className="flex items-center justify-center gap-2 py-2 px-4 bg-[var(--secondary)]/10 text-[var(--secondary)] font-semibold rounded-lg hover:bg-[var(--secondary)]/20 transition-all duration-300"
                  >
                    View All News
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>
              
              <section className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
                <div className="p-6 pb-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
                    <h2 className="text-2xl font-bold text-[var(--accent)]">
                      Quick Links
                    </h2>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="space-y-3">
                    <Link href="/services" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center text-[var(--primary)]">
                          <span className="text-lg">💼</span>
                        </div>
                        <span className="font-medium">Our Services</span>
                      </div>
                    </Link>
                    
                    <Link href="/publications" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-[var(--secondary)]/10 rounded-full flex items-center justify-center text-[var(--secondary)]">
                          <span className="text-lg">📄</span>
                        </div>
                        <span className="font-medium">Publications</span>
                      </div>
                    </Link>
                    
                    <Link href="/divisions" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)]">
                          <span className="text-lg">🏢</span>
                        </div>
                        <span className="font-medium">Our Divisions</span>
                      </div>
                    </Link>
                    
                    <Link href="/contact" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center text-[var(--primary)]">
                          <span className="text-lg">📞</span>
                        </div>
                        <span className="font-medium">Contact Us</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 