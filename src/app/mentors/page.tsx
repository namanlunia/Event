"use client";

import React from "react";
import Link from "next/link";
import { Users, ExternalLink, Code2, ArrowRight, UserCheck } from "lucide-react";
import { getMentors } from "@/lib/dataService";
import AvatarDisplay from "@/components/visual/AvatarDisplay";
import { SEASON_LABEL } from "@/lib/season";

export default function MentorsPage() {
  const mentors = getMentors();

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Engineering Mentorship</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            OWOC Technical Mentors
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            Experienced engineers and open-source maintainers guiding pull requests and architectural decisions throughout the winter.
          </p>
        </div>

        {/* Empty State: Mentors will be announced soon */}
        {mentors.length === 0 ? (
          <div className="glass-card p-12 sm:p-16 rounded-3xl border border-white/10 text-center max-w-2xl mx-auto shadow-2xl mb-16">
            <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-red-primary/30 flex items-center justify-center mx-auto mb-6 shadow-red-glow-sm">
              <UserCheck className="w-8 h-8 text-red-bright" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-white mb-3">
              Mentors Will Be Announced Soon
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-lg mx-auto">
              We are onboarding technical mentors across AI/ML, Systems, Web3, Cloud, and Mobile for {SEASON_LABEL}. Share your expertise, review contributor PRs, and help shape the next generation of engineers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/apply/mentor"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white text-xs font-bold shadow-red-glow hover:shadow-red-glow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Apply to be a Mentor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/rules"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-text-secondary hover:text-white text-xs font-semibold transition-colors flex items-center justify-center"
              >
                <span>Mentor Guidelines</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Mentors Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {mentors.map((mentor) => (
              <div
                key={mentor.name}
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-red-primary/50 group flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <AvatarDisplay name={mentor.name} size="lg" className="rounded-2xl" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-2 text-red-bright border border-red-primary/30">
                          {mentor.domain}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-white group-hover:text-red-bright transition-colors mt-1.5">
                        {mentor.name}
                      </h3>
                      <p className="text-xs text-text-muted">{mentor.role}</p>
                      <p className="text-[11px] font-mono text-text-secondary">
                        {mentor.company}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed mb-6">
                    {mentor.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-text-muted flex items-center gap-1.5 font-mono text-[11px]">
                    <Code2 className="w-3.5 h-3.5 text-red-bright" />
                    <span>Track Mentor &bull; {mentor.domain}</span>
                  </span>

                  {mentor.github ? (
                    <a
                      href={`https://github.com/${mentor.github}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-surface-2 hover:bg-surface-3 text-text-secondary hover:text-white transition-colors"
                      aria-label={`${mentor.name}'s GitHub profile`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mentor CTA Banner */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-red-primary/40 text-center relative overflow-hidden shadow-red-glow">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Interested in Mentoring Future Engineers?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-text-secondary max-w-xl mx-auto">
            Share your expertise, review high-quality pull requests, and help shape the next generation of open-source creators.
          </p>
          <div className="mt-6">
            <Link
              href="/apply/mentor"
              className="px-6 py-3 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-bold shadow-red-glow transition-all inline-flex items-center gap-2"
            >
              <span>Apply to be a Mentor</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
