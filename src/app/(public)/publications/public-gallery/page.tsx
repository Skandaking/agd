'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Camera, Search, Filter, Eye, Download, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AGDStaff } from '@/components/public/public-gallery/AGDStaff';
import { ImageModal } from '@/components/public/public-gallery/ImageModal';

interface MediaUIItem {
  id: string;
  src: string;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
  albumImageCount: number;
}

interface MediaAPIItem {
  id: string | number;
  title: string;
  description?: string | null;
  category: string;
  file_url: string;
  file_mime: string;
  createdAt?: string;
  alt_text?: string | null;
}

export default function PublicGalleryPage() {
  const [mediaItems, setMediaItems] = useState<MediaUIItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<MediaUIItem | null>(null);
  const [currentView, setCurrentView] = useState<'gallery' | 'staff'>('gallery');

  useEffect(() => {
    const loadMediaItems = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/media?status=active&limit=100');
        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Failed to load media items');
        
        // Filter only images and map to UI format
        const imageItems = (json.items as MediaAPIItem[])
          .filter(item => item.file_mime.startsWith('image/'))
          .map((item) => ({
            id: String(item.id),
            src: item.file_url,
            title: item.title,
            date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
            location: 'AGD Office', // Default location since API doesn't have this field
            category: item.category || 'General',
            description: item.description || item.alt_text || '',
            albumImageCount: 1, // Single images from media API
          }));
        
        setMediaItems(imageItems);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load media items');
      } finally {
        setLoading(false);
      }
    };
    loadMediaItems();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(['All']);
    mediaItems.forEach((item) => set.add(item.category));
    return Array.from(set);
  }, [mediaItems]);

  const filteredImages = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return mediaItems.filter(image => {
      const matchesSearch = !q || 
        image.title.toLowerCase().includes(q) ||
        image.description.toLowerCase().includes(q) ||
        image.category.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'All' || image.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [mediaItems, searchTerm, selectedCategory]);

  const getFilenameFromSrc = (src: string) => src.split('/').pop() || 'download.jpg';

  const handleImageClick = (image: MediaUIItem) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[240px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/hero/6.JPG)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/80 to-[var(--secondary)]/80" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-16 h-16 bg-[var(--accent)]/10 rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-[var(--secondary)]/10 rounded-tl-full" />
        </div>

        <div className="relative w-full max-w-3xl mx-auto text-center z-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white leading-tight">
            {currentView === 'gallery' ? 'Public Gallery' : 'AGD Leadership Team'}
          </h1>
          <p className="text-lg text-white/90 font-medium">
            {currentView === 'gallery' 
              ? 'Explore moments from AGD events, training, and community engagements.'
              : 'Meet the dedicated professionals leading the Accountant General\'s Department.'
            }
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8 py-12">
        <div className="max-w-[98%] xl:max-w-[95%] 2xl:max-w-[90%] mx-auto">
        
        {/* View Toggle and Search Section */}
        <section className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8 border border-gray-100 sticky top-4 z-20">
          {/* Main View Toggle */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => setCurrentView('gallery')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'gallery'
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Camera className="h-4 w-4" />
                <span className="hidden sm:inline">Public Gallery</span>
                <span className="sm:hidden">Gallery</span>
              </button>
              <button
                onClick={() => setCurrentView('staff')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'staff'
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">AGD Staff</span>
                <span className="sm:hidden">Staff</span>
              </button>
            </div>
            
            {/* Gallery Filters - Only show when gallery view is active */}
            {currentView === 'gallery' && (
              <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center pt-4 border-t border-gray-100">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search by title or description..."
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
                  <Filter className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <div className="flex gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-2 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
                          selectedCategory === category
                            ? "bg-[var(--secondary)] text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Main Content Area */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto"></div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">Loading Gallery...</h3>
            <p className="mt-2 text-gray-500">Please wait while we fetch the media items.</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-700">Error Loading Gallery</h3>
            <p className="mt-2 text-gray-500">{error}</p>
          </div>
        ) : currentView === 'gallery' ? (
          /* Gallery View */
          filteredImages.length > 0 ? (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4 space-y-4">
              {filteredImages.map((image) => (
                <div key={image.id} className="break-inside-avoid relative rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-gray-100 bg-white">
                  <Image
                    src={image.src}
                    alt={image.title}
                    width={400}
                    height={400}
                    className="object-cover w-full h-auto"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 20vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <h3 className="text-white font-bold text-sm sm:text-base leading-tight drop-shadow-md line-clamp-2">{image.title}</h3>
                    <p className="text-white/80 text-xs mt-1 line-clamp-2">{image.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        size="sm"
                        className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 flex-1 text-xs py-1.5"
                        onClick={() => handleImageClick(image)}
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                      <a
                        href={image.src}
                        download={getFilenameFromSrc(image.src)}
                        className="flex-1"
                      >
                        <Button size="sm" variant="secondary" className="w-full text-xs py-1.5">
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                      </a>
                    </div>
                  </div>
                  {/* Info overlay for mobile */}
                  <div className="sm:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <h3 className="text-white font-medium text-sm leading-tight line-clamp-1">{image.title}</h3>
                    <p className="text-white/70 text-xs mt-1">{image.category}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-12 w-12 mx-auto text-gray-300" />
              <h3 className="mt-4 text-xl font-semibold text-gray-700">No Images Found</h3>
              <p className="mt-2 text-gray-500">
                {searchTerm || selectedCategory !== 'All' 
                  ? 'Try adjusting your search or filters.' 
                  : 'No images are available in the gallery at the moment.'
                }
              </p>
            </div>
          )
        ) : (
          /* Staff View */
          <AGDStaff />
        )}

        {/* Image Modal */}
        <ImageModal 
          image={selectedImage}
          isOpen={!!selectedImage}
          onClose={handleCloseModal}
        />

        </div>
      </div>
    </div>
  );
} 