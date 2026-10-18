import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmberSnowCanvas from "@/components/visual/EmberSnowCanvas";
import {
  SEASON_LABEL,
  SEASON_SHORT,
  DURATION_COPY,
  EVENT_MONTH_LABEL,
  formatDuration,
  CODING_DAYS,
} from "@/lib/season";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `OWOC — Omnikon Winter of Code ${SEASON_LABEL}`,
  description:
    `Omnikon Winter of Code (${SEASON_SHORT}) is a month-long program running through ${EVENT_MONTH_LABEL}, with a ${formatDuration(CODING_DAYS)} coding period where developers, mentors, and campus ambassadors collaborate on high-impact projects during winter.`,
  keywords: [
    "OWOC",
    SITE_CONFIG.ORG_NAME,
    "Winter of Code",
    "Open Source",
    "Student Developers",
    "Mentorship",
    "Hackathon",
  ],
  authors: [{ name: SITE_CONFIG.ORG_NAME }],
  openGraph: {
    title: `OWOC — Omnikon Winter of Code ${SEASON_LABEL}`,
    description: `Empowering developers to forge open-source innovation under winter skies during ${SEASON_SHORT}. ${DURATION_COPY.full}.`,
    type: "website",
    siteName: "OWOC",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `OWOC — Omnikon Winter of Code ${SEASON_LABEL}`,
    description: `Empowering developers to forge open-source innovation under winter skies during ${SEASON_SHORT}. ${DURATION_COPY.full}.`,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-background text-text-primary antialiased selection:bg-red-primary/30 selection:text-white flex flex-col min-h-screen relative overflow-x-hidden">
        {/* Dynamic Canvas Background */}
        <EmberSnowCanvas />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow z-10">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
