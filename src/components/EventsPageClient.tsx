'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EVENTS } from '@/lib/constants';
import ChronosDial from '@/components/ChronosDial';
import EventSpotlight from '@/components/EventSpotlight';
import UpcomingEventsList from '@/components/UpcomingEventsList';
import EventMemories from '@/components/EventMemories';
import EventRegistrationForm from '@/components/EventRegistrationForm';

type EventType = typeof EVENTS[number];

interface EventsPageClientProps {
    upcomingEvents: EventType[];
    pastEvents: EventType[];
    eventDates: string[];
    initialSpotlightEvent: EventType | null;
    initialDaysRemaining: number | null;
}

// Bokeh particles for the background
function BokehParticles() {
    const [particles, setParticles] = useState<Array<{
        id: number; size: number; left: number; top: number;
        delay: number; duration: number; opacity: number;
    }>>([]);

    useEffect(() => {
        setParticles([...Array(25)].map((_, i) => ({
            id: i,
            size: Math.random() * 60 + 20,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 8,
            duration: 12 + Math.random() * 18,
            opacity: Math.random() * 0.04 + 0.01,
        })));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        background: 'radial-gradient(circle, rgba(212,175,55,0.15), transparent 70%)',
                        opacity: p.opacity,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

export default function EventsPageClient({
    upcomingEvents,
    pastEvents,
    eventDates,
    initialSpotlightEvent,
    initialDaysRemaining,
}: EventsPageClientProps) {
    // Client-side state: only for interactive selection
    const [selectedDate, setSelectedDate] = useState<string | null>(
        initialSpotlightEvent?.date ?? null
    );
    const [spotlightEvent, setSpotlightEvent] = useState<EventType | null>(
        initialSpotlightEvent
    );
    const [daysRemaining, setDaysRemaining] = useState<number | null>(
        initialDaysRemaining
    );
    const [isRegistering, setIsRegistering] = useState(false);
    const [registrationEvent, setRegistrationEvent] = useState<EventType | null>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    const openRegistration = (event: EventType) => {
        setRegistrationEvent(event);
        setIsRegistering(true);
    };

    const closeRegistration = () => {
        setIsRegistering(false);
        setTimeout(() => setRegistrationEvent(null), 400);
    };

    // Shared logic to select an event for spotlight
    const selectEvent = (event: EventType) => {
        setSelectedDate(event.date);
        setSpotlightEvent(event);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const diff = Math.ceil(
            (new Date(event.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );
        setDaysRemaining(diff > 0 ? diff : null);

        // Scroll to spotlight
        setTimeout(() => {
            spotlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    };

    // Handle initial scroll if an event was pre-selected (e.g. via homepage link)
    useEffect(() => {
        if (initialSpotlightEvent && spotlightRef.current) {
            const timer = setTimeout(() => {
                spotlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 800); // Wait for cinematic entrance animations to start
            return () => clearTimeout(timer);
        }
    }, [initialSpotlightEvent]);

    // Handle date selection from dial
    const handleDateSelect = (dateStr: string) => {
        const allEvents = [...upcomingEvents, ...pastEvents];
        const matchedEvent = allEvents.find(e => e.date === dateStr);
        if (matchedEvent) {
            selectEvent(matchedEvent);
        } else {
            setSelectedDate(dateStr);
            setSpotlightEvent(null);
        }
    };

    // Parallax mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 60 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 60 });

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <div
            className="relative min-h-screen overflow-hidden"
            onMouseMove={handleMouseMove}
            style={{
                background: 'linear-gradient(180deg, #FAF9F6 0%, #F5EDD8 20%, #F9F5ED 50%, #F5EDD8 80%, #FAF9F6 100%)',
            }}
        >
            {/* Dynamic light follower */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-[1]"
                style={{
                    background: useTransform(
                        [smoothX, smoothY],
                        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(212, 175, 55, 0.04), transparent 60%)`
                    ),
                }}
            />

            {/* Bokeh particles */}
            <BokehParticles />

            {/* Sand dune texture overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px',
                }}
            />

            {/* Subtle grid */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(139,115,85,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,115,85,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

            {/* Main content */}
            <div className="relative z-10">
                {/* Section 1: Chronos Dial */}
                <ChronosDial
                    onDateSelect={handleDateSelect}
                    selectedDate={selectedDate}
                    eventDates={eventDates}
                />

                {/* Divider */}
                <div className="container mx-auto px-8 md:px-16">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
                </div>

                {/* Section 2: Event Spotlight */}
                <div ref={spotlightRef}>
                    <EventSpotlight
                        event={spotlightEvent}
                        daysRemaining={daysRemaining}
                        isRegistering={isRegistering}
                        onRegisterChange={(val) => {
                            if (val && spotlightEvent) openRegistration(spotlightEvent);
                            else closeRegistration();
                        }}
                    />

                    {/* Divider */}
                    <div className="container mx-auto px-8 md:px-16">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
                    </div>

                    {/* Section 3: All Upcoming Events */}
                    <UpcomingEventsList
                        events={upcomingEvents}
                        onEventSelect={selectEvent}
                        onEventRegister={(event) => selectEvent(event)}
                        selectedEventId={spotlightEvent?.id ?? null}
                    />

                    {/* Divider */}
                    <div className="container mx-auto px-8 md:px-16">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#8B7355]/15 to-transparent" />
                    </div>

                    {/* Section 4: Repository of Memories */}
                    <EventMemories pastEvents={pastEvents} />
                </div>

                {/* Registration Modal */}
                <AnimatePresence>
                    {isRegistering && registrationEvent && (
                        <motion.div
                            key="registration-modal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                            onClick={(e) => { if (e.target === e.currentTarget) closeRegistration(); }}
                            style={{ background: 'rgba(13, 11, 8, 0.75)', backdropFilter: 'blur(8px)' }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.92, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-8 md:p-10"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(247,240,227,0.95) 100%)',
                                    boxShadow: '0 60px 120px rgba(0,0,0,0.4), 0 20px 50px rgba(139,115,85,0.2)',
                                    border: '1.5px solid rgba(212,175,55,0.3)',
                                }}
                            >
                                <EventRegistrationForm
                                    eventTitle={registrationEvent.title}
                                    eventColor={registrationEvent.color}
                                    eventAccent={registrationEvent.accent}
                                    onClose={closeRegistration}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom fade */}
                <div className="fixed bottom-0 left-0 right-0 h-24 pointer-events-none z-[5]"
                    style={{ background: 'linear-gradient(to top, #FAF9F6, transparent)' }} />
            </div>
        </div>
    );
}
