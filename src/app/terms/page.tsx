import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { SEASON_LABEL } from "@/lib/season";

export const metadata = {
  title: "Terms of Participation — Omnikon Winter of Code",
  description: "Terms and conditions of participation in Omnikon Winter of Code.",
};

export default function TermsPage() {
  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Framework</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Terms of Participation
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            By registering and participating in OWOC {SEASON_LABEL} as a contributor, mentor, ambassador, or project admin, you agree to these program terms.
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6 text-sm text-text-secondary leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-white">
              1. Open Source Licensing
            </h2>
            <p>
              All code contributions made during OWOC are submitted under the open-source license chosen by the target repository (e.g., MIT, Apache 2.0, GPLv3). Contributors retain copyright to their original contributions while granting the repository owner and public license permissions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-white">
              2. Program Disqualification
            </h2>
            <p>
              The OWOC Organizing Committee reserves the sole discretion to disqualify participants who violate the Code of Conduct, submit plagiarized code, artificially inflate referral numbers, or harass community members.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-white">
              3. Certificates & Recognition
            </h2>
            <p>
              Digital certificates are awarded to participants who meet the program qualification criteria (including approved and merged pull requests or active mentorship). Any additional physical awards or perks are subject to confirmed sponsorship.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
