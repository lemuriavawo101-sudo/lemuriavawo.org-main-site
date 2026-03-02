'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';

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
    placement: string;
}

interface EventMemoriesProps {
    pastEvents: EventData[];
}

function MemoryCard({ event, index }: { event: any; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const isEven = event.placement ? event.placement === 'left' : index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-3xl overflow-hidden scroll-snap-item shadow-[0_15px_40px_rgba(139,115,85,0.06),inset_0_-2px_10px_rgba(139,115,85,0.04)] border border-[#E8DFD0]/60 w-[95%] mx-auto md:w-full my-2 md:my-0"
            style={{
                scrollSnapAlign: 'start',
                background: 'var(--card-bg-mobile, linear-gradient(135deg, rgba(232,223,208,0.45) 0%, rgba(247,240,227,0.35) 50%, rgba(232,223,208,0.45) 100%))',
            }}
        >
            <style jsx>{`
                @media (max-width: 768px) {
                    div {
                        --card-bg-mobile: rgba(242, 238, 233, 0.95);
                    }
                }
                @media (min-width: 769px) {
                    div {
                        backdrop-filter: blur(16px);
                    }
                }
            `}</style>
            {/* Recessed effect — inner shadow */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ boxShadow: 'inset 0 4px 16px rgba(139,115,85,0.06)' }} />

            <div className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Image section with desaturation */}
                <div className="relative w-full md:w-[35%] min-h-[200px] md:min-h-[280px] overflow-hidden">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                        style={{ filter: 'saturate(0.5) brightness(0.95)' }}
                    />
                    {/* Weathered overlay */}
                    <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(135deg, rgba(247,240,227,0.4), rgba(247,240,227,0.7))' }} />

                    {/* Date badge — muted */}
                    <div className="absolute top-6 left-6">
                        <div className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center border border-[#8B7355]/10 shadow-sm bg-[#E8DFD0]/95 md:bg-[#E8DFD0]/80 md:backdrop-blur-[8px] backdrop-blur-none">
                            <span className="text-[#5A4A38]/60 font-black text-xl leading-none">{event.day}</span>
                            <span className="text-[#5A4A38]/40 font-bold text-[8px] tracking-[0.2em] uppercase mt-0.5">{event.month}</span>
                        </div>
                    </div>

                    {/* "Completed" stamp */}
                    <div className="absolute bottom-4 right-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8B7355]/12 md:backdrop-blur-[4px] backdrop-blur-none"
                            style={{ border: '1px solid rgba(139,115,85,0.1)' }}>
                            <Clock size={10} className="text-[#8B7355]/60" />
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#8B7355]/60">Completed</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between px-5">
                    <div>
                        {/* Type */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-6 bg-[#8B7355]/25" />
                            <span className="text-[8px] font-black uppercase tracking-[0.35em] text-[#8B7355]/50">
                                {event.type}
                            </span>
                            <span className="text-[#8B7355]/20 text-[8px]">/</span>
                            <span className="text-[#8B7355]/30 text-[8px] font-bold uppercase tracking-widest">{event.year}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-xl md:text-2xl text-[#2A2015]/70 leading-tight mb-2 group-hover:text-[#2A2015] transition-colors duration-500">
                            {event.title}
                        </h3>
                        <p className="text-[11px] font-medium text-[#8B7355]/50 mb-4">{event.subtitle}</p>

                        {/* Wisdom Summary */}
                        {event.wisdomSummary && (
                            <div className="relative pl-4 mb-4 border-l-2 border-[#D4AF37]/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <BookOpen size={12} className="text-[#D4AF37]/50" />
                                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#D4AF37]/60">Wisdom Summary</span>
                                </div>
                                <p className="text-[#5A4A38]/50 text-[12px] leading-relaxed">
                                    {event.wisdomSummary}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-4 mt-4">
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.25em] border border-[#8B7355]/15 text-[#8B7355]/50 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-all duration-500 hover:shadow-[0_4px_20px_rgba(212,175,55,0.1)]">
                            <BookOpen size={11} />
                            View Highlights
                        </button>
                        <motion.div
                            whileHover={{ x: 4 }}
                            className="w-8 h-8 rounded-full flex items-center justify-center border border-[#8B7355]/10 text-[#8B7355]/30 cursor-pointer hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-all"
                        >
                            <ArrowRight size={12} />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function EventMemories({ pastEvents }: EventMemoriesProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

    if (pastEvents.length === 0) return null;

    return (
        <section ref={sectionRef} className="relative w-full py-20 md:py-28 overflow-hidden">
            {/* Parallax sand layer */}
            <motion.div
                style={{ y: bgY }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                aria-hidden
            >
                <div className="w-full h-full rounded-full bg-[#8B7355]/5 blur-[120px]" />
            </motion.div>

            <div className="relative container mx-auto px-8 md:px-16">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12 px-5"
                >
                    <div className="flex items-center gap-4 mb-5">
                        <div className="h-px w-12 bg-[#8B7355]/30" />
                        <p className="text-[#8B7355]/60 text-[10px] font-black uppercase tracking-[0.45em]">
                            Repository of Memories
                        </p>
                    </div>
                    <h2 className="font-serif text-4xl md:text-6xl text-[#2A2015]/70 leading-[0.95] mb-4">
                        Past<br />
                        <span className="text-[#2A2015]/30" style={{ WebkitTextStroke: '1px #8B7355', color: 'transparent' }}>
                            Gatherings
                        </span>
                    </h2>
                    <p className="text-[#5A4A38]/40 text-sm font-medium tracking-wide max-w-md">
                        Echoes of wisdom from completed sessions. Revisit the highlights and teachings.
                    </p>
                </motion.div>

                {/* Memory Cards */}
                <div className="flex flex-col gap-8 scroll-snap-container md:scroll-snap-none overflow-y-auto md:overflow-visible max-h-[85vh] md:max-h-none pb-10 md:pb-0 px-5 md:px-0">
                    <style jsx>{`
                        @media (max-width: 768px) {
                            .scroll-snap-container {
                                scroll-snap-type: y mandatory;
                                -webkit-overflow-scrolling: touch;
                            }
                        }
                    `}</style>
                    {pastEvents.map((event, i) => (
                        <MemoryCard key={event.id} event={event} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
