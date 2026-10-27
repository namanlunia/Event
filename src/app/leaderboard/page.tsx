"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Crown,
  Flame,
  Search,
  Users,
  Building2,
  FolderGit2,
  Sparkles,
  ArrowRight,
  Medal,
} from "lucide-react";
import {
  getActiveContributors,
  getCampusAmbassadors,
  getColleges,
  getApprovedProjects,
} from "@/lib/dataService";
import { SITE_CONFIG } from "@/lib/site-config";
import { SampleBadge } from "@/components/visual/DemoModeBanner";
import AvatarDisplay from "@/components/visual/AvatarDisplay";
import { PHASES, formatDateRange, getCodingPeriodProgress } from "@/lib/season";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"contributors" | "ambassadors" | "colleges" | "projects">("contributors");
  const [timeframe, setTimeframe] = useState<"overall" | "weekly">("overall");
  const [searchQuery, setSearchQuery] = useState("");

  const contributors = getActiveContributors();
  const ambassadors = getCampusAmbassadors();
  const colleges = getColleges();
  const projects = getApprovedProjects();
  const isDemoMode = SITE_CONFIG.DEMO_MODE;

  const codingPhase = PHASES.find((p) => p.id === 3)!;
  const codingDateRange = formatDateRange(codingPhase);
  const codingProgress = getCodingPeriodProgress();

  const top1 = contributors[0];
  const top2 = contributors[1];
  const top3 = contributors[2];

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

        {/* Empty state when DEMO_MODE=false and coding period has not begun */}
        {!isDemoMode && contributors.length === 0 ? (
          <div className="space-y-12 max-w-4xl mx-auto">
            {/* Standby Banner */}
            <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/10 text-center relative overflow-hidden shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-red-primary/30 flex items-center justify-center mx-auto mb-6 shadow-red-glow-sm">
                <Trophy className="w-8 h-8 text-red-bright" />
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-3">
                The leaderboard goes live when the coding period begins
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xl mx-auto mb-6">
                Active coding runs from <strong className="text-white">{codingDateRange}</strong>. Pull requests merged by maintainers will automatically award points and populate the live standings.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/projects"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white text-xs font-bold shadow-red-glow transition-all flex items-center gap-2"
                >
                  <span>Browse Available Repositories</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/rules"
                  className="px-6 py-3 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-text-secondary hover:text-white text-xs font-semibold transition-colors"
                >
                  <span>Points & Evaluation Rules</span>
                </Link>
              </div>
            </div>

            {/* Scoring Rules Summary */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
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

            {/* Styled Preview Skeleton Podium */}
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                  Podium Standings Preview (Locked — {codingProgress.text})
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end opacity-60">
                <div className="glass-card p-6 rounded-2xl border border-white/5 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-surface-2 border border-slate-500/30 mx-auto flex items-center justify-center font-mono text-xs text-text-muted">
                    #2
                  </div>
                  <div className="h-4 bg-white/10 rounded w-24 mx-auto" />
                  <div className="h-3 bg-white/5 rounded w-16 mx-auto" />
                  <div className="text-[11px] font-mono text-text-muted">— pts</div>
                </div>
                <div className="glass-card p-8 rounded-2xl border border-red-primary/30 text-center space-y-3 md:-translate-y-4 shadow-red-glow-sm">
                  <div className="w-16 h-16 rounded-full bg-surface-2 border border-red-bright/40 mx-auto flex items-center justify-center font-mono text-sm text-red-bright font-bold">
                    #1
                  </div>
                  <div className="h-5 bg-white/15 rounded w-28 mx-auto" />
                  <div className="h-3 bg-white/5 rounded w-20 mx-auto" />
                  <div className="text-xs font-mono text-red-bright font-bold">— pts</div>
                </div>
                <div className="glass-card p-6 rounded-2xl border border-white/5 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-surface-2 border border-amber-600/30 mx-auto flex items-center justify-center font-mono text-xs text-text-muted">
                    #3
                  </div>
                  <div className="h-4 bg-white/10 rounded w-24 mx-auto" />
                  <div className="h-3 bg-white/5 rounded w-16 mx-auto" />
                  <div className="text-[11px] font-mono text-text-muted">— pts</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Podium for Top 3 (Visible when Contributors tab is active in Demo Mode) */}
            {activeTab === "contributors" && top1 && top2 && top3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-end mb-16">
                {/* Rank 2: Silver */}
                <div className="glass-card p-6 rounded-2xl border border-white/10 relative order-2 md:order-1 text-center group">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-surface-2 border border-slate-400 text-[11px] font-mono text-slate-300 font-bold flex items-center gap-1">
                    <Medal className="w-3 h-3 text-slate-300" />
                    <span>RANK #2</span>
                  </div>
                  <div className="my-3">
                    <AvatarDisplay
                      name={top2.full_name}
                      size="lg"
                      className="mx-auto border-2 border-slate-400 shadow-lg"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-red-bright transition-colors">
                    {top2.full_name}
                  </h3>
                  <p className="text-xs text-text-muted mb-2">{top2.college_name}</p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-2 border border-white/5 font-mono text-xs text-white">
                    <Flame className="w-3.5 h-3.5 text-red-bright" />
                    <AnimatedCounter
                      value={top2.points}
                      fallbackText="0"
                      className="font-bold text-red-bright"
                    />{" "}
                    pts
                  </div>
                  {isDemoMode && <div className="mt-2"><SampleBadge /></div>}
                </div>

                {/* Rank 1: Gold */}
                <div className="glass-card p-8 rounded-2xl border-2 border-red-primary/60 shadow-red-glow relative order-1 md:order-2 text-center group bg-surface-1/90 md:-translate-y-4">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-red-primary border border-red-bright text-xs font-mono text-white font-bold flex items-center gap-1.5 shadow-red-glow-sm">
                    <Crown className="w-4 h-4 text-yellow-300" />
                    <span>CHAMPION #1</span>
                  </div>
                  <div className="my-4">
                    <AvatarDisplay
                      name={top1.full_name}
                      size="xl"
                      className="mx-auto border-4 border-red-bright shadow-red-glow"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white group-hover:text-red-bright transition-colors">
                    {top1.full_name}
                  </h3>
                  <p className="text-xs text-text-secondary mb-3">{top1.college_name}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-red-primary/15 border border-red-primary/40 font-mono text-sm text-white">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <AnimatedCounter
                      value={top1.points}
                      fallbackText="0"
                      className="font-extrabold text-red-bright text-base"
                    />{" "}
                    pts
                  </div>
                  {(top1.streak_days ?? 0) > 0 && (
                    <div className="mt-3 text-xs font-mono text-text-muted flex items-center justify-center gap-1">
                      <span>🔥 {top1.streak_days}-Day Streak</span>
                    </div>
                  )}
                  {isDemoMode && <div className="mt-3"><SampleBadge /></div>}
                </div>

                {/* Rank 3: Bronze */}
                <div className="glass-card p-6 rounded-2xl border border-white/10 relative order-3 text-center group">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-surface-2 border border-amber-600 text-[11px] font-mono text-amber-500 font-bold flex items-center gap-1">
                    <Medal className="w-3 h-3 text-amber-500" />
                    <span>RANK #3</span>
                  </div>
                  <div className="my-3">
                    <AvatarDisplay
                      name={top3.full_name}
                      size="lg"
                      className="mx-auto border-2 border-amber-600 shadow-lg"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-red-bright transition-colors">
                    {top3.full_name}
                  </h3>
                  <p className="text-xs text-text-muted mb-2">{top3.college_name}</p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-2 border border-white/5 font-mono text-xs text-white">
                    <Flame className="w-3.5 h-3.5 text-red-bright" />
                    <AnimatedCounter
                      value={top3.points}
                      fallbackText="0"
                      className="font-bold text-red-bright"
                    />{" "}
                    pts
                  </div>
                  {isDemoMode && <div className="mt-2"><SampleBadge /></div>}
                </div>
              </div>
            )}

            {/* Tab Controls & Search */}
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

              {/* Timeframe & Search */}
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

                <div className="relative flex-grow sm:w-48">
                  <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search leaderboard..."
                    className="w-full pl-9 pr-3 py-1.5 bg-surface-1 border border-white/10 rounded-xl text-xs text-white placeholder-text-muted focus:outline-none focus:border-red-primary/60"
                  />
                </div>
              </div>
            </div>

            {/* Tab 1: Contributors Table */}
            {activeTab === "contributors" && (
              <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-1/90 border-b border-white/10 text-text-muted font-mono uppercase">
                      <tr>
                        <th className="py-4 px-6">Rank</th>
                        <th className="py-4 px-6">Contributor</th>
                        <th className="py-4 px-6">University</th>
                        <th className="py-4 px-6">PR Streak</th>
                        <th className="py-4 px-6 text-right">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      {contributors
                        .filter(
                          (c) =>
                            c.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (c.college_name || "").toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((c) => (
                          <tr
                            key={c.id}
                            className="hover:bg-white/[0.02] transition-colors group"
                          >
                            <td className="py-4 px-6">
                              <span
                                className={`font-bold inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs ${
                                  c.rank === 1
                                    ? "bg-red-primary/20 text-red-bright border border-red-bright font-black"
                                    : c.rank === 2
                                    ? "bg-slate-500/20 text-slate-200 border border-slate-400"
                                    : c.rank === 3
                                    ? "bg-amber-600/20 text-amber-500 border border-amber-600"
                                    : "text-text-muted"
                                }`}
                              >
                                #{c.rank}
                              </span>
                            </td>
                            <td className="py-4 px-6 font-sans">
                              <div className="flex items-center gap-3">
                                <AvatarDisplay
                                  name={c.full_name}
                                  size="sm"
                                />
                                <div>
                                  <div className="font-bold text-white group-hover:text-red-bright transition-colors flex items-center gap-2">
                                    <span>{c.full_name}</span>
                                    {isDemoMode && <SampleBadge />}
                                  </div>
                                  <div className="text-[11px] text-text-muted font-mono">
                                    {c.github_username ? `@${c.github_username}` : ""}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-text-secondary font-sans">
                              {c.college_name || "—"}
                            </td>
                            <td className="py-4 px-6 text-text-muted">
                              {(c.streak_days ?? 0) > 0 ? (
                                <span className="inline-flex items-center gap-1 text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                                  🔥 {c.streak_days} days
                                </span>
                              ) : (
                                "—"
                              )}
                            </td>
                            <td className="py-4 px-6 text-right font-black text-white text-sm">
                              <span className="text-red-bright">{c.points}</span> pts
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: Campus Ambassadors Table */}
            {activeTab === "ambassadors" && (
              <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-1/90 border-b border-white/10 text-text-muted font-mono uppercase">
                      <tr>
                        <th className="py-4 px-6">Rank</th>
                        <th className="py-4 px-6">Campus Ambassador</th>
                        <th className="py-4 px-6">College</th>
                        <th className="py-4 px-6 text-right">Referrals</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      {ambassadors
                        .filter(
                          (a) =>
                            a.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (a.college_name || "").toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((a) => (
                          <tr key={a.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="py-4 px-6 font-bold text-text-muted">
                              #{a.rank}
                            </td>
                            <td className="py-4 px-6 font-sans">
                              <div className="flex items-center gap-3">
                                <AvatarDisplay name={a.full_name} size="sm" />
                                <div>
                                  <div className="font-bold text-white group-hover:text-red-bright transition-colors flex items-center gap-2">
                                    <span>{a.full_name}</span>
                                    {isDemoMode && <SampleBadge />}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-text-secondary font-sans">
                              {a.college_name}
                            </td>
                            <td className="py-4 px-6 text-right text-red-bright font-bold">
                              {a.referrals_count}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 3: Colleges Leaderboard */}
            {activeTab === "colleges" && (
              <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-1/90 border-b border-white/10 text-text-muted font-mono uppercase">
                      <tr>
                        <th className="py-4 px-6">Rank</th>
                        <th className="py-4 px-6">Institution</th>
                        <th className="py-4 px-6">Active Contributors</th>
                        <th className="py-4 px-6 text-right">Total Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      {colleges
                        .filter((col) => col.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((col, idx) => (
                          <tr key={col.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-6 font-bold text-text-muted">
                              #{idx + 1}
                            </td>
                            <td className="py-4 px-6 font-sans font-bold text-white">
                              {col.name}
                            </td>
                            <td className="py-4 px-6 text-text-secondary">
                              {col.contributor_count} students
                            </td>
                            <td className="py-4 px-6 text-right text-red-bright font-bold">
                              {col.points_total.toLocaleString()} pts
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 4: Top Repositories */}
            {activeTab === "projects" && (
              <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-1/90 border-b border-white/10 text-text-muted font-mono uppercase">
                      <tr>
                        <th className="py-4 px-6">Repository</th>
                        <th className="py-4 px-6">Domain</th>
                        <th className="py-4 px-6">Open Issues</th>
                        <th className="py-4 px-6 text-right">Stars</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      {projects
                        .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((p) => (
                          <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-6 font-sans">
                              <Link
                                href={`/projects/${p.id}`}
                                className="font-bold text-white hover:text-red-bright transition-colors flex items-center gap-2"
                              >
                                <span>{p.name}</span>
                                {isDemoMode && <SampleBadge />}
                              </Link>
                            </td>
                            <td className="py-4 px-6 text-text-secondary">
                              {p.domain}
                            </td>
                            <td className="py-4 px-6 text-red-bright font-bold">
                              {p.open_issues_count}
                            </td>
                            <td className="py-4 px-6 text-right text-white">
                              ⭐ {p.stars_count}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
