"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FolderGit2,
  GitPullRequest,
  Users,
  AlertCircle,
  Plus,
  CheckCircle2,
  ExternalLink,
  Flame,
  Send,
  Sparkles,
  Layers,
  Clock,
  ShieldAlert,
  Edit,
  Tag,
  Code2,
  Check,
  X,
  MessageSquare,
  Award,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAppStore } from "@/lib/store";
import { SITE_CONFIG } from "@/lib/site-config";
import { SampleBadge } from "@/components/visual/DemoModeBanner";
import AvatarDisplay from "@/components/visual/AvatarDisplay";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import StatusBadge from "@/components/ui/status-badge";
import DataTable, { Column } from "@/components/ui/data-table";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { Project, Issue, PullRequest, ContributorProjectApplication, ProjectDomain, ProjectDifficulty } from "@/types";
import { getCurrentPhase, CODING_PHASE, formatDateRange, PHASES } from "@/lib/season";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ProjectAdminDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-neutral-400">Loading project admin dashboard...</div>}>
      <RoleGuard allowedRoles={["project_admin", "super_admin"]}>
        <ProjectAdminDashboardContent />
      </RoleGuard>
    </Suspense>
  );
}

function ProjectAdminDashboardContent() {
  const {
    projects,
    addProject,
    updateProject,
    pullRequests,
    mergePR,
    reviewPR,
    contributorApplications,
    reviewContributorApplication,
    pointsLedger,
    awardPoints,
    projectAnnouncements,
    addProjectAnnouncement,
    pointsRules,
    currentPersona,
  } = useAppStore();

  const isDemo = SITE_CONFIG.DEMO_MODE;
  const currentPhase = getCurrentPhase();
  const codingPeriodDates = formatDateRange(CODING_PHASE);
  const phaseStatusBadge = currentPhase
    ? `Phase ${currentPhase.id} Active`
    : `Phase 1 Starts ${new Date(`${PHASES[0].startDate}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  const router = useRouter();
  const searchParams = useSearchParams();

  type AdminTab = "overview" | "projects" | "submit" | "applications" | "issues" | "prs" | "announcements";
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  useEffect(() => {
    const tabParam = searchParams?.get("tab") as AdminTab | null;
    if (tabParam && ["overview", "projects", "submit", "applications", "issues", "prs", "announcements"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (newTab: AdminTab) => {
    setActiveTab(newTab);
    router.push(`/dashboard/project-admin?tab=${newTab}`, { scroll: false });
  };

  // Selected Project for Deep Dive Tabbed View
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || "");
  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Deep dive inner tab
  const [projectInnerTab, setProjectInnerTab] = useState<"overview" | "contributors" | "issues" | "prs" | "announcements" | "mentors">("overview");

  // Multi-step Submit Form State
  const [submitStep, setSubmitStep] = useState(1);
  const [formName, setFormName] = useState("");
  const [formTagline, setFormTagline] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formRepoUrl, setFormRepoUrl] = useState("");
  const [formTechStack, setFormTechStack] = useState("");
  const [formDomain, setFormDomain] = useState<ProjectDomain>("Web3");
  const [formDifficulty, setFormDifficulty] = useState<ProjectDifficulty>("Intermediate");
  const [formLicense, setFormLicense] = useState("MIT");
  const [formGuidelinesUrl, setFormGuidelinesUrl] = useState("");
  const [formGoodFirstIssues, setFormGoodFirstIssues] = useState(3);
  const [formPreferredMentors, setFormPreferredMentors] = useState("");
  const [formConfirmedRights, setFormConfirmedRights] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Issues State (Local / Synced)
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: "iss-1",
      project_id: selectedProject?.id || "proj-1",
      project_name: selectedProject?.name || "WinterVision Core",
      title: "Add AVX-512 vector transformation tests",
      issue_number: 14,
      issue_url: "https://github.com/omnikon/wintervision-core/issues/14",
      labels: ["good-first-issue", "simd"],
      difficulty: "Easy",
      points: pointsRules.easy_points,
      status: "open",
    },
    {
      id: "iss-2",
      project_id: selectedProject?.id || "proj-1",
      project_name: selectedProject?.name || "WinterVision Core",
      title: "Implement fallback CPU iteration for legacy x86_64",
      issue_number: 28,
      issue_url: "https://github.com/omnikon/wintervision-core/issues/28",
      labels: ["optimization", "help-wanted"],
      difficulty: "Medium",
      points: pointsRules.medium_points,
      status: "assigned",
      assigned_to: "u-c1",
      assigned_to_name: "Aarav Patel",
    },
  ]);

  // New Issue Modal
  const [showAddIssueModal, setShowAddIssueModal] = useState(false);
  const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueNumber, setNewIssueNumber] = useState(42);
  const [newIssueUrl, setNewIssueUrl] = useState("");
  const [newIssueDifficulty, setNewIssueDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");

  // New Announcement
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [announcementSuccess, setAnnouncementSuccess] = useState(false);

  // Mentor Invite
  const [mentorInviteEmail, setMentorInviteEmail] = useState("");
  const [mentorInviteSuccess, setMentorInviteSuccess] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics calculation
  const approvedCount = projects.filter((p) => p.status === "approved").length;
  const pendingCount = projects.filter((p) => p.status === "pending").length;
  const rejectedCount = projects.filter((p) => p.status === "rejected").length;
  const openPRCount = pullRequests.filter((pr) => pr.status === "pending").length;
  const mergedPRCount = pullRequests.filter((pr) => pr.status === "merged").length;
  const awaitingIssuesCount = issues.filter((i) => i.status === "open").length;

  // PR Activity Chart Data over December 2026
  const prActivityData = isDemo
    ? [
        { date: "Dec 04", prs: 1 },
        { date: "Dec 08", prs: 3 },
        { date: "Dec 12", prs: 5 },
        { date: "Dec 16", prs: 8 },
        { date: "Dec 20", prs: 12 },
        { date: "Dec 24", prs: 15 },
        { date: "Dec 26", prs: 18 },
      ]
    : [
        { date: "Dec 04", prs: 0 },
        { date: "Dec 12", prs: 0 },
        { date: "Dec 20", prs: 0 },
        { date: "Dec 26", prs: 0 },
      ];

  // Validate Submit Step
  const handleNextStep = () => {
    const errs: Record<string, string> = {};

    if (submitStep === 1) {
      if (!formName.trim()) errs.name = "Project name is required.";
      if (!formTagline.trim()) errs.tagline = "Short tagline is required.";
      if (!formDescription.trim()) errs.description = "Detailed description is required.";
      const ghRegex = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/i;
      if (!formRepoUrl.trim() || !ghRegex.test(formRepoUrl.trim())) {
        errs.repoUrl = "Must be a valid GitHub repository URL (e.g., https://github.com/org/repo).";
      }
      if (!formConfirmedRights) {
        errs.confirmedRights = "You must confirm you have the right to list this repository.";
      }
    } else if (submitStep === 2) {
      if (!formTechStack.trim()) errs.techStack = "Provide at least one primary tech stack tag.";
    }

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    setFormErrors({});
    if (submitStep < 3) {
      setSubmitStep(submitStep + 1);
    } else {
      // Final Submit
      const newProj = addProject({
        name: formName.trim(),
        slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        tagline: formTagline.trim(),
        description: formDescription.trim(),
        repository_url: formRepoUrl.trim(),
        tech_stack: formTechStack.split(",").map((s) => s.trim()).filter(Boolean),
        domain: formDomain,
        difficulty: formDifficulty,
        organization: currentPersona.name,
        maintainer_id: currentPersona.email,
        maintainer_name: currentPersona.name,
        maintainer_avatar: "",
        mentor_ids: [],
        open_issues_count: formGoodFirstIssues,
        stars_count: 0,
        forks_count: 0,
        license: formLicense,
        guidelines_url: formGuidelinesUrl.trim(),
        good_first_issues_count: formGoodFirstIssues,
        preferred_mentors: formPreferredMentors.split(",").map((s) => s.trim()).filter(Boolean),
        ownership_confirmed: true,
      });

      setSubmitSuccess(true);
      showToast(`Repository "${formName}" submitted successfully! Awaiting review.`);
      setTimeout(() => {
        setSubmitSuccess(false);
        setSubmitStep(1);
        setActiveTab("projects");
      }, 2000);
    }
  };

  const handleAddIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIssueTitle) return;

    const points =
      newIssueDifficulty === "Hard"
        ? pointsRules.hard_points
        : newIssueDifficulty === "Medium"
        ? pointsRules.medium_points
        : pointsRules.easy_points;

    const issueObj: Issue = {
      id: `iss-${Date.now()}`,
      project_id: selectedProject.id,
      project_name: selectedProject.name,
      title: newIssueTitle,
      issue_number: newIssueNumber,
      issue_url: newIssueUrl || `${selectedProject.repository_url}/issues/${newIssueNumber}`,
      labels: ["owoc-2026", newIssueDifficulty.toLowerCase()],
      difficulty: newIssueDifficulty,
      points,
      status: "open",
    };

    setIssues([issueObj, ...issues]);
    setShowAddIssueModal(false);
    setNewIssueTitle("");
    showToast(`Issue #${newIssueNumber} created successfully.`);
  };

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle || !announcementContent) return;

    addProjectAnnouncement({
      project_id: selectedProject.id,
      project_name: selectedProject.name,
      author_id: currentPersona.email,
      author_name: currentPersona.name,
      title: announcementTitle,
      content: announcementContent,
    });

    setAnnouncementTitle("");
    setAnnouncementContent("");
    setAnnouncementSuccess(true);
    showToast("Project update announced to all contributors!");
    setTimeout(() => setAnnouncementSuccess(false), 3000);
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

      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-primary/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-primary to-red-deep p-[1px] shadow-red-glow">
            <div className="w-full h-full bg-[#0B0B0D] rounded-2xl flex items-center justify-center">
              <FolderGit2 className="w-7 h-7 text-red-bright" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-red-bright uppercase font-bold tracking-wider">
                PROJECT LEAD CONSOLE
              </span>
              {isDemo && <SampleBadge />}
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Maintainer Workspace
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Submit repositories, assign issues, triage PRs, and award points for OWOC 2026.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => setActiveTab("submit")}
            className="px-4 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-bold transition-all shadow-red-glow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Submit a Repository</span>
          </button>
        </div>
      </div>

      {/* Pending Approval Notice Banner */}
      {selectedProject?.status === "pending" && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-amber-300 text-xs font-mono">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />
          <div className="flex-grow">
            <strong>Awaiting review by OWOC organizers:</strong> Repository "{selectedProject.name}" has been submitted and is currently in the verification queue.
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
            Pending Approval
          </span>
        </div>
      )}

      {/* Navigation Tabs Bar */}
      <div className="flex border-b border-white/10 gap-2 overflow-x-auto pb-1 text-xs font-mono">
        <button
          onClick={() => handleTabChange("overview")}
          className={`px-4 py-2.5 rounded-t-xl transition-colors font-bold whitespace-nowrap flex items-center gap-2 ${
            activeTab === "overview"
              ? "bg-surface-1 border-t-2 border-red-bright text-white"
              : "text-text-muted hover:text-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => handleTabChange("projects")}
          className={`px-4 py-2.5 rounded-t-xl transition-colors font-bold whitespace-nowrap flex items-center gap-2 ${
            activeTab === "projects"
              ? "bg-surface-1 border-t-2 border-red-bright text-white"
              : "text-text-muted hover:text-white"
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>My Projects ({projects.length})</span>
        </button>

        <button
          onClick={() => handleTabChange("submit")}
          className={`px-4 py-2.5 rounded-t-xl transition-colors font-bold whitespace-nowrap flex items-center gap-2 ${
            activeTab === "submit"
              ? "bg-surface-1 border-t-2 border-red-bright text-white"
              : "text-text-muted hover:text-white"
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Submit Project</span>
        </button>

        <button
          onClick={() => handleTabChange("applications")}
          className={`px-4 py-2.5 rounded-t-xl transition-colors font-bold whitespace-nowrap flex items-center gap-2 ${
            activeTab === "applications"
              ? "bg-surface-1 border-t-2 border-red-bright text-white"
              : "text-text-muted hover:text-white"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Contributor Requests ({contributorApplications.length})</span>
        </button>

        <button
          onClick={() => handleTabChange("issues")}
          className={`px-4 py-2.5 rounded-t-xl transition-colors font-bold whitespace-nowrap flex items-center gap-2 ${
            activeTab === "issues"
              ? "bg-surface-1 border-t-2 border-red-bright text-white"
              : "text-text-muted hover:text-white"
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Issues ({issues.length})</span>
        </button>

        <button
          onClick={() => handleTabChange("prs")}
          className={`px-4 py-2.5 rounded-t-xl transition-colors font-bold whitespace-nowrap flex items-center gap-2 ${
            activeTab === "prs"
              ? "bg-surface-1 border-t-2 border-red-bright text-white"
              : "text-text-muted hover:text-white"
          }`}
        >
          <GitPullRequest className="w-3.5 h-3.5" />
          <span>Pull Requests ({pullRequests.length})</span>
        </button>

        <button
          onClick={() => handleTabChange("announcements")}
          className={`px-4 py-2.5 rounded-t-xl transition-colors font-bold whitespace-nowrap flex items-center gap-2 ${
            activeTab === "announcements"
              ? "bg-surface-1 border-t-2 border-red-bright text-white"
              : "text-text-muted hover:text-white"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Announcements</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Stat Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-text-muted text-[11px] font-mono mb-2">
                <span>MY PROJECTS</span>
                <FolderGit2 className="w-4 h-4 text-red-bright" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                <AnimatedCounter to={projects.length} />
              </div>
              <div className="text-[10px] text-text-muted mt-1">
                {approvedCount} approved · {pendingCount} pending
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-text-muted text-[11px] font-mono mb-2">
                <span>CONTRIBUTORS</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                <AnimatedCounter to={isDemo ? 18 : 0} />
              </div>
              <div className="text-[10px] text-text-muted mt-1">
                {contributorApplications.filter((a) => a.status === "pending").length} requests pending
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-text-muted text-[11px] font-mono mb-2">
                <span>OPEN PRS</span>
                <GitPullRequest className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                <AnimatedCounter to={openPRCount} />
              </div>
              <div className="text-[10px] text-text-muted mt-1">Awaiting mentor triage</div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-text-muted text-[11px] font-mono mb-2">
                <span>MERGED PRS</span>
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                <AnimatedCounter to={mergedPRCount} />
              </div>
              <div className="text-[10px] text-text-muted mt-1">Points awarded via ledger</div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-text-muted text-[11px] font-mono mb-2">
                <span>OPEN ISSUES</span>
                <Code2 className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                <AnimatedCounter to={awaitingIssuesCount} />
              </div>
              <div className="text-[10px] text-text-muted mt-1">Ready for assignment</div>
            </div>
          </div>

          {/* PR Activity Chart */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Pull Request Velocity ({codingPeriodDates})
                </h3>
                <p className="text-xs text-text-secondary">
                  Tracking submissions and code review throughput across the coding sprint.
                </p>
              </div>
              <span className="text-[11px] font-mono text-red-bright uppercase font-bold px-2 py-0.5 rounded bg-red-primary/10 border border-red-primary/30">
                {phaseStatusBadge}
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={prActivityData}>
                  <defs>
                    <linearGradient id="prGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
                  <YAxis stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0B0B0D",
                      borderColor: "rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="prs"
                    stroke="#EF4444"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#prGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY PROJECTS (Table & Tabbed Deep Dive) */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-xl text-white">
              Listed Repositories
            </h2>
            <button
              onClick={() => setActiveTab("submit")}
              className="px-3 py-1.5 rounded-xl bg-red-primary text-white text-xs font-mono font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Repo</span>
            </button>
          </div>

          {/* Projects Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((proj) => {
              const isSelected = proj.id === selectedProjectId;
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-surface-1 border-red-primary shadow-red-glow-sm"
                      : "bg-surface-1/50 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="font-heading font-bold text-base text-white truncate">
                      {proj.name}
                    </span>
                    <StatusBadge status={proj.status} size="sm" />
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2 mb-4">
                    {proj.tagline || proj.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] font-mono text-text-muted">
                    <span>{proj.domain}</span>
                    <span className="text-red-bright font-bold">
                      {proj.open_issues_count} open issues
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Dive Tabbed View for Selected Project */}
          {selectedProject && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-2xl text-white">
                      {selectedProject.name}
                    </h3>
                    <StatusBadge status={selectedProject.status} />
                  </div>
                  {selectedProject.repository_url ? (
                    <a
                      href={selectedProject.repository_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-text-muted hover:text-red-bright flex items-center gap-1 mt-1"
                    >
                      <span>{selectedProject.repository_url}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span
                      title="Sample repository (not a real link)"
                      className="text-xs font-mono text-text-muted/60 flex items-center gap-1 mt-1 cursor-not-allowed"
                    >
                      <span>Sample repository (not a real link)</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-xl bg-surface-2 border border-white/10 text-white">
                    License: {selectedProject.license || "MIT"}
                  </span>
                </div>
              </div>

              {/* Inner Tab Buttons */}
              <div className="flex border-b border-white/10 gap-2 overflow-x-auto text-xs font-mono">
                {(["overview", "contributors", "issues", "prs", "announcements", "mentors"] as const).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setProjectInnerTab(tab)}
                      className={`px-3 py-2 capitalize font-bold transition-colors ${
                        projectInnerTab === tab
                          ? "border-b-2 border-red-bright text-white"
                          : "text-text-muted hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>

              {/* Inner Tab: Overview */}
              {projectInnerTab === "overview" && (
                <div className="space-y-4 text-xs leading-relaxed">
                  <div>
                    <h4 className="font-heading font-bold text-white mb-1">About the Repository</h4>
                    <p className="text-text-secondary">{selectedProject.description}</p>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white mb-1">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech_stack.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-lg bg-surface-2 border border-white/10 text-[10px] font-mono text-white"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedProject.contribution_guide && (
                    <div>
                      <h4 className="font-heading font-bold text-white mb-1">
                        Contribution Guidelines
                      </h4>
                      <p className="text-text-secondary bg-surface-2 p-3 rounded-xl font-mono text-[11px]">
                        {selectedProject.contribution_guide}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Inner Tab: Contributors */}
              {projectInnerTab === "contributors" && (
                <div className="space-y-3">
                  <span className="text-xs text-text-muted font-mono block">
                    Active builders working on {selectedProject.name}:
                  </span>
                  <div className="space-y-2">
                    {isDemo ? (
                      [
                        { name: "Aarav Patel", gh: "aaravp-dev", prs: 3, points: 280 },
                        { name: "Zara Chen", gh: "zarachen-web3", prs: 2, points: 150 },
                      ].map((c) => (
                        <div
                          key={c.gh}
                          className="p-3 rounded-xl bg-surface-2 border border-white/5 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <AvatarDisplay name={c.name} size="sm" />
                            <div>
                              <div className="font-bold text-white">{c.name}</div>
                              <div className="text-[10px] font-mono text-text-muted">@{c.gh}</div>
                            </div>
                          </div>
                          <div className="font-mono text-right">
                            <span className="text-red-bright font-bold">{c.points} pts</span>
                            <span className="text-text-muted block text-[10px]">{c.prs} merged PRs</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-xs text-text-muted">
                        No active contributors assigned yet.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Inner Tab: Issues */}
              {projectInnerTab === "issues" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-text-muted">Project Issue Tracker</span>
                    <button
                      onClick={() => setShowAddIssueModal(true)}
                      className="px-3 py-1.5 rounded-lg bg-red-primary text-white text-xs font-mono font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Issue</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {issues.map((i) => (
                      <div
                        key={i.id}
                        className="p-3.5 rounded-xl bg-surface-2 border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-white flex items-center gap-2">
                            <span>#{i.issue_number}</span>
                            <span>{i.title}</span>
                          </div>
                          <div className="text-[10px] font-mono text-text-muted mt-1">
                            Difficulty: {i.difficulty} ({i.points} pts) · Status: {i.status}
                          </div>
                        </div>
                        {i.issue_url ? (
                          <a
                            href={i.issue_url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-surface-1 border border-white/10 hover:text-white text-text-muted"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span
                            title="Sample issue (not a real link)"
                            className="p-2 rounded-lg bg-surface-1 border border-white/10 text-text-muted/60 cursor-not-allowed"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inner Tab: Pull Requests */}
              {projectInnerTab === "prs" && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-text-muted">
                    Pull Requests for this repository:
                  </span>
                  <div className="space-y-2">
                    {pullRequests.map((pr) => (
                      <div
                        key={pr.id}
                        className="p-4 rounded-xl bg-surface-2 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-bold text-white flex items-center gap-2">
                            <span>#{pr.pr_number}</span>
                            <span>{pr.title}</span>
                          </div>
                          <div className="text-[10px] font-mono text-text-muted mt-1">
                            By {pr.contributor_name} · Difficulty: {pr.difficulty} · Status: {pr.status}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {pr.status === "pending" && (
                            <button
                              onClick={() => {
                                mergePR(pr.id, 5);
                                showToast(`Merged PR #${pr.pr_number} and logged points.`);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-300 border border-green-500/40 text-[11px] font-mono font-bold hover:bg-green-500/30"
                            >
                              Approve & Merge (+Pts)
                            </button>
                          )}
                          {pr.pr_url ? (
                            <a
                              href={pr.pr_url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-lg bg-surface-1 border border-white/10 text-text-muted hover:text-white"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span
                              title="Sample pull request (not a real link)"
                              className="p-2 rounded-lg bg-surface-1 border border-white/10 text-text-muted/60 cursor-not-allowed"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inner Tab: Announcements */}
              {projectInnerTab === "announcements" && (
                <div className="space-y-4">
                  <form onSubmit={handlePublishAnnouncement} className="space-y-3">
                    <input
                      type="text"
                      value={announcementTitle}
                      onChange={(e) => setAnnouncementTitle(e.target.value)}
                      placeholder="Announcement Title (e.g., Sprint 1 guidelines)"
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-white/10 text-white text-xs font-mono"
                    />
                    <textarea
                      value={announcementContent}
                      onChange={(e) => setAnnouncementContent(e.target.value)}
                      rows={3}
                      placeholder="Write update for contributors..."
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-white/10 text-white text-xs font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-red-primary text-white text-xs font-mono font-bold flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Update</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Inner Tab: Mentors */}
              {projectInnerTab === "mentors" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-text-muted">
                      Assigned Technical Mentors:
                    </span>
                  </div>
                  <div className="space-y-2">
                    {selectedProject.mentors?.map((m) => (
                      <div
                        key={m.github}
                        className="p-3 rounded-xl bg-surface-2 border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <AvatarDisplay name={m.name} size="sm" />
                          <div>
                            <div className="font-bold text-white">{m.name}</div>
                            <div className="text-[10px] font-mono text-text-muted">{m.role}</div>
                          </div>
                        </div>
                        <a
                          href={`https://github.com/${m.github}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-mono text-red-bright hover:underline"
                        >
                          @{m.github}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SUBMIT A PROJECT (Multi-Step Form with Validation) */}
      {activeTab === "submit" && (
        <div className="glass-card p-6 sm:p-10 rounded-3xl border border-white/10 max-w-2xl mx-auto space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase text-red-bright font-bold tracking-wider">
              PROJECT REGISTRATION · STEP {submitStep} OF 3
            </span>
            <h2 className="font-heading font-black text-2xl text-white mt-1">
              Submit Open-Source Repository
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Onboard your codebase for the OWOC 2026 cohort. Submissions are reviewed by organizers.
            </p>
          </div>

          {/* Step Progress Bar */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  step <= submitStep ? "bg-red-primary" : "bg-surface-2"
                }`}
              />
            ))}
          </div>

          {/* STEP 1: Repository & Identity */}
          {submitStep === 1 && (
            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-white font-bold block">Repository Name *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. HyperVector DB"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                />
                {formErrors.name && <span className="text-[11px] text-red-bright">{formErrors.name}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-white font-bold block">One-Line Tagline *</label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  placeholder="e.g. Ultra-fast vector database built in Rust"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                />
                {formErrors.tagline && <span className="text-[11px] text-red-bright">{formErrors.tagline}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-white font-bold block">GitHub Repository URL *</label>
                <input
                  type="text"
                  value={formRepoUrl}
                  onChange={(e) => setFormRepoUrl(e.target.value)}
                  placeholder="https://github.com/org/repo"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                />
                {formErrors.repoUrl && <span className="text-[11px] text-red-bright">{formErrors.repoUrl}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-white font-bold block">Detailed Description *</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe the architecture, use cases, and what student contributors will build..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                />
                {formErrors.description && (
                  <span className="text-[11px] text-red-bright">{formErrors.description}</span>
                )}
              </div>

              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="confirmRights"
                  checked={formConfirmedRights}
                  onChange={(e) => setFormConfirmedRights(e.target.checked)}
                  className="mt-1 rounded accent-red-primary"
                />
                <label htmlFor="confirmRights" className="text-[11px] text-text-secondary cursor-pointer">
                  I confirm that I am a maintainer or authorized representative of this open-source repository with full rights to list it under OWOC 2026.
                </label>
              </div>
              {formErrors.confirmedRights && (
                <span className="text-[11px] text-red-bright block">{formErrors.confirmedRights}</span>
              )}
            </div>
          )}

          {/* STEP 2: Stack & Classification */}
          {submitStep === 2 && (
            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-white font-bold block">Primary Domain *</label>
                <select
                  value={formDomain}
                  onChange={(e) => setFormDomain(e.target.value as ProjectDomain)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                >
                  <option value="Web3">Web3 & Decentralized Systems</option>
                  <option value="AI/ML">AI / Machine Learning & Compilers</option>
                  <option value="Cloud & DevOps">Cloud Native & DevOps</option>
                  <option value="Full-Stack">Full-Stack & Systems</option>
                  <option value="Mobile">Mobile Applications</option>
                  <option value="Security">Security & Zero-Trust</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-white font-bold block">Tech Stack Tags (comma-separated) *</label>
                <input
                  type="text"
                  value={formTechStack}
                  onChange={(e) => setFormTechStack(e.target.value)}
                  placeholder="Rust, TypeScript, Next.js, Docker, WebAssembly"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                />
                {formErrors.techStack && (
                  <span className="text-[11px] text-red-bright">{formErrors.techStack}</span>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-white font-bold block">Target Difficulty Level</label>
                <select
                  value={formDifficulty}
                  onChange={(e) => setFormDifficulty(e.target.value as ProjectDifficulty)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                >
                  <option value="Beginner">Beginner-Friendly</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced / Systems-Heavy</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-white font-bold block">Open Source License</label>
                <select
                  value={formLicense}
                  onChange={(e) => setFormLicense(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                >
                  <option value="MIT">MIT License</option>
                  <option value="Apache-2.0">Apache 2.0</option>
                  <option value="GPL-3.0">GNU GPL v3</option>
                  <option value="BSD-3-Clause">BSD 3-Clause</option>
                  <option value="MPL-2.0">Mozilla Public License 2.0</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: Guidelines & Issues */}
          {submitStep === 3 && (
            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-white font-bold block">Contribution Guidelines URL</label>
                <input
                  type="text"
                  value={formGuidelinesUrl}
                  onChange={(e) => setFormGuidelinesUrl(e.target.value)}
                  placeholder="https://github.com/org/repo/blob/main/CONTRIBUTING.md"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white font-bold block">Estimated Good-First-Issues Count</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={formGoodFirstIssues}
                  onChange={(e) => setFormGoodFirstIssues(parseInt(e.target.value) || 1)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white font-bold block">Preferred Mentors (Optional)</label>
                <input
                  type="text"
                  value={formPreferredMentors}
                  onChange={(e) => setFormPreferredMentors(e.target.value)}
                  placeholder="GitHub handles or mentor emails"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white focus:outline-none focus:border-red-primary"
                />
              </div>
            </div>
          )}

          {/* Form Action Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {submitStep > 1 ? (
              <button
                type="button"
                onClick={() => setSubmitStep(submitStep - 1)}
                className="px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-1 text-text-secondary hover:text-white text-xs font-mono font-bold"
              >
                Previous Step
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-mono font-bold shadow-red-glow-sm"
            >
              {submitStep === 3 ? "Submit for Review" : "Continue →"}
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: CONTRIBUTOR APPLICATIONS */}
      {activeTab === "applications" && (
        <div className="space-y-4">
          <div>
            <h2 className="font-heading font-bold text-xl text-white">Contributor Applications</h2>
            <p className="text-xs text-text-secondary">
              Review requests from student developers wanting to onboard to your repositories.
            </p>
          </div>

          <div className="space-y-3">
            {contributorApplications.length === 0 ? (
              <div className="glass-card p-12 rounded-3xl border border-white/10 text-center text-xs text-text-muted">
                No contributor applications in the queue right now.
              </div>
            ) : (
              contributorApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-surface-1 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-white text-sm">
                        {app.contributor_name}
                      </span>
                      <a
                        href={`https://github.com/${app.github_username}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono text-red-bright hover:underline"
                      >
                        @{app.github_username}
                      </a>
                      <StatusBadge status={app.status} size="sm" />
                    </div>
                    <p className="text-xs text-text-secondary">{app.message}</p>
                    {app.plan && (
                      <p className="text-[11px] font-mono text-text-muted bg-surface-2 p-2.5 rounded-lg">
                        <strong>Plan:</strong> {app.plan}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {app.status === "pending" && (
                      <>
                        <button
                          onClick={() => {
                            reviewContributorApplication(app.id, "accepted", "Welcome aboard!");
                            showToast(`Accepted application from ${app.contributor_name}.`);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-green-500/20 text-green-300 border border-green-500/40 text-xs font-mono font-bold hover:bg-green-500/30"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => {
                            reviewContributorApplication(app.id, "declined", "Repository capacity reached.");
                            showToast(`Declined application.`);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-red-primary/20 text-red-bright border border-red-primary/40 text-xs font-mono font-bold hover:bg-red-primary/30"
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 5: ISSUES & ASSIGNMENTS */}
      {activeTab === "issues" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-xl text-white">Repository Issues</h2>
              <p className="text-xs text-text-secondary">
                Assign issues to contributors and establish difficulty points scoring.
              </p>
            </div>
            <button
              onClick={() => setShowAddIssueModal(true)}
              className="px-4 py-2 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-mono font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Issue</span>
            </button>
          </div>

          <div className="space-y-2">
            {issues.map((i) => (
              <div
                key={i.id}
                className="p-4 rounded-2xl bg-surface-1 border border-white/10 flex items-center justify-between text-xs font-mono"
              >
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="text-red-bright">#{i.issue_number}</span>
                    <span>{i.title}</span>
                  </div>
                  <div className="text-[11px] text-text-muted mt-1 flex items-center gap-3">
                    <span>Difficulty: {i.difficulty}</span>
                    <span>Points: {i.points} pts</span>
                    <span>Assigned to: {i.assigned_to_name || "Unassigned"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {i.issue_url ? (
                    <a
                      href={i.issue_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-surface-2 text-text-muted hover:text-white"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <span
                      title="Sample issue (not a real link)"
                      className="p-2 rounded-xl bg-surface-2 text-text-muted/60 cursor-not-allowed"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: PULL REQUESTS */}
      {activeTab === "prs" && (
        <div className="space-y-4">
          <div>
            <h2 className="font-heading font-bold text-xl text-white">Pull Request Triage</h2>
            <p className="text-xs text-text-secondary">
              Review pull requests, verify issue resolutions, and allocate points to the ledger.
            </p>
          </div>

          <div className="space-y-3">
            {pullRequests.map((pr) => (
              <div
                key={pr.id}
                className="p-5 rounded-2xl bg-surface-1 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-white">
                    <span className="font-mono text-red-bright">#{pr.pr_number}</span>
                    <span className="text-sm">{pr.title}</span>
                    <StatusBadge status={pr.status} size="sm" />
                  </div>
                  <div className="text-text-muted font-mono text-[11px] mt-1 flex items-center gap-3">
                    <span>Contributor: {pr.contributor_name}</span>
                    <span>Difficulty: {pr.difficulty}</span>
                    <span>Points: {pr.points_awarded || 10} pts</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {pr.status === "pending" && (
                    <button
                      onClick={() => {
                        mergePR(pr.id, 5);
                        showToast(`Merged PR #${pr.pr_number}! Points committed to ledger.`);
                      }}
                      className="px-4 py-2 rounded-xl bg-green-500/20 text-green-300 border border-green-500/40 text-xs font-mono font-bold hover:bg-green-500/30"
                    >
                      Mark Merged-Valid
                    </button>
                  )}
                  {pr.pr_url ? (
                    <a
                      href={pr.pr_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-surface-2 text-text-muted hover:text-white"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <span
                      title="Sample pull request (not a real link)"
                      className="p-2 rounded-xl bg-surface-2 text-text-muted/60 cursor-not-allowed"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: ANNOUNCEMENTS */}
      {activeTab === "announcements" && (
        <div className="space-y-6 max-w-2xl">
          <div>
            <h2 className="font-heading font-bold text-xl text-white">Broadcast Announcement</h2>
            <p className="text-xs text-text-secondary">
              Publish sprint updates, issue clarifications, or meeting links to all repository contributors.
            </p>
          </div>

          <form onSubmit={handlePublishAnnouncement} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-white font-bold block">Announcement Title</label>
              <input
                type="text"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                placeholder="e.g. Week 1 Office Hours & SIMD Test Clinic"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-red-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white font-bold block">Content (Markdown supported)</label>
              <textarea
                value={announcementContent}
                onChange={(e) => setAnnouncementContent(e.target.value)}
                rows={5}
                placeholder="Write your announcement details here..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-1 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-red-primary"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-mono font-bold flex items-center gap-2 shadow-red-glow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast to Contributors</span>
            </button>
          </form>

          {/* Past Announcements */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-white">Broadcast History</h3>
            {projectAnnouncements.map((ann) => (
              <div key={ann.id} className="p-4 rounded-2xl bg-surface-1 border border-white/10 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{ann.title}</span>
                  <span className="text-[10px] font-mono text-text-muted">{ann.created_at}</span>
                </div>
                <p className="text-text-secondary">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Issue Modal */}
      {showAddIssueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-heading font-bold text-base text-white">Add Issue to Tracker</h3>
              <button onClick={() => setShowAddIssueModal(false)} className="text-text-muted hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddIssue} className="space-y-3 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-white block">Issue Title</label>
                <input
                  type="text"
                  value={newIssueTitle}
                  onChange={(e) => setNewIssueTitle(e.target.value)}
                  placeholder="e.g. Implement AVX-512 SIMD tests"
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white block">Issue Number</label>
                <input
                  type="number"
                  value={newIssueNumber}
                  onChange={(e) => setNewIssueNumber(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white block">Difficulty</label>
                <select
                  value={newIssueDifficulty}
                  onChange={(e) =>
                    setNewIssueDifficulty(e.target.value as "Easy" | "Medium" | "Hard")
                  }
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                >
                  <option value="Easy">Easy ({pointsRules.easy_points} pts)</option>
                  <option value="Medium">Medium ({pointsRules.medium_points} pts)</option>
                  <option value="Hard">Hard ({pointsRules.hard_points} pts)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-white block">GitHub Issue URL (Optional)</label>
                <input
                  type="text"
                  value={newIssueUrl}
                  onChange={(e) => setNewIssueUrl(e.target.value)}
                  placeholder="https://github.com/org/repo/issues/42"
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddIssueModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface-2 text-text-muted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-red-primary text-white font-bold"
                >
                  Create Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
