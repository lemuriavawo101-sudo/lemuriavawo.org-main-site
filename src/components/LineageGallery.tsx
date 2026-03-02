'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { GURUS as gurus } from '@/lib/constants';

const GuruPortrait = ({
    image,
    name,
    role,
    bio,
    index,
    scrollYProgress
}: {
    image: string,
    name: string,
    role: string,
    bio: string,
    index: number,
    scrollYProgress: any
}) => {
    // Symmetrical float speeds: Left and Right align, Middle is offset for depth
    const floatSpeed = [120, 220, 120][index % 3];
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, -floatSpeed]);
    const smoothY = useSpring(yTransform, { damping: 25, stiffness: 100 });

    return (
        <motion.div
            style={{ y: smoothY }}
            className="flex flex-col items-center gap-8 relative group"
        >
            {/* The Portrait with Double Glow */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Outer Gold Glow */}
                <div className="absolute -inset-4 rounded-full border-[1px] border-ancient-amber/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute -inset-1 rounded-full border-[2px] border-ancient-amber/40 shadow-[0_0_30px_rgba(255,184,0,0.3)]" />

                {/* Inner Gold Tradition Ring */}
                <div className="absolute inset-2 rounded-full border-[3px] border-ancient-amber/80 z-20 shadow-[inset_0_0_20px_rgba(255,184,0,0.4)]" />

                {/* The Image */}
                <div className="absolute inset-4 rounded-full overflow-hidden z-10 bg-ivory-dark/20 p-1">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-1000 saturate-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal-deep/40 opacity-60" />
                    </div>
                </div>

                {/* Floating Light Particles around guru */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-8 border-[1px] border-dashed border-ancient-amber/10 rounded-full"
                />
            </div>

            {/* Content box - Glassmorphism */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="glass-card p-6 md:p-8 max-w-xs text-center border-white/40 shadow-2xl relative z-30"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-ancient-amber mb-3 block">{role}</span>
                <h3 className="text-2xl font-black text-charcoal-deep uppercase tracking-tight mb-4">{name}</h3>
                <p className="text-xs text-charcoal-deep/70 italic leading-relaxed font-medium">
                    "{bio}"
                </p>
            </motion.div>
        </motion.div>
    );
};

export default function LineageGallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });



    return (
        <section
            ref={sectionRef}
            className="relative py-32 md:py-48 bg-ivory-light overflow-hidden"
        >
            {/* Cinematic Background - Misty Temple/Mountain feel */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/mallakhamb_bg.png"
                    alt="Ancestral Heritage"
                    fill
                    className="object-cover opacity-60 scale-110 blur-[2px]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-ivory-light via-ivory-light/40 to-ivory-light opacity-90" />
            </div>

            <div className="container mx-auto px-8 md:px-16 relative z-10 text-center mb-20 md:mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <span className="text-ancient-amber text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Legacy of the Immortals</span>
                    <h2 className="text-5xl md:text-8xl font-black text-charcoal-deep uppercase tracking-tighter leading-none mb-6">
                        Guardians <br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px #1A1A1A' }}>of the Secret Art</span>
                    </h2>
                    <p className="text-charcoal-deep/60 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        A lineage stretching back thousands of years, passed down through masters of the Varma science. We transmit a legacy of discipline, healing, and silent power.
                    </p>
                </motion.div>
            </div>

            {/* Floating Gallery Container */}
            <div className="container mx-auto px-8 md:px-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-start">
                    {gurus.map((guru, index) => (
                        <GuruPortrait
                            key={guru.name}
                            {...guru}
                            index={index}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>

            {/* Foreground Mist Layer for Depth */}
            <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-ivory-light to-transparent z-30 pointer-events-none" />

            {/* Fine Cinematic Grain/Detail Overlay */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-40 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.03)_100%)]" />
        </section>
    );
}
