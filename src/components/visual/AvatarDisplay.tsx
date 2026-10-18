"use client";

import React from "react";

export function getInitials(name: string): string {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Generates an SVG initials avatar data URI with consistent gradient background.
 */
export function getInitialsAvatar(name: string): string {
  const initials = getInitials(name);
  const colors = [
    ["#E11D2E", "#8B0A1A"],
    ["#3B82F6", "#1D4ED8"],
    ["#10B981", "#047857"],
    ["#8B5CF6", "#6D28D9"],
    ["#F59E0B", "#B45309"],
  ];
  const charCode = (initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % colors.length;
  const [startColor, endColor] = colors[charCode];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${startColor}" />
        <stop offset="100%" stop-color="${endColor}" />
      </linearGradient>
    </defs>
    <rect width="128" height="128" rx="32" fill="url(#grad)" />
    <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="44" fill="#ffffff">${initials}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export interface AvatarDisplayProps {
  name: string;
  avatarUrl?: string;
  className?: string;
  githubUsername?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function AvatarDisplay({
  name,
  avatarUrl,
  className,
  githubUsername,
  size = "md",
}: AvatarDisplayProps) {
  const sizeClasses = {
    xs: "w-6 h-6 rounded-lg text-[10px]",
    sm: "w-8 h-8 rounded-xl text-xs",
    md: "w-10 h-10 rounded-xl text-sm",
    lg: "w-16 h-16 rounded-2xl text-base",
    xl: "w-20 h-20 rounded-3xl text-xl",
  };

  const defaultClasses = sizeClasses[size] || sizeClasses.md;
  const appliedClasses = className ? className : defaultClasses;

  // If a valid GitHub avatar is provided or GitHub username exists, use official GitHub avatar
  const effectiveUrl =
    githubUsername && !avatarUrl?.includes("unsplash.com")
      ? `https://github.com/${githubUsername}.png`
      : avatarUrl && !avatarUrl.includes("unsplash.com")
      ? avatarUrl
      : getInitialsAvatar(name);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={effectiveUrl}
      alt={name}
      className={`object-cover bg-surface-2 ${appliedClasses}`}
      onError={(e) => {
        // Fallback to initials if external image fails
        e.currentTarget.src = getInitialsAvatar(name);
      }}
    />
  );
}

export default AvatarDisplay;
