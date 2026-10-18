"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  FolderGit2,
  Calendar,
  MessageSquare,
  Clock,
  Eye,
} from "lucide-react";
import {
  useAppStore,
  PERSONAS_LIST,
} from "@/lib/store";
import AvatarDisplay from "@/components/visual/AvatarDisplay";
import { SITE_CONFIG } from "@/lib/site-config";
import { SEASON_SHORT } from "@/lib/season";
import NotificationCenter from "@/components/dashboard/NotificationCenter";

function renderMenuIcon(iconName: string) {
  switch (iconName) {
    case "LayoutDashboard":
      return <LayoutDashboard className="w-4 h-4" />;
    case "Layers":
      return <Layers className="w-4 h-4" />;
    case "Award":
      return <Award className="w-4 h-4" />;
    case "BookOpen":
      return <BookOpen className="w-4 h-4" />;
    case "FolderGit2":
      return <FolderGit2 className="w-4 h-4" />;
    case "Flame":
      return <Flame className="w-4 h-4 text-red-bright" />;
    case "Users":
      return <Users className="w-4 h-4" />;
    case "MessageSquare":
      return <MessageSquare className="w-4 h-4" />;
    case "Calendar":
      return <Calendar className="w-4 h-4" />;
    case "ShieldAlert":
      return <ShieldAlert className="w-4 h-4 text-red-bright" />;
    case "Clock":
      return <Clock className="w-4 h-4" />;
    case "Sparkles":
      return <Sparkles className="w-4 h-4" />;
    default:
      return <LayoutDashboard className="w-4 h-4" />;
  }
}

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { activeRole, personaConfig, switchRole, syncRoleFromPath } =
    useAppStore();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  // Synchronize store role when opening or changing route directly
  useEffect(() => {
    syncRoleFromPath(pathname);
  }, [pathname, syncRoleFromPath]);

  const currentTab = searchParams?.get("tab") || "overview";

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
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Active Profile Card */}
          <div className="p-3.5 rounded-2xl bg-surface-1 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <AvatarDisplay name={personaConfig.personaName} size="sm" />
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">
                  {personaConfig.personaName}
                </div>
                <div className="text-[10px] font-mono text-red-bright uppercase font-bold truncate">
                  {personaConfig.roleLabel}
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
                {personaConfig.sidebarMenuTitle}
              </span>
            </div>

            {personaConfig.sidebarMenuItems.map((item) => {
              const itemBase = item.href.split("?")[0].split("#")[0];
              const itemParams = item.href.includes("?tab=")
                ? item.href.split("?tab=")[1]
                : null;

              let isActive = false;
              if (itemParams) {
                isActive = pathname === itemBase && currentTab === itemParams;
              } else if (item.href.includes("#")) {
                isActive = pathname === itemBase;
              } else {
                isActive = pathname === item.href && !searchParams?.get("tab");
              }

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-red-primary/15 text-red-bright border border-red-primary/40 font-bold shadow-red-glow-sm"
                      : "text-text-secondary hover:text-white hover:bg-white/5"
                  }`}
                >
                  {renderMenuIcon(item.iconName)}
                  <span className="truncate">{item.label}</span>
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
              {PERSONAS_LIST.map((p) => {
                const isSelected = activeRole === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      switchRole(p.id);
                      router.push(p.dashboardRoute);
                      setMobileSidebarOpen(false);
                    }}
                    className={`p-1.5 rounded-lg text-left text-[10px] font-mono border truncate transition-all ${
                      isSelected
                        ? "bg-red-primary/20 border-red-bright text-white font-bold shadow-red-glow-sm"
                        : "bg-surface-2 border-white/5 text-text-muted hover:text-white"
                    }`}
                    title={`View as ${p.roleLabel}`}
                  >
                    {p.roleLabel}
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

            {/* Breadcrumb: OWOC 2026 / {role workspace name} */}
            <div className="flex items-center gap-2 text-xs font-mono truncate">
              <span className="text-text-muted hidden sm:inline">{SEASON_SHORT}</span>
              <span className="text-text-muted hidden sm:inline">/</span>
              <span className="text-red-bright font-bold">
                {personaConfig.breadcrumbLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Multi-role Switcher (DEMO_MODE ONLY) */}
            {SITE_CONFIG.DEMO_MODE && (
              <div className="relative">
                <button
                  onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-xs font-mono text-text-secondary hover:text-white transition-colors"
                  title="Switch Workspace Role"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-bright" />
                  <span>{personaConfig.roleLabel}</span>
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
                      {PERSONAS_LIST.map((p) => {
                        const isSelected = activeRole === p.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => {
                              switchRole(p.id);
                              router.push(p.dashboardRoute);
                              setRoleSwitcherOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                              isSelected
                                ? "bg-red-primary/15 text-white border border-red-primary/30 font-bold"
                                : "text-text-secondary hover:text-white hover:bg-surface-2"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span>{p.roleLabel}</span>
                            </div>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-red-bright" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="pt-20 min-h-screen bg-background" />}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  );
}
