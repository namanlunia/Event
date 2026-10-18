"use client";

import { useState, useEffect } from "react";
import {
  Project,
  PullRequest,
  UserRole,
  StandardRole,
  MentorApplication,
  ProjectAdminApplication,
  ContributorProjectApplication,
  PointsLedgerItem,
  PointsRulesConfig,
  LeaderboardSettings,
  OfficeHoursSession,
  MentorFeedbackRecord,
  ProjectAnnouncement,
  InAppNotification,
  AuditLogItem,
  SiteSettings,
} from "@/types";
import {
  MOCK_PROJECTS,
  MOCK_PRS,
  MOCK_MENTOR_APPLICATIONS,
  MOCK_PROJECT_ADMIN_APPLICATIONS,
  MOCK_CONTRIBUTOR_APPLICATIONS,
  MOCK_POINTS_LEDGER,
  MOCK_POINTS_RULES,
  MOCK_LEADERBOARD_SETTINGS,
  MOCK_OFFICE_HOURS,
  MOCK_MENTOR_FEEDBACK,
  MOCK_PROJECT_ANNOUNCEMENTS,
  MOCK_NOTIFICATIONS,
  MOCK_AUDIT_LOGS,
  MOCK_SITE_SETTINGS,
} from "@/lib/demo-data";
import { SITE_CONFIG } from "@/lib/site-config";

export interface DemoPersona {
  role: StandardRole;
  title: string;
  name: string;
  email: string;
  avatar: string;
  dashboardUrl: string;
  badge: string;
  allowedRoles: StandardRole[];
}

export const DEMO_PERSONAS: DemoPersona[] = [
  {
    role: "contributor",
    title: "Student Contributor",
    name: "Sample Contributor",
    email: "contributor@example.com",
    avatar: "",
    dashboardUrl: "/dashboard/contributor",
    badge: "Student Contributor",
    allowedRoles: ["contributor"],
  },
  {
    role: "project_admin",
    title: "Project Admin",
    name: "Sample Maintainer",
    email: "maintainer@example.com",
    avatar: "",
    dashboardUrl: "/dashboard/project-admin",
    badge: "Project Maintainer",
    allowedRoles: ["project_admin", "contributor"],
  },
  {
    role: "mentor",
    title: "Technical Mentor",
    name: "Sample Mentor",
    email: "mentor@example.com",
    avatar: "",
    dashboardUrl: "/dashboard/mentor",
    badge: "Technical Mentor",
    allowedRoles: ["mentor", "contributor"],
  },
  {
    role: "super_admin",
    title: "Super Admin",
    name: "OWOC Admin",
    email: "admin@example.com",
    avatar: "",
    dashboardUrl: "/dashboard/admin",
    badge: "Program Organizer",
    allowedRoles: ["super_admin", "project_admin", "mentor", "contributor", "ambassador"],
  },
  {
    role: "ambassador",
    title: "Campus Ambassador",
    name: "Sample Ambassador",
    email: "ambassador@example.com",
    avatar: "",
    dashboardUrl: "/dashboard/ambassador",
    badge: "Campus Ambassador",
    allowedRoles: ["ambassador", "contributor"],
  },
];

export function normalizeRole(role: string): StandardRole {
  if (role === "maintainer") return "project_admin";
  if (role === "admin") return "super_admin";
  if (["super_admin", "project_admin", "mentor", "contributor", "ambassador"].includes(role)) {
    return role as StandardRole;
  }
  return "contributor";
}

const STORAGE_KEY_ROLE = "owoc_active_role";
const STORAGE_KEY_PROJECTS = "owoc_projects_data";
const STORAGE_KEY_PRS = "owoc_prs_data";
const STORAGE_KEY_NOTIFS = "owoc_notifs_data";

export function useAppStore() {
  const [currentPersona, setCurrentPersona] = useState<DemoPersona>(DEMO_PERSONAS[0]);
  const [projects, setProjects] = useState<Project[]>(SITE_CONFIG.DEMO_MODE ? MOCK_PROJECTS : []);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>(SITE_CONFIG.DEMO_MODE ? MOCK_PRS : []);
  const [mentorApplications, setMentorApplications] = useState<MentorApplication[]>(
    SITE_CONFIG.DEMO_MODE ? MOCK_MENTOR_APPLICATIONS : []
  );
  const [projectAdminApplications, setProjectAdminApplications] = useState<ProjectAdminApplication[]>(
    SITE_CONFIG.DEMO_MODE ? MOCK_PROJECT_ADMIN_APPLICATIONS : []
  );
  const [contributorApplications, setContributorApplications] = useState<ContributorProjectApplication[]>(
    SITE_CONFIG.DEMO_MODE ? MOCK_CONTRIBUTOR_APPLICATIONS : []
  );
  const [pointsLedger, setPointsLedger] = useState<PointsLedgerItem[]>(
    SITE_CONFIG.DEMO_MODE ? MOCK_POINTS_LEDGER : []
  );
  const [pointsRules, setPointsRules] = useState<PointsRulesConfig>(
    SITE_CONFIG.DEMO_MODE ? MOCK_POINTS_RULES : {
      easy_points: 10,
      medium_points: 25,
      hard_points: 50,
      streak_bonus: 15,
      quality_bonus_max: 10,
      daily_cap: 100,
      version: 1,
      updated_at: new Date().toISOString()
    }
  );
  const [leaderboardSettings, setLeaderboardSettings] = useState<LeaderboardSettings>(
    SITE_CONFIG.DEMO_MODE ? MOCK_LEADERBOARD_SETTINGS : {
      is_frozen: false,
      disqualified_user_ids: [],
      last_recalculated_at: new Date().toISOString()
    }
  );
  const [officeHours, setOfficeHours] = useState<OfficeHoursSession[]>(
    SITE_CONFIG.DEMO_MODE ? MOCK_OFFICE_HOURS : []
  );
  const [mentorFeedback, setMentorFeedback] = useState<MentorFeedbackRecord[]>(
    SITE_CONFIG.DEMO_MODE ? MOCK_MENTOR_FEEDBACK : []
  );
  const [projectAnnouncements, setProjectAnnouncements] = useState<ProjectAnnouncement[]>(
    SITE_CONFIG.DEMO_MODE ? MOCK_PROJECT_ANNOUNCEMENTS : []
  );
  const [notifications, setNotifications] = useState<InAppNotification[]>(
    SITE_CONFIG.DEMO_MODE ? MOCK_NOTIFICATIONS : []
  );
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(
    SITE_CONFIG.DEMO_MODE ? MOCK_AUDIT_LOGS : []
  );
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(
    SITE_CONFIG.DEMO_MODE ? MOCK_SITE_SETTINGS : {
      contact_email: "contact@omnikon.org",
      conduct_email: "conduct@omnikon.org",
      twitter_url: "",
      linkedin_url: "",
      github_url: "",
      discord_url: "",
      ambassador_rewards_config: {
        bronze_threshold: 10,
        silver_threshold: 25,
        gold_threshold: 50,
        master_threshold: 100
      },
      updated_at: new Date().toISOString()
    }
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedRole = localStorage.getItem(STORAGE_KEY_ROLE);
      if (savedRole) {
        const normalized = normalizeRole(savedRole);
        const found = DEMO_PERSONAS.find((p) => p.role === normalized);
        if (found) setCurrentPersona(found);
      }

      if (SITE_CONFIG.DEMO_MODE) {
        const savedProjects = localStorage.getItem(STORAGE_KEY_PROJECTS);
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects));
        }

        const savedPrs = localStorage.getItem(STORAGE_KEY_PRS);
        if (savedPrs) {
          setPullRequests(JSON.parse(savedPrs));
        }

        const savedNotifs = localStorage.getItem(STORAGE_KEY_NOTIFS);
        if (savedNotifs) {
          setNotifications(JSON.parse(savedNotifs));
        }
      }
    } catch (e) {
      console.warn("Storage hydration notice:", e);
    }
    setIsHydrated(true);
  }, []);

  const switchRole = (role: UserRole | string) => {
    const normalized = normalizeRole(role);
    const persona = DEMO_PERSONAS.find((p) => p.role === normalized) || DEMO_PERSONAS[0];
    setCurrentPersona(persona);
    try {
      localStorage.setItem(STORAGE_KEY_ROLE, normalized);
    } catch {}
  };

  const addProject = (projectData: Omit<Project, "id" | "created_at" | "status">) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      created_at: new Date().toISOString().split("T")[0],
      status: "pending",
      open_issues_count: projectData.open_issues_count || 0,
      stars_count: projectData.stars_count || 0,
      forks_count: projectData.forks_count || 0,
      mentor_ids: projectData.mentor_ids || [],
    };
    const updated = [newProject, ...projects];
    setProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));
    } catch {}

    addNotification({
      title: "Project Submitted",
      message: `"${newProject.name}" has been submitted for Super Admin review.`,
      type: "info",
      role: "project_admin",
      link: "/dashboard/project-admin",
    });

    addAuditLog({
      action: "submit_project",
      target_type: "project",
      target_id: newProject.id,
      details_after: { name: newProject.name, repo: newProject.repository_url },
    });

    return newProject;
  };

  const updateProject = (projectId: string, partial: Partial<Project>) => {
    const updated = projects.map((p) => (p.id === projectId ? { ...p, ...partial } : p));
    setProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));
    } catch {}
  };

  const approveProject = (projectId: string, reviewNotes: string = "") => {
    const updated = projects.map((p) =>
      p.id === projectId
        ? {
            ...p,
            status: "approved" as const,
            admin_review_notes: reviewNotes,
            reviewed_at: new Date().toISOString(),
          }
        : p
    );
    setProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));
    } catch {}

    const target = projects.find((p) => p.id === projectId);
    addNotification({
      title: "Project Approved!",
      message: `Repository "${target?.name || projectId}" is now approved for OWOC 2026.`,
      type: "success",
      role: "project_admin",
      link: `/projects/${target?.slug || ""}`,
    });

    addAuditLog({
      action: "approve_project",
      target_type: "project",
      target_id: projectId,
      details_after: { status: "approved", notes: reviewNotes },
    });
  };

  const rejectProject = (projectId: string, reason: string = "") => {
    const updated = projects.map((p) =>
      p.id === projectId
        ? {
            ...p,
            status: "rejected" as const,
            admin_review_notes: reason,
            reviewed_at: new Date().toISOString(),
          }
        : p
    );
    setProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));
    } catch {}

    const target = projects.find((p) => p.id === projectId);
    addNotification({
      title: "Project Decision Update",
      message: `Repository "${target?.name || projectId}" was not approved: ${reason || "Does not meet requirements."}`,
      type: "alert",
      role: "project_admin",
      link: "/dashboard/project-admin",
    });

    addAuditLog({
      action: "reject_project",
      target_type: "project",
      target_id: projectId,
      details_after: { status: "rejected", reason },
    });
  };

  const mergePR = (prId: string, qualityBonus: number = 0) => {
    const targetPR = pullRequests.find((pr) => pr.id === prId);
    const updated = pullRequests.map((pr) => {
      if (pr.id === prId) {
        return {
          ...pr,
          status: "merged" as const,
          quality_bonus: qualityBonus,
          merged_at: new Date().toISOString(),
        };
      }
      return pr;
    });
    setPullRequests(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PRS, JSON.stringify(updated));
    } catch {}

    if (targetPR) {
      const basePoints = targetPR.points_awarded || (targetPR.difficulty === "Hard" ? 50 : targetPR.difficulty === "Medium" ? 25 : 10);
      awardPoints({
        user_id: targetPR.contributor_id,
        points: basePoints + qualityBonus,
        reason: `Merged PR #${targetPR.pr_number} on ${targetPR.project_name}${qualityBonus > 0 ? ` (+${qualityBonus} quality bonus)` : ""}`,
        type: "pr_merge",
        reference_id: targetPR.id,
      });

      addNotification({
        title: "Pull Request Merged!",
        message: `Your PR #${targetPR.pr_number} was merged. +${basePoints + qualityBonus} points awarded!`,
        type: "success",
        role: "contributor",
        link: "/dashboard/contributor",
      });
    }
  };

  const reviewPR = (prId: string, status: "approved" | "rejected" | "pending", feedback: string, qualityScore: number = 0) => {
    const updated = pullRequests.map((pr) => {
      if (pr.id === prId) {
        return {
          ...pr,
          status,
          mentor_feedback: feedback,
          quality_bonus: qualityScore,
        };
      }
      return pr;
    });
    setPullRequests(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PRS, JSON.stringify(updated));
    } catch {}

    const targetPR = pullRequests.find((pr) => pr.id === prId);
    if (targetPR) {
      addNotification({
        title: `PR Review: ${status.toUpperCase()}`,
        message: `Mentor reviewed PR #${targetPR.pr_number}: ${feedback.slice(0, 80)}...`,
        type: status === "approved" ? "success" : "warning",
        role: "contributor",
        link: "/dashboard/contributor",
      });
    }
  };

  const addPR = (pr: Omit<PullRequest, "id" | "created_at">) => {
    const newPR: PullRequest = {
      ...pr,
      id: `pr-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const updated = [newPR, ...pullRequests];
    setPullRequests(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PRS, JSON.stringify(updated));
    } catch {}

    addNotification({
      title: "New PR Submitted",
      message: `PR #${newPR.pr_number} submitted on ${newPR.project_name}.`,
      type: "info",
      role: "mentor",
      link: "/dashboard/mentor#reviews",
    });

    return newPR;
  };

  const awardPoints = (item: Omit<PointsLedgerItem, "id" | "created_at">) => {
    const newRecord: PointsLedgerItem = {
      ...item,
      id: `pl-${Date.now()}`,
      awarded_by: item.awarded_by || currentPersona.name,
      created_at: new Date().toISOString(),
    };
    setPointsLedger((prev) => [newRecord, ...prev]);
  };

  const addNotification = (notif: Omit<InAppNotification, "id" | "is_read" | "created_at" | "user_id"> & { user_id?: string }) => {
    const newNotif: InAppNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      user_id: notif.user_id || "all",
      is_read: false,
      created_at: new Date().toISOString(),
    };
    setNotifications((prev) => {
      const updated = [newNotif, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(updated.slice(0, 30)));
      } catch {}
      return updated;
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, is_read: true } : n));
      try {
        localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, is_read: true }));
      try {
        localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const addAuditLog = (log: Omit<AuditLogItem, "id" | "admin_id" | "admin_email" | "created_at">) => {
    const newLog: AuditLogItem = {
      ...log,
      id: `al-${Date.now()}`,
      admin_id: "admin-1",
      admin_email: currentPersona.email || "organizer@omnikon.org",
      created_at: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const reviewMentorApplication = (appId: string, status: "approved" | "rejected", notes: string = "") => {
    setMentorApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status, admin_notes: notes, reviewed_at: new Date().toISOString() } : app))
    );
    addAuditLog({
      action: `${status}_mentor_application`,
      target_type: "mentor_application",
      target_id: appId,
      details_after: { status, notes },
    });
  };

  const reviewProjectAdminApplication = (appId: string, status: "approved" | "rejected", notes: string = "") => {
    setProjectAdminApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status, admin_notes: notes, reviewed_at: new Date().toISOString() } : app))
    );
    addAuditLog({
      action: `${status}_project_admin_application`,
      target_type: "project_admin_application",
      target_id: appId,
      details_after: { status, notes },
    });
  };

  const addMentorApplication = (app: Omit<MentorApplication, "id" | "status" | "created_at">) => {
    const newApp: MentorApplication = {
      ...app,
      id: `m-app-${Date.now()}`,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    setMentorApplications((prev) => [newApp, ...prev]);
    addNotification({
      title: "Mentor Application Submitted",
      message: `${app.full_name} applied to be a Technical Mentor.`,
      type: "info",
      role: "super_admin",
      link: "/dashboard/admin#approvals",
    });
    return newApp;
  };

  const addProjectAdminApplication = (app: Omit<ProjectAdminApplication, "id" | "status" | "created_at">) => {
    const newApp: ProjectAdminApplication = {
      ...app,
      id: `pa-app-${Date.now()}`,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    setProjectAdminApplications((prev) => [newApp, ...prev]);
    addNotification({
      title: "Project Lead Application",
      message: `${app.full_name} submitted "${app.project_name}" for maintainer listing.`,
      type: "info",
      role: "super_admin",
      link: "/dashboard/admin#approvals",
    });
    return newApp;
  };

  const reviewContributorApplication = (appId: string, status: "accepted" | "declined", reviewMessage: string = "") => {
    setContributorApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status, review_message: reviewMessage, reviewed_at: new Date().toISOString() } : app))
    );
  };

  const addOfficeHoursSession = (session: Omit<OfficeHoursSession, "id" | "booked_count" | "created_at">) => {
    const newSession: OfficeHoursSession = {
      ...session,
      id: `oh-${Date.now()}`,
      booked_count: 0,
      created_at: new Date().toISOString(),
    };
    setOfficeHours((prev) => [newSession, ...prev]);
  };

  const addMentorFeedback = (record: Omit<MentorFeedbackRecord, "id" | "created_at">) => {
    const newRecord: MentorFeedbackRecord = {
      ...record,
      id: `mf-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setMentorFeedback((prev) => [newRecord, ...prev]);
  };

  const addProjectAnnouncement = (ann: Omit<ProjectAnnouncement, "id" | "created_at">) => {
    const newAnn: ProjectAnnouncement = {
      ...ann,
      id: `ann-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setProjectAnnouncements((prev) => [newAnn, ...prev]);
    addNotification({
      title: `Project Update: ${ann.project_name}`,
      message: ann.title,
      type: "info",
      role: "contributor",
      link: `/projects`,
    });
  };

  return {
    currentPersona,
    switchRole,
    projects,
    setProjects,
    addProject,
    updateProject,
    approveProject,
    rejectProject,
    pullRequests,
    setPullRequests,
    addPR,
    mergePR,
    reviewPR,
    mentorApplications,
    setMentorApplications,
    addMentorApplication,
    reviewMentorApplication,
    projectAdminApplications,
    setProjectAdminApplications,
    addProjectAdminApplication,
    reviewProjectAdminApplication,
    contributorApplications,
    setContributorApplications,
    reviewContributorApplication,
    pointsLedger,
    awardPoints,
    pointsRules,
    setPointsRules,
    leaderboardSettings,
    setLeaderboardSettings,
    officeHours,
    addOfficeHoursSession,
    mentorFeedback,
    addMentorFeedback,
    projectAnnouncements,
    addProjectAnnouncement,
    notifications,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    auditLogs,
    addAuditLog,
    siteSettings,
    setSiteSettings,
    isHydrated,
  };
}
