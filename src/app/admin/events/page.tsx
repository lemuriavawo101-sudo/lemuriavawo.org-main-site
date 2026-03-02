'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, MapPin, Image as ImageIcon, Layout, Plus, Check, AlertCircle, ChevronLeft, ChevronRight, X, BookOpen } from 'lucide-react';

const MONTHS = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

import { EVENTS } from '@/lib/constants';
import { saveToSeedsAction } from '@/lib/actions/data';

export default function AdminEventsPage() {
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [editingEvent, setEditingEvent] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        type: 'PHYSICAL WORKSHOP',
        location: '',
        focus: '',
        description: '',
        tag: 'NEW EVENT',
        image: '/event-sunrise.png',
        placement: 'left' as 'left' | 'right',
        color: '#D4AF37',
        accent: '#F5E27A',
        wisdomSummary: ''
    });

    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

    const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

    const handleEdit = (event: any) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            subtitle: event.subtitle,
            type: event.type,
            location: event.location,
            focus: event.focus,
            description: event.description,
            tag: event.tag,
            image: event.image,
            placement: event.placement || 'left',
            color: event.color,
            accent: event.accent,
            wisdomSummary: event.wisdomSummary || ''
        });
        setSelectedDate(new Date(event.date));
        setIsFormOpen(true);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate) return;

        setStatus('submitting');

        const newEvent = {
            ...formData,
            id: editingEvent?.id || Date.now(),
            day: selectedDate.getDate().toString().padStart(2, '0'),
            month: MONTHS[selectedDate.getMonth()].slice(0, 3),
            year: selectedDate.getFullYear().toString(),
            date: selectedDate.toISOString().split('T')[0],
            number: editingEvent?.number || 'NEW'
        };

        // Create updated list
        let updatedEvents;
        if (editingEvent) {
            updatedEvents = EVENTS.map((ev: any) => ev.id === editingEvent.id ? newEvent : ev);
        } else {
            updatedEvents = [newEvent, ...EVENTS];
        }

        const result = await saveToSeedsAction('events', updatedEvents);

        if (result.success) {
            setStatus('success');
            setTimeout(() => {
                setIsFormOpen(false);
                setStatus('idle');
                setEditingEvent(null);
                setSelectedDate(null);
                // Force a refresh or rely on constants file change detection
                window.location.reload();
            }, 1500);
        } else {
            alert('Save failed: ' + result.error);
            setStatus('idle');
        }
    };

    return (
        <div className="space-y-10">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">Events Management</h1>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Chronos Transmission Hub</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-3 px-6 py-3 bg-ancient-amber rounded-xl text-[10px] font-black uppercase tracking-widest text-black hover:scale-105 transition-all"
                >
                    <Plus size={14} /> Announce Event
                </button>
            </header>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Calendar & Existing Events */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="glass-card-transparent p-8 border-white/5 bg-white/[0.02]">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                                <CalendarIcon size={16} className="text-ancient-amber" />
                                Transmission Calendar
                            </h3>
                            <div className="flex items-center gap-4">
                                <button onClick={handlePrevMonth} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all"><ChevronLeft size={18} /></button>
                                <span className="text-[11px] font-black text-white uppercase tracking-widest min-w-[120px] text-center">
                                    {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                                </span>
                                <button onClick={handleNextMonth} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all"><ChevronRight size={18} /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                                <div key={day} className="p-4 text-center text-[9px] font-black text-white/20 uppercase tracking-widest bg-white/[0.02]">
                                    {day}
                                </div>
                            ))}

                            {[...Array(firstDayOfMonth)].map((_, i) => (
                                <div key={`empty-${i}`} className="min-h-[100px] p-4 bg-[#0F0A09]/40" />
                            ))}

                            {[...Array(daysInMonth)].map((_, i) => {
                                const date = i + 1;
                                const isToday = new Date().toDateString() === new Date(viewDate.getFullYear(), viewDate.getMonth(), date).toDateString();
                                const isSelected = selectedDate?.toDateString() === new Date(viewDate.getFullYear(), viewDate.getMonth(), date).toDateString();

                                // Check if there's an event on this day
                                const hasEvent = EVENTS.some(e => {
                                    const d = new Date(e.date);
                                    return d.getDate() === date && d.getMonth() === viewDate.getMonth() && d.getFullYear() === viewDate.getFullYear();
                                });

                                return (
                                    <div
                                        key={date}
                                        onClick={() => setSelectedDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), date))}
                                        className={`min-h-[100px] p-4 cursor-pointer transition-all duration-300 group relative
                                            ${isSelected ? 'bg-ancient-amber/10' : 'hover:bg-white/[0.03]'}
                                            ${isToday ? 'border-t-2 border-ancient-amber/40' : ''}
                                        `}
                                    >
                                        <span className={`text-[12px] font-black ${isSelected ? 'text-ancient-amber' : 'text-white/40 group-hover:text-white'}`}>
                                            {date}
                                        </span>
                                        {hasEvent && (
                                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-ancient-amber shadow-[0_0_8px_rgba(255,184,0,0.8)]" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Existing List */}
                    <div className="glass-card-transparent p-8 border-white/5 bg-white/[0.02]">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                            <Layout size={16} className="text-ancient-amber" />
                            Existing Transmissions
                        </h3>
                        <div className="space-y-4">
                            {EVENTS.map((event: any) => (
                                <div key={event.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-ancient-amber/20 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-ancient-amber/10 flex flex-col items-center justify-center border border-ancient-amber/20">
                                            <span className="text-[10px] font-black text-ancient-amber leading-none">{event.day}</span>
                                            <span className="text-[7px] font-bold text-ancient-amber/60 uppercase">{event.month}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-[12px] font-black text-white uppercase tracking-tighter group-hover:text-ancient-amber transition-colors">{event.title}</h4>
                                            <p className="text-[9px] font-medium text-white/30 uppercase tracking-widest">{event.type} • {event.placement === 'left' ? 'Image Left' : 'Image Right'}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleEdit(event)}
                                        className="px-4 py-2 rounded-lg bg-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 hover:bg-ancient-amber hover:text-black transition-all"
                                    >
                                        Modify
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <div className="glass-card-transparent p-8 border-white/5">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-6 text-ancient-amber">Quick Stats</h4>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] font-medium text-white/30 uppercase">Upcoming Events</span>
                                <span className="text-xl font-black text-white">4</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] font-medium text-white/30 uppercase">Archived Memories</span>
                                <span className="text-xl font-black text-white">12</span>
                            </div>
                        </div>
                    </div>

                    {selectedDate && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card-transparent p-8 border-ancient-amber/20 bg-ancient-amber/[0.02]"
                        >
                            <h4 className="text-[10px] font-black text-ancient-amber uppercase tracking-widest mb-4">Selected Node</h4>
                            <p className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
                                {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                            <button
                                onClick={() => setIsFormOpen(true)}
                                className="w-full py-4 rounded-xl bg-white/5 text-white text-[10px] font-black uppercase tracking-widest hover:bg-ancient-amber hover:text-black transition-all"
                            >
                                Schedule Here
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Event Creation Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-md"
                        onClick={(e) => { if (e.target === e.currentTarget) setIsFormOpen(false); }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 40 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 40 }}
                            className="w-full max-w-4xl bg-[#1A1210] rounded-[3rem] p-12 border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]"
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Announce Transmission</h2>
                                    <p className="text-[10px] font-bold text-ancient-amber uppercase tracking-widest">
                                        Selected: {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
                                    </p>
                                </div>
                                <button onClick={() => setIsFormOpen(false)} className="p-3 bg-white/5 rounded-full text-white/40 hover:text-white transition-all"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Event Title</label>
                                            <input
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-ancient-amber/50 transition-all"
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                placeholder="e.g. Winter Solstice Healing"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Subtitle</label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-ancient-amber/50 transition-all"
                                                value={formData.subtitle}
                                                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                                placeholder="e.g. Chandra Varmam & Restoration"
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Type</label>
                                                <select
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none appearance-none"
                                                    value={formData.type}
                                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                                >
                                                    <option value="PHYSICAL WORKSHOP">PHYSICAL WORKSHOP</option>
                                                    <option value="VIRTUAL WEBINAR">VIRTUAL WEBINAR</option>
                                                    <option value="HEALING SESSION">HEALING SESSION</option>
                                                    <option value="RESIDENTIAL RETREAT">RESIDENTIAL RETREAT</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Tag</label>
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold"
                                                    value={formData.tag}
                                                    onChange={e => setFormData({ ...formData, tag: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                                <ImageIcon size={12} /> Poster Image
                                            </label>
                                            <div className="flex gap-4">
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold"
                                                    value={formData.image}
                                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                                    placeholder="/uploads/... or https://..."
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                                <Layout size={12} /> Image Placement
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, placement: 'left' })}
                                                    className={`py-4 rounded-xl border font-black text-[10px] tracking-widest uppercase transition-all
                                                        ${formData.placement === 'left' ? 'bg-ancient-amber text-black border-ancient-amber' : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'}
                                                    `}
                                                >
                                                    Left Side
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, placement: 'right' })}
                                                    className={`py-4 rounded-xl border font-black text-[10px] tracking-widest uppercase transition-all
                                                        ${formData.placement === 'right' ? 'bg-ancient-amber text-black border-ancient-amber' : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'}
                                                    `}
                                                >
                                                    Right Side
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                                <MapPin size={12} /> Location
                                            </label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold"
                                                value={formData.location}
                                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                placeholder="e.g. Chennai Coastal Retreat"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Description</label>
                                    <textarea
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-medium focus:outline-none min-h-[120px] resize-none"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                        <BookOpen size={12} className="text-ancient-amber" /> Wisdom Summary (for Memories)
                                    </label>
                                    <textarea
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-medium focus:outline-none min-h-[100px] resize-none border-ancient-amber/10"
                                        value={formData.wisdomSummary}
                                        onChange={e => setFormData({ ...formData, wisdomSummary: e.target.value })}
                                        placeholder="Enter the key insights and teachings from this session..."
                                    />
                                </div>

                                <div className="flex flex-col items-center gap-6">
                                    <button
                                        type="submit"
                                        disabled={status !== 'idle' || !selectedDate}
                                        className={`w-full max-w-md py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-500 shadow-xl
                                            ${status === 'success' ? 'bg-green-600' : 'bg-ancient-amber hover:shadow-[0_15px_40px_rgba(255,184,0,0.2)]'}
                                            ${!selectedDate ? 'opacity-50 cursor-not-allowed' : ''}
                                            text-black`}
                                    >
                                        {status === 'idle' && 'Confirm & Launch Transmission'}
                                        {status === 'submitting' && 'Syncing Nodes...'}
                                        {status === 'success' && <div className="flex items-center justify-center gap-2 text-white"><Check size={16} /> Transmission Live</div>}
                                    </button>
                                    {!selectedDate && status === 'idle' && (
                                        <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
                                            <AlertCircle size={14} /> Please select a date on the calendar first
                                        </p>
                                    )}
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
