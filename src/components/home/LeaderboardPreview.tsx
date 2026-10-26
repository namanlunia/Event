"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Crown, ArrowRight, Sparkles, Medal } from "lucide-react";
import { PHASES, formatDateRange } from "@/lib/season";

export default function LeaderboardPreview() {
  const codingPhase = PHASES.find((p) => p.id === 3)!;
  const codingDateRange = formatDateRange(codingPhase);

  return (
    <section className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Merit-Driven Competition</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Sprint Leaderboard
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-secondary">
            Points are updated as maintainers review and merge pull requests. Rankings will appear once the coding period begins.
          </p>
        </div>

        {/* Empty Podium Preview Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-end mb-12">
          {/* Rank 2 */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 relative order-2 md:order-1 text-center group">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-surface-2 border border-slate-400 text-[11px] font-mono text-slate-300 font-bold flex items-center gap-1">
              <Medal className="w-3 h-3 text-slate-300" />
              <span>RANK #2</span>
            </div>
            <div className="my-4">
              <div className="w-16 h-16 rounded-full mx-auto border-2 border-dashed border-slate-400/40 bg-surface-2/60 flex items-center justify-center font-heading font-black text-xl text-slate-400 shadow-lg">
                —
              </div>
            </div>
            <h3 className="font-heading font-bold text-base text-white mb-1">
              Awaiting first contributors
            </h3>
            <p className="text-xs text-text-muted mb-3 font-mono">—</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-2 border border-white/5 font-mono text-xs text-text-muted">
              <span>— pts</span>
            </div>
          </div>

          {/* Rank 1 */}
          <div className="glass-card p-8 rounded-2xl border-2 border-red-primary/60 shadow-red-glow relative order-1 md:order-2 text-center group bg-surface-1/90 md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-red-primary border border-red-bright text-xs font-mono text-white font-bold flex items-center gap-1.5 shadow-red-glow-sm">
              <Crown className="w-4 h-4 text-yellow-300" />
              <span>CHAMPION #1</span>
            </div>
            <div className="my-4">
              <div className="w-20 h-20 rounded-full mx-auto border-4 border-dashed border-red-bright/40 bg-red-primary/10 flex items-center justify-center font-heading font-black text-2xl text-red-bright shadow-red-glow">
                —
              </div>
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-1">
              Awaiting first contributors
            </h3>
            <p className="text-xs text-text-secondary mb-3 font-mono">—</p>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-red-primary/15 border border-red-primary/40 font-mono text-sm text-red-bright font-bold">
              <span>— pts</span>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 relative order-3 text-center group">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-surface-2 border border-amber-600 text-[11px] font-mono text-amber-500 font-bold flex items-center gap-1">
              <Medal className="w-3 h-3 text-amber-500" />
              <span>RANK #3</span>
            </div>
            <div className="my-4">
              <div className="w-16 h-16 rounded-full mx-auto border-2 border-dashed border-amber-600/40 bg-surface-2/60 flex items-center justify-center font-heading font-black text-xl text-amber-500 shadow-lg">
                —
              </div>
            </div>
            <h3 className="font-heading font-bold text-base text-white mb-1">
              Awaiting first contributors
            </h3>
            <p className="text-xs text-text-muted mb-3 font-mono">—</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-2 border border-white/5 font-mono text-xs text-text-muted">
              <span>— pts</span>
            </div>
          </div>
        </div>

        {/* Polished Standby Card: To Be Continued */}
        <div className="glass-card rounded-2xl border border-white/10 p-8 sm:p-10 text-center max-w-xl mx-auto shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>To Be Continued · Coding Period Standby</span>
          </div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-2">
            To Be Continued: Standings Go Live Dec 4, 2026
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary mb-6 leading-relaxed">
            Active coding sprint runs from <strong className="text-white">{codingDateRange}</strong>. Register during the onboarding period to claim issues as soon as the sprint kicks off.
          </p>
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-primary to-red-bright hover:shadow-red-glow text-xs font-bold text-white transition-all"
          >
            <span>View Full Leaderboard Standings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
