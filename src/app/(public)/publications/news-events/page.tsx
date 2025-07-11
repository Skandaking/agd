import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight, FileText, Download, Filter } from 'lucide-react';

export default function NewsEventsPage() {
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">News & Events</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-4 px-2 sm:px-0">
            Stay updated with the latest news, announcements, and upcoming events from the Accountant General&apos;s Department.
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
        
        {/* Filter Section */}
        <section className="bg-white rounded-xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-[var(--accent)]" />
              <h2 className="text-xl font-semibold text-gray-800">Filter Content</h2>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary)]/90 transition-colors">
                All
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                News
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Events
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Publications
              </button>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">Latest News</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                title: "AGD Launches New Financial Management System",
                date: "June 15, 2024",
                excerpt: "The Accountant General's Department has successfully launched a new financial management system to enhance transparency and efficiency in public finance management.",
                image: "/hero/5.jpg",
                category: "System Update",
                readTime: "5 min read"
              },
              {
                id: 2,
                title: "Annual Public Sector Financial Report Released",
                date: "May 28, 2024",
                excerpt: "The AGD has released the annual financial report for the public sector, highlighting key achievements and challenges in fiscal management over the past year.",
                image: "/hero/3.jpg",
                category: "Report",
                readTime: "8 min read"
              },
              {
                id: 3,
                title: "Training Workshop for Government Accountants",
                date: "May 10, 2024",
                excerpt: "Over 200 government accountants participated in a capacity building workshop organized by the AGD to enhance their skills in modern financial reporting.",
                image: "/hero/6.jpg",
                category: "Training",
                readTime: "4 min read"
              },
              {
                id: 4,
                title: "IFMIS System Enhancement Completed",
                date: "April 22, 2024",
                excerpt: "The IFMIS system has been successfully enhanced with new features to improve user experience and streamline financial processes across all MDAs.",
                image: "/hero/1.JPG",
                category: "Technology",
                readTime: "6 min read"
              },
              {
                id: 5,
                title: "New Procurement Guidelines Published",
                date: "April 15, 2024",
                excerpt: "Updated procurement guidelines have been published to ensure better compliance and transparency in government procurement processes.",
                image: "/hero/2.JPG",
                category: "Policy",
                readTime: "7 min read"
              },
              {
                id: 6,
                title: "Quarterly Budget Review Meeting",
                date: "March 30, 2024",
                excerpt: "The quarterly budget review meeting was held to assess budget implementation progress and address challenges in financial management.",
                image: "/hero/4.jpg",
                category: "Meeting",
                readTime: "3 min read"
              }
            ].map((news) => (
              <article key={news.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[var(--accent)] text-white text-xs font-medium rounded-full">
                      {news.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {news.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {news.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[var(--accent)] transition-colors">
                    {news.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>
                  
                  <Link
                    href={`/news/${news.id}`}
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

        {/* Events Section */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">Upcoming Events</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                title: "Financial Management Training Workshop",
                date: "July 15, 2024",
                time: "09:00 AM - 05:00 PM",
                location: "AGD Training Center, Lilongwe",
                type: "Training",
                description: "Comprehensive training on financial management best practices for government accountants and financial officers.",
                image: "/hero/6.jpg"
              },
              {
                id: 2,
                title: "IFMIS User Conference 2024",
                date: "July 22-24, 2024",
                time: "08:00 AM - 04:00 PM",
                location: "Bingu International Convention Centre",
                type: "Conference",
                description: "Annual conference bringing together IFMIS users from across all government departments to share experiences and best practices.",
                image: "/hero/1.JPG"
              },
              {
                id: 3,
                title: "Budget Planning Seminar",
                date: "August 5, 2024",
                time: "10:00 AM - 03:00 PM",
                location: "AGD Main Conference Room",
                type: "Seminar",
                description: "Seminar on budget planning and execution strategies for the upcoming fiscal year.",
                image: "/hero/3.jpg"
              },
              {
                id: 4,
                title: "Public Finance Management Forum",
                date: "August 12, 2024",
                time: "02:00 PM - 06:00 PM",
                location: "Capital Hotel, Lilongwe",
                type: "Forum",
                description: "Forum discussing challenges and opportunities in public finance management with stakeholders.",
                image: "/hero/2.JPG"
              },
              {
                id: 5,
                title: "Technology in Government Finance",
                date: "August 20, 2024",
                time: "09:00 AM - 01:00 PM",
                location: "ICT Lab, AGD Headquarters",
                type: "Workshop",
                description: "Workshop on leveraging technology to improve government financial management and reporting.",
                image: "/hero/5.jpg"
              },
              {
                id: 6,
                title: "Annual Stakeholders Meeting",
                date: "September 10, 2024",
                time: "08:30 AM - 04:30 PM",
                location: "AGD Auditorium",
                type: "Meeting",
                description: "Annual meeting with stakeholders to discuss AGD's performance and future plans.",
                image: "/hero/4.jpg"
              }
            ].map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className={`px-3 py-1 text-white text-xs font-medium rounded-full ${
                      event.type === 'Training' ? 'bg-[var(--primary)]' :
                      event.type === 'Conference' ? 'bg-[var(--secondary)]' :
                      event.type === 'Seminar' ? 'bg-[var(--accent)]' :
                      'bg-gray-600'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[var(--accent)] transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-[var(--primary)]" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-[var(--secondary)]" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-[var(--accent)]" />
                      {event.location}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <button className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publications Section */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--secondary)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">Latest Publications</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                title: "Financial Statement 2023",
                date: "June 10, 2024",
                fileSize: "2.4 MB",
                fileType: "PDF",
                description: "Comprehensive financial statement for the fiscal year 2023, including revenue, expenditure, and asset management reports."
              },
              {
                id: 2,
                title: "Annual Budget Report 2024",
                date: "May 22, 2024",
                fileSize: "3.7 MB",
                fileType: "PDF",
                description: "Detailed analysis of budget implementation and financial performance for the year 2024."
              },
              {
                id: 3,
                title: "Procurement Guidelines 2024",
                date: "April 15, 2024",
                fileSize: "1.8 MB",
                fileType: "PDF",
                description: "Updated guidelines for government procurement processes, ensuring transparency and compliance."
              }
            ].map((pub) => (
              <div key={pub.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--secondary)]/10 rounded-lg">
                    <FileText className="h-8 w-8 text-[var(--secondary)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {pub.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {pub.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {pub.date} • {pub.fileSize} • {pub.fileType}
                      </div>
                      <button className="p-2 text-[var(--secondary)] hover:bg-[var(--secondary)]/10 rounded-full transition-colors">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-3">Stay Connected</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto text-sm">
              Subscribe to our newsletter to receive the latest news and event updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-[var(--primary)] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 