import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Download,
  Mail,
  Building2,
} from "lucide-react";
import { MOCK_SPONSORS } from "@/data/mockDatabase";

export const metadata = {
  title: "Sponsors & Partners — Omnikon Winter of Code",
  description:
    "Partner with OWOC to support 2,500+ student developers, create targeted bounty tracks, and connect with premier engineering talent.",
};

export default function SponsorsPage() {
  const tiersComparison = [
    {
      perk: "Logo placement on OWOC website & hero banner",
      alpha: true,
      crimson: true,
      community: true,
    },
    {
      perk: "Access to Opt-in Top 100 Contributor Resume Book",
      alpha: true,
      crimson: true,
      community: false,
    },
    {
      perk: "Branded track & dedicated bounty prize pool",
      alpha: true,
      crimson: true,
      community: false,
    },
    {
      perk: "Branding on official winter hoodies & swag kits",
      alpha: true,
      crimson: false,
      community: false,
    },
    {
      perk: "Exclusive keynote at the OWOC Grand Finale livestream",
      alpha: true,
      crimson: false,
      community: false,
    },
    {
      perk: "Logo printed on all verifiable digital certificates",
      alpha: true,
      crimson: true,
      community: false,
    },
  ];

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Partnerships</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Empower the Next Wave of Builders
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            By partnering with OWOC, leading tech organizations support public digital infrastructure while building direct connections with premier engineering talent.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-semibold shadow-red-glow transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Inquire About Partnership</span>
            </Link>
          </div>
        </div>

        {/* Current Sponsors Grid */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
              2024–25 Partner Ecosystem
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_SPONSORS.map((sponsor) => (
              <div
                key={sponsor.id}
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-red-primary/40 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-2 text-red-bright border border-red-primary/30">
                      {sponsor.tier}
                    </span>
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-text-muted hover:text-white"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white group-hover:text-red-bright transition-colors mb-2">
                    {sponsor.name}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">
                    {sponsor.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-text-muted">
                  <span>Official Ecosystem Partner</span>
                  <span className="text-red-bright font-bold">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsorship Tiers Comparison Table */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white">
              Sponsorship Tier Deliverables
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-text-secondary">
              Flexible options designed for tech enterprises, developer tooling platforms, and foundation grants.
            </p>
          </div>

          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-1/90 border-b border-white/10 text-text-muted font-mono uppercase">
                  <tr>
                    <th className="py-4 px-6">Benefits & Deliverables</th>
                    <th className="py-4 px-6 text-center text-red-bright font-bold">
                      Alpha Title
                    </th>
                    <th className="py-4 px-6 text-center text-white">
                      Crimson Tier
                    </th>
                    <th className="py-4 px-6 text-center text-text-secondary">
                      Community Supporter
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {tiersComparison.map((row) => (
                    <tr key={row.perk} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 text-white font-medium">
                        {row.perk}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.alpha ? (
                          <CheckCircle2 className="w-4 h-4 text-red-bright mx-auto" />
                        ) : (
                          <span className="text-text-muted">—</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.crimson ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400 mx-auto" />
                        ) : (
                          <span className="text-text-muted">—</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.community ? (
                          <CheckCircle2 className="w-4 h-4 text-text-muted mx-auto" />
                        ) : (
                          <span className="text-text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
