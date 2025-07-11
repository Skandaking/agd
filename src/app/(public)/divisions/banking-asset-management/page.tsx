import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, CreditCard, ArrowRight, Banknote, LineChart, Landmark, Scale, Globe } from 'lucide-react';

export default function BankingAssetManagementPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[260px] flex items-center justify-center overflow-hidden py-8 px-2 sm:px-4 md:py-0 md:h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/hero/6.JPG)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/70 to-[var(--secondary)]/70" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-16 h-16 bg-[var(--accent)]/5 rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-[var(--secondary)]/5 rounded-tl-full" />
          <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-[var(--primary)]/5 rounded-full -translate-y-1/2" />
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-[var(--accent)]/5 rounded-full" />
        </div>

        <div className="relative w-full max-w-3xl mx-auto text-center z-10 flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">Banking & Asset Management</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-4 px-2 sm:px-0">
            Strengthening and managing assets owned by the government with diligence and transparency.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="h-1 w-8 bg-[var(--accent)] rounded-full" />
            <div className="h-1 w-8 bg-[var(--secondary)] rounded-full" />
            <div className="h-1 w-8 bg-[var(--primary)] rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">

        {/* Overview Section */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-6">
              <div className="border-l-4 border-[var(--accent)] pl-6">
                <h2 className="text-3xl font-bold text-[var(--accent)]">
                  Strengthening Government Assets
                </h2>
                <div className="mt-3 flex gap-2">
                  <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[var(--primary)] shadow-sm">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Banking and Asset Management (BAM) is a pivotal division responsible for the strategic management and strengthening of all government-owned assets.
                </p>
              </div>
            </div>
            <div className="flex-1 md:max-w-[40%]">
              <div className="relative h-[300px] overflow-hidden rounded-xl shadow-xl border border-gray-100">
                <Image
                  src="/pictures/DSC_1307.JPG"
                  alt="Asset Management"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="text-center">
                      <div className="text-3xl font-bold">BAM</div>
                      <div className="text-sm text-white/90">Banking and Asset Management</div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="hidden md:flex justify-end gap-2 pt-2">
                  <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
                </div>
            </div>
          </div>
        </section>

        {/* Core Functions */}
        <section className="bg-[var(--accent)] text-[var(--accent-foreground)] rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[var(--accent-foreground)]/10 p-4 rounded-lg">
              <CheckCircle className="h-8 w-8 text-[var(--accent-foreground)]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Core Functions</h2>
              <div className="flex gap-2 mt-2">
                <div className="h-1.5 w-12 bg-[var(--accent-foreground)] rounded-full" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Account Monitoring", icon: <Banknote/> },
              { title: "Reconciliation", icon: <Scale/> },
              { title: "Revenue Accounting", icon: <LineChart/> },
              { title: "Asset Compliance", icon: <Landmark/> }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-[var(--accent-foreground)]/10 rounded-lg border border-[var(--accent-foreground)]/20">
                <div className="text-[var(--primary)]">{item.icon}</div>
                <span className="font-medium text-md">{item.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* BAM Sections */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--accent)]">Division Sections</h2>
            <p className="text-gray-600 mt-2">BAM is comprised of the following specialized sections:</p>
            <div className="mt-3 flex justify-center gap-2">
              <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
              <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
              <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
            </div>
          </div>
          <div className="space-y-6">
            {[
              { 
                title: "Foreign Payments", 
                desc: "Handles foreign payment transfers, processes advances, and manages fund transfers from deposit accounts.",
                icon: <Globe className="text-[var(--primary)]"/>
              },
              { 
                title: "Banking", 
                desc: "Responsible for ORT and salaries funding, opening/closing bank accounts, paying commissions, and preparing transfers.",
                icon: <CreditCard className="text-[var(--primary)]"/>
              },
              { 
                title: "Reconciliation", 
                desc: "Manages the reconciliation of all government accounts and prepares the final accounts.",
                icon: <Scale className="text-[var(--secondary)]"/>
              },
              { 
                title: "Revenue", 
                desc: "Holds the sole responsibility for enhancing revenue accountability and comprehensive reporting.",
                icon: <LineChart className="text-[var(--secondary)]"/>
              },
              { 
                title: "Asset Management", 
                desc: "Tasked with enhancing transparency and ensuring full compliance with asset management standards.",
                icon: <Landmark className="text-[var(--accent)]"/>
              }
            ].map((section, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-200 hover:border-[var(--primary)] transition">
                <div className="p-3 bg-white rounded-lg shadow-sm">{section.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--accent)] mb-1">{section.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{section.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-3">Need Our Services?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto text-sm">
              Contact us for expert banking and asset management services.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[var(--primary)] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
} 