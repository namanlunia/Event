"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  LayoutDashboard,
  Users,
  Layers,
  Sparkles,
  ShieldAlert,
  ChevronDown,
  BookOpen,
  Award,
  Check,
  Menu,
  X,
  ArrowRight,
  LogOut,
  FolderGit2,
  Calendar,
  MessageSquare,
  HelpCircle,
  Clock,
  Eye,
} from "lucide-react";
import { DEMO_PERSONAS, useAppStore, normalizeRole } from "@/lib/store";
import { UserRole, StandardRole } from "@/types";
import AvatarDisplay from "@/components/visual/AvatarDisplay";
import { SITE_CONFIG } from "@/lib/site-config";
import { PHASES, SEASON_SHORT } from "@/lib/season";
import NotificationCenter from "@/components/dashboard/NotificationCenter";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { currentPersona, switchRole } = useAppStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const activeRole = normalizeRole(currentPersona.role);

  // Derive current phase
  const currentPhase = PHASES[0];

  // Role Navigation Items
  const roleNavItems: Record<
    StandardRole,
    { name: string; href: string; icon: React.ReactNode }[]
  > = {
    contributor: [
      {
        name: "My Activity & PRs",
        href: "/dashboard/contributor",
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
      {
        name: "Browse Projects",
        href: "/projects",
        icon: <Layers className="w-4 h-4" />,
      },
      {
        name: "Live Leaderboard",
        href: "/leaderboard",
        icon: <Award className="w-4 h-4" />,
      },
      {
        name: "Points & Rules",
        href: "/rules",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        name: "Verify Certificate",
        href: "/certificate",
        icon: <Award className="w-4 h-4" />,
      },
    ],
    project_admin: [
      {
        name: "Project Lead Console",
        href: "/dashboard/project-admin",
        icon: <FolderGit2 className="w-4 h-4" />,
      },
      {
        name: "Submit New Project",
        href: "/dashboard/project-admin#submit",
        icon: <Flame className="w-4 h-4 text-red-bright" />,
      },
      {
        name: "Manage Repositories",
        href: "/dashboard/project-admin#projects",
        icon: <Layers className="w-4 h-4" />,
      },
      {
        name: "Contributor Requests",
        href: "/dashboard/project-admin#applications",
        icon: <Users className="w-4 h-4" />,
      },
      {
        name: "PR Triage & Points",
        href: "/dashboard/project-admin#prs",
        icon: <Award className="w-4 h-4" />,
      },
      {
        name: "Announcements",
        href: "/dashboard/project-admin#announcements",
        icon: <MessageSquare className="w-4 h-4" />,
      },
    ],
    mentor: [
      {
        name: "Mentor Workspace",
        href: "/dashboard/mentor",
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
      {
        name: "My Projects & Mentees",
        href: "/dashboard/mentor#mentees",
        icon: <Users className="w-4 h-4" />,
      },
      {
        name: "PR Review Queue",
        href: "/dashboard/mentor#reviews",
        icon: <Layers className="w-4 h-4" />,
      },
      {
        name: "Office Hours Schedule",
        href: "/dashboard/mentor#office-hours",
        icon: <Calendar className="w-4 h-4" />,
      },
      {
        name: "Feedback & Guidance",
        href: "/dashboard/mentor#feedback",
        icon: <MessageSquare className="w-4 h-4" />,
      },
      {
        name: "Points & Rules",
        href: "/rules",
        icon: <BookOpen className="w-4 h-4" />,
      },
    ],
    super_admin: [
      {
        name: "Super Admin Command",
        href: "/dashboard/admin",
        icon: <ShieldAlert className="w-4 h-4 text-red-bright" />,
      },
      {
        name: "Approvals Queue",
        href: "/dashboard/admin#approvals",
        icon: <Layers className="w-4 h-4" />,
      },
      {
        name: "User Management",
        href: "/dashboard/admin#users",
        icon: <Users className="w-4 h-4" />,
      },
      {
        name: "Projects Directory",
        href: "/dashboard/admin#projects",
        icon: <FolderGit2 className="w-4 h-4" />,
      },
      {
        name: "Points Rules Config",
        href: "/dashboard/admin#rules",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        name: "Certificates Center",
        href: "/dashboard/admin#certificates",
        icon: <Award className="w-4 h-4" />,
      },
      {
        name: "System Audit Logs",
        href: "/dashboard/admin#logs",
        icon: <Clock className="w-4 h-4" />,
      },
    ],
    ambassador: [
      {
        name: "Ambassador Overview",
        href: "/dashboard/ambassador",
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
      {
        name: "Referral Kit & Stats",
        href: "/dashboard/ambassador#referrals",
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        name: "College Standings",
        href: "/leaderboard",
        icon: <Award className="w-4 h-4" />,
      },
      {
        name: "Reward Tiers",
        href: "/ambassadors",
        icon: <Sparkles className="w-4 h-4" />,
      },
    ],
  };

  const currentNav = roleNavItems[activeRole] || roleNavItems.contributor;

  return (
    <div className="pt-20 min-h-screen flex bg-background">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar (Desktop fixed + Mobile slide-over) */}
      <aside
        className={`w-64 border-r border-white/10 bg-[#0B0B0D] flex flex-col justify-between p-4 fixed left-0 top-20 bottom-0 z-40 transition-transform duration-200 md:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6 overflow-y-auto">
          {/* Active Profile Card */}
          <div className="p-3.5 rounded-2xl bg-surface-1 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <AvatarDisplay name={currentPersona.name} size="sm" />
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">
                  {currentPersona.name}
                </div>
                <div className="text-[10px] font-mono text-red-bright uppercase font-bold truncate">
                  {currentPersona.title}
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-text-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links for current role */}
          <nav className="space-y-1">
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[10px] font-mono uppercase text-text-muted font-bold tracking-wider">
                {currentPersona.title} Menu
              </span>
            </div>

            {currentNav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href.includes("#") &&
                  pathname === item.href.split("#")[0]);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-red-primary/15 text-red-bright border border-red-primary/40 font-bold shadow-red-glow-sm"
                      : "text-text-secondary hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar: DEMO_MODE View as Role Switcher */}
        {SITE_CONFIG.DEMO_MODE ? (
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="flex items-center gap-1.5 px-1 text-[10px] font-mono text-amber-400">
              <Eye className="w-3 h-3" />
              <span className="uppercase font-bold">View As Role:</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {DEMO_PERSONAS.map((p) => {
                const isSelected = activeRole === p.role;
                return (
                  <button
                    key={p.role}
                    onClick={() => {
                      switchRole(p.role);
                      setMobileSidebarOpen(false);
                    }}
                    className={`p-1.5 rounded-lg text-left text-[10px] font-mono border truncate transition-all ${
                      isSelected
                        ? "bg-red-primary/20 border-red-bright text-white font-bold"
                        : "bg-surface-2 border-white/5 text-text-muted hover:text-white"
                    }`}
                  >
                    {p.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="pt-4 border-t border-white/10">
            <Link
              href="/"
              className="flex items-center justify-between text-xs font-mono text-text-muted hover:text-white p-2 rounded-xl hover:bg-surface-2"
            >
              <span>Back to OWOC</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow md:ml-64 flex flex-col min-h-screen w-full">
        {/* Dashboard Sub-header */}
        <div className="h-14 border-b border-white/10 bg-[#0B0B0D]/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-20 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg bg-surface-1 border border-white/10 text-white"
              aria-label="Open sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono truncate">
              <span className="text-text-muted hidden sm:inline">{SEASON_SHORT}</span>
              <span className="text-text-muted hidden sm:inline">/</span>
              <span className="text-red-bright capitalize font-bold">
                {activeRole.replace("_", " ")} Workspace
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Multi-role Switcher (If user holds multiple roles or in demo mode) */}
            <div className="relative">
              <button
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-xs font-mono text-text-secondary hover:text-white transition-colors"
                title="Switch Workspace Role"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-bright" />
                <span className="capitalize">{activeRole.replace("_", " ")}</span>
                <ChevronDown className="w-3 h-3 text-text-muted" />
              </button>

              {roleSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-surface-1 border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <span className="text-[10px] font-mono text-red-bright uppercase font-bold tracking-wider">
                      Role Workspaces
                    </span>
                  </div>
                  <div className="space-y-1">
                    {DEMO_PERSONAS.map((p) => {
                      const isSelected = activeRole === p.role;
                      return (
                        <Link
                          key={p.role}
                          href={p.dashboardUrl}
                          onClick={() => {
                            switchRole(p.role);
                            setRoleSwitcherOpen(false);
                          }}
                          className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                            isSelected
                              ? "bg-red-primary/15 text-white border border-red-primary/30 font-bold"
                              : "text-text-secondary hover:text-white hover:bg-surface-2"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="capitalize">{p.title}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-red-bright" />}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Notification Center */}
            <NotificationCenter />

            {/* Exit to Home */}
            <Link
              href="/"
              className="text-xs font-mono text-text-muted hover:text-white hidden lg:flex items-center gap-1 transition-colors"
            >
              <span>Exit</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Dashboard Main Viewport */}
        <main className="p-4 sm:p-8 flex-grow">{children}</main>
      </div>
    </div>
  );
}
