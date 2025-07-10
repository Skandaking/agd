import Image from 'next/image';
import Link from 'next/link';
import { Clock, FileText, CheckCircle, CreditCard, Shield, ArrowRight, Database, Settings, TrendingUp } from 'lucide-react';

export default function IFMISPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[260px] flex items-center justify-center overflow-hidden py-8 px-2 sm:px-4 md:py-0 md:h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/hero/7.JPG)` }}
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">IFMIS-SAP Division</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-4 px-2 sm:px-0">
            Improving financial management in Government through SAP-based Integrated Financial Management Information System.
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
                  Integrated Financial Management Information System
                </h2>
                <div className="mt-3 flex gap-2">
                  <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
                </div>
              </div>
              <div className="bg-[var(--primary-foreground)]/10 p-4 rounded-lg border-l-4 border-[var(--primary)] shadow-sm">
                <p className="text-lg leading-relaxed">
                  The main purpose of implementing IFMIS is to improve financial management in Government. 
                  The current IFMIS (SAP Based IFMIS) was rolled out to all MDAs from 1 July, 2021 having been 
                  piloted on ten votes in 2020-2021 financial year with five core system modules and functionality.
                </p>
              </div>
            </div>
            <div className="flex-1 md:max-w-[40%]">
              <div className="relative h-[250px] overflow-hidden rounded-xl shadow-xl border border-gray-100">
                <Image
                  src="/images/t3.jpg"
                  alt="IFMIS-SAP System"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="bg-[var(--primary)]/80 text-[var(--secondary-foreground)] rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[var(--secondary-foreground)]/10 p-4 rounded-lg">
              <TrendingUp className="h-8 w-8 text-[var(--secondary)]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">IFMIS Objectives</h2>
              <div className="flex gap-2 mt-2">
                <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--secondary-foreground)]/10 rounded-lg p-6 border border-[var(--secondary-foreground)]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[var(--secondary)] p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--secondary-foreground)]">Expenditure Control</h3>
              </div>
              <p className="text-[var(--secondary-foreground)]/90 text-sm leading-relaxed">
                Controlling over expenditure in Government through systematic budget management and real-time monitoring.
              </p>
            </div>

            <div className="bg-[var(--secondary-foreground)]/10 rounded-lg p-6 border border-[var(--secondary-foreground)]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[var(--accent)] p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--secondary-foreground)]">Timely Reports</h3>
              </div>
              <p className="text-[var(--secondary-foreground)]/90 text-sm leading-relaxed">
                Production of timely financial reports for better decision-making and transparency in government operations.
              </p>
            </div>

            <div className="bg-[var(--secondary-foreground)]/10 rounded-lg p-6 border border-[var(--secondary-foreground)]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[var(--primary)] p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--secondary-foreground)]">Transparency</h3>
              </div>
              <p className="text-[var(--secondary-foreground)]/90 text-sm leading-relaxed">
                Enhancing transparency and accountability in government through integrated financial management systems.
              </p>
            </div>
          </div>
        </section>

        {/* Implementation Details */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[var(--accent)]/10 p-4 rounded-lg">
              <Settings className="h-8 w-8 text-[var(--accent)]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[var(--accent)]">Implementation Details</h2>
              <div className="flex gap-2 mt-2">
                <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[var(--accent)] mb-4">Rollout Timeline</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-[var(--primary)] p-2 rounded-lg">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-[var(--accent)]">Pilot Phase (2020-2021)</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Piloted on ten votes with five core system modules and functionality, changing from the original 
                    &apos;Big Bang&apos; approach to a more gradual implementation strategy.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-[var(--secondary)] p-2 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-[var(--accent)]">Full Rollout (July 2021)</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    SAP roll out to all MDAs based on the 2020-2021 pilot system functionality, with enhanced 
                    coverage and centralized payment methods.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-[var(--accent)] mb-4">System Modules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[var(--accent)]/5 to-[var(--primary)]/5 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-bold text-[var(--accent)] mb-3">Core Modules (Implemented)</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                      <span>Budget & Funds Management</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                      <span>Cash & Bank</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                      <span>General Ledger (GL)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                      <span>Procurement</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                      <span>Payment (Accounts Payable)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[var(--secondary)]/5 to-[var(--accent)]/5 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-bold text-[var(--accent)] mb-3">Additional Modules</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-[var(--secondary)] rounded-full"></div>
                      <span>Assets Management</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-[var(--secondary)] rounded-full"></div>
                      <span>Project Management</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      These modules were rolled out partially during the pilot phase.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EFT Section */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[var(--primary)]/10 p-4 rounded-lg">
              <CreditCard className="h-8 w-8 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[var(--accent)]">Electronic Funds Transfer (EFT)</h2>
              <div className="flex gap-2 mt-2">
                <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[var(--primary)] p-3 rounded-lg">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[var(--accent)]">Interim EFT Solution</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The Government implemented an interim EFT solution in conjunction with the Reserve Bank of Malawi (RBM) 
                  for all payments on the New IFMIS. The solution is interim as the RBM will be upgrading its core banking 
                  system called FLEXCUBE to latest version.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[var(--secondary)] p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[var(--accent)]">System Stability</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The interim EFT solution is largely stabilizing as most of Government payments are now being settled 
                  through this solution. Further enhancements are being implemented to ensure stability and meet 
                  Government payment requirements.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[var(--accent)]/5 to-[var(--primary)]/5 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[var(--accent)] p-3 rounded-lg">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[var(--accent)]">Payment Method Transition</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Government switched from cheque payment method to Electronic Funds Transfer (EFT) payment method 
                  with centralized pool bank accounts at Reserve Bank of Malawi, replacing positive pay bank accounts.
                </p>
              </div>
              
              <div className="bg-[var(--secondary)]/5 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[var(--secondary)] p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[var(--accent)]">Future Enhancements</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The implemented EFT solution will most likely be redesigned once the FLEXCUBE has been upgraded by RBM 
                  to handle huge volumes of government transactions more efficiently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-3">Need IFMIS Support?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto text-sm">
              Contact us for support with the IFMIS-SAP system. We&apos;re here to ensure efficient financial 
              management and system stability across all government departments.
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