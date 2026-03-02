import { Metadata } from 'next';
import ShopClient from '@/components/ShopClient';

export const metadata: Metadata = {
    title: 'Shop | Lemuria Academy',
    description: 'Equip your journey with authentic Varmakalai gear, herbal restorations, and traditional practitioner tools.',
};

export default function ShopPage() {
    return <ShopClient />;
}
