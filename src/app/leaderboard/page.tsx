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
  ArrowUpRight,
  Medal,
} from "lucide-react";
import {
  MOCK_CONTRIBUTORS,
  MOCK_AMBASSADORS,
  MOCK_COLLEGES,
  MOCK_PROJECTS,
} from "@/data/mockDatabase";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"contributors" | "ambassadors" | "colleges" | "projects">("contributors");
  const [timeframe, setTimeframe] = useState<"overall" | "weekly">("overall");
  const [searchQuery, setSearchQuery] = useState("");

  const top1 = MOCK_CONTRIBUTORS[0];
  const top2 = MOCK_CONTRIBUTORS[1];
  const top3 = MOCK_CONTRIBUTORS[2];

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
            Live Program Leaderboard
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary">
            Real-time standings based on merged pull requests, mentor quality multipliers, and daily contribution streaks.
          </p>
        </div>

        {/* Podium for Top 3 (Visible when Contributors tab is active) */}
        {activeTab === "contributors" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-end mb-16">
            {/* Rank 2: Silver */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 relative order-2 md:order-1 text-center group">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-surface-2 border border-slate-400 text-[11px] font-mono text-slate-300 font-bold flex items-center gap-1">
                <Medal className="w-3 h-3 text-slate-300" />
                <span>RANK #2</span>
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

            {/* Rank 1: Gold */}
            <div className="glass-card p-8 rounded-2xl border-2 border-red-primary/60 shadow-red-glow relative order-1 md:order-2 text-center group bg-surface-1/90 md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-red-primary border border-red-bright text-xs font-mono text-white font-bold flex items-center gap-1.5 shadow-red-glow-sm">
                <Crown className="w-4 h-4 text-yellow-300" />
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
              <div className="mt-3 text-xs font-mono text-text-muted flex items-center justify-center gap-1">
                <span>🔥 {top1.streak_days}-Day Streak</span>
              </div>
            </div>

            {/* Rank 3: Bronze */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 relative order-3 text-center group">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-surface-2 border border-amber-600 text-[11px] font-mono text-amber-500 font-bold flex items-center gap-1">
                <Medal className="w-3 h-3 text-amber-500" />
                <span>RANK #3</span>
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
        )}

        {/* Tab & Filter Navigation Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Main Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveTab("contributors")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === "contributors"
                  ? "bg-red-primary text-white shadow-red-glow-sm"
                  : "bg-surface-1 text-text-secondary hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Contributors</span>
            </button>

            <button
              onClick={() => setActiveTab("ambassadors")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === "ambassadors"
                  ? "bg-red-primary text-white shadow-red-glow-sm"
                  : "bg-surface-1 text-text-secondary hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Campus Ambassadors</span>
            </button>

            <button
              onClick={() => setActiveTab("colleges")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === "colleges"
                  ? "bg-red-primary text-white shadow-red-glow-sm"
                  : "bg-surface-1 text-text-secondary hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Colleges</span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === "projects"
                  ? "bg-red-primary text-white shadow-red-glow-sm"
                  : "bg-surface-1 text-text-secondary hover:text-white"
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Projects</span>
            </button>
          </div>

          {/* Timeframe & Search */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center p-1 bg-surface-1 border border-white/10 rounded-xl text-xs font-mono">
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
                  {MOCK_CONTRIBUTORS.filter((c) =>
                    c.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (c.college_name || "").toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((c) => {
                    const isTop3 = (c.rank || 0) <= 3;
                    return (
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
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={c.avatar_url}
                              alt={c.full_name}
                              className="w-8 h-8 rounded-full object-cover border border-white/10"
                            />
                            <div>
                              <div className="font-bold text-white group-hover:text-red-bright transition-colors">
                                {c.full_name}
                              </div>
                              <div className="text-[11px] text-text-muted font-mono">
                                @{c.github_username}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-sans text-text-secondary">
                          {c.college_name}
                        </td>
                        <td className="py-4 px-6 text-text-muted">
                          <span className="flex items-center gap-1 text-orange-400">
                            <Flame className="w-3.5 h-3.5 text-red-bright" />
                            {c.streak_days} days
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-black text-sm text-red-bright">
                          {c.points} pts
                        </td>
                      </tr>
                    );
                  })}
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
                    <th className="py-4 px-6">Ambassador</th>
                    <th className="py-4 px-6">University</th>
                    <th className="py-4 px-6">Referral Code</th>
                    <th className="py-4 px-6">Reward Tier</th>
                    <th className="py-4 px-6 text-right">Referrals</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {MOCK_AMBASSADORS.map((amb) => (
                    <tr key={amb.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="py-4 px-6 font-bold text-text-muted">
                        #{amb.rank}
                      </td>
                      <td className="py-4 px-6 font-sans">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={amb.avatar_url}
                            alt={amb.full_name}
                            className="w-8 h-8 rounded-full object-cover border border-white/10"
                          />
                          <span className="font-bold text-white group-hover:text-red-bright transition-colors">
                            {amb.full_name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-sans text-text-secondary">
                        {amb.college_name}
                      </td>
                      <td className="py-4 px-6 text-red-bright font-bold">
                        {amb.referral_code}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-0.5 rounded bg-surface-2 text-text-secondary border border-white/5">
                          {amb.reward_tier}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-black text-sm text-white">
                        {amb.referrals_count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Colleges Table */}
        {activeTab === "colleges" && (
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-1/90 border-b border-white/10 text-text-muted font-mono uppercase">
                  <tr>
                    <th className="py-4 px-6">Rank</th>
                    <th className="py-4 px-6">College / University</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6">Registered Builders</th>
                    <th className="py-4 px-6 text-right">Aggregate Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {MOCK_COLLEGES.map((col, idx) => (
                    <tr key={col.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="py-4 px-6 font-bold text-text-muted">
                        #{idx + 1}
                      </td>
                      <td className="py-4 px-6 font-sans font-bold text-white group-hover:text-red-bright transition-colors">
                        {col.name}
                      </td>
                      <td className="py-4 px-6 font-sans text-text-secondary">
                        {col.city}, {col.state}
                      </td>
                      <td className="py-4 px-6 text-text-secondary">
                        {col.contributor_count}
                      </td>
                      <td className="py-4 px-6 text-right font-black text-sm text-red-bright">
                        {col.points_total.toLocaleString()} pts
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Projects Table */}
        {activeTab === "projects" && (
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-1/90 border-b border-white/10 text-text-muted font-mono uppercase">
                  <tr>
                    <th className="py-4 px-6">Rank</th>
                    <th className="py-4 px-6">Project</th>
                    <th className="py-4 px-6">Domain</th>
                    <th className="py-4 px-6">Difficulty</th>
                    <th className="py-4 px-6">Stars</th>
                    <th className="py-4 px-6 text-right">Open Issues</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {MOCK_PROJECTS.map((proj, idx) => (
                    <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="py-4 px-6 font-bold text-text-muted">
                        #{idx + 1}
                      </td>
                      <td className="py-4 px-6 font-sans">
                        <Link
                          href={`/projects/${proj.id}`}
                          className="font-bold text-white group-hover:text-red-bright transition-colors flex items-center gap-1.5"
                        >
                          <span>{proj.name}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-0.5 rounded bg-surface-2 text-red-bright border border-red-primary/30 text-[11px]">
                          {proj.domain}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-text-muted">
                        {proj.difficulty}
                      </td>
                      <td className="py-4 px-6 text-text-secondary">
                        ★ {proj.stars_count}
                      </td>
                      <td className="py-4 px-6 text-right font-black text-sm text-red-bright">
                        {proj.open_issues_count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
