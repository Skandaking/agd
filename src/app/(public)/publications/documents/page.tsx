'use client';

import { useEffect, useMemo, useState } from 'react';
// no thumbnails used on documents listing
import { FileText, Download, Calendar, Search, Filter, Eye, File } from 'lucide-react';

interface DocumentUIItem {
  id: string;
  title: string;
  date: string;
  category: string;
  fileSize: string;
  fileType: string;
  downloadCount: number;
  description: string;
  image: string; // placeholder image to keep design
  featured: boolean;
  file_url: string;
}

interface DocumentAPIItem {
  id: string | number;
  title: string;
  summary: string | null;
  category: string;
  file_name: string;
  file_url: string;
  file_mime: string;
  file_size_bytes: number;
  downloads: number;
  publishedAt?: string | null;
  createdAt?: string | null;
  image_url?: string | null;
}

export default function DocumentsPage() {
  const [items, setItems] = useState<DocumentUIItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const formatFileSize = (bytes: number) => {
    if (!bytes || bytes <= 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getFileTypeName = (mime: string, fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    const map: Record<string, string> = {
      'application/pdf': 'PDF',
      'application/msword': 'Word',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
      'application/vnd.ms-excel': 'Excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
      'text/csv': 'CSV',
      'text/plain': 'Text',
    };
    const extMap: Record<string, string> = {
      pdf: 'PDF', doc: 'Word', docx: 'Word', xls: 'Excel', xlsx: 'Excel', csv: 'CSV', txt: 'Text'
    };
    return map[mime] || extMap[ext] || (ext ? ext.toUpperCase() : 'Document');
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/documents?status=published&limit=100');
        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Failed to load documents');
        const mapped: DocumentUIItem[] = (json.items as DocumentAPIItem[]).map((d) => ({
          id: String(d.id),
          title: d.title,
          date: d.publishedAt ? new Date(d.publishedAt).toLocaleDateString() : (d.createdAt ? new Date(d.createdAt).toLocaleDateString() : ''),
          category: d.category || 'General',
          fileSize: formatFileSize(d.file_size_bytes || 0),
          fileType: getFileTypeName(d.file_mime, d.file_name),
          downloadCount: d.downloads || 0,
          description: d.summary || '',
          image: '/images/t3.jpg',
          featured: Boolean(d.downloads && d.downloads > 0),
          file_url: d.file_url,
        }));
        // Sort by downloads desc (fallback created date) and set
        setItems(mapped.sort((a, b) => (b.downloadCount - a.downloadCount)));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load documents');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(['All']);
    items.forEach((i) => set.add(i.category));
    return Array.from(set);
  }, [items]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return items.filter((d) => {
      const matchSearch = !q || d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q) || d.category.toLowerCase().includes(q);
      const matchCategory = selectedCategory === 'All' || d.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  const featuredDocuments = filtered.slice(0, 2);

  // Pagination derived values
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  const pagedDocuments = filtered.slice(start, end);

  const handleDownload = (doc: DocumentUIItem) => {
    if (!doc.id) return;
    window.open(`/api/documents/${doc.id}/download`, '_blank');
  };

  const handlePreview = (doc: DocumentUIItem) => {
    if (doc.file_url) window.open(doc.file_url, '_blank');
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[240px] flex items-center justify-center overflow-hidden">
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">Documents & Publications</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-4 px-2 sm:px-0">
            Access official documents, reports, guidelines, and publications from the AGD.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="h-1 w-8 bg-[var(--accent)] rounded-full" />
            <div className="h-1 w-8 bg-[var(--secondary)] rounded-full" />
            <div className="h-1 w-8 bg-[var(--primary)] rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-3 md:px-4 lg:px-6 xl:px-8 py-12">
        <div className="max-w-7xl mx-auto">
        {/* Search and Filter Section */}
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)]"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 mr-4">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              {categories.slice(0, 5).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    category === selectedCategory
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading documents...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-12">{error}</div>
        ) : (
          <>
            {/* Featured Documents */}
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
                <h2 className="text-3xl font-bold text-[var(--accent)]">Featured Documents</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredDocuments.map((document) => (
                  <div key={document.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                    {/* Header without image */}
                    <div className="h-40 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 flex items-center justify-between px-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-[var(--primary)]/15 rounded-lg">
                          <File className="h-7 w-7 text-[var(--primary)]" />
                        </div>
                        <span className="px-3 py-1 bg-[var(--accent)] text-white text-xs font-medium rounded-full">
                          {document.category}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {document.fileType} • {document.fileSize}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {document.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          {document.downloadCount.toLocaleString()} downloads
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[var(--accent)] transition-colors">
                        {document.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {document.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleDownload(document)} className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors">
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                        <button onClick={() => handlePreview(document)} className="flex items-center gap-2 text-[var(--secondary)] font-semibold hover:text-[var(--accent)] transition-colors">
                          <Eye className="h-4 w-4" />
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* All Documents */}
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
                <h2 className="text-3xl font-bold text-[var(--accent)]">All Documents</h2>
              </div>
              {/* Client-side pagination applied below via pagedDocuments */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pagedDocuments.map((document) => (
                  <div key={document.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-[var(--secondary)]/10 rounded-lg flex-shrink-0">
                          <FileText className="h-8 w-8 text-[var(--secondary)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium rounded-full">
                              {document.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-[var(--accent)] transition-colors line-clamp-2">
                            {document.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {document.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {document.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <File className="h-4 w-4" />
                              {document.fileSize}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleDownload(document)} className="flex items-center gap-1 bg-[var(--primary)] text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-[var(--primary)]/90 transition-colors">
                              <Download className="h-3 w-3" />
                              Download
                            </button>
                            <button onClick={() => handlePreview(document)} className="flex items-center gap-1 text-[var(--secondary)] text-sm font-semibold hover:text-[var(--accent)] transition-colors">
                              <Eye className="h-3 w-3" />
                              Preview
                            </button>
                          </div>
                          <div className="mt-2 text-xs text-gray-400">
                            {document.downloadCount.toLocaleString()} downloads
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {/* Pagination - show only when more than one page */}
            {totalPages > 1 && (
              <section className="flex justify-center mt-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg">
                    {currentPage}
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </section>
            )}
          </>
        )}
        </div>
      </div>
    </div>
  );
} 