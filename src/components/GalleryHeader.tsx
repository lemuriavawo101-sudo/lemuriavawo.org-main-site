'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function GalleryHeader() {
    return (
        <div className="container mx-auto px-8 md:px-16 mb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">Complete Archive</h1>
                <div className="flex items-center gap-4 text-ancient-amber text-[10px] font-black uppercase tracking-[0.4em]">
                    <div className="h-px w-8 bg-ancient-amber" />
                    Visual Lineage Repository
                </div>
            </motion.div>
        </div>
    );
}
