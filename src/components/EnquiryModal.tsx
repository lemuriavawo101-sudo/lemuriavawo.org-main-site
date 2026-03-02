'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import EnquiryForm, { EnquiryType } from './EnquiryForm';

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: EnquiryType;
    title?: string;
    subtitle?: string;
}

export default function EnquiryModal({ isOpen, onClose, type, title, subtitle }: EnquiryModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 py-10">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-charcoal-deep/60 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-2xl bg-ivory-light rounded-[3rem] shadow-2xl overflow-hidden border border-white/20"
                    >
                        {/* Decorative Background HUD */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-ancient-amber" />
                            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-ancient-amber" />
                        </div>

                        <div className="relative z-10 p-8 md:p-12 max-h-[90vh] overflow-y-auto custom-scrollbar">
                            <EnquiryForm
                                type={type}
                                onClose={onClose}
                                title={title}
                                subtitle={subtitle}
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
