"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export interface AnimatedCounterProps {
  value: number | null | undefined;
  suffix?: string;
  prefix?: string;
  duration?: number; // Duration in seconds, default 1.6s
  decimals?: number;
  className?: string;
  fallbackText?: string;
}

/**
 * Standard easeOutExpo easing bezier curve: fast acceleration, smooth exponential decay.
 */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Format number with Intl.NumberFormat using US locale (comma separators).
 */
function formatLocaleNumber(val: number, decimals: number = 0): string {
  if (isNaN(val) || !isFinite(val)) return "0";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(val);
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
  decimals = 0,
  className = "",
  fallbackText = "—",
}: AnimatedCounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  // If value is null, undefined, or 0, do not show "0+", render muted placeholder
  const isValidNumber = typeof value === "number" && !isNaN(value) && isFinite(value);
  const targetValue = isValidNumber ? value : 0;
  const isZeroOrEmpty = !isValidNumber || targetValue === 0;

  // CRITICAL REQUIREMENT: Server and no-JS default is the FINAL formatted value.
  // Initial state MUST be the final target value, never 0.
  const [displayValue, setDisplayValue] = useState<number>(targetValue);

  // Trigger on scroll via framer-motion useInView
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.3,
    margin: "0px 0px -40px 0px",
  });

  const hasAnimatedRef = useRef<boolean>(false);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keep displayValue synced if targetValue prop changes
  useEffect(() => {
    if (hasAnimatedRef.current) {
      setDisplayValue(targetValue);
    }
  }, [targetValue]);

  useEffect(() => {
    // If invalid or zero, no animation needed
    if (isZeroOrEmpty) {
      return;
    }

    // Respect user's accessibility reduced motion preferences
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayValue(targetValue);
      hasAnimatedRef.current = true;
      return;
    }

    // Check for IntersectionObserver availability
    if (typeof window !== "undefined" && typeof window.IntersectionObserver === "undefined") {
      setDisplayValue(targetValue);
      hasAnimatedRef.current = true;
      return;
    }

    // Safety fallback: if 3 seconds elapse, guarantee final value is visible
    safetyTimeoutRef.current = setTimeout(() => {
      if (!hasAnimatedRef.current) {
        setDisplayValue(targetValue);
      }
    }, 3000);

    // Only start counting once element enters viewport
    if (isInView && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;

      const controls = animate(0, targetValue, {
        duration: Math.max(duration, 0.3),
        ease: EASE_OUT_EXPO,
        onUpdate: (latest) => {
          setDisplayValue(latest);
        },
        onComplete: () => {
          setDisplayValue(targetValue);
          if (safetyTimeoutRef.current) {
            clearTimeout(safetyTimeoutRef.current);
          }
        },
      });

      return () => {
        controls.stop();
        if (safetyTimeoutRef.current) {
          clearTimeout(safetyTimeoutRef.current);
        }
      };
    }

    return () => {
      if (safetyTimeoutRef.current) {
        clearTimeout(safetyTimeoutRef.current);
      }
    };
  }, [isInView, targetValue, duration, isZeroOrEmpty]);

  // When value is 0 or unavailable, render fallback without lone "0+"
  if (isZeroOrEmpty) {
    return (
      <span
        ref={containerRef}
        className={`tabular-nums text-text-muted inline-block ${className}`}
        aria-label={fallbackText}
      >
        {fallbackText}
      </span>
    );
  }

  const finalFormatted = `${prefix}${formatLocaleNumber(targetValue, decimals)}${suffix}`;
  const currentFormatted = `${prefix}${formatLocaleNumber(displayValue, decimals)}${suffix}`;

  return (
    <span
      ref={containerRef}
      className={`tabular-nums inline-grid items-baseline relative select-none ${className}`}
      role="text"
      aria-label={finalFormatted}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {/* Invisible placeholder reserving exact width and height to prevent layout shift */}
      <span
        className="invisible select-none pointer-events-none col-start-1 row-start-1"
        aria-hidden="true"
      >
        {finalFormatted}
      </span>

      {/* Screen-reader hidden animated visual text placed in identical grid coordinate */}
      <span className="col-start-1 row-start-1 inline-block" aria-hidden="true">
        {currentFormatted}
      </span>
    </span>
  );
}

export default AnimatedCounter;
