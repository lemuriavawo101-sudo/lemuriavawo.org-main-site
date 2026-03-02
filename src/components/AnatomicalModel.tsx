'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useFBX, OrbitControls, Environment, PerspectiveCamera, ContactShadows, Center, Html, Line } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const VARMAM_POINTS = [
    {
        id: 1,
        name: "KAAMBOTHIRI KAALAM",
        area: "The Infraorbital Node",
        pos: [0, 1.6, 0.1],
        desc: "A focused strike to this nerve junction causes temporary visual blurring and intense cranial pressure. Stimulating it improves ocular blood flow, relieves sinus congestion, and balances the sensory pathways to calm the mind during high mental fatigue.",
        tags: ["SELF-DEFENSE", "HEALTH & MOBILITY", "VITALITY"]
    },
    {
        id: 2,
        name: "KOOMBU KAALA",
        area: "The Solar Plexus",
        pos: [0, 1.0, 0.35],
        desc: "The central engine of vital air (Prana). Impacts respiratory function and digestive fire. Proper stimulation restores metabolic rhythm and emotional balance.",
        tags: ["PRANA FLOW", "METABOLISM", "CORE"]
    },
    {
        id: 3,
        name: "MANIPANTHA VARMAM",
        area: "The Wrist Node",
        pos: [0.92, 0.45, 0.15],
        desc: "Squeeze to disable grip reflex and numb forearm. Treats Carpal Tunnel, reduces stiffness, and restores finger mobility. A gateway for 'Prana' flow, calming the heart...",
        tags: ["SELF-DEFENSE", "HEALTH & MOBILITY", "VITALITY"]
    },
    {
        id: 4,
        name: "MOOTU CHERATTAI",
        area: "The Patella Node",
        pos: [0.4, -1.0, 0.3],
        desc: "Governs the stability of the lower foundation. Restores knee mobility, alleviates joint inflammation, and grounds the flow of energetic force to the Earth.",
        tags: ["STABILITY", "JOINT RECOVERY", "GROUNDING"]
    },
];

const CARD_ANCHOR: [number, number, number] = [3.8, 0.4, 0];

function ConnectorLine({ activePoint }: { activePoint: number }) {
    const point = VARMAM_POINTS.find(p => p.id === activePoint);
    const lineRef = useRef<any>(null);

    useFrame((state) => {
        if (lineRef.current) {
            // Animated dash: pulse from 0.6 to 1.0 in opacity
            const t = state.clock.getElapsedTime();
            lineRef.current.material.opacity = 0.6 + Math.sin(t * 3) * 0.3;
        }
    });

    if (!point) return null;

    const start = new THREE.Vector3(...(point.pos as [number, number, number]));
    const end = new THREE.Vector3(...CARD_ANCHOR);

    // L-shaped path: move right, then to card height
    const mid = new THREE.Vector3(end.x - 0.5, start.y, start.z);

    return (
        <Line
            ref={lineRef}
            points={[start, mid, end]}
            color="#B8860B"
            lineWidth={1.8}
            transparent
            opacity={0.8}
            dashed
            dashSize={0.15}
            gapSize={0.08}
        />
    );
}


function PulsingAura({ color }: { color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current && meshRef.current.material instanceof THREE.MeshStandardMaterial) {
            const scale = 1 + Math.sin(state.clock.getElapsedTime() * 4) * 0.3;
            meshRef.current.scale.setScalar(scale * 4);
            meshRef.current.material.opacity = 0.15 - (Math.sin(state.clock.getElapsedTime() * 4) + 1) * 0.05;
        }
    });


    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial
                color={color}
                transparent
                opacity={0.1}
            />
        </mesh>
    );
}

function VarmamLegendCard({ activePoint }: { activePoint: number }) {
    const activeData = VARMAM_POINTS.find(p => p.id === activePoint) || VARMAM_POINTS[0];

    return (
        <Html
            position={CARD_ANCHOR}
            center
            zIndexRange={[100, 0]}
            distanceFactor={10}
            className="pointer-events-none"
        >
            <div className="w-[220px] sm:w-[360px] relative pointer-events-auto">
                <div className="bg-[#1A1A1A]/95 backdrop-blur-3xl border border-[#D4AF37]/15 p-3 sm:p-4 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeData.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row gap-3"
                        >
                            {/* Left Column: Visual Label */}
                            <div className="shrink-0 flex sm:flex-col items-center sm:items-start gap-4">
                                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#0a0a0a] to-[#2a2a2a] border border-[#D4AF37]/30 flex items-center justify-center shadow-lg">
                                    <div className="text-[#D4AF37]">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#D4AF37] font-mono text-[9px] sm:text-[10px] opacity-60">REF_ID://0{activeData.id}</span>
                                    <div className="flex gap-1 mt-1">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === activePoint ? 'w-4 bg-[#D4AF37]' : 'w-1 bg-[#D4AF37]/20'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Information Content */}
                            <div className="min-w-0 flex-grow flex flex-col gap-3 text-left">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-base sm:text-lg font-black text-white leading-none uppercase tracking-tight">
                                        {activeData.name}
                                    </h2>
                                    <p className="text-[#D4AF37] text-[8px] sm:text-[9px] font-bold tracking-widest uppercase opacity-80">
                                        Analysis: {activeData.area}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {activeData.tags.map((tag: string) => (
                                        <div key={tag} className="px-1.5 py-0.5 rounded-md border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] text-[7px] font-black uppercase tracking-tight">
                                            {tag}
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-3 border-t border-white/5">
                                    <p className="text-white/80 text-[10px] sm:text-[11px] font-medium leading-snug">
                                        {activeData.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -inset-2 border border-[#D4AF37]/5 rounded-[2rem] pointer-events-none -z-10 bg-[#D4AF37]/5 blur-3xl opacity-30" />
            </div>
        </Html>
    );
}



function VarmamPoint({ position, labelId, activePoint, color = "#D4AF37" }: { position: [number, number, number], labelId: number, activePoint: number, color?: string }) {
    const isActive = labelId === activePoint;

    return (
        <group position={position}>
            {/* Core Point - Always shows at low intensity, bright when active */}
            <mesh>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={isActive ? 3 : 0.5}
                    transparent
                    opacity={isActive ? 1 : 0.4}
                />
            </mesh>

            {/* ID Marker Bubble - Only when active */}
            <AnimatePresence>
                {isActive && (
                    <Html position={[0.08, 0.08, 0]} center>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="w-5 h-5 rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-[10px] font-black shadow-lg shadow-[#D4AF37]/40"
                        >
                            {labelId}
                        </motion.div>
                    </Html>
                )}
            </AnimatePresence>

            {/* Outer Glow & pulsing aura - Only when active */}
            {isActive && (
                <>
                    <mesh scale={[2.5, 2.5, 2.5]}>
                        <sphereGeometry args={[0.04, 16, 16]} />
                        <meshStandardMaterial
                            color={color}
                            transparent
                            opacity={0.3}
                            emissive={color}
                            emissiveIntensity={1}
                        />
                    </mesh>
                    <PulsingAura color={color} />
                </>
            )}
        </group>
    );
}

function Model({ url, activePoint }: { url: string, activePoint: number }) {
    // Hooks must be at top level
    const fbx = useFBX(url);
    const groupRef = useRef<THREE.Group>(null);

    // Infuse with Golden Mastery material and Auto-Scale
    useEffect(() => {
        if (!fbx) return;

        fbx.traverse((child: any) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: '#D4AF37',
                    emissive: '#443311',
                    emissiveIntensity: 0.15,
                    roughness: 0.2,
                    metalness: 0.8,
                    transparent: false,
                    opacity: 1.0
                });
            }
        });

        const box = new THREE.Box3().setFromObject(fbx);
        const center = new THREE.Vector3();
        box.getCenter(center);
        fbx.position.sub(center);
        const scaleMultiplier = 25.0;
        fbx.scale.setScalar(0.01 * scaleMultiplier);
    }, [fbx]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15;
        }
    });

    return (
        <Center>
            <group ref={groupRef}>
                <primitive object={fbx} />

                {VARMAM_POINTS.map((p) => (
                    <VarmamPoint
                        key={p.id}
                        position={p.pos as [number, number, number]}
                        labelId={p.id}
                        activePoint={activePoint}
                    />
                ))}

                <ConnectorLine activePoint={activePoint} />

                <VarmamLegendCard activePoint={activePoint} />
            </group>
        </Center>
    );
}

export default function AnatomicalModel() {
    const modelUrl = '/models/human_anatomy.fbx';
    const [zoomEnabled, setZoomEnabled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activePoint, setActivePoint] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setActivePoint((prev) => (prev % 4) + 1);
        }, 5000); // Cycle every 5 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="w-full h-[60vh] md:h-full min-h-[400px] md:min-h-[700px] flex justify-center items-center relative pointer-events-none">
            {/*
              Strategy:
              - Outer div: pointer-events-none (page scrolls freely by default)
              - Canvas container: pointer-events-auto so OrbitControls can receive events
              - A transparent blocking overlay covers the RIGHT side (info card area),
                capturing & discarding events there — so panning only works when the
                cursor is over the LEFT side where the actual model body is.
            */}
            <div
                className="w-full max-w-[800px] h-full relative pointer-events-auto cursor-grab active:cursor-grabbing"
                style={{ overflow: 'visible' }}
                onMouseEnter={() => !isMobile && setZoomEnabled(true)}
                onMouseLeave={() => !isMobile && setZoomEnabled(false)}
            >
                <Canvas dpr={[1, 2]} style={{ overflow: 'visible' }}>
                    <PerspectiveCamera
                        makeDefault
                        position={[-1.4, 0.2, isMobile ? 12 : 8.5]}
                        fov={isMobile ? 35 : 45}
                    />

                    <ambientLight intensity={1.8} />
                    <spotLight position={[10, 10, 15]} angle={0.25} penumbra={0.3} intensity={3.5} color="#F4E6D2" shadow-bias={-0.0001} />
                    <pointLight position={[-10, 0, -10]} intensity={2.0} color="#D4BB90" />
                    <pointLight position={[5, -5, 5]} intensity={1.0} color="#8B6038" />

                    <React.Suspense fallback={null}>
                        <Model url={modelUrl} activePoint={activePoint} />
                        <Environment preset="city" environmentIntensity={0.4} />
                    </React.Suspense>

                    <OrbitControls
                        enableZoom={zoomEnabled || isMobile}
                        minDistance={isMobile ? 8 : 7}
                        maxDistance={isMobile ? 18 : 12}
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                        target={[0, 0.8, 0]}
                        makeDefault
                    />
                </Canvas>

                {/* ── Right-side blocker: absorbs pointer events over the info card area ──
                    This makes panning/orbit only respond on the model body (left side).
                    On mobile: hidden so users can interact with the full canvas. */}
                {!isMobile && (
                    <div
                        className="absolute inset-y-0 right-0 z-20 cursor-default"
                        style={{
                            width: '48%',
                            pointerEvents: 'auto',
                            // Debug: uncomment to see the blocked zone
                            // background: 'rgba(255,0,0,0.1)',
                        }}
                        onMouseDown={e => e.stopPropagation()}
                        onMouseMove={e => e.stopPropagation()}
                        onMouseEnter={() => setZoomEnabled(false)}
                        onMouseLeave={() => setZoomEnabled(true)}
                        onPointerDown={e => e.stopPropagation()}
                        onPointerMove={e => e.stopPropagation()}
                    />
                )}
            </div>
        </div>
    );
}
