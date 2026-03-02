'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ExternalLink, Package, ShieldCheck, Truck } from 'lucide-react';

export default function ShopClient() {
    return (
        <main className="relative min-h-screen bg-ivory-light pt-32 pb-20 overflow-hidden">
            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-ancient-amber/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            </div>

            <div className="container mx-auto px-8 md:px-16 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-ancient-amber/20 bg-ancient-amber/5 mb-8">
                            <ShoppingBag size={14} className="text-ancient-amber" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ancient-amber">Lemuria Treasury</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-charcoal-deep uppercase tracking-tighter leading-[0.85] mb-8">
                            Ancient <br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '2px #1A1A1A' }}>Artifacts</span>
                        </h1>

                        <p className="text-base md:text-xl text-charcoal-deep/60 font-medium max-w-2xl mx-auto leading-relaxed">
                            Equip your journey with authentic Varmakalai gear, herbal restorations, and traditional practitioner tools.
                        </p>
                    </motion.div>

                    {/* Central CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="glass-card mb-20 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-ancient-amber/10 via-transparent to-transparent opacity-50" />

                        <div className="relative z-10 p-10 md:p-16 flex flex-col items-center text-center">
                            <div className="w-32 h-32 mb-10 relative">
                                <div className="absolute inset-0 bg-ancient-amber rounded-full blur-3xl opacity-20 animate-pulse" />
                                <div className="relative w-full h-full bg-charcoal-deep rounded-[2.5rem] flex items-center justify-center text-ancient-amber shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3">
                                    <ShoppingBag size={48} />
                                </div>
                            </div>

                            <h2 className="text-2xl md:text-4xl font-black text-charcoal-deep uppercase tracking-tight mb-6">
                                The Full Collection Awaits
                            </h2>

                            <p className="text-sm md:text-lg text-charcoal-deep/50 font-bold uppercase tracking-widest mb-12">
                                hosted at shop.lemuriavawo.org
                            </p>

                            <a
                                href="https://shop.lemuriavawo.org/#/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="neon-button inline-flex items-center gap-4 group/btn"
                            >
                                Enter Full Marketplace
                                <ExternalLink size={16} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Feature Grid */}
                    <div className="grid md:grid-cols-3 gap-8 ">
                        {[
                            { icon: Package, title: "Traditional Gear", desc: "Authentic training equipment designed for Adimurai and Varmakalai." },
                            { icon: ShieldCheck, title: "Lineage Verified", desc: "Every item is approved by our masters for quality and tradition." },
                            { icon: Truck, title: "Global Shipping", desc: "Direct from the source to practitioners worldwide." }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="glass-card p-8 border-ancient-amber/10 hover:border-ancient-amber/30 transition-all duration-500"
                            >
                                <div className="w-12 h-12 rounded-xl bg-charcoal-deep/5 flex items-center justify-center text-ancient-amber mb-6">
                                    <feature.icon size={20} />
                                </div>
                                <h3 className="text-sm font-black text-charcoal-deep uppercase tracking-widest mb-3">{feature.title}</h3>
                                <p className="text-[11px] text-charcoal-deep/40 font-bold leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
