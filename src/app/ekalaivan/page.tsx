import { Metadata } from 'next';
import EkalaivanClient from '@/components/EkalaivanClient';

export const metadata: Metadata = {
    title: 'Ekalaivan | Lemuria VAWO Digital',
    description: 'The future of martial arts education. Bridging traditional Tamil wisdom with modern digital research under the Lemuria VAWO umbrella.',
};

export default function EkalaivanPage() {
    return <EkalaivanClient />;
}
