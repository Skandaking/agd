import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, Filter, Megaphone } from 'lucide-react';

export default function PressReleasesPage() {
  const pressReleases = [
    {
      id: 1,
      title: "AGD Announces Successful Implementation of New IFMIS Module",
      slug: "agd-announces-successful-implementation-new-ifmis-module",
      date: "June 20, 2024",
      excerpt: "The Accountant General's Department is pleased to announce the successful implementation of the new Asset Management module in the IFMIS system across all government departments.",
      image: "/hero/1.JPG",
      category: "System Updates",
      readTime: "3 min read",
      priority: "high",
      featured: true
    },
    {
      id: 2,
      title: "Public Sector Financial Performance Shows Significant Improvement",
      slug: "public-sector-financial-performance-shows-significant-improvement",
      date: "June 15, 2024",
      excerpt: "Latest quarterly reports indicate a marked improvement in public sector financial management, with increased transparency and reduced processing times across all MDAs.",
      image: "/hero/3.jpg",
      category: "Performance",
      readTime: "5 min read",
      priority: "high",
      featured: true
    },
    {
      id: 3,
      title: "AGD Launches Comprehensive Training Program for Government Accountants",
      slug: "agd-launches-comprehensive-training-program",
      date: "May 28, 2024",
      excerpt: "A new comprehensive training program has been launched to enhance the skills and capabilities of government accountants in modern financial management practices.",
      image: "/hero/6.jpg",
      category: "Training",
      readTime: "4 min read",
      priority: "medium",
      featured: false
    },
    {
      id: 4,
      title: "New Procurement Guidelines Enhance Transparency in Government Spending",
      slug: "new-procurement-guidelines-enhance-transparency",
      date: "May 20, 2024",
      excerpt: "Updated procurement guidelines have been introduced to further enhance transparency and accountability in government procurement processes.",
      image: "/hero/2.JPG",
      category: "Policy",
      readTime: "6 min read",
      priority: "medium",
      featured: false
    },
    {
      id: 5,
      title: "AGD Receives Recognition for Excellence in Financial Management",
      slug: "agd-receives-recognition-excellence-financial-management",
      date: "May 10, 2024",
      excerpt: "The Accountant General's Department has been recognized by international partners for its outstanding improvements in public financial management systems.",
      image: "/hero/5.jpg",
      category: "Awards",
      readTime: "3 min read",
      priority: "high",
      featured: false
    },
    {
      id: 6,
      title: "Electronic Payment System Reduces Processing Time by 70%",
      slug: "electronic-payment-system-reduces-processing-time",
      date: "April 25, 2024",
      excerpt: "The implementation of the electronic payment system has resulted in a significant 70% reduction in payment processing times across all government departments.",
      image: "/hero/4.jpg",
      category: "Technology",
      readTime: "4 min read",
      priority: "medium",
      featured: false
    },
    {
      id: 7,
      title: "AGD Partners with Development Organizations for Capacity Building",
      slug: "agd-partners-development-organizations-capacity-building",
      date: "April 15, 2024",
      excerpt: "Strategic partnerships have been established with international development organizations to enhance capacity building in public financial management.",
      image: "/hero/7.JPG",
      category: "Partnerships",
      readTime: "5 min read",
      priority: "low",
      featured: false
    },
    {
      id: 8,
      title: "Quarterly Budget Review Shows Improved Fiscal Discipline",
      slug: "quarterly-budget-review-shows-improved-fiscal-discipline",
      date: "April 5, 2024",
      excerpt: "The latest quarterly budget review demonstrates improved fiscal discipline and better alignment between budget allocations and actual expenditures.",
      image: "/hero/1.JPG",
      category: "Budget",
      readTime: "6 min read",
      priority: "medium",
      featured: false
    },
    {
      id: 9,
      title: "AGD Introduces Digital Document Management System",
      slug: "agd-introduces-digital-document-management-system",
      date: "March 30, 2024",
      excerpt: "A new digital document management system has been introduced to streamline document processing and improve record-keeping across all departments.",
      image: "/hero/3.jpg",
      category: "Technology",
      readTime: "4 min read",
      priority: "low",
      featured: false
    }
  ];

  const categories = ["All", "System Updates", "Performance", "Training", "Policy", "Awards", "Technology", "Partnerships", "Budget"];
  const priorities = ["All", "High", "Medium", "Low"];

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">Press Releases</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-4 px-2 sm:px-0">
            Official announcements and press releases from the Accountant General&apos;s Department.
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
                  placeholder="Search press releases..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)]"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 mr-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                </div>
                {categories.slice(0, 5).map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      category === "All"
                        ? "bg-[var(--primary)] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700">Priority:</span>
                {priorities.map((priority) => (
                  <button
                    key={priority}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      priority === "All"
                        ? "bg-[var(--secondary)] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Press Releases */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">Featured Announcements</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pressReleases.filter(release => release.featured).map((release) => (
              <article key={release.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={release.image}
                    alt={release.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[var(--accent)] text-white text-xs font-medium rounded-full">
                      {release.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className={`px-3 py-1 text-white text-xs font-medium rounded-full ${
                      release.priority === 'high' ? 'bg-red-500' :
                      release.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}>
                      {release.priority.charAt(0).toUpperCase() + release.priority.slice(1)} Priority
                    </span>
                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {release.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {release.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Megaphone className="h-4 w-4" />
                      Press Release
                    </div>
                  </div>
                  
                  <Link href={`/publications/press-releases/${release.slug}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[var(--accent)] transition-colors">
                      {release.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {release.excerpt}
                  </p>
                  
                  <Link
                    href={`/publications/press-releases/${release.slug}`}
                    className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:text-[var(--secondary)] transition-colors"
                  >
                    Read Full Release
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* All Press Releases */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">All Press Releases</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressReleases.map((release) => (
              <article key={release.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={release.image}
                    alt={release.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[var(--accent)] text-white text-xs font-medium rounded-full">
                      {release.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-1">
                    <span className={`px-2 py-1 text-white text-xs font-medium rounded-full ${
                      release.priority === 'high' ? 'bg-red-500' :
                      release.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}>
                      {release.priority.charAt(0).toUpperCase()}
                    </span>
                    {release.featured && (
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {release.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {release.readTime}
                    </div>
                  </div>
                  
                  <Link href={`/publications/press-releases/${release.slug}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[var(--accent)] transition-colors">
                      {release.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {release.excerpt}
                  </p>
                  
                  <Link
                    href={`/publications/press-releases/${release.slug}`}
                    className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:text-[var(--secondary)] transition-colors"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
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