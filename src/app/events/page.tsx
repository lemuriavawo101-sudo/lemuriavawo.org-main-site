import { Metadata } from 'next';
import { EVENTS } from '@/lib/constants';
import EventsPageClient from '@/components/EventsPageClient';
import ScrollRestoration from '@/components/ScrollRestoration';

export const metadata: Metadata = {
    title: 'Events | Lemuria Varmakalari Adimurai World Organization',
    description: 'Explore upcoming sacred gatherings, workshops, and retreats. Discover your next transformative experience with Lemuria VAWO.',
};

export default async function EventsPage({
    searchParams,
}: {
    searchParams: Promise<{ id?: string }>;
}) {
    const params = await searchParams;
    const targetId = params.id ? parseInt(params.id) : null;

    // Server-side: compute today's date and split events
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    const upcomingEvents = EVENTS
        .filter(e => e.date >= todayStr)
        .sort((a, b) => a.date.localeCompare(b.date));

    const pastEvents = EVENTS
        .filter(e => e.date < todayStr)
        .sort((a, b) => b.date.localeCompare(a.date));

    const eventDates = EVENTS.map(e => e.date);

    // Determine target event: either from query param or nearest upcoming
    let initialSpotlightEvent = upcomingEvents[0] ?? null;
    if (targetId !== null) {
        const found = EVENTS.find(e => e.id === targetId);
        if (found) initialSpotlightEvent = found;
    }

    // Compute countdown
    const daysRemaining = initialSpotlightEvent
        ? Math.ceil((new Date(initialSpotlightEvent.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        : null;

    return (
        <main className="min-h-screen">
            <ScrollRestoration />
            <EventsPageClient
                upcomingEvents={upcomingEvents}
                pastEvents={pastEvents}
                eventDates={eventDates}
                initialSpotlightEvent={initialSpotlightEvent}
                initialDaysRemaining={daysRemaining}
            />
        </main>
    );
}
