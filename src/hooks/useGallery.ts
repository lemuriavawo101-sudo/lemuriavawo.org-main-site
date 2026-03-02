import { useState, useEffect } from 'react';
import {
    getGalleryImages,
    addGalleryImage,
    deleteGalleryImage,
    updateGalleryImage
} from '@/lib/actions/data';

export function useGallery() {
    const [images, setImages] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function loadImages() {
            const data = await getGalleryImages();
            setImages(data as any[]);
            setIsLoaded(true);
        }
        loadImages();
    }, []);

    const addImage = async (newImage: any) => {
        setImages(prev => [newImage, ...prev]);
        await addGalleryImage(newImage);
    };

    const deleteImage = async (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id));
        await deleteGalleryImage(id);
    };

    const updateImage = async (updatedImage: any) => {
        setImages(prev => prev.map(img => img.id === updatedImage.id ? updatedImage : img));
        await updateGalleryImage(updatedImage);
    };

    const restoreSeeds = async () => {
        // This would require a server-side reset action, 
        // for now we just re-fetch to 'reset' any local uncommitted state
        const data = await getGalleryImages();
        setImages(data as any[]);
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
