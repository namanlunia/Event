"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Search,
  Award,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function CertificateLookupPage() {
  const router = useRouter();
  const [certId, setCertId] = useState("");

  const samples = [
    { id: "OWOC-2024-C-9821", name: "Aarav Patel", role: "Contributor (Rank #1)" },
    { id: "OWOC-2024-M-5401", name: "Dr. Aris Thorne", role: "Technical Mentor" },
    { id: "OWOC-2024-A-1102", name: "Kabir Sen", role: "Master Ambassador" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (certId.trim()) {
      router.push(`/certificate/${certId.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Digital Credential Registry</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Verify OWOC Certificate
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl mx-auto">
            Every certificate issued by the Omnikon Foundation is backed by a unique identification code and cryptographic verification hash.
          </p>
        </div>

        {/* Verification Lookup Input */}
        <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="space-y-4">
            <label className="text-xs font-mono text-text-muted block">
              Enter Certificate Unique ID (UID)
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  placeholder="e.g. OWOC-2024-C-9821"
                  className="w-full pl-10 pr-4 py-3 bg-surface-1 border border-white/10 rounded-xl text-sm font-mono text-white placeholder-text-muted focus:outline-none focus:border-red-primary/60 uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-primary to-red-bright hover:shadow-red-glow text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Verify Credential</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Sample Links */}
          <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
            <span className="text-xs font-mono text-text-muted block">
              Try Sample Verified Credentials:
            </span>
            <div className="flex flex-wrap gap-2">
              {samples.map((s) => (
                <button
                  key={s.id}
                  onClick={() => router.push(`/certificate/${s.id}`)}
                  className="px-3 py-1.5 rounded-lg bg-surface-2 border border-white/5 text-[11px] font-mono text-text-secondary hover:text-white hover:border-red-primary/40 transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-red-bright" />
                  <span>{s.id}</span>
                  <span className="text-text-muted">({s.name})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Verification Architecture features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-red-primary/10 text-red-bright mx-auto flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-sm text-white mb-1">
              Cryptographic Hash
            </h3>
            <p className="text-xs text-text-muted">
              Tamper-proof SHA-256 verification hash generated at issuance.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-red-primary/10 text-red-bright mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-sm text-white mb-1">
              Public Ledger Lookup
            </h3>
            <p className="text-xs text-text-muted">
              Instantly verifiable by employers, universities, and partners.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-red-primary/10 text-red-bright mx-auto flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-sm text-white mb-1">
              Print & Vector PDF
            </h3>
            <p className="text-xs text-text-muted">
              High-resolution export with scannable QR verification code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
