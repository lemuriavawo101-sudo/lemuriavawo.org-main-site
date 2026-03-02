'use client';

import React, { useRef, useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Search, Menu, Zap, Heart, Shield, ArrowRight, Calendar, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { getGurus } from '@/lib/actions/data';

const CulturalModel = dynamic(() => import('./CulturalModel'), { ssr: false });

const PranaParticles = () => {
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        const newParticles = [...Array(30)].map((_, i) => ({
            id: i,
            size: Math.random() * 3 + 1,
            left: Math.random() * 100,
            top: Math.random() * 110,
            delay: Math.random() * 5,
            duration: 15 + Math.random() * 15,
            opacity: Math.random() * 0.2 + 0.1,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="prana-particle"
                    style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        opacity: p.opacity,
                    }}
                />
            ))}
        </div>
    );
};

const GuruCard = ({ image, name, role, index }: { image: string, name: string, role: string, index: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
        className="flex flex-col items-center gap-3 group"
    >
        <div className="guru-circle border-white group-hover:border-ancient-amber transition-all duration-700">
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
        </div>
        <div className="text-center">
            <p className="text-[10px] text-charcoal-deep font-black tracking-widest uppercase mb-0.5">{name}</p>
            <p className="text-[9px] text-charcoal-deep/40 italic">{role}</p>
        </div>
    </motion.div>
);

export default function Hero() {
    const [gurus, setGurus] = useState<any[]>([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        async function loadGurus() {
            const data = await getGurus();
            setGurus(data as any[]);
        }
        loadGurus();
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 80 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 80 });
    const { handleLinkClick } = useScrollToTop();

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top } = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const yContent = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const yFloat = useTransform(scrollYProgress, [0, 1], [0, -200]);


    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-[110vh] lg:min-h-[135vh] w-full bg-ivory-light flex flex-col overflow-hidden"
        >
            {/* Dynamic Sun Ray Layer */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 opacity-30"
                style={{
                    background: useTransform(
                        [smoothX, smoothY],
                        ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(255, 184, 0, 0.08), transparent 70%)`
                    )
                }}
            />


            {/* Background Image Layer */}
            <motion.div
                style={{ y: yBackground }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/assets/mallakhamb_bg.png"
                    alt="Sanctuary Backdrop"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ivory-light via-ivory-light/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ivory-light" />
            </motion.div>

            {/* Content Area */}
            <div className="relative z-20 flex-1 flex flex-col items-center container mx-auto px-8 md:px-16 pt-24 lg:pt-32">

                <div className="relative z-30 w-full flex-1 flex flex-col justify-center mt-20 md:mt-0">
                    <div className="grid lg:grid-cols-2 gap-20 items-center min-h-[60vh]">
                        {/* Text Content */}
                        <motion.div
                            style={{ y: yContent }}
                            className="max-w-2xl -mt-12 lg:-mt-20"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <div className="relative w-48 h-20 mb-6">
                                    <Image
                                        src="/assets/lemuria_logo.png"
                                        alt="Lemuria VAWO Logo"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-charcoal-deep uppercase tracking-tighter leading-[0.85] mb-8">
                                    The <span className="text-ancient-amber">Best</span> <br />
                                    Varmakalai, <br />
                                    Adimurai, <br />
                                    Silambam <br />
                                    <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #1A1A1A' }}>Academy in the World</span>
                                </h1>
                                <div className="mb-10 max-w-md">
                                    <h2 className="text-charcoal-deep text-xs md:text-sm font-black uppercase tracking-[0.2em] mb-3">
                                        Lemuria Varmakalari Adimurai World Organization
                                    </h2>
                                    <p className="text-xs md:text-sm text-charcoal-deep/50 leading-relaxed font-medium">
                                        The global authoritative body for ancient Tamil martial arts. Preserving the supreme science of focus and power through the Lemuria lineage.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-8 lg:mt-16">
                                    <Link
                                        href="/thaikalam"
                                        onClick={(e) => handleLinkClick(e, '/thaikalam')}
                                    >
                                        <button className="neon-button flex items-center gap-3">
                                            Join Association <ArrowRight size={14} />
                                        </button>
                                    </Link>
                                    <Link
                                        href="/classes"
                                        onClick={(e) => handleLinkClick(e, '/classes')}
                                    >
                                        <button className="secondary-button">
                                            Explore Classes
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            style={{ y: yFloat }}
                            className="relative flex flex-col items-center gap-10 lg:translate-x-12 mt-12 lg:mt-0"
                        >
                            {/* Main Practitioner Circle */}
                            <div className="relative w-full max-w-[340px] aspect-square lg:w-[380px] lg:h-[380px]">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    className="absolute inset-0 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl"
                                >
                                    <Image
                                        src="/assets/adimurai_practitioner.png"
                                        alt="Adimurai Practitioner"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            </div>

                            {/* Floating Events Card - Linked to Events Page Spotlight */}
                            <Link href="/events?id=1" className="block w-full max-w-sm">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="glass-card p-5 flex items-center gap-5 w-full border-ancient-amber/20 shadow-xl cursor-pointer hover:border-ancient-amber/40 hover:scale-[1.02] transition-all duration-500 group/card"
                                >
                                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 border-white shadow-md relative">
                                        <Image
                                            src="/event-sunrise.png"
                                            alt="Event Thumbnail"
                                            fill
                                            className="object-cover group-hover/card:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-ancient-amber">Featured</span>
                                            <div className="w-1 h-1 rounded-full bg-ancient-amber/40 animate-pulse" />
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-charcoal-deep/30">Mar 21</span>
                                        </div>
                                        <h4 className="text-[13px] font-black leading-tight text-charcoal-deep group-hover/card:text-ancient-amber transition-colors">Spring Equinox Varma Intensive</h4>
                                        <p className="text-[9px] text-charcoal-deep/40 font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5">
                                            <Calendar size={10} className="text-ancient-amber" /> Chennai Coastal Retreat
                                        </p>
                                    </div>
                                    <motion.div
                                        whileHover={{ x: 3 }}
                                        className="w-8 h-8 rounded-full bg-charcoal-deep flex items-center justify-center text-white"
                                    >
                                        <ArrowRight size={14} />
                                    </motion.div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Meet the Gurus Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 20 }}
                    transition={{ duration: 1 }}
                    className="mt-12 lg:mt-20 glass-card p-12 md:p-16 mb-12 relative z-20 w-full"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div>
                            <h3 className="text-xl md:text-2xl font-black text-charcoal-deep uppercase tracking-tight mb-2">Heritage Mentors</h3>
                            <p className="text-[10px] text-charcoal-deep/40 font-bold uppercase tracking-widest">Learning from the ancient lineages</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                            {gurus.map((guru, index) => (
                                <GuruCard
                                    key={guru.name}
                                    image={guru.image}
                                    name={guru.name}
                                    role={guru.role}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* 3D Pipa Model Overlay - Centered and now stacking on mobile */}
            <div className="relative lg:absolute inset-x-0 bottom-0 pointer-events-none flex items-center justify-center z-40 overflow-visible h-[60vh] lg:h-[100vh]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                    className="w-full max-w-4xl h-full pointer-events-auto -translate-y-10 lg:-translate-y-20"
                >
                    <CulturalModel
                        modelUrl="/models/pipa_amb_cap_de_drac.glb"
                        scale={0.11}
                        containerHeight="h-full"
                    />
                </motion.div>
            </div>

            <PranaParticles />

            {/* Fine Cinematic Details */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-40 bg-[radial-gradient(circle_at_20%_20%,transparent_0%,rgba(0,0,0,0.02)_100%)]" />
        </section>
    );
}

