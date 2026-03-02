import Hero from "@/components/Hero";
import TriadOfMastery from "@/components/TriadOfMastery";
import LineageGallery from "@/components/LineageGallery";
import AnatomyOfPower from "@/components/AnatomyOfPower";
import SacredGatherings from "@/components/SacredGatherings";
import Gallery from "@/components/Gallery";
import ScrollRestoration from "@/components/ScrollRestoration";
import { Metadata } from 'next';
import { GALLERY_IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: 'Best Varmakalai, Adimurai, Silambam Academy | Lemuria VAWO',
  description: 'The #1 global authoritative body for ancient Tamil martial arts. Master Varmakalai, Adimurai, and Silambam at the best academy in the world.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-charcoal-deep">
      <ScrollRestoration />
      <Hero />
      <TriadOfMastery />

      <AnatomyOfPower />

      <SacredGatherings />
      <LineageGallery />
      <Gallery limit={3} initialImages={GALLERY_IMAGES} />
    </main>
  );
}


