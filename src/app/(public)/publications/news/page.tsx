import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, TrendingUp, Eye } from 'lucide-react';

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
      featured: true,
      views: "2.3k",
      trending: true
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
      featured: true,
      views: "1.8k",
      trending: false
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
      featured: false,
      views: "945",
      trending: true
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
      featured: false,
      views: "1.2k",
      trending: false
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
      featured: false,
      views: "756",
      trending: false
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
      featured: false,
      views: "634",
      trending: false
    }
  ];

  const categories = ["All", "System Update", "Report", "Training", "Technology", "Policy", "Meeting"];
  const featuredArticles = newsArticles.filter(article => article.featured);
  const regularArticles = newsArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section - Minimalist Approach */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-5" />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">Live Updates</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6">
              Latest News
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover the latest developments and insights from the Accountant General&apos;s Department
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Advanced Search & Filter */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search articles, topics, or keywords..."
                    className="w-full pl-12 pr-6 py-4 bg-white/60 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all placeholder-gray-400 text-gray-700"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-6 py-3 rounded-2xl font-medium transition-all ${
                      category === "All"
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                        : "bg-white/60 text-gray-700 hover:bg-white/80 hover:shadow-md"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured News - Magazine Layout */}
        <section className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
              <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
            </div>
            <div className="h-px bg-gradient-to-r from-indigo-600 to-transparent flex-1" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Featured Article */}
            <div className="lg:col-span-8">
              {featuredArticles[0] && (
                <article className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <div className="relative h-80 lg:h-96 overflow-hidden">
                    <Image
                      src={featuredArticles[0].image}
                      alt={featuredArticles[0].title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Floating Elements */}
                    <div className="absolute top-6 left-6 flex gap-3">
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-medium rounded-full">
                        {featuredArticles[0].category}
                      </span>
                      {featuredArticles[0].trending && (
                        <span className="px-4 py-2 bg-red-500/90 backdrop-blur-md text-white text-sm font-medium rounded-full flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Trending
                        </span>
                      )}
                    </div>
                    
                    <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-full text-white text-sm">
                      <Eye className="h-4 w-4" />
                      {featuredArticles[0].views}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex items-center gap-4 text-sm mb-4 opacity-90">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {featuredArticles[0].date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredArticles[0].readTime}
                      </div>
                    </div>
                    
                    <Link href={`/publications/news/${featuredArticles[0].slug}`}>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-4 hover:text-indigo-300 transition-colors">
                        {featuredArticles[0].title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-200 mb-6 text-lg leading-relaxed">
                      {featuredArticles[0].excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">By {featuredArticles[0].author}</span>
                      <Link
                        href={`/publications/news/${featuredArticles[0].slug}`}
                        className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full font-medium hover:bg-white/30 transition-all"
                      >
                        Read Full Story
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              )}
            </div>

            {/* Secondary Featured Articles */}
            <div className="lg:col-span-4 space-y-6">
              {featuredArticles.slice(1).map((article) => (
                <article key={article.id} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-500">{article.readTime}</span>
                      </div>
                      <Link href={`/publications/news/${article.slug}`}>
                        <h4 className="font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                      </Link>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{article.date}</span>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {article.views}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Articles - Masonry Style */}
        <section className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Articles</h2>
            <div className="h-px bg-gradient-to-r from-gray-300 to-transparent flex-1" />
            <button className="px-6 py-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors font-medium">
              View All
            </button>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {regularArticles.map((article, index) => (
              <article key={article.id} className={`break-inside-avoid bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                index % 3 === 0 ? 'lg:mt-8' : index % 3 === 1 ? 'lg:mt-4' : ''
              }`}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                    {article.trending && (
                      <span className="px-3 py-1 bg-red-500/90 text-white text-xs font-medium rounded-full flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-gray-700 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {article.views}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <Link href={`/publications/news/${article.slug}`}>
                    <h3 className="font-bold text-gray-900 mb-3 hover:text-indigo-600 transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">{article.author}</span>
                    <Link
                      href={`/publications/news/${article.slug}`}
                      className="inline-flex items-center gap-1 text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors"
                    >
                      Read More
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-1">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
}