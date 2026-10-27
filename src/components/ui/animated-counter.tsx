"use client";

import React, { useEffect, useRef, useState } from "react";

export interface AnimatedCounterProps {
  value?: number | null | undefined;
  to?: number | null | undefined;
  suffix?: string;
  prefix?: string;
  duration?: number; // Duration in seconds, default 1.6s
  decimals?: number;
  className?: string;
  fallbackText?: string;
}

/**
 * Standard easeOutExpo easing: fast acceleration, smooth exponential decay.
 * p in [0, 1] -> eased progress with easeOutExpo(1) === 1 exactly.
 */
const easeOutExpo = (p: number): number => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p));

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

/**
 * Scroll-triggered animated number counter.
 *
 * Dependency-free implementation (replaces framer-motion's `useInView` +
 * `animate` with native IntersectionObserver + a requestAnimationFrame tween)
 * while preserving the exact same behavior contract:
 *  - SSR/no-JS render is the final formatted value (no hydration flash)
 *  - Animates only once when 30% visible (with -40px bottom resting margin)
 *  - Respects `(prefers-reduced-motion: reduce)`
 *  - 3s safety timeout guarantees the final value is always shown
 */
export function AnimatedCounter({
  value,
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  decimals = 0,
  className = "",
  fallbackText = "—",
}: AnimatedCounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  // If value or to is provided, resolve target value
  const rawVal = value !== undefined ? value : to;
  const isValidNumber = typeof rawVal === "number" && !isNaN(rawVal) && isFinite(rawVal);
  const targetValue = isValidNumber ? rawVal : 0;
  const isZeroOrEmpty = !isValidNumber || targetValue === 0;

  // CRITICAL REQUIREMENT: Server and no-JS default is the FINAL formatted value.
  // Initial state MUST be the final target value, never 0.
  const [displayValue, setDisplayValue] = useState<number>(targetValue);

  // Enter-viewport trigger once element is 30% visible
  const [isInView, setIsInView] = useState<boolean>(false);

  const hasAnimatedRef = useRef<boolean>(false);
  const safetyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep displayValue synced if targetValue prop changes
  useEffect(() => {
    if (hasAnimatedRef.current) {
      setDisplayValue(targetValue);
    }
  }, [targetValue]);

  // Observe entering the viewport (IntersectionObserver, fire-once)
  useEffect(() => {
    if (isZeroOrEmpty) {
      return;
    }

    if (typeof window !== "undefined" && typeof window.IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const el = containerRef.current;
    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          observer.disconnect();
          setIsInView(true);
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [isZeroOrEmpty]);

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

    if (!window.IntersectionObserver) {
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

      let rafId: number;
      const durationMs = Math.max(duration, 0.3) * 1000;
      const startTime = performance.now();

      const tick = (now: number) => {
        const p = Math.min((now - startTime) / durationMs, 1);
        setDisplayValue(targetValue * easeOutExpo(p));
        if (p < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setDisplayValue(targetValue);
          if (safetyTimeoutRef.current) {
            clearTimeout(safetyTimeoutRef.current);
          }
        }
      };

      rafId = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(rafId);
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
