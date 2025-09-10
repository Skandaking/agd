"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ArrowLeft, 
  User,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  MapPin as Venue,
  Phone,
  Mail
} from 'lucide-react';
import { useParams } from 'next/navigation';

interface EventDetail {
  id: string;
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
  registration_required: boolean;
  registration_deadline: string | null;
  registration_url: string | null;
  max_attendees: number | null;
  current_attendees: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  views: number;
  featured: boolean;
  image_url: string | null;
  created_by_name: string | null;
  updated_by_name: string | null;
}

interface OtherEvent {
  id: string;
  title: string;
  type: string;
  start_at: string;
  location: string;
  image_url: string | null;
  state: string;
}

export default function EventDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug as string;
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [otherEvents, setOtherEvents] = useState<OtherEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        
        // Fetch current event
        const res = await fetch(`/api/events/${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to load event');
        setEvent(data.item);

        // Fetch other events for sidebar
        const otherRes = await fetch('/api/events?status=published&limit=10');
        const otherData = await otherRes.json();
        if (otherData.success) {
          const others = (otherData.items as EventDetail[])
            .filter((e) => e.id !== data.item.id)
            .slice(0, 6)
            .map((e) => ({
              id: e.id,
              title: e.title,
              type: e.type,
              start_at: e.start_at,
              location: e.location,
              image_url: e.image_url,
              state: e.state,
            }));
          setOtherEvents(others);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const formatDate = (value?: string | null) => {
    if (!value) return '';
    const d = new Date(value);
    return d.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (value?: string | null) => {
    if (!value) return '';
    const d = new Date(value);
    return d.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'upcoming': return 'text-green-600 bg-green-100';
      case 'ongoing': return 'text-blue-600 bg-blue-100';
      case 'past': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'postponed': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Training': return 'bg-[var(--primary)] text-white';
      case 'Conference': return 'bg-[var(--secondary)] text-white';
      case 'Seminar': return 'bg-[var(--accent)] text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const isRegistrationOpen = (event: EventDetail) => {
    if (!event.registration_required) return false;
    if (!event.registration_deadline) return event.state === 'upcoming';
    const deadline = new Date(event.registration_deadline);
    const now = new Date();
    return now <= deadline && event.state === 'upcoming';
  };

  const getAvailableSpots = (event: EventDetail) => {
    if (!event.max_attendees) return null;
    return event.max_attendees - event.current_attendees;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative min-h-[300px] flex items-end justify-start overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${event?.image_url || '/hero/6.JPG'})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        
        <div className="relative w-full px-3 md:px-4 lg:px-6 xl:px-8 pb-8 z-10">
          <div className="max-w-7xl mx-auto">
            <Link 
              href="/publications/events" 
              className="inline-flex items-center gap-2 text-white/90 mb-4 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Events
            </Link>
            
            {event && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3 items-center">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStateColor(event.state)}`}>
                    {event.state.charAt(0).toUpperCase() + event.state.slice(1)}
                  </span>
                  {event.featured && (
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {event.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(event.start_at)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {formatTime(event.start_at)}
                    {event.end_at && ` - ${formatTime(event.end_at)}`}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-3 md:px-4 lg:px-6 xl:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-gray-500 py-10">Loading event...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-10">{error}</div>
          ) : !event ? (
            <div className="text-center text-gray-500 py-10">Event not found.</div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Main Content */}
              <div className="lg:col-span-8 space-y-8">
                {/* Event Summary */}
                {event.excerpt && (
                  <div className="bg-gray-50 border-l-4 border-[var(--primary)] rounded-md p-6">
                    <p className="text-lg text-gray-700 leading-relaxed">{event.excerpt}</p>
                  </div>
                )}

                {/* Event Description */}
                <div className="prose prose-sm max-w-none">
                  <div className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: event.content }} />
                </div>

                {/* Registration Section */}
                {event.registration_required && (
                  <div className="bg-white border rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5 text-[var(--primary)]" />
                      Registration Information
                    </h3>
                    
                    <div className="space-y-4">
                      {isRegistrationOpen(event) ? (
                        <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-md">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-800">Registration Open</p>
                            <p className="text-sm text-green-700">
                              You can register for this event
                              {event.registration_deadline && (
                                <> until {formatDate(event.registration_deadline)}</>
                              )}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-md">
                          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-red-800">Registration Closed</p>
                            <p className="text-sm text-red-700">
                              {event.state === 'past' 
                                ? 'This event has already taken place'
                                : 'Registration is no longer available for this event'
                              }
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {event.max_attendees && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Capacity
                            </label>
                            <p className="text-gray-900">
                              {event.current_attendees} / {event.max_attendees} registered
                              {getAvailableSpots(event) !== null && (
                                <span className="text-sm text-gray-500 ml-2">
                                  ({getAvailableSpots(event)} spots left)
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                        
                        {event.registration_deadline && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Registration Deadline
                            </label>
                            <p className="text-gray-900">{formatDate(event.registration_deadline)}</p>
                          </div>
                        )}
                      </div>

                      {event.registration_url && isRegistrationOpen(event) && (
                        <div className="pt-4 border-t">
                          <a
                            href={event.registration_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors"
                          >
                            Register Now
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-6">
                {/* Event Details */}
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-[var(--primary)] mt-0.5" />
                      <div>
                        <p className="font-medium">{formatDate(event.start_at)}</p>
                        <p className="text-sm text-gray-600">
                          {formatTime(event.start_at)}
                          {event.end_at && ` - ${formatTime(event.end_at)}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[var(--primary)] mt-0.5" />
                      <div>
                        <p className="font-medium">{event.location}</p>
                        {event.venue && (
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Venue className="h-3 w-3" />
                            {event.venue}
                          </p>
                        )}
                      </div>
                    </div>

                    {event.created_by_name && (
                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-[var(--primary)] mt-0.5" />
                        <div>
                          <p className="font-medium">Organized by</p>
                          <p className="text-sm text-gray-600">{event.created_by_name}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-[var(--primary)]" />
                      <span className="text-sm">+265 1 788 533</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-[var(--primary)]" />
                      <span className="text-sm">ag@agd.gov.mw</span>
                    </div>
                  </div>
                </div>

                {/* Other Events */}
                {otherEvents.length > 0 && (
                  <div className="bg-white border rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Other Events</h3>
                    <div className="space-y-3">
                      {otherEvents.map((e) => (
                        <Link 
                          key={e.id} 
                          href={`/publications/events/${e.id}`} 
                          className="group block"
                        >
                          <div className="flex gap-3 p-3 rounded-lg border hover:border-[var(--primary)]/50 transition-colors">
                            <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                              {e.image_url && (
                                <Image 
                                  src={e.image_url} 
                                  alt={e.title} 
                                  fill 
                                  className="object-cover" 
                                  sizes="64px"
                                />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-[var(--primary)]">
                                {e.title}
                              </h4>
                              <div className="text-xs text-gray-500 mt-1 space-y-1">
                                <p>{e.type}</p>
                                <p>{formatDate(e.start_at)}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
