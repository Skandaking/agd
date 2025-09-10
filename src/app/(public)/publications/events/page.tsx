'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, Search } from 'lucide-react';
import { EventsSidebar } from '@/components/public/events/EventsSidebar';

interface EventAPIItem {
  id: string | number;
  title: string;
  excerpt: string;
  content: string;
  type: string;
  state: 'upcoming' | 'ongoing' | 'past' | 'cancelled' | 'postponed';
  status: 'draft' | 'published' | 'archived';
  start_at: string;
  end_at: string | null;
  location: string;
  venue: string | null;
  registration_required: boolean | number;
  registration_deadline: string | null;
  registration_url?: string | null;
  max_attendees: number | null;
  current_attendees: number | null;
  image_url: string | null;
  featured: boolean | number;
}

interface EventUIItem {
  id: number;
  title: string;
  slug: string;
  date: string;
  time: string;
  location: string;
  venue?: string | null;
  type: string;
  description: string;
  image: string;
  registrationRequired: boolean;
  maxAttendees: number | null;
  currentAttendees: number;
  registrationDeadline: string | null;
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled' | 'postponed';
  featured: boolean;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventUIItem[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/events?status=published&limit=100');
        const json = await res.json();
        if (!json.success) return;
        const mapped: EventUIItem[] = (json.items as EventAPIItem[]).map((e) => {
          const start = e.start_at ? new Date(e.start_at) : null;
          const end = e.end_at ? new Date(e.end_at) : null;
          const date = start ? start.toLocaleDateString() : '';
          const startTime = start ? start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
          const endTime = end ? end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
          const idNum = typeof e.id === 'string' ? Number(e.id) : e.id;
          return {
            id: idNum,
            title: e.title,
            slug: String(e.id),
            date,
            time: endTime ? `${startTime} - ${endTime}` : startTime,
            location: e.location,
            venue: e.venue,
            type: e.type,
            description: e.excerpt || '',
            image: e.image_url || '/hero/6.JPG',
            registrationRequired: Boolean(e.registration_required),
            maxAttendees: e.max_attendees ?? null,
            currentAttendees: e.current_attendees ?? 0,
            registrationDeadline: e.registration_deadline ? new Date(e.registration_deadline).toLocaleDateString() : null,
            status: (e.state || 'upcoming') as EventUIItem['status'],
            featured: Boolean(e.featured),
          };
        });
        setEvents(mapped);
      } catch (e) {
        console.error('Failed to load events', e);
        setEvents([]);
      }
    };
    load();
  }, []);

  const eventTypes = ["All", "Training", "Conference", "Seminar", "Forum", "Workshop", "Meeting"]; // UI labels only
  const eventStatuses = ["Upcoming", "Past", "All"];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('Upcoming');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (event.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || event.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || event.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  const featuredEvents = filteredEvents.filter(event => event.featured);
  const otherEvents = filteredEvents.filter(event => !event.featured);
  const upcomingEventsForSidebar = events
    .filter(e => e.status === 'upcoming')
    .slice(0, 3)
    .map((e) => ({ id: e.id, slug: e.slug, title: e.title, date: e.date }));

  const eventCounts = {
    'Upcoming': events.filter(e => e.status === 'upcoming').length,
    'Past': events.filter(e => e.status === 'past').length,
    'All': events.length,
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
          <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-[var(--primary)]/10 rounded-full -translate-y-1/2" />
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-[var(--accent)]/10 rounded-full" />
        </div>

        <div className="relative w-full max-w-6xl mx-auto text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">Events & Training</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* Sidebar */}
          <EventsSidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            eventStatuses={eventStatuses}
            eventCounts={eventCounts}
            upcomingEvents={upcomingEventsForSidebar}
          />

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            {/* Event Types Filter */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-8 border border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-[var(--accent)] mr-2">Filter by Type:</span>
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedType === type
                        ? "bg-[var(--secondary)] text-white shadow"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-16 bg-white rounded-lg shadow-md h-full">
                <Search className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800">No Events Found</h3>
                <p className="text-gray-600 mt-2 max-w-sm">
                  We couldn&apos;t find any events matching your search or filter criteria. Please try adjusting your filters.
                </p>
              </div>
            ) : (
              <>
                {/* Featured Events */}
                {featuredEvents.length > 0 && (
                  <section className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-8 w-1 bg-[var(--accent)] rounded-full" />
                      <h2 className="text-3xl font-bold text-[var(--accent)]">Featured Events</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {featuredEvents.map((event) => (
                        <div key={event.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                          <div className="relative h-56 overflow-hidden">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, 50vw"
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
                                  {event.currentAttendees}/{event.maxAttendees || '-'} registered
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
                )}

                {/* All Events */}
                {otherEvents.length > 0 && (
                  <section className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
                      <h2 className="text-3xl font-bold text-[var(--accent)]">
                        {selectedStatus !== 'All' || selectedType !== 'All' ? 'Filtered Events' : 'Other Events'}
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {otherEvents.map((event) => (
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
                                <MapPin className="h-4 w-4 text-[var(--accent)]" />
                                {event.location}
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                              </span>
                              <Link
                                href={`/publications/events/${event.slug}`}
                                className="text-[var(--primary)] font-semibold hover:text-[var(--secondary)] transition-colors text-sm"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}