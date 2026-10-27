"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Handshake } from "lucide-react";
import { getConfirmedSponsors } from "@/lib/dataService";
import { SEASON_LABEL } from "@/lib/season";

export default function SponsorsSection() {
  const sponsors = getConfirmedSponsors();

  const alphaSponsors = sponsors.filter((s) => s.tier === "Alpha Title");
  const crimsonSponsors = sponsors.filter((s) => s.tier === "Crimson Partner");
  const communitySponsors = sponsors.filter((s) => s.tier === "Community Supporter");

  // Empty state — no confirmed sponsors yet
  if (sponsors.length === 0) {
    return (
      <section className="relative py-20 z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
              <span>Ecosystem Backers</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Become a Founding Sponsor
            </h2>
            <p className="mt-4 text-sm sm:text-base text-text-secondary">
              OWOC {SEASON_LABEL} is open for partnership. Sponsors receive prominent placement, community recognition, and direct connections to passionate student builders.
            </p>
          </div>

          <div className="glass-card rounded-2xl border border-white/10 p-12 text-center max-w-xl mx-auto">
            <Handshake className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary font-semibold">No confirmed sponsors yet</p>
            <p className="text-xs text-text-muted mt-2">
              Sponsorship partnerships for OWOC {SEASON_LABEL} are being finalized.
            </p>
            <Link
              href="/sponsors"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright hover:bg-red-primary/20 transition-colors"
            >
              <span>View Partner Prospectus & Tiers →</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <span>Ecosystem Backers</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            Supported by Leading Tech Innovators
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-secondary">
            Our partners provide workshop resources, technical mentorship, and tooling support for student builders.
          </p>
        </div>

        {/* Alpha Tier */}
        {alphaSponsors.length > 0 && (
          <div className="mb-10">
            <div className="text-center mb-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-red-bright font-bold">
                Alpha Title Partners
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {alphaSponsors.map((sponsor) => (
                <a
                  key={sponsor.id}
                  href={sponsor.website || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card p-6 rounded-2xl flex items-center justify-between border border-red-primary/30 hover:border-red-bright shadow-red-glow-sm hover:shadow-red-glow transition-all group"
                >
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-red-bright transition-colors">
                      {sponsor.name}
                    </h3>
                    <p className="text-xs text-text-muted mt-1 max-w-xs">
                      {sponsor.description}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-2 group-hover:bg-red-primary/20 text-text-muted group-hover:text-red-bright transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Crimson & Community Tier */}
        {(crimsonSponsors.length > 0 || communitySponsors.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            {[...crimsonSponsors, ...communitySponsors].map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.website || "#"}
                target="_blank"
                rel="noreferrer"
                className="glass-card p-4 rounded-xl flex items-center justify-between border border-white/10 hover:border-red-primary/40 transition-colors group"
              >
                <div>
                  <span className="text-[10px] font-mono text-text-muted block">
                    {sponsor.tier}
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-red-bright transition-colors">
                    {sponsor.name}
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            href="/sponsors"
            className="text-xs font-mono text-text-muted hover:text-white transition-colors underline underline-offset-4"
          >
            Interested in sponsoring OWOC {SEASON_LABEL}? View Partner Prospectus & Tiers →
          </Link>
        </div>
      </div>
    </section>
  );
}
