import React from "react";

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  let styles = "bg-white/5 text-text-muted border-white/10";

  if (["approved", "merged", "active", "completed", "accepted"].includes(normalized)) {
    styles = "bg-green-500/10 text-green-400 border-green-500/30";
  } else if (["pending", "submitted", "in_review", "awaiting_review"].includes(normalized)) {
    styles = "bg-amber-500/10 text-amber-400 border-amber-500/30";
  } else if (["rejected", "declined", "closed", "disqualified", "suspended"].includes(normalized)) {
    styles = "bg-red-primary/10 text-red-bright border-red-primary/30";
  } else if (["frozen", "archived"].includes(normalized)) {
    styles = "bg-blue-500/10 text-blue-400 border-blue-500/30";
  }

  const textSizes = size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono uppercase font-bold tracking-wider rounded-lg border ${styles} ${textSizes}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span>{status.replace("_", " ")}</span>
    </span>
  );
}
