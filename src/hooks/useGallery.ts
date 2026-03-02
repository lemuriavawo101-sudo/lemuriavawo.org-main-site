'use client';

import { useState, useEffect } from 'react';
import { GALLERY_IMAGES } from '@/lib/constants';

const LOCAL_STORAGE_KEY = 'varmakalai_gallery_persistence';

export function useGallery(initialImages: any[] = GALLERY_IMAGES) {
    const [images, setImages] = useState<any[]>(initialImages);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setImages(parsed);
                }
            } catch (e) {
                console.error('Failed to parse gallery from localStorage', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever images change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(images));
        }
    }, [images, isLoaded]);

    const addImage = (newImage: any) => {
        setImages(prev => [newImage, ...prev]);
    };

    const deleteImage = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const updateImage = (updatedImage: any) => {
        setImages(prev => prev.map(img => img.id === updatedImage.id ? updatedImage : img));
    };

    const restoreSeeds = () => {
        setImages(GALLERY_IMAGES);
    };

    return {
        images,
        addImage,
        deleteImage,
        updateImage,
        restoreSeeds,
        isLoaded
    };
}
