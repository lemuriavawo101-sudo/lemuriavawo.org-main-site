'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutHero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#F9F7F2]">
            {/* Background with desaturated warm tones */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/about_hero_background.png"
                    alt="Ancient stone and linen"
                    fill
                    className="object-cover opacity-30 saturate-[0.1] brightness-110"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F9F7F2]/40 to-[#F9F7F2]" />
            </div>

            <div className="container mx-auto px-8 md:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="text-left"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#8B7355] mb-6 block">The Lineage of the Subtle Touch</span>
                        <h1 className="text-5xl md:text-8xl font-serif text-[#2A2015] leading-[0.95] mb-8 italic">
                            We do not invent the art. <br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '1px #2A2015', color: 'transparent' }}>We preserve the science.</span>
                        </h1>
                        <p className="text-[#5A4A38]/70 text-lg md:text-xl font-medium tracking-wide max-w-xl leading-relaxed font-sans">
                            From ancient Tamil healing traditions to modern holistic vitality.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 30 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative h-[400px] md:h-[550px] w-full max-w-[500px] ml-auto group"
                    >
                        <div className="absolute inset-0 rounded-[4rem] border border-[#E6D5C3]/40 p-4 transition-transform duration-1000 group-hover:scale-105">
                            <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden shadow-2xl">
                                <Image
                                    src="/assets/guru_1.png"
                                    alt="The Main Asan"
                                    fill
                                    className="object-cover saturate-[0.2] brightness-110 contrast-[1.1]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2015]/40 to-transparent" />

                                {/* HUD-like accent */}
                                <div className="absolute bottom-12 left-12 right-12 z-20">
                                    <div className="h-px w-12 bg-[#D4AF37] mb-4" />
                                    <p className="text-[#F9F7F2] text-[10px] uppercase font-black tracking-widest leading-none">Senior Asan</p>
                                    <p className="text-[#F9F7F2]/60 text-[9px] uppercase font-medium mt-1">Steward of the 108 Points</p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative floating ring */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 border border-[#D4AF37]/10 rounded-full animate-pulse" />
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#E6D5C3]/5 rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </div>

            {/* Subtle floating particles */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F9F7F2] to-transparent z-20" />
        </section>
    );
}
