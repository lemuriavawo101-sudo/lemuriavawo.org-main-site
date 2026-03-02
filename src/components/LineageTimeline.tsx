'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';

const MILESTONES = [
    {
        title: "The Vision of the Siddhars",
        period: "Origin",
        content: "Deep in the Tamil landscape, thousands of years ago, the Siddhars (ancient mystics) meticulously mapped the human body's energy nodes (the 108 points). This profound science was first documented on sacred palm leaves.",
        side: "right",
        icon: "/assets/pillar_wisdom.png" // Using Wisdom icon for ancient roots
    },
    {
        title: "The Oral Transmission",
        period: "Preservation",
        content: "For centuries, the deepest secrets of Varmakalai were not written down for public consumption. This knowledge was transmitted orally and in direct practice, from Guru to Shishya (Student), ensuring the integrity of the art.",
        side: "left",
        icon: "/assets/pillar_stewardship.png" // Using Stewardship icon for transmission
    },
    {
        title: "The Modern Stewardship",
        period: "Today",
        content: "Today, we are proud stewards of this lineage. We respect the core traditions documented on the sacred leaves, but we apply this ancient wisdom to modern mobility, health, and ethical self-defense.",
        side: "right",
        isLotus: true // Special flag for SVG icon
    }
];

const LotusIcon = () => (
    <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#8B7355]/60 fill-none stroke-current stroke-[1.2]">
        {/* Petals */}
        <path d="M12 22c-2-4-6-6-6-10s4-8 6-8 6 4 6 8-4 6-6 10z" />
        <path d="M12 22c2-4 6-6 6-10s-4-8-6-8-6 4-6 8 4 6 6 10z" className="opacity-40" />
        <path d="M6 12c0 4 6 6 6 6s6-2 6-6-4-4-6-4-6 0-6 4z" className="opacity-30" />
        {/* Glowing Core */}
        <circle cx="12" cy="12" r="3" className="fill-[#D4AF37] animate-pulse shadow-[0_0_10px_#D4AF37]" />
        <circle cx="12" cy="12" r="1.5" className="fill-[#FBFAF5]" />
    </svg>
);

const OlaiSuvadiPanel = ({ milestone, index }: { milestone: typeof MILESTONES[0], index: number }) => {
    const isRight = milestone.side === "right";

    return (
        <div className={`relative flex items-center w-full mb-32 md:mb-40 ${isRight ? 'justify-end' : 'justify-start'}`}>
            {/* Binding Knot (Golden Sphere) */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-[#E6D5C3] to-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] z-30" />

            {/* Olai Suvadi Panel */}
            <motion.div
                initial={{ opacity: 0, x: isRight ? 100 : -100, rotateX: 20 }}
                whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className={`
                    relative w-[90%] md:w-[45%] h-auto min-h-[160px] 
                    bg-gradient-to-br from-[#FBFAF5]/60 to-[#F0E5D8]/70 
                    backdrop-blur-[40px] border border-white/40 
                    rounded-2xl p-10 md:p-12 shadow-2xl overflow-hidden
                    flex items-center gap-8
                    ${isRight ? 'md:mr-20 origin-right' : 'md:ml-20 origin-left'}
                `}
            >
                {/* Visual Icon */}
                <div className="shrink-0 w-20 h-20 relative opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                    {milestone.isLotus ? (
                        <LotusIcon />
                    ) : (
                        <Image
                            src={milestone.icon || ""}
                            alt={milestone.title}
                            fill
                            className="object-contain"
                        />
                    )}
                </div>

                {/* Content with Etched Bronze Effect */}
                <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#8B7355]/60 mb-1">{milestone.period}</span>
                    <h3
                        className="text-2xl md:text-3xl font-serif text-[#5A4A38] italic mb-3"
                        style={{ textShadow: '1px 1px 1px rgba(255,255,255,0.5)' }}
                    >
                        {milestone.title}
                    </h3>
                    <p className="text-sm text-[#8B7355] leading-relaxed font-sans font-medium line-clamp-4 md:line-clamp-none">
                        {milestone.content}
                    </p>
                </div>

                {/* Subtle leaf grain overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/assets/noise.png')] mix-blend-overlay" />
            </motion.div>
        </div>
    );
};

export default function LineageTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <section ref={containerRef} className="relative py-48 bg-[#F9F7F2] overflow-hidden">
            {/* Cinematic Background Detail: Faded Olai Suvadu */}
            <div className="absolute top-0 right-0 w-[600px] h-full opacity-[0.03] pointer-events-none select-none">
                <Image
                    src="/assets/pillar_wisdom.png"
                    alt="Olai Suvadu texture"
                    fill
                    className="object-contain object-right saturate-0"
                />
            </div>

            <div className="container mx-auto px-8 md:px-16 relative z-10">
                <div className="text-center mb-32">
                    <span className="text-[11px] font-black uppercase tracking-[0.6em] text-[#8B7355] mb-6 block">The Unbroken Transmission</span>
                    <h2 className="text-5xl md:text-8xl font-serif text-[#2A2015] italic mb-6">Preserving the Wisdom <br /><span className="text-4xl md:text-6xl not-italic">of the Siddhars</span></h2>
                    <p className="text-[#5A4A38]/60 text-base max-w-xl mx-auto font-medium tracking-tight">An ethereal lineage stretching back thousands of years, documented on sacred leaves and protected through generations.</p>
                </div>

                <div className="relative">
                    {/* The Silk Thread Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full bg-[#E6D5C3]/30">
                        <motion.div
                            style={{ scaleY: pathLength, originY: 0 }}
                            className="w-full h-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                        />
                    </div>

                    <div className="relative pt-20">
                        {MILESTONES.map((milestone, index) => (
                            <OlaiSuvadiPanel key={milestone.title} milestone={milestone} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Depth Gradients */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#F9F7F2] to-transparent pointer-events-none z-20" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#F9F7F2] to-transparent pointer-events-none z-20" />
        </section>
    );
}
