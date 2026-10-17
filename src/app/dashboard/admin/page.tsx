"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  FolderGit2,
  Users,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  Download,
  Settings,
  Sparkles,
  Award,
  AlertCircle,
  Flame,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { MOCK_CONTRIBUTORS, MOCK_AMBASSADORS } from "@/data/mockDatabase";

export default function SuperAdminDashboard() {
  const { projects, approveProject, rejectProject } = useAppStore();

  const [easyPts, setEasyPts] = useState(10);
  const [medPts, setMedPts] = useState(25);
  const [hardPts, setHardPts] = useState(50);
  const [streakBonus, setStreakBonus] = useState(15);
  const [rulesSaved, setRulesSaved] = useState(false);

  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: "pen-1",
      name: "Solana Pay Micro-settlements",
      org: "Solana Collective",
      domain: "Web3",
      maintainer: "Kaelen Voss",
      repo: "https://github.com/omnikon/winterpay-solana",
      status: "pending",
    },
    {
      id: "pen-2",
      name: "CryoLang WebAssembly Runtime",
      org: "Compiler Collective",
      domain: "Full-Stack",
      maintainer: "Dr. Aris Thorne",
      repo: "https://github.com/omnikon/cryolang",
      status: "pending",
    },
  ]);

  const [ambassadorApplications, setAmbassadorApplications] = useState([
    {
      id: "amb-app-1",
      name: "Rohan Vats",
      college: "IIT Kharagpur",
      year: "3rd Year B.Tech",
      pitch: "Lead coordinator for Google Developer Student Club on campus. Conducted git workshops for 300+ students.",
      status: "pending",
    },
    {
      id: "amb-app-2",
      name: "Shruti Saxena",
      college: "NSUT Delhi",
      year: "2nd Year CS",
      pitch: "Open-source society lead with an active Discord community of 600+ student developers.",
      status: "pending",
    },
  ]);

  const auditLogs = [
    {
      action: "Project Approved",
      target: "WinterVision Core",
      admin: "Devansh Rastogi",
      time: "2 hours ago",
    },
    {
      action: "Points Config Updated",
      target: "Hard PR base from 45 to 50 pts",
      admin: "Devansh Rastogi",
      time: "1 day ago",
    },
    {
      action: "Ambassador Verified",
      target: "Kabir Sen (IIT Bombay)",
      admin: "Devansh Rastogi",
      time: "2 days ago",
    },
    {
      action: "Certificate Issued",
      target: "OWOC-2024-C-9821 (Aarav Patel)",
      admin: "System Automated",
      time: "3 days ago",
    },
  ];

  const handleSaveRules = (e: React.FormEvent) => {
    e.preventDefault();
    setRulesSaved(true);
    setTimeout(() => setRulesSaved(false), 2500);
  };

  const handleExportCSV = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportLeaderboard = () => {
    const header = "Rank,Name,Email,College,Points,Streak\n";
    const rows = MOCK_CONTRIBUTORS.map(
      (c) => `${c.rank},"${c.full_name}",${c.email},"${c.college_name}",${c.points},${c.streak_days}`
    ).join("\n");
    handleExportCSV("owoc_2024_leaderboard.csv", header + rows);
  };

  const exportProjects = () => {
    const header = "Project Name,Domain,Difficulty,Organization,Maintainer,Stars\n";
    const rows = projects.map(
      (p) => `"${p.name}","${p.domain}","${p.difficulty}","${p.organization}","${p.maintainer_name}",${p.stars_count}`
    ).join("\n");
    handleExportCSV("owoc_2024_projects.csv", header + rows);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 glass-panel p-6 sm:p-8 rounded-3xl border border-red-primary/40 relative overflow-hidden shadow-red-glow-sm">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-primary/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-red-primary/20 border-2 border-red-bright flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-8 h-8 text-red-bright" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-red-bright uppercase font-bold tracking-wider">
                SUPER ADMIN COMMAND CENTER
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-2 text-[10px] font-mono text-text-muted">
                Devansh Rastogi (Program Director)
              </span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              OWOC Operations & Governance
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Program overview, approval queues, points configuration, and audit trail.
            </p>
          </div>
        </div>

        {/* Quick CSV Export Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportLeaderboard}
            className="px-4 py-2 rounded-xl bg-surface-2 border border-white/10 hover:border-red-primary/40 text-xs font-mono text-white transition-colors flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-red-bright" />
            <span>Export Leaderboard CSV</span>
          </button>
          <button
            onClick={exportProjects}
            className="px-4 py-2 rounded-xl bg-surface-2 border border-white/10 hover:border-red-primary/40 text-xs font-mono text-white transition-colors flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-red-bright" />
            <span>Export Projects CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Total Registrations
            </span>
            <Users className="w-4 h-4 text-red-bright" />
          </div>
          <div className="font-heading font-black text-3xl text-white">2,540</div>
          <p className="text-[11px] text-green-400 font-mono mt-1">
            +180 registrations this week
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Repositories Live
            </span>
            <FolderGit2 className="w-4 h-4 text-white" />
          </div>
          <div className="font-heading font-black text-3xl text-white">124</div>
          <p className="text-[11px] text-text-muted font-mono mt-1">
            Across 6 technological domains
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              PRs Merged
            </span>
            <GitPullRequest className="w-4 h-4 text-green-400" />
          </div>
          <div className="font-heading font-black text-3xl text-white">4,860</div>
          <p className="text-[11px] text-green-400 font-mono mt-1">
            100% verified commit history
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Partner Universities
            </span>
            <Award className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="font-heading font-black text-3xl text-white">350+</div>
          <p className="text-[11px] text-yellow-400 font-mono mt-1">
            Campus ambassador chapters active
          </p>
        </div>
      </div>

      {/* Two Columns: Project Approval Queue & Points Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Onboarding Review Queue */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Project Approval Queue
              </h3>
              <p className="text-xs text-text-muted">
                Repositories submitted by organizations awaiting validation.
              </p>
            </div>
            <span className="text-xs font-mono text-red-bright font-bold">
              {pendingApprovals.filter((p) => p.status === "pending").length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {pendingApprovals.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-surface-1 border border-white/5 space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-2 text-red-bright border border-red-primary/30">
                      {p.domain}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-white mt-1">
                      {p.name}
                    </h4>
                    <p className="text-xs text-text-muted">
                      Org: {p.org} • Lead: {p.maintainer}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      p.status === "approved"
                        ? "bg-green-500/10 text-green-400 border border-green-500/30"
                        : p.status === "rejected"
                        ? "bg-red-primary/20 text-red-bright border border-red-primary/40"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                {p.status === "pending" && (
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                    <button
                      onClick={() => {
                        setPendingApprovals(
                          pendingApprovals.map((item) =>
                            item.id === p.id ? { ...item, status: "approved" } : item
                          )
                        );
                      }}
                      className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Repository</span>
                    </button>
                    <button
                      onClick={() => {
                        setPendingApprovals(
                          pendingApprovals.map((item) =>
                            item.id === p.id ? { ...item, status: "rejected" } : item
                          )
                        );
                      }}
                      className="px-3 py-1.5 rounded-lg bg-surface-2 border border-white/5 hover:border-red-primary/40 text-text-muted hover:text-white text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Live Points Engine Rules Configurator */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-white">
              Points Engine & Multipliers Config
            </h3>
            <p className="text-xs text-text-muted">
              Live adjustments to the OWOC global scoring algorithm.
            </p>
          </div>

          <form onSubmit={handleSaveRules} className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-mono text-text-muted block mb-1">
                  Easy PR Points
                </label>
                <input
                  type="number"
                  value={easyPts}
                  onChange={(e) => setEasyPts(Number(e.target.value))}
                  className="w-full bg-surface-1 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-red-primary/60"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-text-muted block mb-1">
                  Medium PR Points
                </label>
                <input
                  type="number"
                  value={medPts}
                  onChange={(e) => setMedPts(Number(e.target.value))}
                  className="w-full bg-surface-1 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-red-primary/60"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-text-muted block mb-1">
                  Hard PR Points
                </label>
                <input
                  type="number"
                  value={hardPts}
                  onChange={(e) => setHardPts(Number(e.target.value))}
                  className="w-full bg-surface-1 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-red-primary/60"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-text-muted block mb-1">
                Streak Multiplier Bonus (%)
              </label>
              <input
                type="number"
                value={streakBonus}
                onChange={(e) => setStreakBonus(Number(e.target.value))}
                className="w-full bg-surface-1 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-red-primary/60"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-bold transition-all shadow-red-glow"
            >
              {rulesSaved ? "✓ Scoring Algorithm Updated!" : "Save Scoring Matrix"}
            </button>
          </form>
        </div>
      </div>

      {/* Campus Ambassador Applications & Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Campus Ambassador Review Queue */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
          <h3 className="font-heading font-bold text-lg text-white">
            Campus Ambassador Applications
          </h3>

          <div className="space-y-3">
            {ambassadorApplications.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-xl bg-surface-1 border border-white/5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{app.name}</span>
                  <span className="text-[10px] font-mono text-text-muted">
                    {app.college} • {app.year}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">{app.pitch}</p>
                {app.status === "pending" && (
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        setAmbassadorApplications(
                          ambassadorApplications.map((a) =>
                            a.id === app.id ? { ...a, status: "approved" } : a
                          )
                        );
                      }}
                      className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-lg"
                    >
                      Approve Ambassador
                    </button>
                    <button
                      onClick={() => {
                        setAmbassadorApplications(
                          ambassadorApplications.filter((a) => a.id !== app.id)
                        );
                      }}
                      className="px-3 py-1 bg-surface-2 text-text-muted text-xs rounded-lg"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
          <h3 className="font-heading font-bold text-lg text-white">
            System Audit Trail
          </h3>

          <div className="space-y-2.5">
            {auditLogs.map((log, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-surface-1 border border-white/5 flex items-center justify-between text-xs font-mono"
              >
                <div>
                  <div className="text-white font-bold">{log.action}</div>
                  <div className="text-[11px] text-text-muted">{log.target}</div>
                </div>
                <div className="text-right text-text-secondary text-[10px]">
                  <div>{log.admin}</div>
                  <div className="text-text-muted">{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
