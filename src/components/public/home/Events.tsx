"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface EventAPIItem {
  id: string | number;
  title: string;
  excerpt: string;
  type: string;
  state: 'upcoming' | 'ongoing' | 'past' | 'cancelled' | 'postponed';
  start_at: string;
  end_at?: string | null;
  location: string;
}

interface EventUIItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'training' | 'meeting' | 'workshop' | string;
}

export const Events = () => {
  const [items, setItems] = useState<EventUIItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/events?status=published&limit=5');
        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Failed to load events');
        const mapped: EventUIItem[] = (json.items as EventAPIItem[])
          .filter(e => e.state === 'upcoming' || e.state === 'ongoing')
          .slice(0, 5)
          .map((e) => ({
            id: String(e.id),
            title: e.title,
            date: new Date(e.start_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
            time: new Date(e.start_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
            location: e.location,
            type: e.type || 'meeting',
          }));
        setItems(mapped);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-100 h-full flex flex-col overflow-hidden">
      <div className="p-6 pb-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
          <h2 className="text-2xl font-bold text-[var(--accent)]">
            Events
          </h2>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto space-y-4">
        {loading ? (
          <div className="text-sm text-gray-500">Loading events...</div>
        ) : error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-gray-500">No upcoming events.</div>
        ) : (
        items.map((event) => (
          <div
            key={event.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-[var(--primary)] transition-colors bg-white hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-[var(--accent)]">
                  {event.title}
                </h3>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              <span
                className={`
                px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap
                ${event.type === "training"
                    ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                    : event.type === "meeting"
                        ? "bg-[var(--secondary)]/10 text-[var(--secondary)]"
                        : "bg-[var(--accent)]/10 text-[var(--accent)]"
                  }
              `}
              >
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </span>
            </div>
          </div>
        ))
        )}
      </div>

      {/* View All Events Button */}
      <div className="p-4 border-t bg-white mt-auto">
        <Link
          href="/publications/events" 
          className="flex items-center justify-center gap-2 py-2 px-4 bg-[var(--primary)]/10 text-[var(--primary)] font-semibold rounded-lg hover:bg-[var(--primary)]/20 transition-all duration-300"
        >
          View All Events
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}; 