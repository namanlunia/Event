"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FolderGit2, CheckCircle2, ArrowRight, Flame } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { ProjectDomain } from "@/types";
import { SEASON_LABEL } from "@/lib/season";

export default function ApplyProjectAdminPage() {
  const { addProjectAdminApplication } = useAppStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [projectName, setProjectName] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [domain, setDomain] = useState<ProjectDomain>("Web3");
  const [techStack, setTechStack] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !githubUsername || !projectName || !repoUrl || !projectDesc) {
      setError("Please complete all required fields.");
      return;
    }

    const ghRegex = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/i;
    if (!ghRegex.test(repoUrl.trim())) {
      setError("Please provide a valid GitHub repository URL (e.g., https://github.com/org/repo).");
      return;
    }

    setError(null);
    addProjectAdminApplication({
      full_name: fullName.trim(),
      email: email.trim(),
      github_username: githubUsername.replace("@", "").trim(),
      project_name: projectName.trim(),
      repo_url: repoUrl.trim(),
      project_desc: projectDesc.trim(),
      domain,
      tech_stack: techStack.split(",").map((s) => s.trim()).filter(Boolean),
    });

    setSubmitted(true);
  };

  return (
    <div className="relative pt-32 pb-24 min-h-screen flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-red-primary/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-xl w-full glass-card p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-primary to-red-deep p-[1px] shadow-red-glow-sm">
              <div className="w-full h-full bg-[#0B0B0D] rounded-xl flex items-center justify-center">
                <FolderGit2 className="w-5 h-5 text-red-bright" />
              </div>
            </div>
            <span className="font-heading font-black text-xl text-white">OWOC {SEASON_LABEL}</span>
          </Link>
          <h1 className="font-heading font-bold text-2xl text-white">
            Apply as Project Admin
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            List your open-source repository for OWOC 2026 and mentor student contributors.
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4 py-8">
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto text-green-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">
              Application Received!
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed max-w-sm mx-auto">
              Thank you, <strong className="text-white">{fullName}</strong>. Your repository submission for{" "}
              <strong className="text-white">{projectName}</strong> is in the organizer review queue.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Link
                href="/dashboard/project-admin"
                className="px-5 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-mono font-bold"
              >
                Go to Project Admin Console
              </Link>
              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-1 text-text-secondary hover:text-white border border-white/10 text-xs font-mono"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            {error && (
              <div className="p-3 rounded-xl bg-red-primary/10 border border-red-primary/30 text-red-bright text-xs">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-white block">Full Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Aris Thorne"
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white block">Work or Academic Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="lead@organization.org"
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-white block">GitHub Username *</label>
                <input
                  type="text"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="e.g. aristhorne"
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white block">Domain *</label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value as ProjectDomain)}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                >
                  <option value="Web3">Web3 & Decentralized</option>
                  <option value="AI/ML">AI / ML & Optimization</option>
                  <option value="Cloud & DevOps">Cloud Native & DevOps</option>
                  <option value="Full-Stack">Full-Stack & Systems</option>
                  <option value="Mobile">Mobile Apps</option>
                  <option value="Security">Security & Zero-Trust</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-white block">Repository Name *</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. WinterVision Core"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-white block">GitHub Repository URL *</label>
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/omnikon/wintervision-core"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-white block">Tech Stack Tags (comma-separated)</label>
              <input
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="Rust, C++, PyTorch, CUDA"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-white block">Project Architecture & Sprint Goals *</label>
              <textarea
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                rows={3}
                placeholder="Briefly describe what contributors will build, issue readiness, and mentor availability..."
                className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-red-primary hover:bg-red-bright text-white font-mono font-bold text-xs transition-all shadow-red-glow-sm flex items-center justify-center gap-2 mt-4"
            >
              <span>Submit Project Admin Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
