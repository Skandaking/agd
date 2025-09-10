"use client";

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, TrendingUp, Eye } from 'lucide-react';
import { NewsArticle } from '@/lib/types';

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/news?status=published&limit=50');
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to load news');
        setArticles(data.news);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load news');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      (a.excerpt || '').toLowerCase().includes(q) ||
      (a.author || '').toLowerCase().includes(q)
    );
  }, [articles, search]);

  const featuredArticles = filtered.filter(a => a.featured);
  const regularArticles = filtered.filter(a => !a.featured);

  const formatDate = (value?: string | Date | null) => {
    if (!value) return '';
    const d = new Date(value as unknown as string);
    return d.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-white">{/* compact, full-width layout [[memory:2824884]] */}
      {/* Hero Section */}
      <div className="relative min-h-[260px] flex items-center justify-center overflow-hidden">
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

        <div className="relative w-full px-4 md:px-6 lg:px-8 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">News & Updates</h1>
            <p className="text-white/90 mt-2">
              Official updates and announcements from the Accountant General&apos;s Department
            </p>

            <div className="mt-6">
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 h-4 w-4" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search news..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/95 focus:bg-white text-gray-900 placeholder:text-gray-500 outline-none focus:ring-4 focus:ring-[var(--primary)]/25 transition"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3 text-xs text-white/90">
              <span className="bg-white/10 rounded-full px-3 py-1">Articles: {articles.length}</span>
              <span className="bg-white/10 rounded-full px-3 py-1">Updated regularly</span>
            </div>

            <div className="mt-5 flex justify-center gap-2">
              <div className="h-1 w-10 bg-[var(--accent)] rounded-full" />
              <div className="h-1 w-10 bg-[var(--secondary)] rounded-full" />
              <div className="h-1 w-10 bg-[var(--primary)] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 md:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          

          {loading ? (
            <div className="text-center text-gray-500 py-10">Loading news...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-10">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No articles found.</div>
          ) : (
            <div className="space-y-12">
              {/* Featured */}
              {featuredArticles.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[var(--primary)]" />
                    <h2 className="text-xl font-semibold">Featured</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredArticles.slice(0, 3).map((a) => (
                      <article key={a.id} className="rounded-xl border bg-white overflow-hidden">
                        <div className="relative h-44">
                          <Image 
                            src={a.image_url || '/images/t3.jpg'} 
                            alt={a.title} 
                            fill 
                            className="object-cover" 
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                          />
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="text-xs text-gray-500 flex items-center gap-3">
                            <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(a.publishedAt || a.createdAt)}</span>
                            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{a.reading_time_minutes || 1} min</span>
                            <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" />{(a.views || 0).toLocaleString()}</span>
                          </div>
                          <Link href={`/news/${a.slug || a.id}`} className="font-semibold hover:text-[var(--primary)] line-clamp-2">{a.title}</Link>
                          <p className="text-sm text-gray-600 line-clamp-3">{a.excerpt}</p>
                          <div className="pt-2 text-sm text-gray-600 flex items-center justify-between">
                            <span>By {a.author}</span>
                            <Link href={`/news/${a.slug || a.id}`} className="inline-flex items-center gap-1 text-[var(--primary)]">
                              Read More
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* Recent */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold">Recent Articles</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {regularArticles.map((a) => (
                    <article key={a.id} className="rounded-xl border bg-white overflow-hidden">
                      <div className="relative h-44">
                        <Image 
                          src={a.image_url || '/images/t3.jpg'} 
                          alt={a.title} 
                          fill 
                          className="object-cover" 
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="text-xs text-gray-500 flex items-center gap-3">
                          <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(a.publishedAt || a.createdAt)}</span>
                          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{a.reading_time_minutes || 1} min</span>
                          <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" />{(a.views || 0).toLocaleString()}</span>
                        </div>
                        <Link href={`/news/${a.slug || a.id}`} className="font-semibold hover:text-[var(--primary)] line-clamp-2">{a.title}</Link>
                        <p className="text-sm text-gray-600 line-clamp-3">{a.excerpt}</p>
                        <div className="pt-2 text-sm text-gray-600 flex items-center justify-between">
                          <span>By {a.author}</span>
                          <Link href={`/news/${a.slug || a.id}`} className="inline-flex items-center gap-1 text-[var(--primary)]">
                            Read More
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}