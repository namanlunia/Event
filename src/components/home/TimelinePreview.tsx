"use client";

import React from "react";
import Link from "next/link";
import { Calendar, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { MOCK_TIMELINE } from "@/data/mockDatabase";

export default function TimelinePreview() {
  return (
    <section className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Program Schedule</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              OWOC 2024–25 Timeline
            </h2>
            <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-xl">
              Stay synchronized with sprint dates, evaluation freezes, and certificate releases.
            </p>
          </div>

          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-1 border border-white/10 hover:border-red-primary/40 text-xs font-mono text-text-primary hover:text-white transition-all w-fit"
          >
            <span>Interactive Timeline View</span>
            <ArrowRight className="w-3.5 h-3.5 text-red-bright" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {MOCK_TIMELINE.map((step) => {
            const isActive = step.status === "active";
            const isCompleted = step.status === "completed";

            return (
              <div
                key={step.title}
                className={`glass-card p-5 rounded-2xl flex flex-col justify-between border transition-all duration-300 relative ${
                  isActive
                    ? "border-red-bright/70 bg-surface-1/90 shadow-red-glow"
                    : isCompleted
                    ? "border-white/10 opacity-80"
                    : "border-white/5 opacity-60"
                }`}
              >
                {isActive && (
                  <div className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-red-primary text-[10px] font-mono text-white font-bold flex items-center gap-1 shadow-red-glow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>CURRENT PHASE</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-red-bright font-bold">
                      {step.date}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : isActive ? (
                      <Clock className="w-4 h-4 text-red-bright animate-spin" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-text-muted" />
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-sm text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-text-secondary">
                  {step.badge}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
