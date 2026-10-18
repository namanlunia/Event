"use client";

import React, { useState } from "react";
import { AlertCircle, X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { SEASON_LABEL, SEASON_SHORT, PHASES } from "@/lib/season";

export function DemoModeBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (!SITE_CONFIG.DEMO_MODE || dismissed) return null;

  return (
    <aside
      data-testid="demo-mode-banner"
      aria-label="Demo mode notice"
      className="bg-gradient-to-r from-red-950/90 via-black to-red-950/90 border-b border-red-primary/30 text-red-200/90 text-xs font-mono py-1.5 px-4 text-center flex items-center justify-between sm:justify-center gap-2 shadow-sm relative"
    >
      <div className="flex items-center justify-center gap-2 flex-grow">
        <AlertCircle className="w-3.5 h-3.5 text-red-bright flex-shrink-0" />
        <span>
          <strong className="text-white">Demo mode active:</strong> all names, numbers, and projects shown are sample preview data.
        </span>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss demo mode notice"
        data-testid="dismiss-demo-banner"
        className="ml-2 text-text-muted hover:text-white p-0.5 rounded transition-colors sm:absolute sm:right-4 focus:outline-none"
        title="Dismiss notice"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}

export function SampleBadge({ className = "" }: { className?: string }) {
  if (!SITE_CONFIG.DEMO_MODE) return null;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider bg-red-primary/15 text-red-bright border border-red-primary/30 ${className}`}
    >
      Sample
    </span>
  );
}

/**
 * Honest transparency notice shown on the Home page.
 * Styled in the signature OWOC crimson-and-black cyber aesthetic.
 */
export function AboutThisSeasonNotice() {
  const regDate = new Date(`${PHASES[0].startDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="relative py-16 z-10 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-4 shadow-red-glow-sm">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>About This Season</span>
        </div>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight mb-4">
          {SEASON_SHORT} is a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-bright via-red-primary to-orange-500">
            Brand-New Edition
          </span>
        </h2>
        <div className="glass-card rounded-2xl border border-white/10 hover:border-red-primary/40 p-6 sm:p-8 text-left space-y-3 text-sm text-text-secondary leading-relaxed transition-all">
          <p>
            <strong className="text-white">Omnikon Winter of Code {SEASON_LABEL}</strong> is the inaugural edition
            of this program. There are no past editions, no historical statistics,
            and no prior participant records.
          </p>
          <p>
            All statistics, leaderboard rankings, project listings, and community data shown on this site
            {SITE_CONFIG.DEMO_MODE
              ? " are sample preview data (Demo Mode is active) and will be replaced by real entries once the program launches."
              : " will reflect only verified, real-time data once the program begins."}
          </p>
          <p>
            Sponsors, mentors, and campus ambassadors shown anywhere on this site are confirmed only
            when their profiles are marked as verified. The program opens for registration on{" "}
            <strong className="text-white">{regDate}</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
