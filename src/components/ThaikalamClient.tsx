'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Shield, Bird, ArrowRight } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

export default function ThaikalamClient() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <main className="min-h-screen bg-[#F9F7F2] pt-32 pb-20 overflow-hidden">
            {/* Main Content */}
            <div className="container mx-auto px-8 md:px-16 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#8B7355] mb-6 block">The Sacred Motherland</span>
                    <h1 className="text-6xl md:text-8xl font-serif text-[#2A2015] leading-[0.95] mb-8 italic">
                        Thaikalam <br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1px #2A2015', color: 'transparent' }}>Ancestral Roots.</span>
                    </h1>
                    <p className="text-[#5A4A38]/70 text-lg md:text-xl font-medium tracking-wide leading-relaxed font-sans mb-12">
                        Welcome to Thaikalam, the spiritual and administrative heart of the Lemuria Varmakalari Adimurai World Organization. This is where we archive our lineage, preserve our oral traditions, and coordinate the global spread of Varmakalari and Adimurai science.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        {[
                            { icon: BookOpen, title: "Lineage Archives", desc: "Digital repository of palm leaf manuscripts." },
                            { icon: Shield, title: "Guardian Council", desc: "The stewards of the 108 vital points." },
                            { icon: Bird, title: "Global Outreach", desc: "Connecting practitioners across the world." }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                className="p-8 rounded-3xl bg-white border border-[#E6D5C3]/40 shadow-sm"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-[#2A2015] flex items-center justify-center text-white mb-6">
                                    <feature.icon size={20} />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-[#2A2015] mb-3">{feature.title}</h3>
                                <p className="text-[11px] font-medium text-[#5A4A38]/60 leading-relaxed uppercase tracking-wide">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Join Association CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="p-12 rounded-[3rem] bg-charcoal-deep text-ivory-light relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-ancient-amber/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-ancient-amber/20 transition-colors duration-700" />

                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
                                Shape the future <br />
                                of the <span className="text-ancient-amber">Lineage.</span>
                            </h2>
                            <p className="text-ivory-light/60 text-sm font-medium mb-10 leading-relaxed">
                                We are seeking dedicated practitioners, researchers, and stewards to join the Lemuria Varmakalari Adimurai World Organization. Become a guardian of ancient Tamil wisdom.
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="neon-button inline-flex items-center gap-4 group/btn"
                            >
                                Apply for Organization Member <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="ASSOCIATION"
                title="Pledge of Guardianship"
                subtitle="Lemuria VAWO Entry"
            />

            {/* Backdrop Decorative Elements */}
            <div className="absolute top-1/4 -right-20 text-[25vw] font-black text-[#8B7355]/5 pointer-events-none select-none uppercase tracking-tighter rotate-90">
                THAIKALAM
            </div>
        </main>
    );
}
