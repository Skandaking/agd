import Link from 'next/link';
import { Search, ChevronRight, Calendar } from 'lucide-react';

interface UpcomingEvent {
  id: number;
  slug: string;
  title: string;
  date: string;
}

interface EventsSidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  eventStatuses: string[];
  upcomingEvents: UpcomingEvent[];
}

export function EventsSidebar({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  eventStatuses,
  upcomingEvents,
}: EventsSidebarProps) {
  return (
    <aside className="lg:col-span-1 lg:sticky lg:top-24 self-start space-y-8">
      {/* Search Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-[var(--accent)] mb-4">Search Events</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)]"
          />
        </div>
      </div>

      {/* Event Status Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-[var(--accent)] mb-4">Event Status</h3>
        <ul className="space-y-2">
          {eventStatuses.map((status) => (
            <li key={status}>
              <button
                onClick={() => setSelectedStatus(status)}
                className={`w-full text-left flex justify-between items-center px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  selectedStatus === status 
                    ? 'bg-[var(--primary)] text-white shadow' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{status}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Upcoming Events Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-[var(--accent)] mb-4">Quick Access</h3>
        <ul className="space-y-4">
          {upcomingEvents.map(event => (
            <li key={event.id}>
              <Link href={`/publications/events/${event.slug}`} className="group block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <p className="font-semibold text-gray-800 group-hover:text-[var(--primary)] transition-colors text-sm leading-tight">{event.title}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <Calendar className="h-3 w-3" />
                  <span>{event.date}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
} 