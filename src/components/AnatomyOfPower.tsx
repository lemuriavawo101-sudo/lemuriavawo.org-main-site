'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const AnatomicalModel = dynamic(() => import('./AnatomicalModel'), { ssr: false });
import FloatingParticles from './FloatingParticles';

interface AnatomyOfPowerProps {
    title?: string;
    subtitle?: string;
    highlightText?: string;
}

export default function AnatomyOfPower({
    title = "The Anatomy of Power:",
    subtitle = "Unlocking 108 Vital Points",
    highlightText = "Unlocking 108 Vital Points"
}: AnatomyOfPowerProps) {
    return (
        <section className="w-full min-h-screen py-20 lg:py-0 lg:h-screen relative bg-[#F8F5EF] flex flex-col items-center justify-center overflow-hidden" style={{ isolation: 'isolate' }}>
            {/* Top fade — letters bleed upward into previous section */}
            <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#F8F5EF] via-[#F8F5EF]/60 to-transparent pointer-events-none z-20" />

            {/* Bottom fade — letters bleed downward into next section */}
            <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#F8F5EF] via-[#F8F5EF]/60 to-transparent pointer-events-none z-20" />

            {/* Thematic Background Elements - Sand Horizon */}
            {/* Subtle radial glow from center */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,187,144,0.15)_0%,transparent_70%)] pointer-events-none" />

            {/* Sacred Geometry Grid Overlay - Lighter for sand theme */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,115,85,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,115,85,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

            {/* Bright Center Orb for Backlighting the Model */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[600px] md:w-[500px] md:h-[800px] bg-white/40 rounded-full blur-[100px] pointer-events-none" />

            {/* Floating Particles and Tamil Letters — overflow into both adjacent sections */}
            <FloatingParticles />

            <div className="relative lg:absolute top-0 left-0 w-full z-10 pointer-events-none pt-24 md:pt-32">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif text-[#3A2F2B] uppercase tracking-wider font-semibold drop-shadow-sm leading-tight text-center md:text-left">
                            {title}<br />
                            <span className="text-[#8B7355]">{subtitle}</span>
                        </h2>

                        <div className="mt-8 max-w-md mx-auto md:mx-0">
                            <p className="text-[#1A1A1A]/60 text-sm md:text-base font-medium leading-relaxed uppercase tracking-widest text-center md:text-left">
                                Mastery over the 108 vital points requires a synchronization of breath, pulse, and intention. The highlighted nodes represent the primary energy junctions where vital force concentrates.
                            </p>
                            <div className="mt-6 flex justify-center md:justify-start gap-3">
                                <div className="w-12 h-[1px] bg-[#D4AF37]/40 mt-3" />
                                <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em]">Deep Technical Analysis</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="relative lg:absolute inset-0 w-full h-[60vh] md:h-full z-[5] mt-12 md:mt-0">
                <AnatomicalModel />
            </div>


            {/* Decorative HUD Grid Overlay (from original AnatomyOfPower) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[size:40px_40px] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]" />
        </section>
    );
}

