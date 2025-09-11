'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Eye, Megaphone, Share2 } from 'lucide-react';

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

interface OtherPressRelease {
  id: string;
  title: string;
  category: string;
  publishedAt?: string | null;
  createdAt?: string;
  image_url?: string | null;
  slug?: string;
}

export default function PressReleaseDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug as string;
  const [pressRelease, setPressRelease] = useState<PressRelease | null>(null);
  const [otherPressReleases, setOtherPressReleases] = useState<OtherPressRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/press-releases/slug/${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to load press release');
        setPressRelease(data.item);

        // Fetch other press releases for sidebar
        const otherRes = await fetch('/api/press-releases?status=published&limit=10');
        const otherData = await otherRes.json();
        if (otherData.success) {
          const others = (otherData.items as PressRelease[])
            .filter((pr) => pr.id !== data.item.id)
            .slice(0, 8)
            .map((pr) => ({
              id: pr.id || '',
              title: pr.title,
              category: pr.category,
              publishedAt: pr.publishedAt,
              createdAt: pr.createdAt,
              image_url: pr.image_url,
              slug: pr.slug,
            }));
          setOtherPressReleases(others);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load press release');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const formatDate = (value?: string | null) => {
    if (!value) return '';
    return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {!loading && !error && pressRelease && (
        <div className="relative min-h-[240px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${pressRelease.image_url || '/hero/6.JPG'})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/80 to-[var(--secondary)]/80" />
          </div>

          <div className="relative w-full max-w-4xl mx-auto text-center z-10 px-4">
            <div className="mb-4 flex justify-center">
              <span className="px-4 py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-full">
                {pressRelease.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
              {pressRelease.title}
            </h1>
            <div className="flex justify-center items-center gap-6 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(pressRelease.publishedAt || pressRelease.createdAt)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {pressRelease.reading_time_minutes} min read
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {pressRelease.author}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {(pressRelease.views || 0).toLocaleString()} views
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="w-full px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8 py-10">
        <div className="max-w-[98%] xl:max-w-[95%] 2xl:max-w-[90%] mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/publications/press-releases" className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--secondary)] transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Press Releases
            </Link>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 py-12">Loading press release...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-12">{error}</div>
          ) : !pressRelease ? (
            <div className="text-center text-gray-500 py-12">Press release not found</div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Main Content */}
              <div className="lg:col-span-8 space-y-8">
                {/* Excerpt */}
                {pressRelease.excerpt && (
                  <div className="text-lg text-gray-700 font-medium leading-relaxed border-l-4 border-[var(--accent)] pl-6 bg-gray-50 py-4">
                    {pressRelease.excerpt}
                  </div>
                )}

                {/* Article Image */}
                {pressRelease.image_url && (
                  <div className="relative aspect-video rounded-lg overflow-hidden border shadow-sm">
                    <Image
                      src={pressRelease.image_url}
                      alt={pressRelease.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 75vw"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-sm max-w-none">
                  <div
                    className="text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: pressRelease.content }}
                  />
                </div>

                {/* Tags */}
                {pressRelease.tags && pressRelease.tags.length > 0 && (
                  <div className="border-t pt-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {pressRelease.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Section */}
                <div className="border-t pt-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-sm font-medium text-gray-500">Share this press release:</h3>
                    <button className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--primary)] text-white text-sm rounded-lg hover:bg-[var(--primary)]/90 transition-colors">
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-6">
                {/* Press Release Info */}
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-[var(--secondary)]" />
                    Press Release Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Published:</span>
                      <span className="font-medium">{formatDate(pressRelease.publishedAt || pressRelease.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-medium">{pressRelease.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Author:</span>
                      <span className="font-medium">{pressRelease.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Reading Time:</span>
                      <span className="font-medium">{pressRelease.reading_time_minutes} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Views:</span>
                      <span className="font-medium">{(pressRelease.views || 0).toLocaleString()}</span>
                    </div>
                    {pressRelease.featured && (
                      <div className="pt-2">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                          Featured Press Release
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Media Contact</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-500">Department:</span>
                      <p className="font-medium">Accountant General&apos;s Department</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <p className="font-medium">media@agd.gov.sl</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <p className="font-medium">+232 XX XXX XXXX</p>
                    </div>
                  </div>
                </div>

                {/* Other Press Releases */}
                {otherPressReleases.length > 0 && (
                  <div className="bg-white border rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">More Press Releases</h3>
                    <div className="space-y-3">
                      {otherPressReleases.map((pr) => (
                        <Link key={pr.id} href={`/press-releases/${pr.slug || pr.id}`} className="group block">
                          <div className="flex gap-3 p-3 rounded-lg border hover:border-[var(--primary)]/50 transition-colors">
                            <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                              {pr.image_url && (
                                <Image
                                  src={pr.image_url}
                                  alt={pr.title}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-[var(--primary)]">
                                {pr.title}
                              </h4>
                              <div className="text-xs text-gray-500 mt-1">
                                <p>{pr.category}</p>
                                <p>{formatDate(pr.publishedAt || pr.createdAt)}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}