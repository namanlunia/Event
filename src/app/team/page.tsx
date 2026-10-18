import React from "react";
import Link from "next/link";
import { Users, Flame, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import { SEASON_LABEL } from "@/lib/season";
import { SITE_CONFIG } from "@/lib/site-config";
import { SampleBadge } from "@/components/visual/DemoModeBanner";
import AvatarDisplay from "@/components/visual/AvatarDisplay";

export const metadata = {
  title: `Organizing Team — ${SITE_CONFIG.ORG_NAME} Winter of Code ${SEASON_LABEL}`,
  description:
    `Meet the team and working council coordinating ${SITE_CONFIG.ORG_NAME} Winter of Code ${SEASON_LABEL}.`,
};

export default function TeamPage() {
  const isDemo = SITE_CONFIG.DEMO_MODE;

  const sampleDepartments = [
    {
      name: "Sample Executive Council",
      members: [
        {
          name: "Sample Program Lead",
          role: "Program Director & Lead Architect",
          bio: "Open source contributor and systems researcher coordinating program operations.",
          github: "owoc-lead",
        },
        {
          name: "Sample Review Chair",
          role: "Technical Evaluation Board Chair",
          bio: "Systems architect and open-source project maintainer.",
          github: "owoc-eval",
        },
      ],
    },
    {
      name: "Sample Track Leads",
      members: [
        {
          name: "Sample Frontend Lead",
          role: "Frontend & Design Systems Track Lead",
          bio: "UI engineer focusing on web accessibility and responsive components.",
          github: "owoc-frontend",
        },
        {
          name: "Sample Systems Lead",
          role: "Cloud & Infrastructure Operations",
          bio: "DevOps engineer maintaining staging pipelines and automated CI checks.",
          github: "owoc-devops",
        },
      ],
    },
  ];

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>The Team Behind OWOC</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Organizing Council
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            The community volunteers, project mentors, and coordinators helping guide the inaugural edition of Omnikon Winter of Code.
          </p>
        </div>

        {isDemo ? (
          <div className="space-y-16">
            {sampleDepartments.map((dept) => (
              <div key={dept.name} className="space-y-8">
                <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                  <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
                    {dept.name}
                  </h2>
                  <SampleBadge />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dept.members.map((member) => (
                    <div
                      key={member.name}
                      className="glass-card p-6 rounded-2xl border border-white/10 hover:border-red-primary/40 group flex flex-col justify-between relative"
                    >
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <AvatarDisplay name={member.name} size="lg" />
                          <div>
                            <h3 className="font-heading font-bold text-base text-white group-hover:text-red-bright transition-colors">
                              {member.name}
                            </h3>
                            <p className="text-xs font-mono text-red-bright/90">
                              {member.role}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-text-secondary leading-relaxed mb-4">
                          {member.bio}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-text-muted font-mono">
                        <span>@{member.github}</span>
                        <span className="text-[10px] text-text-muted">Sample Profile</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 text-center space-y-6 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-surface-2 border border-red-primary/30 text-red-bright flex items-center justify-center mx-auto shadow-red-glow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="space-y-3">
                <h2 className="font-heading font-bold text-2xl text-white">
                  Inaugural Council Onboarding
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed max-w-xl mx-auto">
                  OWOC is launching its inaugural season ({SEASON_LABEL}). Track leads, review chairs, and working group volunteers are actively being formed.
                </p>
                <p className="text-xs text-text-muted leading-relaxed max-w-lg mx-auto">
                  Council members and track directors will be listed here as official volunteer appointments are finalized prior to the contributor orientation phase.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-primary to-red-bright hover:shadow-red-glow text-white text-xs font-bold transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Join the Working Council</span>
                </Link>
                <Link
                  href="/mentors"
                  className="px-6 py-3 rounded-xl bg-surface-2 border border-white/10 hover:border-white/20 text-white text-xs font-semibold transition-all flex items-center gap-2"
                >
                  <span>Apply as Mentor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass-card p-5 rounded-2xl border border-white/5 text-center">
                <div className="font-heading font-bold text-sm text-white mb-1">
                  Technical Review Board
                </div>
                <p className="text-xs text-text-muted">
                  Vetting repository submissions and evaluating complex pull requests.
                </p>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-white/5 text-center">
                <div className="font-heading font-bold text-sm text-white mb-1">
                  Track Mentorship Chairs
                </div>
                <p className="text-xs text-text-muted">
                  Supporting project maintainers and guiding student contributors.
                </p>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-white/5 text-center">
                <div className="font-heading font-bold text-sm text-white mb-1">
                  Campus Relations Team
                </div>
                <p className="text-xs text-text-muted">
                  Coordinating university outreach and campus ambassador chapters.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
