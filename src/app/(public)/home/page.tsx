import { Hero } from '@/components/public/home/Hero';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Calendar, FileText, Download } from 'lucide-react';

// Sample publications data
const publications = [
  {
    id: 1,
    title: "Financial Statement 2023",
    date: "June 10, 2024",
    fileSize: "2.4 MB",
    fileType: "PDF",
    downloadUrl: "/publications/financial-statement-2023.pdf",
  },
  {
    id: 2,
    title: "Annual Budget Report",
    date: "May 22, 2024",
    fileSize: "3.7 MB",
    fileType: "PDF",
    downloadUrl: "/publications/annual-budget-report.pdf",
  },
  {
    id: 3,
    title: "Procurement Guidelines",
    date: "April 15, 2024",
    fileSize: "1.8 MB",
    fileType: "PDF",
    downloadUrl: "/publications/procurement-guidelines.pdf",
  },
];

// Sample news data
const newsItems = [
  {
    id: 1,
    title: "AGD Launches New Financial Management System",
    date: "June 15, 2024",
    excerpt: "The Accountant General's Department has successfully launched a new financial management system to enhance transparency and efficiency in public finance...",
    image: "/news/financial-system.jpg",
    slug: "agd-launches-new-financial-system",
  },
  {
    id: 2,
    title: "Annual Public Sector Financial Report Released",
    date: "May 28, 2024",
    excerpt: "The AGD has released the annual financial report for the public sector, highlighting key achievements and challenges in fiscal management over the past year...",
    image: "/news/annual-report.jpg",
    slug: "annual-public-sector-financial-report",
  },
  {
    id: 3,
    title: "Training Workshop for Government Accountants",
    date: "May 10, 2024",
    excerpt: "Over 200 government accountants participated in a capacity building workshop organized by the AGD to enhance their skills in modern financial reporting...",
    image: "/news/training-workshop.jpg",
    slug: "training-workshop-government-accountants",
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
            <section className="bg-white rounded-xl shadow-lg border border-gray-100 flex-1 flex flex-col overflow-hidden">
              <div className="p-6 pb-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
                  <h2 className="text-2xl font-bold text-[var(--accent)]">
                    Publications
                  </h2>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                <div className="p-6 space-y-4">
                  {/* Publications content will be scrollable */}
                  <div className="space-y-4">
                    {publications.map((pub) => (
                      <div 
                        key={pub.id} 
                        className="border rounded-lg p-4 hover:shadow-md transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            <div className="mt-1 text-[var(--primary)]">
                              <FileText className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold group-hover:text-[var(--primary)] transition-colors">{pub.title}</h3>
                              <p className="text-sm text-gray-500">{pub.date} • {pub.fileSize} • {pub.fileType}</p>
                            </div>
                          </div>
                          <a 
                            href={pub.downloadUrl}
                            className="p-2 text-gray-500 hover:text-[var(--secondary)] hover:bg-[var(--secondary)]/10 rounded-full transition-all"
                            title="Download"
                          >
                            <Download className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t bg-white">
                <Link
                  href="/publications"
                  className="flex items-center justify-center gap-2 py-2 px-4 bg-[var(--primary)]/10 text-[var(--primary)] font-semibold rounded-lg hover:bg-[var(--primary)]/20 transition-all duration-300"
                >
                  View All Publications
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          </div>
          
          {/* Latest News */}
          <div className="h-[600px] flex flex-col">
            <section className="bg-white rounded-xl shadow-lg border border-gray-100 flex-1 flex flex-col overflow-hidden">
              <div className="p-6 pb-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-1 bg-[var(--secondary)] rounded-full" />
                  <h2 className="text-2xl font-bold text-[var(--accent)]">
                    Latest News
                  </h2>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                <div className="p-6 space-y-6">
                  {/* News content will be scrollable */}
                  {newsItems.map((news) => (
                    <div key={news.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="flex flex-col gap-4">
                        <div className="h-[100px] relative rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                            {/* Fallback if image doesn't load */}
                            <span className="text-gray-400">AGD News</span>
                          </div>
                          <Image 
                            src={news.image} 
                            alt={news.title}
                            fill
                            className="object-cover"
                            sizes="100vw"
                          />
                        </div>
                        <div>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Calendar className="w-4 h-4 mr-1" />
                            {news.date}
                          </div>
                          <Link 
                            href={`/news/${news.slug}`}
                            className="block"
                          >
                            <h3 className="text-lg font-semibold hover:text-[var(--secondary)] transition-colors">
                              {news.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 mt-2 line-clamp-2">{news.excerpt}</p>
                          <Link 
                            href={`/news/${news.slug}`}
                            className="inline-flex items-center mt-3 text-sm font-medium text-[var(--secondary)] hover:text-[var(--primary)] transition-colors"
                          >
                            Read More
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
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
          </div>
        </div>
      </div>
    </div>
  );
} 