'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";

interface NewsAPIItem {
  id: string | number;
  title: string;
  excerpt: string;
  image_url?: string | null;
  publishedAt?: string | null;
  createdAt?: string;
  slug?: string;
}

interface NewsUIItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  slug: string;
}

export function LatestNews() {
  const [items, setItems] = useState<NewsUIItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/news?status=published&limit=5');
        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Failed to load news');
        const mapped: NewsUIItem[] = (json.news as NewsAPIItem[]).map((n) => ({
          id: String(n.id),
          title: n.title,
          date: n.publishedAt ? new Date(n.publishedAt).toLocaleDateString() : (n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ''),
          excerpt: n.excerpt || '',
          image: n.image_url || '/images/t3.jpg',
          slug: n.slug || String(n.id),
        }));
        setItems(mapped);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load news');
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
          <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
          <h2 className="text-2xl font-bold text-[var(--accent)]">
            Latest News
          </h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {loading ? (
            <div className="text-sm text-gray-500">Loading news...</div>
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : items.length === 0 ? (
            <div className="text-sm text-gray-500">No recent news available.</div>
          ) : (
            items.map((news) => (
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
                      className="inline-flex items-center mt-3 text-sm font-medium text-[var(--primary)] hover:text-[var(--secondary)] transition-colors"
                    >
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="p-4 border-t bg-white">
        <Link
          href="/publications/news"
          className="flex items-center justify-center gap-2 py-2 px-4 bg-[var(--accent)]/10 text-[var(--accent)] font-semibold rounded-lg hover:bg-[var(--accent)]/20 transition-all duration-300"
        >
          View All News
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
} 