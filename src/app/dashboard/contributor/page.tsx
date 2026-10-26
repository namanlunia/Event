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
  FolderGit2,
  ShieldCheck,
} from "lucide-react";
import { getActiveContributors } from "@/lib/dataService";
import {
  MOCK_PRS,
  MOCK_BADGES,
  MOCK_SAMPLE_CERTIFICATE,
} from "@/lib/demo-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { SampleBadge } from "@/components/visual/DemoModeBanner";
import AvatarDisplay from "@/components/visual/AvatarDisplay";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useAppStore } from "@/lib/store";
import { PHASES, getCodingPeriodProgress } from "@/lib/season";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ContributorDashboard() {
  const { currentPersona } = useAppStore();
  const isDemoMode = SITE_CONFIG.DEMO_MODE;
  const [showShareModal, setShowShareModal] = useState(false);

  const codingStartDate = new Date(`${PHASES[2].startDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const myPrs = isDemoMode ? MOCK_PRS : [];
  const mergedPrs = myPrs.filter((p) => p.status === "merged");
  const basePrPoints = mergedPrs.reduce(
    (acc, pr) => acc + (pr.points_awarded || 0) + (pr.quality_bonus || 0),
    0
  );
  const streakDays = isDemoMode ? 14 : 0;
  const streakBonus = streakDays >= 7 ? 15 : 0;
  const totalPoints = isDemoMode ? basePrPoints + streakBonus : 0;
  const totalPrs = mergedPrs.length;

  // Derive rank strictly from same dataset as leaderboard
  const allContributors = getActiveContributors();
  const sortedContributors = [...allContributors].sort(
    (a, b) => (b.points || 0) - (a.points || 0)
  );
  const myRankIdx = sortedContributors.findIndex(
    (c) => c.full_name === currentPersona.name || c.username === "aaravcode"
  );
  const currentRank = "Standby";

  // Points Progression chart matching exact merged PR timeline and streak
  const weeklyData = isDemoMode
    ? [
        { week: "Week 1", points: 65, prs: 1 }, // PR #42 merged (+65 pts)
        { week: "Week 2", points: 95, prs: 2 }, // PR #78 merged (+30 pts)
        { week: "Week 3", points: 105, prs: 3 }, // PR #15 merged (+10 pts)
        { week: "Week 4", points: 120, prs: 3 }, // +15 streak bonus, final 120 pts
      ]
    : [
        { week: "Week 1", points: 0, prs: 0 },
        { week: "Week 2", points: 0, prs: 0 },
        { week: "Week 3", points: 0, prs: 0 },
        { week: "Week 4", points: 0, prs: 0 },
      ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Contributor Welcome & Top Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-primary/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <AvatarDisplay
            name={currentPersona.name}
            size="lg"
            className="border-2 border-red-bright shadow-red-glow-sm"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-red-bright uppercase font-bold tracking-wider">
                CONTRIBUTOR WORKSPACE
              </span>
              {isDemoMode && <SampleBadge />}
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Welcome, {currentPersona.name}!
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              {isDemoMode
                ? `Sample dashboard mode (Coding period opens ${codingStartDate}).`
                : `Active contributor account. Coding period opens ${codingStartDate}.`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/projects"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white text-xs font-bold shadow-red-glow hover:shadow-red-glow-lg transition-all flex items-center gap-2"
          >
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>Browse Repositories</span>
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
            <AnimatedCounter value={totalPoints} fallbackText="0" />
          </div>
          <span className="text-xs text-text-muted mt-1 block">
            {isDemoMode ? "Across sample sprints" : "Earned from merged pull requests"}
          </span>
        </div>

        {/* Pull Requests Merged */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Merged PRs
            </span>
            <div className="p-2 rounded-xl bg-surface-2 text-text-muted">
              <GitPullRequest className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-black text-3xl text-white">
            <AnimatedCounter value={totalPrs} fallbackText="0" />
          </div>
          <span className="text-xs text-text-muted mt-1 block">
            {isDemoMode ? "Verified sample PRs" : "0 pull requests submitted"}
          </span>
        </div>

        {/* Global Standings Rank */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Standing Rank
            </span>
            <div className="p-2 rounded-xl bg-surface-2 text-yellow-400">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-black text-3xl text-white">
            {currentRank}
          </div>
          <span className="text-xs text-text-muted mt-1 block">
            Opens {codingStartDate}
          </span>
        </div>

        {/* Contribution Streak */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Current Streak
            </span>
            <div className="p-2 rounded-xl bg-surface-2 text-orange-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-black text-3xl text-white">
            <AnimatedCounter value={streakDays} suffix=" Days" fallbackText="0 Days" />
          </div>
          <span className="text-xs text-text-muted mt-1 block">
            {isDemoMode ? "Consecutive activity bonus" : "Consecutive days with PRs"}
          </span>
        </div>
      </div>

      {/* Chart and Certificate Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sprint Performance Chart */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Sprint Contribution Trajectory
              </h3>
              <p className="text-xs text-text-muted">
                {isDemoMode
                  ? "Points accumulated across winter coding sprint cycles (Sample)"
                  : "Points accumulated will chart automatically as PRs are merged."}
              </p>
            </div>
            {isDemoMode && <SampleBadge />}
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
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
                <YAxis width={40} stroke="#71717A" fontSize={10} tickLine={false} />
                <Tooltip
                  allowEscapeViewBox={{ x: false, y: false }}
                  wrapperStyle={{ zIndex: 50, outline: "none" }}
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

        {/* Certificate Card */}
        {isDemoMode ? (
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-red-primary/40 bg-gradient-to-b from-red-primary/10 to-surface-1 flex flex-col justify-between shadow-red-glow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-primary/20 text-red-bright border border-red-primary/40 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-red-primary/20 text-red-bright font-bold">
                  PROGRAM CREDENTIAL
                </span>
                <SampleBadge />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-1">
                Digital Certificate of Excellence
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Official certificates of completion are issued to all qualifying participants upon program completion on December 31, 2026.
              </p>
            </div>

            <Link
              href="/rules"
              className="w-full py-2.5 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-text-secondary hover:text-white text-xs font-semibold text-center transition-colors"
            >
              View Qualification Rules
            </Link>
          </div>
        ) : (
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-2 text-text-muted border border-white/5 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-surface-2 text-text-muted font-bold">
                NOT YET ISSUED
              </span>
              <h3 className="font-heading font-bold text-xl text-white mt-2 mb-1">
                Certificate of Participation
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Merge at least 1 approved pull request during the active coding period to qualify for your official Digital Certificate of Participation.
              </p>
            </div>

            <Link
              href="/rules"
              className="w-full py-2.5 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-text-secondary hover:text-white text-xs font-semibold text-center transition-colors"
            >
              View Qualification Rules
            </Link>
          </div>
        )}
      </div>

      {/* Pull Requests Status Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-bold text-lg text-white">
                My Pull Requests
              </h3>
              {isDemoMode && <SampleBadge />}
            </div>
            <p className="text-xs text-text-muted">
              Status, assigned points, and feedback from repository maintainers.
            </p>
          </div>
          <span className="text-xs font-mono text-text-secondary">
            {isDemoMode ? `${MOCK_PRS.length} Tracked` : "0 Tracked"}
          </span>
        </div>

        {isDemoMode ? (
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
                    <td className="py-4 px-6 text-right font-mono">
                      {pr.status === "merged" ? (
                        <span className="font-black text-sm text-red-bright">
                          +{pr.points_awarded + pr.quality_bonus} pts
                        </span>
                      ) : pr.status === "approved" ? (
                        <span className="text-text-muted font-normal text-xs italic">
                          +{pr.points_awarded} pts (pending merge)
                        </span>
                      ) : (
                        <span className="text-text-muted font-normal text-xs">
                          {pr.points_awarded ? `+${pr.points_awarded} pts` : "—"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-surface-2 border border-white/5 flex items-center justify-center mx-auto text-text-muted">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-white text-base">
              No pull requests recorded yet
            </h4>
            <p className="text-xs text-text-secondary max-w-sm mx-auto">
              Browse approved project repositories, claim an open issue, and submit your pull request on GitHub once the coding period begins.
            </p>
            <div className="pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-bold shadow-red-glow transition-all"
              >
                <span>Browse Projects</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Badges & Achievements Grid */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <div>
          <h3 className="font-heading font-bold text-lg text-white">
            Badges & Achievements
          </h3>
          <p className="text-xs text-text-muted">
            {isDemoMode
              ? "Sample achievement milestones."
              : "Solve issues and build streaks to unlock achievement badges."}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {MOCK_BADGES.map((b) => {
            let isUnlocked = false;
            if (isDemoMode) {
              if (b.code === "first_pr") isUnlocked = mergedPrs.length >= 1;
              else if (b.code === "streak_7") isUnlocked = streakDays >= 7;
              else if (b.code === "code_warrior_10") isUnlocked = mergedPrs.length >= 10;
              else if (b.code === "top_contributor") isUnlocked = myRankIdx !== -1 ? myRankIdx < 5 : true;
              else isUnlocked = Boolean(b.unlocked);
            }
            return (
              <div
                key={b.id}
                className={`p-4 rounded-xl border text-center transition-all ${
                  isUnlocked
                    ? "bg-surface-1 border-red-primary/40 shadow-red-glow-sm"
                    : "bg-surface-2/40 border-white/5 opacity-50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-2 ${
                    isUnlocked
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
                    isUnlocked
                      ? "bg-green-500/10 text-green-400"
                      : "bg-white/5 text-text-muted"
                  }`}
                >
                  {isUnlocked ? "Unlocked" : "Locked"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
