import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar, { FloatingLotusFAB } from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Best Varmakalai, Adimurai, Silambam Academy | Lemuria VAWO",
    template: "%s | Lemuria VAWO"
  },
  description: "The Best Varmakalai, Adimurai, and Silambam academy in the world. The official global organization for Lemuria Varmakalari Adimurai. Mastering ancient Tamil martial arts, healing, and traditional lineage.",
  keywords: ["Best Varmakalai Academy", "Silambam", "Adimurai", "Lemuria", "VAWO", "Tamil Martial Arts", "Pressure Points", "Ancient Healing", "Best Martial Arts in World"],
  openGraph: {
    title: "Best Varmakalai, Adimurai, Silambam Academy | VAWO",
    description: "The #1 global authoritative body for ancient Tamil martial arts and Silambam.",
    type: "website",
    locale: "en_US",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <FloatingLotusFAB />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
