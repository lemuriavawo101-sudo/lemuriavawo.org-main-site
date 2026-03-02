'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useGallery } from '@/hooks/useGallery';
import {
    Upload,
    Trash2,
    Edit3,
    Plus,
    Grid,
    Image as ImageIcon,
    Check,
    X,
    Sparkles,
    Palette,
    ArrowRight,
    Maximize2,
    Camera
} from 'lucide-react';

export default function AdminGalleryPage() {
    const { images, addImage, deleteImage, updateImage, restoreSeeds, isLoaded } = useGallery();
    const [isUploading, setIsUploading] = useState(false);
    const [editingImage, setEditingImage] = useState<any>(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isLoaded) return null; // Prevent hydration mismatch

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleDelete = (id: string) => {
        deleteImage(id);
    };

    const handleUploadSim = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const category = formData.get('category') as string;

        setIsUploading(true);
        setShowUploadModal(false);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            const newImage = {
                id: `gal-${Date.now()}`,
                title: title || 'New Transmission Entry',
                category: category || 'Uncategorized',
                image: base64String, // Store persistent Base64
                color: '#D4AF37'
            };
            addImage(newImage);
            setIsUploading(false);
            setSelectedFile(null);
            setPreviewUrl(null);
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        } else {
            // Fallback if somehow no file is selected
            const newImage = {
                id: `gal-${Date.now()}`,
                title: title || 'New Transmission Entry',
                category: category || 'Uncategorized',
                image: '/assets/adimurai_practitioner.png',
                color: '#D4AF37'
            };
            addImage(newImage);
            setIsUploading(false);
        }
    };

    const handleUpdateImage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const category = formData.get('category') as string;
        const color = formData.get('color') as string;

        updateImage({ ...editingImage, title, category, color });
        setEditingImage(null);
    };

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">Gallery Management</h1>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Cinematic Visual Asset System</p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            if (confirm('This will reset the gallery to its default state. Your current uploaded images will be replaced by the default seed data. Proceed?')) {
                                restoreSeeds();
                            }
                        }}
                        className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all flex items-center gap-3"
                    >
                        <Sparkles size={16} />
                        Restore Seeds
                    </button>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        disabled={isUploading}
                        className="px-8 py-4 rounded-xl bg-ancient-amber text-charcoal-deep text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)] flex items-center gap-3 disabled:opacity-50 disabled:scale-100"
                    >
                        {isUploading ? (
                            <div className="w-4 h-4 border-2 border-charcoal-deep/30 border-t-charcoal-deep rounded-full animate-spin" />
                        ) : (
                            <Upload size={16} />
                        )}
                        Upload Image
                    </button>
                </div>
            </header>

            {/* ... stats and grid ... */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Images', value: images.length, icon: ImageIcon, color: 'text-ancient-amber' },
                    { label: 'Categories', value: Array.from(new Set(images.map(i => i.category))).length, icon: Grid, color: 'text-blue-400' },
                    { label: 'Featured', value: 4, icon: Sparkles, color: 'text-purple-400' }
                ].map((stat, i) => (
                    <div key={i} className="glass-card-transparent p-6 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-white">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {images.map((img) => (
                        <motion.div
                            key={img.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="group glass-card-transparent overflow-hidden border-white/5 hover:border-white/10 transition-all flex flex-col"
                        >
                            <div className="relative aspect-square overflow-hidden bg-charcoal-deep p-2">
                                <Image
                                    src={img.image}
                                    alt={img.title}
                                    fill
                                    className="object-cover rounded-lg opacity-60 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                                    <button
                                        className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                                        onClick={() => setEditingImage(img)}
                                    >
                                        <Edit3 size={14} />
                                    </button>
                                    <button
                                        className="w-8 h-8 rounded-lg bg-red-500/10 backdrop-blur-md border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-all"
                                        onClick={() => handleDelete(img.id)}
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                <div
                                    className="absolute bottom-4 left-4 px-2 py-0.5 rounded bg-white/10 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase text-white/60 tracking-widest"
                                    style={{ borderLeft: `2px solid ${img.color}` }}
                                >
                                    {img.category}
                                </div>
                            </div>
                            <div className="p-4 flex flex-col gap-1">
                                <h4 className="text-[11px] font-black text-white uppercase truncate tracking-tight">{img.title}</h4>
                                <p className="text-[9px] text-white/30 font-bold tracking-widest uppercase truncate">{img.id}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Upload Modal */}
            <AnimatePresence>
                {showUploadModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-charcoal-black/90 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-charcoal-deep border border-white/10 rounded-3xl p-8 w-full max-w-lg shadow-2xl relative"
                        >
                            <button
                                className="absolute top-6 right-6 text-white/30 hover:text-white transition-all"
                                onClick={() => setShowUploadModal(false)}
                            >
                                <X size={20} />
                            </button>

                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-8 italic flex items-center gap-3">
                                <Upload className="text-ancient-amber" /> Initialize Asset Upload
                            </h3>

                            <form onSubmit={handleUploadSim} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Asset Title</label>
                                    <input
                                        name="title"
                                        type="text"
                                        required
                                        placeholder="e.g. Master Practitioner in Deep Focus"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ancient-amber/40 transition-all placeholder:text-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Category (Sub-heading)</label>
                                    <select
                                        name="category"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ancient-amber/40 transition-all appearance-none"
                                    >
                                        <option>Syllabus</option>
                                        <option>Training</option>
                                        <option>Gathering</option>
                                        <option>Legacy</option>
                                        <option>Transmission</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Visual Asset (Image)</label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full aspect-video bg-white/5 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-all overflow-hidden relative group/upload"
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept="image/*"
                                        />

                                        {previewUrl ? (
                                            <div className="absolute inset-0">
                                                <Image
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    fill
                                                    className="object-cover opacity-80 group-hover/upload:opacity-100 transition-opacity"
                                                />
                                                <div className="absolute inset-0 bg-charcoal-deep/40 flex items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-opacity">
                                                    <span className="text-[9px] font-black text-white uppercase tracking-widest bg-charcoal-deep/60 px-4 py-2 rounded-full backdrop-blur-md">Change Selection</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/20 mb-3 group-hover/upload:text-ancient-amber group-hover/upload:bg-ancient-amber/10 transition-all">
                                                    <ImageIcon size={24} />
                                                </div>
                                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Select Image File</p>
                                                <p className="text-[8px] text-white/20 uppercase mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="submit"
                                        className="flex-grow py-4 rounded-xl bg-ancient-amber text-charcoal-deep text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                    >
                                        <Check size={14} /> Begin Transmission
                                    </button>
                                    <button
                                        type="button"
                                        className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60 hover:bg-white/10 transition-all"
                                        onClick={() => setShowUploadModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Modal */}
            <AnimatePresence>
                {editingImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-charcoal-black/90 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-charcoal-deep border border-white/10 rounded-3xl p-8 w-full max-w-lg shadow-2xl relative"
                        >
                            <button
                                className="absolute top-6 right-6 text-white/30 hover:text-white transition-all"
                                onClick={() => setEditingImage(null)}
                            >
                                <X size={20} />
                            </button>

                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-8 italic flex items-center gap-3">
                                <Palette className="text-ancient-amber" /> Image Intel Meta
                            </h3>

                            <form onSubmit={handleUpdateImage} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Asset Title</label>
                                    <input
                                        name="title"
                                        type="text"
                                        defaultValue={editingImage.title}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ancient-amber/40 transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Category</label>
                                        <select
                                            name="category"
                                            defaultValue={editingImage.category}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-ancient-amber/40 transition-all appearance-none"
                                        >
                                            <option>Syllabus</option>
                                            <option>Training</option>
                                            <option>Gathering</option>
                                            <option>Legacy</option>
                                            <option>Transmission</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Ambient Accent</label>
                                        <div className="flex gap-3">
                                            <input
                                                name="color"
                                                type="color"
                                                defaultValue={editingImage.color}
                                                className="w-12 h-12 bg-transparent border-none rounded-xl cursor-pointer"
                                            />
                                            <div className="flex-grow bg-white/5 border border-white/10 rounded-xl flex items-center px-4 font-mono text-[10px] text-white/50 uppercase tracking-widest">
                                                {editingImage.color}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="submit"
                                        className="flex-grow py-4 rounded-xl bg-ancient-amber text-charcoal-deep text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                    >
                                        <Check size={14} /> Commit Changes
                                    </button>
                                    <button
                                        type="button"
                                        className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60 hover:bg-white/10 transition-all"
                                        onClick={() => setEditingImage(null)}
                                    >
                                        Discard
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
