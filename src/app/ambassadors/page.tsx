import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Trophy,
  Gift,
  Users,
  ArrowRight,
  Flame,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { MOCK_AMBASSADORS } from "@/data/mockDatabase";

export const metadata = {
  title: "Campus Ambassador Program — Omnikon Winter of Code",
  description:
    "Lead open source culture at your university campus, organize bootcamps, and unlock tiered merchandise and leadership certificates.",
};

export default function AmbassadorsPage() {
  const tiers = [
    {
      tier: "Bronze Tier",
      referrals: "25+ Registrations",
      rewards: [
        "Official Campus Ambassador Certificate",
        "OWOC Winter Holographic Sticker Pack",
        "Listed on official OWOC website",
      ],
      color: "border-amber-700/40 text-amber-500",
    },
    {
      tier: "Silver Tier",
      referrals: "50+ Registrations",
      rewards: [
        "OWOC Official Winter Developer T-Shirt",
        "Embroidered Winter Beanie",
        "Fast-track Contributor Issue Allocation",
      ],
      color: "border-slate-400 text-slate-300",
    },
    {
      tier: "Gold Tier",
      referrals: "100+ Registrations",
      rewards: [
        "Premium Heavyweight OWOC Winter Hoodie",
        "Official Letter of Recommendation from Omnikon Foundation",
        "Dedicated College Spotlight feature on OWOC socials",
      ],
      color: "border-yellow-500/50 text-yellow-400",
    },
    {
      tier: "Master Ambassador",
      referrals: "150+ Registrations",
      rewards: [
        "Full Winter Swag Kit & Custom Backpack",
        "Exclusive Sponsor Interview Fast-track Pipeline",
        "Direct Invitation to OWOC Core Organizing Council",
      ],
      color: "border-red-primary text-red-bright shadow-red-glow-sm",
    },
  ];

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
            Represent Omnikon Winter of Code at your university. Conduct Git workshops, guide freshman builders, and climb the university rankings.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/dashboard/ambassador"
              className="px-6 py-3 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-semibold shadow-red-glow transition-all"
            >
              Access Ambassador Portal
            </Link>
          </div>
        </div>

        {/* Gamified Reward Tiers */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white">
              Tiered Perks & Rewards
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-text-secondary">
              Unlock exclusive winter swag and leadership credentials as your campus network expands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((t) => (
              <div
                key={t.tier}
                className={`glass-card p-6 rounded-2xl border ${t.color} flex flex-col justify-between`}
              >
                <div>
                  <span className="text-[11px] font-mono uppercase font-bold block mb-1">
                    {t.tier}
                  </span>
                  <div className="font-heading font-bold text-lg text-white mb-4">
                    {t.referrals}
                  </div>
                  <ul className="space-y-2.5">
                    {t.rewards.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-xs text-text-secondary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-bright flex-shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Ambassadors Leaderboard */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading font-black text-2xl text-white">
                Top Campus Champions
              </h2>
              <p className="text-xs text-text-secondary">
                Leading student organizers for the 2024–25 winter season.
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
            {MOCK_AMBASSADORS.map((amb) => (
              <div
                key={amb.id}
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-red-primary/40 group text-center"
              >
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-surface-2 border border-white/5 text-[10px] font-mono text-red-bright font-bold mb-3">
                  Rank #{amb.rank}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={amb.avatar_url}
                  alt={amb.full_name}
                  className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-white/10 group-hover:border-red-bright transition-colors mb-3"
                />
                <h3 className="font-heading font-bold text-base text-white group-hover:text-red-bright transition-colors">
                  {amb.full_name}
                </h3>
                <p className="text-xs text-text-muted mb-2">{amb.college_name}</p>
                <div className="p-2 rounded-lg bg-surface-2 border border-white/5 font-mono text-xs text-white">
                  <span className="text-red-bright font-bold">{amb.referrals_count}</span> referrals
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
