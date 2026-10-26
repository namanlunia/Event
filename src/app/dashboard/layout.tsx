"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
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
  Menu,
  X,
  ArrowRight,
  FolderGit2,
  Calendar,
  MessageSquare,
  Clock,
  User,
  LogOut,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
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

function getRoleBadgeStyle(role: string) {
  switch (role) {
    case "super_admin":
      return "bg-purple-500/15 text-purple-300 border-purple-500/30";
    case "project_admin":
      return "bg-blue-500/15 text-blue-300 border-blue-500/30";
    case "mentor":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    case "ambassador":
      return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    default:
      return "bg-red-primary/15 text-red-bright border-red-primary/30";
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
  const { activeRole, personaConfig, syncRoleFromPath } = useAppStore();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Synchronize store role when opening or changing route directly
  useEffect(() => {
    syncRoleFromPath(pathname);
  }, [pathname, syncRoleFromPath]);

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    // Clear cookies
    document.cookie = "DEV_ASSUME_ROLE=; path=/; max-age=0";
    document.cookie = "owoc_user_role=; path=/; max-age=0";
    document.cookie = "owoc_session=; path=/; max-age=0";
    document.cookie = "sb-access-token=; path=/; max-age=0";
    setUserMenuOpen(false);
    router.push("/login");
  };

  const currentTab = searchParams?.get("tab") || "overview";

  return (
    <div className="pt-28 min-h-screen flex bg-background">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar (Desktop fixed + Mobile slide-over) */}
      <aside
        className={`w-64 border-r border-white/10 bg-[#0B0B0D] flex flex-col justify-between p-4 fixed left-0 top-28 bottom-0 z-40 transition-transform duration-200 md:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Active Profile Card */}
          <div className="p-3.5 rounded-2xl bg-surface-1 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                data-testid="sidebar-avatar-initials"
                className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-primary to-red-deep border border-red-primary/40 flex items-center justify-center font-bold text-white text-xs flex-shrink-0 shadow-red-glow-sm"
              >
                {personaConfig.avatarInitials}
              </div>
              <div className="truncate">
                <div data-testid="sidebar-persona-name" className="text-xs font-bold text-white truncate">
                  {personaConfig.personaName}
                </div>
                <div data-testid="sidebar-role-label" className="text-[10px] font-mono text-red-bright uppercase font-bold truncate">
                  {personaConfig.roleLabel}
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-text-muted hover:text-white"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links for assigned role */}
          <nav data-testid="dashboard-sidebar-nav" className="space-y-1">
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

        {/* Bottom Sidebar: Clean exit link (NO role switcher) */}
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center justify-between text-xs font-mono text-text-muted hover:text-white p-2 rounded-xl hover:bg-surface-2 transition-colors"
          >
            <span>Back to OWOC</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow md:ml-64 flex flex-col min-h-screen w-full">
        {/* Dashboard Sub-header */}
        <div className="h-14 border-b border-white/10 bg-[#0B0B0D]/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-28 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg bg-surface-1 border border-white/10 text-white"
              aria-label="Open sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Breadcrumb: OWOC 2026 / {role dashboard name} */}
            <div className="flex items-center gap-2 text-xs font-mono truncate">
              <span className="text-text-muted hidden sm:inline">{SEASON_SHORT}</span>
              <span className="text-text-muted hidden sm:inline">/</span>
              <span className="text-red-bright font-bold">
                {personaConfig.breadcrumbLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Center */}
            <NotificationCenter />

            {/* User Profile Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                data-testid="user-menu-avatar"
                className="flex items-center gap-2 p-1.5 rounded-xl bg-surface-1 hover:bg-surface-2 border border-white/10 hover:border-white/20 transition-all"
                title={`${personaConfig.personaName} (${personaConfig.roleLabel})`}
                aria-label={`User menu for ${personaConfig.personaName}`}
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-primary to-red-deep flex items-center justify-center font-bold text-xs text-white">
                  {personaConfig.avatarInitials}
                </div>
                <ChevronDown className="w-3 h-3 text-text-muted hidden sm:block" />
              </button>

              {userMenuOpen && (
                <div
                  data-testid="user-profile-menu"
                  className="absolute right-0 mt-2 w-64 bg-[#121217] border border-white/10 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  {/* User Profile Header */}
                  <div className="pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-primary to-red-deep flex items-center justify-center font-bold text-sm text-white">
                        {personaConfig.avatarInitials}
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white truncate">
                          {personaConfig.personaName}
                        </div>
                        <div className="text-[11px] font-mono text-text-muted truncate">
                          @{activeRole}
                        </div>
                      </div>
                    </div>

                    {/* Read-only Role Badge */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <span
                        data-testid="user-role-badge"
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md border uppercase font-bold tracking-wider ${getRoleBadgeStyle(
                          activeRole
                        )}`}
                      >
                        {personaConfig.roleLabel}
                      </span>
                    </div>
                  </div>

                  {/* Profile Menu Actions */}
                  <div className="py-2 space-y-1">
                    <Link
                      href="/rules"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-text-secondary hover:text-white hover:bg-surface-2 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-text-muted" />
                      <span>Documentation & Guide</span>
                    </Link>

                    <Link
                      href="/code-of-conduct"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-text-secondary hover:text-white hover:bg-surface-2 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-text-muted" />
                      <span>Code of Conduct</span>
                    </Link>
                  </div>

                  {/* Sign Out Button */}
                  <div className="pt-2 border-t border-white/10">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-red-bright hover:bg-red-primary/10 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

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
