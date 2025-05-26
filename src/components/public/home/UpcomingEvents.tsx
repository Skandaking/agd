export const UpcomingEvents = () => {
  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-100 h-full flex flex-col overflow-hidden">
      <div className="p-6 pb-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
          <h2 className="text-2xl font-bold text-[var(--accent)]">
            Upcoming Events
          </h2>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-auto">
        <p className="text-lg text-gray-600 leading-relaxed">
          Stay tuned for our upcoming events!
        </p>
        {/* Placeholder for events list */}
      </div>
    </section>
  );
}; 