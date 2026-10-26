"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Terminal } from "lucide-react";
import { useAppStore } from "@/lib/store";

interface ForbiddenStateProps {
  requiredRoles?: string[];
  currentRole?: string;
  message?: string;
}

export default function ForbiddenState({
  requiredRoles = ["authorized"],
  currentRole,
  message,
}: ForbiddenStateProps) {
  const { currentPersona } = useAppStore();
  const activeRole = currentRole || currentPersona.role;

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-lg w-full glass-card p-8 sm:p-10 rounded-3xl border border-red-primary/30 shadow-2xl relative overflow-hidden text-center">
        {/* Crimson glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-primary/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-primary/10 border border-red-primary/40 shadow-red-glow">
            <ShieldAlert className="w-8 h-8 text-red-bright animate-pulse" />
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-red-bright font-bold">
              HTTP 403 · FORBIDDEN
            </span>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
              Restricted Console Access
            </h1>
            <p className="text-xs text-text-secondary mt-2">
              {message ||
                "Your current active role does not have authorization to view this dashboard. Access is restricted to designated stakeholders."}
            </p>
          </div>

          {/* Details breakdown */}
          <div className="p-4 rounded-xl bg-surface-1 border border-white/10 text-left space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Your Active Role:</span>
              <span className="text-white font-bold capitalize px-2 py-0.5 rounded bg-surface-2 border border-white/10">
                {activeRole.replace("_", " ")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Required Clearance:</span>
              <span className="text-red-bright font-bold capitalize px-2 py-0.5 rounded bg-red-primary/10 border border-red-primary/30">
                {requiredRoles.map((r) => r.replace("_", " ")).join(" or ")}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={currentPersona.dashboardUrl}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-bold transition-all shadow-red-glow-sm flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              <span>Return to My Dashboard</span>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-1 text-text-secondary hover:text-white border border-white/10 text-xs font-medium transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Exit to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
