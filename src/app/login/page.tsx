"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Flame,
  Mail,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
  Terminal,
} from "lucide-react";
import { DEMO_PERSONAS, useAppStore } from "@/lib/store";
import { UserRole } from "@/types";
import { SITE_CONFIG } from "@/lib/site-config";
import { SampleBadge } from "@/components/visual/DemoModeBanner";
import AvatarDisplay from "@/components/visual/AvatarDisplay";

export default function LoginPage() {
  const router = useRouter();
  const { currentPersona, switchRole } = useAppStore();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = (role: UserRole, targetUrl: string) => {
    switchRole(role);
    router.push(targetUrl);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Default to contributor dashboard for email demo
      switchRole("contributor");
      router.push("/dashboard/contributor");
    }, 600);
  };

  return (
    <div className="relative pt-32 pb-24 min-h-screen flex items-center justify-center px-4">
      {/* Center glowing light source */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-red-primary/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full glass-card p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-primary to-red-deep p-[1px] shadow-red-glow-sm">
              <div className="w-full h-full bg-[#0B0B0D] rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5 text-red-bright" />
              </div>
            </div>
            <span className="font-heading font-black text-2xl text-white">
              OWOC
            </span>
          </Link>
          <h1 className="font-heading font-bold text-2xl text-white">
            Access OWOC Portal
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Sign in to track pull requests, score points, and manage repositories.
          </p>
        </div>

        {/* Primary Action: GitHub OAuth */}
        <button
          onClick={() => handleDemoLogin("contributor", "/dashboard/contributor")}
          className="w-full py-3 rounded-xl bg-[#24292e] hover:bg-[#2b3137] text-white text-xs font-bold transition-all border border-white/10 hover:border-white/20 flex items-center justify-center gap-2.5 shadow-lg group mb-4"
        >
          <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>Continue with GitHub (Recommended)</span>
        </button>

        {/* Divider & Demo Personas (Visible only in DEMO_MODE) */}
        {SITE_CONFIG.DEMO_MODE && (
          <>
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <span className="relative px-3 bg-surface-1 text-[11px] font-mono text-text-muted">
                DEMO PERSONAS
              </span>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[11px] font-mono text-red-bright uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sample Role Switcher</span>
                </div>
                <SampleBadge />
              </div>

              {DEMO_PERSONAS.map((p) => (
                <button
                  key={p.role}
                  onClick={() => handleDemoLogin(p.role, p.dashboardUrl)}
                  className="w-full p-2.5 rounded-xl bg-surface-2 border border-white/5 hover:border-red-primary/40 text-left flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <AvatarDisplay name={p.name} size="sm" />
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-red-bright transition-colors">
                        {p.name}
                      </div>
                      <div className="text-[10px] font-mono text-text-muted">
                        {p.title}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-red-bright group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </>
        )}

        {/* Fallback Email Input */}
        <form onSubmit={handleEmailLogin} className="space-y-2 pt-2 border-t border-white/5">
          <label className="text-[11px] font-mono text-text-muted block">
            Or sign in with email:
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@university.edu"
              className="flex-grow bg-surface-2 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-red-primary/60"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-red-primary hover:bg-red-bright text-white text-xs font-semibold rounded-xl transition-colors"
            >
              {loading ? "..." : "Go"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
