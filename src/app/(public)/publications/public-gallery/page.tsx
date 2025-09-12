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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div key={image.id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => handleImageClick(image)}>
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full shadow-sm">
                        {image.category}
                      </span>
                    </div>
                    
                    {/* Hover actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageClick(image);
                          }}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                        >
                          <Eye className="h-5 w-5 text-white" />
                        </button>
                        <a
                          href={image.src}
                          download={getFilenameFromSrc(image.src)}
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                        >
                          <Download className="h-5 w-5 text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 line-clamp-2">
                      {image.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {image.description}
                    </p>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500 font-medium">{image.date}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-3 text-xs hover:bg-gray-100"
                          onClick={() => handleImageClick(image)}
                        >
                          <Eye className="mr-1.5 h-3.5 w-3.5" />
                          View
                        </Button>
                        <a href={image.src} download={getFilenameFromSrc(image.src)}>
                          <Button size="sm" className="h-8 px-3 text-xs bg-[var(--primary)] hover:bg-[var(--primary)]/90">
                            <Download className="mr-1.5 h-3.5 w-3.5" />
                            Download
                          </Button>
                        </a>
                      </div>
                    </div>
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