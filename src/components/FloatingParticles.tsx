'use client';

import React, { useEffect, useState } from 'react';

const TAMIL_LETTERS = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ', 'க்', 'ங்', 'ச்', 'ஞ்', 'ட்', 'ண்', 'த்', 'ந்', 'ப்', 'ம்', 'ய்', 'ர்', 'ல்', 'வ்', 'ழ்', 'ள்', 'ற்', 'ன்'];

export default function FloatingParticles() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Tamil letters that float upward from below the section to above it
    const letters = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        char: TAMIL_LETTERS[Math.floor(Math.random() * TAMIL_LETTERS.length)],
        left: `${Math.random() * 100}%`,
        // Start position spread across the full extended height (below to in-section)
        startY: `${60 + Math.random() * 80}vh`,
        fontSize: `${Math.random() * 1.2 + 0.5}rem`,
        animationDuration: `${Math.random() * 18 + 12}s`,
        animationDelay: `-${Math.random() * 30}s`, // Negative delay to start mid-animation
        maxOpacity: Math.random() * 0.18 + 0.04,
        drift: (Math.random() - 0.5) * 60, // horizontal drift in px
        rotate: Math.random() * 30 - 15,
    }));

    // Subtle dust particles
    const particles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        left: `${Math.random() * 100}%`,
        startY: `${50 + Math.random() * 100}vh`,
        animationDuration: `${Math.random() * 20 + 10}s`,
        animationDelay: `-${Math.random() * 20}s`, // Negative delay to start mid-animation
        opacity: Math.random() * 0.25 + 0.05,
    }));

    return (
        /* Extends 50vh above and below the section so letters naturally cross boundaries */
        <div
            className="absolute pointer-events-none z-[1]"
            style={{ inset: '-50vh 0', overflow: 'visible' }}
        >
            {/* Dust particles */}
            {particles.map((p) => (
                <div
                    key={`particle-${p.id}`}
                    className="absolute rounded-full bg-[#8B7355]"
                    style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        left: p.left,
                        top: p.startY,
                        opacity: p.opacity,
                        animation: `tamil-rise ${p.animationDuration} ease-in-out infinite`,
                        animationDelay: p.animationDelay,
                        boxShadow: '0 0 6px rgba(139, 115, 85, 0.4)',
                    }}
                />
            ))}

            {/* Tamil Letters */}
            {letters.map((l) => (
                <div
                    key={`letter-${l.id}`}
                    className="absolute text-[#8B7355] font-serif font-bold select-none"
                    style={{
                        left: l.left,
                        top: l.startY,
                        fontSize: l.fontSize,
                        // Use CSS custom properties for per-letter drift/rotate
                        // @ts-ignore
                        '--drift': `${l.drift}px`,
                        '--rotate': `${l.rotate}deg`,
                        '--max-opacity': l.maxOpacity,
                        animation: `tamil-letter-rise ${l.animationDuration} ease-in-out infinite`,
                        animationDelay: l.animationDelay,
                        textShadow: '0 0 12px rgba(139, 115, 85, 0.3)',
                    }}
                >
                    {l.char}
                </div>
            ))}

            <style>{`
                @keyframes tamil-rise {
                    0%   { transform: translateY(0) translateX(0); opacity: 0; }
                    10%  { opacity: 0.3; }
                    50%  { opacity: 0.6; }
                    90%  { opacity: 0.15; }
                    100% { transform: translateY(-200vh) translateX(20px); opacity: 0; }
                }

                @keyframes tamil-letter-rise {
                    0%   {
                        transform: translateY(0) translateX(0) rotate(var(--rotate)) scale(0.8);
                        opacity: 0;
                    }
                    8%   { opacity: var(--max-opacity); }
                    40%  {
                        transform: translateY(-80vh) translateX(calc(var(--drift) * 0.5)) rotate(calc(var(--rotate) * -0.5)) scale(1.05);
                        opacity: var(--max-opacity);
                    }
                    75%  {
                        transform: translateY(-150vh) translateX(var(--drift)) rotate(0deg) scale(0.95);
                        opacity: calc(var(--max-opacity) * 0.5);
                    }
                    92%  { opacity: 0.02; }
                    100% {
                        transform: translateY(-200vh) translateX(var(--drift)) rotate(calc(var(--rotate) * -1)) scale(0.7);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}
