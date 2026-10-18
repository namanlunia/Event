"use client";

import React from "react";
import Link from "next/link";
import {
  MessageSquare,
} from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";
import { COPYRIGHT_YEAR } from "@/lib/season";
import { SITE_CONFIG } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] border-t border-white/10 z-10 pt-16 pb-12 overflow-hidden">
      {/* Subtle crimson background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-red-primary/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <BrandLogo />
              <span className="font-heading font-black text-xl text-white">
                OWOC
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Omnikon Winter of Code is a premier open-source initiative bringing together developers, mentors, and campus ambassadors to engineer production-grade software during the winter season.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {SITE_CONFIG.SOCIAL_LINKS.github && (
                <a
                  href={SITE_CONFIG.SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-surface-1 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-red-primary/50 transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              )}
              {SITE_CONFIG.SOCIAL_LINKS.twitter && (
                <a
                  href={SITE_CONFIG.SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-surface-1 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-red-primary/50 transition-colors"
                  aria-label="X / Twitter"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
              {SITE_CONFIG.SOCIAL_LINKS.linkedin && (
                <a
                  href={SITE_CONFIG.SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-surface-1 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-red-primary/50 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
              {SITE_CONFIG.SOCIAL_LINKS.discord && (
                <a
                  href={SITE_CONFIG.SOCIAL_LINKS.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-surface-1 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-red-primary/50 transition-colors"
                  aria-label="Discord"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              )}
              {/* No social links configured yet — add URLs to .env.local */}
              {!SITE_CONFIG.SOCIAL_LINKS.github && !SITE_CONFIG.SOCIAL_LINKS.twitter &&
               !SITE_CONFIG.SOCIAL_LINKS.linkedin && !SITE_CONFIG.SOCIAL_LINKS.discord && (
                <p className="text-xs text-text-muted font-mono">Social links coming soon</p>
              )}
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
                  Leaderboard
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
              <li>
                <Link href="/apply/project-admin" className="text-red-bright hover:text-white font-mono text-xs transition-colors">
                  &rarr; Apply as Project Admin
                </Link>
              </li>
              <li>
                <Link href="/apply/mentor" className="text-red-bright hover:text-white font-mono text-xs transition-colors">
                  &rarr; Apply as Mentor
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
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div>
            © {COPYRIGHT_YEAR} {SITE_CONFIG.ORG_NAME}. All rights reserved.
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
