import React from "react";
import Link from "next/link";
import {
  Flame,
  Target,
  Sparkles,
  Users,
  Award,
} from "lucide-react";

export const metadata = {
  title: "About OWOC — Omnikon Winter of Code",
  description:
    "Learn about the mission, vision, and core team behind Omnikon Winter of Code, empowering student developers through open source mentorship.",
};

export default function AboutPage() {
  const pillars = [
    {
      icon: <Target className="w-5 h-5 text-red-bright" />,
      title: "Real Production Code",
      description:
        "No toy tutorials. Contributors work on production repositories with real users, automated CI/CD pipelines, and rigorous code reviews.",
    },
    {
      icon: <Users className="w-5 h-5 text-red-bright" />,
      title: "1-on-1 Engineering Mentorship",
      description:
        "Pair with seasoned maintainers and senior engineers who offer architectural advice, debugging sessions, and code critique.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-red-bright" />,
      title: "Merit-Driven Gamification",
      description:
        "Transparent scoring with tiered points for issue difficulty, continuous PR streaks, and mentor quality multipliers on a live podium.",
    },
    {
      icon: <Award className="w-5 h-5 text-red-bright" />,
      title: "Verifiable Digital Credentials",
      description:
        "Earn tamper-proof digital certificates with unique hash verification, QR verification codes, and official swag packages.",
    },
  ];

  const council = [
    {
      name: "Devansh Rastogi",
      role: "Program Director & Co-Founder",
      bio: "Open source advocate, ex-GSoC mentor, and distributed systems architect at Omnikon.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    },
    {
      name: "Dr. Aris Thorne",
      role: "Head of Project Review & AI Lead",
      bio: "Compiler engineer specializing in zero-copy neural runtimes and high-performance computing.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
    {
      name: "Sarah Chen",
      role: "Frontend & Design Systems Architect",
      bio: "Creator of OmniUI and design systems consultant focusing on accessibility and fluid web shaders.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
    },
    {
      name: "Marcus Vance",
      role: "Infrastructure & DevOps Lead",
      bio: "Kubernetes maintainer and cloud native specialist ensuring staging mesh resilience across cloud platforms.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    },
  ];

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-4">
            <Flame className="w-3.5 h-3.5" />
            <span>The Omnikon Story</span>
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
              Modeled after premier global initiatives such as GirlScript Summer of Code (GSSoC) and Google Summer of Code (GSoC), OWOC offers an accessible winter runway where builders of all skill levels can find their footing. From beginner-friendly documentation patches to complex SIMD optimizations, there is a place for every passionate developer.
            </p>
            <div className="p-4 rounded-xl bg-surface-1 border border-red-primary/30 shadow-red-glow-sm">
              <p className="font-mono text-xs text-red-bright">
                “Our mission is to empower 100,000 students to make their maiden open-source contribution and cultivate lifelong contributors to digital public goods.”
              </p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-primary/10 blur-3xl pointer-events-none" />
            <h3 className="font-heading font-bold text-xl text-white">
              By the Numbers (2024 Cohort)
            </h3>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-surface-2 border border-white/5">
                <div className="font-heading font-black text-3xl text-white">2,500+</div>
                <div className="text-xs text-text-muted mt-1">Student Builders</div>
              </div>
              <div className="p-4 rounded-2xl bg-surface-2 border border-white/5">
                <div className="font-heading font-black text-3xl text-white">120+</div>
                <div className="text-xs text-text-muted mt-1">Active Projects</div>
              </div>
              <div className="p-4 rounded-2xl bg-surface-2 border border-white/5">
                <div className="font-heading font-black text-3xl text-white">350+</div>
                <div className="text-xs text-text-muted mt-1">Universities</div>
              </div>
              <div className="p-4 rounded-2xl bg-surface-2 border border-white/5">
                <div className="font-heading font-black text-3xl text-red-bright">4,800+</div>
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
              Meet the architects behind Omnikon Foundation and OWOC program operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {council.map((member) => (
              <div
                key={member.name}
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-red-primary/40 text-center group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-white/10 group-hover:border-red-bright transition-colors mb-4"
                />
                <h3 className="font-heading font-bold text-base text-white group-hover:text-red-bright transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-mono text-red-bright/90 mb-2">
                  {member.role}
                </p>
                <p className="text-xs text-text-muted leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-red-primary/40 text-center relative overflow-hidden shadow-red-glow">
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-white">
            Ready to Forge Your Open-Source Legacy?
          </h2>
          <p className="mt-4 text-sm text-text-secondary max-w-xl mx-auto">
            Choose your track today as a contributor, mentor, or campus ambassador and join our thriving winter cohort.
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
