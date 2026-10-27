"use client";

import React from "react";
import { MessageSquareQuote, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { SEASON_SHORT } from "@/lib/season";

export default function TestimonialsSection() {
  return (
    <section className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Community Stories</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Voices from the Winter Sprints
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-secondary">
            Stories from OWOC {SITE_CONFIG.SHORT_PROGRAM_NAME} participants will appear here once the program launches.
            Be the first to contribute, and your story could be featured.
          </p>
        </div>

        <div className="glass-card rounded-2xl border border-white/10 p-12 text-center max-w-2xl mx-auto">
          <Sparkles className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary font-semibold">No participant stories yet</p>
          <p className="text-xs text-text-muted mt-2 max-w-sm mx-auto">
            {SEASON_SHORT} is a brand-new edition. Real participant experiences will be featured here during and after the program.
          </p>
        </div>
      </div>
    </section>
  );
}
