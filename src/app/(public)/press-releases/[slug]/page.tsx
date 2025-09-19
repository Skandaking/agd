'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Eye, Megaphone, Facebook, Linkedin, Copy } from 'lucide-react';
import { toast } from 'sonner';

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

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.405 3.488"/>
  </svg>
);

export default function PressReleaseDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug as string;
  const [pressRelease, setPressRelease] = useState<PressRelease | null>(null);
  const [otherPressReleases, setOtherPressReleases] = useState<OtherPressRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPageUrl(window.location.href);
    }
  }, []);

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

  const handleShare = (platform: 'facebook' | 'linkedin' | 'whatsapp') => {
    if (!pressRelease || !pageUrl) return;
    const url = encodeURIComponent(pageUrl);
    const title = encodeURIComponent(pressRelease.title);
    const excerpt = pressRelease.excerpt ? encodeURIComponent(pressRelease.excerpt) : '';
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${excerpt}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
        break;
    }
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyLink = async () => {
    if (!pageUrl) return;
    
    try {
      // Modern clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(pageUrl);
        toast.success('Link copied to clipboard!');
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = pageUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          textArea.remove();
          toast.success('Link copied to clipboard!');
        } catch (err) {
          console.error('Fallback: Could not copy text: ', err);
          toast.error('Failed to copy link');
        }
      }
    } catch (err) {
      console.error('Could not copy text: ', err);
      toast.error('Failed to copy link');
    }
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
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleShare('facebook')} title="Share on Facebook" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-blue-600 transition-colors">
                        <Facebook className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleShare('linkedin')} title="Share on LinkedIn" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-blue-700 transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleShare('whatsapp')} title="Share on WhatsApp" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-green-500 transition-colors">
                        <WhatsAppIcon className="h-4 w-4" />
                      </button>
                      <button onClick={handleCopyLink} title="Copy link" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
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
