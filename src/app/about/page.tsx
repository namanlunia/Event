import React from "react";
import Link from "next/link";
import {
  Flame,
  Target,
  Sparkles,
  Users,
  Award,
  ArrowRight,
  ShieldCheck,
  Globe,
  Mail,
} from "lucide-react";
import { SEASON_LABEL } from "@/lib/season";
import { SITE_CONFIG } from "@/lib/site-config";
import { getProgramStats } from "@/lib/dataService";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export const metadata = {
  title: `About OWOC — ${SITE_CONFIG.ORG_NAME} Winter of Code`,
  description:
    `Learn about the mission, vision, and governance behind ${SITE_CONFIG.ORG_NAME} Winter of Code, empowering student developers through open source mentorship.`,
};

export default function AboutPage() {
  const stats = getProgramStats();
  const isDemo = SITE_CONFIG.DEMO_MODE;

  const pillars = [
    {
      icon: <Target className="w-5 h-5 text-red-bright" />,
      title: "Real Production Code",
      description:
        "No toy tutorials. Contributors work on vetted open-source repositories with automated CI/CD pipelines and code reviews.",
    },
    {
      icon: <Users className="w-5 h-5 text-red-bright" />,
      title: "Mentor Guidance from Maintainers",
      description:
        "Collaborate with project maintainers and code reviewers who offer architectural advice, debugging support, and PR critique.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-red-bright" />,
      title: "Merit-Driven Recognition",
      description:
        "Transparent scoring with tiered points for issue difficulty, continuous contribution streaks, and quality multipliers.",
    },
    {
      icon: <Award className="w-5 h-5 text-red-bright" />,
      title: "Digital Certificates",
      description:
        "Earn official digital certificates of participation upon completing program milestones.",
    },
  ];

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-4">
            <Flame className="w-3.5 h-3.5" />
            <span>The {SITE_CONFIG.ORG_NAME} Mission</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Democratizing Open-Source Excellence
          </h1>
          <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed">
            Omnikon Winter of Code was born out of a simple conviction: the best way to master software engineering is to build public software alongside experienced practitioners.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6 text-text-secondary text-sm sm:text-base leading-relaxed">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              Why We Built OWOC
            </h2>
            <p>
              Traditional university curricula rarely expose students to large-scale codebases, git rebase workflows, continuous integration, or distributed code review culture.
            </p>
            <p>
              OWOC offers an accessible winter runway where builders of all skill levels can find their footing. From beginner-friendly documentation patches to complex performance optimizations, there is a place for every passionate developer.
            </p>
            <div className="p-4 rounded-xl bg-surface-1 border border-red-primary/30 shadow-red-glow-sm">
              <p className="font-mono text-xs text-red-bright">
                “Our mission is to empower student developers to make their maiden open-source contribution and cultivate lifelong contributors to digital public goods.”
              </p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-primary/10 blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-xl text-white">
                Program Overview ({SEASON_LABEL})
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-surface-2 border border-white/5">
                <div className="font-heading font-black text-3xl text-white">
                  {stats.studentBuilders > 0 ? (
                    <AnimatedCounter value={stats.studentBuilders} suffix="+" />
                  ) : (
                    "Opening Soon"
                  )}
                </div>
                <div className="text-xs text-text-muted mt-1">Student Builders</div>
              </div>
              <div className="p-4 rounded-2xl bg-surface-2 border border-white/5">
                <div className="font-heading font-black text-3xl text-white">
                  {stats.approvedProjects > 0 ? (
                    <AnimatedCounter value={stats.approvedProjects} />
                  ) : (
                    "Onboarding"
                  )}
                </div>
                <div className="text-xs text-text-muted mt-1">Approved Projects</div>
              </div>
              <div className="p-4 rounded-2xl bg-surface-2 border border-white/5">
                <div className="font-heading font-black text-3xl text-white">
                  {stats.participatingColleges > 0 ? (
                    <AnimatedCounter value={stats.participatingColleges} suffix="+" />
                  ) : (
                    "Inviting"
                  )}
                </div>
                <div className="text-xs text-text-muted mt-1">Universities</div>
              </div>
              <div className="p-4 rounded-2xl bg-surface-2 border border-white/5">
                <div className="font-heading font-black text-3xl text-red-bright">
                  {stats.mergedPRs > 0 ? (
                    <AnimatedCounter value={stats.mergedPRs} suffix="+" className="text-red-bright" />
                  ) : (
                    "Season 1"
                  )}
                </div>
                <div className="text-xs text-text-muted mt-1">PRs Merged</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
              The Four Pillars of OWOC
            </h2>
            <p className="mt-3 text-sm text-text-secondary">
              Core values guiding every sprint, code review, and evaluation criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-red-primary/40 group flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-surface-2 border border-white/5 group-hover:bg-red-primary/10 group-hover:border-red-primary/30 transition-colors w-fit mb-4">
                    {p.icon}
                  </div>
                  <h3 className="font-heading font-bold text-base text-white mb-2 group-hover:text-red-bright transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Organizing Council */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
              Organizing Leadership
            </h2>
            <p className="mt-3 text-sm text-text-secondary">
              The team coordinating program operations, mentor matching, and repository onboarding.
            </p>
          </div>

          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 text-center max-w-3xl mx-auto space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-surface-2 border border-red-primary/30 text-red-bright flex items-center justify-center mx-auto shadow-red-glow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-xl text-white">
                  Inaugural Council Assembly
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xl mx-auto">
                  For our first season ({SEASON_LABEL}), organizing working groups, repository review committees, and mentor track chairs are being onboarded. Official appointments will be listed as working groups are finalized.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-semibold shadow-red-glow transition-all"
                >
                  Get Involved as an Organizer
                </Link>
                <Link
                  href="/mentors"
                  className="px-5 py-2.5 rounded-xl bg-surface-2 border border-white/10 text-white text-xs font-semibold hover:border-white/20 transition-all"
                >
                  Apply as a Mentor
                </Link>
              </div>
            </div>
        </div>

        {/* Find Omnikon Online */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 mb-20 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-surface-2 border border-white/5 text-red-bright">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-white">
                Find Omnikon Online
              </h3>
              <p className="text-xs text-text-muted">
                Official community portals, source code, and developer networks
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono mb-6">
            <a
              href={SITE_CONFIG.SOCIAL_LINKS.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-surface-1 border border-white/5 hover:border-red-primary/40 flex items-center justify-between text-text-secondary hover:text-white transition-all"
            >
              <span>Website</span>
              <span className="text-[11px] text-text-muted">omnikonhub.com &rarr;</span>
            </a>
            <a
              href={SITE_CONFIG.SOCIAL_LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-surface-1 border border-white/5 hover:border-red-primary/40 flex items-center justify-between text-text-secondary hover:text-white transition-all"
            >
              <span>Discord</span>
              <span className="text-[11px] text-text-muted">Community Server &rarr;</span>
            </a>
            <a
              href={SITE_CONFIG.SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-surface-1 border border-white/5 hover:border-red-primary/40 flex items-center justify-between text-text-secondary hover:text-white transition-all"
            >
              <span>GitHub</span>
              <span className="text-[11px] text-text-muted">@Omnikon-Org &rarr;</span>
            </a>
            <a
              href={SITE_CONFIG.SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-surface-1 border border-white/5 hover:border-red-primary/40 flex items-center justify-between text-text-secondary hover:text-white transition-all"
            >
              <span>LinkedIn</span>
              <span className="text-[11px] text-text-muted">Omnikon &rarr;</span>
            </a>
            <a
              href={SITE_CONFIG.SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-surface-1 border border-white/5 hover:border-red-primary/40 flex items-center justify-between text-text-secondary hover:text-white transition-all sm:col-span-2"
            >
              <span>X / Twitter</span>
              <span className="text-[11px] text-text-muted">@OmnikonOrg &rarr;</span>
            </a>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="text-text-muted">Universal Inquiries:</span>
            <a
              href={`mailto:${SITE_CONFIG.CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1.5 font-mono text-red-bright hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.CONTACT_EMAIL}</span>
            </a>
          </div>
        </div>

        {/* CTA banner */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-red-primary/40 text-center relative overflow-hidden shadow-red-glow">
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-white">
            Ready to Forge Your Open-Source Legacy?
          </h2>
          <p className="mt-4 text-sm text-text-secondary max-w-xl mx-auto">
            Choose your track today as a contributor, mentor, or campus ambassador and join our inaugural winter edition.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/projects"
              className="px-6 py-3 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-semibold shadow-red-glow transition-all"
            >
              Browse Projects
            </Link>
            <Link
              href="/rules"
              className="px-6 py-3 rounded-xl bg-surface-2 border border-white/10 text-white text-xs font-semibold hover:border-white/20 transition-all"
            >
              View Points System
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
