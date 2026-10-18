"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Award,
  Download,
  Share2,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Flame,
  AlertCircle,
} from "lucide-react";
import { getCertificateById } from "@/lib/dataService";
import { SITE_CONFIG } from "@/lib/site-config";
import { SampleBadge } from "@/components/visual/DemoModeBanner";
import { SEASON_LABEL } from "@/lib/season";

export default function CertificateDetailPage() {
  const params = useParams();
  const id = (params?.id as string)?.toUpperCase();
  const certificateRef = useRef<HTMLDivElement>(null);
  const isDemoMode = SITE_CONFIG.DEMO_MODE;

  const cert = getCertificateById(id);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Verification link copied to clipboard!");
    }
  };

  // If certificate ID does not exist in registry
  if (!cert) {
    return (
      <div className="relative pt-36 pb-24 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full glass-card p-8 sm:p-12 rounded-3xl border border-white/10 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-red-primary/30 flex items-center justify-center mx-auto mb-6 shadow-red-glow-sm">
            <AlertCircle className="w-8 h-8 text-red-bright" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-white mb-2">
            Certificate Not Found
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-2">
            No official certificate was found matching the credential ID:
          </p>
          <div className="font-mono text-xs text-red-bright bg-surface-2 py-2 px-3 rounded-lg border border-white/5 my-4">
            {id || "UNKNOWN"}
          </div>
          <p className="text-xs text-text-muted mb-8 leading-relaxed">
            Certificates are issued only to verified contributors, mentors, and ambassadors after evaluation of merged contributions during {SEASON_LABEL}.
          </p>
          <Link
            href="/certificate"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white text-xs font-bold shadow-red-glow flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Search Another ID</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Actions Top Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <Link
            href="/certificate"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Lookup Another Certificate</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-xs font-mono text-white transition-colors flex items-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5 text-red-bright" />
              <span>Share Link</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-semibold shadow-red-glow transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Verification Status Pill */}
        <div className="mb-6 flex items-center justify-between bg-surface-1/60 border border-green-500/30 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>Verified Credential Record</span>
                {isDemoMode && <SampleBadge />}
              </div>
              <p className="text-[11px] text-text-muted font-mono">
                Issued for Omnikon Winter of Code {SEASON_LABEL} • Serial ID: {cert.id}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-green-400 font-bold hidden sm:inline">
            Status: Active
          </span>
        </div>

        {/* The Certificate Canvas */}
        <div
          ref={certificateRef}
          className="glass-card p-8 sm:p-14 rounded-3xl border-2 border-red-primary/40 relative overflow-hidden shadow-2xl bg-gradient-to-b from-[#111114] via-[#0B0B0D] to-[#050505]"
        >
          {/* Subtle watermarks and corner borders */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-red-primary/40 pointer-events-none" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-red-primary/40 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-red-primary/40 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-red-primary/40 pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto space-y-6">
            {/* Header Brand */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-primary flex items-center justify-center shadow-red-glow">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-heading font-black text-xl text-white tracking-tight">
                  OWOC {SEASON_LABEL}
                </div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-text-muted">
                  Omnikon Winter of Code
                </div>
              </div>
            </div>

            <div className="pt-4">
              <span className="text-xs font-mono uppercase tracking-widest text-red-bright font-bold">
                CERTIFICATE OF PARTICIPATION & EXCELLENCE
              </span>
              <p className="text-xs text-text-muted mt-1">
                This official credential is proudly presented to
              </p>
            </div>

            {/* Recipient */}
            <div className="py-2">
              <h2 className="font-heading font-black text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-red-bright to-white tracking-tight">
                {cert.recipient_name}
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-red-primary to-transparent mx-auto mt-3" />
            </div>

            {/* Citation */}
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              for outstanding open-source contributions as{" "}
              <strong className="text-white">{cert.role}</strong> during Omnikon Winter of Code {SEASON_LABEL}, collaborating on{" "}
              <strong className="text-white">{cert.project_name}</strong> and successfully solving production-grade issues.
            </p>

            {/* Signatures & Verification Meta */}
            <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/10 items-end">
              <div className="text-left space-y-1">
                <div className="font-mono text-xs text-text-muted">Credential ID:</div>
                <div className="font-mono text-xs text-white font-bold">{cert.id}</div>
                <div className="text-[11px] text-text-muted">
                  Verified via official OWOC Registry
                </div>
              </div>

              <div className="text-right space-y-1 sm:border-l sm:border-white/5 sm:pl-6">
                <div className="font-mono text-xs text-text-muted">Issuing Organization:</div>
                <div className="font-bold text-sm text-white">{SITE_CONFIG.ORG_NAME}</div>
                <div className="text-[11px] text-text-muted">
                  Issued: {cert.issued_date}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
