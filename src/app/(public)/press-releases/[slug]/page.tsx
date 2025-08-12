"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, Eye, ArrowLeft, Megaphone } from 'lucide-react';
import { useParams } from 'next/navigation';

interface PressRelease {
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

export default function PressReleaseDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug as string;
  const [item, setItem] = useState<PressRelease | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/press-releases/slug/${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to load press release');
        setItem(data.item);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load press release');
      } finally {
        setLoading(false);
      }
    };
    if (slug) load();
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
          style={{ backgroundImage: `url(${item?.image_url || '/hero/6.JPG'})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/70 to-[var(--secondary)]/70" />
        </div>
        <div className="relative w-full px-4 md:px-6 lg:px-8 z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/publications/press-releases" className="inline-flex items-center gap-2 text-white/90 mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Press Releases
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {item ? item.title : 'Loading...'}
            </h1>
            {item && (
              <div className="mt-3 flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <span className="inline-flex items-center gap-1"><User className="h-4 w-4" />{item.author}</span>
                {item.publishedAt && (
                  <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(item.publishedAt)}</span>
                )}
                <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{item.reading_time_minutes || 1} min read</span>
                <span className="inline-flex items-center gap-1"><Eye className="h-4 w-4" />{(item.views || 0).toLocaleString()}</span>
                <span className="inline-flex items-center gap-1"><Megaphone className="h-4 w-4" />Press Release</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 md:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center text-gray-500 py-10">Loading press release...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-10">{error}</div>
          ) : !item ? (
            <div className="text-center text-gray-500 py-10">Press release not found.</div>
          ) : (
            <div className="space-y-6">
              {item.excerpt && (
                <p className="text-lg text-gray-700 bg-gray-50 border-l-4 border-[var(--primary)] rounded-md p-4">{item.excerpt}</p>
              )}
              {item.image_url && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                  <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                </div>
              )}
              <div className="prose prose-sm max-w-none">
                <div className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


