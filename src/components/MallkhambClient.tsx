'use client';

import React from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Zap, Target, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import FloatingParticles from '@/components/FloatingParticles';

export default function MallkhambClient() {
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
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.span
                            initial={{ opacity: 0, letterSpacing: '0.2em' }}
                            animate={{ opacity: 1, letterSpacing: '0.5em' }}
                            transition={{ duration: 1.5 }}
                            className="text-[10px] font-black uppercase text-ancient-amber mb-6 block"
                        >
                            Kanyakumari District Mallkhamb Association
                        </motion.span>
                        <h1 className="text-6xl md:text-8xl font-black text-charcoal-deep uppercase tracking-tighter leading-[0.85] mb-8">
                            Mallkhamb <br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '1px #1A1A1A' }}>Aerial Mastery.</span>
                        </h1>
                        <p className="text-charcoal-deep/60 text-lg md:text-xl font-medium tracking-tight leading-relaxed mb-10 max-w-xl">
                            Experience the gravity-defying art of Mallkhamb. A traditional Indian sport where gymnasts perform aerial yoga and wrestling grips on a vertical wooden pole or rope.
                        </p>

                        <div className="flex flex-col gap-6 mb-12">
                            {[
                                { icon: Zap, text: "Explosive Core Strength & Agility", detail: "Developing functional power through vertical balance." },
                                { icon: Target, text: "Focus and Mental Equilibrium", detail: "Sharpening the mind in high-stakes aerial maneuvers." },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="flex items-start gap-5 group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-charcoal-deep flex items-center justify-center text-ancient-amber shadow-lg group-hover:scale-110 transition-transform">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <span className="text-sm font-black uppercase tracking-widest text-charcoal-deep block mb-1">{item.text}</span>
                                        <span className="text-[10px] font-bold text-charcoal-deep/40 uppercase tracking-widest">{item.detail}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <a
                            href="https://kdma-f2ug.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neon-button inline-flex items-center gap-4 group"
                        >
                            Visit Full Website <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 30 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative h-[650px] hidden lg:block"
                    >
                        <div className="absolute inset-0 rounded-[4rem] border border-charcoal-deep/5 p-4">
                            <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white">
                                <Image
                                    src="/assets/mallakhamb_practitioner.png"
                                    alt="Mallkhamb Mastery"
                                    fill
                                    className="object-cover saturate-[0.4] contrast-[1.05] hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/40 via-transparent to-transparent" />
                            </div>
                        </div>
                        {/* Interactive glow follows mouse */}
                        <motion.div
                            className="absolute -top-10 -right-10 w-64 h-64 bg-ancient-amber/10 blur-[100px] rounded-full pointer-events-none"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />

                        {/* Decorative frames */}
                        <div className="absolute top-12 -left-8 w-px h-64 bg-gradient-to-b from-transparent via-ancient-amber/30 to-transparent" />
                        <div className="absolute -bottom-8 right-12 h-px w-64 bg-gradient-to-r from-transparent via-ancient-amber/30 to-transparent" />
                    </motion.div>
                </div>
            </div>

            {/* Backdrop Decorative Elements */}
            <div className="absolute top-1/4 -left-20 text-[25vw] font-black text-charcoal-deep/[0.03] pointer-events-none select-none uppercase tracking-tighter -rotate-90 flex gap-20">
                <span>MALLKHAMB</span>
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(26,26,26,0.05)' }}>MALLKHAMB</span>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-ivory-light to-transparent pointer-events-none" />
        </main>
    );
}
