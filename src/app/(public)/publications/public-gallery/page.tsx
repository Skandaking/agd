'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, Search, Filter, Eye, Download, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AGDStaff } from '@/components/public/public-gallery/AGDStaff';
import { ImageModal } from '@/components/public/public-gallery/ImageModal';

export default function PublicGalleryPage() {
  const galleryItems = [
    {
      id: 1,
      title: "Annual Financial Management Conference 2024",
      date: "June 15, 2024",
      location: "Bingu International Convention Centre",
      category: "Training",
      images: ["/hero/1.JPG", "/hero/3.jpg", "/hero/6.jpg"],
      description: "Government officials and stakeholders gathered for the annual financial management conference to discuss best practices and innovations in public finance.",
    },
    {
      id: 2,
      title: "IFMIS Training Workshop",
      date: "May 20, 2024",
      location: "AGD Training Center",
      category: "Training",
      images: ["/hero/5.jpg", "/hero/7.JPG", "/hero/2.JPG"],
      description: "Comprehensive training session for government accountants on the new IFMIS system features and functionalities.",
    },
    {
      id: 3,
      title: "Staff Development Program",
      date: "April 30, 2024",
      location: "AGD Main Office",
      category: "Training",
      images: ["/hero/4.jpg", "/hero/8.JPG", "/hero/9.jpg"],
      description: "Professional development sessions focused on enhancing skills in modern financial management practices.",
    },
    {
      id: 4,
      title: "Community Outreach Program",
      date: "April 10, 2024",
      location: "Various Communities",
      category: "Meeting",
      images: ["/hero/10.jpg", "/images/t1.jpg", "/images/t2.jpg"],
      description: "AGD team visited local communities to educate citizens about public finance management and transparency.",
    },
    {
      id: 5,
      title: "International Partners Meeting",
      date: "March 25, 2024",
      location: "Capital Hotel",
      category: "Meeting",
      images: ["/images/t3.jpg", "/images/t4.jpg", "/images/t5.jpg"],
      description: "Strategic meeting with international development partners to discuss financial management reforms.",
    },
    {
      id: 6,
      title: "AGD Team Building Event",
      date: "March 15, 2024",
      location: "Salima",
      category: "Team Building",
      images: ["/images/t6.jpg", "/images/t7.jpg", "/images/t8.jpg"],
      description: "Annual team building event to strengthen collaboration and teamwork among AGD staff members.",
    },
    {
      id: 7,
      title: "Budget Review Session",
      date: "February 28, 2024",
      location: "AGD Conference Room",
      category: "Meeting",
      images: ["/images/t9.jpg", "/images/t10.jpg", "/images/t11.jpg"],
      description: "Quarterly budget review session with heads of departments to assess financial performance.",
    },
    {
      id: 8,
      title: "Technology Innovation Showcase",
      date: "February 10, 2024",
      location: "AGD ICT Center",
      category: "Meeting",
      images: ["/images/t12.jpg", "/images/t13.jpg", "/images/t14.jpg"],
      description: "Showcase of new technology solutions implemented to improve government financial processes.",
    }
  ];

  const allImages = galleryItems.flatMap(item =>
    item.images.map((imageSrc, index) => ({
      id: `${item.id}-${index}`,
      src: imageSrc,
      title: item.title,
      date: item.date,
      location: item.location,
      category: item.category,
      description: item.description,
      albumImageCount: item.images.length
    }))
  );

  const categories = ["All", "Training", "Meeting", "Team Building"];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof allImages[0] | null>(null);
  const [currentView, setCurrentView] = useState<'gallery' | 'staff'>('gallery');

  const filteredImages = allImages.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          image.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || image.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFilenameFromSrc = (src: string) => src.split('/').pop() || 'download.jpg';

  const handleImageClick = (image: typeof allImages[0]) => {
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
      <div className="container mx-auto px-4 ">
        
        {/* View Toggle and Search Section */}
        <section className="bg-white rounded-xl shadow-lg p-3 mb-8 border border-gray-100 sticky top-4 z-20">
          {/* Main View Toggle */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentView('gallery')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentView === 'gallery'
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Camera className="h-4 w-4" />
                Public Gallery
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
                AGD Staff
              </button>
            </div>
            
            {/* Gallery Filters - Only show when gallery view is active */}
            {currentView === 'gallery' && (
              <div className="flex flex-col md:flex-row gap-3 items-center pt-2 border-t border-gray-100">
                <div className="w-full md:w-auto md:flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search by event title or description..."
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto">
                  <Filter className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
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
            )}
          </div>
        </section>

        {/* Main Content Area */}
        {currentView === 'gallery' ? (
          /* Gallery View */
          filteredImages.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {filteredImages.map((image) => (
                <div key={image.id} className="break-inside-avoid relative rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group overflow-hidden border border-gray-100">
                  <Image
                    src={image.src}
                    alt={image.title}
                    width={500}
                    height={500}
                    className="object-cover w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-lg leading-tight drop-shadow-md">{image.title}</h3>
                    <div className="flex items-center gap-4 mt-4">
                                          <Button
                      size="sm"
                      className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 flex-1"
                      onClick={() => handleImageClick(image)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                      <a
                        href={image.src}
                        download={getFilenameFromSrc(image.src)}
                        className="flex-1"
                      >
                        <Button size="sm" variant="secondary" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-12 w-12 mx-auto text-gray-300" />
              <h3 className="mt-4 text-xl font-semibold text-gray-700">No Images Found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search or filters.</p>
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
  );
} 