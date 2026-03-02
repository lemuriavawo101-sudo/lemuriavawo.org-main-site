'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Phone, MessageSquare, Send, X,
    ShieldCheck, Award, MapPin, Globe, Briefcase,
    Zap, Activity, Utensils, Plane, Calendar, Clock
} from 'lucide-react';

export type EnquiryType = 'ASSOCIATION' | 'SEAT_APPLICATION' | 'CAMP_REGISTRATION';

interface EnquiryFormProps {
    type: EnquiryType;
    onClose: () => void;
    title?: string;
    subtitle?: string;
}

const TYPE_CONFIG = {
    ASSOCIATION: {
        icon: ShieldCheck,
        color: '#D4AF37',
        accent: '#F5E27A',
        buttonText: 'Submit Application',
        successMsg: 'Your request to join the Lemuria Varmakalari Adimurai World Organization is being processed.',
    },
    SEAT_APPLICATION: {
        icon: Award,
        color: '#8B7355',
        accent: '#B8A082',
        buttonText: 'Register Interest',
        successMsg: 'Your seat application has been received. Our masters will reach out after the next intake review.',
    },
    CAMP_REGISTRATION: {
        icon: MapPin,
        color: '#B8860B',
        accent: '#D4AF37',
        buttonText: 'Reserve My Spot',
        successMsg: 'Registration for the immersive camp is confirmed. Expect a preparation guide in your inbox soon.',
    },
};

export default function EnquiryForm({ type, onClose, title, subtitle }: EnquiryFormProps) {
    const config = TYPE_CONFIG[type];
    const Icon = config.icon;
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        details: '',
        // Type specific
        location: '',
        occupation: '',
        experience: '',
        age: '',
        timing: 'Evening',
        medical: '',
        dietary: '',
        travelAssist: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type: inputType } = e.target;
        if (inputType === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        // Simulate API call
        console.log('Capture Lead:', {
            ...formData,
            type,
            timestamp: new Date().toISOString(),
            status: 'NEW'
        });

        setTimeout(() => setStatus('success'), 1500);
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
            >
                <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-2xl"
                    style={{ background: `linear-gradient(135deg, ${config.color}, ${config.accent})` }}
                >
                    <Send size={32} className="text-[#0D0B08]" />
                </div>
                <h3 className="font-serif text-3xl text-[#2A2015] mb-4">Transmission Received</h3>
                <p className="text-[#5A4A38]/70 text-sm max-w-xs mx-auto leading-relaxed font-medium">
                    {config.successMsg}
                </p>
                <button
                    onClick={onClose}
                    className="mt-10 px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] border border-[#8B7355]/20 hover:bg-[#2A2015] hover:text-white transition-all duration-500 hover:shadow-2xl active:scale-95"
                >
                    Return to Silence
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
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-ivory-dark text-ancient-amber shadow-inner">
                        <Icon size={24} />
                    </div>
                    <div>
                        <h3 className="font-serif text-2xl text-[#2A2015] mb-1">{title || 'Initiate Entry'}</h3>
                        <p className="text-[#5A4A38]/40 text-[10px] font-black uppercase tracking-[0.3em]">
                            {subtitle || `Submitting to: ${type.replace('_', ' ')}`}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-3 rounded-full hover:bg-ivory-dark text-[#8B7355]/30 hover:text-[#8B7355] transition-all"
                >
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]/30 transition-colors group-focus-within:text-ancient-amber">
                            <User size={18} />
                        </div>
                        <input
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Adept Name"
                            className="w-full bg-ivory-dark/50 border border-ivory-dark rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-ancient-amber/10 focus:border-ancient-amber/30 transition-all font-medium placeholder:text-[#8B7355]/30"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]/30 transition-colors group-focus-within:text-ancient-amber">
                            <Mail size={18} />
                        </div>
                        <input
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Digital Address"
                            className="w-full bg-ivory-dark/50 border border-ivory-dark rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-ancient-amber/10 focus:border-ancient-amber/30 transition-all font-medium placeholder:text-[#8B7355]/30"
                        />
                    </div>

                    {/* Phone */}
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]/30 transition-colors group-focus-within:text-ancient-amber">
                            <Phone size={18} />
                        </div>
                        <input
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="tel"
                            placeholder="Vocal Line"
                            className="w-full bg-ivory-dark/50 border border-ivory-dark rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-ancient-amber/10 focus:border-ancient-amber/30 transition-all font-medium placeholder:text-[#8B7355]/30"
                        />
                    </div>

                    {/* Type specific fields */}
                    {type === 'ASSOCIATION' && (
                        <>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]/30 transition-colors group-focus-within:text-ancient-amber">
                                    <Globe size={18} />
                                </div>
                                <input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="City, Country"
                                    className="w-full bg-ivory-dark/50 border border-ivory-dark rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-ancient-amber/10 focus:border-ancient-amber/30 transition-all font-medium placeholder:text-[#8B7355]/30"
                                />
                            </div>
                            <div className="relative group md:col-span-2">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]/30 transition-colors group-focus-within:text-ancient-amber">
                                    <Briefcase size={18} />
                                </div>
                                <input
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Current Occupation"
                                    className="w-full bg-ivory-dark/50 border border-ivory-dark rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-ancient-amber/10 focus:border-ancient-amber/30 transition-all font-medium placeholder:text-[#8B7355]/30"
                                />
                            </div>
                        </>
                    )}

                    {type === 'SEAT_APPLICATION' && (
                        <>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]/30 transition-colors group-focus-within:text-ancient-amber">
                                    <Zap size={18} />
                                </div>
                                <input
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="Age"
                                    className="w-full bg-ivory-dark/50 border border-ivory-dark rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-ancient-amber/10 focus:border-ancient-amber/30 transition-all font-medium placeholder:text-[#8B7355]/30"
                                />
                            </div>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]/30 transition-colors group-focus-within:text-ancient-amber">
                                    <Clock size={18} />
                                </div>
                                <select
                                    name="timing"
                                    value={formData.timing}
                                    onChange={handleChange}
                                    className="appearance-none w-full bg-ivory-dark/50 border border-ivory-dark rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-ancient-amber/10 focus:border-ancient-amber/30 transition-all font-medium text-[#2A2015]"
                                >
                                    <option value="Morning">Morning Batch</option>
                                    <option value="Evening">Evening Batch</option>
                                    <option value="Weekend">Weekend Immersions</option>
                                </select>
                            </div>
                        </>
                    )}

                    {type === 'CAMP_REGISTRATION' && (
                        <>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]/30 transition-colors group-focus-within:text-ancient-amber">
                                    <Utensils size={18} />
                                </div>
                                <input
                                    name="dietary"
                                    value={formData.dietary}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Dietary Preferences"
                                    className="w-full bg-ivory-dark/50 border border-ivory-dark rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-ancient-amber/10 focus:border-ancient-amber/30 transition-all font-medium placeholder:text-[#8B7355]/30"
                                />
                            </div>
                            <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-ivory-dark/30 border border-ivory-dark md:col-span-1">
                                <input
                                    type="checkbox"
                                    name="travelAssist"
                                    id="travelAssist"
                                    checked={formData.travelAssist}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-ivory-dark text-ancient-amber focus:ring-ancient-amber"
                                />
                                <label htmlFor="travelAssist" className="text-[10px] font-black uppercase tracking-widest text-[#5A4A38]/60 cursor-pointer">Need Travel Assistance?</label>
                            </div>
                        </>
                    )}
                </div>

                {/* Details / Intention */}
                <div className="relative group">
                    <div className="absolute left-4 top-5 text-[#8B7355]/30 transition-colors group-focus-within:text-ancient-amber">
                        <MessageSquare size={18} />
                    </div>
                    <textarea
                        required
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        rows={3}
                        placeholder={type === 'ASSOCIATION' ? "Why do you wish to join?" : "Previous martial experience or intention..."}
                        className="w-full bg-ivory-dark/50 border border-ivory-dark rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-ancient-amber/10 focus:border-ancient-amber/30 transition-all font-medium placeholder:text-[#8B7355]/30 resize-none"
                    />
                </div>

                {/* Submit */}
                <button
                    disabled={status === 'sending'}
                    type="submit"
                    className="w-full group/btn relative py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.5em] overflow-hidden transition-all duration-500 disabled:opacity-50 active:scale-[0.98]"
                    style={{
                        background: `linear-gradient(135deg, ${config.color}, ${config.accent})`,
                        color: '#0D0B08',
                        boxShadow: `0 12px 40px ${config.color}30`,
                    }}
                >
                    <span className="relative z-10 flex items-center justify-center gap-4">
                        {status === 'sending' ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="w-4 h-4 border-2 border-[#1A1200]/30 border-t-[#1A1200] rounded-full"
                                />
                                Transmitting...
                            </>
                        ) : (
                            <>
                                {config.buttonText}
                                <ArrowPinIcon />
                            </>
                        )}
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity" />
                </button>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-ivory-dark/30 border border-ivory-dark">
                    <div className="w-1.5 h-1.5 rounded-full bg-ancient-amber animate-pulse" />
                    <p className="text-[9px] text-[#5A4A38]/60 font-black uppercase tracking-widest leading-relaxed">
                        By submitting, you pledge to uphold the sanctity of the 108 Varma nodes.
                    </p>
                </div>
            </form>
        </motion.div>
    );
}

function ArrowPinIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
    );
}
