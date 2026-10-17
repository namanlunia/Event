"use client";

import React from "react";
import { MessageSquareQuote, Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "OWOC was the launchpad for my software engineering career. Working directly on zero-copy buffer algorithms in Rust under Dr. Thorne gave me code to discuss in my systems interview at a tier-1 tech firm.",
      author: "Pooja Varma",
      role: "Alumni Contributor (Rank #2 in 2023)",
      college: "IIT Roorkee",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    },
    {
      quote:
        "As a project maintainer, the quality of contributors brought by OWOC was astonishing. We merged 80+ PRs in 4 weeks, closed our entire backlog of good first issues, and onboarded 4 core long-term maintainers.",
      author: "Marcus Vance",
      role: "Lead SRE & Nexus DevOps Maintainer",
      college: "CloudNative Labs",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    },
    {
      quote:
        "Being a Campus Ambassador taught me community leadership. We conducted git workshops for 400+ freshmen at IIT Bombay and saw our university rise to the top of the college leaderboard.",
      author: "Kabir Sen",
      role: "Master Ambassador",
      college: "IIT Bombay",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
  ];

  return (
    <section className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Community Stories</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Voices from the Winter Sprints
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-secondary">
            Discover how OWOC transforms curious coders into confident open-source contributors and industry leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-white/10 hover:border-red-primary/40 group"
            >
              <div>
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-text-secondary leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-red-bright transition-colors">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-text-muted">{t.role}</p>
                  <p className="text-[10px] font-mono text-red-bright/80">{t.college}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
