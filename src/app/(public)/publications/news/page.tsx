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
      <div className="w-full px-4 md:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Latest News</h1>
            <p className="text-gray-600 mt-2">Updates and announcements from the Accountant General&apos;s Department</p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search news..."
                className="w-full pl-9 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

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
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                      <article className="rounded-xl border bg-white">
                        <div className="relative h-64">
                          <Image
                            src={featuredArticles[0].image_url || '/images/t1.jpg'}
                            alt={featuredArticles[0].title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 66vw"
                          />
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(featuredArticles[0].publishedAt || featuredArticles[0].createdAt)}</span>
                            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{featuredArticles[0].reading_time_minutes || 1} min read</span>
                            <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" />{(featuredArticles[0].views || 0).toLocaleString()}</span>
                          </div>
                          <Link href="#">
                            <h3 className="text-2xl font-bold hover:text-[var(--primary)]">{featuredArticles[0].title}</h3>
                          </Link>
                          <p className="text-gray-600">{featuredArticles[0].excerpt}</p>
                          <div className="flex items-center justify-between pt-2 text-sm text-gray-600">
                            <span>By {featuredArticles[0].author}</span>
                            <Link href="#" className="inline-flex items-center gap-1 text-[var(--primary)]">
                              Read More
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </div>
                    <div className="lg:col-span-4 space-y-4">
                      {featuredArticles.slice(1).map(a => (
                        <article key={a.id} className="rounded-xl border bg-white p-3 flex gap-3">
                          <div className="relative w-24 h-20 flex-shrink-0 rounded-md overflow-hidden">
                            <Image src={a.image_url || '/images/t2.jpg'} alt={a.title} fill className="object-cover" sizes="96px" />
                          </div>
                          <div className="min-w-0">
                            <Link href="#" className="font-medium hover:text-[var(--primary)] line-clamp-2">{a.title}</Link>
                            <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
                              <span>{formatDate(a.publishedAt || a.createdAt)}</span>
                              <span>· {a.reading_time_minutes || 1} min</span>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Recent */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold">Recent Articles</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularArticles.map((a) => (
                    <article key={a.id} className="rounded-xl border bg-white overflow-hidden">
                      <div className="relative h-44">
                        <Image src={a.image_url || '/images/t3.jpg'} alt={a.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="text-xs text-gray-500 flex items-center gap-3">
                          <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(a.publishedAt || a.createdAt)}</span>
                          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{a.reading_time_minutes || 1} min</span>
                        </div>
                        <Link href="#" className="font-semibold hover:text-[var(--primary)] line-clamp-2">{a.title}</Link>
                        <p className="text-sm text-gray-600 line-clamp-3">{a.excerpt}</p>
                        <div className="pt-2 text-sm text-gray-600 flex items-center justify-between">
                          <span>By {a.author}</span>
                          <Link href="#" className="inline-flex items-center gap-1 text-[var(--primary)]">
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