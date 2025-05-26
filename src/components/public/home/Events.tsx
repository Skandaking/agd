interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  type: "training" | "meeting" | "workshop";
}

export const Events = () => {
  const events: Event[] = [
    {
      title: "Financial Management Training",
      date: "2024-02-20",
      time: "09:00 AM",
      location: "AGD Training Center",
      type: "training",
    },
    {
      title: "Quarterly Budget Review",
      date: "2024-02-25",
      time: "10:30 AM",
      location: "Main Conference Room",
      type: "meeting",
    },
    {
      title: "IFMIS Workshop",
      date: "2024-03-01",
      time: "02:00 PM",
      location: "ICT Lab",
      type: "workshop",
    },
    {
      title: "IFMIS Workshop",
      date: "2024-03-01",
      time: "02:00 PM",
      location: "ICT Lab",
      type: "workshop",
    },
  ];

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
        {events.map((event, index) => (
          <div
            key={index}
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
                    <span>{new Date(event.date).toLocaleDateString(
                      undefined,
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}</span>
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
        ))}
      </div>
    </section>
  );
}; 