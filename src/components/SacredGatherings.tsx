'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { EVENTS } from '@/lib/constants';
import { EventData } from '@/types/event';
import Link from 'next/link';

function EventCard({ event, index }: { event: EventData; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const isEven = event.placement ? event.placement === 'left' : index % 2 === 0;

    return (
        <Link href={`/events?id=${event.id}`} className="block group">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 70 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} rounded-3xl overflow-hidden min-h-[340px] shadow-[0_20px_60px_rgba(139,115,85,0.12)] border border-[#E8DFD0]/80 transition-all duration-500 hover:shadow-[0_30px_80px_rgba(139,115,85,0.18)] hover:border-[#D4AF37]/30 w-[95%] mx-auto md:w-full my-2 md:my-0`}
            >
                {/* Image Side */}
                <div className="relative w-full md:w-[40%] h-56 md:h-auto overflow-hidden flex-shrink-0">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Light cinematic overlay — fades image edge into content side */}
                    <div className="absolute inset-0" style={{ background: isEven ? 'linear-gradient(to right, rgba(253,250,245,0.0), rgba(253,250,245,0.6))' : 'linear-gradient(to left, rgba(253,250,245,0.0), rgba(253,250,245,0.6))' }} />

                    {/* Large ghost event number */}
                    <span
                        className="absolute bottom-4 right-4 md:bottom-6 md:right-6 font-black opacity-10 select-none leading-none pointer-events-none"
                        style={{ fontSize: 'clamp(5rem, 12vw, 9rem)', color: event.color }}
                    >
                        {event.number}
                    </span>

                    {/* Floating Date Badge */}
                    <div
                        className={`absolute top-5 ${isEven ? 'left-5' : 'right-5'} z-10 w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-2xl border border-white/20`}
                        style={{ background: `linear-gradient(135deg, ${event.accent}, ${event.color})` }}
                    >
                        <span className="text-[#1A1200] font-black text-2xl leading-none">{event.day}</span>
                        <span className="text-[#1A1200]/80 font-bold text-[9px] tracking-[0.2em] uppercase leading-none mt-0.5">{event.month}</span>
                    </div>
                </div>

                {/* Content Side */}
                <div
                    className="relative flex-grow flex flex-col justify-between p-6 md:p-8"
                    style={{ background: 'linear-gradient(135deg, #FDFAF5 0%, #F7F0E3 60%, #FDFAF5 100%)' }}
                >
                    {/* Top accent line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-px opacity-40"
                        style={{ background: `linear-gradient(90deg, transparent, ${event.color}, transparent)` }}
                    />

                    {/* Content */}
                    <div>
                        {/* Type badge */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-8" style={{ background: event.color }} />
                            <span
                                className="text-[9px] font-black uppercase tracking-[0.35em]"
                                style={{ color: event.color }}
                            >
                                {event.type}
                            </span>
                            <span className="text-[#3A2F2B]/30 text-[9px]">/</span>
                            <span className="text-[#3A2F2B]/40 text-[9px] font-bold uppercase tracking-widest">{event.tag}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-[#2A2015] text-2xl md:text-3xl leading-tight mb-1.5">
                            {event.title}
                        </h3>
                        <p className="text-[12px] font-medium mb-4" style={{ color: event.color }}>{event.subtitle}</p>

                        {/* Description */}
                        <p className="text-[#5A4A38]/70 text-sm leading-relaxed max-w-sm">{event.description}</p>
                    </div>

                    {/* Footer */}
                    <div>
                        {/* Divider */}
                        <div className="my-4 border-t border-[#8B7355]/15" />

                        {/* Info grid */}
                        <div className="flex flex-col gap-2 mb-6">
                            <div className="flex items-center gap-2.5">
                                <svg className="w-3.5 h-3.5 shrink-0 opacity-50" style={{ color: event.color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                                <span className="text-[#5A4A38]/60 text-[11px] font-medium tracking-wide">{event.location}</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-50" style={{ color: event.color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                <span className="text-[#5A4A38]/60 text-[11px] font-medium tracking-wide leading-snug">{event.focus}</span>
                            </div>
                        </div>

                        {/* Register CTA (Visual Only) */}
                        <div className="flex items-center gap-4">
                            <div
                                className="register-cta-btn relative px-7 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.3em] border transition-all duration-400 overflow-hidden"
                                style={{ color: event.color, borderColor: `${event.color}50` }}
                            >
                                <span className="relative z-10">Register Now</span>
                                <span className="register-cta-fill absolute inset-0 opacity-0 transition-opacity duration-400" style={{ background: `linear-gradient(135deg, ${event.color}, ${event.accent})` }} />
                            </div>
                            <span className="text-[#8B7355]/40 text-[10px] font-bold uppercase tracking-widest">{event.year}</span>
                        </div>
                    </div>

                    {/* Corner accent */}
                    <div
                        className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-5 pointer-events-none"
                        style={{ background: event.color }}
                    />
                </div>
            </motion.div>
        </Link>
    );
}

export default function SacredGatherings() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-28 md:py-36 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #FDFAF5 0%, #F5EDD8 50%, #FDFAF5 100%)' }}
        >
            {/* Parallax golden orb */}
            <motion.div
                style={{ y: bgY }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
                aria-hidden
            >
                <div className="w-full h-full rounded-full bg-[#D4AF37]/8 blur-[160px]" />
            </motion.div>

            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,115,85,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(139,115,85,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            <div className="relative container mx-auto px-8 md:px-16">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12 md:mb-16"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px w-12 bg-[#D4AF37]/60" />
                        <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.45em] opacity-80">
                            Sacred Gatherings &amp; Workshops
                        </p>
                    </div>
                    <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#2A2015] leading-[0.95] mb-6">
                        Experience<br />
                        <span style={{ WebkitTextStroke: '1.5px #B8860B', color: 'transparent' }}>
                            the Transmission
                        </span>
                    </h2>
                    <p className="text-[#5A4A38]/60 text-sm md:text-base font-medium tracking-wide max-w-sm leading-relaxed">
                        Join our upcoming physical and virtual immersions to deepen your practice.
                    </p>
                </motion.div>

                {/* Cards — only upcoming events on the homepage */}
                <div className="flex flex-col gap-8 md:gap-12 scroll-snap-container md:scroll-snap-none scroll-snap-y-mandatory overflow-y-auto md:overflow-visible max-h-[85vh] md:max-h-none pb-10 md:pb-0 px-5 md:px-0">
                    {EVENTS.map((event, i) => (
                        <div key={event.id} className="scroll-snap-align-start">
                            <EventCard event={event} index={i} />
                        </div>
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
