'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useGallery } from '@/hooks/useGallery';
import { X, Maximize2, Camera, Sparkles, ArrowRight } from 'lucide-react';

export default function Gallery({ limit, initialImages = [] }: { limit?: number, initialImages?: any[] }) {
    const { images, isLoaded } = useGallery(initialImages);
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [filter, setFilter] = useState('ALL');

    const displayImages = isLoaded ? images : initialImages;

    const categories = ['ALL', ...Array.from(new Set(displayImages.map(img => img.category)))];

    const filteredImages = (filter === 'ALL'
        ? displayImages
        : displayImages.filter(img => img.category === filter)).slice(0, limit || displayImages.length);

    return (
        <section id="gallery" className="relative py-32 bg-charcoal-deep overflow-hidden">
            {/* Colorful Background Ambient Orbs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-ancient-amber/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-bronze-gold/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-8 md:px-16 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-ancient-amber text-[10px] font-black uppercase tracking-[0.5em] mb-4 block flex items-center justify-center gap-3">
                            <Camera size={12} /> Visual Chronicles
                        </span>
                        <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                            The <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #D4AF37' }}>Archive</span> <br />
                            Of Moments
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-ancient-amber to-transparent mx-auto mb-10" />
                    </motion.div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 mt-10">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${filter === cat
                                    ? 'bg-ancient-amber border-ancient-amber text-charcoal-deep shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                                    : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gallery Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredImages.map((img) => (
                            <motion.div
                                key={img.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
                                onClick={() => setSelectedImage(img)}
                                style={{
                                    border: `1px solid ${img.color}33`
                                }}
                            >
                                <Image
                                    src={img.image}
                                    alt={img.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />

                                {/* Colorful Overlay */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8"
                                    style={{
                                        background: `linear-gradient(to top, ${img.color}CC, transparent)`
                                    }}
                                >
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70 block mb-2">{img.category}</span>
                                            <h4 className="text-xl font-black text-white uppercase tracking-tight">{img.title}</h4>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                                            <Maximize2 size={16} />
                                        </div>
                                    </div>
                                </div>

                                {/* Static Corner Accent */}
                                <div
                                    className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-50"
                                    style={{ backgroundColor: img.color }}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View Full Gallery Button (only in preview mode) */}
                {limit && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-16 text-center"
                    >
                        <Link
                            href="/gallery"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-ancient-amber hover:text-charcoal-deep hover:border-ancient-amber transition-all group"
                        >
                            View Full Archive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-charcoal-deep/95 backdrop-blur-2xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all z-[210]"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={24} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                            onClick={(e) => e.stopPropagation()}
                            style={{ border: `1px solid ${selectedImage.color}44` }}
                        >
                            <Image
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                fill
                                className="object-cover"
                            />

                            {/* Colorful Lightbox Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white bg-gradient-to-t from-charcoal-deep via-charcoal-deep/50 to-transparent">
                                <div className="flex items-center gap-4 mb-4">
                                    <div
                                        className="h-px w-12"
                                        style={{ background: selectedImage.color }}
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50">{selectedImage.category}</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">{selectedImage.title}</h3>
                                <div className="flex items-center gap-3 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                                    <Sparkles size={14} style={{ color: selectedImage.color }} />
                                    Authenticated Lineage Archive
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
