"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Copy,
  Check,
  Trophy,
  Users,
  Gift,
  Download,
  Share2,
  ExternalLink,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { SITE_CONFIG } from "@/lib/site-config";
import { MOCK_AMBASSADORS } from "@/lib/demo-data";
import { SampleBadge } from "@/components/visual/DemoModeBanner";
import AvatarDisplay from "@/components/visual/AvatarDisplay";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function AmbassadorDashboard() {
  const { currentPersona } = useAppStore();
  const isDemo = SITE_CONFIG.DEMO_MODE;
  const demoAmbassador = isDemo && MOCK_AMBASSADORS.length > 0 ? MOCK_AMBASSADORS[0] : null;

  const [copied, setCopied] = useState(false);

  const ambassadorName = demoAmbassador ? demoAmbassador.full_name : (currentPersona?.name || "Campus Ambassador");
  const collegeName = demoAmbassador ? demoAmbassador.college_name : "Your University Chapter";
  const referralCode = demoAmbassador ? demoAmbassador.referral_code : "CAMPUS-2026";
  const referralsCount = demoAmbassador ? demoAmbassador.referrals_count : 0;
  const rankDisplay = "Standby";

  // Derive current and next tier dynamically from SITE_CONFIG.AMBASSADOR_REWARDS
  const currentTierObj =
    [...SITE_CONFIG.AMBASSADOR_REWARDS]
      .reverse()
      .find((t) => referralsCount >= t.minReferrals) || null;
  const rewardTier = currentTierObj ? `${currentTierObj.tierName} Tier` : "Initiate Tier";
  const nextTierObj =
    SITE_CONFIG.AMBASSADOR_REWARDS.find((t) => referralsCount < t.minReferrals) ||
    SITE_CONFIG.AMBASSADOR_REWARDS[SITE_CONFIG.AMBASSADOR_REWARDS.length - 1];
  const progressPercent = targetGoal > 0 ? Math.min(100, Math.round((referralsCount / targetGoal) * 100)) : 0;

  const referralUrl = `https://owoc.org?ref=${referralCode}`;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tasks = [
    {
      id: "t-1",
      title: "Host Campus Git & OWOC Orientation Session",
      reward: "Earn +100 pts & Verified Campus Lead Badge",
      status: isDemo ? "completed" : "active",
    },
    {
      id: "t-2",
      title: "Share OWOC Roadmap across Engineering Groups",
      reward: "Earn +50 pts",
      status: isDemo ? "completed" : "active",
    },
    {
      id: "t-3",
      title: `Onboard ${nextTierObj.minReferrals}+ Verified University Contributors`,
      reward: `Unlocks ${nextTierObj.tierName} Tier: ${nextTierObj.perks[0]}`,
      status: isDemo ? "active" : "upcoming",
      progress: isDemo
        ? `${referralsCount} / ${nextTierObj.minReferrals} (${Math.min(100, Math.round((referralsCount / nextTierObj.minReferrals) * 100))}%)`
        : "0 / 10 (0%)",
    },
    {
      id: "t-4",
      title: "Organize Weekend Peer Contribution Workroom",
      reward: "Earn +75 pts",
      status: "upcoming",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-primary/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <AvatarDisplay name={ambassadorName} size="lg" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-red-bright uppercase font-bold tracking-wider">
                CAMPUS AMBASSADOR COMMAND
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-2 text-[10px] font-mono text-text-muted">
                {collegeName}
              </span>
              {isDemo && <SampleBadge />}
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              {ambassadorName}
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Rank {rankDisplay} • {rewardTier}
            </p>
          </div>
        </div>

        {/* Unique Referral Box */}
        <div className="glass-card p-4 rounded-2xl border border-red-primary/40 flex flex-col sm:flex-row items-center gap-3 bg-surface-1/90">
          <div>
            <span className="text-[10px] font-mono text-text-muted uppercase block">
              Your Referral Code
            </span>
            <span className="font-mono text-sm font-bold text-red-bright">
              {referralCode}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-semibold shadow-red-glow transition-all flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>
      </div>

      {/* Ambassador Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Total Referrals
            </span>
            <Users className="w-4 h-4 text-red-bright" />
          </div>
          <div className="font-heading font-black text-3xl text-white">
            <AnimatedCounter
              value={referralsCount}
              fallbackText="0"
              className="font-heading font-black text-3xl text-white"
            />
          </div>
          <p className="text-[11px] text-text-muted font-mono mt-1">
            Target Goal: {targetGoal} builders
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Campus Rank
            </span>
            <Trophy className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="font-heading font-black text-3xl text-white">
            {rankDisplay}
          </div>
          <p className="text-[11px] text-text-muted font-mono mt-1">
            Rankings active when coding starts
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Active Contributors
            </span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="font-heading font-black text-3xl text-white">
            <AnimatedCounter
              value={activeContributors}
              fallbackText="0"
              className="font-heading font-black text-3xl text-white"
            />
          </div>
          <p className="text-[11px] text-green-400 font-mono mt-1">
            {isDemo ? "Contributors with merged PRs" : "Tracks contributors from your link"}
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Current Perk Tier
            </span>
            <Sparkles className="w-4 h-4 text-red-bright" />
          </div>
          <div className="font-heading font-bold text-lg text-white">
            {rewardTier}
          </div>
          <p className="text-[11px] text-red-bright font-mono mt-1">
            {isDemo ? "Digital Credential & Verification" : "Complete milestones to level up"}
          </p>
        </div>
      </div>

      {/* Reward Progress Bar */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-white">
              Reward Tier Progression
            </h3>
            <p className="text-xs text-text-muted">
              {isDemo
                ? "Sample tier milestone tracking"
                : "Refer student developers to unlock verified ambassador tiers."}
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-red-bright">
            {isDemo ? `${progressPercent}% Completed` : "0% Completed"}
          </span>
        </div>

        <div className="w-full bg-surface-2 h-3 rounded-full overflow-hidden border border-white/5">
          <div
            className="bg-gradient-to-r from-red-primary to-red-bright h-full rounded-full transition-all duration-500 shadow-red-glow-sm"
            style={{ width: isDemo ? `${progressPercent}%` : "4%" }}
          />
        </div>

        <div className="grid grid-cols-4 text-center text-[10px] font-mono text-text-muted pt-2">
          {SITE_CONFIG.AMBASSADOR_REWARDS.map((tier) => (
            <div key={tier.tierName}>
              {tier.tierName} ({tier.minReferrals}+)
            </div>
          ))}
        </div>
      </div>

      {/* Ambassador Tasks & Promo Kit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Missions & Tasks */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
          <h3 className="font-heading font-bold text-lg text-white">
            Campus Missions & Tasks
          </h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-3.5 rounded-xl bg-surface-1 border border-white/5 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-white">
                    {task.title}
                  </div>
                  <div className="text-[11px] text-text-muted font-mono">
                    {task.reward}
                  </div>
                  {task.progress && (
                    <div className="text-[10px] font-mono text-red-bright">
                      Progress: {task.progress}
                    </div>
                  )}
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    task.status === "completed"
                      ? "bg-green-500/10 text-green-400 border border-green-500/30"
                      : task.status === "active"
                      ? "bg-red-primary/20 text-red-bright border border-red-primary/40"
                      : "bg-white/5 text-text-muted"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Kit Downloads */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-white">
              Official Promo Kit & Assets
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-4">
              Download pre-approved branding materials, presentation slides, and posters to conduct orientation workshops at your campus.
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-surface-1 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">
                    Campus Orientation Deck
                  </div>
                  <div className="text-[10px] text-text-muted">
                    Slides covering open source basics, OWOC points & guidelines
                  </div>
                </div>
                <button
                  onClick={() => alert("Downloading OWOC_Campus_Deck.pptx")}
                  className="p-2 rounded-lg bg-surface-2 hover:bg-red-primary/20 text-text-muted hover:text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-surface-1 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">
                    Social Posters & Story Templates
                  </div>
                  <div className="text-[10px] text-text-muted">
                    Banner templates for university technical club channels
                  </div>
                </div>
                <button
                  onClick={() => alert("Downloading OWOC_Social_Pack.zip")}
                  className="p-2 rounded-lg bg-surface-2 hover:bg-red-primary/20 text-text-muted hover:text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-surface-1 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">
                    Sample WhatsApp & Email Outreach Copy
                  </div>
                  <div className="text-[10px] text-text-muted">
                    Ready-to-use blurbs with your referral link
                  </div>
                </div>
                <button
                  onClick={() => alert("Copied sample outreach copy to clipboard!")}
                  className="p-2 rounded-lg bg-surface-2 hover:bg-red-primary/20 text-text-muted hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-text-muted">
            <span>Ambassador Kit</span>
            <span className="text-red-bright font-bold">Inaugural Edition</span>
          </div>
        </div>
      </div>
    </div>
  );
}
