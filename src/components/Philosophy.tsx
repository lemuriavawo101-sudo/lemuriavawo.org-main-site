'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Philosophy() {
    return (
        <section className="relative py-48 bg-[#F9F7F2] overflow-hidden">
            <div className="container mx-auto px-8 md:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* The Cinematic Asan Portrait */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: -50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative w-full aspect-square md:aspect-auto md:h-[750px] rounded-[5rem] overflow-hidden border-[1px] border-[#E6D5C3]/40 shadow-2xl group">
                            <Image
                                src="/assets/guru_2.png"
                                alt="Main Asan in focus"
                                fill
                                className="object-cover saturate-[0.2] brightness-110 contrast-[1.05] transition-transform duration-[4s] group-hover:scale-110"
                            />
                            {/* Cinematic overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2A2015]/60 via-transparent to-transparent opacity-60" />

                            {/* HUD Detail */}
                            <div className="absolute top-12 left-12">
                                <div className="h-px w-8 bg-[#D4AF37] mb-2" />
                                <span className="text-[10px] text-[#F9F7F2] font-black tracking-widest uppercase">Ancient Lineage</span>
                            </div>
                        </div>

                        {/* Decorative floating elements */}
                        <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#E6D5C3]/10 rounded-full blur-[90px]" />
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px]" />
                    </motion.div>

                    <div className="flex flex-col gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-px w-16 bg-[#D4AF37]" />
                                <span className="text-[11px] font-black uppercase tracking-[0.6em] text-[#8B7355]">The Science of Presence</span>
                            </div>
                            <h2 className="text-5xl md:text-8xl font-serif text-[#2A2015] italic leading-[0.9] mb-10">
                                Beyond the <br />
                                <span className="not-italic text-4xl md:text-6xl text-transparent" style={{ WebkitTextStroke: '1px #2A2015' }}>Physical Touch.</span>
                            </h2>
                            <div className="space-y-10">
                                <p className="text-2xl md:text-3xl font-serif text-[#5A4A38]/90 leading-tight italic border-l-4 border-[#D4AF37] pl-10">
                                    "We teach that the power to restore a body to its natural state of grace is the same power required to neutralize a threat."
                                </p>
                                <p className="text-lg text-[#5A4A38]/70 font-medium leading-relaxed font-sans max-w-xl">
                                    Our philosophy is rooted in the duality of Varmam. It is a science of protection, but foremost, it is a science of preservation. We cultivate masters who understand balance in a world of chaos.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-[#E6D5C3]/10 p-12 rounded-[4rem] backdrop-blur-3xl border border-[#E6D5C3]/20 relative overflow-hidden group"
                        >
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                            <p className="text-base text-[#8B7355] font-serif italic relative z-10 leading-loose">
                                We honor the Siddhars who mapped the 108 points. We don't change the technique; we ensure it survives the test of time, applied with modern precision for total vitality.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Background watermark */}
            <div className="absolute -bottom-10 -left-10 text-[25vw] font-serif text-[#E6D5C3]/5 pointer-events-none select-none italic whitespace-nowrap -rotate-6">
                Siddhar Varmakalai
            </div>
        </section>
    );
}
