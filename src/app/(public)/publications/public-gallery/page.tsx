import Image from 'next/image';
import { Camera, Calendar, MapPin, Users, Search, Filter, Eye, Download } from 'lucide-react';

export default function PublicGalleryPage() {
  const galleryItems = [
    {
      id: 1,
      title: "Annual Financial Management Conference 2024",
      date: "June 15, 2024",
      location: "Bingu International Convention Centre",
      category: "Conference",
      images: ["/hero/1.JPG", "/hero/3.jpg", "/hero/6.jpg"],
      description: "Government officials and stakeholders gathered for the annual financial management conference to discuss best practices and innovations in public finance.",
      attendees: 250,
      featured: true
    },
    {
      id: 2,
      title: "IFMIS Training Workshop",
      date: "May 20, 2024",
      location: "AGD Training Center",
      category: "Training",
      images: ["/hero/5.jpg", "/hero/7.JPG", "/hero/2.JPG"],
      description: "Comprehensive training session for government accountants on the new IFMIS system features and functionalities.",
      attendees: 120,
      featured: true
    },
    {
      id: 3,
      title: "Staff Development Program",
      date: "April 30, 2024",
      location: "AGD Main Office",
      category: "Development",
      images: ["/hero/4.jpg", "/hero/8.JPG", "/hero/9.jpg"],
      description: "Professional development sessions focused on enhancing skills in modern financial management practices.",
      attendees: 80,
      featured: false
    },
    {
      id: 4,
      title: "Community Outreach Program",
      date: "April 10, 2024",
      location: "Various Communities",
      category: "Outreach",
      images: ["/hero/10.jpg", "/images/t1.jpg", "/images/t2.jpg"],
      description: "AGD team visited local communities to educate citizens about public finance management and transparency.",
      attendees: 300,
      featured: false
    },
    {
      id: 5,
      title: "International Partners Meeting",
      date: "March 25, 2024",
      location: "Capital Hotel",
      category: "Meeting",
      images: ["/images/t3.jpg", "/images/t4.jpg", "/images/t5.jpg"],
      description: "Strategic meeting with international development partners to discuss financial management reforms.",
      attendees: 45,
      featured: false
    },
    {
      id: 6,
      title: "AGD Team Building Event",
      date: "March 15, 2024",
      location: "Salima",
      category: "Team Building",
      images: ["/images/t6.jpg", "/images/t7.jpg", "/images/t8.jpg"],
      description: "Annual team building event to strengthen collaboration and teamwork among AGD staff members.",
      attendees: 150,
      featured: false
    },
    {
      id: 7,
      title: "Budget Review Session",
      date: "February 28, 2024",
      location: "AGD Conference Room",
      category: "Review",
      images: ["/images/t9.jpg", "/images/t10.jpg", "/images/t11.jpg"],
      description: "Quarterly budget review session with heads of departments to assess financial performance.",
      attendees: 60,
      featured: false
    },
    {
      id: 8,
      title: "Technology Innovation Showcase",
      date: "February 10, 2024",
      location: "AGD ICT Center",
      category: "Technology",
      images: ["/images/t12.jpg", "/images/t13.jpg", "/images/t14.jpg"],
      description: "Showcase of new technology solutions implemented to improve government financial processes.",
      attendees: 90,
      featured: false
    }
  ];

  const categories = ["All", "Conference", "Training", "Development", "Outreach", "Meeting", "Team Building", "Review", "Technology"];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[260px] flex items-center justify-center overflow-hidden py-8 px-2 sm:px-4 md:py-0 md:h-[300px]">
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

        <div className="relative w-full max-w-3xl mx-auto text-center z-10 flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">Public Gallery</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-4 px-2 sm:px-0">
            Explore moments from AGD events, training sessions, and community engagements.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="h-1 w-8 bg-[var(--accent)] rounded-full" />
            <div className="h-1 w-8 bg-[var(--secondary)] rounded-full" />
            <div className="h-1 w-8 bg-[var(--primary)] rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        
        {/* Search and Filter Section */}
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search gallery..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)]"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 mr-4">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              {categories.slice(0, 6).map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    category === "All"
                      ? "bg-[var(--primary)] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Gallery Items */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">Featured Events</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {galleryItems.filter(item => item.featured).map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[var(--accent)] text-white text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-4 text-white text-sm">
                      <div className="flex items-center gap-1">
                        <Camera className="h-4 w-4" />
                        {item.images.length} photos
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {item.attendees} attendees
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {item.location}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[var(--accent)] transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors">
                      <Eye className="h-4 w-4" />
                      View Gallery
                    </button>
                    <button className="flex items-center gap-2 text-[var(--secondary)] font-semibold hover:text-[var(--accent)] transition-colors">
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Gallery Items */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">All Events & Activities</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-white text-xs font-medium rounded-full ${
                      item.category === 'Conference' ? 'bg-[var(--primary)]' :
                      item.category === 'Training' ? 'bg-[var(--secondary)]' :
                      item.category === 'Development' ? 'bg-[var(--accent)]' :
                      'bg-gray-600'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  {item.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                  
                  {/* Overlay with photo count */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-1">
                          <Camera className="h-4 w-4" />
                          <span className="text-sm">{item.images.length} photos</span>
                        </div>
                        <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {item.attendees}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-[var(--accent)] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    {item.location}
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {item.description}
                  </p>
                  
                  <button className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                    View Photos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl p-8 text-white mb-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Gallery Statistics</h3>
            <p className="text-white/90">Capturing moments from AGD&apos;s journey in public financial management</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {galleryItems.reduce((sum, item) => sum + item.images.length, 0)}
              </div>
              <div className="text-white/90 text-sm">Total Photos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{galleryItems.length}</div>
              <div className="text-white/90 text-sm">Events Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {galleryItems.reduce((sum, item) => sum + item.attendees, 0).toLocaleString()}
              </div>
              <div className="text-white/90 text-sm">Total Participants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{categories.length - 1}</div>
              <div className="text-white/90 text-sm">Event Categories</div>
            </div>
          </div>
        </section>

        {/* Pagination */}
        <section className="flex justify-center">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
} 