import React from "react";
import Link from "next/link";
import { Users, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import { SEASON_LABEL } from "@/lib/season";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata = {
  title: `Organizing Team — ${SITE_CONFIG.ORG_NAME} Winter of Code ${SEASON_LABEL}`,
  description:
    `Meet the team and working council coordinating ${SITE_CONFIG.ORG_NAME} Winter of Code ${SEASON_LABEL}.`,
};

export default function TeamPage() {
  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>The Team Behind OWOC</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Organizing Council
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            The community volunteers, project mentors, and coordinators helping guide the inaugural edition of Omnikon Winter of Code.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 text-center space-y-6 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-surface-2 border border-red-primary/30 text-red-bright flex items-center justify-center mx-auto shadow-red-glow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-3">
              <h2 className="font-heading font-bold text-2xl text-white">
                Inaugural Council Onboarding
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xl mx-auto">
                OWOC is launching its inaugural season ({SEASON_LABEL}). Track leads, review chairs, and working group volunteers are actively being formed.
              </p>
              <p className="text-xs text-text-muted leading-relaxed max-w-lg mx-auto">
                Council members and track directors will be listed here as official volunteer appointments are finalized prior to the contributor orientation phase.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-primary to-red-bright hover:shadow-red-glow text-white text-xs font-bold transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Join the Working Council</span>
              </Link>
              <Link
                href="/mentors"
                className="px-6 py-3 rounded-xl bg-surface-2 border border-white/10 hover:border-white/20 text-white text-xs font-semibold transition-all flex items-center gap-2"
              >
                <span>Apply as Mentor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-white/5 text-center">
              <div className="font-heading font-bold text-sm text-white mb-1">
                Technical Review Board
              </div>
              <p className="text-xs text-text-muted">
                Vetting repository submissions and evaluating complex pull requests.
              </p>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-white/5 text-center">
              <div className="font-heading font-bold text-sm text-white mb-1">
                Track Mentorship Chairs
              </div>
              <p className="text-xs text-text-muted">
                Supporting project maintainers and guiding student contributors.
              </p>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-white/5 text-center">
              <div className="font-heading font-bold text-sm text-white mb-1">
                Campus Relations Team
              </div>
              <p className="text-xs text-text-muted">
                Coordinating university outreach and campus ambassador chapters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
