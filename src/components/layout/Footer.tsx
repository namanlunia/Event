"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Flame,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 z-10 pt-16 pb-12 overflow-hidden">
      {/* Subtle crimson background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-red-primary/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-primary to-red-deep p-[1px] shadow-red-glow-sm">
                <div className="w-full h-full bg-[#0B0B0D] rounded-xl flex items-center justify-center">
                  <Flame className="w-5 h-5 text-red-bright" />
                </div>
              </div>
              <span className="font-heading font-black text-xl text-white">
                OWOC
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Omnikon Winter of Code is a premier open-source initiative bringing together developers, mentors, and campus ambassadors to engineer production-grade software during the winter season.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/omnikon"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-surface-1 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-red-primary/50 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/omnikon_owoc"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-surface-1 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-red-primary/50 transition-colors"
                aria-label="X / Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/omnikon"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-surface-1 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-red-primary/50 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://discord.gg/omnikon"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-surface-1 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-red-primary/50 transition-colors"
                aria-label="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Program Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-red-bright font-bold">
              Program
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="text-text-secondary hover:text-white transition-colors">
                  Explore Projects
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-text-secondary hover:text-white transition-colors">
                  Live Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="text-text-secondary hover:text-white transition-colors">
                  Program Timeline
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-text-secondary hover:text-white transition-colors">
                  Points & Rules
                </Link>
              </li>
              <li>
                <Link href="/certificate" className="text-text-secondary hover:text-white transition-colors">
                  Certificate Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Team */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-red-bright font-bold">
              Community
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-white transition-colors">
                  About Omnikon
                </Link>
              </li>
              <li>
                <Link href="/mentors" className="text-text-secondary hover:text-white transition-colors">
                  Mentors Directory
                </Link>
              </li>
              <li>
                <Link href="/ambassadors" className="text-text-secondary hover:text-white transition-colors">
                  Campus Ambassadors
                </Link>
              </li>
              <li>
                <Link href="/sponsors" className="text-text-secondary hover:text-white transition-colors">
                  Sponsors & Partners
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-text-secondary hover:text-white transition-colors">
                  Organizing Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Updates */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-red-bright font-bold">
              Stay Informed
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Subscribe for weekly sprint announcements, workshop links, and bonus point challenges.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-green-500/10 border border-green-500/30 text-xs text-green-400">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>You are subscribed to OWOC updates!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-surface-1 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-red-primary/60"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-red-primary hover:bg-red-bright text-white rounded-md flex items-center justify-center transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div>
            © {new Date().getFullYear()} Omnikon Foundation. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/code-of-conduct" className="hover:text-text-secondary transition-colors">
              Code of Conduct
            </Link>
            <Link href="/privacy" className="hover:text-text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-text-secondary transition-colors">
              Terms of Participation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
