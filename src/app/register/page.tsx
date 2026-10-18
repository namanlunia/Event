"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Flame,
  FolderGit2,
  Users,
  ArrowRight,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { SEASON_LABEL } from "@/lib/season";

export default function RegisterPage() {
  const router = useRouter();
  const { switchRole } = useAppStore();
  const [loading, setLoading] = useState(false);

  const handleContributorSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      switchRole("contributor");
      router.push("/dashboard/contributor");
    }, 500);
  };

  return (
    <div className="relative pt-32 pb-24 min-h-screen flex items-center justify-center px-4">
      {/* Center glowing light source */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-primary/15 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-3xl w-full glass-card p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl relative z-10 space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-primary to-red-deep p-[1px] shadow-red-glow-sm">
              <div className="w-full h-full bg-[#0B0B0D] rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5 text-red-bright" />
              </div>
            </div>
            <span className="font-heading font-black text-2xl text-white">OWOC {SEASON_LABEL}</span>
          </Link>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
            Join the Winter Season
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary max-w-lg mx-auto">
            Choose how you want to participate in Omnikon Winter of Code 2026.
          </p>
        </div>

        {/* Primary Contributor Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-red-primary/10 via-surface-1 to-surface-1 border border-red-primary/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-primary/20 text-red-bright border border-red-primary/40 text-[10px] font-mono font-bold uppercase">
                Primary Track
              </span>
              <span className="text-xs font-mono text-text-muted">December 2026</span>
            </div>
            <h2 className="font-heading font-black text-xl text-white">
              Student Contributor
            </h2>
            <p className="text-xs text-text-secondary leading-relaxed max-w-md">
              Solve issues on real open-source repositories, submit PRs, earn points on the leaderboard, unlock digital certificates, and win winter swag boxes.
            </p>
          </div>

          <button
            onClick={handleContributorSignUp}
            disabled={loading}
            className="px-6 py-3.5 rounded-xl bg-red-primary hover:bg-red-bright text-white font-mono font-bold text-xs shadow-red-glow transition-all flex items-center justify-center gap-2 self-start md:self-center flex-shrink-0"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Register with GitHub</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Secondary Stakeholder Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Become a Project Admin */}
          <Link
            href="/apply/project-admin"
            className="p-6 rounded-2xl bg-surface-1 hover:bg-surface-2 border border-white/10 hover:border-red-primary/40 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-surface-2 border border-white/10 flex items-center justify-center text-red-bright group-hover:scale-105 transition-transform">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white group-hover:text-red-bright transition-colors">
                Become a Project Admin
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Maintainers submit their open-source codebase to onboard contributors, assign issues, and run sprint triage.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-red-bright font-bold pt-2">
              <span>Apply Repository</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Become a Technical Mentor */}
          <Link
            href="/apply/mentor"
            className="p-6 rounded-2xl bg-surface-1 hover:bg-surface-2 border border-white/10 hover:border-red-primary/40 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-surface-2 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white group-hover:text-red-bright transition-colors">
                Become a Technical Mentor
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Experienced engineers conduct code reviews, grade PR quality, host office hours clinics, and mentor student builders.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-red-bright font-bold pt-2">
              <span>Apply as Mentor</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-text-muted gap-2">
          <span>Already registered?</span>
          <Link href="/login" className="text-white hover:text-red-bright font-bold">
            Sign In to OWOC &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
