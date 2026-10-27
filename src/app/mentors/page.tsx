"use client";

import React from "react";
import Link from "next/link";
import { Users, ArrowRight, UserCheck, Sparkles } from "lucide-react";
import { SEASON_LABEL } from "@/lib/season";

export default function MentorsPage() {
  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Engineering Mentorship</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            OWOC Technical Mentors
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            Experienced engineers and open-source maintainers guiding pull requests and architectural decisions throughout the winter.
          </p>
        </div>

        {/* Polished To Be Announced State Card */}
        <div className="glass-card p-12 sm:p-16 rounded-3xl border border-white/10 text-center max-w-2xl mx-auto shadow-2xl mb-16">
          <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-red-primary/30 flex items-center justify-center mx-auto mb-6 shadow-red-glow-sm">
            <UserCheck className="w-8 h-8 text-red-bright" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase font-bold mb-4 shadow-red-glow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>To Be Announced</span>
          </div>

          <h2 className="font-heading font-bold text-2xl text-white mb-3">
            To Be Announced: Mentors Unveiled Soon
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-lg mx-auto">
            We are onboarding technical mentors across AI/ML, Systems, Web3, Cloud, and Mobile for OWOC {SEASON_LABEL}. Share your expertise, review contributor PRs, and help shape the next generation of engineers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply/mentor"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white text-xs font-bold shadow-red-glow hover:shadow-red-glow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Apply to be a Mentor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/rules"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-text-secondary hover:text-white text-xs font-semibold transition-colors flex items-center justify-center"
            >
              <span>Mentor Guidelines</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
