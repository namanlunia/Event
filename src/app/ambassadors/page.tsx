"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Trophy,
  Users,
  ArrowRight,
  Flame,
  CheckCircle2,
  Building2,
  UserCheck,
} from "lucide-react";
import { getCampusAmbassadors } from "@/lib/dataService";
import { SITE_CONFIG } from "@/lib/site-config";
import AvatarDisplay from "@/components/visual/AvatarDisplay";
import { SEASON_LABEL } from "@/lib/season";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function AmbassadorsPage() {
  const ambassadors = getCampusAmbassadors();
  const isDemoMode = SITE_CONFIG.DEMO_MODE;
  const rewards = SITE_CONFIG.AMBASSADOR_REWARDS;

  const tierColors: Record<string, string> = {
    "Bronze Tier": "border-amber-700/40 text-amber-500",
    "Silver Tier": "border-slate-400 text-slate-300",
    "Gold Tier": "border-yellow-500/50 text-yellow-400",
    "Diamond Tier": "border-red-primary text-red-bright shadow-red-glow-sm",
  };

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campus Leadership</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Campus Ambassador Program
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            Represent Omnikon Winter of Code at your university. Conduct Git workshops, guide freshman builders, and foster open source culture on campus.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/dashboard/ambassador"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white text-xs font-bold shadow-red-glow transition-all flex items-center gap-2"
            >
              <span>Become a Campus Ambassador</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Gamified Reward Tiers from Config */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white">
              Tiered Recognition & Credentials
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-text-secondary">
              Unlock official credentials and leadership citations as your campus community expands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((tier) => (
              <div
                key={tier.tier}
                className={`glass-card p-6 rounded-2xl border flex flex-col justify-between group transition-all ${
                  tierColors[tier.tier] || "border-white/10"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      {tier.tier}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-2 border border-white/5">
                      {tier.referrals}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white mb-4">
                    {tier.tier}
                  </h3>

                  <ul className="space-y-2.5 text-xs text-text-secondary">
                    {tier.perks.map((reward) => (
                      <li key={reward} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-bright flex-shrink-0 mt-0.5" />
                        <span>{reward}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Champions: Rendered when verified ambassadors exist */}
        {ambassadors.length > 0 ? (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading font-black text-2xl text-white">
                    Campus Champions
                  </h2>
                </div>
                <p className="text-xs text-text-secondary">
                  Ambassador rankings for {SEASON_LABEL}.
                </p>
              </div>
              <Link
                href="/leaderboard"
                className="text-xs font-mono text-red-bright hover:underline"
              >
                View Full Standings →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ambassadors.map((amb) => (
                <div
                  key={amb.id}
                  className="glass-card p-6 rounded-2xl border border-white/10 hover:border-red-primary/40 group text-center"
                >
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-surface-2 border border-white/5 text-[10px] font-mono text-red-bright font-bold mb-3">
                    Rank #{amb.rank}
                  </div>
                  <div className="my-2">
                    <AvatarDisplay
                      name={amb.full_name}
                      size="lg"
                      className="mx-auto border-2 border-white/10 group-hover:border-red-bright transition-colors"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-base text-white group-hover:text-red-bright transition-colors mt-2">
                    {amb.full_name}
                  </h3>
                  <p className="text-xs text-text-muted mb-2">{amb.college_name}</p>
                  <div className="p-2 rounded-lg bg-surface-2 border border-white/5 font-mono text-xs text-white">
                    <AnimatedCounter
                      value={amb.referrals_count}
                      fallbackText="0"
                      className="font-bold text-red-bright"
                    />{" "}
                    referrals
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Honest Empty State / Call to Action */
          <div className="glass-card p-10 sm:p-14 rounded-3xl border border-white/10 text-center max-w-2xl mx-auto shadow-2xl mb-16">
            <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-red-primary/30 flex items-center justify-center mx-auto mb-6 shadow-red-glow-sm">
              <UserCheck className="w-8 h-8 text-red-bright" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-white mb-3">
              Be the First Ambassador for Your University
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-lg mx-auto">
              Campus Ambassador applications for {SEASON_LABEL} are currently open. Represent OWOC at your college, receive promotional materials, and gain verifiable student leadership credentials.
            </p>
            <Link
              href="/dashboard/ambassador"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white text-xs font-bold shadow-red-glow hover:shadow-red-glow-lg transition-all"
            >
              <span>Apply as Campus Ambassador</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
