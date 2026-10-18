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
import {
  PHASES,
  SEASON_LABEL,
  SEASON_SHORT,
  DURATION_COPY,
  getPhaseStatus,
  formatDateRange,
  getCurrentPhase,
  isBeforeCodingPeriod,
} from "@/lib/season";

export const metadata = {
  title: `Timeline & Sprints — Omnikon Winter of Code ${SEASON_LABEL}`,
  description:
    `${DURATION_COPY.full}. Explore the detailed roadmap of OWOC ${SEASON_LABEL}, from registrations to the grand certificate issuance finale.`,
};

export default function TimelinePage() {
  const currentPhase = getCurrentPhase();
  const isBeforeProgram = !currentPhase && getPhaseStatus(PHASES[0]) === "upcoming";
  const isBeforeCoding = isBeforeCodingPeriod();

  // Milestones mapped to each centralized phase
  const phaseMilestones: Record<number, string[]> = {
    1: [
      "Contributor registrations verified",
      "Open source repositories vetted & approved",
      "Campus Ambassadors appointed across university chapters",
    ],
    2: [
      "Community AMAs & Git onboarding workshops conducted",
      "Good first issues triaged & labeled by project mentors",
      "Contributor guidelines & PR etiquettes explained",
    ],
    3: [
      "Weekly sprint bonus point multipliers (+15% for 7-day streaks)",
      "Mid-sprint mentor code review clinics",
      "Live leaderboard rank updates after every merged PR",
    ],
    4: [
      "Final PR merge window closes",
      "Anti-plagiarism audits and points validation",
      "Mentor code reviews and score confirmations finalized",
    ],
    5: [
      "Digital certificates made available on public verification URL",
      "Top contributor podium and college awards announced",
      "Community closing ceremony and project showcase celebration",
    ],
  };

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
            {DURATION_COPY.full}. Follow the 5 phases from registration and community bonding to the grand certificate issuance finale.
          </p>
        </div>

        {/* Dynamic Status Card */}
        <div className="glass-card p-6 rounded-2xl border border-red-primary/50 shadow-red-glow mb-16 flex flex-col md:flex-row items-center justify-between gap-6 bg-surface-1/90">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-primary/20 border border-red-bright flex items-center justify-center flex-shrink-0">
              <Flame className="w-6 h-6 text-red-bright animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-red-bright uppercase font-bold tracking-wider">
                  {currentPhase ? "CURRENT PHASE ACTIVE" : isBeforeProgram ? "REGISTRATION OPENS SOON" : "SEASON STATUS"}
                </span>
                <span className="w-2 h-2 rounded-full bg-red-bright animate-ping" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                {currentPhase
                  ? `Phase ${currentPhase.id}: ${currentPhase.name}`
                  : isBeforeProgram
                  ? `Phase 1: ${PHASES[0].name} begins ${formatDateRange(PHASES[0])}`
                  : `${SEASON_SHORT} Concluded`}
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                {currentPhase
                  ? currentPhase.description
                  : isBeforeProgram
                  ? "Explore repositories and prepare your environment before contributor registrations open."
                  : "All certificates have been issued. Check the verification portal to claim your credentials."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href="/projects"
              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-semibold shadow-red-glow transition-all text-center"
            >
              {isBeforeCoding ? "Browse Projects" : "Solve Issues"}
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
          {PHASES.map((phase, idx) => {
            const status = getPhaseStatus(phase);
            const isCurrent = status === "current";
            const isCompleted = status === "completed";
            const milestones = phaseMilestones[phase.id] || [];

            return (
              <div key={phase.id} className="relative group">
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-[35px] sm:-left-[51px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    isCurrent
                      ? "bg-red-primary border-red-bright shadow-red-glow text-white animate-pulse"
                      : isCompleted
                      ? "bg-surface-1 border-green-500 text-green-400"
                      : "bg-surface-1 border-white/20 text-text-muted"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isCurrent ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-mono">{idx + 1}</span>
                  )}
                </div>

                {/* Content Box */}
                <div
                  className={`glass-card p-6 sm:p-8 rounded-2xl border transition-all ${
                    isCurrent
                      ? "border-red-primary/60 shadow-red-glow bg-surface-1/90"
                      : isCompleted
                      ? "border-white/10 hover:border-white/20 opacity-80"
                      : "border-white/5 hover:border-white/15 opacity-60"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-xs font-mono uppercase font-bold tracking-wider ${
                        isCurrent
                          ? "text-red-bright"
                          : isCompleted
                          ? "text-green-400"
                          : "text-text-muted"
                      }`}
                    >
                      Phase {phase.id} • {formatDateRange(phase)}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                        isCurrent
                          ? "bg-red-primary/20 text-red-bright border-red-primary/40 font-bold"
                          : isCompleted
                          ? "bg-green-500/10 text-green-400 border-green-500/30"
                          : "bg-white/5 text-text-muted border-white/10"
                      }`}
                    >
                      {isCurrent ? "Current Phase" : status}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-3">
                    {phase.name}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {phase.description}
                  </p>

                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <span className="text-xs font-mono text-text-muted block uppercase">
                      Key Highlights & Deliverables
                    </span>
                    {milestones.map((m) => (
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
