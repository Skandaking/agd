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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About AGD */}
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
          
          {/* Publications */}
          <div className="h-[600px] flex flex-col">
            <Publications />
          </div>
          
          {/* Latest News */}
          <div className="h-[600px] flex flex-col">
            <LatestNews />
          </div>
        </div>
      </div>

      {/* AGD Sections */}
      <div className="relative py-20 mt-12">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/hero/2.JPG)' }}>
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Divisions</h2>
            <div className="h-1 w-32 bg-[var(--primary)] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Accounting Services */}
            <div className="backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 text-white">
              <div className="bg-[var(--primary)]/20 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                <span className="text-3xl">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Accounting Services</h3>
              <p className="text-white/80 leading-relaxed">
                Handles budget monitoring, financial reporting, and ensures compliance with public finance laws. 
                It processes all government payments through a structured workflow, including voucher auditing 
                and cheque issuance.
              </p>
            </div>
            
            {/* Banking and Asset Management Services */}
            <div className="backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 text-white">
              <div className="bg-[var(--secondary)]/20 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                <span className="text-3xl">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Banking and Asset Management Services</h3>
              <p className="text-white/80 leading-relaxed">
                Manages government accounts, revenue, and assets. Oversees banking, foreign payments, account 
                reconciliation, and asset compliance to ensure financial control and transparency.
              </p>
            </div>
            
            {/* Pay Services */}
            <div className="backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 text-white">
              <div className="bg-[var(--accent)]/20 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                <span className="text-3xl">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Pay Services</h3>
              <p className="text-white/80 leading-relaxed">
                Responsible for timely salary, pension, and compensation payments for all MDAs and councils. 
                Also manages civil servant loans, salary reconciliations, and advance funding.
              </p>
            </div>
            
            {/* Administration and Support Services */}
            <div className="backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 text-white">
              <div className="bg-[var(--primary)]/20 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                <span className="text-3xl">4</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Administration and Support Services</h3>
              <p className="text-white/80 leading-relaxed">
                Supports AGD operations through HR, procurement, planning, and security services. Focuses on 
                capacity building and efficient delivery of internal administrative functions.
              </p>
            </div>
            
            {/* Integrated Financial Management Information System (IFMIS) */}
            <div className="backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 text-white md:col-span-2 lg:col-span-1">
              <div className="bg-[var(--secondary)]/20 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                <span className="text-3xl">5</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Integrated Financial Management Information System (IFMIS)</h3>
              <p className="text-white/80 leading-relaxed">
                IFMIS improves financial management through electronic reporting and payment systems. The SAP-based 
                system enhances transparency and was rolled out across MDAs in July 2021.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/divisions"
              className="inline-flex items-center gap-2 py-3 px-8 bg-white text-[var(--primary)] font-semibold rounded-full hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
            >
              Learn More About Our Divisions
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 