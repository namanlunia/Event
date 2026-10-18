"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  GitPullRequest,
  CheckCircle2,
  ExternalLink,
  Award,
  Sparkles,
  MessageSquare,
  Clock,
  Flame,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { SITE_CONFIG } from "@/lib/site-config";
import { SampleBadge } from "@/components/visual/DemoModeBanner";
import AvatarDisplay from "@/components/visual/AvatarDisplay";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function MentorDashboard() {
  const { pullRequests, mergePR, currentPersona } = useAppStore();

  const [selectedQualityBonus, setSelectedQualityBonus] = useState<Record<string, number>>({});
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const pendingPRs = pullRequests.filter((pr) => pr.status === "pending" || pr.status === "approved");
  const mergedPRs = pullRequests.filter((pr) => pr.status === "merged");

  const handleMergeAction = (prId: string) => {
    const bonus = selectedQualityBonus[prId] || 5;
    mergePR(prId, bonus);
    setSuccessToast(`PR successfully merged! Awarded base points + ${bonus} pts quality bonus.`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-mono flex items-center gap-3 shadow-2xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-primary/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <AvatarDisplay name={currentPersona?.name || "Mentor"} size="lg" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-red-bright uppercase font-bold tracking-wider">
                TECHNICAL MENTOR WORKSPACE
              </span>
              {SITE_CONFIG.DEMO_MODE && <SampleBadge />}
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              {currentPersona?.name || "Technical Mentor"}
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Reviewing pull requests, grading code quality, and guiding student contributors.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-surface-1 border border-white/10 font-mono text-xs text-right">
            <span className="text-text-muted block text-[10px]">Track Status</span>
            <span className="text-white font-bold">Active Reviewer</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Pending PR Reviews
            </span>
            <Clock className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="font-heading font-black text-3xl text-white">
            <AnimatedCounter
              value={pendingPRs.length}
              fallbackText="0"
              className="font-heading font-black text-3xl text-white"
            />
          </div>
          <p className="text-[11px] text-text-muted font-mono mt-1">
            Target turnaround: &lt; 48 hours
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Reviewed & Merged
            </span>
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          </div>
          <div className="font-heading font-black text-3xl text-white">
            <AnimatedCounter
              value={mergedPRs.length}
              fallbackText="0"
              className="font-heading font-black text-3xl text-white"
            />
          </div>
          <p className="text-[11px] text-green-400 font-mono mt-1">
            Points tabulated on leaderboard
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Active Mentees
            </span>
            <Users className="w-4 h-4 text-red-bright" />
          </div>
          <div className="font-heading font-black text-3xl text-white">
            <AnimatedCounter
              value={SITE_CONFIG.DEMO_MODE ? 12 : 0}
              fallbackText="0"
              className="font-heading font-black text-3xl text-white"
            />
          </div>
          <p className="text-[11px] text-text-muted font-mono mt-1">
            Assigned in track workrooms
          </p>
        </div>
      </div>

      {/* PR Review Queue */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-black text-xl text-white">
              Pull Request Review Queue
            </h2>
            <p className="text-xs text-text-secondary">
              Inspect code submissions, assign quality multipliers (+0 to +15 pts), and merge.
            </p>
          </div>
          <span className="text-xs font-mono text-red-bright">
            {pendingPRs.length} PRs Awaiting Action
          </span>
        </div>

        {pendingPRs.length > 0 ? (
          <div className="space-y-4">
            {pendingPRs.map((pr) => {
              const currentBonus = selectedQualityBonus[pr.id] ?? 5;

              return (
                <div
                  key={pr.id}
                  className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 shadow-lg hover:border-red-primary/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <AvatarDisplay name={pr.contributor_name} size="md" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-text-muted">
                            #{pr.pr_number}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.2 rounded font-bold ${
                              pr.difficulty === "Hard"
                                ? "bg-red-primary/20 text-red-bright"
                                : pr.difficulty === "Medium"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-green-500/10 text-green-400"
                            }`}
                          >
                            {pr.difficulty} • {pr.points_awarded} pts base
                          </span>
                          <span className="text-[10px] font-mono text-text-secondary">
                            Repo: {pr.project_name}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-base text-white">
                          {pr.title}
                        </h3>
                        <p className="text-xs text-text-muted font-mono mt-0.5">
                          Submitted by {pr.contributor_name}
                        </p>
                      </div>
                    </div>

                    <a
                      href={pr.pr_url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-surface-2 border border-white/5 text-xs text-text-secondary hover:text-white flex items-center gap-1.5 transition-colors self-start"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Inspect Diff on GitHub</span>
                    </a>
                  </div>

                  {/* Quality Multiplier Grading Selector */}
                  <div className="p-4 rounded-xl bg-surface-1 border border-white/5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs font-mono text-red-bright font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Mentor Quality Score Multiplier:</span>
                      </span>
                      <span className="text-xs font-mono text-text-muted">
                        Total Points to Award:{" "}
                        <span className="text-white font-bold">
                          {pr.points_awarded + currentBonus} pts
                        </span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { label: "Standard (+0 pts)", value: 0 },
                        { label: "Good Tests (+5 pts)", value: 5 },
                        { label: "Great Architecture (+10 pts)", value: 10 },
                        { label: "Master Craftsmanship (+15 pts)", value: 15 },
                      ].map((tier) => (
                        <button
                          key={tier.value}
                          type="button"
                          onClick={() =>
                            setSelectedQualityBonus({
                              ...selectedQualityBonus,
                              [pr.id]: tier.value,
                            })
                          }
                          className={`p-2 rounded-lg text-xs font-mono border text-center transition-colors ${
                            currentBonus === tier.value
                              ? "bg-red-primary/20 border-red-bright text-white font-bold"
                              : "bg-surface-2 border-white/5 text-text-muted hover:text-white"
                          }`}
                        >
                          {tier.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Review Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => handleMergeAction(pr.id)}
                      className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve & Merge PR (+{pr.points_awarded + currentBonus} pts)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card p-12 rounded-2xl border border-white/10 text-center text-text-muted space-y-3">
            <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-2" />
            <h3 className="font-heading font-bold text-lg text-white">
              No Pending PRs in Queue
            </h3>
            <p className="text-xs text-text-secondary max-w-md mx-auto">
              Pull requests submitted by student contributors during the coding period will appear here for architectural review and bonus grading.
            </p>
            <div className="pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-2 border border-white/10 text-xs text-white hover:border-white/20 transition-colors"
              >
                <span>Browse Approved Repositories</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
