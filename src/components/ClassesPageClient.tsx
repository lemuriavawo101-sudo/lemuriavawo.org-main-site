'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Award, BookOpen, Clock, Star, MapPin, Calendar, Download, Shield, ArrowRight, Loader2, CheckCircle2, AlertCircle, X, FileText, Send } from 'lucide-react';
import Image from 'next/image';
import { CLASSES, CAMPS, CERTIFICATES, STUDENT_RECORDS } from '@/lib/constants';
import EnquiryModal from './EnquiryModal';
import { EnquiryType } from './EnquiryForm';

function BokehParticles() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: Math.random() * 300 + 100,
                        height: Math.random() * 300 + 100,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)',
                    }}
                    animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}

function SectionHeader({ title, subtitle, description, accent }: { title: string, subtitle: string, description: string, accent?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-ancient-amber/60" />
                <p className="text-ancient-amber text-[10px] font-black uppercase tracking-[0.45em] opacity-80">
                    {subtitle}
                </p>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-charcoal-deep leading-[0.95] mb-6">
                {title.split(' ')[0]}<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #B8860B' }}>
                    {title.split(' ').slice(1).join(' ')}
                </span>
            </h2>
            <p className="text-charcoal-deep/40 text-sm md:text-base font-medium tracking-wide max-w-sm leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}

export default function ClassesPageClient() {
    const mainRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: mainRef });
    const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });

    // Certificate Portal State
    const [laNumber, setLaNumber] = useState('');
    const [uniNumber, setUniNumber] = useState('');
    const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [foundRecords, setFoundRecords] = useState<any[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    // Enquiry Modal State
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
    const [enquiryType, setEnquiryType] = useState<EnquiryType>('SEAT_APPLICATION');
    const [enquiryTitle, setEnquiryTitle] = useState('');
    const [enquirySubtitle, setEnquirySubtitle] = useState('');

    const openEnquiry = (type: EnquiryType, title: string, subtitle: string) => {
        setEnquiryType(type);
        setEnquiryTitle(title);
        setEnquirySubtitle(subtitle);
        setIsEnquiryOpen(true);
    };

    const handleDownload = async () => {
        const hasLA = laNumber.trim().length > 0;
        const hasUni = uniNumber.trim().length > 0;

        if (!hasLA && !hasUni) {
            setFoundRecords([]);
            setStatus('error');
            setErrorMsg('Please enter either an LA Number or a University ID.');
            return;
        }

        if (hasLA && !laNumber.includes('LA-')) {
            setFoundRecords([]);
            setStatus('error');
            setErrorMsg('Invalid LA Number format (Expected: LA-XXXX)');
            return;
        }

        if (hasUni && !uniNumber.includes('TPM440')) {
            setFoundRecords([]);
            setStatus('error');
            setErrorMsg('Invalid University ID format (Expected: TPM440XXX)');
            return;
        }

        setStatus('verifying');
        setFoundRecords([]);

        // Real Lookup supporting optional fields - Filter for ALL matching certificates
        const records = STUDENT_RECORDS.filter(r => {
            const laMatch = !hasLA || r.la_number === laNumber.trim();
            const uniMatch = !hasUni || r.university_id === uniNumber.trim();

            return (hasLA ? laMatch : true) && (hasUni ? uniMatch : true) &&
                ((hasLA && r.la_number === laNumber.trim()) || (hasUni && r.university_id === uniNumber.trim()));
        });

        await new Promise(resolve => setTimeout(resolve, 2000));

        if (records.length > 0) {
            setFoundRecords(records);
            setStatus('success');
        } else {
            setFoundRecords([]);
            setStatus('error');
            setErrorMsg('Record not found in the archives. Please verify your credentials.');
        }
    };

    const handleFileDownload = async (url: string, fileName?: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = blobUrl;
            a.download = fileName || 'certificate';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download error, falling back to window.open:', error);
            window.open(url, '_blank');
        }
    };

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 60 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 60 });

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <div
            ref={mainRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen bg-ivory-light overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #FAF9F6 0%, #F5EDD8 20%, #F9F5ED 50%, #F5EDD8 80%, #FAF9F6 100%)',
            }}
        >
            {/* Dynamic light follower */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-[1]"
                style={{
                    background: useTransform(
                        [smoothX, smoothY],
                        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(212, 175, 55, 0.04), transparent 60%)`
                    ),
                }}
            />

            <BokehParticles />

            {/* Content Sections */}
            <div className="relative z-10 container mx-auto px-8 md:px-16 pt-40 pb-32">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-32 text-center"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-ancient-amber mb-6 block">The Transmission Pipeline</span>
                    <h1 className="text-6xl md:text-9xl font-black text-charcoal-deep uppercase tracking-tighter leading-[0.85] mb-8">
                        Our<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px #1A1A1A' }}>Syllabus</span>
                    </h1>
                    <div className="w-24 h-1 bg-ancient-amber mx-auto mb-8" />
                    <p className="text-lg md:text-xl text-charcoal-deep/60 font-bold max-w-2xl mx-auto leading-relaxed">
                        From fundamental vital point theory to advanced restorative healing and nocturnal combat mastery. Your path is recorded in time.
                    </p>
                </motion.div>

                {/* Our Classes Section */}
                <section id="our-classes" className="mb-40">
                    <SectionHeader
                        title="Our Classes"
                        subtitle="Weekly Transmission"
                        description="Regular sessions designed for consistent growth in Varmakalai and Adimurai."
                    />

                    <div className="grid lg:grid-cols-3 gap-8">
                        {CLASSES.map((cls, idx) => (
                            <motion.div
                                key={cls.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                                className="group/card relative glass-card-transparent p-8 rounded-3xl border border-charcoal-deep/5 hover:border-ancient-amber/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(212,175,55,0.1)] flex flex-col h-full overflow-hidden"
                            >
                                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6">
                                    <Image src={cls.image} alt={cls.title} fill className="object-cover transition-transform duration-700 group-hover/card:scale-110 opacity-70 group-hover/card:opacity-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/60 to-transparent" />
                                </div>
                                <span className="text-[9px] font-black tracking-[0.3em] uppercase text-ancient-amber mb-3 block">{cls.subtitle}</span>
                                <h3 className="text-2xl font-black text-charcoal-deep uppercase tracking-tight mb-4 group-hover/card:text-ancient-amber transition-colors">{cls.title}</h3>
                                <p className="text-sm text-charcoal-deep/60 mb-6 leading-relaxed font-medium flex-grow">{cls.description}</p>

                                <div className="pt-6 border-t border-charcoal-deep/5 space-y-3">
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-charcoal-deep/40 uppercase tracking-widest">
                                        <Clock size={12} className="text-ancient-amber" /> {cls.duration} · {cls.level}
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-charcoal-deep/40 uppercase tracking-widest">
                                        <Calendar size={12} className="text-ancient-amber" /> {cls.schedule}
                                    </div>
                                </div>
                                <button
                                    onClick={() => openEnquiry('SEAT_APPLICATION', `Apply for ${cls.title}`, `Mastery Path: ${cls.subtitle}`)}
                                    className="mt-8 w-full py-4 rounded-xl bg-charcoal-deep text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-ancient-amber transition-colors active:scale-95 shadow-lg"
                                >
                                    Apply for Seat
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Camps Section */}
                <section id="camps" className="mb-40">
                    <SectionHeader
                        title="Intensive Camps"
                        subtitle="Deep Immersions"
                        description="Gurukulam-style residential deep dives into advanced Tamil martial sciences."
                    />

                    <div className="grid md:grid-cols-2 gap-10">
                        {CAMPS.map((camp, idx) => (
                            <motion.div
                                key={camp.id}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                                className="group relative flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl border border-charcoal-deep/5 hover:border-ancient-amber/20 transition-all"
                            >
                                <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                                    <Image src={camp.image} alt={camp.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute top-5 left-5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-[9px] font-black uppercase tracking-[0.2em] text-white">
                                        {camp.tag}
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 p-8 md:p-10 bg-white/40 backdrop-blur-xl flex flex-col justify-center">
                                    <span className="text-[10px] font-black text-ancient-amber uppercase tracking-[0.25em] mb-4">{camp.date}</span>
                                    <h3 className="text-2xl md:text-3xl font-serif text-charcoal-deep mb-4 leading-tight">{camp.title}</h3>
                                    <p className="text-sm text-charcoal-deep/60 leading-relaxed font-medium mb-6">{camp.description}</p>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-charcoal-deep/40 uppercase tracking-[0.2em] mb-8">
                                        <MapPin size={12} className="text-ancient-amber" /> {camp.location}
                                    </div>
                                    <div className="flex flex-wrap gap-6 mt-auto">
                                        <button
                                            onClick={() => openEnquiry('CAMP_REGISTRATION', `Enroll in ${camp.title}`, `${camp.tag} • ${camp.date}`)}
                                            className="px-8 py-3 rounded-xl bg-ancient-amber text-charcoal-deep text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95"
                                        >
                                            Register for Camp
                                        </button>
                                        <button className="flex items-center gap-3 text-[10px] font-black text-charcoal-deep/40 uppercase tracking-widest hover:text-ancient-amber transition-colors group/link">
                                            Itinerary <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Certificates Section */}
                <section id="certificates" className="mb-20">
                    <SectionHeader
                        title="Certification Paths"
                        subtitle="The Path to Mastery"
                        description="The hierarchy of knowledge. Attain recognition through rigorous testing and lineage validation."
                    />

                    <div className="grid lg:grid-cols-2 gap-8">
                        {CERTIFICATES.map((cert, idx) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: idx * 0.15 }}
                                className="glass-card-transparent p-10 rounded-[2.5rem] border border-ancient-amber/10 hover:border-ancient-amber/40 transition-all duration-700 relative overflow-hidden group/cert"
                            >
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-ancient-amber/5 rounded-full blur-3xl group-hover/cert:bg-ancient-amber/10 transition-all" />
                                <div className="flex items-start gap-6 relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-charcoal-deep flex items-center justify-center text-ancient-amber shadow-2xl shrink-0">
                                        <Award size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-charcoal-deep uppercase tracking-tighter mb-4">{cert.title}</h3>
                                        <p className="text-sm text-charcoal-deep/60 mb-6 leading-relaxed font-medium">{cert.description}</p>

                                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-charcoal-deep/5">
                                            <div>
                                                <span className="text-[8px] font-black uppercase text-ancient-amber tracking-[0.3em] block mb-2">Requirement</span>
                                                <p className="text-[10px] font-bold text-charcoal-deep/70 uppercase tracking-widest">{cert.prerequisite}</p>
                                            </div>
                                            <div>
                                                <span className="text-[8px] font-black uppercase text-ancient-amber tracking-[0.3em] block mb-2">Duration</span>
                                                <p className="text-[10px] font-bold text-charcoal-deep/70 uppercase tracking-widest">{cert.duration}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Certificate Download Portal */}
                <section id="download-portal" className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="glass-card-transparent p-12 md:p-16 rounded-[3rem] border-ancient-amber/20 relative overflow-hidden">
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-ancient-amber/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                            <div className="relative z-10 flex flex-col items-center text-center mb-12">
                                <div className="w-20 h-20 rounded-2xl bg-charcoal-deep flex items-center justify-center text-ancient-amber shadow-2xl mb-8">
                                    <Download size={36} />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-charcoal-deep uppercase tracking-tighter mb-4">
                                    Certificate <span className="text-transparent" style={{ WebkitTextStroke: '1px #1A1A1A' }}>Portal</span>
                                </h2>
                                <p className="text-sm text-charcoal-deep/50 font-medium max-w-md">
                                    Enter your credentials below to verify your lineage status and download your digital certificates.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                {/* LA Number Input */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-ancient-amber ml-2">LA Number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="LA-XXXX"
                                            value={laNumber}
                                            onChange={(e) => {
                                                setLaNumber(e.target.value.toUpperCase());
                                                if (status === 'error') setStatus('idle');
                                            }}
                                            className="w-full bg-white/50 backdrop-blur-md border border-charcoal-deep/5 rounded-2xl px-6 py-4 text-sm font-bold text-charcoal-deep focus:outline-none focus:border-ancient-amber/50 transition-all placeholder:text-charcoal-deep/20"
                                        />
                                    </div>
                                </div>

                                {/* University ID Input */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-ancient-amber ml-2">University ID</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="TPM440XXX"
                                            value={uniNumber}
                                            onChange={(e) => {
                                                setUniNumber(e.target.value.toUpperCase());
                                                if (status === 'error') setStatus('idle');
                                            }}
                                            className="w-full bg-white/50 backdrop-blur-md border border-charcoal-deep/5 rounded-2xl px-6 py-4 text-sm font-bold text-charcoal-deep focus:outline-none focus:border-ancient-amber/50 transition-all placeholder:text-charcoal-deep/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleDownload}
                                    disabled={status === 'verifying'}
                                    className={`relative w-full max-w-md py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-500 overflow-hidden shadow-xl
                                        ${status === 'verifying' ? 'bg-charcoal-deep/80 cursor-wait' :
                                            status === 'success' ? 'bg-green-600' :
                                                status === 'error' ? 'bg-red-900' : 'bg-charcoal-deep hover:bg-ancient-amber hover:shadow-[0_15px_40px_rgba(212,175,55,0.3)]'}
                                        text-white`}
                                >
                                    {status === 'verifying' ? (
                                        <div className="flex items-center gap-3 justify-center">
                                            <Loader2 size={16} className="animate-spin" />
                                            Verifying Lineage...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 justify-center group">
                                            Verify & Access Certificates
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    )}
                                </motion.button>
                            </div>

                            <AnimatePresence>
                                {status === 'success' && foundRecords.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-12 border-t border-charcoal-deep/5 mt-10">
                                            <div className="flex items-center justify-between mb-8">
                                                <div>
                                                    <h3 className="text-xl font-black text-charcoal-deep uppercase tracking-tighter">Lineage Verified</h3>
                                                    <p className="text-[10px] font-bold text-ancient-amber uppercase tracking-[0.2em]">{foundRecords.length} Certificate(s) Available</p>
                                                </div>
                                                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                                                    <CheckCircle2 size={24} />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                {foundRecords.map((record, ridx) => (
                                                    <motion.div
                                                        key={record.id || ridx}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: ridx * 0.1 }}
                                                        className="flex items-center justify-between p-6 rounded-2xl bg-white/40 border border-charcoal-deep/5 hover:border-ancient-amber/30 transition-all group/item"
                                                    >
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-12 h-12 rounded-xl bg-charcoal-deep flex items-center justify-center text-ancient-amber shadow-lg">
                                                                <Award size={24} />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-black text-charcoal-deep uppercase tracking-tight leading-none mb-2">{record.course_title}</h4>
                                                                <p className="text-[9px] font-bold text-charcoal-deep/30 uppercase tracking-widest">Issued: {record.issue_date}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedRecord(record);
                                                                    setIsPreviewOpen(true);
                                                                }}
                                                                className="px-6 py-3 rounded-full bg-charcoal-deep text-white text-[9px] font-black uppercase tracking-widest hover:bg-ancient-amber transition-colors flex items-center gap-2"
                                                            >
                                                                <FileText size={14} /> Preview
                                                            </button>
                                                            <button
                                                                onClick={() => handleFileDownload(record.certificate_url, `${record.student_name.replace(/\s+/g, '_')}_Certificate`)}
                                                                className="w-12 h-12 rounded-full border border-charcoal-deep/10 flex items-center justify-center text-charcoal-deep hover:bg-charcoal-deep hover:text-white transition-all"
                                                                title="Download Certificate"
                                                            >
                                                                <Download size={16} />
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-8 flex items-center gap-3 p-5 rounded-2xl bg-red-50 border border-red-100 text-red-600"
                                    >
                                        <AlertCircle size={20} className="shrink-0" />
                                        <p className="text-[11px] font-bold uppercase tracking-wide">{errorMsg}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </section>
            </div>

            {/* Ancient Text Backdrop */}
            <div className="absolute top-1/4 -left-20 text-[20vw] font-black text-ancient-amber/5 pointer-events-none select-none uppercase tracking-tighter -rotate-90">
                VARMAKALAI
            </div>
            <div className="absolute bottom-1/4 -right-20 text-[20vw] font-black text-ancient-amber/5 pointer-events-none select-none uppercase tracking-tighter rotate-90">
                ADIMURAI
            </div>

            {/* Certificate Preview Modal */}
            <AnimatePresence>
                {isPreviewOpen && selectedRecord && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsPreviewOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="relative w-full max-w-5xl h-[90vh] bg-[#fbfbfb] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col border border-white/20"
                        >
                            {/* Modal Header */}
                            <div className="p-8 md:px-12 md:py-8 border-b border-charcoal-deep/5 flex items-center justify-between bg-white/40 backdrop-blur-md relative z-10">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-charcoal-deep flex items-center justify-center text-ancient-amber">
                                        <Shield size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-charcoal-deep uppercase tracking-tighter leading-none mb-2">{selectedRecord.course_title}</h3>
                                        <p className="text-[10px] font-bold text-charcoal-deep/40 uppercase tracking-widest">Verification ID: {selectedRecord.id || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleFileDownload(selectedRecord.certificate_url, `${selectedRecord.student_name.replace(/\s+/g, '_')}_Certificate`)}
                                        className="hidden md:flex items-center gap-3 px-8 py-3 rounded-full bg-ancient-amber text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,184,0,0.2)]"
                                    >
                                        <Download size={16} /> Download PDF
                                    </button>
                                    <button
                                        onClick={() => setIsPreviewOpen(false)}
                                        className="w-12 h-12 rounded-full bg-charcoal-deep/5 flex items-center justify-center text-charcoal-deep hover:bg-charcoal-deep hover:text-white transition-all shadow-lg"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Preview Area (PDF/Image) */}
                            <div className="flex-1 bg-charcoal-deep/5 relative group overflow-auto flex items-center justify-center p-8">
                                {selectedRecord.certificate_url?.match(/\.(pdf)$/i) ? (
                                    <iframe
                                        src={`${selectedRecord.certificate_url}#toolbar=0&navpanes=0&scrollbar=0`}
                                        className="w-full h-full border-none shadow-2xl"
                                        title="Certificate Preview"
                                    />
                                ) : (
                                    <div className="relative w-full h-full min-h-[400px]">
                                        <Image
                                            src={selectedRecord.certificate_url || '/placeholder.png'}
                                            alt="Certificate Preview"
                                            fill
                                            className="object-contain shadow-2xl"
                                        />
                                    </div>
                                )}
                                {/* Overlay to prevent iframe interactions if needed for aesthetic */}
                                <div className="absolute inset-0 pointer-events-none border-[20px] border-white/10" />
                            </div>

                            {/* Footer Info */}
                            <div className="p-6 md:px-12 bg-white/40 backdrop-blur-md border-t border-charcoal-deep/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-8">
                                    <div>
                                        <span className="text-[8px] font-black uppercase text-ancient-amber tracking-widest block mb-1">Practitioner</span>
                                        <p className="text-sm font-bold text-charcoal-deep uppercase tracking-tighter">{selectedRecord.student_name}</p>
                                    </div>
                                    <div className="h-8 w-px bg-charcoal-deep/5" />
                                    <div>
                                        <span className="text-[8px] font-black uppercase text-ancient-amber tracking-widest block mb-1">Issued On</span>
                                        <p className="text-sm font-bold text-charcoal-deep uppercase tracking-tighter">{selectedRecord.issue_date}</p>
                                    </div>
                                </div>
                                <div className="md:hidden">
                                    <button
                                        onClick={() => handleFileDownload(selectedRecord.certificate_url, `${selectedRecord.student_name.replace(/\s+/g, '_')}_Certificate`)}
                                        className="w-full py-4 rounded-xl bg-charcoal-deep text-white text-[10px] font-black uppercase tracking-widest"
                                    >
                                        Download Certificate
                                    </button>
                                </div>
                                <div className="hidden md:block">
                                    <p className="text-[9px] font-bold text-charcoal-deep/30 uppercase tracking-[0.3em]">Lemuria Varmakalari Adimurai World Organization · Verified Digital Credential</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <EnquiryModal
                isOpen={isEnquiryOpen}
                onClose={() => setIsEnquiryOpen(false)}
                type={enquiryType}
                title={enquiryTitle}
                subtitle={enquirySubtitle}
            />
        </div>
    );
}
