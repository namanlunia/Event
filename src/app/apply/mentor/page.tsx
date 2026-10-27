"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, CheckCircle2, ArrowRight, Award } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { SEASON_LABEL, EVENT_MONTH_LABEL } from "@/lib/season";

export default function ApplyMentorPage() {
  const { addMentorApplication } = useAppStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState("");
  const [weeklyHours, setWeeklyHours] = useState(4);
  const [preferredProjects, setPreferredProjects] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !githubUsername || !bio || !expertise) {
      setError("Please complete all required fields.");
      return;
    }

    setError(null);
    addMentorApplication({
      full_name: fullName.trim(),
      email: email.trim(),
      github_username: githubUsername.replace("@", "").trim(),
      linkedin_url: linkedinUrl.trim(),
      bio: bio.trim(),
      expertise_domains: expertise.split(",").map((s) => s.trim()).filter(Boolean),
      weekly_availability_hours: weeklyHours,
      preferred_projects: preferredProjects.trim(),
    });

    setSubmitted(true);
    showToast("Mentor application submitted successfully! Logged to review queue.");
  };

  return (
    <div className="relative pt-32 pb-24 min-h-screen flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-red-primary/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-xl w-full glass-card p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-primary to-red-deep p-[1px] shadow-red-glow-sm">
              <div className="w-full h-full bg-[#0B0B0D] rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-red-bright" />
              </div>
            </div>
            <span className="font-heading font-black text-xl text-white">OWOC {SEASON_LABEL}</span>
          </Link>
          <h1 className="font-heading font-bold text-2xl text-white">
            Apply as Technical Mentor
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Guide student developers, conduct PR reviews, and shape open-source talent during {EVENT_MONTH_LABEL}.
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4 py-8">
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto text-green-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">
              Application Received!
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed max-w-sm mx-auto">
              Thank you, <strong className="text-white">{fullName}</strong>. Your mentor application has been logged and is awaiting organizer review.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Link
                href="/dashboard/mentor"
                className="px-5 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-mono font-bold"
              >
                Go to Mentor Hub
              </Link>
              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-1 text-text-secondary hover:text-white border border-white/10 text-xs font-mono"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            {error && (
              <div className="p-3 rounded-xl bg-red-primary/10 border border-red-primary/30 text-red-bright text-xs">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-white block">Full Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white block">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@company.com"
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-white block">GitHub Profile *</label>
                <input
                  type="text"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="e.g. erostova"
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white block">LinkedIn / Portfolio URL</label>
                <input
                  type="text"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-white block">Technical Expertise & Languages *</label>
              <input
                type="text"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                placeholder="Rust, CUDA, PyTorch, Go, Distributed Systems"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-white block">Weekly Availability</label>
                <select
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(parseInt(e.target.value) || 4)}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                >
                  <option value={2}>2 - 3 hours / week</option>
                  <option value={4}>4 - 5 hours / week (Recommended)</option>
                  <option value={8}>6 - 8 hours / week</option>
                  <option value={10}>10+ hours / week</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-white block">Preferred Repository / Topic</label>
                <input
                  type="text"
                  value={preferredProjects}
                  onChange={(e) => setPreferredProjects(e.target.value)}
                  placeholder="e.g. WinterVision Core or AI track"
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-white block">Technical Bio & Mentorship Experience *</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Share your background, open source contributions, or experience reviewing code..."
                className="w-full px-3 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-red-primary hover:bg-red-bright text-white font-mono font-bold text-xs transition-all shadow-red-glow-sm flex items-center justify-center gap-2 mt-4"
            >
              <span>Submit Mentor Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#15151B] border border-red-primary/40 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-mono text-xs animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
