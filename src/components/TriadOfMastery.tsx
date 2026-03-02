'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Zap, Heart, Wind, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const CulturalModel = dynamic(() => import('./CulturalModel'), { ssr: false });

const MasteryCard = ({
    icon: Icon,
    title,
    subtitle,
    content,
    parallaxSpeed,
    scrollYProgress,
    accent,
    image,
    href
}: {
    icon: any,
    title: string,
    subtitle: string,
    content: string,
    parallaxSpeed: number,
    scrollYProgress: any,
    accent: string,
    image: string,
    href: string
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const { left, top } = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const y = useTransform(scrollYProgress, [0, 1], [0, parallaxSpeed]);
    const smoothY = useSpring(y, { damping: 20, stiffness: 100 });

    const spotlightBg = useTransform(
        [mouseX, mouseY],
        ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.4), transparent 80%)`
    );

    return (
        <motion.div
            style={{ y: smoothY }}
            onMouseMove={handleMouseMove}
            className="group relative h-full"
            ref={cardRef}
        >
            <div className="glass-card-transparent p-8 md:p-10 h-full flex flex-col gap-6 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(255,184,0,0.1)] border-ivory-dark/10 group-hover:border-ancient-amber/30 overflow-hidden">
                {/* Spotlight Overlay */}
                <motion.div
                    className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: spotlightBg }}
                />

                {/* Thematic Image with Overlaid Icon */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-2">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 saturate-[0.6] group-hover:saturate-100 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/60 via-transparent to-transparent opacity-40" />

                    {/* Icon Overlay */}
                    <div className="absolute top-4 left-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white relative z-10 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                            style={{ background: `linear-gradient(135deg, ${accent}, #1A1A1A)` }}
                        >
                            <Icon size={24} />
                        </div>
                        <div className="absolute -inset-2 blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
                            style={{ backgroundColor: accent }}
                        />
                    </div>
                </div>

                <div className="relative z-20">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-ancient-amber mb-2 block">{subtitle}</span>
                    <h3 className="text-xl md:text-2xl font-black text-charcoal-deep uppercase tracking-tight mb-4 leading-tight group-hover:text-ancient-amber transition-colors duration-500">{title}</h3>
                    <p className="text-sm text-charcoal-deep/60 leading-relaxed font-medium">
                        {content}
                    </p>
                </div>

                <Link href={href}>
                    <div className="mt-auto pt-4 flex items-center gap-3 text-charcoal-deep font-black text-[9px] uppercase tracking-widest cursor-pointer group/link relative z-20">
                        Explore Deeply
                        <ArrowRight size={12} className="group-hover/link:translate-x-2 transition-transform" />
                    </div>
                </Link>
            </div>
        </motion.div>
    );
};

const EnergyConnector = () => {
    return (
        <div className="absolute top-1/2 left-0 w-full h-px pointer-events-none z-0 hidden lg:block translate-y-32">
            <div className="relative h-full w-full">
                {/* The main faint line */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ancient-amber/30 to-transparent h-px" />

                {/* The pulse particle */}
                <motion.div
                    animate={{
                        left: ['0%', '100%'],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/2 -translate-y-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-ancient-amber to-transparent blur-sm shadow-[0_0_15px_rgba(255,184,0,0.8)]"
                />
            </div>
        </div>
    );
};

export default function TriadOfMastery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 80 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 80 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!sectionRef.current) return;
        const { left, top } = sectionRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const bgSpotlight = useTransform(
        [smoothX, smoothY],
        ([x, y]) => `radial-gradient(1000px circle at ${x}px ${y}px, black 0%, transparent 80%)`
    );

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative py-16 md:py-24 bg-ivory-light overflow-hidden"
        >
            {/* Dynamic Sun Ray Layer (Synced with Hero) */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 opacity-30"
                style={{
                    background: useTransform(
                        [smoothX, smoothY],
                        ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(255, 184, 0, 0.08), transparent 70%)`
                    )
                }}
            />

            {/* Background Cover Overlay - Spotlight Reveal Effect */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute inset-0"
                    style={{
                        WebkitMaskImage: bgSpotlight,
                        maskImage: bgSpotlight
                    }}
                >
                    <Image
                        src="/assets/hero_bg.png"
                        alt="Section Background Spotlight"
                        fill
                        className="object-cover opacity-60 brightness-75 contrast-125"
                    />
                </motion.div>

                {/* Global Ambient Depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-ivory-light via-ivory-light/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ivory-light" />

                {/* Subtle top taper for seamless blend */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-ivory-light to-transparent" />
            </div>

            <div className="container mx-auto px-8 md:px-16 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between mb-8 md:mb-16 gap-8 w-full">
                    {/* Section Header */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h2 className="text-5xl md:text-7xl font-black text-charcoal-deep uppercase tracking-tighter leading-[0.9] mb-4">
                                The Triad <br />
                                <span className="text-transparent" style={{ WebkitTextStroke: '2px #1A1A1A' }}>of Mastery</span>
                            </h2>
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <div className="w-12 h-1 bg-ancient-amber" />
                                <p className="text-base md:text-lg text-charcoal-deep/70 font-bold max-w-2xl leading-snug">
                                    Beyond Combat. A Path to Total Vitality. Varmakalai is not just a martial art; it is a complete science.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Spacer to maintain layout while model floats on desktop */}
                    <div className="w-full lg:w-1/2 h-[300px] lg:h-[450px] relative hidden lg:block" />
                </div>

                {/* Floating Lion Cultural Model Overlay - Now relative/stacking on mobile */}
                <div className="relative lg:absolute lg:inset-0 pointer-events-none flex items-center justify-center lg:justify-end z-20 overflow-visible px-4 md:px-16 container mx-auto mb-10 lg:mb-0 lg:-top-60">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="w-full lg:w-1/2 h-[350px] lg:h-[450px] pointer-events-auto"
                    >
                        <CulturalModel
                            modelUrl="/models/lion_crushing_a_serpent.glb"
                            scale={0.15}
                            rotation={[0, 0, 0]}
                            containerHeight="h-full"
                        />
                    </motion.div>
                </div>

                {/* Cards Grid */}
                <div className="relative grid md:grid-cols-3 gap-8 lg:gap-12 items-stretch min-h-[400px]">
                    <EnergyConnector />

                    <MasteryCard
                        icon={Zap}
                        title="Absolute Self-Defense"
                        subtitle="Strategic Neutralization"
                        content="Learn the 'Thodu Varmam'. Unlike sports fighting, end a confrontation in seconds by targeting internal switches."
                        parallaxSpeed={0}
                        scrollYProgress={scrollYProgress}
                        accent="#FFB100"
                        image="/assets/adimurai_practitioner.png"
                        href="/classes#our-classes"
                    />

                    <MasteryCard
                        icon={Heart}
                        title="Restorative Health"
                        subtitle="Internal Equilibrium"
                        content="Every strike point is a healing point. Stimulate the glandular system and boost immunity through point-stimulation."
                        parallaxSpeed={0}
                        scrollYProgress={scrollYProgress}
                        accent="#FF2D55"
                        image="/assets/guru_1.png"
                        href="/classes#our-classes"
                    />

                    <MasteryCard
                        icon={Wind}
                        title="Fluid Mobility"
                        subtitle="The Flow of Prana"
                        content="Unlock joints and fascia. Training restores natural range of motion and ensures Prana flows without obstruction."
                        parallaxSpeed={0}
                        scrollYProgress={scrollYProgress}
                        accent="#FFB800"
                        image="/assets/mallakhamb_practitioner.png"
                        href="/classes#camps"
                    />
                </div>
            </div>
        </section>
    );
}
