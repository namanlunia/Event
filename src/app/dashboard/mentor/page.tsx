"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Users,
  GitPullRequest,
  CheckCircle2,
  ExternalLink,
  Award,
  Sparkles,
  MessageSquare,
  Clock,
  Flame,
  Calendar,
  Lock,
  Star,
  AlertTriangle,
  BookOpen,
  Plus,
  Send,
  Video,
  FileText,
  Check,
  ChevronRight,
  TrendingUp,
  X,
} from "lucide-react";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAppStore } from "@/lib/store";
import { SITE_CONFIG } from "@/lib/site-config";
import { SampleBadge } from "@/components/visual/DemoModeBanner";
import AvatarDisplay from "@/components/visual/AvatarDisplay";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import StatusBadge from "@/components/ui/status-badge";
import { PHASES, EVENT_END, formatDateRange } from "@/lib/season";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function MentorDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-neutral-400">Loading mentor dashboard...</div>}>
      <RoleGuard allowedRoles={["mentor", "super_admin"]}>
        <MentorDashboardContent />
      </RoleGuard>
    </Suspense>
  );
}

function MentorDashboardContent() {
  const {
    pullRequests,
    reviewPR,
    mergePR,
    currentPersona,
    projects,
    officeHours,
    addOfficeHoursSession,
    mentorFeedback,
    addMentorFeedback,
    pointsRules,
  } = useAppStore();

  const isDemo = SITE_CONFIG.DEMO_MODE;
  const router = useRouter();
  const searchParams = useSearchParams();

  type MentorTab = "overview" | "mentees" | "reviews" | "office-hours" | "feedback" | "resources" | "guide";
  const [activeTab, setActiveTab] = useState<MentorTab>("overview");

  useEffect(() => {
    const tabParam = searchParams?.get("tab") as MentorTab | null;
    if (tabParam && ["overview", "mentees", "reviews", "office-hours", "feedback", "resources", "guide"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (newTab: MentorTab) => {
    setActiveTab(newTab);
    router.push(`/dashboard/mentor?tab=${newTab}`, { scroll: false });
  };

  // Inactivity threshold (configurable N days, default 3)
  const [inactivityDaysThreshold, setInactivityDaysThreshold] = useState(3);

  // Review Modal State
  const [selectedPRId, setSelectedPRId] = useState<string | null>(null);
  const selectedPR = pullRequests.find((pr) => pr.id === selectedPRId);
  const [reviewScore, setReviewScore] = useState<number>(5);
  const [reviewNotes, setReviewNotes] = useState("");

  // Office Hours Form State
  const [showAddOfficeHours, setShowAddOfficeHours] = useState(false);
  const [ohTitle, setOhTitle] = useState("");
  const [ohDate, setOhDate] = useState("2026-12-05");
  const [ohStartTime, setOhStartTime] = useState("18:00");
  const [ohEndTime, setOhEndTime] = useState("19:00");
  const [ohMeetingUrl, setOhMeetingUrl] = useState("https://meet.google.com/owoc-mentor-sync");
  const [ohMaxAttendees, setOhMaxAttendees] = useState(15);

  // Feedback Form State
  const [feedbackContributor, setFeedbackContributor] = useState("Aarav Patel");
  const [feedbackIsPrivate, setFeedbackIsPrivate] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState("");

  // Resource sharing state
  const [resources, setResources] = useState([
    {
      id: "res-1",
      title: "Rust SIMD & Zero-Copy Optimization Handbook",
      url: "https://doc.rust-lang.org/nomicon/",
      desc: "Comprehensive guidelines on cache line alignments, raw pointers, and SIMD intrinsics.",
      category: "Guide",
    },
    {
      id: "res-2",
      title: "Web3 State Channel Architecture",
      url: "/rules",
      desc: "Reference implementation for sub-second payment settlement pipelines.",
      category: "Architecture",
    },
    {
      id: "res-3",
      title: "OWOC 2026 Code Review Checklist",
      url: "/rules",
      desc: "Evaluation rubric covering tests, benchmarking, error typing, and documentation.",
      category: "Rubric",
    },
  ]);
  const [newResTitle, setNewResTitle] = useState("");
  const [newResUrl, setNewResUrl] = useState("");
  const [newResDesc, setNewResDesc] = useState("");
  const [showAddResource, setShowAddResource] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Mentees dataset
  const mentees = isDemo
    ? [
        {
          id: "m-1",
          name: "Aarav Patel",
          github: "aaravp-dev",
          project: "WinterVision Core",
          prsCount: 3,
          points: 280,
          lastActivityDate: "2026-10-17",
          daysInactive: 1,
        },
        {
          id: "m-2",
          name: "Zara Chen",
          github: "zarachen-web3",
          project: "OpenPay Web3 SDK",
          prsCount: 2,
          points: 150,
          lastActivityDate: "2026-10-12",
          daysInactive: 6, // Exceeds threshold!
        },
        {
          id: "m-3",
          name: "Devon Miller",
          github: "dmiller-sys",
          project: "WinterVision Core",
          prsCount: 1,
          points: 50,
          lastActivityDate: "2026-10-16",
          daysInactive: 2,
        },
      ]
    : [];

  const pendingPRs = pullRequests.filter((pr) => pr.status === "pending");
  const mergedPRs = pullRequests.filter((pr) => pr.status === "merged");

  // Mentee progress chart
  const menteeVelocityData = isDemo
    ? [
        { week: "Week 1", reviews: 4, pointsGiven: 120 },
        { week: "Week 2", reviews: 7, pointsGiven: 240 },
        { week: "Week 3", reviews: 11, pointsGiven: 410 },
        { week: "Week 4", reviews: 14, pointsGiven: 600 },
      ]
    : [
        { week: "Week 1", reviews: 0, pointsGiven: 0 },
        { week: "Week 2", reviews: 0, pointsGiven: 0 },
        { week: "Week 3", reviews: 0, pointsGiven: 0 },
        { week: "Week 4", reviews: 0, pointsGiven: 0 },
      ];

  const handleReviewSubmit = (verdict: "approved" | "rejected") => {
    if (!selectedPR) return;
    reviewPR(selectedPR.id, verdict, reviewNotes || `Review completed with quality rating: ${reviewScore}/5.`, reviewScore);
    if (verdict === "approved") {
      mergePR(selectedPR.id, reviewScore);
      showToast(`PR #${selectedPR.pr_number} approved and merged with +${reviewScore} quality bonus!`);
    } else {
      showToast(`Changes requested for PR #${selectedPR.pr_number}.`);
    }
    setSelectedPRId(null);
    setReviewNotes("");
  };

  const handleCreateOfficeHours = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ohTitle || !ohMeetingUrl) return;

    addOfficeHoursSession({
      mentor_id: currentPersona.email,
      mentor_name: currentPersona.name,
      title: ohTitle,
      session_date: ohDate,
      start_time: ohStartTime,
      end_time: ohEndTime,
      meeting_url: ohMeetingUrl,
      max_attendees: ohMaxAttendees,
    });

    setShowAddOfficeHours(false);
    setOhTitle("");
    showToast("Office hours session scheduled!");
  };

  const handleCreateFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText) return;

    addMentorFeedback({
      mentor_id: currentPersona.email,
      mentor_name: currentPersona.name,
      contributor_id: "c-1",
      contributor_name: feedbackContributor,
      is_private: feedbackIsPrivate,
      feedback_text: feedbackText,
      quality_rating: feedbackRating,
    });

    setFeedbackText("");
    showToast(feedbackIsPrivate ? "Private mentor note logged." : "Constructive feedback sent to contributor!");
  };

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResTitle || !newResUrl) return;

    setResources([
      ...resources,
      {
        id: `res-${Date.now()}`,
        title: newResTitle,
        url: newResUrl,
        desc: newResDesc || "Engineering resource shared by mentor.",
        category: "Shared",
      },
    ]);

    setShowAddResource(false);
    setNewResTitle("");
    setNewResUrl("");
    setNewResDesc("");
    showToast("Resource shared with mentees!");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-surface-1 border border-red-primary/40 text-white text-xs font-mono flex items-center gap-3 shadow-2xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-red-bright flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-primary/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <AvatarDisplay name={currentPersona?.name || "Mentor"} size="lg" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-red-bright uppercase font-bold tracking-wider">
                TECHNICAL MENTOR WORKSPACE
              </span>
              {isDemo && <SampleBadge />}
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              {currentPersona?.name || "Technical Mentor"}
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Guiding student builders, conducting code reviews, and scoring pull request quality.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => setActiveTab("reviews")}
            className="px-4 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-bold transition-all shadow-red-glow-sm flex items-center gap-2"
          >
            <GitPullRequest className="w-4 h-4" />
            <span>Review Queue ({pendingPRs.length})</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-white/10 gap-2 overflow-x-auto pb-1 text-xs font-mono">
        <button
          onClick={() => handleTabChange("overview")}
          className={`px-4 py-2.5 rounded-t-xl transition-colors font-bold whitespace-nowrap flex items-center gap-2 ${
            activeTab === "overview"
              ? "bg-surface-1 border-t-2 border-red-bright text-white"
              : "text-text-muted hover:text-white"
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => handleTabChange("mentees")}
          className={`px-4 py-2.5 rounded-t-xl transition-colors font-bold whitespace-nowrap flex items-center gap-2 ${
            activeTab === "mentees"
              ? "bg-surface-1 border-t-2 border-red-bright text-white"
              : "text-text-muted hover:text-white"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>My Projects & Mentees ({mentees.length})</span>
        </button>

        <button
          onClick={() => handleTabChange("reviews")}
          className={`px-4 py-2.5 rounded-t-xl transition-colors font-bold whitespace-nowrap flex items-center gap-2 ${
            activeTab === "reviews"
              ? "bg-surface-1 border-t-2 border-red-bright text-white"
              : "text-text-muted hover:text-white"
          }`}
        >
          <GitPullRequest className="w-3.5 h-3.5" />
          <span>Review Queue ({pendingPRs.length})</span>
        </button>

        <button
          onClick={() => handleTabChange("office-hours")}
          className={`px-4 py-2.5 rounded-t-xl transition-colors font-bold whitespace-nowrap flex items-center gap-2 ${
            activeTab === "office-hours"
              ? "bg-surface-1 border-t-2 border-red-bright text-white"
              : "text-text-muted hover:text-white"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Office Hours ({officeHours.length})</span>
        </button>

        <button
          onClick={() => handleTabChange("feedback")}
          className={`px-4 py-2.5 rounded-t-xl transition-colors font-bold whitespace-nowrap flex items-center gap-2 ${
            activeTab === "feedback"
              ? "bg-surface-1 border-t-2 border-red-bright text-white"
              : "text-text-muted hover:text-white"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Feedback & Guidance</span>
        </button>

        <button
          onClick={() => handleTabChange("resources")}
          className={`px-4 py-2.5 rounded-t-xl transition-colors font-bold whitespace-nowrap flex items-center gap-2 ${
            activeTab === "resources"
              ? "bg-surface-1 border-t-2 border-red-bright text-white"
              : "text-text-muted hover:text-white"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Shared Resources ({resources.length})</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Stat Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-text-muted text-[11px] font-mono mb-2">
                <span>ASSIGNED REPOS</span>
                <BookOpen className="w-4 h-4 text-red-bright" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                <AnimatedCounter to={projects.length} />
              </div>
              <div className="text-[10px] text-text-muted mt-1">WinterVision Core, OpenPay SDK</div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-text-muted text-[11px] font-mono mb-2">
                <span>ACTIVE MENTEES</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                <AnimatedCounter to={mentees.length} />
              </div>
              <div className="text-[10px] text-text-muted mt-1">
                {mentees.filter((m) => m.daysInactive > inactivityDaysThreshold).length} inactive flagged
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-text-muted text-[11px] font-mono mb-2">
                <span>PRS AWAITING REVIEW</span>
                <GitPullRequest className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                <AnimatedCounter to={pendingPRs.length} />
              </div>
              <div className="text-[10px] text-text-muted mt-1">Quality score bonus ready</div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-text-muted text-[11px] font-mono mb-2">
                <span>AVG REVIEW TURNAROUND</span>
                <Clock className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                14.2h
              </div>
              <div className="text-[10px] text-text-muted mt-1">Goal: under 24 hours</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Mentee Velocity Chart */}
            <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">Mentee Review Velocity</h3>
                  <p className="text-xs text-text-secondary">
                    Weekly PR review throughput and quality bonus points awarded.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-red-bright font-bold uppercase px-2 py-0.5 rounded bg-red-primary/10 border border-red-primary/30">
                  December 2026
                </span>
              </div>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={menteeVelocityData} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="mentorGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="week" stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
                    <YAxis width={40} stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
                    <Tooltip
                      allowEscapeViewBox={{ x: false, y: false }}
                      wrapperStyle={{ zIndex: 50, outline: "none" }}
                      contentStyle={{
                        backgroundColor: "#0B0B0D",
                        borderColor: "rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="pointsGiven"
                      name="Points Awarded"
                      stroke="#EF4444"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#mentorGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Mentor Certificate Status Card (Locked until Event End) */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-text-muted font-bold tracking-wider">
                    CREDENTIAL VERIFICATION
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-2 border border-white/10 text-text-muted text-[10px] font-mono flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-400" />
                    <span>Locked</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-surface-1 border border-white/5 space-y-2 text-center">
                  <div className="w-12 h-12 rounded-xl bg-surface-2 border border-white/10 flex items-center justify-center mx-auto text-text-muted">
                    <Lock className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="font-heading font-bold text-white text-sm">
                    Mentor Certificate of Honor
                  </h4>
                  <p className="text-[11px] text-text-secondary leading-snug">
                    Issued to verified technical mentors upon completion of the OWOC 2026 season on{" "}
                    <strong className="text-white">December 31, 2026</strong>.
                  </p>
                </div>

                <div className="space-y-1.5 text-xs font-mono text-text-muted">
                  <div className="flex justify-between items-center">
                    <span>PR Reviews Completed:</span>
                    <span className="text-white font-bold">{mergedPRs.length} / 3 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Office Hours Held:</span>
                    <span className="text-white font-bold">{officeHours.length} / 1 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Unlocks On:</span>
                    <span className="text-red-bright font-bold">Dec 31, 2026</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-text-muted text-center">
                Organizers issue certificates during Phase 5 evaluation.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY PROJECTS & MENTEES */}
      {activeTab === "mentees" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-heading font-bold text-xl text-white">Assigned Mentees</h2>
              <p className="text-xs text-text-secondary">
                Contributors building under your mentorship track. Monitor streaks and flag inactivity.
              </p>
            </div>

            {/* Inactivity Threshold Control */}
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <span>Inactive flag threshold:</span>
              <select
                value={inactivityDaysThreshold}
                onChange={(e) => setInactivityDaysThreshold(parseInt(e.target.value) || 3)}
                className="px-2.5 py-1 rounded-lg bg-surface-1 border border-white/10 text-white"
              >
                <option value={2}>2 days</option>
                <option value={3}>3 days (default)</option>
                <option value={5}>5 days</option>
                <option value={7}>7 days</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {mentees.length === 0 ? (
              <div className="glass-card p-12 rounded-3xl border border-white/10 text-center text-xs text-text-muted">
                No mentees assigned yet.
              </div>
            ) : (
              mentees.map((mentee) => {
                const isInactive = mentee.daysInactive > inactivityDaysThreshold;
                return (
                  <div
                    key={mentee.id}
                    className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs transition-colors ${
                      isInactive
                        ? "bg-amber-500/5 border-amber-500/30"
                        : "bg-surface-1 border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <AvatarDisplay name={mentee.name} size="md" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-white text-sm">
                            {mentee.name}
                          </span>
                          <a
                            href={`https://github.com/${mentee.github}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-mono text-red-bright hover:underline"
                          >
                            @{mentee.github}
                          </a>
                          {isInactive && (
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono flex items-center gap-1 font-bold">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Inactive {mentee.daysInactive}d</span>
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-text-muted mt-1">
                          Project: <span className="text-white">{mentee.project}</span> · Last active: {mentee.lastActivityDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 font-mono">
                      <div className="text-right">
                        <span className="text-red-bright font-bold text-sm">{mentee.points} pts</span>
                        <span className="text-text-muted block text-[10px]">{mentee.prsCount} PRs merged</span>
                      </div>

                      <button
                        onClick={() => {
                          showToast(`Sent encouragement check-in to ${mentee.name}!`);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-1 text-white text-xs border border-white/10 font-mono transition-colors"
                      >
                        Nudge / Check-in
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 3: PR REVIEW QUEUE WITH QUALITY SCORE */}
      {activeTab === "reviews" && (
        <div className="space-y-4">
          <div>
            <h2 className="font-heading font-bold text-xl text-white">PR Review Queue</h2>
            <p className="text-xs text-text-secondary">
              Review code changes, verify test coverage, and award quality multiplier points.
            </p>
          </div>

          <div className="space-y-3">
            {pendingPRs.length === 0 ? (
              <div className="glass-card p-12 rounded-3xl border border-white/10 text-center text-xs text-text-muted">
                Review queue is completely clear! No pull requests pending.
              </div>
            ) : (
              pendingPRs.map((pr) => (
                <div
                  key={pr.id}
                  className="p-5 rounded-2xl bg-surface-1 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-red-bright font-bold">#{pr.pr_number}</span>
                      <span className="font-heading font-bold text-white text-sm">{pr.title}</span>
                      <StatusBadge status={pr.status} size="sm" />
                    </div>
                    <div className="text-text-muted font-mono text-[11px] mt-1 flex items-center gap-3">
                      <span>By {pr.contributor_name}</span>
                      <span>Difficulty: {pr.difficulty}</span>
                      <span>Target: {pr.project_name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedPRId(pr.id)}
                      className="px-4 py-2 rounded-xl bg-red-primary hover:bg-red-bright text-white font-mono font-bold text-xs shadow-red-glow-sm flex items-center gap-1.5"
                    >
                      <Star className="w-3.5 h-3.5" />
                      <span>Review & Grade</span>
                    </button>
                    {pr.pr_url ? (
                      <a
                        href={pr.pr_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-surface-2 text-text-muted hover:text-white border border-white/5"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <span
                        title="Sample pull request (not a real link)"
                        className="p-2 rounded-xl bg-surface-2 text-text-muted/60 border border-white/5 cursor-not-allowed"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 4: OFFICE HOURS SCHEDULING */}
      {activeTab === "office-hours" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-xl text-white">Mentor Office Hours</h2>
              <p className="text-xs text-text-secondary">
                Schedule Q&A clinics and 1-on-1 architecture syncs visible on the project page.
              </p>
            </div>
            <button
              onClick={() => setShowAddOfficeHours(true)}
              className="px-4 py-2 rounded-xl bg-red-primary text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-red-glow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Session</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {officeHours.map((oh) => (
              <div key={oh.id} className="p-6 rounded-2xl bg-surface-1 border border-white/10 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-red-bright uppercase font-bold tracking-wider">
                      {oh.session_date} · {oh.start_time} - {oh.end_time} UTC
                    </span>
                    <h3 className="font-heading font-bold text-base text-white mt-0.5">{oh.title}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-surface-2 text-xs font-mono text-text-muted">
                    {oh.booked_count} / {oh.max_attendees} slots
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-mono">
                  <span className="text-text-muted">Host: {oh.mentor_name}</span>
                  <a
                    href={oh.meeting_url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-red-primary/10 hover:bg-red-primary/20 text-red-bright border border-red-primary/30 flex items-center gap-1.5 transition-colors"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Meeting</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FEEDBACK & NOTES */}
      {activeTab === "feedback" && (
        <div className="space-y-6 max-w-2xl">
          <div>
            <h2 className="font-heading font-bold text-xl text-white">Contributor Feedback & Notes</h2>
            <p className="text-xs text-text-secondary">
              Record private evaluation notes or post constructive public praise visible on contributor profiles.
            </p>
          </div>

          <form onSubmit={handleCreateFeedback} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-white font-bold block">Contributor</label>
              <select
                value={feedbackContributor}
                onChange={(e) => setFeedbackContributor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white"
              >
                {mentees.map((m) => (
                  <option key={m.name} value={m.name}>
                    {m.name} (@{m.github})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-white font-bold block">Quality Rating (1 to 5 Stars)</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFeedbackRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= feedbackRating ? "fill-amber-400 text-amber-400" : "text-zinc-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-white font-bold block">Feedback / Evaluation Notes</label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={4}
                placeholder="Detail technical strengths, code architecture choices, and areas for improvement..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPrivateNote"
                checked={feedbackIsPrivate}
                onChange={(e) => setFeedbackIsPrivate(e.target.checked)}
                className="rounded accent-red-primary"
              />
              <label htmlFor="isPrivateNote" className="text-text-muted cursor-pointer">
                Keep as <strong>Private Mentor Note</strong> (hidden from contributor, visible to organizers)
              </label>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-mono font-bold flex items-center gap-2 shadow-red-glow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Record Feedback</span>
            </button>
          </form>

          {/* Feedback Log */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-white">Recent Feedback Log</h3>
            {mentorFeedback.map((mf) => (
              <div key={mf.id} className="p-4 rounded-2xl bg-surface-1 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{mf.contributor_name}</span>
                    {mf.is_private ? (
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-text-muted">
                        Private Note
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/30 text-[10px] font-mono">
                        Public Praise
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{mf.quality_rating}/5</span>
                  </div>
                </div>
                <p className="text-text-secondary">{mf.feedback_text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SHARED RESOURCES */}
      {activeTab === "resources" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-xl text-white">Curated Resources</h2>
              <p className="text-xs text-text-secondary">
                Documentation links, API specs, and design guidelines shared with all mentees.
              </p>
            </div>
            <button
              onClick={() => setShowAddResource(true)}
              className="px-4 py-2 rounded-xl bg-red-primary text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-red-glow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Share Resource</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resources.map((res) => (
              <div key={res.id} className="p-5 rounded-2xl bg-surface-1 border border-white/10 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-2 border border-white/10 text-red-bright uppercase font-bold">
                    {res.category}
                  </span>
                  <h3 className="font-heading font-bold text-sm text-white mt-1">{res.title}</h3>
                  <p className="text-xs text-text-secondary">{res.desc}</p>
                </div>
                {res.url ? (
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-red-bright hover:underline flex items-center gap-1 pt-2 border-t border-white/5"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span
                    title="Sample resource (not a real link)"
                    className="text-xs font-mono text-text-muted/60 flex items-center gap-1 pt-2 border-t border-white/5 cursor-not-allowed"
                  >
                    <span>Sample Resource</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Review & Grade Modal */}
      {selectedPR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 max-w-lg w-full space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono text-red-bright uppercase font-bold">
                  PR #{selectedPR.pr_number} Review
                </span>
                <h3 className="font-heading font-bold text-base text-white">{selectedPR.title}</h3>
              </div>
              <button onClick={() => setSelectedPRId(null)} className="text-text-muted hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-surface-1 border border-white/5 space-y-1">
                <div className="text-text-muted">Contributor: <span className="text-white">{selectedPR.contributor_name}</span></div>
                <div className="text-text-muted">Difficulty: <span className="text-white">{selectedPR.difficulty}</span></div>
                {selectedPR.pr_url ? (
                  <a href={selectedPR.pr_url} target="_blank" rel="noreferrer" className="text-red-bright hover:underline flex items-center gap-1 text-[11px] mt-1">
                    <span>Inspect diff on GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span
                    title="Sample pull request (not a real link)"
                    className="text-text-muted/60 flex items-center gap-1 text-[11px] mt-1 cursor-not-allowed"
                  >
                    <span>Sample pull request (not a real link)</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                )}
              </div>

              {/* Quality Score Stars */}
              <div className="space-y-1.5">
                <label className="text-white font-bold block">
                  Code Quality Score (+{reviewScore} Quality Bonus Points)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewScore(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewScore ? "fill-amber-400 text-amber-400" : "text-zinc-600"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-text-muted text-[11px] ml-2 font-mono">
                    {reviewScore === 5 ? "Exceptional" : reviewScore >= 4 ? "Great" : "Standard"}
                  </span>
                </div>
              </div>

              {/* Review Comments */}
              <div className="space-y-1">
                <label className="text-white font-bold block">Review Notes / Guidance</label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={3}
                  placeholder="Leave actionable feedback on test coverage, performance, and formatting..."
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleReviewSubmit("rejected")}
                  className="px-4 py-2 rounded-xl bg-red-primary/20 text-red-bright border border-red-primary/40 font-bold hover:bg-red-primary/30"
                >
                  Request Changes
                </button>
                <button
                  type="button"
                  onClick={() => handleReviewSubmit("approved")}
                  className="px-5 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold shadow-md"
                >
                  Approve & Merge (+{reviewScore} pts)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Office Hours Modal */}
      {showAddOfficeHours && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-heading font-bold text-base text-white">Schedule Office Hours</h3>
              <button onClick={() => setShowAddOfficeHours(false)} className="text-text-muted hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOfficeHours} className="space-y-3 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-white block">Session Title</label>
                <input
                  type="text"
                  value={ohTitle}
                  onChange={(e) => setOhTitle(e.target.value)}
                  placeholder="e.g. Rust SIMD Deep-Dive & Issue Clinic"
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white block">Date</label>
                <input
                  type="date"
                  value={ohDate}
                  onChange={(e) => setOhDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-white block">Start Time (UTC)</label>
                  <input
                    type="time"
                    value={ohStartTime}
                    onChange={(e) => setOhStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white block">End Time (UTC)</label>
                  <input
                    type="time"
                    value={ohEndTime}
                    onChange={(e) => setOhEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-white block">Meeting URL (Google Meet / Zoom / Discord)</label>
                <input
                  type="text"
                  value={ohMeetingUrl}
                  onChange={(e) => setOhMeetingUrl(e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddOfficeHours(false)}
                  className="px-4 py-2 rounded-xl bg-surface-2 text-text-muted hover:text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-red-primary text-white font-bold">
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Resource Modal */}
      {showAddResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-heading font-bold text-base text-white">Share Resource</h3>
              <button onClick={() => setShowAddResource(false)} className="text-text-muted hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddResource} className="space-y-3 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-white block">Title</label>
                <input
                  type="text"
                  value={newResTitle}
                  onChange={(e) => setNewResTitle(e.target.value)}
                  placeholder="e.g. Profiling Rust Code with Valgrind"
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white block">Resource URL</label>
                <input
                  type="text"
                  value={newResUrl}
                  onChange={(e) => setNewResUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white block">Short Description</label>
                <textarea
                  value={newResDesc}
                  onChange={(e) => setNewResDesc(e.target.value)}
                  rows={2}
                  placeholder="Why this resource is helpful..."
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddResource(false)}
                  className="px-4 py-2 rounded-xl bg-surface-2 text-text-muted hover:text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-red-primary text-white font-bold">
                  Share
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
