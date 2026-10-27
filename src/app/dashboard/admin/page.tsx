"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldAlert,
  FolderGit2,
  Users,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  Download,
  Settings,
  Sparkles,
  Award,
  AlertCircle,
  Flame,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Plus,
  Send,
  Lock,
  Unlock,
  RefreshCw,
  Clock,
  ExternalLink,
  Edit,
  Trash2,
  Star,
  BookOpen,
  Calendar,
  AlertTriangle,
  QrCode,
  FileSpreadsheet,
} from "lucide-react";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAppStore } from "@/lib/store";
import { StandardRole } from "@/types";
import { SITE_CONFIG } from "@/lib/site-config";
import { SEASON_LABEL, SEASON_SHORT, PHASES, EVENT_START, EVENT_END, formatDateRange, getCurrentPhase, daysUntilCodingStart } from "@/lib/season";
import { SampleBadge } from "@/components/visual/DemoModeBanner";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import StatusBadge from "@/components/ui/status-badge";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import AvatarDisplay from "@/components/visual/AvatarDisplay";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function SuperAdminDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-neutral-400">Loading admin dashboard...</div>}>
      <RoleGuard allowedRoles={["super_admin"]}>
        <SuperAdminDashboardContent />
      </RoleGuard>
    </Suspense>
  );
}

function SuperAdminDashboardContent() {
  const {
    projects,
    setProjects,
    approveProject,
    rejectProject,
    pullRequests,
    mentorApplications,
    reviewMentorApplication,
    projectAdminApplications,
    reviewProjectAdminApplication,
    pointsRules,
    setPointsRules,
    leaderboardSettings,
    setLeaderboardSettings,
    notifications,
    addNotification,
    auditLogs,
    addAuditLog,
    siteSettings,
    setSiteSettings,
  } = useAppStore();

  const isDemo = SITE_CONFIG.DEMO_MODE;
  const router = useRouter();
  const searchParams = useSearchParams();

  type AdminTab =
    | "overview"
    | "approvals"
    | "users"
    | "projects"
    | "rules"
    | "leaderboard"
    | "badges"
    | "content"
    | "certificates"
    | "season"
    | "logs"
    | "exports";

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  useEffect(() => {
    let tabParam = searchParams?.get("tab");
    if (tabParam === "points") tabParam = "rules";
    if (tabParam === "sponsors") tabParam = "content";
    if (tabParam === "audit") tabParam = "logs";

    const validTabs: AdminTab[] = [
      "overview",
      "approvals",
      "users",
      "projects",
      "rules",
      "leaderboard",
      "badges",
      "content",
      "certificates",
      "season",
      "logs",
      "exports",
    ];

    if (tabParam && validTabs.includes(tabParam as AdminTab)) {
      setActiveTab(tabParam as AdminTab);
    }
  }, [searchParams]);

  const handleTabChange = (newTab: AdminTab) => {
    setActiveTab(newTab);
    const queryTab = newTab === "rules" ? "points" : newTab === "content" ? "sponsors" : newTab === "logs" ? "audit" : newTab;
    router.push(`/dashboard/admin?tab=${queryTab}`, { scroll: false });
  };

  // Approvals Sub-Tab
  const [approvalsTab, setApprovalsTab] = useState<"projects" | "mentors" | "ambassadors" | "project_admins">("projects");

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Confirm Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    requiredWord?: string;
    isDestructive?: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const openConfirm = (
    title: string,
    description: string,
    onConfirm: () => void,
    requiredWord?: string,
    isDestructive: boolean = true
  ) => {
    setConfirmDialog({
      isOpen: true,
      title,
      description,
      requiredWord,
      isDestructive,
      onConfirm: () => {
        onConfirm();
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Rejection Reason Modal
  const [rejectionModal, setRejectionModal] = useState<{
    isOpen: boolean;
    type: "project" | "mentor" | "project_admin" | "disqualify";
    targetId: string;
    targetName: string;
  }>({
    isOpen: false,
    type: "project",
    targetId: "",
    targetName: "",
  });
  const [rejectionReason, setRejectionReason] = useState("");

  // Users Management State
  const [usersSearch, setUsersSearch] = useState("");
  const [usersRoleFilter, setUsersRoleFilter] = useState("all");
  const [users, setUsers] = useState([
    {
      id: "u-admin",
      name: "Super Admin (You)",
      email: "contact@omnikonhub.com",
      role: "super_admin",
      college: "Omnikon Core",
      points: 0,
      status: "active",
      joinedAt: "2026-09-01",
    },
    {
      id: "u-1",
      name: "Aarav Patel",
      email: "aarav@example.edu",
      role: "contributor",
      college: "IIT Bombay",
      points: 1240,
      status: "active",
      joinedAt: "2026-10-10",
    },
    {
      id: "u-2",
      name: "Dr. Aris Thorne",
      email: "aris@omnikonhub.com",
      role: "mentor",
      college: "Stanford",
      points: 0,
      status: "active",
      joinedAt: "2026-10-01",
    },
    {
      id: "u-3",
      name: "Rohan Kulkarni",
      email: "rohan@hypercache.org",
      role: "project_admin",
      college: "NIT Karnataka",
      points: 0,
      status: "active",
      joinedAt: "2026-10-12",
    },
    {
      id: "u-4",
      name: "Devon Miller",
      email: "devon@college.edu",
      role: "ambassador",
      college: "BITS Pilani",
      points: 340,
      status: "active",
      joinedAt: "2026-10-14",
    },
    {
      id: "u-5",
      name: "Suspicious User",
      email: "sus@botnet.xyz",
      role: "contributor",
      college: "Unknown",
      points: 400,
      status: "active",
      joinedAt: "2026-10-16",
    },
  ]);

  // Points Rules Form State
  const [editableRules, setEditableRules] = useState(pointsRules);
  const [rulesSuccess, setRulesSuccess] = useState(false);

  // Content Management: Sponsors State
  const [sponsors, setSponsors] = useState([
    { id: "sp-1", name: "Sample Partner A", tier: "Alpha Title", confirmed: true },
    { id: "sp-2", name: "Sample Partner B", tier: "Alpha Title", confirmed: true },
    { id: "sp-3", name: "Sample Partner C", tier: "Crimson Partner", confirmed: true },
    { id: "sp-4", name: "Sample Partner D", tier: "Crimson Partner", confirmed: true },
    { id: "sp-5", name: "Sample Partner E", tier: "Community Supporter", confirmed: false },
  ]);

  // Badges Definitions
  const [badges, setBadges] = useState([
    { code: "FIRST_BLOOD", title: "First Blood", tier: "Bronze", rule: "Merge first PR" },
    { code: "FIRE_STREAK", title: "Crimson Streak", tier: "Silver", rule: "5 consecutive active days" },
    { code: "PR_CENTURION", title: "Centurion", tier: "Gold", rule: "Score over 1,000 points" },
    { code: "OBSIDIAN_CORE", title: "Obsidian Architect", tier: "Obsidian", rule: "Top 3 on podium at freeze" },
  ]);

  // Certificates Issuance State
  const [issuedCertificatesCount, setIssuedCertificatesCount] = useState(0);

  // Analytics Chart Data
  const registrationTimelineData = [
    { date: "Oct 28", count: 45 },
    { date: "Oct 31", count: 110 },
    { date: "Nov 04", count: 240 },
    { date: "Nov 08", count: 420 },
    { date: "Nov 14", count: 780 },
    { date: "Nov 20", count: 1250 },
    { date: "Nov 26", count: 1800 },
  ];

  const roleDistributionData = [
    { role: "Contributors", count: 1420, color: "#EF4444" },
    { role: "Mentors", count: 85, color: "#3B82F6" },
    { role: "Project Admins", count: 42, color: "#10B981" },
    { role: "Ambassadors", count: 105, color: "#F59E0B" },
    { role: "Admins", count: 5, color: "#8B5CF6" },
  ];

  const domainBreakdownData = [
    { domain: "AI/ML", count: 12 },
    { domain: "Web3", count: 9 },
    { domain: "Cloud & DevOps", count: 8 },
    { domain: "Full-Stack", count: 7 },
    { domain: "Security", count: 4 },
  ];

  const pendingProjects = projects.filter((p) => p.status === "pending");
  const pendingMentors = mentorApplications.filter((m) => m.status === "pending");
  const pendingProjectAdmins = projectAdminApplications.filter((pa) => pa.status === "pending");

  const totalPendingApprovals =
    pendingProjects.length + pendingMentors.length + pendingProjectAdmins.length;

  const currentPhase = getCurrentPhase();
  const displayPhase = currentPhase || PHASES[0];
  const daysToSprint = daysUntilCodingStart();

  // Actions
  const handleApproveProject = (id: string) => {
    approveProject(id, "Verified repository structure, guidelines, and issues.");
    showToast("Project approved and listed publicly.");
  };

  const handleExecuteRejection = () => {
    if (rejectionModal.type === "project") {
      rejectProject(rejectionModal.targetId, rejectionReason);
      showToast("Project submission rejected with feedback.");
    } else if (rejectionModal.type === "mentor") {
      reviewMentorApplication(rejectionModal.targetId, "rejected", rejectionReason);
      showToast("Mentor application rejected.");
    } else if (rejectionModal.type === "project_admin") {
      reviewProjectAdminApplication(rejectionModal.targetId, "rejected", rejectionReason);
      showToast("Project Admin application rejected.");
    } else if (rejectionModal.type === "disqualify") {
      setLeaderboardSettings((prev) => ({
        ...prev,
        disqualified_user_ids: [...prev.disqualified_user_ids, rejectionModal.targetId as string],
      }));
      setUsers((prev) =>
        prev.map((u) => (u.id === rejectionModal.targetId ? { ...u, status: "suspended" } : u))
      );
      addAuditLog({
        action: "disqualify_user",
        target_type: "user",
        target_id: rejectionModal.targetId,
        details_after: { reason: rejectionReason },
      });
      showToast(`User disqualified: ${rejectionReason}`);
    }
    setRejectionModal({ isOpen: false, type: "project", targetId: "", targetName: "" });
    setRejectionReason("");
  };

  const handleBulkApprove = (type: "projects" | "mentors" | "project_admins") => {
    if (type === "projects") {
      pendingProjects.forEach((p) => approveProject(p.id, "Bulk approved by Super Admin."));
      showToast(`Bulk approved ${pendingProjects.length} repositories.`);
    } else if (type === "mentors") {
      pendingMentors.forEach((m) => reviewMentorApplication(m.id, "approved", "Bulk approved."));
      showToast(`Bulk approved ${pendingMentors.length} mentors.`);
    } else if (type === "project_admins") {
      pendingProjectAdmins.forEach((pa) => reviewProjectAdminApplication(pa.id, "approved", "Bulk approved."));
      showToast(`Bulk approved ${pendingProjectAdmins.length} Project Admins.`);
    }
  };

  const handleToggleFreezeLeaderboard = () => {
    const nextState = !leaderboardSettings.is_frozen;
    openConfirm(
      nextState ? "Freeze Leaderboard?" : "Unfreeze Leaderboard?",
      nextState
        ? "Freezing prevents any new points calculation from updating public rankings. Useful for code freeze and audit."
        : "Unfreezing will restore real-time rank updates across the site.",
      () => {
        setLeaderboardSettings((prev) => ({
          ...prev,
          is_frozen: nextState,
          frozen_at: nextState ? new Date().toISOString() : undefined,
        }));
        addAuditLog({
          action: nextState ? "freeze_leaderboard" : "unfreeze_leaderboard",
          target_type: "leaderboard",
          target_id: "global",
          details_after: { is_frozen: nextState },
        });
        showToast(nextState ? "Leaderboard is now frozen." : "Leaderboard unfrozen and live.");
      },
      nextState ? "FREEZE" : undefined,
      nextState
    );
  };

  const handleSaveRules = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...editableRules,
      version: pointsRules.version + 1,
      updated_at: new Date().toISOString(),
    };
    setPointsRules(updated);
    addAuditLog({
      action: "update_points_rules",
      target_type: "points_rules_config",
      target_id: `v${updated.version}`,
      details_before: pointsRules as unknown as Record<string, unknown>,
      details_after: updated as unknown as Record<string, unknown>,
    });
    setRulesSuccess(true);
    showToast(`Points & scoring rules updated to Version ${updated.version}!`);
    setTimeout(() => setRulesSuccess(false), 3000);
  };

  const handleToggleSponsorConfirmed = (sponsorId: string) => {
    setSponsors((prev) =>
      prev.map((s) => (s.id === sponsorId ? { ...s, confirmed: !s.confirmed } : s))
    );
    showToast("Sponsor visibility status updated.");
  };

  const handleIssueCertificates = () => {
    openConfirm(
      "Bulk Generate & Issue Certificates?",
      "This will generate unique official certificate IDs (OWOC-2026-...) for all qualifying participants.",
      () => {
        setIssuedCertificatesCount(128);
        addAuditLog({
          action: "bulk_issue_certificates",
          target_type: "certificates",
          target_id: "season_2026",
          details_after: { issued_count: 128 },
        });
        showToast("128 Certificates successfully generated and issued!");
      },
      "ISSUE",
      false
    );
  };

  // CSV Export Generators
  const exportCSV = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(","))].join(
        "\n"
      );
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filename}.csv successfully.`);
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

      {/* Reusable Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        description={confirmDialog.description}
        requiredConfirmationWord={confirmDialog.requiredWord}
        isDestructive={confirmDialog.isDestructive}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Rejection / Disqualification Reason Modal */}
      {rejectionModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-heading font-bold text-base text-white">
                {rejectionModal.type === "disqualify" ? "Disqualify User" : "Provide Decision Reason"}
              </h3>
              <button
                onClick={() =>
                  setRejectionModal({ isOpen: false, type: "project", targetId: "", targetName: "" })
                }
                className="text-text-muted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-text-secondary">
              Enter reason for {rejectionModal.type === "disqualify" ? "disqualifying" : "rejecting"}{" "}
              <strong className="text-white">{rejectionModal.targetName}</strong>. This explanation will be logged and communicated.
            </p>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              placeholder="Detail reasons..."
              className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-red-primary"
              required
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() =>
                  setRejectionModal({ isOpen: false, type: "project", targetId: "", targetName: "" })
                }
                className="px-4 py-2 rounded-xl bg-surface-2 text-text-muted hover:text-white text-xs font-mono"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteRejection}
                disabled={!rejectionReason.trim()}
                className="px-5 py-2 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-mono font-bold disabled:opacity-50"
              >
                Submit Decision
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Super Admin Top Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-primary/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-primary to-red-deep p-[1px] shadow-red-glow">
            <div className="w-full h-full bg-[#0B0B0D] rounded-2xl flex items-center justify-center">
              <ShieldAlert className="w-7 h-7 text-red-bright" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-red-bright uppercase font-bold tracking-wider">
                SUPER ADMIN COMMAND CENTER
              </span>
              {isDemo && <SampleBadge />}
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              OWOC {SEASON_LABEL} Organizer Console
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Full administrative authority over season phases, approvals, points rules, and audits.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          {leaderboardSettings.is_frozen && (
            <span className="px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono flex items-center gap-1.5 font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>Leaderboard Frozen</span>
            </span>
          )}

          <button
            onClick={handleToggleFreezeLeaderboard}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              leaderboardSettings.is_frozen
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-surface-2 hover:bg-surface-1 text-text-secondary hover:text-white border border-white/10"
            }`}
          >
            {leaderboardSettings.is_frozen ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            <span>{leaderboardSettings.is_frozen ? "Unfreeze Podium" : "Freeze Podium"}</span>
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation Bar */}
      <div className="flex border-b border-white/10 gap-2 overflow-x-auto pb-1 text-xs font-mono">
        {[
          { id: "overview", label: "Analytics & Schedule", icon: <Award className="w-3.5 h-3.5" /> },
          {
            id: "approvals",
            label: `Approvals Queue (${totalPendingApprovals})`,
            icon: <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />,
          },
          { id: "users", label: "User Management", icon: <Users className="w-3.5 h-3.5" /> },
          { id: "projects", label: "Projects Moderation", icon: <FolderGit2 className="w-3.5 h-3.5" /> },
          { id: "rules", label: "Points & Rules Config", icon: <BookOpen className="w-3.5 h-3.5" /> },
          { id: "leaderboard", label: "Podium Integrity", icon: <Flame className="w-3.5 h-3.5" /> },
          { id: "badges", label: "Badges Manager", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { id: "content", label: "Sponsors & Content", icon: <Settings className="w-3.5 h-3.5" /> },
          { id: "certificates", label: "Certificates Center", icon: <QrCode className="w-3.5 h-3.5" /> },
          { id: "season", label: "Season Settings", icon: <Calendar className="w-3.5 h-3.5" /> },
          { id: "logs", label: "System Audit Logs", icon: <Clock className="w-3.5 h-3.5" /> },
          { id: "exports", label: "Data Export CSV", icon: <Download className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as AdminTab)}
            className={`px-3.5 py-2.5 rounded-t-xl transition-colors font-bold whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-surface-1 border-t-2 border-red-bright text-white"
                : "text-text-muted hover:text-white"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-text-muted text-[11px] font-mono mb-2">
                <span>TOTAL USERS</span>
                <Users className="w-4 h-4 text-red-bright" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                <AnimatedCounter to={isDemo ? 1657 : 0} />
              </div>
              <div className="text-[10px] text-text-muted mt-1">Across all 5 program roles</div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-text-muted text-[11px] font-mono mb-2">
                <span>REPOSITORIES</span>
                <FolderGit2 className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                <AnimatedCounter to={projects.length} />
              </div>
              <div className="text-[10px] text-text-muted mt-1">
                {projects.filter((p) => p.status === "approved").length} approved · {pendingProjects.length} pending
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-text-muted text-[11px] font-mono mb-2">
                <span>PULL REQUESTS</span>
                <GitPullRequest className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                <AnimatedCounter to={pullRequests.length} />
              </div>
              <div className="text-[10px] text-text-muted mt-1">
                {pullRequests.filter((pr) => pr.status === "merged").length} merged
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-text-muted text-[11px] font-mono mb-2">
                <span>PENDING APPROVALS</span>
                <AlertCircle className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                <AnimatedCounter to={totalPendingApprovals} />
              </div>
              <div className="text-[10px] text-text-muted mt-1">Action needed in Approvals tab</div>
            </div>
          </div>

          {/* Current Phase Countdown Widget */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-red-primary/10 via-surface-1 to-surface-1 border border-red-primary/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-red-bright uppercase font-bold tracking-widest block">
                {currentPhase ? "ACTIVE PROGRAM TIMELINE" : "UPCOMING PROGRAM TIMELINE"}
              </span>
              <h3 className="font-heading font-black text-xl text-white mt-1">
                {displayPhase.name}
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                {displayPhase.description} (Running {formatDateRange(displayPhase)})
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono">
              <div className="p-3 rounded-xl bg-surface-2 border border-white/10 text-center min-w-20">
                <span className="text-lg font-black text-white block">
                  {daysToSprint > 0 ? daysToSprint : 0}
                </span>
                <span className="text-[9px] text-text-muted uppercase">Days to Sprint</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-2 border border-white/10 text-center min-w-20">
                <span className="text-lg font-black text-red-bright block">{SEASON_LABEL}</span>
                <span className="text-[9px] text-text-muted uppercase">Season</span>
              </div>
            </div>
          </div>

          {/* Analytics Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Registration Growth Chart */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-sm text-white">
                  Cumulative Registrations Growth
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-2 text-text-muted border border-white/5">
                  Sample projection
                </span>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={registrationTimelineData} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
                    <YAxis width={40} stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
                    <Tooltip
                      allowEscapeViewBox={{ x: false, y: false }}
                      wrapperStyle={{ zIndex: 50, outline: "none" }}
                      contentStyle={{ backgroundColor: "#0B0B0D", borderRadius: "10px" }}
                    />
                    <Area type="monotone" dataKey="count" stroke="#EF4444" fill="url(#regGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stakeholders by Role Breakdown */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-sm text-white">
                  Stakeholders by Role Distribution
                </h4>
                <span className="text-[10px] font-mono text-text-muted">
                  Total Users: {isDemo ? 1657 : 0}
                </span>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roleDistributionData} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
                    <XAxis dataKey="role" stroke="#666" tick={{ fill: "#888", fontSize: 10 }} />
                    <YAxis width={40} stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
                    <Tooltip
                      allowEscapeViewBox={{ x: false, y: false }}
                      wrapperStyle={{ zIndex: 50, outline: "none" }}
                      contentStyle={{ backgroundColor: "#0B0B0D", borderRadius: "10px" }}
                    />
                    <Bar dataKey="count" fill="#EF4444" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Projects by Domain (Kept Separate) */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-sm text-white">
                  Projects by Domain
                </h4>
                <span className="text-[10px] font-mono text-text-muted">
                  {projects.length} Total Repositories
                </span>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={domainBreakdownData} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
                    <XAxis dataKey="domain" stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
                    <YAxis width={40} stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
                    <Tooltip
                      allowEscapeViewBox={{ x: false, y: false }}
                      wrapperStyle={{ zIndex: 50, outline: "none" }}
                      contentStyle={{ backgroundColor: "#0B0B0D", borderRadius: "10px" }}
                    />
                    <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APPROVALS QUEUE */}
      {activeTab === "approvals" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-xl text-white">Organizer Approvals Queue</h2>
              <p className="text-xs text-text-secondary">
                Review and approve incoming repositories, mentors, ambassadors, and project leads.
              </p>
            </div>

            {/* Bulk Action Button */}
            <button
              onClick={() => handleBulkApprove(approvalsTab as "projects" | "mentors" | "project_admins")}
              className="px-4 py-2 rounded-xl bg-green-500/20 text-green-300 border border-green-500/40 text-xs font-mono font-bold hover:bg-green-500/30 self-start sm:self-auto"
            >
              Bulk Approve All Pending
            </button>
          </div>

          {/* Sub-Tabs Bar */}
          <div className="flex border-b border-white/10 gap-4 text-xs font-mono">
            <button
              onClick={() => setApprovalsTab("projects")}
              className={`pb-2.5 font-bold transition-colors ${
                approvalsTab === "projects"
                  ? "border-b-2 border-red-bright text-white"
                  : "text-text-muted hover:text-white"
              }`}
            >
              Repositories ({pendingProjects.length})
            </button>
            <button
              onClick={() => setApprovalsTab("mentors")}
              className={`pb-2.5 font-bold transition-colors ${
                approvalsTab === "mentors"
                  ? "border-b-2 border-red-bright text-white"
                  : "text-text-muted hover:text-white"
              }`}
            >
              Mentors ({pendingMentors.length})
            </button>
            <button
              onClick={() => setApprovalsTab("project_admins")}
              className={`pb-2.5 font-bold transition-colors ${
                approvalsTab === "project_admins"
                  ? "border-b-2 border-red-bright text-white"
                  : "text-text-muted hover:text-white"
              }`}
            >
              Project Leads ({pendingProjectAdmins.length})
            </button>
          </div>

          {/* Sub-Tab 1: Projects Queue */}
          {approvalsTab === "projects" && (
            <div className="space-y-3">
              {pendingProjects.length === 0 ? (
                <div className="glass-card p-12 rounded-3xl border border-white/10 text-center text-xs text-text-muted">
                  No repository submissions pending review!
                </div>
              ) : (
                pendingProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-2xl bg-surface-1 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-white text-base">{p.name}</span>
                        <span className="px-2 py-0.5 rounded bg-surface-2 text-[10px] font-mono text-text-muted">
                          {p.domain}
                        </span>
                      </div>
                      <p className="text-text-secondary">{p.tagline || p.description}</p>
                      {p.repository_url ? (
                        <a
                          href={p.repository_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-mono text-red-bright hover:underline flex items-center gap-1"
                        >
                          <span>{p.repository_url}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span
                          title="Sample repository (not a real link)"
                          className="text-[11px] font-mono text-text-muted/60 flex items-center gap-1 cursor-not-allowed"
                        >
                          <span>Sample repository (not a real link)</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleApproveProject(p.id)}
                        className="px-4 py-2 rounded-xl bg-green-500/20 text-green-300 border border-green-500/40 font-mono font-bold text-xs hover:bg-green-500/30"
                      >
                        Approve Repo
                      </button>
                      <button
                        onClick={() =>
                          setRejectionModal({
                            isOpen: true,
                            type: "project",
                            targetId: p.id,
                            targetName: p.name,
                          })
                        }
                        className="px-4 py-2 rounded-xl bg-red-primary/20 text-red-bright border border-red-primary/40 font-mono font-bold text-xs hover:bg-red-primary/30"
                      >
                        Reject...
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Sub-Tab 2: Mentors Queue */}
          {approvalsTab === "mentors" && (
            <div className="space-y-3">
              {pendingMentors.length === 0 ? (
                <div className="glass-card p-12 rounded-3xl border border-white/10 text-center text-xs text-text-muted">
                  No mentor applications pending review!
                </div>
              ) : (
                pendingMentors.map((m) => (
                  <div
                    key={m.id}
                    className="p-5 rounded-2xl bg-surface-1 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-white text-base">{m.full_name}</span>
                        <span className="text-[11px] font-mono text-text-muted">@{m.github_username}</span>
                      </div>
                      <p className="text-text-secondary">{m.bio}</p>
                      <div className="text-[10px] font-mono text-text-muted">
                        Domains: {m.expertise_domains.join(", ")} · Availability: {m.weekly_availability_hours} hrs/week
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          reviewMentorApplication(m.id, "approved", "Welcome to OWOC 2026!");
                          showToast(`Approved mentor application for ${m.full_name}.`);
                        }}
                        className="px-4 py-2 rounded-xl bg-green-500/20 text-green-300 border border-green-500/40 font-mono font-bold text-xs hover:bg-green-500/30"
                      >
                        Approve Mentor
                      </button>
                      <button
                        onClick={() =>
                          setRejectionModal({
                            isOpen: true,
                            type: "mentor",
                            targetId: m.id,
                            targetName: m.full_name,
                          })
                        }
                        className="px-4 py-2 rounded-xl bg-red-primary/20 text-red-bright border border-red-primary/40 font-mono font-bold text-xs hover:bg-red-primary/30"
                      >
                        Reject...
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Sub-Tab 3: Project Admins Queue */}
          {approvalsTab === "project_admins" && (
            <div className="space-y-3">
              {pendingProjectAdmins.length === 0 ? (
                <div className="glass-card p-12 rounded-3xl border border-white/10 text-center text-xs text-text-muted">
                  No Project Admin applications pending review!
                </div>
              ) : (
                pendingProjectAdmins.map((pa) => (
                  <div
                    key={pa.id}
                    className="p-5 rounded-2xl bg-surface-1 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-white text-base">{pa.full_name}</span>
                        <span className="text-[11px] font-mono text-text-muted">@{pa.github_username}</span>
                      </div>
                      <div className="text-white font-mono">Project: {pa.project_name}</div>
                      {pa.repo_url ? (
                        <a
                          href={pa.repo_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-mono text-red-bright hover:underline flex items-center gap-1"
                        >
                          <span>{pa.repo_url}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span
                          title="Sample repository (not a real link)"
                          className="text-[11px] font-mono text-text-muted/60 flex items-center gap-1 cursor-not-allowed"
                        >
                          <span>Sample repository (not a real link)</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          reviewProjectAdminApplication(pa.id, "approved", "Approved as maintainer.");
                          showToast(`Approved Project Lead ${pa.full_name}.`);
                        }}
                        className="px-4 py-2 rounded-xl bg-green-500/20 text-green-300 border border-green-500/40 font-mono font-bold text-xs hover:bg-green-500/30"
                      >
                        Approve Lead
                      </button>
                      <button
                        onClick={() =>
                          setRejectionModal({
                            isOpen: true,
                            type: "project_admin",
                            targetId: pa.id,
                            targetName: pa.full_name,
                          })
                        }
                        className="px-4 py-2 rounded-xl bg-red-primary/20 text-red-bright border border-red-primary/40 font-mono font-bold text-xs hover:bg-red-primary/30"
                      >
                        Reject...
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: USER MANAGEMENT */}
      {activeTab === "users" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-xl text-white">Registered Users Directory</h2>
              <p className="text-xs text-text-secondary">
                Search, inspect user roles, assign clearances, or suspend accounts.
              </p>
            </div>

            <button
              onClick={() =>
                exportCSV(
                  "owoc_users_directory",
                  ["ID", "Name", "Email", "Role", "College", "Points", "Status"],
                  users.map((u) => [u.id, u.name, u.email, u.role, u.college, u.points, u.status])
                )
              }
              className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-1 text-white border border-white/10 text-xs font-mono flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Users CSV</span>
            </button>
          </div>

          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 rounded-2xl bg-surface-1 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <AvatarDisplay name={user.name} size="sm" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{user.name}</span>
                      <StatusBadge status={user.role} size="sm" />
                      {user.status === "suspended" && <StatusBadge status="suspended" size="sm" />}
                    </div>
                    <div className="text-[11px] font-mono text-text-muted mt-0.5">
                      {user.email} · {user.college} · {user.points} pts
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <label htmlFor={`assign-role-${user.id}`} className="sr-only">
                      Assign role for {user.name}
                    </label>
                    <select
                      id={`assign-role-${user.id}`}
                      data-testid={`assign-role-select-${user.id}`}
                      value={user.role}
                      onChange={(e) => {
                        const newRole = e.target.value as StandardRole;
                        if (newRole === user.role) return;

                        // Prevent self-demotion
                        if (user.id === "u-admin" && newRole !== "super_admin") {
                          showToast("Action Blocked: Super Admins cannot self-demote or revoke their own clearance.");
                          return;
                        }

                        openConfirm(
                          "Confirm Role Assignment",
                          `Change role for ${user.name} from "${user.role.replace("_", " ")}" to "${newRole.replace("_", " ")}"? This updates their permissions immediately.`,
                          () => {
                            const oldRole = user.role;
                            setUsers((prev) =>
                              prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
                            );
                            addAuditLog({
                              action: "assign_role",
                              target_type: "user",
                              target_id: user.id,
                              details_before: { role: oldRole },
                              details_after: { role: newRole, from: oldRole, to: newRole },
                            });
                            showToast(`Assigned role: ${user.name} is now ${newRole.replace("_", " ")}.`);
                          },
                          undefined,
                          false
                        );
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-surface-2 hover:bg-surface-1 border border-white/10 font-mono text-[11px] text-white focus:outline-none focus:border-red-primary/60 cursor-pointer"
                    >
                      <option value="contributor">Contributor</option>
                      <option value="project_admin">Project Admin</option>
                      <option value="mentor">Mentor</option>
                      <option value="ambassador">Campus Ambassador</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  </div>

                  {user.status !== "suspended" ? (
                    <button
                      onClick={() =>
                        setRejectionModal({
                          isOpen: true,
                          type: "disqualify",
                          targetId: user.id,
                          targetName: user.name,
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-red-primary/20 text-red-bright border border-red-primary/40 font-mono text-[11px] font-bold hover:bg-red-primary/30"
                    >
                      Suspend / Disqualify
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setUsers((prev) =>
                          prev.map((u) => (u.id === user.id ? { ...u, status: "active" } : u))
                        );
                        showToast(`Reactivated ${user.name}.`);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-300 border border-green-500/40 font-mono text-[11px] font-bold"
                    >
                      Reactivate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PROJECTS MODERATION */}
      {activeTab === "projects" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-xl text-white">Projects Directory & Showcase</h2>
              <p className="text-xs text-text-secondary">
                Control public visibility, feature projects on home page, and moderate repositories.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-2xl bg-surface-1 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-white text-base">{proj.name}</span>
                    <StatusBadge status={proj.status} size="sm" />
                    {proj.is_featured && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Featured on Home</span>
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-text-muted mt-1">
                    Domain: {proj.domain} · Issues: {proj.open_issues_count} · Maintainer: {proj.maintainer_name}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const nextFeatured = !proj.is_featured;
                      setProjects(
                        projects.map((p) => (p.id === proj.id ? { ...p, is_featured: nextFeatured } : p))
                      );
                      showToast(nextFeatured ? `Featured ${proj.name} on Home!` : `Unfeatured ${proj.name}.`);
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono font-bold flex items-center gap-1.5 ${
                      proj.is_featured
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                        : "bg-surface-2 border-white/10 text-text-muted hover:text-white"
                    }`}
                  >
                    <Star className="w-3.5 h-3.5" />
                    <span>{proj.is_featured ? "Featured" : "Feature"}</span>
                  </button>

                  <button
                    onClick={() => {
                      openConfirm(
                        `Delete ${proj.name}?`,
                        "Are you sure you want to remove this repository from OWOC 2026? This action is irreversible.",
                        () => {
                          setProjects(projects.filter((p) => p.id !== proj.id));
                          addAuditLog({
                            action: "delete_project",
                            target_type: "project",
                            target_id: proj.id,
                            details_after: { name: proj.name },
                          });
                          showToast(`Removed repository ${proj.name}.`);
                        },
                        "DELETE"
                      );
                    }}
                    className="p-2 rounded-xl bg-red-primary/20 text-red-bright border border-red-primary/40 hover:bg-red-primary/30"
                    aria-label="Remove repository"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: POINTS & RULES CONFIG */}
      {activeTab === "rules" && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 max-w-2xl space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-red-bright font-bold tracking-wider">
                SCORING ENGINE CONFIGURATION · V{editableRules.version}
              </span>
              <span className="text-[10px] font-mono text-text-muted">
                Last modified: {new Date(pointsRules.updated_at).toLocaleDateString()}
              </span>
            </div>
            <h2 className="font-heading font-black text-2xl text-white mt-1">
              Points & Rules Configuration
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              All scoring adjustments are versioned and logged in the immutable audit log.
            </p>
          </div>

          <form onSubmit={handleSaveRules} className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-white font-bold block">Easy Issue (pts)</label>
                <input
                  type="number"
                  value={editableRules.easy_points}
                  onChange={(e) =>
                    setEditableRules({ ...editableRules, easy_points: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white font-bold block">Medium Issue (pts)</label>
                <input
                  type="number"
                  value={editableRules.medium_points}
                  onChange={(e) =>
                    setEditableRules({ ...editableRules, medium_points: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white font-bold block">Hard Issue (pts)</label>
                <input
                  type="number"
                  value={editableRules.hard_points}
                  onChange={(e) =>
                    setEditableRules({ ...editableRules, hard_points: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-white font-bold block">Streak Bonus (pts)</label>
                <input
                  type="number"
                  value={editableRules.streak_bonus}
                  onChange={(e) =>
                    setEditableRules({ ...editableRules, streak_bonus: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white font-bold block">Max Quality Bonus (pts)</label>
                <input
                  type="number"
                  value={editableRules.quality_bonus_max}
                  onChange={(e) =>
                    setEditableRules({ ...editableRules, quality_bonus_max: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-white/10 text-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-mono font-bold shadow-red-glow-sm"
            >
              Update Rules (Increments Version)
            </button>
          </form>
        </div>
      )}

      {/* TAB 6: PODIUM INTEGRITY & LEADERBOARD CONTROL */}
      {activeTab === "leaderboard" && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="font-heading font-bold text-lg text-white">Podium State Controls</h3>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <button
                onClick={handleToggleFreezeLeaderboard}
                className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 ${
                  leaderboardSettings.is_frozen
                    ? "bg-blue-600 text-white"
                    : "bg-surface-2 text-text-secondary hover:text-white border border-white/10"
                }`}
              >
                {leaderboardSettings.is_frozen ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                <span>{leaderboardSettings.is_frozen ? "Unfreeze Public Standings" : "Freeze Leaderboard"}</span>
              </button>

              <button
                onClick={() => {
                  showToast("Leaderboard recalculated from points ledger.");
                }}
                className="px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-1 text-white border border-white/10 font-bold flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Force Recalculate Points</span>
              </button>
            </div>
          </div>

          {/* Suspicious Activity Review Queue */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-white">
                Suspicious Activity Detection
              </h3>
              <span className="text-[10px] font-mono text-amber-400">1 Flagged Entry</span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-1 border border-amber-500/30 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="font-bold text-white">Suspicious User (@sus-botnet)</span>
                <p className="text-text-muted mt-0.5">
                  Anomaly: 6 pull requests merged within 4 minutes on repository "OpenPay SDK".
                </p>
              </div>

              <button
                onClick={() =>
                  setRejectionModal({
                    isOpen: true,
                    type: "disqualify",
                    targetId: "u-5",
                    targetName: "Suspicious User",
                  })
                }
                className="px-3 py-1.5 rounded-xl bg-red-primary/20 text-red-bright border border-red-primary/40 font-bold hover:bg-red-primary/30"
              >
                Disqualify
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: BADGES MANAGER */}
      {activeTab === "badges" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-xl text-white">Badge Definitions</h2>
              <p className="text-xs text-text-secondary">
                Configure milestone achievements and tiers awarded automatically on trigger events.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges.map((b) => (
              <div key={b.code} className="p-5 rounded-2xl bg-surface-1 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-white text-base">{b.title}</span>
                  <StatusBadge status={b.tier} size="sm" />
                </div>
                <div className="text-[11px] font-mono text-red-bright">CODE: {b.code}</div>
                <p className="text-text-secondary">Award Rule: {b.rule}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: CONTENT & SPONSORS MODERATION */}
      {activeTab === "content" && (
        <div className="space-y-6">
          <div>
            <h2 className="font-heading font-bold text-xl text-white">Sponsors & Partners Moderation</h2>
            <p className="text-xs text-text-secondary">
              Only sponsors with <strong>Confirmed</strong> status will render on the public site and footer.
            </p>
          </div>

          <div className="space-y-3">
            {sponsors.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-surface-1 border border-white/10 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-white">{s.name}</span>
                  <span className="text-[10px] font-mono text-text-muted ml-3">Tier: {s.tier}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleSponsorConfirmed(s.id)}
                    className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono font-bold flex items-center gap-1.5 ${
                      s.confirmed
                        ? "bg-green-500/20 border-green-500/40 text-green-300"
                        : "bg-surface-2 border-white/10 text-text-muted hover:text-white"
                    }`}
                  >
                    {s.confirmed ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    <span>{s.confirmed ? "Confirmed & Public" : "Draft / Unconfirmed"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: CERTIFICATES ISSUANCE CENTER */}
      {activeTab === "certificates" && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 max-w-2xl space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase text-red-bright font-bold tracking-wider">
              END-OF-SEASON ACCREDITATION
            </span>
            <h2 className="font-heading font-black text-2xl text-white mt-1">
              Certificates Issuance Engine
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Issue verified Digital Certificates of Participation and Leadership. Unique serial format:{" "}
              <code className="text-white">OWOC-2026-X-XXXX</code> with SHA-256 verification hash and QR link.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-1 border border-white/10 space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Target Season:</span>
              <span className="text-white font-bold">{SEASON_SHORT} (Dec 2026)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Issuance Status:</span>
              <span className="text-amber-400 font-bold">
                {issuedCertificatesCount > 0 ? `${issuedCertificatesCount} Issued` : "Pending Phase 5 (Dec 31)"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleIssueCertificates}
              className="px-5 py-2.5 rounded-xl bg-red-primary hover:bg-red-bright text-white text-xs font-mono font-bold shadow-red-glow-sm flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Bulk Generate & Issue All Certs</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 10: SEASON SETTINGS (Read-Only Single Source of Truth) */}
      {activeTab === "season" && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 max-w-2xl space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-red-bright uppercase font-bold tracking-wider">
                SINGLE SOURCE OF TRUTH
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-2 text-[10px] font-mono text-text-muted">
                Read-Only
              </span>
            </div>
            <h2 className="font-heading font-black text-2xl text-white mt-1">
              Season 2026 Phase Configuration
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Derived strictly from <code className="text-red-bright font-mono">src/lib/season.ts</code>. All dates, season labels, and duration calculations across the site derive from this configuration.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {PHASES.map((phase) => (
              <div key={phase.id} className="p-3.5 rounded-xl bg-surface-1 border border-white/10 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">
                    Phase {phase.id}: {phase.name}
                  </span>
                  <span className="text-red-bright font-bold">
                    {phase.startDate} &rarr; {phase.endDate}
                  </span>
                </div>
                <p className="text-[11px] text-text-muted">{phase.description}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-surface-2 border border-white/5 text-[11px] font-mono text-text-muted">
            To edit program schedule, update <code className="text-white">src/lib/season.ts</code>. The platform automatically recalibrates duration phrases, deadlines, and countdowns.
          </div>
        </div>
      )}

      {/* TAB 11: SYSTEM AUDIT LOG */}
      {activeTab === "logs" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-xl text-white">Immutable Audit Log</h2>
              <p className="text-xs text-text-secondary">
                Non-editable history of administrative actions, role assignments, and score overrides.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-xl bg-surface-1 border border-white/10 flex items-center justify-between text-xs font-mono"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-bright font-bold uppercase">{log.action.replace("_", " ")}</span>
                    <span className="text-white">({log.target_type}: {log.target_id})</span>
                  </div>
                  <div className="text-[10px] text-text-muted mt-0.5">
                    Actor: {log.admin_email} · Time: {log.created_at}
                  </div>
                </div>

                <div className="text-[10px] text-text-muted bg-surface-2 px-2 py-1 rounded-lg">
                  Verified
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 12: DATA EXPORT CSV */}
      {activeTab === "exports" && (
        <div className="space-y-4 max-w-2xl">
          <div>
            <h2 className="font-heading font-bold text-xl text-white">Data Export Center</h2>
            <p className="text-xs text-text-secondary">
              Generate one-click CSV dumps for external reporting, certificates dispatch, and analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() =>
                exportCSV(
                  "owoc_users",
                  ["ID", "Name", "Email", "Role", "College", "Points"],
                  users.map((u) => [u.id, u.name, u.email, u.role, u.college, u.points])
                )
              }
              className="p-5 rounded-2xl bg-surface-1 hover:bg-surface-2 border border-white/10 text-left space-y-2 transition-colors"
            >
              <div className="flex items-center justify-between">
                <Users className="w-5 h-5 text-red-bright" />
                <Download className="w-4 h-4 text-text-muted" />
              </div>
              <div className="font-bold text-white text-sm">Export Users CSV</div>
              <p className="text-xs text-text-secondary">Complete roster with roles, colleges, and score totals.</p>
            </button>

            <button
              onClick={() =>
                exportCSV(
                  "owoc_projects",
                  ["ID", "Name", "Repo", "Domain", "Status", "Maintainer"],
                  projects.map((p) => [p.id, p.name, p.repository_url, p.domain, p.status, p.maintainer_name])
                )
              }
              className="p-5 rounded-2xl bg-surface-1 hover:bg-surface-2 border border-white/10 text-left space-y-2 transition-colors"
            >
              <div className="flex items-center justify-between">
                <FolderGit2 className="w-5 h-5 text-blue-400" />
                <Download className="w-4 h-4 text-text-muted" />
              </div>
              <div className="font-bold text-white text-sm">Export Projects CSV</div>
              <p className="text-xs text-text-secondary">All registered and vetted repository listings.</p>
            </button>

            <button
              onClick={() =>
                exportCSV(
                  "owoc_pull_requests",
                  ["ID", "PR_Number", "Title", "Project", "Contributor", "Difficulty", "Status"],
                  pullRequests.map((pr) => [
                    pr.id,
                    pr.pr_number,
                    pr.title,
                    pr.project_name,
                    pr.contributor_name,
                    pr.difficulty,
                    pr.status,
                  ])
                )
              }
              className="p-5 rounded-2xl bg-surface-1 hover:bg-surface-2 border border-white/10 text-left space-y-2 transition-colors"
            >
              <div className="flex items-center justify-between">
                <GitPullRequest className="w-5 h-5 text-purple-400" />
                <Download className="w-4 h-4 text-text-muted" />
              </div>
              <div className="font-bold text-white text-sm">Export Pull Requests CSV</div>
              <p className="text-xs text-text-secondary">PR submissions, triage status, and review logs.</p>
            </button>

            <button
              onClick={() =>
                exportCSV(
                  "owoc_points_ledger",
                  ["ID", "User_ID", "Points", "Reason", "Type", "Awarded_By", "Date"],
                  [
                    ["pl-1", "u-1", 100, "PR #14 Merge", "pr_merge", "Dr. Aris Thorne", "2026-12-05"],
                    ["pl-2", "u-1", 10, "Quality Bonus", "quality_bonus", "Dr. Aris Thorne", "2026-12-05"],
                  ]
                )
              }
              className="p-5 rounded-2xl bg-surface-1 hover:bg-surface-2 border border-white/10 text-left space-y-2 transition-colors"
            >
              <div className="flex items-center justify-between">
                <Award className="w-5 h-5 text-amber-400" />
                <Download className="w-4 h-4 text-text-muted" />
              </div>
              <div className="font-bold text-white text-sm">Export Points Ledger CSV</div>
              <p className="text-xs text-text-secondary">Full itemized history of points awarded to contributors.</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
