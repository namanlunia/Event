import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

import { SITE_CONFIG } from "@/lib/site-config";

export const metadata = {
  title: `Privacy Policy — ${SITE_CONFIG.ORG_NAME} Winter of Code`,
  description: "Privacy and data protection policy for OWOC participants.",
};

export default function PrivacyPage() {
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
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy & Data Security</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            Last updated: October 2026. Your privacy is paramount. This policy outlines how {SITE_CONFIG.ORG_NAME} collects, utilizes, and protects your information during OWOC.
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6 text-sm text-text-secondary leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-white">
              1. Information We Collect
            </h2>
            <p>
              When you authenticate with GitHub or email, we collect your public GitHub username, public avatar URL, verified email address, university name, and the GitHub pull requests/issues you associate with OWOC.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-white">
              2. How Your Information Is Used
            </h2>
            <p>
              Your data is utilized strictly to authenticate your identity, tabulate points on the leaderboard, issue digital certificates, and facilitate mentor-contributor communication in project tracks. We never sell your personal information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-white">
              3. Opt-in Opportunities
            </h2>
            <p>
              If confirmed program partners offer recruitment or interview opportunities, participants may choose to opt in to talent showcases. Participation is strictly voluntary and requires explicit consent.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-white">
              4. Contact & Inquiries
            </h2>
            <p>
              If you have any questions or data requests regarding our privacy practices, reach out to our team at{" "}
              <a
                href="mailto:contact@omnikonhub.com"
                className="text-red-bright hover:underline font-mono text-xs"
              >
                contact@omnikonhub.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
