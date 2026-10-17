"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  ArrowRight,
  GitPullRequest,
  Sparkles,
  Users,
  Shield,
  Layers,
  Code2,
  Trophy,
  Calendar,
} from "lucide-react";

const STATS = [
  { label: "Merged PRs", value: 4800, suffix: "+" },
  { label: "Student Builders", value: 2500, suffix: "+" },
  { label: "Open Repositories", value: 120, suffix: "+" },
  { label: "Verified Certs", value: 1800, suffix: "+" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="stat-number font-heading font-black text-2xl sm:text-3xl text-white tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function HeroSection() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      {/* Layered Cinematic Glow Sources */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-primary/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-red-bright/08 blur-[100px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-red-deep/20 blur-[90px] rounded-full pointer-events-none opacity-40" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-1/90 border border-red-primary/30 backdrop-blur-md mb-8 shadow-red-glow-sm animate-pulse-slow">
          <span className="flex h-2 w-2 rounded-full bg-red-bright animate-ping" />
          <span className="text-xs font-mono uppercase tracking-wider text-red-bright font-bold">
            OWOC 2024–25 Season Active
          </span>
          <span className="text-text-muted">|</span>
          <span className="text-xs text-text-secondary">
            Coding Sprint 3 in Progress
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white max-w-6xl mx-auto leading-[1.06]">
          Forge Open-Source Innovation{" "}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-bright via-red-primary to-orange-500 drop-shadow-[0_0_40px_rgba(225,29,46,0.5)]">
            Under Winter Skies
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
          Omnikon Winter of Code is a high-octane open source mentorship program.
          Contribute to production-grade repositories, collaborate with veteran
          engineers, climb the live leaderboard, and earn verifiable credentials.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            id="register-now-btn"
            onClick={() => setRegisterModalOpen(true)}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white font-bold text-sm shadow-red-glow hover:shadow-red-glow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            <Flame className="w-4 h-4" />
            <span>Register Now — Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <Link
            href="/projects"
            className="px-8 py-4 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/50 text-text-primary hover:text-white font-semibold text-sm transition-all duration-300 hover:bg-white/[0.04] flex items-center gap-2 group"
          >
            <Code2 className="w-4 h-4 text-red-bright" />
            <span>Explore 120+ Projects</span>
          </Link>

          <Link
            href="/leaderboard"
            className="px-7 py-4 rounded-xl bg-surface-1/60 border border-white/5 hover:border-white/20 text-text-secondary hover:text-white font-semibold text-sm transition-all duration-300 flex items-center gap-2"
          >
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span>View Leaderboard</span>
          </Link>
        </div>

        {/* Live Stats Counter Row */}
        <div className="mt-16 pt-10 border-t border-white/5">
          <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-8">
            Program Statistics — Updated Live
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-5 rounded-2xl border border-white/5 hover:border-red-primary/30 text-center group"
              >
                <div className="text-xs font-mono text-text-muted mb-1">
                  {stat.label}
                </div>
                {mounted ? (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                ) : (
                  <span className="stat-number font-heading font-black text-2xl sm:text-3xl text-white">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Trust Badges Row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs text-text-muted">
          {[
            { icon: <GitPullRequest className="w-3.5 h-3.5 text-red-bright" />, text: "Production-grade PRs only" },
            { icon: <Users className="w-3.5 h-3.5 text-red-bright" />, text: "1-on-1 mentor guidance" },
            { icon: <Shield className="w-3.5 h-3.5 text-red-bright" />, text: "Blockchain-verifiable certificates" },
            { icon: <Calendar className="w-3.5 h-3.5 text-red-bright" />, text: "8-week winter cohort" },
            { icon: <Sparkles className="w-3.5 h-3.5 text-red-bright" />, text: "Merit-based gamification" },
          ].map(({ icon, text }) => (
            <div
              key={text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-1/40 border border-white/5 hover:border-white/10 transition-colors"
            >
              {icon}
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Track Selector Modal */}
      {registerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setRegisterModalOpen(false)}>
          <div
            className="bg-surface-1 border border-white/10 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setRegisterModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-surface-2 text-text-muted hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-red-bright" />
              <h3 className="font-heading font-bold text-xl text-white">
                Choose Your OWOC Track
              </h3>
            </div>
            <p className="text-xs text-text-secondary mb-6">
              Select the role that best fits your goals for Omnikon Winter of Code 2024–25.
            </p>

            <div className="space-y-3">
              {[
                {
                  href: "/dashboard/contributor",
                  icon: <Code2 className="w-5 h-5" />,
                  title: "Register as Contributor",
                  desc: "Solve real GitHub issues, earn points for merged PRs, and climb the leaderboard.",
                },
                {
                  href: "/dashboard/mentor",
                  icon: <Users className="w-5 h-5" />,
                  title: "Register as Technical Mentor",
                  desc: "Guide student contributors, review PRs, and assign quality score multipliers.",
                },
                {
                  href: "/dashboard/maintainer",
                  icon: <Layers className="w-5 h-5" />,
                  title: "Submit Project as Maintainer",
                  desc: "Onboard your open source repository, label issues, and welcome passionate contributors.",
                },
                {
                  href: "/dashboard/ambassador",
                  icon: <Sparkles className="w-5 h-5" />,
                  title: "Apply as Campus Ambassador",
                  desc: "Represent OWOC in your college, track referrals, and unlock custom swag kits.",
                },
              ].map((opt) => (
                <Link
                  key={opt.href}
                  href={opt.href}
                  onClick={() => setRegisterModalOpen(false)}
                  className="flex items-start gap-4 p-4 rounded-xl bg-surface-2 border border-white/5 hover:border-red-primary/40 transition-all duration-200 group"
                >
                  <div className="p-2.5 rounded-lg bg-red-primary/10 text-red-bright group-hover:bg-red-primary group-hover:text-white transition-colors flex-shrink-0">
                    {opt.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-red-bright transition-colors">
                      {opt.title}
                    </h4>
                    <p className="text-xs text-text-muted mt-0.5">{opt.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-red-bright group-hover:translate-x-1 transition-all ml-auto flex-shrink-0 mt-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
