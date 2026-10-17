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
} from "lucide-react";
import { MOCK_SAMPLE_CERTIFICATE, MOCK_CONTRIBUTORS } from "@/data/mockDatabase";

export default function CertificateDetailPage() {
  const params = useParams();
  const id = (params?.id as string)?.toUpperCase();
  const certificateRef = useRef<HTMLDivElement>(null);

  // Fallback data if custom ID is requested
  const isSample = id === MOCK_SAMPLE_CERTIFICATE.id;
  const recipientName = isSample
    ? MOCK_SAMPLE_CERTIFICATE.recipient_name
    : id.includes("M-")
    ? "Dr. Aris Thorne"
    : id.includes("A-")
    ? "Kabir Sen"
    : "Aarav Patel";

  const role = isSample
    ? MOCK_SAMPLE_CERTIFICATE.role
    : id.includes("M-")
    ? "Technical Mentor"
    : id.includes("A-")
    ? "Master Campus Ambassador"
    : "Top Contributor (Rank #1)";

  const project = isSample
    ? MOCK_SAMPLE_CERTIFICATE.project_name
    : id.includes("M-")
    ? "WinterVision Core & Compiler Tracks"
    : id.includes("A-")
    ? "IIT Bombay Campus Chapter"
    : "WinterVision Core";

  const points = isSample ? MOCK_SAMPLE_CERTIFICATE.points : 1240;
  const hash = isSample
    ? MOCK_SAMPLE_CERTIFICATE.verification_hash
    : "0x8F9A4E27B13C9945D783E002B18944FE78B9910D";

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Verification link copied to clipboard!");
    }
  };

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
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Verified Badge Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono mb-6">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Cryptographically Validated Certificate • UID: {id}</span>
        </div>

        {/* Certificate Printable Canvas Frame */}
        <div
          ref={certificateRef}
          className="relative bg-[#09090C] rounded-3xl p-8 sm:p-14 border-2 border-red-primary/50 shadow-2xl shadow-red-glow overflow-hidden text-center text-white"
        >
          {/* Subtle Guilloche / Geometric Watermark */}
          <div className="absolute inset-4 rounded-2xl border border-white/10 pointer-events-none" />
          <div className="absolute inset-6 rounded-2xl border border-red-primary/20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-bright/10 blur-3xl pointer-events-none" />

          {/* Certificate Header */}
          <div className="relative space-y-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-primary to-red-deep p-[1px] mx-auto shadow-red-glow-sm">
              <div className="w-full h-full bg-[#0B0B0D] rounded-2xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-red-bright" />
              </div>
            </div>

            <div className="text-[11px] font-mono tracking-[0.25em] text-red-bright uppercase font-bold">
              OMNIKON FOUNDATION • WINTER OF CODE 2024–2025
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
              Certificate of Excellence
            </h1>
            <p className="text-xs text-text-muted font-mono tracking-wider">
              THIS IS PROUDLY PRESENTED TO
            </p>
          </div>

          {/* Recipient Name */}
          <div className="my-8">
            <div className="font-heading font-black text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-red-bright tracking-tight">
              {recipientName}
            </div>
            <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-red-primary to-transparent mx-auto mt-3" />
          </div>

          {/* Citation Body */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-text-secondary leading-relaxed mb-8">
            for exceptional technical contribution, architectural rigor, and open-source craftsmanship in the{" "}
            <span className="text-white font-semibold">{project}</span> track.
            Having accrued <span className="text-red-bright font-bold font-mono">{points} points</span> across production pull requests during the winter sprints.
          </p>

          {/* Role Pill */}
          <div className="inline-block px-4 py-1.5 rounded-xl bg-surface-1 border border-white/10 text-xs font-mono text-white mb-10">
            Track Designation: <span className="text-red-bright font-bold">{role}</span>
          </div>

          {/* Signatures & Seal Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 items-end gap-8 pt-8 border-t border-white/10 relative">
            {/* Signature 1 */}
            <div className="text-center sm:text-left space-y-1">
              <div className="font-serif italic text-lg text-white font-light">
                Devansh Rastogi
              </div>
              <div className="w-36 h-px bg-white/20 mx-auto sm:mx-0" />
              <div className="text-[11px] font-bold text-white">Devansh Rastogi</div>
              <div className="text-[10px] text-text-muted">
                Program Director, Omnikon
              </div>
            </div>

            {/* Embossed Center Seal with QR Representation */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full border-2 border-red-bright/60 bg-surface-1 mx-auto flex flex-col items-center justify-center p-2 shadow-red-glow-sm">
                <ShieldCheck className="w-6 h-6 text-red-bright mb-1" />
                <span className="text-[8px] font-mono tracking-widest text-text-muted uppercase">
                  VERIFIED
                </span>
              </div>
            </div>

            {/* Signature 2 */}
            <div className="text-center sm:text-right space-y-1">
              <div className="font-serif italic text-lg text-white font-light">
                Dr. Aris Thorne
              </div>
              <div className="w-36 h-px bg-white/20 mx-auto sm:ml-auto sm:mr-0" />
              <div className="text-[11px] font-bold text-white">Dr. Aris Thorne</div>
              <div className="text-[10px] text-text-muted">
                Technical Review Chair
              </div>
            </div>
          </div>

          {/* Cryptographic Hash Bottom Bar */}
          <div className="mt-10 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-text-muted gap-2">
            <div>Verification UID: <span className="text-white">{id}</span></div>
            <div className="truncate max-w-xs">Hash: {hash}</div>
            <div>Issued: January 10, 2025</div>
          </div>
        </div>
      </div>
    </div>
  );
}
