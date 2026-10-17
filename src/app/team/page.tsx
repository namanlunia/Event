import React from "react";
import { Users, Flame } from "lucide-react";

export const metadata = {
  title: "Organizing Team — Omnikon Winter of Code",
  description:
    "Meet the passionate developers, community architects, and coordinators behind Omnikon Winter of Code 2024–25.",
};

export default function TeamPage() {
  const departments = [
    {
      name: "Executive Council & Leadership",
      members: [
        {
          name: "Devansh Rastogi",
          role: "Program Director & Lead Architect",
          bio: "Founding member of Omnikon Foundation, ex-GSoC mentor, and distributed systems researcher.",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
          github: "devanshrastogi",
        },
        {
          name: "Dr. Aris Thorne",
          role: "Technical Evaluation Board Chair",
          bio: "Author of high-speed neural compiler runtimes and open-source systems contributor.",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
          github: "aristhorne",
        },
      ],
    },
    {
      name: "Track Leads & Mentorship Directors",
      members: [
        {
          name: "Sarah Chen",
          role: "Frontend & Design Systems Lead",
          bio: "Web standards advocate focusing on fluid physics and modern accessible UI primitives.",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
          github: "sarahchendev",
        },
        {
          name: "Marcus Vance",
          role: "Cloud & Infrastructure Operations",
          bio: "SRE maintaining ephemeral staging meshes and automated CI review runners for OWOC.",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
          github: "marcusvance",
        },
        {
          name: "Tariq Mansoor",
          role: "Security & Smart Contracts Track Lead",
          bio: "Auditor specializing in zero-knowledge verifiers and symbolic EVM execution.",
          avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200",
          github: "tariqsec",
        },
      ],
    },
    {
      name: "Community & Campus Ambassadors Council",
      members: [
        {
          name: "Tanya Kapoor",
          role: "Campus Relations Director",
          bio: "Coordinating 350+ campus leaders and organizing nationwide student developer meetups.",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
          github: "tanyakapoor",
        },
        {
          name: "Kabir Sen",
          role: "Community Growth & Student Outreach",
          bio: "Leading Discord workrooms, peer helpdesks, and newcomer onboarding hack nights.",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200",
          github: "kabirsen",
        },
      ],
    },
  ];

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>The People Behind OWOC</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Organizing Council
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            The dedicated team of engineers, mentors, and community leads volunteering to make Omnikon Winter of Code a premier developer experience.
          </p>
        </div>

        {/* Department Sections */}
        <div className="space-y-16">
          {departments.map((dept) => (
            <div key={dept.name} className="space-y-8">
              <div className="border-b border-white/10 pb-4">
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  {dept.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dept.members.map((member) => (
                  <div
                    key={member.name}
                    className="glass-card p-6 rounded-2xl border border-white/10 hover:border-red-primary/40 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10 group-hover:border-red-bright transition-colors flex-shrink-0"
                        />
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
                      <a
                        href={`https://github.com/${member.github}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-text-secondary hover:text-white"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
