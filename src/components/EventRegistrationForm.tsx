'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MessageSquare, Send, X } from 'lucide-react';

interface EventRegistrationFormProps {
    eventTitle: string;
    eventColor: string;
    eventAccent: string;
    onClose: () => void;
}

export default function EventRegistrationForm({
    eventTitle,
    eventColor,
    eventAccent,
    onClose,
}: EventRegistrationFormProps) {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate API call
        setTimeout(() => setStatus('success'), 1500);
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
            >
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${eventColor}, ${eventAccent})` }}
                >
                    <Send size={24} className="text-[#1A1200]" />
                </div>
                <h3 className="font-serif text-2xl text-[#2A2015] mb-2">Registration Received</h3>
                <p className="text-[#5A4A38]/60 text-sm max-w-xs mx-auto">
                    We have received your request to join <strong>{eventTitle}</strong>. Our team will contact you shortly with the next steps.
                </p>
                <button
                    onClick={onClose}
                    className="mt-8 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] border border-[#8B7355]/20 hover:bg-[#2A2015] hover:text-white transition-all duration-300"
                >
                    Close
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
        >
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="font-serif text-2xl text-[#2A2015] mb-1">Join the Circle</h3>
                    <p className="text-[#5A4A38]/50 text-[11px] font-bold uppercase tracking-wider">Register for {eventTitle}</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-[#8B7355]/5 text-[#8B7355]/40 hover:text-[#8B7355] transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]/40 transition-colors group-focus-within:text-[#D4AF37]">
                            <User size={16} />
                        </div>
                        <input
                            required
                            type="text"
                            placeholder="Full Name"
                            className="w-full bg-white/40 border border-[#8B7355]/10 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]/40 transition-all"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]/40 transition-colors group-focus-within:text-[#D4AF37]">
                            <Mail size={16} />
                        </div>
                        <input
                            required
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-white/40 border border-[#8B7355]/10 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]/40 transition-all"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]/40 transition-colors group-focus-within:text-[#D4AF37]">
                        <Phone size={16} />
                    </div>
                    <input
                        required
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full bg-white/40 border border-[#8B7355]/10 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]/40 transition-all"
                    />
                </div>

                {/* Message */}
                <div className="relative group">
                    <div className="absolute left-4 top-4 text-[#8B7355]/40 transition-colors group-focus-within:text-[#D4AF37]">
                        <MessageSquare size={16} />
                    </div>
                    <textarea
                        rows={3}
                        placeholder="Why do you wish to join this session? (Optional)"
                        className="w-full bg-white/40 border border-[#8B7355]/10 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]/40 transition-all resize-none"
                    />
                </div>

                {/* Submit */}
                <button
                    disabled={status === 'sending'}
                    type="submit"
                    className="w-full relative py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.4em] overflow-hidden transition-all duration-500 disabled:opacity-50"
                    style={{
                        background: `linear-gradient(135deg, ${eventColor}, ${eventAccent})`,
                        color: '#0D0B08',
                        boxShadow: `0 8px 30px ${eventColor}30`,
                    }}
                >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        {status === 'sending' ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="w-4 h-4 border-2 border-[#1A1200]/30 border-t-[#1A1200] rounded-full"
                                />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Send size={14} />
                                Submit Registration
                            </>
                        )}
                    </span>
                </button>

                <p className="text-center text-[10px] text-[#5A4A38]/30 font-medium">
                    By registering, you agree to follow the traditional protocols of the Varma Kalai lineage.
                </p>
            </form>
        </motion.div>
    );
}
