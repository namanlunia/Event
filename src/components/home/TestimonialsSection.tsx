"use client";

import React from "react";
import { MessageSquareQuote, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { SEASON_SHORT } from "@/lib/season";

/**
 * Sample community stories shown only in DEMO_MODE=true.
 * Clearly labelled as illustrative; no names, avatars, or colleges are real.
 */
const SAMPLE_STORIES = [
  {
    quote:
      "OWOC was the launchpad I needed. Working directly on open-source Rust libraries gave me real code to discuss in technical interviews.",
    author: "Priya S.",
    role: "Contributor (Illustrative Sample Story)",
    college: "Engineering Student",
    initials: "PS",
    color: "from-violet-700 to-purple-900",
  },
  {
    quote:
      "As a project maintainer, the quality of contributors was exactly what we needed — thoughtful reviewers who care about production-grade code.",
    author: "Alex M.",
    role: "Project Maintainer (Illustrative Sample Story)",
    college: "Open Source Developer",
    initials: "AM",
    color: "from-blue-700 to-blue-900",
  },
  {
    quote:
      "Running git workshops at my campus and seeing freshers file their first PRs was incredibly rewarding as a Campus Ambassador.",
    author: "Kabir R.",
    role: "Campus Ambassador (Illustrative Sample Story)",
    college: "Engineering Campus",
    initials: "KR",
    color: "from-emerald-700 to-green-900",
  },
];

export default function TestimonialsSection() {
  const isDemoMode = SITE_CONFIG.DEMO_MODE;

  // When not in demo mode, show an invitation instead of fabricated quotes
  if (!isDemoMode) {
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

  // Demo mode — clearly-labelled illustrative sample stories
  return (
    <section className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Community Stories</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Voices from the Winter Sprints
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-secondary">
            Discover how OWOC transforms curious coders into confident open-source contributors.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-xs text-yellow-400">
            ⚠ Illustrative sample stories — real participant testimonials will appear after the program launches
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_STORIES.map((t) => (
            <div
              key={t.author}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-white/10 hover:border-red-primary/40 group"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 uppercase tracking-wide">
                    Sample
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} border border-white/10 flex items-center justify-center font-bold text-sm text-white flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-red-bright transition-colors">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-text-muted">{t.role}</p>
                  <p className="text-[10px] font-mono text-red-bright/80">{t.college}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
