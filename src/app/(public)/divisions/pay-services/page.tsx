import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, CheckCircle, CreditCard, ArrowRight, Banknote, Calendar, Shield, AlertCircle } from 'lucide-react';

export default function PayServicesPage() {
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">Pay Services Division</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-4 px-2 sm:px-0">
            Providing efficient and effective pay services through processing of Pensions, Advances, Salaries, and Workers Compensation.
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
        <section className=" bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-6">
            <div className="border-l-4 border-[var(--accent)] pl-6">
            <h2 className="text-3xl font-bold text-[var(--accent)]">
                  Efficient Pay Services
                </h2>
                <div className="mt-3 flex gap-2">
                  <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                  <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
                </div>
              </div>
              <div className="bg-[var(--primary-foreground)]/10 p-4 rounded-lg border-l-4 border-[var(--primary)] shadow-sm">
                <p className="text-lg leading-relaxed">
                  Pay Services Division provides efficient and effective pay services through processing of Pensions, Advances, Salaries, 
                  Workers Compensation, General Compensations and Losses, and Subscriptions.
                </p>
              </div>
            </div>
            <div className="flex-1 md:max-w-[40%]">
              <div className="relative h-[250px] overflow-hidden rounded-xl shadow-xl border border-gray-100">
                <Image
                  src="/images/t2.jpg"
                  alt="Pay Services"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Functions */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[var(--accent)]/10 p-4 rounded-lg">
              <CreditCard className="h-8 w-8 text-[var(--accent)]" />
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
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[var(--primary)] shadow-sm">
            <p className="text-lg text-gray-700 leading-relaxed">
              To provide efficient and effective pay services through processing of Pensions, Advances, Salaries and also 
              workers compensation, general compensations and losses, subscriptions.
            </p>
          </div>
        </section>

        {/* Specific Responsibilities */}
        <section className="bg-[var(--primary)]/80 text-[var(--secondary-foreground)] rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[var(--secondary-foreground)]/10 p-4 rounded-lg">
              <CheckCircle className="h-8 w-8 text-[var(--secondary)]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Specific Responsibilities</h2>
              <div className="flex gap-2 mt-2">
                <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
                <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {[
              "Requisition of salary funding for all MDAs and Councils on monthly basis",
              "Paying salaries (monthly) to all MDAs and Councils",
              "Managing Bank loans for MPs and Civil servants",
              "Processing of returned salaries",
              "Reconciliation of ATS account",
              "Processing of advance payment for AGD staff",
              "Facilitation of funding for leave grants to all votes through secretary to the treasury"
            ].map((responsibility, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-[var(--secondary-foreground)]/10 rounded-lg border border-[var(--secondary-foreground)]/20">
                <div className="flex-shrink-0 mt-1 w-6 h-6 bg-[var(--secondary-foreground) rounded-full flex items-center justify-center text-[var(--secondary)] font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-[var(--secondary-foreground)]/90 leading-relaxed">{responsibility}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Operations */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[var(--primary)]/10 p-4 rounded-lg">
              <Clock className="h-8 w-8 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[var(--accent)]">Operations</h2>
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
                  <Clock className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <h3 className="font-bold text-[var(--accent)]">Working Hours</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                The division operates from 7:30 AM to 4:30 PM. Officers often work during lunch hour due to work pressure, 
                solving client claims one-on-one.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[var(--secondary)]/10 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-[var(--secondary)]" />
                </div>
                <h3 className="font-bold text-[var(--accent)]">Salary Schedule</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Payment of salaries is scheduled from the 5th to 21st of every month. 
                The earlier information is provided, the earlier delivery is made on time.
              </p>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[var(--primary)]/10 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <h3 className="font-bold text-[var(--accent)]">Our Clients</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Pensioners</li>
                <li>• Public servants (all MDAs)</li>
                <li>• 81 votes including 28 district councils</li>
                <li>• General public</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[var(--secondary)]/10 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-[var(--secondary)]" />
                </div>
                <h3 className="font-bold text-[var(--accent)]">Service Expectations</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Timely processing of payments</li>
                <li>• Transparency & accountability</li>
                <li>• Quality client relationships</li>
                <li>• Perfect service delivery</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[var(--accent)]/5 to-[var(--primary)]/5 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[var(--accent)]/10 p-3 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <h3 className="font-bold text-[var(--accent)]">Client Requirements</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Submit necessary information in time</li>
                <li>• Provide client feedback</li>
                <li>• Understanding of service processes</li>
                <li>• Appreciation of services rendered</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Services & Processing Times */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--accent)]">Our Services & Processing Times</h2>
            <div className="mt-3 flex justify-center gap-2">
              <div className="h-1.5 w-12 bg-[var(--accent)] rounded-full" />
              <div className="h-1.5 w-12 bg-[var(--secondary)] rounded-full" />
              <div className="h-1.5 w-12 bg-[var(--primary)] rounded-full" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Regular Services */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-[var(--accent)] mb-6">Service Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pension Services */}
                <div className="bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[var(--primary)] p-3 rounded-lg">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-[var(--accent)]">Pension Services</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
                      <span>Monthly pension payments</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
                      <span>Gratuities</span>
                    </div>
                  </div>
                </div>

                {/* Compensation Services */}
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[var(--secondary)] p-3 rounded-lg">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-[var(--accent)]">Compensation Services</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-[var(--secondary)] rounded-full"></div>
                      <span>Compensations and losses</span>
                    </div>
                  </div>
                </div>

                {/* Salary Services */}
                <div className="bg-gradient-to-br from-[var(--accent)]/5 to-[var(--primary)]/5 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[var(--accent)] p-3 rounded-lg">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-[var(--accent)]">Salary Services</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                      <span>Salaries and salary arrears</span>
                    </div>
                  </div>
                </div>

                {/* Additional Services */}
                <div className="bg-gradient-to-br from-[var(--secondary)]/5 to-[var(--accent)]/5 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[var(--primary)] p-3 rounded-lg">
                      <Banknote className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-[var(--accent)]">Additional Services</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
                      <span>Advances</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
                      <span>Leave grants</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Processing Information */}
            <div>
              <h3 className="text-xl font-bold text-[var(--accent)] mb-6">Processing Information</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-[var(--primary)] p-2 rounded-lg">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-[var(--accent)]">Ideal Processing Time</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    In an ideal environment, payments take at least 72 hours with network and system working without interruption, 
                    including timely funding release.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-[var(--secondary)] p-2 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-[var(--accent)]">Funding Dependencies</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Worker&apos;s compensation, gratuities, general compensation, salary arrears, and leave grants depend on 
                    funding released from Ministry of Finance (Budget).
                  </p>
                </div>
                
                <div className="bg-[var(--accent)]/5 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-[var(--accent)] p-2 rounded-lg">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-[var(--accent)]">Service Priority</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    For workers&apos; compensation and gratuities, the division follows the first-come-first-serve rule due to inadequate funding.
                  </p>
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
              Contact us for efficient and reliable pay services. We&apos;re committed to serving all our clients 
              with transparency and timeliness.
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