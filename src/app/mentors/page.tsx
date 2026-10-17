import React from "react";
import Link from "next/link";
import { Users, ExternalLink, Code2, Award, Flame } from "lucide-react";
import { MOCK_PROJECTS } from "@/data/mockDatabase";

export const metadata = {
  title: "Mentors Directory — Omnikon Winter of Code",
  description:
    "Meet our seasoned technical mentors guiding contributors across AI/ML, Web3, Systems, Cloud, and Frontend tracks.",
};

export default function MentorsPage() {
  // Aggregate mentors from projects
  const mentorsList = [
    {
      name: "Dr. Aris Thorne",
      role: "AI Compiler Architect",
      company: "Omnikon Core Research",
      domain: "AI/ML & Systems",
      github: "aristhorne",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
      bio: "12+ years in compiler optimization, SIMD intrinsics, and neural runtimes. Ex-LLVM contributor.",
      project: "WinterVision Core",
      projectId: "proj-1",
    },
    {
      name: "Elena Rostova",
      role: "CUDA Optimization Lead",
      company: "Accelerated Compute Labs",
      domain: "High Performance Computing",
      github: "erostova",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
      bio: "Specializing in GPU kernel scheduling, memory coalescing, and PyTorch C++ extension bindings.",
      project: "WinterVision Core",
      projectId: "proj-1",
    },
    {
      name: "Kaelen Voss",
      role: "Protocol Engineer",
      company: "Solana Collective",
      domain: "Web3 & Distributed Ledgers",
      github: "kaelenvoss",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      bio: "Smart contract auditor and developer tooling lead for Rust and Anchor protocols on Solana.",
      project: "Solana WinterPay SDK",
      projectId: "proj-2",
    },
    {
      name: "Marcus Vance",
      role: "SRE & Infrastructure Architect",
      company: "CloudNative Labs",
      domain: "Cloud & DevOps",
      github: "marcusvance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
      bio: "Kubernetes SIG contributor, Wireguard mesh tinkerer, and eBPF routing specialist.",
      project: "Nexus DevOps Mesh",
      projectId: "proj-3",
    },
    {
      name: "Sarah Chen",
      role: "Frontend Architect",
      company: "Design Systems Guild",
      domain: "Full-Stack & Web Performance",
      github: "sarahchendev",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
      bio: "Passionate about WCAG AAA compliance, zero-runtime CSS shaders, and modern React 18+ concurrency.",
      project: "OmniUI Glass React",
      projectId: "proj-4",
    },
    {
      name: "Tariq Mansoor",
      role: "Security Researcher",
      company: "Web3 Security Council",
      domain: "Security & Program Analysis",
      github: "tariqsec",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200",
      bio: "Symbolic execution enthusiast. Dissecting EVM bytecode and constructing fuzzing engines with Z3.",
      project: "Sentinel Shield Threat Detector",
      projectId: "proj-5",
    },
    {
      name: "Priya Nair",
      role: "Mobile Engineering Lead",
      company: "OpenHealth Org",
      domain: "Mobile & Embedded",
      github: "priyanair",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
      bio: "Architecting 120fps fluid physics in React Native, Kotlin Multiplatform, and local SQLite synchronization.",
      project: "PulseFit Native",
      projectId: "proj-6",
    },
  ];

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-primary/10 border border-red-primary/30 text-xs font-mono text-red-bright uppercase mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Engineering Mentorship</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
            Meet the OWOC Mentors
          </h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            World-class engineers, open-source maintainers, and researchers guiding your pull requests and architectural decisions throughout the winter.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {mentorsList.map((mentor) => (
            <div
              key={mentor.name}
              className="glass-card p-6 rounded-2xl border border-white/10 hover:border-red-primary/50 group flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10 group-hover:border-red-bright transition-colors flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-2 text-red-bright border border-red-primary/30">
                      {mentor.domain}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-red-bright transition-colors mt-1.5">
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-text-muted">{mentor.role}</p>
                    <p className="text-[11px] font-mono text-text-secondary">
                      {mentor.company}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed mb-6">
                  {mentor.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <Link
                  href={`/projects/${mentor.projectId}`}
                  className="text-text-muted hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]"
                >
                  <Code2 className="w-3.5 h-3.5 text-red-bright" />
                  <span>{mentor.project}</span>
                </Link>

                <a
                  href={`https://github.com/${mentor.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-surface-2 text-text-secondary hover:text-white hover:bg-red-primary/10 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mentor CTA Banner */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-red-primary/40 text-center relative overflow-hidden shadow-red-glow">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Interested in Mentoring Future Engineers?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-text-secondary max-w-xl mx-auto">
            Share your expertise, review high-quality pull requests, and help shape the next generation of open-source creators.
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/mentor"
              className="px-6 py-3 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-bold shadow-red-glow transition-all inline-flex items-center gap-2"
            >
              <span>Access Mentor Workspace</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
