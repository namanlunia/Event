"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star, GitFork, AlertCircle, ArrowUpRight } from "lucide-react";
import { MOCK_PROJECTS } from "@/data/mockDatabase";

export default function FeaturedProjects() {
  const featured = MOCK_PROJECTS.slice(0, 4);

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
            <span>Explore All 120+ Projects</span>
            <ArrowRight className="w-3.5 h-3.5 text-red-bright" />
          </Link>
        </div>

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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.maintainer_avatar}
                    alt={project.maintainer_name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
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
