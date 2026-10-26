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
import {
  PERSONAS,
  PERSONAS_LIST,
  getPersonaByRole,
  normalizeRole,
  getRoleFromPath,
} from "@/lib/personas";

export { normalizeRole, getRoleFromPath, PERSONAS, PERSONAS_LIST, getPersonaByRole };

export interface DemoPersona {
  role: StandardRole;
  title: string;
  name: string;
  email: string;
  avatar: string;
  dashboardUrl: string;
  badge: string;
  allowedRoles: StandardRole[];
  roleLabel: string;
  subtitle: string;
  avatarInitials: string;
  sidebarMenuTitle: string;
  breadcrumbLabel: string;
}

export const DEMO_PERSONAS: DemoPersona[] = PERSONAS_LIST.map((p) => ({
  role: p.id,
  title: p.subtitle,
  name: p.personaName,
  email: `${p.id}@example.com`,
  avatar: "",
  dashboardUrl: p.dashboardRoute,
  badge: p.roleLabel,
  allowedRoles:
    p.id === "super_admin"
      ? ["super_admin", "project_admin", "mentor", "contributor", "ambassador"]
      : [p.id, "contributor"],
  roleLabel: p.roleLabel,
  subtitle: p.subtitle,
  avatarInitials: p.avatarInitials,
  sidebarMenuTitle: p.sidebarMenuTitle,
  breadcrumbLabel: p.breadcrumbLabel,
}));

const STORAGE_KEY_ROLE = "owoc_active_role";

// Global singleton state so all components stay 100% in sync
interface GlobalStoreState {
  activeRole: StandardRole;
  isHydrated: boolean;
  projects: Project[];
  pullRequests: PullRequest[];
  mentorApplications: MentorApplication[];
  projectAdminApplications: ProjectAdminApplication[];
  contributorApplications: ContributorProjectApplication[];
  pointsLedger: PointsLedgerItem[];
  pointsRules: PointsRulesConfig;
  leaderboardSettings: LeaderboardSettings;
  officeHours: OfficeHoursSession[];
  mentorFeedback: MentorFeedbackRecord[];
  projectAnnouncements: ProjectAnnouncement[];
  notifications: InAppNotification[];
  auditLogs: AuditLogItem[];
  siteSettings: SiteSettings;
}

const globalStore: GlobalStoreState = {
  activeRole: "contributor",
  isHydrated: false,
  projects: SITE_CONFIG.DEMO_MODE ? [...MOCK_PROJECTS] : [],
  pullRequests: SITE_CONFIG.DEMO_MODE ? [...MOCK_PRS] : [],
  mentorApplications: SITE_CONFIG.DEMO_MODE ? [...MOCK_MENTOR_APPLICATIONS] : [],
  projectAdminApplications: SITE_CONFIG.DEMO_MODE ? [...MOCK_PROJECT_ADMIN_APPLICATIONS] : [],
  contributorApplications: SITE_CONFIG.DEMO_MODE ? [...MOCK_CONTRIBUTOR_APPLICATIONS] : [],
  pointsLedger: SITE_CONFIG.DEMO_MODE ? [...MOCK_POINTS_LEDGER] : [],
  pointsRules: SITE_CONFIG.DEMO_MODE
    ? { ...MOCK_POINTS_RULES }
    : {
        easy_points: 10,
        medium_points: 25,
        hard_points: 50,
        streak_bonus: 15,
        quality_bonus_max: 10,
        daily_cap: 100,
        version: 1,
        updated_at: new Date().toISOString(),
      },
  leaderboardSettings: SITE_CONFIG.DEMO_MODE
    ? { ...MOCK_LEADERBOARD_SETTINGS }
    : {
        is_frozen: false,
        disqualified_user_ids: [],
        last_recalculated_at: new Date().toISOString(),
      },
  officeHours: SITE_CONFIG.DEMO_MODE ? [...MOCK_OFFICE_HOURS] : [],
  mentorFeedback: SITE_CONFIG.DEMO_MODE ? [...MOCK_MENTOR_FEEDBACK] : [],
  projectAnnouncements: SITE_CONFIG.DEMO_MODE ? [...MOCK_PROJECT_ANNOUNCEMENTS] : [],
  notifications: SITE_CONFIG.DEMO_MODE ? [...MOCK_NOTIFICATIONS] : [],
  auditLogs: SITE_CONFIG.DEMO_MODE ? [...MOCK_AUDIT_LOGS] : [],
  siteSettings: SITE_CONFIG.DEMO_MODE
    ? { ...MOCK_SITE_SETTINGS }
    : {
        contact_email: "contact@omnikonhub.com",
        conduct_email: "contact@omnikonhub.com",
        twitter_url: "https://x.com/OmnikonOrg",
        linkedin_url: "https://www.linkedin.com/company/omnikon-org/",
        github_url: "https://github.com/Omnikon-Org",
        discord_url: "https://discord.gg/yWtjK2Tb8T",
        ambassador_rewards_config: {
          bronze_threshold: 10,
          silver_threshold: 25,
          gold_threshold: 50,
          master_threshold: 100,
        },
        updated_at: new Date().toISOString(),
      },
};

const subscribers = new Set<() => void>();

function notifySubscribers() {
  subscribers.forEach((cb) => {
    try {
      cb();
    } catch (e) {
      console.error("Store subscriber error:", e);
    }
  });
}

function persistRole(role: StandardRole) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY_ROLE, role);
  } catch (e) {
    console.warn("sessionStorage set error:", e);
  }
}

export function useAppStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setTick((t) => t + 1);
    subscribers.add(handleUpdate);

    if (!globalStore.isHydrated) {
      if (typeof window !== "undefined") {
        try {
          // Check route path first if on a dashboard page
          const routeRole = getRoleFromPath(window.location.pathname);
          const savedRole = sessionStorage.getItem(STORAGE_KEY_ROLE);

          if (routeRole) {
            globalStore.activeRole = routeRole;
            persistRole(routeRole);
          } else if (savedRole) {
            globalStore.activeRole = normalizeRole(savedRole);
          }
        } catch (e) {
          console.warn("Store hydration notice:", e);
        }
      }
      globalStore.isHydrated = true;
      notifySubscribers();
    }

    return () => {
      subscribers.delete(handleUpdate);
    };
  }, []);

  const activeRole = globalStore.activeRole;
  const personaConfig = PERSONAS[activeRole] || PERSONAS.contributor;
  const currentPersona =
    DEMO_PERSONAS.find((p) => p.role === activeRole) || DEMO_PERSONAS[0];

  const switchRole = (role: UserRole | string) => {
    const normalized = normalizeRole(role);
    if (globalStore.activeRole !== normalized) {
      globalStore.activeRole = normalized;
      persistRole(normalized);
      notifySubscribers();
    }
  };

  const syncRoleFromPath = (pathname: string) => {
    const routeRole = getRoleFromPath(pathname);
    if (routeRole && globalStore.activeRole !== routeRole) {
      globalStore.activeRole = routeRole;
      persistRole(routeRole);
      notifySubscribers();
    }
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
    globalStore.projects = [newProject, ...globalStore.projects];

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

    notifySubscribers();
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    globalStore.projects = globalStore.projects.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    notifySubscribers();
  };

  const approveProject = (id: string, notes?: string) => {
    globalStore.projects = globalStore.projects.map((p) =>
      p.id === id ? { ...p, status: "approved" as const } : p
    );
    addAuditLog({
      action: "approve_project",
      target_type: "project",
      target_id: id,
      details_after: { status: "approved", notes },
    });
    notifySubscribers();
  };

  const rejectProject = (id: string, reason?: string) => {
    globalStore.projects = globalStore.projects.map((p) =>
      p.id === id ? { ...p, status: "rejected" as const } : p
    );
    addAuditLog({
      action: "reject_project",
      target_type: "project",
      target_id: id,
      details_after: { status: "rejected", reason },
    });
    notifySubscribers();
  };

  const addPR = (prData: Omit<PullRequest, "id" | "created_at">) => {
    const newPr: PullRequest = {
      ...prData,
      id: `pr-${Date.now()}`,
      created_at: new Date().toISOString().split("T")[0],
    };
    globalStore.pullRequests = [newPr, ...globalStore.pullRequests];
    notifySubscribers();
    return newPr;
  };

  const mergePR = (id: string, awardedPoints?: number) => {
    const targetPr = globalStore.pullRequests.find((p) => p.id === id);
    if (!targetPr) return;

    const pts = awardedPoints !== undefined ? awardedPoints : targetPr.points_awarded || 25;

    globalStore.pullRequests = globalStore.pullRequests.map((p) =>
      p.id === id
        ? {
            ...p,
            status: "merged" as const,
            points_awarded: pts,
            merged_at: new Date().toISOString().split("T")[0],
          }
        : p
    );

    awardPoints({
      user_id: targetPr.contributor_id || "u-contributor-1",
      user_name: targetPr.contributor_name,
      pr_id: targetPr.id,
      pr_title: targetPr.title,
      project_id: targetPr.project_id,
      project_name: targetPr.project_name,
      base_points: pts,
      quality_bonus: targetPr.quality_score ? targetPr.quality_score * 2 : 0,
      streak_bonus: 0,
      awarded_by_role: "project_admin",
      awarded_by_name: currentPersona.name,
      reason: `PR Merged: ${targetPr.title}`,
    });

    addNotification({
      title: "PR Merged!",
      message: `Your PR #${targetPr.number || 1} has been merged. +${pts} points awarded!`,
      type: "success",
      role: "contributor",
      link: "/dashboard/contributor",
    });

    notifySubscribers();
  };

  const reviewPR = (
    id: string,
    action: "approve" | "changes_requested" | "approved" | "rejected",
    param3?: number | string,
    param4?: number | string
  ) => {
    const isApprove = action === "approve" || action === "approved";
    let qualityScore: number | undefined;
    let feedbackNote: string | undefined;

    if (typeof param3 === "number") {
      qualityScore = param3;
      if (typeof param4 === "string") feedbackNote = param4;
    } else if (typeof param3 === "string") {
      feedbackNote = param3;
      if (typeof param4 === "number") qualityScore = param4;
    }

    globalStore.pullRequests = globalStore.pullRequests.map((p) =>
      p.id === id
        ? {
            ...p,
            status: isApprove ? "approved" : "review_requested",
            quality_score: qualityScore !== undefined ? qualityScore : p.quality_score,
            mentor_notes: feedbackNote || p.mentor_notes,
          }
        : p
    );

    const pr = globalStore.pullRequests.find((p) => p.id === id);
    if (pr) {
      addNotification({
        title: isApprove ? "PR Approved" : "Changes Requested",
        message: `Mentor reviewed PR: "${pr.title}"`,
        type: isApprove ? "success" : "info",
        role: "contributor",
        link: "/dashboard/contributor",
      });
    }

    notifySubscribers();
  };

  const addMentorApplication = (app: Omit<MentorApplication, "id" | "status" | "created_at">) => {
    const newApp: MentorApplication = {
      ...app,
      id: `ma-${Date.now()}`,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    globalStore.mentorApplications = [newApp, ...globalStore.mentorApplications];
    addNotification({
      title: "Mentor Application Submitted",
      message: `${newApp.full_name} applied to be an OWOC Mentor.`,
      type: "info",
      role: "super_admin",
      link: "/dashboard/admin",
    });
    notifySubscribers();
    return newApp;
  };

  const reviewMentorApplication = (id: string, status: "approved" | "rejected", notes?: string) => {
    globalStore.mentorApplications = globalStore.mentorApplications.map((a) =>
      a.id === id
        ? { ...a, status, admin_notes: notes, reviewed_at: new Date().toISOString() }
        : a
    );
    notifySubscribers();
  };

  const addProjectAdminApplication = (
    app: Omit<ProjectAdminApplication, "id" | "status" | "created_at">
  ) => {
    const newApp: ProjectAdminApplication = {
      ...app,
      id: `paa-${Date.now()}`,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    globalStore.projectAdminApplications = [newApp, ...globalStore.projectAdminApplications];
    addNotification({
      title: "Maintainer Application Received",
      message: `${newApp.project_name || newApp.repository_name} submitted by ${newApp.full_name}`,
      type: "info",
      role: "super_admin",
      link: "/dashboard/admin",
    });
    notifySubscribers();
    return newApp;
  };

  const reviewProjectAdminApplication = (
    id: string,
    status: "approved" | "rejected",
    notes?: string
  ) => {
    globalStore.projectAdminApplications = globalStore.projectAdminApplications.map((a) =>
      a.id === id
        ? { ...a, status, admin_notes: notes, reviewed_at: new Date().toISOString() }
        : a
    );
    notifySubscribers();
  };

  const reviewContributorApplication = (
    id: string,
    status: "accepted" | "rejected" | "declined",
    notes?: string
  ) => {
    const finalStatus: "accepted" | "declined" =
      status === "accepted" ? "accepted" : "declined";
    globalStore.contributorApplications = globalStore.contributorApplications.map((a) =>
      a.id === id ? { ...a, status: finalStatus, review_message: notes } : a
    );
    notifySubscribers();
  };

  const awardPoints = (
    item: Omit<
      PointsLedgerItem,
      "id" | "awarded_at" | "total_points" | "created_at" | "points" | "type"
    > & { points?: number; type?: PointsLedgerItem["type"] }
  ) => {
    const total =
      (item.points !== undefined ? item.points : 0) ||
      ((item.base_points || 0) + (item.quality_bonus || 0) + (item.streak_bonus || 0));
    const newItem: PointsLedgerItem = {
      points: total,
      type: item.type || "pr_merge",
      ...item,
      id: `pl-${Date.now()}`,
      total_points: total,
      created_at: new Date().toISOString(),
      awarded_at: new Date().toISOString(),
    };
    globalStore.pointsLedger = [newItem, ...globalStore.pointsLedger];
    notifySubscribers();
  };

  const addNotification = (notif: Omit<InAppNotification, "id" | "created_at" | "is_read">) => {
    const newNotif: InAppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      created_at: new Date().toISOString(),
      is_read: false,
    };
    globalStore.notifications = [newNotif, ...globalStore.notifications];
    notifySubscribers();
  };

  const markNotificationRead = (id: string) => {
    globalStore.notifications = globalStore.notifications.map((n) =>
      n.id === id ? { ...n, is_read: true } : n
    );
    notifySubscribers();
  };

  const markAllNotificationsRead = () => {
    globalStore.notifications = globalStore.notifications.map((n) => ({ ...n, is_read: true }));
    notifySubscribers();
  };

  const addAuditLog = (log: Omit<AuditLogItem, "id" | "created_at" | "actor_role" | "actor_name">) => {
    const newLog: AuditLogItem = {
      ...log,
      id: `audit-${Date.now()}`,
      created_at: new Date().toISOString(),
      actor_role: activeRole,
      actor_name: currentPersona.name,
    };
    globalStore.auditLogs = [newLog, ...globalStore.auditLogs];
    notifySubscribers();
  };

  const addOfficeHoursSession = (
    session: Omit<OfficeHoursSession, "id" | "booked_count" | "created_at">
  ) => {
    const newSession: OfficeHoursSession = {
      ...session,
      id: `oh-${Date.now()}`,
      booked_count: 0,
      created_at: new Date().toISOString(),
    };
    globalStore.officeHours = [newSession, ...globalStore.officeHours];
    notifySubscribers();
  };

  const addMentorFeedback = (record: Omit<MentorFeedbackRecord, "id" | "created_at">) => {
    const newRecord: MentorFeedbackRecord = {
      ...record,
      id: `mf-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    globalStore.mentorFeedback = [newRecord, ...globalStore.mentorFeedback];
    notifySubscribers();
  };

  const addProjectAnnouncement = (ann: Omit<ProjectAnnouncement, "id" | "created_at">) => {
    const newAnn: ProjectAnnouncement = {
      ...ann,
      id: `ann-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    globalStore.projectAnnouncements = [newAnn, ...globalStore.projectAnnouncements];
    addNotification({
      title: `Project Update: ${ann.project_name}`,
      message: ann.title,
      type: "info",
      role: "contributor",
      link: `/projects`,
    });
    notifySubscribers();
  };

  return {
    activeRole,
    currentPersona,
    personaConfig,
    isHydrated: globalStore.isHydrated,
    switchRole,
    syncRoleFromPath,
    projects: globalStore.projects,
    setProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => {
      globalStore.projects = typeof projects === "function" ? projects(globalStore.projects) : projects;
      notifySubscribers();
    },
    addProject,
    updateProject,
    approveProject,
    rejectProject,
    pullRequests: globalStore.pullRequests,
    setPullRequests: (prs: PullRequest[] | ((prev: PullRequest[]) => PullRequest[])) => {
      globalStore.pullRequests = typeof prs === "function" ? prs(globalStore.pullRequests) : prs;
      notifySubscribers();
    },
    addPR,
    mergePR,
    reviewPR,
    mentorApplications: globalStore.mentorApplications,
    setMentorApplications: (apps: MentorApplication[] | ((prev: MentorApplication[]) => MentorApplication[])) => {
      globalStore.mentorApplications = typeof apps === "function" ? apps(globalStore.mentorApplications) : apps;
      notifySubscribers();
    },
    addMentorApplication,
    reviewMentorApplication,
    projectAdminApplications: globalStore.projectAdminApplications,
    setProjectAdminApplications: (apps: ProjectAdminApplication[] | ((prev: ProjectAdminApplication[]) => ProjectAdminApplication[])) => {
      globalStore.projectAdminApplications = typeof apps === "function" ? apps(globalStore.projectAdminApplications) : apps;
      notifySubscribers();
    },
    addProjectAdminApplication,
    reviewProjectAdminApplication,
    contributorApplications: globalStore.contributorApplications,
    setContributorApplications: (apps: ContributorProjectApplication[] | ((prev: ContributorProjectApplication[]) => ContributorProjectApplication[])) => {
      globalStore.contributorApplications = typeof apps === "function" ? apps(globalStore.contributorApplications) : apps;
      notifySubscribers();
    },
    reviewContributorApplication,
    pointsLedger: globalStore.pointsLedger,
    awardPoints,
    pointsRules: globalStore.pointsRules,
    setPointsRules: (rules: PointsRulesConfig | ((prev: PointsRulesConfig) => PointsRulesConfig)) => {
      globalStore.pointsRules = typeof rules === "function" ? rules(globalStore.pointsRules) : rules;
      notifySubscribers();
    },
    leaderboardSettings: globalStore.leaderboardSettings,
    setLeaderboardSettings: (settings: LeaderboardSettings | ((prev: LeaderboardSettings) => LeaderboardSettings)) => {
      globalStore.leaderboardSettings = typeof settings === "function" ? settings(globalStore.leaderboardSettings) : settings;
      notifySubscribers();
    },
    officeHours: globalStore.officeHours,
    addOfficeHoursSession,
    mentorFeedback: globalStore.mentorFeedback,
    addMentorFeedback,
    projectAnnouncements: globalStore.projectAnnouncements,
    addProjectAnnouncement,
    notifications: globalStore.notifications,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    auditLogs: globalStore.auditLogs,
    addAuditLog,
    siteSettings: globalStore.siteSettings,
    setSiteSettings: (settings: SiteSettings | ((prev: SiteSettings) => SiteSettings)) => {
      globalStore.siteSettings = typeof settings === "function" ? settings(globalStore.siteSettings) : settings;
      notifySubscribers();
    },
  };
}
