import React from "react";
import HeroSection from "@/components/home/HeroSection";
import StatsCounter from "@/components/home/StatsCounter";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import LeaderboardPreview from "@/components/home/LeaderboardPreview";
import TimelinePreview from "@/components/home/TimelinePreview";
import SponsorsSection from "@/components/home/SponsorsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import OmnikonBanner from "@/components/home/omnikon-banner";
import { AboutThisSeasonNotice } from "@/components/visual/DemoModeBanner";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Real-time stats counter */}
      <StatsCounter />

      {/* Program pillars & how it works */}
      <HowItWorks />

      {/* Program timeline quick glance */}
      <TimelinePreview />

      {/* Top curated repositories */}
      <FeaturedProjects />

      {/* Contributor Podium & Leaderboard preview */}
      <LeaderboardPreview />

      {/* Ecosystem sponsors & backers */}
      <SponsorsSection />

      {/* Participant testimonials */}
      <TestimonialsSection />

      {/* "About this season" — honest transparency notice */}
      <AboutThisSeasonNotice />

      {/* Omnikon HUD Animated Banner */}
      <section className="relative py-12 md:py-16 z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <OmnikonBanner />
        </div>
      </section>

      {/* Frequently asked questions */}
      <FAQSection />
    </div>
  );
}
