import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, FileText, CheckCircle, CreditCard, Shield, ArrowRight } from 'lucide-react';

export default function AccountingServices() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/images/t1.jpg)`,
          }}
        >
          {/* Lighter overlay with reduced opacity */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/70 to-[var(--secondary)]/70" />
        </div>

        {/* Decorative Elements - reduced opacity */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-24 h-24 bg-[var(--accent)]/5 rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[var(--secondary)]/5 rounded-tl-full" />
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-[var(--primary)]/5 rounded-full transform -translate-y-1/2" />
          <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-[var(--accent)]/5 rounded-full" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 text-center z-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-white">Accounting Services Division</h1>
            <p className="text-xl text-white/90 font-medium mb-4">
              Monitoring Budget Implementation, Production of Public Financial Reports, 
              and ensuring total compliance to Public Finance Laws and Regulations.
            </p>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" />
                <span className="text-sm">48-Hour Processing</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Regulatory Compliance</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Financial Reporting</span>
              </div>
            </div>
            <div className="mt-8 flex justify-center gap-2">
              <div className="h-1 w-12 bg-[var(--accent)] rounded-full" />
              <div className="h-1 w-12 bg-[var(--secondary)] rounded-full" />
              <div className="h-1 w-12 bg-[var(--primary)] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Overview Section */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Text Content - Left Side */}
            <div className="flex-1 space-y-6">
              <div className="border-l-4 border-[var(--accent)] pl-6">
                <h2 className="text-3xl font-bold text-[var(--accent)]">
                  Financial Reporting & Accounting Services
                </h2>
                <div className="mt-3 flex gap-2">
                  <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
                </div>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[var(--primary)] shadow-sm">
                  <p className="text-lg">
                    Accounting services is a division under AGD which is responsible for monitoring of Budget Implementation, 
                    Production of Public Financial Reports and making sure that there is total compliance to Public Finance Laws and Regulations.
                  </p>
                </div>

                <p className="text-lg text-gray-600">
                  Apart from Accounting Services, there is also Pay Services division in the same department that is entrusted 
                  with making all transactions done by government which includes Payment of Salaries, Pensions and Gratuities, 
                  Remittances, Civil Servants Loans and settlement of Compensation Claims.
                </p>
              </div>
            </div>

            {/* Image - Right Side */}
            <div className="flex-1 md:max-w-[40%]">
              <div className="sticky top-24 space-y-4">
                <div className="relative h-[300px] overflow-hidden rounded-xl shadow-xl border border-gray-100">
                  <Image
                    src="/images/t1.jpg"
                    alt="Financial reporting and accounting services"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="text-center">
                      <div className="text-3xl font-bold">48hrs</div>
                      <div className="text-sm text-white/90">Processing Time</div>
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
          </div>
        </section>

        {/* Achievement Banner */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-3">Our Achievements</h3>
                <p className="text-white/90 leading-relaxed">
                  Through these two divisions, Accounting and Pay Services, AGD have achieved accountability 
                  and Transparency to National Assembly through timely production of Financial Reporting and 
                  have managed to use electronic means to make payments; Salaries, Pensions and remittances.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                    <CheckCircle className="w-6 h-6 mx-auto mb-1" />
                    <div className="font-semibold text-sm">Accountability</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                    <Shield className="w-6 h-6 mx-auto mb-1" />
                    <div className="font-semibold text-sm">Transparency</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Functions */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[var(--primary)]/10 p-4 rounded-lg">
              <CreditCard className="h-8 w-8 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[var(--accent)]">Core Functions</h2>
              <div className="flex gap-2 mt-2">
                <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-[var(--primary)]/50">
              <div className="bg-[var(--primary)]/10 p-3 rounded-lg">
                <CreditCard className="h-6 w-6 text-[var(--primary)] flex-shrink-0" />
              </div>
              <div>
                <h3 className="font-bold text-[var(--accent)] mb-2">Payment Processing</h3>
                <p className="text-gray-600 text-sm">
                  The division is responsible for processing of all government payments with efficiency and accuracy.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-[var(--secondary)]/50">
              <div className="bg-[var(--secondary)]/10 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-[var(--secondary)] flex-shrink-0" />
              </div>
              <div>
                <h3 className="font-bold text-[var(--accent)] mb-2">Electronic Fund Transfer</h3>
                <p className="text-gray-600 text-sm">
                  Receiving payment vouchers from MDAs and process all the payments using Electronic Fund Transfer (EFT).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Operate */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[var(--secondary)]/10 p-4 rounded-lg">
              <FileText className="h-8 w-8 text-[var(--secondary)]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[var(--accent)]">How We Operate</h2>
              <div className="flex gap-2 mt-2">
                <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Front Office Reception", desc: "The front office receives payment vouchers from MDAs and performs initial checks." },
                  { step: 2, title: "Pre-Audit Process", desc: "Vouchers are forwarded to Pre-audit for thorough pre-auditing procedures." },
                  { step: 3, title: "Cheque Printing", desc: "Approved vouchers are sent to cheque printing section where cheques are generated." },
                  { step: 4, title: "Authorization & Signing", desc: "Cheques are signed by the responsible officers for final authorization." },
                  { step: 5, title: "Dispatch", desc: "Finally, they are dispatched to MDAs by the dispatch office." }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300 border border-gray-200">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 bg-[var(--primary)]/10 rounded-full flex items-center justify-center text-[var(--primary)] font-bold text-sm shadow-sm">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--accent)] mb-1 text-sm">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square relative rounded-xl overflow-hidden shadow-lg border border-gray-100">
                <Image
                  src="/images/t5.jpg"
                  alt="Government operations workflow"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Client Information */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[var(--accent)]/10 p-4 rounded-lg">
              <Users className="h-8 w-8 text-[var(--accent)]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[var(--accent)]">Client Information</h2>
              <div className="flex gap-2 mt-2">
                <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[var(--primary)]/10 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <h3 className="font-bold text-[var(--accent)]">Our Clients</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Our clients are all Ministries, Departments and Agencies (MDAs) across the government of Malawi.
              </p>
              <div className="flex items-center gap-2 text-[var(--primary)] font-semibold text-sm">
                <span>All Government MDAs</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[var(--secondary)]/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-[var(--secondary)]" />
                </div>
                <h3 className="font-bold text-[var(--accent)]">Service Expectations</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[var(--primary)] mt-1 flex-shrink-0" />
                  <p className="text-gray-600 text-sm">Efficiency of processing payments within 48 hours</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[var(--primary)] mt-1 flex-shrink-0" />
                  <p className="text-gray-600 text-sm">Clients should bring payment vouchers that are fully authorized with relevant attachments</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-3">Need Our Services?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto text-sm">
              Contact us for efficient and reliable accounting services. We&apos;re here to serve all government MDAs 
              with transparency and accountability.
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