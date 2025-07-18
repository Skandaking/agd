import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, Search, Filter } from 'lucide-react';

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Financial Management Training Workshop",
      slug: "financial-management-training-workshop",
      date: "July 15, 2024",
      time: "09:00 AM - 05:00 PM",
      location: "AGD Training Center, Lilongwe",
      venue: "Main Conference Hall",
      type: "Training",
      description: "Comprehensive training on financial management best practices for government accountants and financial officers.",
      image: "/hero/6.jpg",
      registrationRequired: true,
      maxAttendees: 150,
      currentAttendees: 89,
      registrationDeadline: "July 10, 2024",
      status: "upcoming",
      featured: true
    },
    {
      id: 2,
      title: "IFMIS User Conference 2024",
      slug: "ifmis-user-conference-2024",
      date: "July 22-24, 2024",
      time: "08:00 AM - 04:00 PM",
      location: "Bingu International Convention Centre",
      venue: "Main Auditorium",
      type: "Conference",
      description: "Annual conference bringing together IFMIS users from across all government departments to share experiences and best practices.",
      image: "/hero/1.JPG",
      registrationRequired: true,
      maxAttendees: 500,
      currentAttendees: 342,
      registrationDeadline: "July 18, 2024",
      status: "upcoming",
      featured: true
    },
    {
      id: 3,
      title: "Budget Planning Seminar",
      slug: "budget-planning-seminar",
      date: "August 5, 2024",
      time: "10:00 AM - 03:00 PM",
      location: "AGD Main Conference Room",
      venue: "Conference Room A",
      type: "Seminar",
      description: "Seminar on budget planning and execution strategies for the upcoming fiscal year.",
      image: "/hero/3.jpg",
      registrationRequired: true,
      maxAttendees: 100,
      currentAttendees: 67,
      registrationDeadline: "August 1, 2024",
      status: "upcoming",
      featured: false
    },
    {
      id: 4,
      title: "Public Finance Management Forum",
      slug: "public-finance-management-forum",
      date: "August 12, 2024",
      time: "02:00 PM - 06:00 PM",
      location: "Capital Hotel, Lilongwe",
      venue: "Grand Ballroom",
      type: "Forum",
      description: "Forum discussing challenges and opportunities in public finance management with stakeholders.",
      image: "/hero/2.JPG",
      registrationRequired: false,
      maxAttendees: 200,
      currentAttendees: 0,
      registrationDeadline: null,
      status: "upcoming",
      featured: false
    },
    {
      id: 5,
      title: "Technology in Government Finance",
      slug: "technology-in-government-finance",
      date: "May 20, 2024",
      time: "09:00 AM - 01:00 PM",
      location: "ICT Lab, AGD Headquarters",
      venue: "Computer Lab 1",
      type: "Workshop",
      description: "Workshop on leveraging technology to improve government financial management and reporting.",
      image: "/hero/5.jpg",
      registrationRequired: true,
      maxAttendees: 50,
      currentAttendees: 50,
      registrationDeadline: "May 15, 2024",
      status: "past",
      featured: false
    },
    {
      id: 6,
      title: "Annual Stakeholders Meeting",
      slug: "annual-stakeholders-meeting",
      date: "April 10, 2024",
      time: "08:30 AM - 04:30 PM",
      location: "AGD Auditorium",
      venue: "Main Auditorium",
      type: "Meeting",
      description: "Annual meeting with stakeholders to discuss AGD's performance and future plans.",
      image: "/hero/4.jpg",
      registrationRequired: false,
      maxAttendees: 300,
      currentAttendees: 0,
      registrationDeadline: null,
      status: "past",
      featured: false
    }
  ];

  const eventTypes = ["All", "Training", "Conference", "Seminar", "Forum", "Workshop", "Meeting"];
  const eventStatuses = ["All", "Upcoming", "Past"];

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">Events</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-4 px-2 sm:px-0">
            Discover upcoming training sessions, conferences, and workshops organized by the AGD.
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
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)]"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 mr-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Type:</span>
                </div>
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      type === "All"
                        ? "bg-[var(--primary)] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                {eventStatuses.map((status) => (
                  <button
                    key={status}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      status === "All"
                        ? "bg-[var(--secondary)] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">Featured Events</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.filter(event => event.featured).map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-white text-xs font-medium rounded-full ${
                      event.type === 'Training' ? 'bg-[var(--primary)]' :
                      event.type === 'Conference' ? 'bg-[var(--secondary)]' :
                      event.type === 'Seminar' ? 'bg-[var(--accent)]' :
                      'bg-gray-600'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white">
                      <div className="flex items-center gap-2 text-sm mb-1">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <Link href={`/publications/events/${event.slug}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[var(--accent)] transition-colors">
                      {event.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-[var(--secondary)]" />
                      {event.time}
                    </div>
                    {event.registrationRequired && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4 text-[var(--accent)]" />
                        {event.currentAttendees}/{event.maxAttendees} registered
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                    {event.status === 'upcoming' && event.registrationRequired ? (
                      <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors">
                        Register Now
                      </button>
                    ) : (
                      <Link
                        href={`/publications/events/${event.slug}`}
                        className="text-[var(--primary)] font-semibold hover:text-[var(--secondary)] transition-colors"
                      >
                        View Details
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Events */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--accent)]">All Events</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
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
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-white text-xs font-medium rounded-full ${
                      event.type === 'Training' ? 'bg-[var(--primary)]' :
                      event.type === 'Conference' ? 'bg-[var(--secondary)]' :
                      event.type === 'Seminar' ? 'bg-[var(--accent)]' :
                      'bg-gray-600'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  {event.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <Link href={`/publications/events/${event.slug}`}>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 hover:text-[var(--accent)] transition-colors">
                      {event.title}
                    </h3>
                  </Link>
                  
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
                  
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                    {event.status === 'upcoming' && event.registrationRequired ? (
                      <button className="bg-[var(--primary)] text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-[var(--primary)]/90 transition-colors">
                        Register
                      </button>
                    ) : (
                      <Link
                        href={`/publications/events/${event.slug}`}
                        className="text-[var(--primary)] font-semibold hover:text-[var(--secondary)] transition-colors text-sm"
                      >
                        View Details
                      </Link>
                    )}
                  </div>
                </div>
              </div>
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
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
} 