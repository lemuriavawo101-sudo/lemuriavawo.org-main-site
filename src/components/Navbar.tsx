'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, MapPin, Award, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useScrollToTop } from '@/hooks/useScrollToTop';

// ── Lotus SVG icon ────────────────────────────────────────────────────────
function LotusIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Center petal */}
            <path d="M16 28 C16 28 10 22 10 15 C10 10 13 7 16 7 C19 7 22 10 22 15 C22 22 16 28 16 28Z" fill="rgba(212,175,55,0.8)" stroke="rgba(212,175,55,1)" strokeWidth="0.8" />
            {/* Left petal */}
            <path d="M16 25 C16 25 6 21 5 14 C4.5 9 7 6 10 7 C13 8 14 13 14 18 C14 22 16 25 16 25Z" fill="rgba(212,175,55,0.5)" stroke="rgba(212,175,55,0.8)" strokeWidth="0.8" />
            {/* Right petal */}
            <path d="M16 25 C16 25 26 21 27 14 C27.5 9 25 6 22 7 C19 8 18 13 18 18 C18 22 16 25 16 25Z" fill="rgba(212,175,55,0.5)" stroke="rgba(212,175,55,0.8)" strokeWidth="0.8" />
            {/* Far left petal */}
            <path d="M14 21 C14 21 4 16 4 9 C4 5 7 3 10 4.5 C13 6 13 12 13 16 C13 19 14 21 14 21Z" fill="rgba(212,175,55,0.3)" stroke="rgba(212,175,55,0.5)" strokeWidth="0.8" />
            {/* Far right petal */}
            <path d="M18 21 C18 21 28 16 28 9 C28 5 25 3 22 4.5 C19 6 19 12 19 16 C19 19 18 21 18 21Z" fill="rgba(212,175,55,0.3)" stroke="rgba(212,175,55,0.5)" strokeWidth="0.8" />
            {/* Stem */}
            <path d="M16 28 C16 28 14 30 16 31 C18 30 16 28 16 28Z" fill="rgba(212,175,55,0.6)" />
        </svg>
    );
}



// ── Floating Lotus FAB (mobile only) ─────────────────────────────────────
const FAB_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Classes', href: '/classes' },
    { label: 'Events', href: '/events' },
    { label: 'Thaikalam', href: '/thaikalam' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Mallkhamb', href: '/mallkhamb' },
    { label: 'Ekalaivan', href: '/ekalaivan' },
    { label: 'Shop', href: '/shop' },
];
export function FloatingLotusFAB() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { handleLinkClick } = useScrollToTop();
    if (pathname?.startsWith('/admin')) return null;

    const close = () => setOpen(false);

    const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        handleLinkClick(e, href, close);
    };

    return (
        /* Only shown on mobile (hidden on md+) */
        <div className="md:hidden">
            {/* Dark backdrop */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="fab-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[190]"
                        style={{ background: 'rgba(13,10,6,0.65)', backdropFilter: 'blur(4px)' }}
                        onClick={close}
                    />
                )}
            </AnimatePresence>

            {/* Petal links — fan upward from FAB */}
            <div className="fixed bottom-[88px] left-1/2 -translate-x-1/2 z-[200] flex flex-col-reverse items-center gap-2 pointer-events-none">
                <AnimatePresence>
                    {open && FAB_LINKS.map((link, i) => (
                        <motion.div
                            key={link.href}
                            initial={{ opacity: 0, y: 20, scale: 0.85 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 16, scale: 0.85 }}
                            transition={{ type: 'spring', damping: 18, stiffness: 260, delay: i * 0.045 }}
                            className="pointer-events-auto"
                        >
                            <Link
                                href={link.href}
                                onClick={(e) => onLinkClick(e, link.href)}
                                className="block px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.35em] transition-all active:scale-95"
                                style={{
                                    background: pathname === link.href
                                        ? 'rgba(212,175,55,0.18)'
                                        : 'rgba(255,252,245,0.88)',
                                    border: pathname === link.href
                                        ? '1.5px solid rgba(212,175,55,0.6)'
                                        : '1.5px solid rgba(212,175,55,0.25)',
                                    color: pathname === link.href ? '#B8860B' : '#3A2F2B',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    boxShadow: '0 8px 30px rgba(58,47,43,0.14)',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {link.label}
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* The FAB button itself */}
            <motion.button
                onClick={() => setOpen(v => !v)}
                whileTap={{ scale: 0.9 }}
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[201] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
                style={{
                    background: open
                        ? 'rgba(42,32,21,0.92)'
                        : 'rgba(255,252,245,0.75)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1.5px solid rgba(212,175,55,0.4)',
                    boxShadow: '0 12px 40px rgba(139,115,85,0.3), 0 4px 16px rgba(212,175,55,0.2)',
                }}
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.div key="x"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.18 }}
                        >
                            <X size={24} color="rgba(212,175,55,0.9)" />
                        </motion.div>
                    ) : (
                        <motion.div key="lotus"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.18 }}
                        >
                            <LotusIcon size={30} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}

export default function Navbar() {
    // Track global scroll for sticky nav
    const { scrollY } = useScroll();
    const [isClassesOpen, setIsClassesOpen] = useState(false);
    const pathname = usePathname();
    const { handleLinkClick } = useScrollToTop();

    const navBackground = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.9)"]
    );
    const navBlur = useTransform(scrollY, [0, 100], ["blur(15px)", "blur(40px)"]);
    const navBorder = useTransform(
        scrollY,
        [0, 100],
        ["rgba(168, 142, 107, 0.1)", "rgba(168, 142, 107, 0.3)"]
    );
    const navY = useTransform(scrollY, [0, 100], [0, 10]);
    const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);

    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <motion.nav
            style={{
                backgroundColor: navBackground,
                backdropFilter: navBlur,
                borderColor: navBorder,
                y: navY,
                scale: navScale
            }}
            className="fixed top-0 left-0 w-full z-[100] px-8 md:px-16 py-4 flex justify-between items-center border-b border-bronze-gold/10 shadow-lg transition-all duration-500 overflow-hidden"
        >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-bronze-gold/[0.03] to-transparent pointer-events-none" />

            <Link
                href="/"
                onClick={(e) => handleLinkClick(e, '/')}
                className="flex items-center gap-4 cursor-pointer group relative z-10"
            >
                <div className="flex flex-col">
                    <div className="font-black text-[10px] tracking-[0.4em] uppercase text-ancient-amber mb-1">Lemuria</div>
                    <div className="font-black text-2xl tracking-tighter text-charcoal-deep transition-all duration-500 flex items-center gap-2">
                        Varmakalari
                        <div className="w-1.5 h-1.5 rounded-full bg-ancient-amber animate-pulse" />
                    </div>
                    <span className="text-[7px] font-black tracking-[0.3em] uppercase text-charcoal-deep/60 transition-colors">Adimurai World Organization</span>
                </div>
            </Link>

            <div className="hidden md:flex items-center gap-10 text-[10px] font-black tracking-[0.2em] uppercase text-charcoal-deep relative z-10">
                <Link
                    href="/"
                    onClick={(e) => handleLinkClick(e, '/')}
                    className="hover:text-ancient-amber transition-colors relative group/link"
                >
                    Home
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-ancient-amber rounded-full transition-all duration-500 group-hover/link:w-1 group-hover/link:h-1" />
                </Link>
                <Link
                    href="/about"
                    onClick={(e) => handleLinkClick(e, '/about')}
                    className="hover:text-ancient-amber transition-colors relative group/link"
                >
                    About
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-ancient-amber rounded-full transition-all duration-500 group-hover/link:w-1 group-hover/link:h-1" />
                </Link>

                <div
                    className="relative group py-4"
                    onMouseEnter={() => setIsClassesOpen(true)}
                    onMouseLeave={() => setIsClassesOpen(false)}
                >
                    <div className="flex items-center gap-2 cursor-pointer hover:text-ancient-amber transition-colors relative group/link">
                        <Link
                            href="/classes"
                            onClick={(e) => handleLinkClick(e, '/classes')}
                        >
                            Classes
                        </Link>
                        <motion.div
                            animate={{ rotate: isClassesOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown size={10} className="text-charcoal-deep/50" />
                        </motion.div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-ancient-amber rounded-full transition-all duration-500 group-hover/link:w-1 group-hover/link:h-1" />
                    </div>

                    <AnimatePresence>
                        {isClassesOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white/10 backdrop-blur-3xl rounded-[2rem] shadow-2xl border border-bronze-gold/10 overflow-hidden p-3 mt-2"
                            >
                                <Link href="/classes#our-classes" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-bronze-gold/10 transition-all group/item">
                                    <div className="w-10 h-10 rounded-xl bg-bronze-gold/10 flex items-center justify-center text-bronze-gold group-hover/item:bg-bronze-gold group-hover/item:text-white transition-all shadow-lg shadow-bronze-gold/5">
                                        <BookOpen size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black tracking-widest uppercase text-bronze-gold">Our Classes</span>
                                        <span className="text-[7px] text-bronze-gold/40 font-bold uppercase tracking-widest">Master Syllabus</span>
                                    </div>
                                </Link>
                                <Link href="/classes#camps" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-bronze-gold/10 transition-all group/item">
                                    <div className="w-10 h-10 rounded-xl bg-bronze-gold/5 flex items-center justify-center text-bronze-gold group-hover/item:bg-bronze-gold group-hover/item:text-white transition-all shadow-lg shadow-bronze-gold/5">
                                        <MapPin size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black tracking-widest uppercase text-bronze-gold">Camps</span>
                                        <span className="text-[7px] text-bronze-gold/40 font-bold uppercase tracking-widest">Immersions</span>
                                    </div>
                                </Link>
                                <Link href="/classes#certificates" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-bronze-gold/10 transition-all group/item">
                                    <div className="w-10 h-10 rounded-xl bg-bronze-gold/5 flex items-center justify-center text-bronze-gold group-hover/item:bg-bronze-gold group-hover/item:text-white transition-all shadow-lg shadow-bronze-gold/5">
                                        <Award size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black tracking-widests uppercase text-bronze-gold">Verify</span>
                                        <span className="text-[7px] text-bronze-gold/40 font-bold uppercase tracking-widest">Archive Sync</span>
                                    </div>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <Link
                    href="/thaikalam"
                    onClick={(e) => handleLinkClick(e, '/thaikalam')}
                    className="hover:text-ancient-amber transition-colors relative group/link"
                >
                    Thaikalam
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-ancient-amber rounded-full transition-all duration-500 group-hover/link:w-1 group-hover/link:h-1" />
                </Link>
                <Link
                    href="/mallkhamb"
                    onClick={(e) => handleLinkClick(e, '/mallkhamb')}
                    className="hover:text-ancient-amber transition-colors relative group/link"
                >
                    Mallkhamb
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-ancient-amber rounded-full transition-all duration-500 group-hover/link:w-1 group-hover/link:h-1" />
                </Link>
                <Link
                    href="/ekalaivan"
                    onClick={(e) => handleLinkClick(e, '/ekalaivan')}
                    className="hover:text-ancient-amber transition-colors relative group/link"
                >
                    Ekalaivan
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-ancient-amber rounded-full transition-all duration-500 group-hover/link:w-1 group-hover/link:h-1" />
                </Link>
                <Link
                    href="/gallery"
                    className="hover:text-ancient-amber transition-colors relative group/link"
                >
                    Gallery
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-ancient-amber rounded-full transition-all duration-500 group-hover/link:w-1 group-hover/link:h-1" />
                </Link>
                <Link
                    href="/shop"
                    onClick={(e) => handleLinkClick(e, '/shop')}
                    className="hover:text-ancient-amber transition-colors relative group/link"
                >
                    Shop
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-ancient-amber rounded-full transition-all duration-500 group-hover/link:w-1 group-hover/link:h-1" />
                </Link>

            </div>
        </motion.nav>
    );
}
