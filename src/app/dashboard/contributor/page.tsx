"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Award,
  GitPullRequest,
  Trophy,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
  Share2,
  FileCheck,
  Zap,
} from "lucide-react";
import {
  MOCK_PRS,
  MOCK_BADGES,
  MOCK_CONTRIBUTORS,
  MOCK_SAMPLE_CERTIFICATE,
} from "@/data/mockDatabase";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ContributorDashboard() {
  const contributor = MOCK_CONTRIBUTORS[0]; // Aarav Patel
  const [showShareModal, setShowShareModal] = useState(false);

  const weeklyData = [
    { week: "Sprint 1 (Nov 18)", points: 280, prs: 2 },
    { week: "Sprint 2 (Nov 25)", points: 540, prs: 4 },
    { week: "Sprint 3 (Dec 02)", points: 890, prs: 6 },
    { week: "Sprint 4 (Current)", points: 1240, prs: 8 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Contributor Welcome & Top Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-primary/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={contributor.avatar_url}
            alt={contributor.full_name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-red-bright shadow-red-glow-sm"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-red-bright uppercase font-bold tracking-wider">
                CONTRIBUTOR PROFILE
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-2 text-[10px] font-mono text-text-muted">
                {contributor.college_name}
              </span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Welcome back, {contributor.full_name}!
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              You are currently leading the global leaderboard in 1st Place.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowShareModal(true)}
            className="px-4 py-2.5 rounded-xl bg-surface-2 border border-white/10 hover:border-red-primary/40 text-xs font-mono text-white transition-colors flex items-center gap-2"
          >
            <Share2 className="w-3.5 h-3.5 text-red-bright" />
            <span>Share Public Profile</span>
          </button>

          <Link
            href="/projects"
            className="px-5 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-bold shadow-red-glow transition-all flex items-center gap-2"
          >
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>Find New Issues</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Points */}
        <div className="glass-card p-6 rounded-2xl border border-red-primary/30 relative group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Total Points
            </span>
            <div className="p-2 rounded-xl bg-red-primary/10 text-red-bright">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-black text-3xl text-white">
            {contributor.points}
            <span className="text-xs font-mono text-red-bright ml-1">pts</span>
          </div>
          <p className="text-[11px] text-green-400 font-mono mt-1">
            +350 pts earned this sprint
          </p>
        </div>

        {/* Global Rank */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 relative group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Global Standing
            </span>
            <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-400">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-black text-3xl text-white">
            Rank #{contributor.rank}
          </div>
          <p className="text-[11px] text-yellow-400 font-mono mt-1">
            Top 0.1% of 2,500+ builders
          </p>
        </div>

        {/* Merged PRs */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 relative group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              PRs Merged
            </span>
            <div className="p-2 rounded-xl bg-surface-2 text-text-muted group-hover:text-white transition-colors">
              <GitPullRequest className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-black text-3xl text-white">8</div>
          <p className="text-[11px] text-text-muted font-mono mt-1">
            Across 3 approved repositories
          </p>
        </div>

        {/* Daily Streak */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 relative group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Active Streak
            </span>
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-black text-3xl text-white flex items-center gap-1.5">
            <span>{contributor.streak_days}</span>
            <span className="text-xs font-mono text-text-muted">days</span>
          </div>
          <p className="text-[11px] text-orange-400 font-mono mt-1">
            🔥 14-day streak bonus active (+50 pts)
          </p>
        </div>
      </div>

      {/* Activity Chart & Certificate Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recharts Contributor Points Graph */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Points Velocity Over Sprints
              </h3>
              <p className="text-xs text-text-muted">
                Cumulative points scored across winter sprint evaluations.
              </p>
            </div>
            <span className="text-xs font-mono text-red-bright font-bold">
              Sprint 4 Active
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E11D2E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#E11D2E" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="week"
                  stroke="#71717A"
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis stroke="#71717A" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111114",
                    border: "1px solid rgba(225,29,46,0.4)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="points"
                  stroke="#FF3B4A"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#redGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Certificate Ready Card */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-red-primary/40 bg-gradient-to-b from-red-primary/10 to-surface-1 flex flex-col justify-between shadow-red-glow-sm">
          <div>
            <div className="w-12 h-12 rounded-xl bg-red-primary/20 text-red-bright border border-red-primary/40 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-red-primary/20 text-red-bright font-bold">
              EARNED & VERIFIED
            </span>
            <h3 className="font-heading font-bold text-xl text-white mt-2 mb-1">
              Digital Certificate of Excellence
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-4">
              You have qualified for the official OWOC Certificate for Rank #1 in WinterVision Core.
            </p>
            <div className="p-3 rounded-xl bg-surface-2 border border-white/5 font-mono text-xs text-text-muted mb-4 space-y-1">
              <div>UID: {MOCK_SAMPLE_CERTIFICATE.id}</div>
              <div>Hash: 0x8F9A4E27B13...</div>
            </div>
          </div>

          <Link
            href={`/certificate/${MOCK_SAMPLE_CERTIFICATE.id}`}
            className="w-full py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-bold shadow-red-glow transition-all flex items-center justify-center gap-2"
          >
            <span>View & Download Certificate</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Pull Requests Status Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-white">
              My Pull Requests
            </h3>
            <p className="text-xs text-text-muted">
              Status, assigned points, and feedback from repository mentors.
            </p>
          </div>
          <span className="text-xs font-mono text-text-secondary">
            {MOCK_PRS.length} Tracked
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-1/90 border-b border-white/10 text-text-muted font-mono uppercase">
              <tr>
                <th className="py-4 px-6">PR #</th>
                <th className="py-4 px-6">Title & Repository</th>
                <th className="py-4 px-6">Difficulty</th>
                <th className="py-4 px-6">Quality Multiplier</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {MOCK_PRS.map((pr) => (
                <tr key={pr.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 text-text-muted font-bold">
                    #{pr.pr_number}
                  </td>
                  <td className="py-4 px-6 font-sans">
                    <div className="font-semibold text-white">{pr.title}</div>
                    <div className="text-[11px] text-text-muted font-mono">
                      Repo: {pr.project_name}
                    </div>
                    {pr.mentor_feedback && (
                      <div className="text-[11px] text-text-secondary italic mt-1 font-sans">
                        &ldquo;{pr.mentor_feedback}&rdquo;
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        pr.difficulty === "Easy"
                          ? "bg-green-500/10 text-green-400"
                          : pr.difficulty === "Medium"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-red-primary/20 text-red-bright"
                      }`}
                    >
                      {pr.difficulty}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-text-muted">
                    {pr.quality_bonus > 0 ? (
                      <span className="text-green-400 font-bold">
                        +{pr.quality_bonus} pts bonus
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold border ${
                        pr.status === "merged"
                          ? "bg-green-500/10 text-green-400 border-green-500/30"
                          : pr.status === "approved"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                      }`}
                    >
                      {pr.status === "merged" && <CheckCircle2 className="w-3 h-3" />}
                      {pr.status === "pending" && <Clock className="w-3 h-3" />}
                      <span>{pr.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-black text-sm text-red-bright">
                    +{pr.points_awarded + pr.quality_bonus} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Badges & Achievements Grid */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <div>
          <h3 className="font-heading font-bold text-lg text-white">
            Badges & Achievements
          </h3>
          <p className="text-xs text-text-muted">
            Milestones unlocked through continuous craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {MOCK_BADGES.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border text-center transition-all ${
                b.unlocked
                  ? "bg-surface-1 border-red-primary/40 shadow-red-glow-sm"
                  : "bg-surface-2/40 border-white/5 opacity-50"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-2 ${
                  b.unlocked
                    ? "bg-red-primary/20 text-red-bright border border-red-bright/40"
                    : "bg-surface-2 text-text-muted"
                }`}
              >
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-xs text-white truncate">
                {b.title}
              </h4>
              <p className="text-[10px] text-text-muted line-clamp-2 mt-1">
                {b.description}
              </p>
              <span
                className={`text-[9px] font-mono uppercase mt-2 inline-block px-1.5 py-0.5 rounded ${
                  b.unlocked
                    ? "bg-green-500/10 text-green-400"
                    : "bg-white/5 text-text-muted"
                }`}
              >
                {b.unlocked ? "Unlocked" : "Locked"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Shareable Public Profile Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface-1 border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-center">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-white"
            >
              ✕
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={contributor.avatar_url}
              alt={contributor.full_name}
              className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-red-bright mb-3"
            />
            <h3 className="font-heading font-bold text-xl text-white">
              {contributor.full_name}
            </h3>
            <p className="text-xs text-text-muted font-mono mb-4">
              @{contributor.github_username} • {contributor.college_name}
            </p>

            <div className="grid grid-cols-3 gap-2 p-3 bg-surface-2 rounded-xl border border-white/5 mb-6 text-xs font-mono">
              <div>
                <span className="text-text-muted block text-[10px]">Rank</span>
                <span className="text-red-bright font-bold">#{contributor.rank}</span>
              </div>
              <div>
                <span className="text-text-muted block text-[10px]">Points</span>
                <span className="text-white font-bold">{contributor.points}</span>
              </div>
              <div>
                <span className="text-text-muted block text-[10px]">Streak</span>
                <span className="text-orange-400 font-bold">{contributor.streak_days}d</span>
              </div>
            </div>

            <p className="text-xs text-text-secondary mb-6">
              Share your verified OWOC contributor profile badge with recruiters and social networks!
            </p>

            <button
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.clipboard) {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/leaderboard?user=${contributor.github_username}`
                  );
                  alert("Public profile link copied to clipboard!");
                  setShowShareModal(false);
                }
              }}
              className="w-full py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-bold transition-all"
            >
              Copy Public Profile URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
