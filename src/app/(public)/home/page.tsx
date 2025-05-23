import { Hero } from '@/components/public/home/Hero';
import { Publications } from '@/components/public/home/Publications';
import { LatestNews } from '@/components/public/home/LatestNews';
import Link from 'next/link';
import { ChevronRight, ClipboardList, Landmark, CreditCard, Laptop } from 'lucide-react';

const agdSections = [
  {
    title: "Accounting Services",
    description:
      "Handles budget monitoring, financial reporting, and ensures compliance with public finance laws. It processes all government payments through a structured workflow, including voucher auditing and cheque issuance.",
    icon: <ClipboardList size={24} />,
    color: "bg-[var(--primary)]",
    link: "/services/accounting-services",
  },
  {
    title: "Banking and Asset Management Services",
    description:
      "Manages government accounts, revenue, and assets. Oversees banking, foreign payments, account reconciliation, and asset compliance to ensure financial control and transparency.",
    icon: <Landmark size={24} />,
    color: "bg-[var(--secondary)]",
    link: "/services/banking-asset-management",
  },
  {
    title: "Pay Services",
    description:
      "Responsible for timely salary, pension, and compensation payments for all MDAs and councils. Also manages civil servant loans, salary reconciliations, and advance funding.",
    icon: <CreditCard size={24} />,
    color: "bg-[var(--accent)]",
    link: "/services/pay-services",
  },
  {
    title: "IFMIS",
    description:
      "IFMIS improves financial management through electronic reporting and payment systems. The SAP-based system enhances transparency and was rolled out across MDAs in July 2021.",
    icon: <Laptop size={24} />,
    color:
      "bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]",
    link: "/services/ifmis",
  },
];

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

      {/* AGD Sections with Background */}
      <section className="mt-16 relative py-20">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/hero/2.JPG)`,
            backgroundAttachment: "fixed",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">
              AGD Sections
            </h2>
            <div className="h-1 w-24 bg-[var(--primary)] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agdSections.map((section, index) => (
              <Link
                key={index}
                href={section.link}
                className="group p-6 rounded-lg bg-white/95 hover:bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm block"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center mb-4 text-white`}
                >
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {section.title}
                </h3>
                <p className="text-gray-600">{section.description}</p>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 py-3 px-8 bg-white text-[var(--primary)] font-semibold rounded-lg hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
            >
              Learn More About AGD Sections
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 