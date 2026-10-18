import { StandardRole } from "@/types";

export interface SidebarMenuItem {
  id: string;
  label: string;
  href: string;
  tabId?: string;
  iconName: string;
}

export interface PersonaConfig {
  id: StandardRole;
  roleLabel: string;
  personaName: string;
  subtitle: string;
  avatarInitials: string;
  sidebarMenuTitle: string;
  breadcrumbLabel: string;
  dashboardRoute: string;
  sidebarMenuItems: SidebarMenuItem[];
}

export const PERSONAS: Record<StandardRole, PersonaConfig> = {
  contributor: {
    id: "contributor",
    roleLabel: "Contributor",
    personaName: "Sample Contributor",
    subtitle: "Student Contributor Menu",
    avatarInitials: "SC",
    sidebarMenuTitle: "Student Contributor Menu",
    breadcrumbLabel: "Contributor Workspace",
    dashboardRoute: "/dashboard/contributor",
    sidebarMenuItems: [
      {
        id: "activity",
        label: "My Activity & PRs",
        href: "/dashboard/contributor",
        tabId: "overview",
        iconName: "LayoutDashboard",
      },
      {
        id: "projects",
        label: "Browse Projects",
        href: "/projects",
        iconName: "Layers",
      },
      {
        id: "leaderboard",
        label: "Leaderboard",
        href: "/leaderboard",
        iconName: "Award",
      },
      {
        id: "rules",
        label: "Points & Rules",
        href: "/rules",
        iconName: "BookOpen",
      },
      {
        id: "certificate",
        label: "Verify Certificate",
        href: "/certificate",
        iconName: "Award",
      },
    ],
  },

  project_admin: {
    id: "project_admin",
    roleLabel: "Project Admin",
    personaName: "Sample Project Admin",
    subtitle: "Project Maintainer Menu",
    avatarInitials: "PA",
    sidebarMenuTitle: "Project Maintainer Menu",
    breadcrumbLabel: "Project Admin Console",
    dashboardRoute: "/dashboard/project-admin",
    sidebarMenuItems: [
      {
        id: "overview",
        label: "Overview",
        href: "/dashboard/project-admin?tab=overview",
        tabId: "overview",
        iconName: "LayoutDashboard",
      },
      {
        id: "projects",
        label: "My Projects",
        href: "/dashboard/project-admin?tab=projects",
        tabId: "projects",
        iconName: "FolderGit2",
      },
      {
        id: "submit",
        label: "Submit Project",
        href: "/dashboard/project-admin?tab=submit",
        tabId: "submit",
        iconName: "Flame",
      },
      {
        id: "applications",
        label: "Contributor Requests",
        href: "/dashboard/project-admin?tab=applications",
        tabId: "applications",
        iconName: "Users",
      },
      {
        id: "issues",
        label: "Issues",
        href: "/dashboard/project-admin?tab=issues",
        tabId: "issues",
        iconName: "Layers",
      },
      {
        id: "prs",
        label: "Pull Requests",
        href: "/dashboard/project-admin?tab=prs",
        tabId: "prs",
        iconName: "Award",
      },
      {
        id: "announcements",
        label: "Announcements",
        href: "/dashboard/project-admin?tab=announcements",
        tabId: "announcements",
        iconName: "MessageSquare",
      },
    ],
  },

  mentor: {
    id: "mentor",
    roleLabel: "Mentor",
    personaName: "Sample Mentor",
    subtitle: "Technical Mentor Menu",
    avatarInitials: "SM",
    sidebarMenuTitle: "Technical Mentor Menu",
    breadcrumbLabel: "Mentor Hub",
    dashboardRoute: "/dashboard/mentor",
    sidebarMenuItems: [
      {
        id: "overview",
        label: "Overview",
        href: "/dashboard/mentor?tab=overview",
        tabId: "overview",
        iconName: "LayoutDashboard",
      },
      {
        id: "mentees",
        label: "Mentee Directory",
        href: "/dashboard/mentor?tab=mentees",
        tabId: "mentees",
        iconName: "Users",
      },
      {
        id: "reviews",
        label: "PR Review Queue",
        href: "/dashboard/mentor?tab=reviews",
        tabId: "reviews",
        iconName: "Layers",
      },
      {
        id: "office-hours",
        label: "Office Hours & Resources",
        href: "/dashboard/mentor?tab=office-hours",
        tabId: "office-hours",
        iconName: "Calendar",
      },
      {
        id: "guide",
        label: "Mentorship Guide",
        href: "/dashboard/mentor?tab=guide",
        tabId: "guide",
        iconName: "BookOpen",
      },
    ],
  },

  ambassador: {
    id: "ambassador",
    roleLabel: "Campus Ambassador",
    personaName: "Sample Ambassador",
    subtitle: "Campus Ambassador Menu",
    avatarInitials: "CA",
    sidebarMenuTitle: "Campus Ambassador Menu",
    breadcrumbLabel: "Ambassador Portal",
    dashboardRoute: "/dashboard/ambassador",
    sidebarMenuItems: [
      {
        id: "overview",
        label: "Overview",
        href: "/dashboard/ambassador",
        tabId: "overview",
        iconName: "LayoutDashboard",
      },
      {
        id: "referrals",
        label: "Referral Kit & Stats",
        href: "/dashboard/ambassador#referrals",
        iconName: "Sparkles",
      },
      {
        id: "standings",
        label: "College Standings",
        href: "/leaderboard",
        iconName: "Award",
      },
      {
        id: "rewards",
        label: "Reward Tiers",
        href: "/ambassadors",
        iconName: "Sparkles",
      },
    ],
  },

  super_admin: {
    id: "super_admin",
    roleLabel: "Super Admin",
    personaName: "OWOC Super Admin",
    subtitle: "Super Admin Console",
    avatarInitials: "SA",
    sidebarMenuTitle: "Super Admin Console",
    breadcrumbLabel: "Super Admin Console",
    dashboardRoute: "/dashboard/admin",
    sidebarMenuItems: [
      {
        id: "overview",
        label: "Analytics & Schedule",
        href: "/dashboard/admin?tab=overview",
        tabId: "overview",
        iconName: "LayoutDashboard",
      },
      {
        id: "approvals",
        label: "Approvals Queue",
        href: "/dashboard/admin?tab=approvals",
        tabId: "approvals",
        iconName: "Layers",
      },
      {
        id: "users",
        label: "User Management",
        href: "/dashboard/admin?tab=users",
        tabId: "users",
        iconName: "Users",
      },
      {
        id: "projects",
        label: "Projects Moderation",
        href: "/dashboard/admin?tab=projects",
        tabId: "projects",
        iconName: "FolderGit2",
      },
      {
        id: "points",
        label: "Points & Rules Config",
        href: "/dashboard/admin?tab=points",
        tabId: "points",
        iconName: "BookOpen",
      },
      {
        id: "leaderboard",
        label: "Podium Integrity",
        href: "/dashboard/admin?tab=leaderboard",
        tabId: "leaderboard",
        iconName: "Award",
      },
      {
        id: "badges",
        label: "Badges Manager",
        href: "/dashboard/admin?tab=badges",
        tabId: "badges",
        iconName: "Award",
      },
      {
        id: "sponsors",
        label: "Sponsor Moderation",
        href: "/dashboard/admin?tab=sponsors",
        tabId: "sponsors",
        iconName: "Sparkles",
      },
      {
        id: "certificates",
        label: "Certificate Issuance",
        href: "/dashboard/admin?tab=certificates",
        tabId: "certificates",
        iconName: "Award",
      },
      {
        id: "season",
        label: "Season Settings",
        href: "/dashboard/admin?tab=season",
        tabId: "season",
        iconName: "Calendar",
      },
      {
        id: "audit",
        label: "Audit Log",
        href: "/dashboard/admin?tab=audit",
        tabId: "audit",
        iconName: "Clock",
      },
      {
        id: "exports",
        label: "Data Exports",
        href: "/dashboard/admin?tab=exports",
        tabId: "exports",
        iconName: "Layers",
      },
    ],
  },
};

export const PERSONAS_LIST: PersonaConfig[] = [
  PERSONAS.contributor,
  PERSONAS.project_admin,
  PERSONAS.mentor,
  PERSONAS.ambassador,
  PERSONAS.super_admin,
];

export function getPersonaByRole(role: string): PersonaConfig {
  const norm = normalizeRole(role);
  return PERSONAS[norm] || PERSONAS.contributor;
}

export function normalizeRole(role: string): StandardRole {
  if (role === "maintainer") return "project_admin";
  if (role === "admin") return "super_admin";
  if (["super_admin", "project_admin", "mentor", "contributor", "ambassador"].includes(role)) {
    return role as StandardRole;
  }
  return "contributor";
}

export function getRoleFromPath(pathname: string): StandardRole | null {
  if (pathname === "/dashboard/admin" || pathname.startsWith("/dashboard/admin/")) {
    return "super_admin";
  }
  if (
    pathname === "/dashboard/project-admin" ||
    pathname.startsWith("/dashboard/project-admin/") ||
    pathname === "/dashboard/maintainer" ||
    pathname.startsWith("/dashboard/maintainer/")
  ) {
    return "project_admin";
  }
  if (pathname === "/dashboard/mentor" || pathname.startsWith("/dashboard/mentor/")) {
    return "mentor";
  }
  if (pathname === "/dashboard/ambassador" || pathname.startsWith("/dashboard/ambassador/")) {
    return "ambassador";
  }
  if (pathname === "/dashboard/contributor" || pathname.startsWith("/dashboard/contributor/")) {
    return "contributor";
  }
  return null;
}
