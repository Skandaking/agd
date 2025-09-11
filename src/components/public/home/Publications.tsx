'use client';

import { useEffect, useState } from "react";
import { FileText, Download, ChevronRight } from "lucide-react";
import Link from "next/link";

interface DocumentAPIItem {
  id: string | number;
  title: string;
  summary: string | null;
  category: string;
  file_name: string;
  file_url: string;
  file_mime: string;
  file_size_bytes: number;
  downloads?: number;
  publishedAt?: string | null;
  createdAt?: string | null;
}

interface DocumentUIItem {
  id: string;
  title: string;
  date: string;
  fileSize: string;
  fileType: string;
  downloadUrl: string;
}

export function Publications() {
  const [items, setItems] = useState<DocumentUIItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatFileSize = (bytes: number) => {
    if (!bytes || bytes <= 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"]; 
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getFileTypeName = (mime: string, fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    const mimeMap: Record<string, string> = {
      "application/pdf": "PDF",
      "application/msword": "Word",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "Word",
      "application/vnd.ms-excel": "Excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "Excel",
      "text/csv": "CSV",
      "text/plain": "Text",
    };
    const extMap: Record<string, string> = {
      pdf: "PDF", doc: "Word", docx: "Word", xls: "Excel", xlsx: "Excel", csv: "CSV", txt: "Text",
    };
    return mimeMap[mime] || extMap[ext] || (ext ? ext.toUpperCase() : "Document");
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/documents?status=published&limit=6');
        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Failed to load documents');

        const mapped: DocumentUIItem[] = (json.items as DocumentAPIItem[]).map((d) => ({
          id: String(d.id),
          title: d.title,
          date: d.publishedAt ? new Date(d.publishedAt).toLocaleDateString() : (d.createdAt ? new Date(d.createdAt).toLocaleDateString() : ''),
          fileSize: formatFileSize(d.file_size_bytes || 0),
          fileType: getFileTypeName(d.file_mime, d.file_name),
          downloadUrl: `/api/documents/${String(d.id)}/download`,
        }));
        setItems(mapped);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load documents');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-100 flex-1 flex flex-col overflow-hidden">
      <div className="p-6 pb-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-[var(--secondary)] rounded-full" />
          <h2 className="text-2xl font-bold text-[var(--accent)]">
            Publications
          </h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-4">
          {loading ? (
            <div className="text-sm text-gray-500">Loading publications...</div>
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : items.length === 0 ? (
            <div className="text-sm text-gray-500">No publications available.</div>
          ) : (
            items.map((pub) => (
              <div 
                key={pub.id} 
                className="border rounded-lg p-4 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="mt-1 text-[var(--secondary)]">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-[var(--secondary)] transition-colors">{pub.title}</h3>
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
            ))
          )}
        </div>
      </div>
      
      <div className="p-4 border-t bg-white">
        <Link
          href="/publications/documents"
          className="flex items-center justify-center gap-2 py-2 px-4 bg-[var(--secondary)]/10 text-[var(--secondary)] font-semibold rounded-lg hover:bg-[var(--secondary)]/20 transition-all duration-300"
        >
          View All Publications
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
} 