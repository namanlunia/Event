"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  LayoutDashboard,
  User,
  Users,
  Layers,
  Sparkles,
  ShieldAlert,
  ChevronDown,
  Bell,
  Check,
  Award,
  BookOpen,
  ArrowRight,
  LogOut,
} from "lucide-react";
import { DEMO_PERSONAS, useAppStore } from "@/lib/store";
import { UserRole } from "@/types";
import AvatarDisplay from "@/components/visual/AvatarDisplay";
import { SITE_CONFIG } from "@/lib/site-config";
import { PHASES } from "@/lib/season";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { currentPersona, switchRole } = useAppStore();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const codingStartDate = new Date(`${PHASES[2].startDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const notifications = [
    {
      id: "n-1",
      title: "Welcome to OWOC",
      desc: "Registration is open. Browse repositories and prepare for the coding sprint.",
      time: "Recent",
    },
    {
      id: "n-2",
      title: "Coding Sprint Notice",
      desc: `Coding sprint begins ${codingStartDate}.`,
      time: "Upcoming",
    },
  ];

  const roleNavItems: Record<UserRole, { name: string; href: string; icon: React.ReactNode }[]> = {
    contributor: [
      { name: "My Activity & PRs", href: "/dashboard/contributor", icon: <LayoutDashboard className="w-4 h-4" /> },
      { name: "Browse Projects", href: "/projects", icon: <Layers className="w-4 h-4" /> },
      { name: "Live Leaderboard", href: "/leaderboard", icon: <Award className="w-4 h-4" /> },
      { name: "Points & Rules", href: "/rules", icon: <BookOpen className="w-4 h-4" /> },
      { name: "Verify Certificate", href: "/certificate", icon: <Award className="w-4 h-4" /> },
    ],
    ambassador: [
      { name: "Ambassador Overview", href: "/dashboard/ambassador", icon: <LayoutDashboard className="w-4 h-4" /> },
      { name: "Referral Kit & Stats", href: "/dashboard/ambassador#referrals", icon: <Sparkles className="w-4 h-4" /> },
      { name: "College Standings", href: "/leaderboard", icon: <Award className="w-4 h-4" /> },
      { name: "Reward Tiers", href: "/ambassadors", icon: <GiftIcon /> },
    ],
    mentor: [
      { name: "Mentor Workspace", href: "/dashboard/mentor", icon: <LayoutDashboard className="w-4 h-4" /> },
      { name: "PR Review Queue", href: "/dashboard/mentor#reviews", icon: <Layers className="w-4 h-4" /> },
      { name: "Mentors Directory", href: "/mentors", icon: <Users className="w-4 h-4" /> },
      { name: "Points Ledger Rules", href: "/rules", icon: <BookOpen className="w-4 h-4" /> },
    ],
    maintainer: [
      { name: "Maintainer Console", href: "/dashboard/maintainer", icon: <LayoutDashboard className="w-4 h-4" /> },
      { name: "Issue Assignment", href: "/dashboard/maintainer#issues", icon: <Layers className="w-4 h-4" /> },
      { name: "Submit New Project", href: "/dashboard/maintainer#submit", icon: <Flame className="w-4 h-4" /> },
      { name: "Repository Directory", href: "/projects", icon: <Layers className="w-4 h-4" /> },
    ],
    admin: [
      { name: "Super Admin Command", href: "/dashboard/admin", icon: <ShieldAlert className="w-4 h-4 text-red-bright" /> },
      { name: "Project Approvals", href: "/dashboard/admin#projects", icon: <Layers className="w-4 h-4" /> },
      { name: "Leaderboard & Export", href: "/leaderboard", icon: <Award className="w-4 h-4" /> },
      { name: "System Audit Logs", href: "/dashboard/admin#logs", icon: <BookOpen className="w-4 h-4" /> },
    ],
  };

  const currentNav = roleNavItems[currentPersona.role] || roleNavItems.contributor;

  return (
    <div className="pt-20 min-h-screen flex bg-background">
      {/* Sidebar (Desktop) */}
      <aside className="w-64 border-r border-white/10 bg-[#0B0B0D] hidden md:flex flex-col justify-between p-4 fixed left-0 top-20 bottom-0 z-20">
        <div className="space-y-6">
          {/* Active Persona Profile Card */}
          <div className="p-3.5 rounded-2xl bg-surface-1 border border-white/10 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentPersona.avatar}
              alt={currentPersona.name}
              className="w-10 h-10 rounded-full object-cover border border-red-bright"
            />
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">
                {currentPersona.name}
              </div>
              <div className="text-[10px] font-mono text-red-bright truncate">
                {currentPersona.title}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-text-muted px-3 block mb-2">
              Workspace Nav
            </span>
            {currentNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-red-primary/15 text-red-bright border border-red-primary/40 font-bold"
                      : "text-text-secondary hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Action: Switch Persona */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <div className="text-[10px] font-mono text-text-muted px-1">
            Switch Testing Persona:
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {DEMO_PERSONAS.map((p) => (
              <button
                key={p.role}
                onClick={() => switchRole(p.role)}
                className={`p-1.5 rounded-lg text-left text-[11px] font-mono border truncate ${
                  currentPersona.role === p.role
                    ? "bg-red-primary/20 border-red-bright text-white font-bold"
                    : "bg-surface-2 border-white/5 text-text-muted hover:text-white"
                }`}
              >
                {p.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow md:ml-64 flex flex-col min-h-screen">
        {/* Dashboard Sub-header */}
        <div className="h-14 border-b border-white/10 bg-[#0B0B0D]/70 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-20 z-10">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-text-muted">OWOC</span>
            <span className="text-text-muted">/</span>
            <span className="text-red-bright capitalize font-bold">
              {currentPersona.role} Workspace
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-lg bg-surface-1 border border-white/10 text-text-secondary hover:text-white relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-bright animate-ping" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface-1 border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                    <span className="font-heading font-bold text-xs text-white">
                      Notifications
                    </span>
                    <span className="text-[10px] font-mono text-red-bright">
                      3 Unread
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-2.5 rounded-xl bg-surface-2 border border-white/5 space-y-1"
                      >
                        <div className="text-xs font-bold text-white">{n.title}</div>
                        <div className="text-[11px] text-text-muted">{n.desc}</div>
                        <div className="text-[9px] font-mono text-text-secondary">
                          {n.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Link to public views */}
            <Link
              href="/"
              className="text-xs font-mono text-text-muted hover:text-white hidden sm:block"
            >
              Exit to Home →
            </Link>
          </div>
        </div>

        {/* Dashboard Page Body */}
        <div className="p-4 sm:p-8 flex-grow">{children}</div>
      </div>
    </div>
  );
}

function GiftIcon() {
  return <Sparkles className="w-4 h-4" />;
}
