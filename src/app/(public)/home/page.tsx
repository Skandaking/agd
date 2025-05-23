import { Hero } from '@/components/public/home/Hero';
import { Publications } from '@/components/public/home/Publications';
import { LatestNews } from '@/components/public/home/LatestNews';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const agdSections = [
  {
    title: "IFMIS",
    description:
      "Integrated Financial Management Information System for efficient government operations.",
    icon: "💻",
    color: "bg-[var(--primary)]",
    link: "/services/ifmis",
  },
  {
    title: "Accounting Services",
    description:
      "Professional accounting and financial management services for government entities.",
    icon: "📊",
    color: "bg-[var(--secondary)]",
    link: "/services/accounting",
  },
  {
    title: "Pay Services",
    description:
      "Efficient payment processing and management for government employees.",
    icon: "💳",
    color: "bg-[var(--accent)]",
    link: "/services/pay",
  },
  {
    title: "ICT Services",
    description:
      "Technical support and infrastructure management for government systems.",
    icon: "🖥️",
    color:
      "bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]",
    link: "/services/ict",
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
              Our Services
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
                  className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center mb-4 text-2xl text-white`}
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
              View All Services
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 