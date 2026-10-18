import React from "react";
import Link from "next/link";
import { Home, Code2, Trophy } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
      {/* Background crimson glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-red-primary/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full glass-card p-8 sm:p-12 rounded-3xl border border-white/10 text-center relative z-10 shadow-2xl">
        <div className="flex justify-center mb-6">
          <BrandLogo size="lg" />
        </div>

        <div className="font-heading font-black text-6xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white via-red-bright to-red-primary mb-2">
          404
        </div>

        <h1 className="font-heading font-bold text-xl sm:text-2xl text-white mb-3">
          Lost in the Winter Blizzard
        </h1>

        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-8">
          The repository, branch, or document you are searching for does not exist or has been relocated to another workspace.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-primary to-red-bright hover:shadow-red-glow text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/projects"
              className="py-2.5 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-text-secondary hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-red-bright" />
              <span>Projects</span>
            </Link>

            <Link
              href="/leaderboard"
              className="py-2.5 rounded-xl bg-surface-1 border border-white/10 hover:border-red-primary/40 text-text-secondary hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Trophy className="w-3.5 h-3.5 text-red-bright" />
              <span>Leaderboard</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
