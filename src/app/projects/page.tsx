"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Star,
  GitFork,
  AlertCircle,
  ArrowRight,
  Code2,
  Layers,
  FolderGit2,
} from "lucide-react";
import { getApprovedProjects } from "@/lib/dataService";
import { SITE_CONFIG } from "@/lib/site-config";
import { SampleBadge } from "@/components/visual/DemoModeBanner";
import AvatarDisplay from "@/components/visual/AvatarDisplay";

export default function ProjectsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedTech, setSelectedTech] = useState<string>("All");

  const allProjects = getApprovedProjects();
  const isDemoMode = SITE_CONFIG.DEMO_MODE;

  const domains = ["All", "AI/ML", "Web3", "Cloud & DevOps", "Full-Stack", "Mobile", "Security"];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
  const techOptions = ["All", "Rust", "Python", "React", "TypeScript", "Go", "Solidity", "Kubernetes", "PyTorch"];

  const filteredProjects = useMemo(() => {
    return allProjects.filter((proj) => {
      const matchesSearch =
        proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.tech_stack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDomain = selectedDomain === "All" || proj.domain === selectedDomain;
      const matchesDifficulty = selectedDifficulty === "All" || proj.difficulty === selectedDifficulty;
      const matchesTech = selectedTech === "All" || proj.tech_stack.includes(selectedTech);

      return matchesSearch && matchesDomain && matchesDifficulty && matchesTech;
    });
  }, [allProjects, searchQuery, selectedDomain, selectedDifficulty, selectedTech]);

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

        {/* Empty state when DEMO_MODE is false and no projects are onboarded yet */}
        {!isDemoMode && allProjects.length === 0 ? (
          <div className="glass-card p-12 sm:p-16 rounded-3xl border border-white/10 text-center max-w-2xl mx-auto shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-red-primary/30 flex items-center justify-center mx-auto mb-6 shadow-red-glow-sm">
              <FolderGit2 className="w-8 h-8 text-red-bright" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-white mb-3">
              Project applications are open
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-lg mx-auto">
              Maintainers, submit your open-source repository to welcome motivated student contributors for the upcoming season. Projects are reviewed and approved on a rolling basis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard/maintainer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white text-xs font-bold shadow-red-glow hover:shadow-red-glow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Submit a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/rules"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-text-secondary hover:text-white text-xs font-semibold transition-colors flex items-center justify-center"
              >
                <span>Maintainer Guidelines</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Filter & Search Bar */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 mb-10 shadow-lg space-y-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                {/* Search Input */}
                <div className="relative flex-grow w-full">
                  <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by project name, tech stack, or keyword..."
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-1 border border-white/10 rounded-xl text-sm text-white placeholder-text-muted focus:outline-none focus:border-red-primary/60 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Domain Dropdown */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="w-full md:w-44 bg-surface-1 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-primary/60"
                  >
                    {domains.map((d) => (
                      <option key={d} value={d} className="bg-surface-1">
                        Domain: {d}
                      </option>
                    ))}
                  </select>

                  {/* Difficulty Dropdown */}
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full md:w-44 bg-surface-1 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-primary/60"
                  >
                    {difficulties.map((d) => (
                      <option key={d} value={d} className="bg-surface-1">
                        Level: {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Tech Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
                <span className="text-xs font-mono text-text-muted mr-2 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Tech:
                </span>
                {techOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTech(t)}
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-lg transition-colors border ${
                      selectedTech === t
                        ? "bg-red-primary/20 text-red-bright border-red-primary/50"
                        : "bg-surface-1 text-text-secondary hover:text-white border-white/5 hover:border-white/10"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between mb-6 text-xs text-text-muted font-mono">
              <div className="flex items-center gap-2">
                <span>
                  Showing <span className="text-white font-bold">{filteredProjects.length}</span> repositories
                </span>
                {isDemoMode && <SampleBadge />}
              </div>
              {(selectedDomain !== "All" || selectedDifficulty !== "All" || selectedTech !== "All" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedDomain("All");
                    setSelectedDifficulty("All");
                    setSelectedTech("All");
                    setSearchQuery("");
                  }}
                  className="text-red-bright hover:underline"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-white/10 hover:border-red-primary/50 group transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-2 text-red-bright border border-red-primary/30">
                            {project.domain}
                          </span>
                          {isDemoMode && <SampleBadge />}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
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

                      <h3 className="font-heading font-bold text-lg text-white group-hover:text-red-bright transition-colors mb-2">
                        {project.name}
                      </h3>

                      <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 mb-4">
                        {project.description}
                      </p>

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

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <AvatarDisplay
                          name={project.maintainer_name}
                          size="sm"
                        />
                        <span className="text-text-muted text-[11px] truncate max-w-[100px]">
                          {project.maintainer_name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-red-bright font-mono text-[11px] font-bold">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{project.open_issues_count} open issues</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 rounded-3xl border border-white/10 text-center max-w-lg mx-auto">
                <Layers className="w-10 h-10 text-text-muted mx-auto mb-4" />
                <h3 className="font-heading font-bold text-lg text-white mb-1">
                  No matching repositories
                </h3>
                <p className="text-xs text-text-secondary mb-4">
                  Try adjusting your search query, domain, or tech stack filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedDomain("All");
                    setSelectedDifficulty("All");
                    setSelectedTech("All");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-red-primary text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
