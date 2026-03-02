'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

interface EventSpotlightProps {
    event: EventData | null;
    daysRemaining: number | null;
    isRegistering: boolean;
    onRegisterChange: (value: boolean) => void;
}

export default function EventSpotlight({
    event,
    daysRemaining,
    isRegistering,
    onRegisterChange
}: EventSpotlightProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [showActions, setShowActions] = useState(false);

    // Reset cinematic sequence when event changes
    useEffect(() => {
        setShowActions(false);
        const timer = setTimeout(() => setShowActions(true), 1800);
        return () => clearTimeout(timer);
    }, [event?.id]);

    if (!event) {
        return (
            <section ref={sectionRef} className="relative w-full py-16 md:py-24">
                <div className="container mx-auto px-8 md:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-24 text-center"
                    >
                        <Calendar size={48} className="text-[#D4AF37]/30 mb-6" />
                        <p className="text-[#5A4A38]/40 text-sm font-medium">Select a date with an event on the dial above</p>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="relative w-full py-12 md:py-20 overflow-hidden">
            {/* Cinematic Background HUD Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-[#D4AF37]" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-[#D4AF37]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#D4AF37] rounded-full" />
            </div>

            <div className="container mx-auto px-8 md:px-16">
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <div className="h-px w-8 bg-[#D4AF37]/40" />
                    <p className="text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.4em]">Cinematic Spotlight</p>
                    <div className="h-px flex-1 bg-[#E8DFD0]/40" />
                </motion.div>

                {/* Cinematic Hero Header (Selected Event Title) */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`hero-${event.id}`}
                        initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-12 text-center"
                    >
                        <motion.span
                            initial={{ opacity: 0, letterSpacing: '1em' }}
                            animate={{ opacity: 0.4, letterSpacing: '0.6em' }}
                            className="text-[10px] font-black uppercase text-[#D4AF37] block mb-4"
                        >
                            {event.type} • {event.tag}
                        </motion.span>
                        <h2 className="font-serif text-5xl md:text-8xl text-[#2A2015] leading-[0.85] tracking-tight">
                            {event.title.split(' ').map((word: string, i: number) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                                    className="inline-block mr-4 last:mr-0"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h2>
                    </motion.div>
                </AnimatePresence>

                {/* Spotlight Card Presentation - Wrapped in a decorative frame */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isRegistering ? `register-${event.id}` : event.id}
                        initial={{ opacity: 0, y: 60, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 0.98 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                        className="relative p-6 md:p-10"
                    >
                        {/* THE ORNATE GOLDEN FRAME */}
                        <div className="absolute inset-x-0 inset-y-0 pointer-events-none z-0">
                            {/* Main Frame Body with 3D Beveling */}
                            <div className="absolute inset-0 rounded-[2rem] border-[12px] border-[#D4AF37]"
                                style={{
                                    borderImage: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C) 1',
                                    boxShadow: `
                                        0 0 0 2px rgba(184, 134, 11, 0.5),
                                        inset 0 0 15px rgba(0,0,0,0.4),
                                        0 20px 50px rgba(0,0,0,0.3)
                                    `
                                }}
                            />

                            {/* Inner Recessed Shadow */}
                            <div className="absolute inset-[12px] shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)] rounded-lg pointer-events-none z-10" />

                            {/* Ornate Corner Carvings (Acanthus Leaves) */}
                            {[
                                { pos: 'top-[-10px] left-[-10px]', rotate: 0 },
                                { pos: 'top-[-10px] right-[-10px]', rotate: 90 },
                                { pos: 'bottom-[-10px] right-[-10px]', rotate: 180 },
                                { pos: 'bottom-[-10px] left-[-10px]', rotate: 270 }
                            ].map((corner, i) => (
                                <div key={i} className={`absolute ${corner.pos} w-24 h-24 z-20`} style={{ transform: `rotate(${corner.rotate}deg)` }}>
                                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                                        <defs>
                                            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#BF953F" />
                                                <stop offset="50%" stopColor="#FCF6BA" />
                                                <stop offset="100%" stopColor="#AA771C" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M10,10 Q30,0 50,10 Q70,20 90,10 Q80,40 90,70 Q70,60 50,70 Q30,80 10,70 Q20,40 10,10 Z" fill="url(#goldGrad)" />
                                        <path d="M25,25 Q40,15 55,25 Q70,35 85,25 Q75,50 85,75 Q70,65 55,75 Q40,85 25,75 Q35,50 25,25 Z" fill="rgba(0,0,0,0.1)" />
                                        <circle cx="50" cy="50" r="5" fill="#FCF6BA" opacity="0.8" />
                                    </svg>
                                </div>
                            ))}

                            {/* Edge Medallion Ornaments */}
                            <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-28 h-12 z-20">
                                <svg viewBox="0 0 100 40" className="w-full h-full drop-shadow-md">
                                    <path d="M0,20 Q20,0 50,0 Q80,0 100,20 Q80,40 50,40 Q20,40 0,20" fill="url(#goldGrad)" />
                                    <circle cx="50" cy="20" r="8" fill="#FCF6BA" />
                                </svg>
                            </div>
                            <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-28 h-12 z-20">
                                <svg viewBox="0 0 100 40" className="w-full h-full drop-shadow-md" style={{ transform: 'rotate(180deg)' }}>
                                    <path d="M0,20 Q20,0 50,0 Q80,0 100,20 Q80,40 50,40 Q20,40 0,20" fill="url(#goldGrad)" />
                                    <circle cx="50" cy="20" r="8" fill="#FCF6BA" />
                                </svg>
                            </div>
                            <div className="absolute left-[-15px] top-1/2 -translate-y-1/2 h-28 w-12 z-20">
                                <svg viewBox="0 0 40 100" className="w-full h-full drop-shadow-md">
                                    <path d="M20,0 Q0,20 0,50 Q0,80 20,100 Q40,80 40,50 Q40,20 20,0" fill="url(#goldGrad)" />
                                    <circle cx="20" cy="50" r="8" fill="#FCF6BA" />
                                </svg>
                            </div>
                            <div className="absolute right-[-15px] top-1/2 -translate-y-1/2 h-28 w-12 z-20">
                                <svg viewBox="0 0 40 100" className="w-full h-full drop-shadow-md" style={{ transform: 'rotate(180deg)' }}>
                                    <path d="M20,0 Q0,20 0,50 Q0,80 20,100 Q40,80 40,50 Q40,20 20,0" fill="url(#goldGrad)" />
                                    <circle cx="20" cy="50" r="8" fill="#FCF6BA" />
                                </svg>
                            </div>

                            {/* Dynamic Shine Animation */}
                            <motion.div
                                animate={{ left: ['-100%', '200%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] pointer-events-none z-30"
                            />
                        </div>

                        {/* The Actual Olai-Suvadi Card */}
                        <div
                            className="olai-suvadi-card relative overflow-hidden z-10"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(247,240,227,0.7) 50%, rgba(255,255,255,0.85) 100%)',
                                backdropFilter: 'blur(40px)',
                                WebkitBackdropFilter: 'blur(40px)',
                                border: '1.5px solid rgba(255,255,255,0.8)',
                                borderRadius: isRegistering ? '3.5rem' : '3rem 7rem 3rem 7rem',
                                boxShadow: `0 50px 120px rgba(139,115,85,0.2), 0 15px 50px rgba(0,0,0,0.08), inset 0 1px 2px rgba(255,255,255,0.9)`,
                            }}
                        >
                            {/* Top accent gradient */}
                            <div className="absolute top-0 left-0 right-0 h-1"
                                style={{ background: `linear-gradient(90deg, transparent, ${event.color}40, transparent)` }} />

                            {/* Content grid */}
                            <div className="relative flex flex-col lg:flex-row min-h-[400px]">
                                {/* Left: Image area - hidden or transformed in registration mode */}
                                <AnimatePresence>
                                    {!isRegistering && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.8 }}
                                            className="relative w-full lg:w-[45%] min-h-[250px] lg:min-h-[400px] overflow-hidden"
                                            style={{ borderRadius: '2.5rem 4rem 0 4rem' }}
                                        >
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                                            />
                                            {/* Overlay gradient */}
                                            <div className="absolute inset-0"
                                                style={{ background: `linear-gradient(135deg, rgba(253,250,245,0.1), rgba(253,250,245,0.7))` }} />

                                            {/* Floating date badge */}
                                            <div className="absolute top-8 left-8 z-10">
                                                <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-2xl border border-white/30"
                                                    style={{ background: `linear-gradient(135deg, ${event.accent}, ${event.color})` }}>
                                                    <span className="text-[#1A1200] font-black text-3xl leading-none">{event.day}</span>
                                                    <span className="text-[#1A1200]/80 font-bold text-[10px] tracking-[0.2em] uppercase mt-0.5">{event.month}</span>
                                                </div>
                                            </div>

                                            {/* Ghost number */}
                                            <motion.span
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 0.06, scale: 1 }}
                                                transition={{ delay: 0.8, duration: 1.5 }}
                                                className="absolute bottom-4 right-8 font-black select-none pointer-events-none"
                                                style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', color: event.color }}>
                                                {event.number}
                                            </motion.span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Right: Info */}
                                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between">
                                    <div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1 }}
                                        >
                                            <p className="text-[13px] font-medium mb-6 uppercase tracking-[0.2em]" style={{ color: event.color }}>
                                                {event.subtitle}
                                            </p>

                                            {/* Focus */}
                                            <p className="text-[#5A4A38]/70 text-sm leading-relaxed mb-6 max-w-md">
                                                {event.focus}
                                            </p>

                                            {/* Description */}
                                            <p className="text-[#5A4A38]/50 text-[13px] leading-relaxed max-w-md">
                                                {event.description}
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-8">
                                        <div className="border-t border-[#8B7355]/10 pt-6 mb-6" />

                                        {/* Info items */}
                                        <div className="flex flex-col gap-2 mb-8">
                                            <div className="flex items-center gap-2.5">
                                                <MapPin size={14} className="opacity-40" style={{ color: event.color }} />
                                                <span className="text-[#5A4A38]/60 text-[11px] font-medium tracking-wide">{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <Star size={14} className="opacity-40" style={{ color: event.color }} />
                                                <span className="text-[#5A4A38]/60 text-[11px] font-medium tracking-wide">{event.focus.split('.')[0]}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <AnimatePresence>
                                            {showActions && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                                    className="flex flex-wrap items-center gap-4"
                                                >
                                                    <button
                                                        onClick={() => onRegisterChange(true)}
                                                        className="group relative px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95"
                                                        style={{
                                                            background: `linear-gradient(135deg, ${event.color}, ${event.accent})`,
                                                            color: '#0D0B08',
                                                            boxShadow: `0 12px 40px ${event.color}40`,
                                                        }}
                                                    >
                                                        <span className="relative z-10 flex items-center gap-2">
                                                            Register Now <ArrowRight size={14} />
                                                        </span>
                                                    </button>

                                                    {daysRemaining !== null && daysRemaining > 0 && (
                                                        <span className="text-[#8B7355]/40 text-[10px] font-bold uppercase tracking-widest">
                                                            {daysRemaining} days away
                                                        </span>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
