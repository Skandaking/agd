import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, Filter } from 'lucide-react';

export default function NewsPage() {
  const newsArticles = [
    {
      id: 1,
      title: "AGD Launches New Financial Management System",
      slug: "agd-launches-new-financial-system",
      date: "June 15, 2024",
      excerpt: "The Accountant General's Department has successfully launched a new financial management system to enhance transparency and efficiency in public finance management.",
      image: "/hero/5.jpg",
      category: "System Update",
      readTime: "5 min read",
      author: "AGD Communications",
      featured: true
    },
    {
      id: 2,
      title: "Annual Public Sector Financial Report Released",
      slug: "annual-public-sector-financial-report",
      date: "May 28, 2024",
      excerpt: "The AGD has released the annual financial report for the public sector, highlighting key achievements and challenges in fiscal management over the past year.",
      image: "/hero/3.jpg",
      category: "Report",
      readTime: "8 min read",
      author: "AGD Communications",
      featured: true
    },
    {
      id: 3,
      title: "Training Workshop for Government Accountants",
      slug: "training-workshop-government-accountants",
      date: "May 10, 2024",
      excerpt: "Over 200 government accountants participated in a capacity building workshop organized by the AGD to enhance their skills in modern financial reporting.",
      image: "/hero/6.jpg",
      category: "Training",
      readTime: "4 min read",
      author: "AGD Communications",
      featured: false
    },
    {
      id: 4,
      title: "IFMIS System Enhancement Completed",
      slug: "ifmis-system-enhancement-completed",
      date: "April 22, 2024",
      excerpt: "The IFMIS system has been successfully enhanced with new features to improve user experience and streamline financial processes across all MDAs.",
      image: "/hero/1.JPG",
      category: "Technology",
      readTime: "6 min read",
      author: "AGD Communications",
      featured: false
    },
    {
      id: 5,
      title: "New Procurement Guidelines Published",
      slug: "new-procurement-guidelines-published",
      date: "April 15, 2024",
      excerpt: "Updated procurement guidelines have been published to ensure better compliance and transparency in government procurement processes.",
      image: "/hero/2.JPG",
      category: "Policy",
      readTime: "7 min read",
      author: "AGD Communications",
      featured: false
    },
    {
      id: 6,
      title: "Quarterly Budget Review Meeting",
      slug: "quarterly-budget-review-meeting",
      date: "March 30, 2024",
      excerpt: "The quarterly budget review meeting was held to assess budget implementation progress and address challenges in financial management.",
      image: "/hero/4.jpg",
      category: "Meeting",
      readTime: "3 min read",
      author: "AGD Communications",
      featured: false
    }
  ];

  const categories = ["All", "System Update", "Report", "Training", "Technology", "Policy", "Meeting"];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[260px] flex items-center justify-center overflow-hidden py-8 px-2 sm:px-4 md:py-0 md:h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/hero/5.JPG)` }}
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">Latest News</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-4 px-2 sm:px-0">
            Stay informed with the latest updates and announcements from the Accountant General&apos;s Department.
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
                  placeholder="Search news articles..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)]"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 mr-4">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              {categories.map((category) => (
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

        {/* Featured News */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">Featured News</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {newsArticles.filter(article => article.featured).map((article) => (
              <article key={article.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[var(--accent)] text-white text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <Link href={`/publications/news/${article.slug}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[var(--accent)] transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {article.author}</span>
                    <Link
                      href={`/publications/news/${article.slug}`}
                      className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:text-[var(--secondary)] transition-colors"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* All News */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">All News</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[var(--accent)] text-white text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                  {article.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <Link href={`/publications/news/${article.slug}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[var(--accent)] transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {article.author}</span>
                    <Link
                      href={`/publications/news/${article.slug}`}
                      className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:text-[var(--secondary)] transition-colors"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
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