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

      {/* Verified participant testimonials */}
      <TestimonialsSection />

      {/* Frequently asked questions */}
      <FAQSection />
    </div>
  );
}
