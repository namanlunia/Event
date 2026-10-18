"use client";

import React from "react";
import {
  UserCheck,
  Search,
  GitBranch,
  Flame,
  Award,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Register & Connect GitHub",
      description:
        "Authenticate using your GitHub account. Select your skill tags, college, and join the OWOC community channels.",
      icon: <UserCheck className="w-5 h-5 text-red-bright" />,
    },
    {
      step: "02",
      title: "Discover Repositories",
      description:
        "Browse vetted open-source projects across AI, Web3, Systems & Cloud. Filter by your preferred tech stack.",
      icon: <Search className="w-5 h-5 text-red-bright" />,
    },
    {
      step: "03",
      title: "Claim Issues & Ship Code",
      description:
        "Find issues labeled 'Good First Issue' or 'OWOC'. Maintainers assign the issue, and mentors provide feedback on pull requests.",
      icon: <GitBranch className="w-5 h-5 text-red-bright" />,
    },
    {
      step: "04",
      title: "Earn Points & Multipliers",
      description:
        "Merged PRs earn 10 to 50 points based on difficulty, plus bonus points for clean test coverage and active contribution streaks.",
      icon: <Flame className="w-5 h-5 text-red-bright" />,
    },
    {
      step: "05",
      title: "Earn Verifiable Credentials",
      description:
        "Climb the live standings, unlock milestone achievement badges, and receive a verifiable certificate with a unique QR code.",
      icon: <Award className="w-5 h-5 text-red-bright" />,
    },
  ];

  return (
    <section className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <span>Program Mechanics</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            How OWOC Operates
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-secondary">
            A transparent, merit-driven winter sprint engineered to build real-world engineering credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((s, idx) => (
            <div
              key={s.step}
              className="glass-card p-6 rounded-2xl relative flex flex-col justify-between border border-white/10 hover:border-red-primary/40 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-2xl font-black text-red-bright/40 group-hover:text-red-bright transition-colors">
                    {s.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-surface-2 border border-white/5 group-hover:border-red-primary/30 group-hover:bg-red-primary/10 transition-colors">
                    {s.icon}
                  </div>
                </div>
                <h3 className="font-heading font-bold text-base text-white mb-2 group-hover:text-red-bright transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {s.description}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 text-white/20">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/rules"
            className="inline-flex items-center gap-2 text-xs font-mono text-red-bright hover:underline"
          >
            <span>Read full Points & Evaluation Rules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
