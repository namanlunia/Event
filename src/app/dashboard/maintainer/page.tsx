"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  FolderGit2,
  GitPullRequest,
  Users,
  AlertCircle,
  Plus,
  CheckCircle2,
  ExternalLink,
  Flame,
  Send,
  Sparkles,
} from "lucide-react";
import { MOCK_PROJECTS } from "@/data/mockDatabase";
import { useAppStore } from "@/lib/store";

export default function MaintainerDashboard() {
  const { projects } = useAppStore();
  const myProject = projects[0]; // WinterVision Core

  const [issueRequests, setIssueRequests] = useState([
    {
      id: "req-1",
      contributor: "Aarav Patel",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
      issueNumber: 14,
      issueTitle: "Add unit benchmark tests for SIMD vector tensor transformations",
      difficulty: "Easy (10 pts)",
      plan: "Implementing SIMD vector transformations using Rust AVX-512 intrinsics with unit tests.",
      status: "pending",
    },
    {
      id: "req-2",
      contributor: "Diya Menon",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      issueNumber: 28,
      issueTitle: "Implement ring buffer fallback when AVX-512 extensions are absent",
      difficulty: "Medium (25 pts)",
      plan: "Writing software fallback using standard vector iteration and validating CPU feature flags.",
      status: "pending",
    },
  ]);

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleApproveRequest = (id: string) => {
    setIssueRequests(
      issueRequests.map((r) =>
        r.id === id ? { ...r, status: "approved" } : r
      )
    );
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (broadcastMessage) {
      setBroadcastSent(true);
      setTimeout(() => {
        setBroadcastSent(false);
        setBroadcastMessage("");
      }, 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-primary/10 blur-3xl pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-red-bright uppercase font-bold tracking-wider">
              PROJECT LEAD CONSOLE
            </span>
            <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/30 text-[10px] font-mono">
              Status: Approved & Live
            </span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            {myProject.name}
          </h1>
          <p className="text-xs text-text-secondary mt-0.5 max-w-xl">
            {myProject.tagline}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2.5 rounded-xl bg-surface-2 border border-white/10 hover:border-red-primary/40 text-xs font-mono text-white transition-colors flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5 text-red-bright" />
            <span>Submit New Project</span>
          </button>

          <a
            href={myProject.repository_url}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-bold shadow-red-glow transition-all flex items-center gap-2"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>GitHub Repo</span>
          </a>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Open Issues
            </span>
            <AlertCircle className="w-4 h-4 text-red-bright" />
          </div>
          <div className="font-heading font-black text-3xl text-white">
            {myProject.open_issues_count}
          </div>
          <p className="text-[11px] text-text-muted font-mono mt-1">
            4 labeled Good First Issue
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Active Contributors
            </span>
            <Users className="w-4 h-4 text-white" />
          </div>
          <div className="font-heading font-black text-3xl text-white">24</div>
          <p className="text-[11px] text-green-400 font-mono mt-1">
            +6 joined this sprint
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              PRs Merged
            </span>
            <GitPullRequest className="w-4 h-4 text-green-400" />
          </div>
          <div className="font-heading font-black text-3xl text-white">38</div>
          <p className="text-[11px] text-text-muted font-mono mt-1">
            920 total points awarded
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Assigned Mentors
            </span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="font-heading font-black text-3xl text-white">2</div>
          <p className="text-[11px] text-text-muted font-mono mt-1">
            Dr. Aris Thorne, Elena Rostova
          </p>
        </div>
      </div>

      {/* Issue Requests Queue & Broadcast */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Issue Assignment Requests */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Issue Assignment Requests
              </h3>
              <p className="text-xs text-text-muted">
                Contributors applying to work on project issues.
              </p>
            </div>
            <span className="text-xs font-mono text-red-bright font-bold">
              {issueRequests.filter((r) => r.status === "pending").length} Pending Review
            </span>
          </div>

          <div className="space-y-3">
            {issueRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl bg-surface-1 border border-white/5 space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={req.avatar}
                      alt={req.contributor}
                      className="w-9 h-9 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">
                        {req.contributor}
                      </div>
                      <div className="text-[10px] text-text-muted font-mono">
                        Requesting Issue #{req.issueNumber} • {req.difficulty}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      req.status === "approved"
                        ? "bg-green-500/10 text-green-400 border border-green-500/30"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                <div className="text-xs font-semibold text-white">
                  {req.issueTitle}
                </div>

                <div className="p-2.5 rounded-lg bg-surface-2 border border-white/5 text-[11px] text-text-secondary">
                  <span className="text-text-muted font-mono block text-[10px]">
                    Approach Plan:
                  </span>
                  {req.plan}
                </div>

                {req.status === "pending" && (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleApproveRequest(req.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-red-primary hover:bg-red-bright text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Assignment</span>
                    </button>
                    <button
                      onClick={() =>
                        setIssueRequests(issueRequests.filter((r) => r.id !== req.id))
                      }
                      className="px-3.5 py-1.5 rounded-lg bg-surface-2 border border-white/5 hover:border-white/10 text-text-muted hover:text-white text-xs transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Post Broadcast to Contributors */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-white">
              Broadcast to Contributors
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-4">
              Post an announcement or sprint priority note directly to all student contributors working on {myProject.name}.
            </p>

            {broadcastSent ? (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-xs text-green-400 space-y-1">
                <div className="font-bold">Broadcast Dispatched!</div>
                <div>Your update was sent to 24 contributors via Discord webhook.</div>
              </div>
            ) : (
              <form onSubmit={handleBroadcast} className="space-y-3">
                <textarea
                  rows={4}
                  required
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="e.g. Please prioritize resolving the AVX-512 benchmark harness before tackling new features..."
                  className="w-full bg-surface-1 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-text-muted focus:outline-none focus:border-red-primary/60"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Broadcast Update</span>
                </button>
              </form>
            )}
          </div>

          <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-text-muted">
            Next Maintainer Sync: Wednesday 7:00 PM UTC
          </div>
        </div>
      </div>

      {/* Project Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface-1 border border-white/10 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <FolderGit2 className="w-5 h-5 text-red-bright" />
              <h3 className="font-heading font-bold text-xl text-white">
                Submit Open Source Project
              </h3>
            </div>
            <p className="text-xs text-text-secondary mb-6">
              Onboard a new repository for the OWOC winter sprints. Submissions are reviewed by the Super Admin council.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Project submitted for review! Check Super Admin console for approval status.");
                setShowSubmitModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-[11px] font-mono text-text-muted block mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solana WinterPay SDK"
                  className="w-full bg-surface-2 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-primary/60"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-text-muted block mb-1">
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/organization/repo"
                  className="w-full bg-surface-2 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-primary/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-text-muted block mb-1">
                    Primary Domain
                  </label>
                  <select className="w-full bg-surface-2 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-primary/60">
                    <option>AI/ML</option>
                    <option>Web3</option>
                    <option>Cloud & DevOps</option>
                    <option>Full-Stack</option>
                    <option>Mobile</option>
                    <option>Security</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-text-muted block mb-1">
                    Difficulty Level
                  </label>
                  <select className="w-full bg-surface-2 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-primary/60">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-text-muted block mb-1">
                  Tagline / Short Summary
                </label>
                <input
                  type="text"
                  required
                  placeholder="High-throughput real-time inference engine..."
                  className="w-full bg-surface-2 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-primary/60"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-bold transition-all mt-4"
              >
                Submit Repository for Onboarding
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
