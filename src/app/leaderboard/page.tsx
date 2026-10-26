"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Crown,
  Search,
  Users,
  Building2,
  FolderGit2,
  Sparkles,
  ArrowRight,
  Medal,
} from "lucide-react";
import { PHASES, formatDateRange } from "@/lib/season";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"contributors" | "ambassadors" | "colleges" | "projects">("contributors");
  const [timeframe, setTimeframe] = useState<"overall" | "weekly">("overall");

  const codingPhase = PHASES.find((p) => p.id === 3)!;
  const codingDateRange = formatDateRange(codingPhase);

  const tabEmptyMessages: Record<string, string> = {
    contributors:
      "Standings will be computed from verified merged pull requests, mentor quality multipliers, and contribution streaks once coding begins.",
    ambassadors:
      "Campus ambassador referral rankings will go live as students register and join university chapters.",
    colleges:
      "University rankings will aggregate points from all enrolled student contributors once coding sprints begin.",
    projects:
      "Repository contribution activity will be tabulated across all participating repositories once projects are unveiled.",
  };

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Merit Standings</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Program Leaderboard
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary">
            Standings computed from verified merged pull requests, mentor quality multipliers, and consecutive contribution streaks.
          </p>
        </div>

        {/* 3 Empty Podium Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-end mb-14">
          {/* Rank 2: Silver */}
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

          {/* Rank 1: Gold Champion */}
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
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>— pts</span>
            </div>
          </div>

          {/* Rank 3: Bronze */}
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

        {/* Tab Controls & Disabled Search */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: "contributors", label: "Contributors", icon: <Users className="w-3.5 h-3.5" /> },
              { id: "ambassadors", label: "Campus Ambassadors", icon: <Sparkles className="w-3.5 h-3.5" /> },
              { id: "colleges", label: "University Leaderboard", icon: <Building2 className="w-3.5 h-3.5" /> },
              { id: "projects", label: "Top Repositories", icon: <FolderGit2 className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "contributors" | "ambassadors" | "colleges" | "projects")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? "bg-red-primary text-white shadow-red-glow-sm"
                    : "bg-surface-1 text-text-secondary hover:text-white border border-white/5"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Timeframe & Disabled Search */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center bg-surface-1 border border-white/10 rounded-xl p-1 text-xs font-mono">
              <button
                onClick={() => setTimeframe("overall")}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  timeframe === "overall" ? "bg-surface-2 text-white font-bold" : "text-text-muted hover:text-white"
                }`}
              >
                Overall
              </button>
              <button
                onClick={() => setTimeframe("weekly")}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  timeframe === "weekly" ? "bg-surface-2 text-white font-bold" : "text-text-muted hover:text-white"
                }`}
              >
                Weekly Sprint
              </button>
            </div>

            <div className="relative flex-grow sm:w-56">
              <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                disabled
                placeholder="Standings unlock Dec 4, 2026..."
                className="w-full pl-9 pr-3 py-1.5 bg-surface-1/50 border border-white/5 rounded-xl text-xs text-text-muted placeholder-text-muted cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Empty-State Table Container */}
        <div className="glass-card rounded-3xl border border-white/10 p-10 sm:p-14 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden mb-16">
          <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-red-primary/30 flex items-center justify-center mx-auto mb-6 shadow-red-glow-sm">
            <Trophy className="w-8 h-8 text-red-bright" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <span>Standby Mode</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mb-3">
            The leaderboard goes live when the coding period begins on Dec 4, 2026
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed max-w-lg mx-auto mb-4">
            {tabEmptyMessages[activeTab]}
          </p>
          <p className="text-xs text-text-muted font-mono mb-8">
            Active Sprint: {codingDateRange}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projects"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white text-xs font-bold shadow-red-glow transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/rules"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-text-secondary hover:text-white text-xs font-semibold transition-colors flex items-center justify-center"
            >
              <span>Points & Scoring Rules</span>
            </Link>
          </div>
        </div>

        {/* Scoring Rules Summary */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 max-w-4xl mx-auto">
          <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-bright" />
            <span>How Points Will Be Calculated</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-surface-1 border border-white/5 space-y-1">
              <div className="text-green-400 font-bold">Easy PRs — 10 Pts</div>
              <div className="text-text-muted text-[11px] font-sans">
                Documentation, typos, minor bugfixes, accessibility fixes.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-surface-1 border border-white/5 space-y-1">
              <div className="text-yellow-400 font-bold">Medium PRs — 25 Pts</div>
              <div className="text-text-muted text-[11px] font-sans">
                Feature modules, API endpoints, component additions.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-surface-1 border border-white/5 space-y-1">
              <div className="text-red-bright font-bold">Hard PRs — 50 Pts</div>
              <div className="text-text-muted text-[11px] font-sans">
                Core architecture, compiler passes, distributed engines.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
