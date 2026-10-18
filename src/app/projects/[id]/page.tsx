"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Star,
  GitFork,
  ExternalLink,
  AlertCircle,
  Users,
  Check,
  Flame,
  Award,
  FolderGit2,
} from "lucide-react";
import { getProjectById } from "@/lib/dataService";
import { SITE_CONFIG } from "@/lib/site-config";
import { SampleBadge } from "@/components/visual/DemoModeBanner";
import AvatarDisplay from "@/components/visual/AvatarDisplay";
import { Issue } from "@/types";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const project = getProjectById(id);
  const isDemoMode = SITE_CONFIG.DEMO_MODE;

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [applicationSent, setApplicationSent] = useState(false);

  // If project is not found or not approved
  if (!project) {
    return (
      <div className="relative pt-36 pb-24 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full glass-card p-8 sm:p-12 rounded-3xl border border-white/10 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-red-primary/30 flex items-center justify-center mx-auto mb-6 shadow-red-glow-sm">
            <FolderGit2 className="w-8 h-8 text-red-bright" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-white mb-2">
            Repository Not Found
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
            The project repository you requested is either not onboarded yet or pending maintainer verification for this season.
          </p>
          <Link
            href="/projects"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white text-xs font-bold shadow-red-glow flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse All Repositories</span>
          </Link>
        </div>
      </div>
    );
  }

  // Sample issues for this project
  const projectIssues: Issue[] = [
    {
      id: "iss-1",
      project_id: project.id,
      project_name: project.name,
      title: "Add benchmark suites for core data processing pipelines",
      issue_number: 14,
      issue_url: `${project.repository_url}/issues/14`,
      labels: ["good-first-issue", "benchmarks"],
      difficulty: "Easy",
      points: 10,
      status: "open",
    },
    {
      id: "iss-2",
      project_id: project.id,
      project_name: project.name,
      title: "Implement fallback handlers for legacy operating system runtimes",
      issue_number: 28,
      issue_url: `${project.repository_url}/issues/28`,
      labels: ["core-pipeline", "optimization"],
      difficulty: "Medium",
      points: 25,
      status: "open",
    },
    {
      id: "iss-3",
      project_id: project.id,
      project_name: project.name,
      title: "Zero-copy IPC shared memory transport for multi-process worker nodes",
      issue_number: 45,
      issue_url: `${project.repository_url}/issues/45`,
      labels: ["systems", "architecture"],
      difficulty: "Hard",
      points: 50,
      status: "open",
    },
    {
      id: "iss-4",
      project_id: project.id,
      project_name: project.name,
      title: "Fix documentation broken links in getting started tutorial",
      issue_number: 52,
      issue_url: `${project.repository_url}/issues/52`,
      labels: ["documentation", "good-first-issue"],
      difficulty: "Easy",
      points: 10,
      status: "open",
    },
  ];

  const handleClaim = (issue: Issue) => {
    setSelectedIssue(issue);
    setApplyModalOpen(true);
    setApplicationSent(false);
  };

  const handleConfirmApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSent(true);
  };

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Projects</span>
        </Link>

        {/* Hero Card */}
        <div className="glass-card p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden mb-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-red-bright font-bold">
                  {project.domain}
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-surface-2 text-text-secondary border border-white/5">
                  Difficulty: {project.difficulty}
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/5 text-text-secondary">
                  Org: {project.organization}
                </span>
                {isDemoMode && <SampleBadge />}
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
                {project.name}
              </h1>

              <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-3xl leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {project.repository_url ? (
                <a
                  href={project.repository_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/50 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-red-bright" />
                  <span>GitHub Repository</span>
                </a>
              ) : (
                <span
                  title="Sample repository (not a real link)"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-1 border border-white/10 opacity-70 cursor-not-allowed text-white text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4 text-red-bright" />
                  <span>GitHub Repository</span>
                </span>
              )}

              <button
                onClick={() => {
                  setSelectedIssue(projectIssues[0]);
                  setApplyModalOpen(true);
                  setApplicationSent(false);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-primary to-red-bright hover:shadow-red-glow text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4" />
                <span>Apply to Contribute</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-text-muted block text-[11px]">GitHub Stars</span>
              <span className="text-white font-bold text-base flex items-center gap-1.5 mt-0.5">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />
                {project.stars_count}
              </span>
            </div>
            <div>
              <span className="text-text-muted block text-[11px]">Forks</span>
              <span className="text-white font-bold text-base flex items-center gap-1.5 mt-0.5">
                <GitFork className="w-4 h-4 text-text-muted" />
                {project.forks_count}
              </span>
            </div>
            <div>
              <span className="text-text-muted block text-[11px]">Open Issues</span>
              <span className="text-red-bright font-bold text-base flex items-center gap-1.5 mt-0.5">
                <AlertCircle className="w-4 h-4" />
                {project.open_issues_count}
              </span>
            </div>
            <div>
              <span className="text-text-muted block text-[11px]">Lead Maintainer</span>
              <span className="text-white font-semibold text-sm truncate block mt-1">
                {project.maintainer_name}
              </span>
            </div>
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column: Description, Tech Stack & Issues */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <h2 className="font-heading font-bold text-xl text-white">
                About the Repository
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {project.description}
              </p>

              <div className="pt-4 border-t border-white/5">
                <h3 className="text-xs font-mono uppercase text-text-muted mb-3">
                  Technologies & Frameworks
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-surface-2 text-xs font-mono text-white border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Curated Issues List */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-bold text-xl text-white">
                    Available OWOC Issues
                  </h2>
                  <p className="text-xs text-text-secondary mt-1">
                    Claim an issue to reserve it. Points are credited to the leaderboard once your PR is merged.
                  </p>
                </div>
                {isDemoMode && <SampleBadge />}
              </div>

              <div className="space-y-3">
                {projectIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="p-4 rounded-xl bg-surface-1 border border-white/5 hover:border-red-primary/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-red-bright font-bold">
                          #{issue.issue_number}
                        </span>
                        <h4 className="text-sm font-semibold text-white">
                          {issue.title}
                        </h4>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {issue.labels.map((l) => (
                          <span
                            key={l}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-2 text-text-muted"
                          >
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right font-mono">
                        <div className="text-red-bright font-bold text-sm">
                          {issue.points} pts
                        </div>
                        <div className="text-[10px] text-text-muted uppercase">
                          {issue.difficulty}
                        </div>
                      </div>

                      <button
                        onClick={() => handleClaim(issue)}
                        className="px-4 py-2 rounded-lg bg-red-primary/10 hover:bg-red-primary border border-red-primary/30 text-red-bright hover:text-white text-xs font-bold transition-colors"
                      >
                        Claim Issue
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Maintainer Info */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              <span className="text-xs font-mono text-text-muted uppercase block">
                Lead Maintainer
              </span>
              <div className="flex items-center gap-3">
                <AvatarDisplay
                  name={project.maintainer_name}
                  size="md"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {project.maintainer_name}
                  </h4>
                  <span className="text-xs text-text-muted">
                    Project Author & Reviewer
                  </span>
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Triage lead for incoming issues and architecture reviewer for active contributor pull requests.
              </p>
            </div>

            {/* Mentors Box */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-text-muted uppercase block">
                  Assigned Mentors
                </span>
                <span className="text-xs font-mono text-red-bright">
                  {project.mentors?.length || 1} Technical Leads
                </span>
              </div>

              <div className="space-y-3">
                {(project.mentors || []).map((m) => (
                  <div
                    key={m.name}
                    className="p-3 rounded-xl bg-surface-1 border border-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <AvatarDisplay
                        name={m.name}
                        size="sm"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{m.name}</div>
                        <div className="text-[10px] text-text-muted">{m.role}</div>
                      </div>
                    </div>
                    <span
                      title="Sample profile (not a real link)"
                      className="text-text-muted/60 cursor-not-allowed"
                      aria-label={`${m.name}'s profile`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Points Guide Pill */}
            <div className="p-4 rounded-xl bg-surface-1 border border-red-primary/30 shadow-red-glow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-red-bright font-bold">
                <Award className="w-4 h-4" />
                <span>Points Distribution</span>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Easy PRs = 10 pts, Medium = 25 pts, Hard = 50 pts. Mentors award up to 15 bonus points for comprehensive tests.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Claim / Apply Modal */}
      {applyModalOpen && selectedIssue && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface-1 border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setApplyModalOpen(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-white"
            >
              ✕
            </button>

            {applicationSent ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Issue Claim Submitted!
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  The maintainer and assigned mentors for {project.name} have been notified. Check your Contributor Dashboard and community channels for assignment confirmation.
                </p>
                <button
                  onClick={() => setApplyModalOpen(false)}
                  className="px-6 py-2.5 bg-red-primary text-white text-xs font-semibold rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmApplication} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-bright" />
                  <h3 className="font-heading font-bold text-lg text-white">
                    Claim Issue #{selectedIssue.issue_number}
                  </h3>
                </div>

                <div className="p-3 rounded-lg bg-surface-2 border border-white/5 text-xs text-text-secondary">
                  <span className="font-bold text-white block">{selectedIssue.title}</span>
                  <span className="font-mono text-red-bright text-[11px]">
                    Worth {selectedIssue.points} points upon merge
                  </span>
                </div>

                <div>
                  <label className="text-xs font-mono text-text-muted block mb-1">
                    Your GitHub Username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="octocat"
                    className="w-full px-3 py-2 rounded-lg bg-surface-2 border border-white/10 text-xs text-white focus:outline-none focus:border-red-primary/60 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-text-muted block mb-1">
                    Proposed Implementation Approach (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe how you plan to tackle this issue..."
                    className="w-full px-3 py-2 rounded-lg bg-surface-2 border border-white/10 text-xs text-white focus:outline-none focus:border-red-primary/60 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setApplyModalOpen(false)}
                    className="px-4 py-2 text-xs text-text-muted hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-bold shadow-red-glow transition-all"
                  >
                    Submit Claim Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
