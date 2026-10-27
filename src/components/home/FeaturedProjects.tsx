"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star, GitFork, AlertCircle, ArrowUpRight, FolderOpen } from "lucide-react";
import { getApprovedProjects } from "@/lib/dataService";
import { SITE_CONFIG } from "@/lib/site-config";

export default function FeaturedProjects() {
  const allProjects = getApprovedProjects();
  const featured = allProjects.slice(0, 4);
  const isDemoMode = SITE_CONFIG.DEMO_MODE;

  // Empty state — no projects onboarded yet
  if (!isDemoMode && featured.length === 0) {
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
          </div>
          <div className="glass-card rounded-2xl border border-white/10 p-12 text-center max-w-xl mx-auto">
            <FolderOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary font-semibold">Project onboarding opens Oct 28, 2026</p>
            <p className="text-xs text-text-muted mt-2">
              Maintainers can apply to onboard their open-source repositories once the registration period begins.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright hover:bg-red-primary/20 transition-colors"
            >
              <span>Browse Projects Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

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
            {isDemoMode ? (
              <>
                <span>Explore All Projects</span>
                <span className="text-yellow-400 ml-1">(Sample)</span>
              </>
            ) : (
              <span>Explore All Projects</span>
            )}
            <ArrowRight className="w-3.5 h-3.5 text-red-bright" />
          </Link>
        </div>

        {isDemoMode && (
          <p className="text-xs font-mono text-yellow-400/80 mb-6 text-center">
            ⚠ Sample repositories shown — real projects will appear after maintainer onboarding opens
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-white/10 hover:border-red-primary/50 group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-2 text-red-bright border border-red-primary/30">
                        {project.domain}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-text-muted">
                        {project.difficulty}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white group-hover:text-red-bright transition-colors flex items-center gap-2">
                      <span>{project.name}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-bright" />
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-text-muted font-mono">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500/20" />
                      {project.stars_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {project.forks_count}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 mb-4">
                  {project.tagline}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-2 text-text-secondary border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Footer Details */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-primary/40 to-surface-2 border border-white/10 flex items-center justify-center text-[9px] font-bold text-white">
                    {project.maintainer_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                  </div>
                  <span className="text-text-muted text-[11px]">
                    Lead: {project.maintainer_name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-red-bright font-mono text-[11px]">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{project.open_issues_count} open issues</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
