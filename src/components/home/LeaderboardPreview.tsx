"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Crown, Flame, ArrowRight, Sparkles } from "lucide-react";
import { MOCK_CONTRIBUTORS } from "@/data/mockDatabase";

export default function LeaderboardPreview() {
  const top1 = MOCK_CONTRIBUTORS[0];
  const top2 = MOCK_CONTRIBUTORS[1];
  const top3 = MOCK_CONTRIBUTORS[2];
  const runnersUp = MOCK_CONTRIBUTORS.slice(3, 5);

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
          <p className="mt-4 text-sm sm:text-base text-text-secondary">
            Points updated in real-time as maintainers review and merge pull requests across repositories.
          </p>
        </div>

        {/* Podium Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-end mb-8">
          {/* #2 Rank: Silver */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 relative order-2 md:order-1 text-center group">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-surface-2 border border-slate-400 text-[11px] font-mono text-slate-300 font-bold">
              RANK #2
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={top2.avatar_url}
              alt={top2.full_name}
              className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-slate-400 shadow-lg mb-3"
            />
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={top1.avatar_url}
              alt={top1.full_name}
              className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-red-bright shadow-red-glow mb-4"
            />
            <h3 className="font-heading font-bold text-xl text-white group-hover:text-red-bright transition-colors">
              {top1.full_name}
            </h3>
            <p className="text-xs text-text-secondary mb-3">{top1.college_name}</p>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-red-primary/15 border border-red-primary/40 font-mono text-sm text-white">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="font-extrabold text-red-bright text-base">{top1.points}</span> pts
            </div>
            <div className="mt-3 text-[11px] font-mono text-text-muted">
              🔥 {top1.streak_days}-Day Contribution Streak
            </div>
          </div>

          {/* #3 Rank: Bronze */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 relative order-3 text-center group">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-surface-2 border border-amber-600 text-[11px] font-mono text-amber-500 font-bold">
              RANK #3
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={top3.avatar_url}
              alt={top3.full_name}
              className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-amber-600 shadow-lg mb-3"
            />
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

        {/* Quick Runners up */}
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={u.avatar_url}
                  alt={u.full_name}
                  className="w-7 h-7 rounded-full object-cover"
                />
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
