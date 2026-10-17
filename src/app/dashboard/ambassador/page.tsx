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
import { MOCK_AMBASSADORS } from "@/data/mockDatabase";

export default function AmbassadorDashboard() {
  const ambassador = MOCK_AMBASSADORS[0]; // Kabir Sen (IIT Bombay)
  const [copied, setCopied] = useState(false);

  const referralUrl = `https://owoc.omnikon.org?ref=${ambassador.referral_code}`;

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
      reward: "Earned +100 pts & Verified Badge",
      status: "completed",
    },
    {
      id: "t-2",
      title: "Distribute Promo Kit across Engineering Batches",
      reward: "Earned +50 pts",
      status: "completed",
    },
    {
      id: "t-3",
      title: "Onboard 150+ Verified University Contributors",
      reward: "Unlocks Master Ambassador Custom Backpack",
      status: "active",
      progress: "142 / 150 (94%)",
    },
    {
      id: "t-4",
      title: "Organize Weekend Peer Code Review Clinic",
      reward: "Eligible for Sponsor Fast-track Pipeline",
      status: "upcoming",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-primary/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ambassador.avatar_url}
            alt={ambassador.full_name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-red-bright shadow-red-glow-sm"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-red-bright uppercase font-bold tracking-wider">
                CAMPUS AMBASSADOR COMMAND
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-2 text-[10px] font-mono text-text-muted">
                {ambassador.college_name}
              </span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              {ambassador.full_name}
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Rank #{ambassador.rank} Campus Ambassador Nationwide • {ambassador.reward_tier} Tier
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
              {ambassador.referral_code}
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
            {ambassador.referrals_count}
          </div>
          <p className="text-[11px] text-text-muted font-mono mt-1">
            Target Goal: {ambassador.target_goal} builders
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
            Rank #{ambassador.rank}
          </div>
          <p className="text-[11px] text-yellow-400 font-mono mt-1">
            Leading Ambassador across 350+ campuses
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted uppercase">
              Active Contributors
            </span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="font-heading font-black text-3xl text-white">118</div>
          <p className="text-[11px] text-green-400 font-mono mt-1">
            83% conversion rate to merged PRs
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
            {ambassador.reward_tier}
          </div>
          <p className="text-[11px] text-red-bright font-mono mt-1">
            Swag Box & Recommendation Unlocked
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
              Refer 8 more student developers to complete the Master Ambassador 150 milestone.
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-red-bright">
            94% Completed
          </span>
        </div>

        <div className="w-full bg-surface-2 h-3 rounded-full overflow-hidden border border-white/5">
          <div
            className="bg-gradient-to-r from-red-primary to-red-bright h-full rounded-full transition-all duration-500 shadow-red-glow-sm"
            style={{ width: "94%" }}
          />
        </div>

        <div className="grid grid-cols-4 text-center text-[10px] font-mono text-text-muted pt-2">
          <div>Bronze (25) ✓</div>
          <div>Silver (50) ✓</div>
          <div>Gold (100) ✓</div>
          <div className="text-red-bright font-bold">Master (150) - 8 left</div>
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
              Download pre-approved branding materials, social media posters, captions, and slide decks to conduct workshops at your campus.
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-surface-1 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">
                    Campus Workshop Deck (Keynote & PPTX)
                  </div>
                  <div className="text-[10px] text-text-muted">
                    12 slides covering Git basics, OWOC points & issues
                  </div>
                </div>
                <button
                  onClick={() => alert("Downloading OWOC_Campus_Deck_2024.pptx")}
                  className="p-2 rounded-lg bg-surface-2 hover:bg-red-primary/20 text-text-muted hover:text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-surface-1 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">
                    Social Posters & Story Templates (Figma & PNG)
                  </div>
                  <div className="text-[10px] text-text-muted">
                    9:16 and 1:1 banners with QR code placeholder
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
                  onClick={() => alert("Copied sample email copy to clipboard!")}
                  className="p-2 rounded-lg bg-surface-2 hover:bg-red-primary/20 text-text-muted hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-text-muted">
            <span>Ambassador Kit v2.4</span>
            <span className="text-red-bright font-bold">Updated for Sprint 3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
