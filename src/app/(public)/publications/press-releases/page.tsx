'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, Filter, Megaphone } from 'lucide-react';

interface PressReleaseUIItem {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  featured: boolean;
}

interface PressReleaseAPIItem {
  id: string | number;
  title: string;
  excerpt: string;
  category: string;
  publishedAt?: string | null;
  createdAt?: string;
  image_url?: string | null;
  featured: boolean | number;
  reading_time_minutes?: number;
  slug?: string;
}

export default function PressReleasesPage() {
  const [items, setItems] = useState<PressReleaseUIItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/press-releases?status=published&limit=100');
        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Failed to load press releases');
        const mapped: PressReleaseUIItem[] = (json.items as PressReleaseAPIItem[]).map((pr) => ({
          id: String(pr.id),
          title: pr.title,
          slug: pr.slug || String(pr.id),
          date: pr.publishedAt ? new Date(pr.publishedAt).toLocaleDateString() : (pr.createdAt ? new Date(pr.createdAt).toLocaleDateString() : ''),
          excerpt: pr.excerpt || '',
          image: pr.image_url || '/hero/6.JPG',
          category: pr.category || 'General',
          readTime: `${pr.reading_time_minutes || 3} min read`,
          featured: Boolean(pr.featured),
        }));
        setItems(mapped);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load press releases');
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
    return items.filter((pr) => {
      const matchSearch = !q || pr.title.toLowerCase().includes(q) || pr.excerpt.toLowerCase().includes(q) || pr.category.toLowerCase().includes(q);
      const matchCategory = selectedCategory === 'All' || pr.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [items, searchTerm, selectedCategory]);

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">Press Releases</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-4 px-2 sm:px-0">
            Official announcements and press releases from the Accountant General&apos;s Department.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="h-1 w-8 bg-[var(--accent)] rounded-full" />
            <div className="h-1 w-8 bg-[var(--secondary)] rounded-full" />
            <div className="h-1 w-8 bg-[var(--primary)] rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8 py-12">
        <div className="max-w-[98%] xl:max-w-[95%] 2xl:max-w-[90%] mx-auto">
        
        {/* Search and Filter Section */}
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search press releases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)]"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 mr-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                </div>
                {categories.slice(0, 5).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      category === selectedCategory
                        ? "bg-[var(--primary)] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
            </div>
          </div>
        </section>

        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading press releases...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-12">{error}</div>
        ) : (
          <>
        {/* Featured Press Releases */}
            {filtered.filter(release => release.featured).length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">Featured Announcements</h2>
          </div>
          
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filtered.filter(release => release.featured).map((release) => (
              <article key={release.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={release.image}
                    alt={release.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[var(--accent)] text-white text-xs font-medium rounded-full">
                      {release.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {release.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {release.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Megaphone className="h-4 w-4" />
                      Press Release
                    </div>
                  </div>
                  
                  <Link href={`/press-releases/${release.slug}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[var(--accent)] transition-colors">
                      {release.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {release.excerpt}
                  </p>
                  
                  <Link
                    href={`/press-releases/${release.slug}`}
                    className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:text-[var(--secondary)] transition-colors"
                  >
                    Read Full Release
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
            )}

        {/* All Press Releases */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">All Press Releases</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {filtered.map((release) => (
              <article key={release.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={release.image}
                    alt={release.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[var(--accent)] text-white text-xs font-medium rounded-full">
                      {release.category}
                    </span>
                  </div>
                    {release.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                    )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {release.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {release.readTime}
                    </div>
                  </div>
                  
                  <Link href={`/press-releases/${release.slug}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[var(--accent)] transition-colors">
                      {release.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {release.excerpt}
                  </p>
                  
                  <Link
                    href={`/press-releases/${release.slug}`}
                    className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:text-[var(--secondary)] transition-colors"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
          </>
        )}
        </div>
      </div>
    </div>
  );
} 