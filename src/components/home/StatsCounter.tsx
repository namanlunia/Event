"use client";

import React from "react";
import Link from "next/link";
import { GitPullRequest, FolderGit2, Building2, Users2, ArrowRight } from "lucide-react";
import { getSiteStats } from "@/lib/dataService";
import { SITE_CONFIG } from "@/lib/site-config";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { PHASES } from "@/lib/season";

interface StatBlockItem {
  label: string;
  sublabel: string;
  value: number;
  suffix: string;
  isTba?: boolean;
  icon: React.ReactNode;
}

export default function StatsCounter() {
  const stats_data = getSiteStats();
  const isDemoMode = SITE_CONFIG.DEMO_MODE;
  const codingStartDate = new Date(`${PHASES[2].startDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const stats: StatBlockItem[] = [
    {
      label: "Contributors & Builders",
      sublabel: stats_data.studentBuilders > 0
        ? "Registered participants"
        : "Registrations opening soon",
      value: stats_data.studentBuilders,
      suffix: stats_data.studentBuilders > 0 ? "+" : "",
      isTba: stats_data.studentBuilders === 0,
      icon: <Users2 className="w-5 h-5 text-red-bright" />,
    },
    {
      label: "Open Source Projects",
      sublabel: stats_data.openRepositories > 0
        ? "Onboarded repositories"
        : "Maintainer onboarding active",
      value: stats_data.openRepositories,
      suffix: stats_data.openRepositories > 0 ? "+" : "",
      isTba: stats_data.openRepositories === 0,
      icon: <FolderGit2 className="w-5 h-5 text-red-bright" />,
    },
    {
      label: "Pull Requests Merged",
      sublabel: stats_data.mergedPrs > 0
        ? "Production-grade code shipped"
        : `Coding begins ${codingStartDate}`,
      value: stats_data.mergedPrs,
      suffix: stats_data.mergedPrs > 0 ? "+" : "",
      isTba: stats_data.mergedPrs === 0,
      icon: <GitPullRequest className="w-5 h-5 text-red-bright" />,
    },
    {
      label: "Participating Colleges",
      sublabel: stats_data.participatingColleges > 0
        ? "Campus chapters nationwide"
        : "University chapters onboarding",
      value: stats_data.participatingColleges,
      suffix: stats_data.participatingColleges > 0 ? "+" : "",
      isTba: stats_data.participatingColleges === 0,
      icon: <Building2 className="w-5 h-5 text-red-bright" />,
    },
  ];

  return (
    <section className="relative py-12 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card p-6 rounded-2xl relative overflow-hidden group border border-white/10 hover:border-red-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-surface-2 border border-white/5 group-hover:border-red-primary/30 group-hover:bg-red-primary/10 transition-colors">
                  {stat.icon}
                </div>
              </div>

              <div className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight flex items-baseline">
                {stat.isTba ? (
                  <span className="text-text-muted font-heading font-black text-3xl sm:text-4xl">
                    TBA
                  </span>
                ) : stat.value > 0 ? (
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight"
                  />
                ) : (
                  <span className="text-text-muted font-heading font-black text-3xl sm:text-4xl">
                    —
                  </span>
                )}
              </div>

              <h3 className="text-sm font-semibold text-text-primary mt-2">
                {stat.label}
              </h3>
              <p className="text-xs text-text-muted mt-1">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
