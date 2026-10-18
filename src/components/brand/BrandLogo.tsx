"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  className?: string;
  asLink?: boolean;
  href?: string;
}

export default function BrandLogo({
  size = "md",
  priority = false,
  className = "",
  asLink = false,
  href = "/",
}: BrandLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-10 h-10 rounded-xl",
    lg: "w-14 h-14 rounded-2xl",
  }[size];

  const pixelDimensions = {
    sm: 32,
    md: 40,
    lg: 56,
  }[size];

  const content = (
    <div
      className={`relative ${sizeClasses} bg-gradient-to-br from-red-primary to-red-deep p-[1px] shadow-red-glow-sm transition-transform duration-300 group-hover:scale-105 flex-shrink-0 ${className}`}
    >
      <div className="w-full h-full bg-[#0B0B0D] rounded-[inherit] flex items-center justify-center relative overflow-hidden">
        <span className="absolute inset-0 bg-red-glow/20 blur-sm pointer-events-none" />
        <Image
          src="/brand/owoc-logo-emblem-256.png"
          alt="Omnikon logo"
          width={pixelDimensions}
          height={pixelDimensions}
          priority={priority}
          sizes={`${pixelDimensions}px`}
          className="w-full h-full object-cover rounded-[inherit] relative z-10"
        />
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link href={href} className="inline-flex group flex-shrink-0" aria-label="Omnikon logo">
        {content}
      </Link>
    );
  }

  return content;
}
