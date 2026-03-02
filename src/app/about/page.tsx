import AboutHero from "@/components/AboutHero";
import Philosophy from "@/components/Philosophy";
import PillarsOfTransmission from "@/components/PillarsOfTransmission";
import LineageTimeline from "@/components/LineageTimeline";
import ScrollRestoration from "@/components/ScrollRestoration";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | Best Varmakalai & Silambam Academy',
    description: 'Learn from the best Varmakalai, Adimurai, and Silambam academy in the world. Understanding the duality of ancient Tamil martial arts through Lemuria VAWO.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#F9F7F2]">
            <ScrollRestoration />
            <AboutHero />
            <Philosophy />
            <PillarsOfTransmission />
            <LineageTimeline />
        </main>
    );
}
