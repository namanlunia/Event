"use client";

import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  Code2,
  ArrowRight,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
} from "lucide-react";
import { PHASES, formatDateRange } from "@/lib/season";

export default function ProjectsDirectoryPage() {
  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>Open Source Repositories</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Explore Repositories
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary">
            Find vetted repositories aligned with your domain, claim issues tagged with points, and start shipping pull requests under senior mentors.
          </p>
        </div>

        {/* Polished Empty-State Card: Projects To Be Announced */}
        <div className="glass-card p-12 sm:p-16 rounded-3xl border border-white/10 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden mb-16">
          <div className="w-20 h-20 rounded-2xl bg-surface-2 border border-red-primary/30 flex items-center justify-center mx-auto mb-6 shadow-red-glow-sm">
            <FolderGit2 className="w-10 h-10 text-red-bright" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Projects To Be Announced</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-white mb-4">
            Repository Onboarding in Progress
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto">
            Open-source maintainers are currently submitting their repositories for review. Participating projects across AI/ML, Web3, Distributed Systems, Cloud, and Mobile will be unveiled during {formatDateRange(PHASES[0])} prior to the coding kickoff.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-10 text-left">
            <div className="p-4 rounded-xl bg-surface-1 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-red-bright text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Strict Vetting</span>
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Only production-ready repos with verified maintainers are admitted.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface-1 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-red-bright text-xs font-bold">
                <GitPullRequest className="w-4 h-4" />
                <span>Curated Issues</span>
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Pre-labeled Good First Issues with explicit difficulty point tiers.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface-1 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-red-bright text-xs font-bold">
                <Code2 className="w-4 h-4" />
                <span>Dedicated Mentors</span>
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Maintainers committed to prompt reviews and actionable PR feedback.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply/project-admin"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white text-xs font-bold shadow-red-glow hover:shadow-red-glow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Onboard Your Repository</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/rules"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-text-secondary hover:text-white text-xs font-semibold transition-colors flex items-center justify-center"
            >
              <span>Review Project Guidelines</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
