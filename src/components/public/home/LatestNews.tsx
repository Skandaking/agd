'use client';

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";

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

export function LatestNews() {
  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-100 flex-1 flex flex-col overflow-hidden">
      <div className="p-6 pb-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
          <h2 className="text-2xl font-bold text-[var(--accent)]">
            Latest News
          </h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
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
                    <h3 className="text-lg font-semibold hover:text-[var(--accent)] transition-colors">
                      {news.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mt-2 line-clamp-2">{news.excerpt}</p>
                  <Link 
                    href={`/news/${news.slug}`}
                    className="inline-flex items-center mt-3 text-sm font-medium text-[var(--accent)] hover:text-[var(--primary)] transition-colors"
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
          className="flex items-center justify-center gap-2 py-2 px-4 bg-[var(--accent)]/10 text-[var(--accent)] font-semibold rounded-lg hover:bg-[var(--accent)]/20 transition-all duration-300"
        >
          View All News
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
} 