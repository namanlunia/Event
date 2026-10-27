"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Mail,
  Building2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { getConfirmedSponsors } from "@/lib/dataService";
import { SITE_CONFIG } from "@/lib/site-config";
import { SampleBadge } from "@/components/visual/DemoModeBanner";
import { SEASON_LABEL } from "@/lib/season";

export default function SponsorsPage() {
  const sponsors = getConfirmedSponsors();
  const isDemoMode = SITE_CONFIG.DEMO_MODE;

  const sponsorshipTiers = [
    {
      tier: "Community Supporter",
      description: "Support open source student development and infrastructure.",
      perks: [
        "Company logo and link on OWOC official website",
        "Recognition in community communications",
        "Public appreciation post across social channels",
      ],
      color: "border-white/10",
    },
    {
      tier: "Track Partner",
      description: "Directly sponsor a dedicated technology track or domain.",
      perks: [
        "Branded domain or track designation (e.g. AI/ML or Web3 Track)",
        "Featured sponsor logo across project directories",
        "Logo on official participant certificates for track completions",
        "Direct engagement with track contributors via community channels",
      ],
      color: "border-red-primary/40 shadow-red-glow-sm",
    },
    {
      tier: "Premier Partner",
      description: "Anchor the winter season and mentor premier student engineering talent.",
      perks: [
        "Prominent headline logo placement on hero and all pages",
        "Keynote presentation during community kick-off and closing sessions",
        "Dedicated mentor office hours and workshops",
        "Opt-in contributor connection opportunities",
      ],
      color: "border-red-bright shadow-red-glow",
    },
  ];

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Partnership & Sponsorship</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Partner with OWOC {SEASON_LABEL}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            Support the inaugural edition of Omnikon Winter of Code. Help provide free, high-impact open-source mentorship to passionate student builders.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${SITE_CONFIG.CONTACT_EMAIL}?subject=OWOC%20Sponsorship%20Inquiry`}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white text-xs font-bold shadow-red-glow transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Organizers ({SITE_CONFIG.CONTACT_EMAIL})</span>
            </a>
          </div>
        </div>

        {/* Sponsorship Tiers Structure */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white">
              Sponsorship Packages
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-text-secondary">
              Transparent partnership tiers designed to empower student engineers and highlight open-source tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sponsorshipTiers.map((pkg) => (
              <div
                key={pkg.tier}
                className={`glass-card p-6 sm:p-8 rounded-2xl border flex flex-col justify-between group transition-all ${pkg.color}`}
              >
                <div>
                  <h3 className="font-heading font-bold text-xl text-white mb-2">
                    {pkg.tier}
                  </h3>
                  <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <span className="text-[11px] font-mono uppercase text-text-muted tracking-wider block">
                      Included Deliverables:
                    </span>
                    <ul className="space-y-2.5 text-xs text-text-secondary">
                      {pkg.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-bright flex-shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <a
                    href={`mailto:${SITE_CONFIG.CONTACT_EMAIL}?subject=Inquiry%20for%20${encodeURIComponent(pkg.tier)}`}
                    className="w-full py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 hover:border-red-primary/40 text-xs font-mono text-white text-center block transition-all"
                  >
                    Inquire for {pkg.tier}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmed Sponsors or Honest Invitation */}
        {sponsors.length > 0 ? (
          <div className="mb-16">
            <div className="text-center mb-8">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                Confirmed Sponsors & Partners
              </span>
              {isDemoMode && <div className="mt-2"><SampleBadge /></div>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="glass-card p-6 rounded-2xl border border-white/10 hover:border-red-primary/40 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-surface-2 text-red-bright border border-red-primary/30">
                        {sponsor.tier}
                      </span>
                      {isDemoMode && <SampleBadge />}
                    </div>

                    <h3 className="font-heading font-bold text-xl text-white group-hover:text-red-bright transition-colors mb-2">
                      {sponsor.name}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4">
                      {sponsor.description}
                    </p>
                  </div>

                  {sponsor.website ? (
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-red-bright hover:underline flex items-center gap-1.5 pt-4 border-t border-white/5"
                    >
                      <span>Visit Partner Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div
                      title="Sample partner (not a real link)"
                      className="text-xs font-mono text-text-muted flex items-center justify-between pt-4 border-t border-white/5"
                    >
                      <span>Sample partner</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-surface-2 text-text-muted">Not active</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Honest Empty State */
          <div className="glass-card p-10 sm:p-14 rounded-3xl border border-white/10 text-center max-w-2xl mx-auto shadow-2xl mb-16">
            <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-red-primary/30 flex items-center justify-center mx-auto mb-6 shadow-red-glow-sm">
              <Building2 className="w-8 h-8 text-red-bright" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-white mb-3">
              Become a Founding Sponsor
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-lg mx-auto">
              OWOC {SEASON_LABEL} is currently onboarding its founding ecosystem sponsors. Partner with us to empower developers, showcase developer tooling, and support open-source public goods.
            </p>
            <a
              href={`mailto:${SITE_CONFIG.CONTACT_EMAIL}?subject=Founding%20Sponsor%20Inquiry`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-primary to-red-bright text-white text-xs font-bold shadow-red-glow hover:shadow-red-glow-lg transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Inquire via Email</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
