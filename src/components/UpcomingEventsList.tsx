'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Star, Calendar, ArrowRight } from 'lucide-react';

interface EventData {
    id: number;
    day: string;
    month: string;
    year: string;
    date: string;
    type: string;
    title: string;
    subtitle: string;
    location: string;
    focus: string;
    description: string;
    wisdomSummary: string;
    tag: string;
    color: string;
    accent: string;
    image: string;
    number: string;
}

interface UpcomingEventsListProps {
    events: EventData[];
    onEventSelect: (event: EventData) => void;
    onEventRegister: (event: EventData) => void;
    selectedEventId: number | null;
}

function UpcomingEventCard({ event, index, isSelected, onSelect, onRegister }: {
    event: any; index: number; isSelected: boolean; onSelect: () => void; onRegister: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const isEven = event.placement ? event.placement === 'left' : index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            onClick={onSelect}
            className={`group/card relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} rounded-3xl overflow-hidden min-h-[320px] cursor-pointer transition-all duration-700 hover:scale-[1.01] ${isSelected
                ? 'shadow-[0_25px_70px_rgba(212,175,55,0.15)] border-[#D4AF37]/30'
                : 'shadow-[0_20px_60px_rgba(139,115,85,0.1)] border-[#E8DFD0]/80 hover:shadow-[0_25px_70px_rgba(139,115,85,0.15)]'
                }`}
            style={{ border: `1px solid ${isSelected ? 'rgba(212,175,55,0.3)' : 'rgba(232,223,208,0.8)'}` }}
        >
            {/* Image Side */}
            <div className="relative w-full md:w-[40%] h-52 md:h-auto overflow-hidden flex-shrink-0">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0"
                    style={{
                        background: isEven
                            ? 'linear-gradient(to right, rgba(253,250,245,0.0), rgba(253,250,245,0.6))'
                            : 'linear-gradient(to left, rgba(253,250,245,0.0), rgba(253,250,245,0.6))'
                    }} />

                {/* Ghost number */}
                <span className="absolute bottom-4 right-4 md:bottom-6 md:right-6 font-black opacity-10 select-none pointer-events-none leading-none"
                    style={{ fontSize: 'clamp(5rem, 12vw, 9rem)', color: event.color }}>
                    {event.number}
                </span>

                {/* Date badge */}
                <div className={`absolute top-5 ${isEven ? 'left-5' : 'right-5'} z-10 w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-2xl border border-white/20`}
                    style={{ background: `linear-gradient(135deg, ${event.accent}, ${event.color})` }}>
                    <span className="text-[#1A1200] font-black text-2xl leading-none">{event.day}</span>
                    <span className="text-[#1A1200]/80 font-bold text-[9px] tracking-[0.2em] uppercase leading-none mt-0.5">{event.month}</span>
                </div>

                {/* Selected indicator */}
                {isSelected && (
                    <div className="absolute top-5 right-5 z-10">
                        <div className="w-3 h-3 rounded-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.6)] animate-pulse" />
                    </div>
                )}
            </div>

            {/* Content Side */}
            <div className="relative flex-grow flex flex-col justify-between p-6 md:p-8"
                style={{ background: 'linear-gradient(135deg, #FDFAF5 0%, #F7F0E3 60%, #FDFAF5 100%)' }}>

                <div className="absolute top-0 left-0 right-0 h-px opacity-40"
                    style={{ background: `linear-gradient(90deg, transparent, ${event.color}, transparent)` }} />

                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-8" style={{ background: event.color }} />
                        <span className="text-[9px] font-black uppercase tracking-[0.35em]" style={{ color: event.color }}>
                            {event.type}
                        </span>
                        <span className="text-[#3A2F2B]/30 text-[9px]">/</span>
                        <span className="text-[#3A2F2B]/40 text-[9px] font-bold uppercase tracking-widest">{event.tag}</span>
                    </div>

                    <h3 className="font-serif text-[#2A2015] text-2xl md:text-3xl leading-tight mb-1.5">
                        {event.title}
                    </h3>
                    <p className="text-[12px] font-medium mb-4" style={{ color: event.color }}>{event.subtitle}</p>
                    <p className="text-[#5A4A38]/70 text-sm leading-relaxed max-w-sm">{event.description}</p>
                </div>

                <div>
                    <div className="my-4 border-t border-[#8B7355]/15" />

                    <div className="flex flex-col gap-2 mb-5">
                        <div className="flex items-center gap-2.5">
                            <MapPin size={14} className="opacity-40" style={{ color: event.color }} />
                            <span className="text-[#5A4A38]/60 text-[11px] font-medium tracking-wide">{event.location}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                            <Star size={14} className="mt-0.5 opacity-40" style={{ color: event.color }} />
                            <span className="text-[#5A4A38]/60 text-[11px] font-medium tracking-wide leading-snug">{event.focus}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div
                            className="register-cta-btn relative px-7 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.3em] border transition-all duration-400 overflow-hidden"
                            style={{ color: event.color, borderColor: `${event.color}50` }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Enter Spotlight <ArrowRight size={14} />
                            </span>
                            <span className="register-cta-fill absolute inset-0 opacity-0 transition-opacity duration-400"
                                style={{ background: `linear-gradient(135deg, ${event.color}, ${event.accent})` }} />
                        </div>
                        <span className="text-[#8B7355]/40 text-[10px] font-bold uppercase tracking-widest">{event.year}</span>
                    </div>
                </div>

                <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-5 pointer-events-none"
                    style={{ background: event.color }} />
            </div>
        </motion.div>
    );
}

export default function UpcomingEventsList({ events, onEventSelect, onEventRegister, selectedEventId }: UpcomingEventsListProps) {
    if (events.length === 0) return null;

    return (
        <section className="relative w-full py-16 md:py-24 overflow-hidden">
            <div className="relative container mx-auto px-8 md:px-16">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-5">
                        <div className="h-px w-12 bg-[#D4AF37]/60" />
                        <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.45em] opacity-80">
                            Sacred Gatherings & Workshops
                        </p>
                    </div>
                    <h2 className="font-serif text-4xl md:text-6xl text-[#2A2015] leading-[0.95] mb-4">
                        Upcoming<br />
                        <span style={{ WebkitTextStroke: '1.5px #B8860B', color: 'transparent' }}>
                            Events
                        </span>
                    </h2>
                    <p className="text-[#5A4A38]/60 text-sm font-medium tracking-wide max-w-sm leading-relaxed">
                        Join our upcoming physical and virtual immersions to deepen your practice.
                    </p>
                </motion.div>

                {/* Event Cards */}
                <div className="flex flex-col gap-8 md:gap-10">
                    {events.map((event, i) => (
                        <UpcomingEventCard
                            key={event.id}
                            event={event}
                            index={i}
                            isSelected={selectedEventId === event.id}
                            onSelect={() => onEventSelect(event)}
                            onRegister={() => onEventRegister(event)}
                        />
                    ))}
                </div>
            </div>

            <style>{`
                .register-cta-btn:hover .register-cta-fill { opacity: 1; }
                .register-cta-btn:hover { color: #0D0B08; border-color: transparent; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(212,175,55,0.4); }
            `}</style>
        </section>
    );
}
