'use client';

import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, PresentationControls, Stage, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, scale = 1, rotation = [0, 0, 0] }: { url: string; scale?: number, rotation?: [number, number, number] }) {
    const { scene } = useGLTF(url);
    const modelRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        // Disabled automatic continuous rotation
        // if (modelRef.current) {
        //     modelRef.current.rotation.y += 0.003;
        // }
    });

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={scale}
            rotation={rotation}
        />
    );
}

interface CulturalModelProps {
    modelUrl: string;
    scale?: number;
    rotation?: [number, number, number];
    containerHeight?: string;
}

export default function CulturalModel({
    modelUrl,
    scale = 1.0,
    rotation = [0, 0, 0],
    containerHeight = "h-[400px] md:h-[520px]"
}: CulturalModelProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div className={containerHeight} />;

    return (
        <div className={`w-full ${containerHeight} relative bg-transparent flex items-center justify-center`}>
            <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center bg-transparent z-50">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-2 border-ancient-amber/20 border-t-ancient-amber rounded-full animate-spin" />
                        <div className="text-[10px] text-ancient-amber/40 uppercase tracking-widest font-mono">
                            Loading Artifact...
                        </div>
                    </div>
                </div>
            }>
                <Canvas
                    camera={{ position: [0, 0, 10], fov: 45 }}
                    dpr={[1, 2]}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: "high-performance",
                        preserveDrawingBuffer: true
                    }}
                    style={{ background: 'transparent' }}
                    className="bg-transparent"
                >
                    <Suspense fallback={null}>
                        <Environment preset="city" />
                        <ambientLight intensity={0.8} />
                        <directionalLight position={[5, 5, 5]} intensity={1.2} />
                        <directionalLight position={[-5, 5, -5]} intensity={0.6} />
                        <PresentationControls
                            snap
                            speed={1.5}
                            rotation={[0, 0, 0]}
                            polar={[-Math.PI / 4, Math.PI / 4]}
                            azimuth={[-Math.PI / 2, Math.PI / 2]}
                        >
                            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                                <Model url={modelUrl} scale={scale} rotation={rotation} />
                            </Float>
                        </PresentationControls>
                    </Suspense>
                </Canvas>
            </Suspense>
        </div>
    );
}

// Preload the specific model
if (typeof window !== 'undefined') {
    useGLTF.preload('/models/pipa_amb_cap_de_drac.glb');
}
