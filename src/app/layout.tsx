import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmberSnowCanvas from "@/components/visual/EmberSnowCanvas";

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

export const metadata: Metadata = {
  title: "OWOC — Omnikon Winter of Code 2024-2025",
  description:
    "Omnikon Winter of Code (OWOC) is a premier month-long open source program where developers, mentors, and campus ambassadors collaborate on high-impact projects during winter.",
  keywords: [
    "OWOC",
    "Omnikon",
    "Winter of Code",
    "Open Source",
    "GSSoC",
    "GSOC",
    "Student Developers",
    "Hackathon",
  ],
  authors: [{ name: "Omnikon Foundation" }],
  openGraph: {
    title: "OWOC — Omnikon Winter of Code",
    description: "Empowering developers to forge open-source innovation under winter skies.",
    type: "website",
    siteName: "OWOC",
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
