'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Youtube, ArrowRight, Zap, Shield, Send } from 'lucide-react';
import { motion, useSpring, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';
import FloatingParticles from '@/components/FloatingParticles';

export default function Footer() {
    const pathname = usePathname();
    const isAdminOrRegister = pathname?.startsWith('/admin') || pathname === '/register';

    if (isAdminOrRegister) return null;

    return <FooterContent />;
}

function FooterContent() {
    const footerRef = useRef<HTMLElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 80 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 80 });

    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"]
    });

    const parallaxText = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const flareMove = useTransform(scrollYProgress, [0, 1], ["-20%", "120%"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <footer
            ref={footerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full py-32 px-8 md:px-16 overflow-hidden"
            style={{ background: '#F8F5EF' }}
        >
            {/* ── Parchment Background Radial Glow ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at bottom, rgba(212,187,144,0.18) 0%, transparent 70%)' }}
            />

            {/* ── Sacred Geometry Grid Overlay (matches AnatomyOfPower) ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(139,115,85,0.06) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(139,115,85,0.06) 1px, transparent 1px)`,
                    backgroundSize: '3rem 3rem',
                    maskImage: 'radial-gradient(ellipse 80% 90% at 50% 100%, #000 50%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 50% 100%, #000 50%, transparent 100%)',
                }}
            />

            {/* ── HUD Fine Grid ── */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(to right, #3A2F2B 1px, transparent 1px), linear-gradient(to bottom, #3A2F2B 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* ── Warm Vignette ── */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{ boxShadow: 'inset 0 0 200px rgba(139,115,85,0.12)' }}
            />

            {/* ── Dynamic Mouse Ambient ── */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 opacity-50"
                style={{
                    background: useTransform(
                        [smoothX, smoothY],
                        ([x, y]) => `radial-gradient(700px circle at ${x}px ${y}px, rgba(212,175,55,0.08), transparent 70%)`
                    )
                }}
            />

            {/* ── Anamorphic Gold Flares ── */}
            <motion.div
                style={{ position: 'absolute', top: '20%', left: flareMove, width: '55%', height: '1px', pointerEvents: 'none', zIndex: 0, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.25), transparent)' }}
            />
            <motion.div
                style={{ position: 'absolute', top: '70%', right: flareMove, width: '35%', height: '1px', pointerEvents: 'none', zIndex: 0, background: 'linear-gradient(to right, transparent, rgba(168,142,107,0.18), transparent)' }}
            />

            {/* ── Top Separator — gold gradient line ── */}
            <div
                className="absolute top-0 left-0 w-full h-px pointer-events-none z-10"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5) 30%, rgba(168,142,107,0.4) 70%, transparent)',
                    boxShadow: '0 0 20px rgba(212,175,55,0.2)'
                }}
            />

            <FloatingParticles />

            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex flex-col gap-24 overflow-hidden group"
                    style={{
                        background: 'rgba(255,252,245,0.5)',
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: '1px solid rgba(212,175,55,0.22)',
                        borderRadius: '2rem',
                        boxShadow: '0 40px 100px -20px rgba(139,115,85,0.16), inset 0 1px 0 rgba(255,255,255,0.55)',
                        padding: 'clamp(2rem, 5vw, 5rem)',
                    }}
                >
                    {/* ── Inner fine grid on panel ── */}
                    <div
                        className="absolute inset-0 pointer-events-none rounded-[2rem] opacity-[0.035]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(139,115,85,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,115,85,1) 1px, transparent 1px)',
                            backgroundSize: '3rem 3rem',
                        }}
                    />

                    {/* ── HUD Corner Accents ── */}
                    <div
                        className="absolute top-0 left-0 w-32 h-32 pointer-events-none transition-all duration-1000 opacity-40 group-hover:opacity-80"
                        style={{ borderTop: '1px solid rgba(212,175,55,0.5)', borderLeft: '1px solid rgba(212,175,55,0.5)', borderRadius: '2rem 0 0 0' }}
                    />
                    <div
                        className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none transition-all duration-1000 opacity-40 group-hover:opacity-80"
                        style={{ borderBottom: '1px solid rgba(212,175,55,0.5)', borderRight: '1px solid rgba(212,175,55,0.5)', borderRadius: '0 0 2rem 0' }}
                    />

                    {/* ── Floating HUD label ── */}
                    <div className="absolute top-8 right-12 flex items-center gap-4 pointer-events-none opacity-20 group-hover:opacity-60 transition-all duration-700">
                        <div className="flex gap-1.5">
                            {[1, 2, 3].map(i => (
                                <div
                                    key={i}
                                    className="w-1 h-4 rounded-full animate-pulse"
                                    style={{ background: '#D4AF37', animationDelay: `${i * 0.3}s` }}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.6em]" style={{ color: 'rgba(58,47,43,0.6)' }}>
                            Cinematic Protocol: Active
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20">
                        {/* Left Column: Logo & Description */}
                        <div className="lg:col-span-5 flex flex-col gap-10">
                            <div className="flex items-center gap-5 group/logo">
                                <motion.div
                                    whileHover={{ rotate: 180, scale: 1.1 }}
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-1000"
                                    style={{
                                        border: '1px solid rgba(212,175,55,0.35)',
                                        color: '#8B7355',
                                        background: 'rgba(212,175,55,0.07)',
                                    }}
                                >
                                    <Zap size={24} />
                                </motion.div>
                                <div className="flex flex-col">
                                    <div className="font-black text-4xl tracking-tighter leading-none" style={{ color: '#2A2015' }}>Lemuria VAWO</div>
                                    <span className="text-[8px] font-black uppercase tracking-[0.4em] mt-2 block" style={{ color: '#8B7355' }}>Varmakalari Adimurai World Org</span>
                                </div>
                            </div>
                            <p className="text-base font-semibold leading-relaxed max-w-sm" style={{ color: 'rgba(58,47,43,0.75)' }}>
                                Honoring the gravity-defying lineage of Mallkhamb and the cryptic arts of Varmakalai. The digital scroll of Tamil martial supremacy.
                            </p>
                        </div>

                        {/* Center: Navigation */}
                        <div className="lg:col-span-2 flex flex-col gap-10">
                            <h4 className="text-[12px] font-black uppercase tracking-[0.5em] flex items-center gap-3" style={{ color: '#2A2015' }}>
                                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#D4AF37' }} />
                                Links
                            </h4>
                            <ul className="flex flex-col gap-6">
                                {[
                                    { name: 'Home', href: '/' },
                                    { name: 'About', href: '/about' },
                                    { name: 'Classes', href: '/classes' },
                                    { name: 'Events', href: '/events' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-[12px] font-black uppercase tracking-widest flex items-center gap-3 transition-all duration-300 hover:translate-x-3"
                                            style={{ color: 'rgba(58,47,43,0.75)' }}
                                        >
                                            <div className="w-4 h-px" style={{ background: 'rgba(212,175,55,0.5)' }} />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Column: Newsletter */}
                        <div className="lg:col-span-5 flex flex-col gap-10">
                            <h4 className="text-[12px] font-black uppercase tracking-[0.5em] flex items-center gap-3" style={{ color: '#2A2015' }}>
                                <Send size={14} style={{ color: '#8B7355' }} />
                                Intelligence Stream
                            </h4>
                            <div className="relative max-w-md">
                                <input
                                    type="email"
                                    placeholder="INITIATE PROTOCOL (EMAIL)"
                                    className="w-full rounded-2xl px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] focus:outline-none transition-all"
                                    style={{
                                        background: 'rgba(255,252,245,0.75)',
                                        border: '1px solid rgba(139,115,85,0.2)',
                                        color: '#2A2015',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 rounded-xl flex items-center justify-center shadow-xl transition-all"
                                    style={{ background: '#2A2015', color: '#F8F5EF' }}
                                >
                                    <ArrowRight size={22} />
                                </motion.button>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] leading-loose" style={{ color: 'rgba(58,47,43,0.5)' }}>
                                Secure transmission. Encrypted lineage updates only.
                            </p>
                        </div>
                    </div>

                    {/* ── Bottom Row ── */}
                    <div
                        className="pt-12 flex flex-col md:flex-row justify-between items-center gap-10"
                        style={{ borderTop: '1px solid rgba(212,175,55,0.14)' }}
                    >
                        <div className="flex gap-10">
                            {[Instagram, Youtube, Twitter].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="transition-all hover:-translate-y-3 hover:scale-150 active:scale-95 block"
                                    style={{ color: 'rgba(58,47,43,0.5)' }}
                                >
                                    <Icon size={20} strokeWidth={1.5} />
                                </Link>
                            ))}
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-3 text-right">
                            {/* Gold HUD tick marks — echoes AnatomyOfPower */}
                            <div className="flex items-center gap-2 mb-1">
                                <div className="h-px w-6" style={{ background: 'rgba(212,175,55,0.6)' }} />
                                <div className="h-1.5 w-1.5 rounded-full" style={{ background: '#D4AF37', opacity: 0.7 }} />
                                <div className="h-px w-12" style={{ background: 'rgba(212,175,55,0.35)' }} />
                            </div>
                            <div className="flex items-center gap-4">
                                <Shield size={12} className="animate-pulse" style={{ color: 'rgba(58,47,43,0.35)' }} />
                                <p className="text-[10px] font-black uppercase tracking-[0.6em]" style={{ color: 'rgba(58,47,43,0.45)' }}>
                                    ESTD. 2026 // VAWO GLOBAL ARCHIVE
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Watermark ── */}
                    <motion.div
                        style={{ y: parallaxText }}
                        className="absolute -bottom-20 -left-10 font-black pointer-events-none select-none uppercase tracking-tighter italic"
                        aria-hidden="true"
                    >
                        <span style={{ fontSize: '12vw', color: 'rgba(139,115,85,0.04)' }}>LIN-EAGE</span>
                    </motion.div>
                </motion.div>
            </div>

            {/* ── Warm Grain Overlay ── */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
            />
        </footer>
    );
}
