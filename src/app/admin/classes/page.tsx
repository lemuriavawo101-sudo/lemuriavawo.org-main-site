'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Plus, Edit2, Trash2, MapPin, Clock, Star, X, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { CLASSES, CAMPS } from '@/lib/constants';
import { saveToSeedsAction } from '@/lib/actions/data';

type TabType = 'CLASSES' | 'CAMPS';

export default function AdminClassesPage() {
    const [activeTab, setActiveTab] = useState<TabType>('CLASSES');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [editingItem, setEditingItem] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        duration: '',
        schedule: '',
        level: 'Entry Level',
        location: '',
        date: '',
        tag: '',
        image: '/assets/adimurai_practitioner.png',
        color: '#D4AF37'
    });

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            subtitle: item.subtitle || '',
            description: item.description,
            duration: item.duration || '',
            schedule: item.schedule || '',
            level: item.level || 'Entry Level',
            location: item.location || '',
            date: item.date || '',
            tag: item.tag || '',
            image: item.image,
            color: item.color
        });
        setIsFormOpen(true);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const newItem = {
            ...formData,
            id: editingItem?.id || Date.now().toString()
        };

        const currentList = activeTab === 'CLASSES' ? CLASSES : CAMPS;
        let updatedList;

        if (editingItem) {
            updatedList = currentList.map((item: any) => item.id === editingItem.id ? newItem : item);
        } else {
            updatedList = [...currentList, newItem];
        }

        const category = activeTab === 'CLASSES' ? 'classes' : 'camps';
        const result = await saveToSeedsAction(category, updatedList);

        if (result.success) {
            setStatus('success');
            setTimeout(() => {
                setIsFormOpen(false);
                setStatus('idle');
                setEditingItem(null);
                setFormData({
                    title: '', subtitle: '', description: '', duration: '', schedule: '',
                    level: 'Entry Level', location: '', date: '', tag: '',
                    image: '/assets/adimurai_practitioner.png', color: '#D4AF37'
                });
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
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">Syllabus Management</h1>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Curriculum & Immersions Control</p>
                </div>
                <button
                    onClick={() => { setEditingItem(null); setIsFormOpen(true); }}
                    className="flex items-center gap-3 px-6 py-3 bg-ancient-amber rounded-xl text-[10px] font-black uppercase tracking-widest text-black hover:scale-105 transition-all"
                >
                    <Plus size={14} /> Add {activeTab === 'CLASSES' ? 'Class' : 'Camp'}
                </button>
            </header>

            {/* Tab Navigation */}
            <div className="flex gap-4 border-b border-white/5 pb-px">
                {(['CLASSES', 'CAMPS'] as TabType[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all
                            ${activeTab === tab ? 'text-ancient-amber' : 'text-white/30 hover:text-white'}
                        `}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-ancient-amber" />
                        )}
                    </button>
                ))}
            </div>

            {/* Grid View */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeTab === 'CLASSES' ? CLASSES : CAMPS).map((item: any) => (
                    <motion.div
                        key={item.id}
                        layout
                        className="glass-card-transparent p-6 border-white/5 bg-white/[0.02] group hover:border-ancient-amber/20 transition-all duration-500"
                    >
                        <div className="relative h-40 rounded-2xl overflow-hidden mb-6 bg-charcoal-deep border border-white/5">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white/40 hover:text-ancient-amber transition-all"
                                >
                                    <Edit2 size={14} />
                                </button>
                                <button className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white/40 hover:text-red-400 transition-all"><Trash2 size={14} /></button>
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded bg-black/60 text-ancient-amber border border-ancient-amber/20 backdrop-blur-md">
                                    {activeTab === 'CLASSES' ? item.level : item.tag}
                                </span>
                            </div>
                        </div>

                        <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-1">{item.title}</h4>
                        <p className="text-[10px] font-bold text-ancient-amber uppercase tracking-widest mb-4 opacity-80">{item.subtitle || item.location}</p>
                        <p className="text-[11px] text-white/40 font-medium leading-relaxed mb-6 line-clamp-2">{item.description}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <Clock size={12} className="text-white/20" />
                                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">{item.duration || item.date}</span>
                            </div>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal Form */}
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
                                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                                        {editingItem ? 'Modify' : 'New'} {activeTab === 'CLASSES' ? 'Class Node' : 'Camp Immersion'}
                                    </h2>
                                    <p className="text-[10px] font-bold text-ancient-amber uppercase tracking-widest">Master Curriculum Sync</p>
                                </div>
                                <button onClick={() => setIsFormOpen(false)} className="p-3 bg-white/5 rounded-full text-white/40 hover:text-white transition-all"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Title</label>
                                            <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                        </div>

                                        {activeTab === 'CLASSES' ? (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Subtitle</label>
                                                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Duration</label>
                                                        <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Level</label>
                                                        <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })} />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Location</label>
                                                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Date Range</label>
                                                        <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Tag</label>
                                                        <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" value={formData.tag} onChange={e => setFormData({ ...formData, tag: e.target.value })} />
                                                    </div>
                                                </div>
                                            </>
                                        )}
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
                                                    placeholder="/assets/... or https://..."
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Accent Color (HEX)</label>
                                            <div className="flex gap-4">
                                                <input className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-mono" value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} />
                                                <div className="w-14 h-14 rounded-2xl border border-white/10" style={{ backgroundColor: formData.color }} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Schedule Details</label>
                                            <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" value={formData.schedule} onChange={e => setFormData({ ...formData, schedule: e.target.value })} placeholder="e.g. Mon & Wed | 7:00 PM" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Full Description</label>
                                    <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-medium min-h-[120px] resize-none" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                </div>

                                <div className="flex flex-col items-center gap-6">
                                    <button
                                        type="submit"
                                        disabled={status !== 'idle'}
                                        className={`w-full max-w-md py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-500
                                            ${status === 'success' ? 'bg-green-600' : 'bg-ancient-amber hover:shadow-[0_15px_40px_rgba(255,184,0,0.2)]'}
                                            text-black shadow-xl`}
                                    >
                                        {status === 'idle' && (editingItem ? 'Update Node' : 'Deploy Syllabus')}
                                        {status === 'submitting' && 'Syncing Curriculum...'}
                                        {status === 'success' && <div className="flex items-center justify-center gap-2 text-white"><Check size={16} /> Matrix Updated</div>}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
