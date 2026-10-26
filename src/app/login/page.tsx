"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Lock, ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { StandardRole } from "@/types";
import { SEASON_LABEL } from "@/lib/season";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [devRole, setDevRole] = useState<StandardRole>("contributor");

  const supabaseConfigured = isSupabaseConfigured();
  const isDev = process.env.NODE_ENV === "development";

  const handleGitHubLogin = async () => {
    if (!supabaseConfigured) {
      setErrorMsg("Sign-in is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable authentication.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo,
        },
      });
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to initiate GitHub authentication.");
      setLoading(false);
    }
  };

  const handleDevBypass = (roleToAssume: StandardRole) => {
    if (!isDev) return;
    document.cookie = `DEV_ASSUME_ROLE=${roleToAssume}; path=/; max-age=86400; SameSite=Lax`;
    document.cookie = `owoc_user_role=${roleToAssume}; path=/; max-age=86400; SameSite=Lax`;
    const targetDashboard = roleToAssume === "super_admin" ? "/dashboard/admin" : `/dashboard/${roleToAssume}`;
    router.push(targetDashboard);
  };

  return (
    <div className="relative pt-32 pb-24 min-h-screen flex items-center justify-center px-4">
      {/* Center glowing light source */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-red-primary/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full glass-card p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <BrandLogo />
            <span className="font-heading font-black text-2xl text-white">
              OWOC
            </span>
          </Link>
          <h1 className="font-heading font-bold text-2xl text-white">
            Portal Access
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            OWOC {SEASON_LABEL} Participant & Maintainer Authentication
          </p>
        </div>

        {/* Warning banner when Supabase is not configured */}
        {!supabaseConfigured && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold block text-white mb-0.5">Authentication Notice</span>
              Sign-in is not configured yet. Set <code className="font-mono text-amber-300">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="font-mono text-amber-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable authentication.
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-bright text-xs">
            {errorMsg}
          </div>
        )}

        <div className="space-y-4">
          {/* Official Supabase GitHub OAuth */}
          <button
            onClick={handleGitHubLogin}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#24292e] hover:bg-[#2b3137] text-white text-xs font-bold transition-all border border-white/10 hover:border-white/20 flex items-center justify-center gap-2.5 shadow-lg group disabled:opacity-50"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>{loading ? "Connecting to GitHub..." : "Continue with GitHub"}</span>
          </button>

          <p className="text-[11px] text-text-muted text-center leading-relaxed">
            By signing in, you agree to the OWOC{" "}
            <Link href="/code-of-conduct" className="text-red-bright hover:underline">
              Code of Conduct
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="text-red-bright hover:underline">
              Terms
            </Link>
            . New accounts are assigned the <span className="text-white font-semibold">Contributor</span> role.
          </p>

          {/* Development Bypass ONLY when NODE_ENV === 'development' */}
          {isDev && (
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted uppercase tracking-wider font-bold">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>Local Dev Role Bypass (DEV_ASSUME_ROLE)</span>
              </div>
              <p className="text-[10px] text-text-muted leading-relaxed">
                Development environment active. Simulate any dashboard without production Supabase credentials:
              </p>
              <div className="flex gap-2">
                <select
                  value={devRole}
                  onChange={(e) => setDevRole(e.target.value as StandardRole)}
                  className="bg-surface-2 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono flex-grow focus:outline-none focus:border-red-primary/60"
                >
                  <option value="contributor">Contributor (default)</option>
                  <option value="project_admin">Project Admin</option>
                  <option value="mentor">Mentor</option>
                  <option value="ambassador">Campus Ambassador</option>
                  <option value="super_admin">Super Admin</option>
                </select>
                <button
                  onClick={() => handleDevBypass(devRole)}
                  className="px-4 py-2 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-xs font-mono font-bold text-white transition-all flex items-center gap-1.5"
                >
                  <span>Assume</span>
                  <ArrowRight className="w-3 h-3 text-red-bright" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="pt-6 mt-6 border-t border-white/5 text-center">
          <Link
            href="/register"
            className="text-xs font-mono text-text-muted hover:text-white transition-colors"
          >
            New to OWOC?{" "}
            <span className="text-red-bright font-bold">Register & Apply &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
