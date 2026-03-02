import React from 'react';
import Gallery from '@/components/Gallery';
import GalleryHeader from '@/components/GalleryHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Complete Archive | Lemuria Varmakalari Adimurai World Organization',
    description: 'Explore the full visual history and technical archive of the Lemuria Varmakalari Adimurai World Organization.',
};

export default function FullGalleryPage() {
    return (
        <main className="min-h-screen pt-32 bg-charcoal-deep">
            <GalleryHeader />
            <Gallery />
        </main>
    );
}
