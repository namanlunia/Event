import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, AlertCircle, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Code of Conduct — Omnikon Winter of Code",
  description:
    "Community guidelines, pledge, and standards of mutual respect for all OWOC participants, mentors, and maintainers.",
};

export default function CodeOfConductPage() {
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Community Standards</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Code of Conduct
          </h1>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Omnikon Winter of Code is dedicated to providing a welcoming, inclusive, harassment-free environment for everyone, regardless of age, background, gender, race, or level of engineering experience.
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-8 text-sm sm:text-base text-text-secondary leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-white">
              1. Our Pledge
            </h2>
            <p>
              We as participants, contributors, mentors, and organizers pledge to make participation in OWOC a harassment-free experience for everyone. We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-white">
              2. Expected Behaviors
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-text-secondary">
              <li>Demonstrating empathy and kindness toward other contributors</li>
              <li>Being respectful of differing viewpoints, architectures, and design approaches</li>
              <li>Giving and gracefully accepting constructive criticism on PR reviews</li>
              <li>Focusing on what is best not just for personal leaderboard standing, but for the overall repository health</li>
              <li>Assisting beginners and answering questions with patience in community channels</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-white">
              3. Unacceptable Behaviors
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-text-secondary">
              <li>Harassment, trolling, insulting or derogatory remarks, and personal or political attacks</li>
              <li>Submitting plagiarized pull requests or copying another student&apos;s code</li>
              <li>Aggressive or dismissive language in PR review threads</li>
              <li>Publishing others&apos; private information without explicit permission</li>
              <li>Spamming issues or creating fake GitHub accounts to manipulate referral points</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-white">
              4. Enforcement & Reporting
            </h2>
            <p>
              Instances of abusive, harassing, or otherwise unacceptable behavior may be reported directly to the OWOC Community Ethics Committee at{" "}
              <a
                href="mailto:conduct@owoc.omnikon.org"
                className="text-red-bright underline"
              >
                conduct@owoc.omnikon.org
              </a>
              . All complaints will be reviewed and investigated promptly and fairly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
