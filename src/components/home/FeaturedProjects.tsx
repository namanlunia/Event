"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FolderOpen, Code2, Sparkles } from "lucide-react";
import { PHASES, formatDateRange } from "@/lib/season";

export default function FeaturedProjects() {
  return (
    <section className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
              <span>Handpicked Codebases</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Featured Repositories
            </h2>
            <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-xl">
              High-impact repositories looking for active contributors this winter.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-1 border border-white/10 hover:border-red-primary/40 text-xs font-mono text-text-primary hover:text-white transition-all w-fit"
          >
            <span>Explore Projects Directory</span>
            <ArrowRight className="w-3.5 h-3.5 text-red-bright" />
          </Link>
        </div>

        {/* Polished To Be Announced Card */}
        <div className="glass-card rounded-3xl border border-white/10 p-10 sm:p-14 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-red-primary/30 flex items-center justify-center mx-auto mb-6 shadow-red-glow-sm">
            <FolderOpen className="w-8 h-8 text-red-bright" />
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase font-bold mb-3 shadow-red-glow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>To Be Announced</span>
          </div>
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-3">
            To Be Announced: Repositories Unveiled Soon
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed max-w-lg mx-auto mb-8">
            Project applications and repository vetting are currently in progress for {formatDateRange(PHASES[0])}. The full catalog of open-source projects will be announced ahead of the coding sprint.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply/project-admin"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white text-xs font-bold shadow-red-glow hover:shadow-red-glow-lg transition-all flex items-center justify-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              <span>Onboard Your Repository</span>
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-text-secondary hover:text-white text-xs font-semibold transition-colors flex items-center justify-center"
            >
              <span>View Projects Directory</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
