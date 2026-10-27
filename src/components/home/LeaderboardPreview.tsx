"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Crown, Flame, ArrowRight, Sparkles, Users } from "lucide-react";
import { getActiveContributors } from "@/lib/dataService";
import { SITE_CONFIG } from "@/lib/site-config";
import { PHASES } from "@/lib/season";

export default function LeaderboardPreview() {
  const contributors = getActiveContributors();
  const isDemoMode = SITE_CONFIG.DEMO_MODE;
  const leaderboardOpenDate = new Date(`${PHASES[2].startDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const top1 = contributors[0];
  const top2 = contributors[1];
  const top3 = contributors[2];
  const runnersUp = contributors.slice(3, 5);

  // Empty state — program hasn't started yet
  if (!isDemoMode && contributors.length === 0) {
    return (
      <section className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="glass-card rounded-2xl border border-white/10 p-12 text-center max-w-xl mx-auto">
            <Users className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary font-semibold">Leaderboard opens {leaderboardOpenDate}</p>
            <p className="text-xs text-text-muted mt-2">Register now to secure your spot when the coding period begins.</p>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/50 text-xs font-semibold text-white shadow-md transition-all hover:bg-white/5"
            >
              <span>View Full Leaderboard</span>
              <ArrowRight className="w-4 h-4 text-red-bright" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Merit-Driven Competition</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Sprint Leaderboard Preview
          </h2>
          {isDemoMode && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-xs text-yellow-400">
              ⚠ Sample data — rankings will update once the season launches
            </div>
          )}
          <p className="mt-4 text-sm sm:text-base text-text-secondary">
            Points updated in real-time as maintainers review and merge pull requests across repositories.
          </p>
        </div>

        {/* Podium Layout */}
        {top1 && top2 && top3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-end mb-8">
            {/* #2 Rank: Silver */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 relative order-2 md:order-1 text-center group">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-surface-2 border border-slate-400 text-[11px] font-mono text-slate-300 font-bold">
                RANK #2
              </div>
              <div className="w-16 h-16 rounded-full mx-auto border-2 border-slate-400 shadow-lg mb-3 bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center font-bold text-xl text-white">
                {top2.full_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
              </div>
              <h3 className="font-heading font-bold text-lg text-white group-hover:text-red-bright transition-colors">
                {top2.full_name}
              </h3>
              <p className="text-xs text-text-muted mb-2">{top2.college_name}</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-2 border border-white/5 font-mono text-xs text-white">
                <Flame className="w-3.5 h-3.5 text-red-bright" />
                <span className="font-bold text-red-bright">{top2.points}</span> pts
              </div>
            </div>

            {/* #1 Rank: Gold */}
            <div className="glass-card p-8 rounded-2xl border-2 border-red-primary/60 shadow-red-glow relative order-1 md:order-2 text-center group bg-surface-1/90 md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-red-primary border border-red-bright text-xs font-mono text-white font-bold flex items-center gap-1 shadow-red-glow-sm">
                <Crown className="w-3.5 h-3.5 text-yellow-300" />
                <span>CHAMPION #1</span>
              </div>
              <div className="w-20 h-20 rounded-full mx-auto border-4 border-red-bright shadow-red-glow mb-4 bg-gradient-to-br from-red-primary/60 to-red-deep flex items-center justify-center font-bold text-2xl text-white">
                {top1.full_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
              </div>
              <h3 className="font-heading font-bold text-xl text-white group-hover:text-red-bright transition-colors">
                {top1.full_name}
              </h3>
              <p className="text-xs text-text-secondary mb-3">{top1.college_name}</p>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-red-primary/15 border border-red-primary/40 font-mono text-sm text-white">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="font-extrabold text-red-bright text-base">{top1.points}</span> pts
              </div>
              {(top1.streak_days ?? 0) > 0 && (
                <div className="mt-3 text-[11px] font-mono text-text-muted">
                  🔥 {top1.streak_days}-Day Contribution Streak
                </div>
              )}
            </div>

            {/* #3 Rank: Bronze */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 relative order-3 text-center group">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-surface-2 border border-amber-600 text-[11px] font-mono text-amber-500 font-bold">
                RANK #3
              </div>
              <div className="w-16 h-16 rounded-full mx-auto border-2 border-amber-600 shadow-lg mb-3 bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center font-bold text-xl text-white">
                {top3.full_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
              </div>
              <h3 className="font-heading font-bold text-lg text-white group-hover:text-red-bright transition-colors">
                {top3.full_name}
              </h3>
              <p className="text-xs text-text-muted mb-2">{top3.college_name}</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-2 border border-white/5 font-mono text-xs text-white">
                <Flame className="w-3.5 h-3.5 text-red-bright" />
                <span className="font-bold text-red-bright">{top3.points}</span> pts
              </div>
            </div>
          </div>
        )}

        {/* Quick Runners up */}
        {runnersUp.length > 0 && (
          <div className="max-w-2xl mx-auto space-y-2 mb-8">
            {runnersUp.map((u) => (
              <div
                key={u.id}
                className="p-3 rounded-xl bg-surface-1/60 border border-white/5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-text-muted w-6">
                    #{u.rank}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-surface-2 to-surface-1 border border-white/10 flex items-center justify-center font-bold text-[10px] text-white">
                    {u.full_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <span className="font-semibold text-white">{u.full_name}</span>
                    <span className="text-text-muted text-[11px] ml-2 hidden sm:inline">
                      {u.college_name}
                    </span>
                  </div>
                </div>
                <div className="font-mono text-red-bright font-bold">
                  {u.points} pts
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/50 text-xs font-semibold text-white shadow-md transition-all hover:bg-white/5"
          >
            <span>View Full Leaderboard (Contributors, Colleges, Ambassadors)</span>
            <ArrowRight className="w-4 h-4 text-red-bright" />
          </Link>
        </div>
      </div>
    </section>
  );
}
