import React from "react";
import Link from "next/link";
import {
  Award,
  Flame,
  ShieldAlert,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { SEASON_LABEL } from "@/lib/season";

export const metadata = {
  title: "Rules & Points Matrix — Omnikon Winter of Code",
  description:
    "Official OWOC points calculation breakdown, issue difficulty levels, mentor quality bonuses, and anti-plagiarism policy.",
};

export default function RulesPage() {
  const pointsTiers = [
    {
      level: "Easy",
      points: "10 Points",
      color: "border-green-500/40 text-green-400 bg-green-500/5",
      examples:
        "Documentation updates, minor bug fixes, accessibility aria attributes, typo corrections in comments, simple test additions.",
      criteria: "Resolved in 1-2 commits, passes existing CI, verified by mentor.",
    },
    {
      level: "Medium",
      points: "25 Points",
      color: "border-yellow-500/40 text-yellow-400 bg-yellow-500/5",
      examples:
        "New feature modules, component additions, REST/GraphQL endpoint integrations, state management refactors, localized cache handling.",
      criteria: "Includes unit tests, conforms to architectural linting, comprehensive PR description.",
    },
    {
      level: "Hard",
      points: "50 Points",
      color: "border-red-primary text-red-bright bg-red-primary/10 shadow-red-glow-sm",
      examples:
        "Zero-copy SIMD algorithms, eBPF tunnel routing, smart contract reentrancy patches, compiler optimization passes, distributed concensus logic.",
      criteria: "Substantial architectural impact, benchmark regressions analyzed, approved by lead maintainer.",
    },
  ];

  const bonuses = [
    {
      title: "Mentor Quality Bonus",
      points: "+5 to +15 Points",
      description:
        "Awarded by technical mentors upon merging if the contributor provided exceptional unit tests, comprehensive benchmark suites, or clean atomic git commits.",
    },
    {
      title: "7-Day Contribution Streak",
      points: "+25 Points",
      description:
        "Awarded when a contributor makes at least one valid commit or pull request every consecutive 24-hour cycle for 7 days.",
    },
    {
      title: "14-Day Winter Marathon Streak",
      points: "+60 Points",
      description:
        "The highest streak tier for relentless builders who maintain continuous activity across two full sprint cycles.",
    },
    {
      title: "Campus Ambassador Referral Bonus",
      points: "+10 Points / Active Contributor",
      description:
        "Ambassadors earn 10 points for every student who registers with their code and merges their maiden PR.",
    },
  ];

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Fair Play Governance</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Rules & Points System
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            The scoring system for OWOC {SEASON_LABEL} is engineered to reward code quality, architectural depth, and continuous developer discipline.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="space-y-6 mb-16">
          <h2 className="font-heading font-black text-2xl text-white">
            Issue Difficulty Breakdown
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pointsTiers.map((tier) => (
              <div
                key={tier.level}
                className={`glass-card p-6 rounded-2xl border ${tier.color} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs uppercase font-bold">
                      {tier.level} Difficulty
                    </span>
                    <span className="font-mono font-black text-base">
                      {tier.points}
                    </span>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-text-muted block">
                        Typical Tasks
                      </span>
                      <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                        {tier.examples}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase text-text-muted block">
                        Acceptance Criteria
                      </span>
                      <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                        {tier.criteria}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus Points Grid */}
        <div className="mb-16">
          <h2 className="font-heading font-black text-2xl text-white mb-6">
            Streak & Quality Multipliers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bonuses.map((b) => (
              <div
                key={b.title}
                className="glass-card p-5 rounded-xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-bold text-sm text-white">
                      {b.title}
                    </h3>
                    <span className="font-mono text-xs font-bold text-red-bright">
                      {b.points}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Anti-Plagiarism & Disqualification Notice */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-red-primary/40 bg-red-primary/5 space-y-4 mb-16 shadow-red-glow-sm">
          <div className="flex items-center gap-2 text-red-bright">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <h3 className="font-heading font-bold text-lg text-white">
              Code Integrity & Anti-Plagiarism Policy
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            OWOC employs automated git commit analysis to inspect code submissions. Copying PRs from other contributors, submitting raw unverified AI-generated hallucinated code without tests, or spamming trivial whitespace changes will lead to immediate disqualification and revocation of certificates.
          </p>
          <ul className="text-xs text-text-muted space-y-1 font-mono list-disc list-inside">
            <li>PRs must be written and understood by the contributor</li>
            <li>Maintainers can request a live 5-minute code walkthrough during evaluation</li>
            <li>Spam PRs are flagged directly on GitHub</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-surface-1 border border-white/10 gap-4">
          <div>
            <h4 className="font-heading font-bold text-sm text-white">
              Have questions about your points or a merged PR?
            </h4>
            <p className="text-xs text-text-secondary">
              Read our FAQ or contact our organizing council.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/faq"
              className="px-4 py-2 rounded-lg bg-surface-2 border border-white/5 text-xs text-white hover:border-white/20 transition-colors"
            >
              Read FAQs
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg bg-red-primary hover:bg-red-bright text-xs text-white font-semibold transition-colors"
            >
              Contact Organizers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
