"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Terminal,
  Flame,
  Check,
} from "lucide-react";
import { useAppStore, PERSONAS_LIST } from "@/lib/store";
import { SEASON_LABEL } from "@/lib/season";
import { DemoModeBanner } from "@/components/visual/DemoModeBanner";
import { SITE_CONFIG } from "@/lib/site-config";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const { activeRole, personaConfig, switchRole } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const primaryNavLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Timeline", href: "/timeline" },
    { name: "Mentors", href: "/mentors" },
    { name: "Ambassadors", href: "/ambassadors" },
  ];

  const moreNavLinks = [
    { name: "Rules & Points", href: "/rules" },
    { name: "Verify Cert", href: "/certificate" },
  ];

  const isMoreActive = moreNavLinks.some((l) => pathname === l.href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40"
          : "bg-transparent border-b border-white/5"
      }`}
    >
      <DemoModeBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-red-primary to-red-deep p-[1px] shadow-red-glow-sm transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#0B0B0D] rounded-xl flex items-center justify-center relative overflow-hidden">
              <span className="absolute inset-0 bg-red-glow/20 blur-sm"></span>
              {/* Geometric Ice & Fire Icon */}
              <div className="relative flex items-center justify-center">
                <Flame className="w-5 h-5 text-red-bright animate-pulse" />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black tracking-tight text-xl text-white group-hover:text-red-bright transition-colors">
                OWOC
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-red-primary/15 text-red-bright border border-red-primary/30">
                {SEASON_LABEL}
              </span>
            </div>
            <span className="text-[11px] text-text-muted tracking-wider uppercase font-medium">
              Omnikon Winter of Code
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {primaryNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "text-white bg-white/5 border border-red-primary/40 shadow-red-glow-sm"
                    : "text-text-secondary hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* More Dropdown (Rules & Points, Verify Cert) */}
          <div className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
                isMoreActive
                  ? "text-white bg-white/5 border border-red-primary/40 shadow-red-glow-sm"
                  : "text-text-secondary hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {moreDropdownOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-surface-1/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                {moreNavLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMoreDropdownOpen(false)}
                      className={`block px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                        isActive
                          ? "bg-red-primary/15 text-red-bright font-bold"
                          : "text-text-secondary hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Section: Role Persona Switcher & Dashboard Access */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Persona Switcher Modal/Dropdown (DEMO_MODE ONLY) */}
          {SITE_CONFIG.DEMO_MODE && (
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                data-testid="navbar-role-switcher"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-1 border border-white/10 hover:border-red-primary/40 transition-colors text-xs font-mono text-text-secondary hover:text-white"
                title="Test the platform as different stakeholders"
              >
                <div className="w-2 h-2 rounded-full bg-red-bright animate-ping"></div>
                <span>Role:</span>
                <span data-testid="navbar-current-role" className="text-red-bright font-bold">
                  {personaConfig.roleLabel}
                </span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {roleDropdownOpen && (
                <div data-testid="navbar-role-menu" className="absolute right-0 mt-2 w-72 bg-surface-1/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="text-xs font-mono text-red-bright uppercase font-bold tracking-wider">
                      Instant Role Switcher
                    </p>
                    <p className="text-[11px] text-text-muted">
                      Test role-based access & dashboards
                    </p>
                  </div>
                  <div className="space-y-1">
                    {PERSONAS_LIST.map((persona) => {
                      const isSelected = activeRole === persona.id;
                      return (
                        <button
                          key={persona.id}
                          data-testid={`navbar-role-option-${persona.id}`}
                          onClick={() => {
                            switchRole(persona.id);
                            router.push(persona.dashboardRoute);
                            setRoleDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                            isSelected
                              ? "bg-red-primary/15 border border-red-primary/40 text-white"
                              : "hover:bg-white/5 text-text-secondary hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-surface-2 border border-white/20 flex items-center justify-center font-bold text-white text-[10px]">
                              {persona.avatarInitials}
                            </div>
                            <div>
                              <div className="text-xs font-semibold">{persona.personaName}</div>
                              <div className="text-[10px] text-text-muted font-mono">
                                {persona.roleLabel}
                              </div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-red-bright" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Register Link */}
          <Link
            href="/register"
            className="px-3 py-1.5 text-xs font-mono text-text-secondary hover:text-white transition-colors"
          >
            Register
          </Link>

          {/* Direct Dashboard Link based on active Persona */}
          <Link
            href={personaConfig.dashboardRoute}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-red-primary hover:bg-red-bright text-white shadow-red-glow-sm hover:shadow-red-glow transition-all duration-200"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>

          {/* User Profile Avatar with Initials */}
          <Link
            href={personaConfig.dashboardRoute}
            data-testid="user-menu-avatar"
            className="w-8 h-8 rounded-lg bg-surface-2 border border-white/15 hover:border-red-primary/40 flex items-center justify-center font-bold text-xs text-white transition-colors"
            title={`${personaConfig.personaName} (${personaConfig.roleLabel})`}
            aria-label={`User menu for ${personaConfig.personaName}`}
          >
            <span>{personaConfig.avatarInitials}</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href={personaConfig.dashboardRoute}
            className="p-2 text-xs font-mono rounded-lg bg-red-primary text-white"
          >
            Dashboard
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-surface-1 border border-white/10 text-text-secondary hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-1/95 backdrop-blur-xl border-b border-white/10 px-4 py-6 space-y-4">
          <div className="space-y-1">
            {[...primaryNavLinks, ...moreNavLinks].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                  pathname === link.href
                    ? "bg-red-primary/10 text-red-bright border-l-2 border-red-bright"
                    : "text-text-secondary hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Role Switcher (DEMO_MODE ONLY) */}
          {SITE_CONFIG.DEMO_MODE && (
            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider block">
                Switch Role Workspace:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {PERSONAS_LIST.map((persona) => {
                  const isSelected = activeRole === persona.id;
                  return (
                    <button
                      key={persona.id}
                      onClick={() => {
                        switchRole(persona.id);
                        router.push(persona.dashboardRoute);
                        setMobileMenuOpen(false);
                      }}
                      className={`p-2 rounded-lg text-left text-xs border ${
                        isSelected
                          ? "bg-red-primary/20 border-red-bright text-white font-bold"
                          : "bg-surface-2 border-white/5 text-text-secondary"
                      }`}
                    >
                      <div className="font-semibold truncate">{persona.roleLabel}</div>
                      <div className="text-[10px] text-text-muted truncate">
                        {persona.personaName}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-mono rounded-lg border border-white/10 text-white"
            >
              Register for OWOC
            </Link>
            <Link
              href={personaConfig.dashboardRoute}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-semibold rounded-lg bg-red-primary text-white"
            >
              Open {personaConfig.roleLabel} Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
