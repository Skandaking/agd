'use client';

import { FileText, Download, ChevronRight } from "lucide-react";
import Link from "next/link";

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

export function Publications() {
  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
      <div className="p-6 pb-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
          <h2 className="text-2xl font-bold text-[var(--accent)]">
            Publications
          </h2>
        </div>
      </div>
      
      <div className="flex-1 p-6">
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
  );
} 