"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Code2,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
  Search,
  Filter,
} from "lucide-react";
import { PHASES, formatDateRange } from "@/lib/season";

export default function ProjectsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");

  const domains = ["All", "AI/ML", "Web3", "Cloud & DevOps", "Full-Stack", "Mobile", "Systems"];

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
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

        {/* Filter & Search Bar */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 mb-10 shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-grow w-full">
              <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repositories by name, tech stack, or keywords (unveiling soon)..."
                disabled
                className="w-full pl-11 pr-4 py-2.5 bg-surface-1 border border-white/10 rounded-xl text-xs text-white placeholder-text-muted cursor-not-allowed opacity-80"
              />
            </div>
          </div>

          {/* Domain Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
            <span className="text-xs font-mono text-text-muted mr-2 flex items-center gap-1.5 flex-shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Domain:</span>
            </span>
            {domains.map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                  selectedDomain === dom
                    ? "bg-red-primary text-white shadow-red-glow-sm"
                    : "bg-surface-1 text-text-secondary hover:text-white border border-white/5"
                }`}
              >
                {dom}
              </button>
            ))}
          </div>
        </div>

        {/* Polished Empty-State Card: To Be Announced */}
        <div className="glass-card p-12 sm:p-16 rounded-3xl border border-white/10 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden mb-16">
          <div className="w-20 h-20 rounded-2xl bg-surface-2 border border-red-primary/30 flex items-center justify-center mx-auto mb-6 shadow-red-glow-sm">
            <FolderGit2 className="w-10 h-10 text-red-bright" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase font-bold mb-4 shadow-red-glow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>To Be Announced</span>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-4xl text-white mb-4">
            To Be Announced: Repositories Unveiled Soon
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
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white text-xs font-bold shadow-red-glow hover:shadow-red-glow-lg transition-all flex items-center justify-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              <span>Onboard Your Repository</span>
            </Link>
            <Link
              href="/rules"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-text-secondary hover:text-white text-xs font-semibold transition-colors flex items-center justify-center"
            >
              <span>Points & Rules Guide</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
