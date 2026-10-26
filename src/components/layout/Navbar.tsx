"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Terminal,
} from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";
import { useAppStore } from "@/lib/store";
import { SEASON_LABEL } from "@/lib/season";
import { DemoModeBanner } from "@/components/visual/DemoModeBanner";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { personaConfig } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Timeline", href: "/timeline" },
    { name: "Mentors", href: "/mentors" },
    { name: "Ambassadors", href: "/ambassadors" },
    { name: "Rules & Points", href: "/rules" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40"
          : "bg-transparent border-b border-white/5"
      }`}
    >
      <DemoModeBanner />
      <div className="w-full px-6 lg:px-10 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <BrandLogo priority />
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

        {/* Desktop Navigation Links (All 8 items on single row, no wrap) */}
        <nav className="hidden min-[1180px]:flex items-center justify-center gap-1 xl:gap-2 flex-grow mx-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-2.5 xl:px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "text-white bg-white/5 border border-red-primary/40 shadow-red-glow-sm"
                    : "text-text-secondary hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Section: Register & Dashboard Access */}
        <div className="hidden min-[1180px]:flex items-center gap-3 flex-shrink-0">
          {/* Register Link */}
          <Link
            href="/register"
            className="px-3 py-1.5 text-xs font-mono text-text-secondary hover:text-white transition-colors whitespace-nowrap"
          >
            Register
          </Link>

          {/* Direct Dashboard Link based on active Persona */}
          <Link
            href={personaConfig.dashboardRoute}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-red-primary hover:bg-red-bright text-white shadow-red-glow-sm hover:shadow-red-glow transition-all duration-200 whitespace-nowrap"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex min-[1180px]:hidden items-center gap-2 flex-shrink-0">
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
        <div className="min-[1180px]:hidden bg-surface-1/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                  pathname === link.href
                    ? "bg-red-primary/10 text-red-bright border-l-2 border-red-bright font-bold"
                    : "text-text-secondary hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-mono rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
            >
              Register for OWOC
            </Link>
            <Link
              href={personaConfig.dashboardRoute}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-semibold rounded-lg bg-red-primary hover:bg-red-bright text-white shadow-red-glow-sm transition-colors"
            >
              Open {personaConfig.roleLabel} Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
