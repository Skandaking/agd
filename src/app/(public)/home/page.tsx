import { Hero } from '@/components/public/home/Hero';
import { Publications } from '@/components/public/home/Publications';
import { LatestNews } from '@/components/public/home/LatestNews';
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
          
          {/* Main content sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-8">
              {/* Publications in the middle */}
              <Publications />
              
              {/* Latest News at the end */}
              <LatestNews />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 