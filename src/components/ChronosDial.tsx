'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

interface ChronosDialProps {
    onDateSelect: (dateStr: string) => void;
    selectedDate: string | null;
    eventDates: string[];
}

// Generate an array of dates centered around today
function generateDateRange(centerDate: Date, totalDays: number): Date[] {
    const dates: Date[] = [];
    const half = Math.floor(totalDays / 2);
    for (let i = -half; i <= half; i++) {
        const d = new Date(centerDate);
        d.setDate(d.getDate() + i);
        dates.push(d);
    }
    return dates;
}

function formatDateStr(d: Date): string {
    return d.toISOString().split('T')[0];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ChronosDial({ onDateSelect, selectedDate, eventDates }: ChronosDialProps) {
    const [dates] = useState(() => generateDateRange(new Date(), 90));
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Calculate next event countdown
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextEventDate = eventDates
        .map(d => new Date(d))
        .filter(d => d >= today)
        .sort((a, b) => a.getTime() - b.getTime())[0];

    const daysRemaining = nextEventDate
        ? Math.ceil((nextEventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        : null;

    const nextEventLabel = nextEventDate
        ? `${MONTHS[nextEventDate.getMonth()]} ${nextEventDate.getDate()}, ${nextEventDate.getFullYear()}`
        : null;

    return (
        <section className="relative w-full pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
            {/* Section Header */}
            <div className="container mx-auto px-8 md:px-16 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px w-12 bg-[#D4AF37]/60" />
                        <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.45em] opacity-80">
                            The Chronos Dial
                        </p>
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl text-[#2A2015] leading-[0.95] mb-3">
                        Events<br />
                        <span style={{ WebkitTextStroke: '1.5px #B8860B', color: 'transparent' }}>
                            Timeline
                        </span>
                    </h1>
                    <p className="text-[#5A4A38]/60 text-sm font-medium tracking-wide max-w-sm">
                        Navigate through time. {isMobile ? "Slide the arc on the right to explore." : "Swipe the dial to explore upcoming sacred gatherings."}
                    </p>
                </motion.div>
            </div>

            {/* Countdown Badge */}
            {daysRemaining !== null && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="container mx-auto px-8 md:px-16 mb-8"
                >
                    <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl border border-[#D4AF37]/20"
                        style={{ background: 'rgba(212, 175, 55, 0.06)', backdropFilter: 'blur(12px)' }}>
                        <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                        <div>
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4AF37]/80">Next Event</span>
                            <span className="text-[#5A4A38]/40 mx-2">·</span>
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#5A4A38]/60">{nextEventLabel}</span>
                        </div>
                        <div className="h-6 w-px bg-[#D4AF37]/20" />
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-[#D4AF37]">{daysRemaining}</span>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5A4A38]/40">days</span>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Dial Views */}
            {isMobile ? (
                <MobileArcDial
                    dates={dates}
                    selectedDate={selectedDate}
                    eventDates={eventDates}
                    onDateSelect={onDateSelect}
                />
            ) : (
                <DesktopDial
                    dates={dates}
                    selectedDate={selectedDate}
                    eventDates={eventDates}
                    onDateSelect={onDateSelect}
                />
            )}
        </section>
    );
}

function MobileArcDial({ dates, selectedDate, eventDates, onDateSelect }: {
    dates: Date[];
    selectedDate: string | null;
    eventDates: string[];
    onDateSelect: (d: string) => void;
}) {
    const ITEM_HEIGHT = 80;
    const centerIndex = Math.floor(dates.length / 2);
    const y = useMotionValue(0);
    const springY = useSpring(y, { damping: 40, stiffness: 300, mass: 0.8 });

    useEffect(() => {
        // Center today on mount
        const initialY = -(centerIndex * ITEM_HEIGHT);
        y.set(initialY);
    }, [centerIndex, y]);

    const handleDragEnd = () => {
        const currentY = y.get();
        const nearestIndex = Math.round(-currentY / ITEM_HEIGHT);
        const clampedIndex = Math.max(0, Math.min(dates.length - 1, nearestIndex));
        const snappedY = -(clampedIndex * ITEM_HEIGHT);
        animate(y, snappedY, { type: 'spring', damping: 40, stiffness: 300 });
        onDateSelect(formatDateStr(dates[clampedIndex]));
    };

    return (
        <div className="fixed top-0 right-0 h-full w-24 pointer-events-none z-[150] flex items-center justify-end pr-4">
            <div className="relative h-[60vh] w-full pointer-events-auto cursor-grab active:cursor-grabbing">
                {/* Arc Line */}
                <div className="absolute top-1/2 left-full -translate-x-full h-[120%] w-[100px] border-r-2 border-[#D4AF37]/20 rounded-full -translate-y-1/2"
                    style={{ pointerEvents: 'none' }} />

                <motion.div
                    className="absolute top-1/2 left-0 w-full flex flex-col items-end"
                    style={{ y: springY }}
                    drag="y"
                    dragConstraints={{
                        top: -(dates.length - 1) * ITEM_HEIGHT,
                        bottom: 0,
                    }}
                    onDragEnd={handleDragEnd}
                >
                    {dates.map((date, i) => {
                        const dateStr = formatDateStr(date);
                        const distance = useTransform(springY, (val) => Math.abs(val + i * ITEM_HEIGHT));
                        const scale = useTransform(distance, [0, ITEM_HEIGHT, ITEM_HEIGHT * 2], [1.3, 0.9, 0.6]);
                        const opacity = useTransform(distance, [0, ITEM_HEIGHT * 2], [1, 0.2]);
                        const rotate = useTransform(distance, [0, ITEM_HEIGHT * 3], [0, 15]);
                        const xOffset = useTransform(distance, [0, ITEM_HEIGHT * 3], [0, 40]);

                        return (
                            <motion.div
                                key={dateStr}
                                className="flex items-center justify-end h-[80px] w-full pr-4 text-right"
                                style={{
                                    scale,
                                    opacity,
                                    rotate,
                                    x: xOffset,
                                }}
                                onClick={() => onDateSelect(dateStr)}
                            >
                                <div className="flex flex-col items-end">
                                    <span className={`text-[8px] font-black uppercase tracking-widest ${dateStr === formatDateStr(new Date()) ? 'text-[#D4AF37]' : 'text-[#8B7355]/40'}`}>
                                        {DAYS[date.getDay()]}
                                    </span>
                                    <span className={`text-xl font-black ${selectedDate === dateStr ? 'text-[#D4AF37]' : 'text-[#2A2015]/70'}`}>
                                        {date.getDate()}
                                    </span>
                                </div>
                                {eventDates.includes(dateStr) && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] ml-2" />
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Focus indicator */}
                <div className="absolute top-1/2 right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
            </div>
        </div>
    );
}

function DesktopDial({ dates, selectedDate, eventDates, onDateSelect }: {
    dates: Date[];
    selectedDate: string | null;
    eventDates: string[];
    onDateSelect: (d: string) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const ITEM_WIDTH = 72;
    const centerIndex = Math.floor(dates.length / 2);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const x = useMotionValue(0);
    const springX = useSpring(x, { damping: 40, stiffness: 300, mass: 0.8 });

    useEffect(() => {
        if (containerWidth > 0) {
            const initialX = -(centerIndex * ITEM_WIDTH) + containerWidth / 2 - ITEM_WIDTH / 2;
            x.set(initialX);
        }
    }, [containerWidth, centerIndex, x]);

    const handleDragEnd = () => {
        const currentX = x.get();
        const offset = currentX - (containerWidth / 2 - ITEM_WIDTH / 2);
        const nearestIndex = Math.round(-offset / ITEM_WIDTH);
        const clampedIndex = Math.max(0, Math.min(dates.length - 1, nearestIndex));
        const snappedX = -(clampedIndex * ITEM_WIDTH) + containerWidth / 2 - ITEM_WIDTH / 2;
        animate(x, snappedX, { type: 'spring', damping: 40, stiffness: 300 });
        onDateSelect(formatDateStr(dates[clampedIndex]));
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
            style={{ height: '180px' }}
        >
            {/* Glassmorphic track background */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-28 mx-8 md:mx-16 rounded-3xl border border-[#E8DFD0]/60"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(247,240,227,0.3) 100%)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 20px 60px rgba(139,115,85,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
                }}
            />

            {/* Edge fade masks */}
            <div className="absolute inset-y-0 left-0 w-32 md:w-48 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #F9F5ED, transparent)' }} />
            <div className="absolute inset-y-0 right-0 w-32 md:w-48 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #F9F5ED, transparent)' }} />

            {/* Center indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-20 rounded-full bg-[#D4AF37]/40 z-20 pointer-events-none" />

            <motion.div
                className="absolute top-0 left-0 h-full flex items-center"
                style={{ x: springX }}
                drag="x"
                dragConstraints={{
                    left: -(dates.length * ITEM_WIDTH) + (containerWidth / 2),
                    right: containerWidth / 2,
                }}
                onDragEnd={handleDragEnd}
            >
                {dates.map((date, i) => {
                    const dateStr = formatDateStr(date);
                    return (
                        <FishEyeDate
                            key={dateStr}
                            date={date}
                            index={i}
                            isToday={dateStr === formatDateStr(new Date())}
                            isEvent={eventDates.includes(dateStr)}
                            isSelected={selectedDate === dateStr}
                            containerWidth={containerWidth}
                            itemWidth={ITEM_WIDTH}
                            springX={springX}
                            onClick={() => onDateSelect(dateStr)}
                        />
                    );
                })}
            </motion.div>
        </div>
    );
}

function FishEyeDate({
    date,
    index,
    isToday,
    isEvent,
    isSelected,
    containerWidth,
    itemWidth,
    springX,
    onClick,
}: {
    date: Date;
    index: number;
    isToday: boolean;
    isEvent: boolean;
    isSelected: boolean;
    containerWidth: number;
    itemWidth: number;
    springX: ReturnType<typeof useSpring>;
    onClick: () => void;
}) {
    const itemCenter = index * itemWidth + itemWidth / 2;
    const viewCenter = containerWidth / 2;

    // Distance from center of viewport
    const distance = useTransform(springX, (xVal: number) => {
        return Math.abs((itemCenter + xVal) - viewCenter);
    });

    // Fish-eye scale: 1.4 at center, down to 0.6 at edges
    const scale = useTransform(distance, [0, 150, 400], [1.4, 1.0, 0.6]);
    const opacity = useTransform(distance, [0, 150, 400], [1, 0.7, 0.3]);
    const blur = useTransform(distance, [0, 200, 500], [0, 0.5, 2]);
    const rotateY = useTransform(springX, (xVal: number) => {
        const offset = (itemCenter + xVal) - viewCenter;
        return Math.max(-35, Math.min(35, offset * 0.08));
    });

    return (
        <motion.div
            className="flex-shrink-0 flex flex-col items-center justify-center cursor-pointer select-none relative"
            style={{
                width: `${itemWidth}px`,
                height: '120px',
                scale,
                opacity,
                filter: useTransform(blur, (b: number) => `blur(${b}px)`),
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            onClick={onClick}
            whileTap={{ scale: 1.1 }}
        >
            <span className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${isToday ? 'text-[#D4AF37]' : 'text-[#5A4A38]/30'}`}>
                {DAYS[date.getDay()]}
            </span>
            <span className={`text-2xl font-black leading-none mb-0.5 transition-colors ${isSelected ? 'text-[#D4AF37]' : isToday ? 'text-[#2A2015]' : 'text-[#2A2015]/70'}`}>
                {date.getDate()}
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isToday ? 'text-[#D4AF37]/80' : 'text-[#5A4A38]/30'}`}>
                {MONTHS[date.getMonth()]}
            </span>

            {/* Event dot indicator */}
            {isEvent && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                </div>
            )}

            {/* Today ring */}
            {isToday && (
                <div className="absolute inset-x-2 inset-y-1 rounded-2xl border-2 border-[#D4AF37]/20 pointer-events-none" />
            )}

            {/* Selected highlight */}
            {isSelected && (
                <motion.div
                    layoutId="dial-selected"
                    className="absolute inset-x-1 inset-y-0 rounded-2xl pointer-events-none"
                    style={{
                        background: 'rgba(212, 175, 55, 0.08)',
                        border: '1.5px solid rgba(212, 175, 55, 0.3)',
                        boxShadow: '0 4px 20px rgba(212, 175, 55, 0.15)',
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                />
            )}
        </motion.div>
    );
}
