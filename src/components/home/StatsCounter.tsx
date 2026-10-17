"use client";

import React, { useEffect, useState } from "react";
import { GitPullRequest, FolderGit2, Building2, Users2 } from "lucide-react";

interface StatItem {
  label: string;
  sublabel: string;
  target: number;
  suffix: string;
  icon: React.ReactNode;
}

export default function StatsCounter() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const stats: StatItem[] = [
    {
      label: "Contributors & Builders",
      sublabel: "Registered across 28 states",
      target: 2540,
      suffix: "+",
      icon: <Users2 className="w-5 h-5 text-red-bright" />,
    },
    {
      label: "Open Source Projects",
      sublabel: "Across AI, Web3 & DevOps",
      target: 124,
      suffix: "+",
      icon: <FolderGit2 className="w-5 h-5 text-red-bright" />,
    },
    {
      label: "Pull Requests Merged",
      sublabel: "Production-grade code shipped",
      target: 4860,
      suffix: "+",
      icon: <GitPullRequest className="w-5 h-5 text-red-bright" />,
    },
    {
      label: "Participating Colleges",
      sublabel: "IITs, NITs, BITS & global hubs",
      target: 350,
      suffix: "+",
      icon: <Building2 className="w-5 h-5 text-red-bright" />,
    },
  ];

  useEffect(() => {
    const targets = [2540, 124, 4860, 350];
    const duration = 1800;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts(targets.map((target) => Math.floor(target * Math.min(1, progress))));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-12 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="glass-card p-6 rounded-2xl relative overflow-hidden group border border-white/10 hover:border-red-primary/40"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-surface-2 border border-white/5 group-hover:border-red-primary/30 group-hover:bg-red-primary/10 transition-colors">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-text-muted border border-white/5">
                  Verified
                </span>
              </div>
              <div className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight flex items-baseline">
                <span>{counts[idx].toLocaleString()}</span>
                <span className="text-red-bright ml-0.5">{stat.suffix}</span>
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
