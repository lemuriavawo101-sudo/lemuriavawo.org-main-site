import { Metadata } from 'next';
import MallkhambClient from '@/components/MallkhambClient';

export const metadata: Metadata = {
    title: 'Mallkhamb | Lemuria Academy',
    description: 'Experience the gravity-defying art of Mallkhamb. A traditional Indian sport combining yoga, wrestling, and aerial mastery.',
};

export default function MallkhambPage() {
    return <MallkhambClient />;
}
