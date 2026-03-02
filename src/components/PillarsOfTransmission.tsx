'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const PILLARS = [
    {
        title: "The Wisdom",
        subtitle: "Ancient Roots",
        content: "We honour the Siddhars who mapped the 108 points. We don't change the technique; we ensure it survives the test of time.",
        delay: 0,
        icon: "/assets/pillar_wisdom.png"
    },
    {
        title: "The Precision",
        subtitle: "Modern Application",
        content: "Ancient wisdom meets modern physiology. We apply this science to help you move, breathe, and live with total awareness.",
        delay: 0.2,
        icon: "/assets/pillar_precision.png"
    },
    {
        title: "The Stewardship",
        subtitle: "Passing the Torch",
        content: "Our responsibility is to ensure that this knowledge is passed to the next generation with integrity, discipline, and humility.",
        delay: 0.4,
        icon: "/assets/pillar_stewardship.png"
    }
];

const PillarCard = ({ pillar, index }: { pillar: typeof PILLARS[0], index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: pillar.delay }}
            viewport={{ once: true }}
            className="relative group"
        >
            <div className="glass-card bg-white/40 border-[#E6D5C3]/40 p-12 md:p-14 h-full flex flex-col items-center justify-center text-center transition-all duration-1000 group-hover:bg-white/60 shadow-lg hover:shadow-2xl rounded-[3rem]">
                {/* Pulsing effect in background */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-x-5 inset-y-5 rounded-full bg-[#D4AF37]/15 blur-3xl pointer-events-none"
                />

                <div className="relative w-24 h-24 mb-10 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Image
                        src={pillar.icon}
                        alt={pillar.title}
                        fill
                        className="object-contain saturate-[0.5]"
                    />
                </div>

                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] mb-4 block">
                    0{index + 1} // {pillar.subtitle}
                </span>
                <h3 className="text-3xl font-serif text-[#2A2015] mb-6 italic">{pillar.title}</h3>
                <p className="text-sm text-[#5A4A38]/75 leading-relaxed font-sans max-w-[240px]">
                    {pillar.content}
                </p>

                {/* Bottom accent */}
                <div className="mt-10 w-8 h-px bg-[#E6D5C3]" />
            </div>
        </motion.div>
    );
};

export default function PillarsOfTransmission() {
    return (
        <section className="relative py-32 bg-[#F9F7F2] overflow-hidden">
            <div className="container mx-auto px-8 md:px-16">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#2A2015] mb-4 italic">The Three Pillars of Transmission</h2>
                    <div className="w-16 h-px bg-[#D4AF37] mx-auto opacity-40" />
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {PILLARS.map((pillar, index) => (
                        <PillarCard key={pillar.title} pillar={pillar} index={index} />
                    ))}
                </div>
            </div>

            {/* Subtle depth layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(230,213,195,0.1)_0%,transparent_70%)] pointer-events-none" />
        </section>
    );
}
