import { Metadata } from 'next';
import ThaikalamClient from '@/components/ThaikalamClient';

export const metadata: Metadata = {
    title: 'Thaikalam | Lemuria VAWO HQ',
    description: 'Welcome to Thaikalam, the spiritual and administrative heart of the Lemuria Varmakalari Adimurai World Organization.',
};

export default function ThaikalamPage() {
    return <ThaikalamClient />;
}
