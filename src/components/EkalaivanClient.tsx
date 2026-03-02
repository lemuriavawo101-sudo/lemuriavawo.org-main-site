'use client';

import React from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Cpu, Shield, Zap } from 'lucide-react';
import Image from 'next/image';
import FloatingParticles from '@/components/FloatingParticles';

export default function EkalaivanClient() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 80 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 80 });

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <main
            onMouseMove={handleMouseMove}
            className="min-h-screen bg-ivory-light pt-32 pb-20 overflow-hidden relative"
        >
            {/* Dynamic Sun Ray Layer */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 opacity-30"
                style={{
                    background: useTransform(
                        [smoothX, smoothY],
                        ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(255, 184, 0, 0.12), transparent 70%)`
                    )
                }}
            />

            <FloatingParticles />

            <div className="container mx-auto px-8 md:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image side first for visual variety */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: -30 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative h-[650px] hidden lg:block"
                    >
                        <div className="absolute inset-0 rounded-[4rem] border border-charcoal-deep/5 p-4">
                            <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white">
                                <Image
                                    src="/assets/adimurai_practitioner.png"
                                    alt="Ekalaivan Digital Combat"
                                    fill
                                    className="object-cover saturate-[0.4] contrast-[1.05] hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/40 via-transparent to-transparent" />
                            </div>
                        </div>

                        {/* Decorative HUD-like elements */}
                        <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-ancient-amber/30 rounded-tl-3xl" />
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-ancient-amber/30 rounded-br-3xl" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.span
                            initial={{ opacity: 0, letterSpacing: '0.2em' }}
                            animate={{ opacity: 1, letterSpacing: '0.5em' }}
                            transition={{ duration: 1.5 }}
                            className="text-[10px] font-black uppercase text-ancient-amber mb-6 block"
                        >
                            Ekalaivan Digital Combat Platform
                        </motion.span>
                        <h1 className="text-6xl md:text-8xl font-black text-charcoal-deep uppercase tracking-tighter leading-[0.85] mb-8">
                            Ekalaivan <br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '1px #1A1A1A' }}>Modern Warrior.</span>
                        </h1>
                        <p className="text-charcoal-deep/60 text-lg md:text-xl font-medium tracking-tight leading-relaxed mb-10 max-w-xl">
                            The future of martial arts education. Bridging the gap between traditional Tamil wisdom and modern digital learning. Train with masters, anywhere, anytime.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {[
                                { icon: Cpu, title: "AI-Driven Feedback", desc: "Digital form correction using pose estimation logic." },
                                { icon: Shield, title: "Lineage Protection", desc: "Blockchain-verified certificates of authenticity." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="p-8 rounded-3xl glass-card border-white/40 shadow-xl"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-charcoal-deep flex items-center justify-center text-ancient-amber mb-6 shadow-lg">
                                        <item.icon size={22} />
                                    </div>
                                    <h4 className="text-[12px] font-black uppercase tracking-widest text-charcoal-deep mb-3">{item.title}</h4>
                                    <p className="text-[11px] font-bold text-charcoal-deep/40 uppercase leading-relaxed tracking-wide">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-6 items-center">
                            <a
                                href="https://ekalaivan987.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="neon-button inline-flex items-center gap-4 group"
                            >
                                Enter Digital Dojo <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                            <div className="flex items-center gap-3 group cursor-pointer">
                                <div className="w-10 h-10 rounded-full border border-charcoal-deep/10 flex items-center justify-center group-hover:bg-charcoal-deep group-hover:text-white transition-all">
                                    <Zap size={14} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-deep/60">View Roadmap</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Backdrop Decorative Elements */}
            <div className="absolute top-1/4 -right-20 text-[25vw] font-black text-charcoal-deep/[0.03] pointer-events-none select-none uppercase tracking-tighter rotate-90 flex gap-20">
                <span>EKALAIVAN</span>
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(26,26,26,0.05)' }}>EKALAIVAN</span>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-ivory-light to-transparent pointer-events-none" />
        </main>
    );
}
