"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, Eye, ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';

interface Article {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  views?: number;
  featured: boolean;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  image_url?: string;
  reading_time_minutes: number;
}

export default function NewsDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/news/slug/${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to load article');
        setArticle(data.news);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const formatDate = (value?: string | null) => {
    if (!value) return '';
    const d = new Date(value);
    return d.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative min-h-[220px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${article?.image_url || '/hero/6.JPG'})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/70 to-[var(--secondary)]/70" />
        </div>
        <div className="relative w-full px-4 md:px-6 lg:px-8 z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/publications/news" className="inline-flex items-center gap-2 text-white/90 mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to News
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {article ? article.title : 'Loading...'}
            </h1>
            {article && (
              <div className="mt-3 flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <span className="inline-flex items-center gap-1"><User className="h-4 w-4" />{article.author}</span>
                {article.publishedAt && (
                  <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(article.publishedAt)}</span>
                )}
                <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{article.reading_time_minutes || 1} min read</span>
                <span className="inline-flex items-center gap-1"><Eye className="h-4 w-4" />{(article.views || 0).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 md:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center text-gray-500 py-10">Loading article...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-10">{error}</div>
          ) : !article ? (
            <div className="text-center text-gray-500 py-10">Article not found.</div>
          ) : (
            <div className="space-y-6">
              {article.excerpt && (
                <p className="text-lg text-gray-700 bg-gray-50 border-l-4 border-[var(--primary)] rounded-md p-4">{article.excerpt}</p>
              )}
              {article.image_url && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                  <Image src={article.image_url} alt={article.title} fill className="object-cover" />
                </div>
              )}
              <div className="prose prose-sm max-w-none">
                <div className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


