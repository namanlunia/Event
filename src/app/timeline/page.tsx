import React from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Flame,
  GitPullRequest,
  Trophy,
} from "lucide-react";

export const metadata = {
  title: "Timeline & Sprints — Omnikon Winter of Code",
  description:
    "Explore the detailed six-phase timeline of OWOC 2024–25, from community bonding to the grand certificate minting finale.",
};

export default function TimelinePage() {
  const detailedTimeline = [
    {
      phase: "Phase 1",
      title: "Registrations & Repository Onboarding",
      dates: "October 15 – November 10, 2024",
      status: "completed",
      summary:
        "Student developers registered, verified their GitHub profiles, and selected skill tracks. Open source organizations submitted repositories for vetting.",
      milestones: [
        "2,500+ contributor registrations verified",
        "120+ open source repositories approved",
        "Campus Ambassadors appointed across 350+ engineering colleges",
      ],
    },
    {
      phase: "Phase 2",
      title: "Community Bonding & Architecture AMAs",
      dates: "November 11 – November 17, 2024",
      summary:
        "Contributors engaged with mentors in Discord voice channels, cloned repositories locally, resolved environment setup quirks, and reserved 'Good First Issues'.",
      status: "completed",
      milestones: [
        "Repository setup workshops conducted",
        "Over 800 good first issues created and triaged",
        "Contributor guidelines & PR etiquettes explained",
      ],
    },
    {
      phase: "Phase 3",
      title: "Active Coding Period & Weekly Sprints",
      dates: "November 18 – December 28, 2024",
      summary:
        "The core 6-week development marathon. Contributors submit PRs, maintainers review within 48 hours, and points are tabulated live on the global podium.",
      status: "active",
      milestones: [
        "Weekly sprint bonus point multipliers (+15% for 7-day streaks)",
        "Mid-sprint mentor code review clinics",
        "Live leaderboard rank updates after every merged PR",
      ],
    },
    {
      phase: "Phase 4",
      title: "Code Freeze & PR Triage",
      dates: "December 29, 2024 – January 05, 2025",
      summary:
        "All new PR submissions freeze. Maintainers and mentors conclude code reviews, finalize quality multipliers, and review contested points ledger entries.",
      status: "upcoming",
      milestones: [
        "Final PR merge window closes",
        "Disputed points review by Super Admin council",
        "Auditing of git commits and anti-plagiarism verification",
      ],
    },
    {
      phase: "Phase 5",
      title: "Final Scoring & Leaderboard Lock",
      dates: "January 06 – January 09, 2025",
      summary:
        "Comprehensive calculation of aggregate points, streak bonuses, ambassador referral weights, and college rankings.",
      status: "upcoming",
      milestones: [
        "Top 100 contributor finalists locked",
        "College Champion Trophy recipient decided",
        "Master Campus Ambassador awards determined",
      ],
    },
    {
      phase: "Phase 6",
      title: "Grand Results & Certificate Minting",
      dates: "January 10, 2025",
      summary:
        "Public announcement of OWOC 2024–25 champions, issuance of cryptographically verified digital certificates, and dispatch of winter swag kits.",
      status: "upcoming",
      milestones: [
        "Digital certificates made available on public verification URL",
        "Top 50 winter swag package dispatch initiated",
        "Fast-track interview referrals sent to sponsor partners",
      ],
    },
  ];

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Master Schedule</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Program Roadmap & Sprints
          </h1>
          <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed">
            Follow the six phases of Omnikon Winter of Code. From orientation to the grand certificate minting finale.
          </p>
        </div>

        {/* Live Status Card */}
        <div className="glass-card p-6 rounded-2xl border border-red-primary/50 shadow-red-glow mb-16 flex flex-col md:flex-row items-center justify-between gap-6 bg-surface-1/90">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-primary/20 border border-red-bright flex items-center justify-center flex-shrink-0">
              <Flame className="w-6 h-6 text-red-bright animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-red-bright uppercase font-bold tracking-wider">
                  ACTIVE PHASE NOW
                </span>
                <span className="w-2 h-2 rounded-full bg-red-bright animate-ping" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                Phase 3: Active Coding Period & Weekly Sprints
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Sprint 3 ends in 14 days. Ensure your PRs are submitted before the Sunday midnight cutoff.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href="/projects"
              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-semibold shadow-red-glow transition-all text-center"
            >
              Solve Issues
            </Link>
            <Link
              href="/leaderboard"
              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-surface-2 border border-white/10 hover:border-white/20 text-white text-xs font-semibold transition-all text-center"
            >
              Leaderboard
            </Link>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {detailedTimeline.map((item, idx) => {
            const isActive = item.status === "active";
            const isCompleted = item.status === "completed";

            return (
              <div key={item.phase} className="relative group">
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-[35px] sm:-left-[51px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-red-primary border-red-bright shadow-red-glow text-white animate-pulse"
                      : isCompleted
                      ? "bg-surface-1 border-green-500 text-green-400"
                      : "bg-surface-1 border-white/20 text-text-muted"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isActive ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-mono">{idx + 1}</span>
                  )}
                </div>

                {/* Content Box */}
                <div
                  className={`glass-card p-6 sm:p-8 rounded-2xl border transition-all ${
                    isActive
                      ? "border-red-primary/60 shadow-red-glow bg-surface-1/90"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-xs font-mono uppercase font-bold tracking-wider ${
                        isActive
                          ? "text-red-bright"
                          : isCompleted
                          ? "text-green-400"
                          : "text-text-muted"
                      }`}
                    >
                      {item.phase} • {item.dates}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                        isActive
                          ? "bg-red-primary/20 text-red-bright border-red-primary/40 font-bold"
                          : isCompleted
                          ? "bg-green-500/10 text-green-400 border-green-500/30"
                          : "bg-white/5 text-text-muted border-white/10"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {item.summary}
                  </p>

                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <span className="text-xs font-mono text-text-muted block uppercase">
                      Key Highlights & Deliverables
                    </span>
                    {item.milestones.map((m) => (
                      <div
                        key={m}
                        className="flex items-start gap-2 text-xs text-text-secondary"
                      >
                        <span className="text-red-bright mt-0.5">▹</span>
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
