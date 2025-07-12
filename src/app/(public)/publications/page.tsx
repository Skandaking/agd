import Image from 'next/image';
import Link from 'next/link';
import { Calendar, FileText, Megaphone, Users, ArrowRight, Download, Clock, Search } from 'lucide-react';

export default function PublicationsPage() {
  const publicationTypes = [
    {
      title: "Latest News",
      description: "Stay informed with the latest updates and announcements from the AGD",
      icon: <FileText className="h-8 w-8" />,
      href: "/publications/news",
      color: "bg-[var(--primary)]",
      count: "24 articles",
      latest: "AGD Launches New Financial Management System"
    },
    {
      title: "Events",
      description: "Discover upcoming training sessions, conferences, and workshops",
      icon: <Calendar className="h-8 w-8" />,
      href: "/publications/events",
      color: "bg-[var(--secondary)]",
      count: "12 events",
      latest: "Financial Management Training Workshop"
    },
    {
      title: "Documents",
      description: "Access official documents, reports, guidelines, and publications",
      icon: <Download className="h-8 w-8" />,
      href: "/publications/documents",
      color: "bg-[var(--accent)]",
      count: "156 documents",
      latest: "Annual Financial Statement 2023"
    },
    {
      title: "Press Releases",
      description: "Official announcements and press releases from the AGD",
      icon: <Megaphone className="h-8 w-8" />,
      href: "/publications/press-releases",
      color: "bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]",
      count: "18 releases",
      latest: "AGD Announces Successful Implementation of New IFMIS Module"
    }
  ];

  const recentContent = [
    {
      id: 1,
      title: "AGD Launches New Financial Management System",
      type: "News",
      date: "June 15, 2024",
      excerpt: "The Accountant General's Department has successfully launched a new financial management system to enhance transparency.",
      image: "/hero/5.jpg",
      href: "/publications/news/agd-launches-new-financial-system"
    },
    {
      id: 2,
      title: "Financial Management Training Workshop",
      type: "Event",
      date: "July 15, 2024",
      excerpt: "Comprehensive training on financial management best practices for government accountants and financial officers.",
      image: "/hero/6.jpg",
      href: "/publications/events/financial-management-training-workshop"
    },
    {
      id: 3,
      title: "Annual Financial Statement 2023",
      type: "Document",
      date: "June 10, 2024",
      excerpt: "Comprehensive financial statement for the fiscal year 2023, including revenue, expenditure, and asset management reports.",
      image: "/hero/3.jpg",
      href: "/publications/documents/annual-financial-statement-2023"
    },
    {
      id: 4,
      title: "AGD Announces Successful Implementation of New IFMIS Module",
      type: "Press Release",
      date: "June 20, 2024",
      excerpt: "The Accountant General's Department is pleased to announce the successful implementation of the new Asset Management module.",
      image: "/hero/1.JPG",
      href: "/publications/press-releases/agd-announces-successful-implementation-new-ifmis-module"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[260px] flex items-center justify-center overflow-hidden py-8 px-2 sm:px-4 md:py-0 md:h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/hero/4.JPG)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/70 to-[var(--secondary)]/70" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-16 h-16 bg-[var(--accent)]/5 rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-[var(--secondary)]/5 rounded-tl-full" />
          <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-[var(--primary)]/5 rounded-full -translate-y-1/2" />
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-[var(--accent)]/5 rounded-full" />
        </div>

        <div className="relative w-full max-w-4xl mx-auto text-center z-10 flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">Publications Hub</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-4 px-2 sm:px-0">
            Your central access point for news, events, documents, and official announcements from the Accountant General&apos;s Department.
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
        
        {/* Search Section */}
        <section className="bg-white rounded-xl shadow-lg p-6 mb-12 border border-gray-100">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4 text-[var(--accent)]">Search Publications</h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search across all publications..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] text-lg"
              />
            </div>
            <p className="text-center text-gray-600 mt-3 text-sm">
              Search across news articles, events, documents, and press releases
            </p>
          </div>
        </section>

        {/* Publication Types Grid */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">Browse Publications</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {publicationTypes.map((type, index) => (
              <Link
                key={index}
                href={type.href}
                className="group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`${type.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full" />
                  <div className="relative z-10">
                    <div className="mb-4">
                      {type.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                    <p className="text-white/90 text-sm">{type.count}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {type.description}
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Latest:</p>
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">
                      {type.latest}
                    </p>
                  </div>
                  
                  <div className="flex items-center text-[var(--primary)] font-semibold group-hover:text-[var(--secondary)] transition-colors">
                    <span>Browse All</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Content */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">Recent Publications</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentContent.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-white text-xs font-medium rounded-full ${
                      item.type === 'News' ? 'bg-[var(--primary)]' :
                      item.type === 'Event' ? 'bg-[var(--secondary)]' :
                      item.type === 'Document' ? 'bg-[var(--accent)]' :
                      'bg-gray-600'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4" />
                    {item.date}
                  </div>
                  
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Publication Statistics</h2>
              <p className="text-white/90">
                A comprehensive overview of our publication activities
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24</div>
                <div className="text-white/80">News Articles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">12</div>
                <div className="text-white/80">Upcoming Events</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">156</div>
                <div className="text-white/80">Documents</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">18</div>
                <div className="text-white/80">Press Releases</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1 bg-[var(--secondary)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">Quick Access</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[var(--primary)]/10 rounded-lg">
                  <Clock className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Latest Updates</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Stay current with the most recent news and announcements from AGD.
              </p>
              <Link
                href="/publications/news"
                className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:text-[var(--secondary)] transition-colors"
              >
                View Latest News
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[var(--secondary)]/10 rounded-lg">
                  <Users className="h-6 w-6 text-[var(--secondary)]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Upcoming Events</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Register for training sessions, workshops, and conferences.
              </p>
              <Link
                href="/publications/events"
                className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:text-[var(--secondary)] transition-colors"
              >
                View Events
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[var(--accent)]/10 rounded-lg">
                  <Download className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Download Center</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Access official documents, reports, and guidelines.
              </p>
              <Link
                href="/publications/documents"
                className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:text-[var(--secondary)] transition-colors"
              >
                Browse Documents
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">Stay Informed</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest publications, event notifications, 
              and important announcements directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)]"
              />
              <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 