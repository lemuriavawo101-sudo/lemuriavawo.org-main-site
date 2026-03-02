import ClassesPageClient from '@/components/ClassesPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Classes & Camps | Best Silambam & Varmakalai Training',
    description: 'Join the best Varmakalai, Adimurai, and Silambam academy in the world. Explore our classes, seasonal camps, and global certification paths.',
};

export default function ClassesPage() {
    return <ClassesPageClient />;
}
