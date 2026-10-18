"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

export const BANNER_WORDMARK = "OMNIKON";

export default function OmnikonBanner() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  // Track letter element references for proximity interaction
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Split wordmark into individual characters
  const letters = useMemo(() => BANNER_WORDMARK.split(""), []);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  // Lightweight particle canvas
  useEffect(() => {
    if (!mounted || reducedMotion) return;
    const canvas = canvasRef.current;
    const panel = panelRef.current;
    if (!canvas || !panel) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let isTabVisible = !document.hidden;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = panel.clientWidth * dpr);
    let height = (canvas.height = panel.clientHeight * dpr);
    canvas.style.width = `${panel.clientWidth}px`;
    canvas.style.height = `${panel.clientHeight}px`;

    const handleResize = () => {
      if (!canvas || !panel) return;
      width = canvas.width = panel.clientWidth * dpr;
      height = canvas.height = panel.clientHeight * dpr;
      canvas.style.width = `${panel.clientWidth}px`;
      canvas.style.height = `${panel.clientHeight}px`;
    };

    window.addEventListener("resize", handleResize);

    // Particle count: ~65 on desktop, ~30 on mobile
    const particleCount = Math.max(25, Math.min(70, Math.floor(panel.clientWidth / 18)));
    interface Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      baseAlpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
      color: string;
    }

    const particles: Particle[] = [];
    const colors = ["#E11D2E", "#FF3B4A", "#8B0A1A", "#FFA4AD"];

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.45 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: (Math.random() * 1.6 + 0.6) * dpr,
        vx: (Math.random() - 0.5) * 0.35 * dpr,
        vy: -(Math.random() * 0.45 + 0.15) * dpr,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: Math.random() * 0.04 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Frame rate limiting: target ~35-40 fps for low CPU consumption
    let lastTime = performance.now();
    const frameInterval = 1000 / 38;

    const render = (now: number) => {
      if (!isVisible || !isTabVisible) {
        return; // Don't request next frame while offscreen/hidden
      }

      animId = requestAnimationFrame(render);

      const delta = now - lastTime;
      if (delta < frameInterval) return;
      lastTime = now - (delta % frameInterval);

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.twinklePhase += p.twinkleSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.twinklePhase) * (p.baseAlpha * 0.5);

        // Wrap boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, p.alpha));
        ctx.fill();
        ctx.restore();
      }
    };

    // IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible && isTabVisible) {
          lastTime = performance.now();
          animId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(panel);

    // Tab visibility handling
    const handleVisibility = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && isVisible) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Start loop
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  }, [mounted, reducedMotion]);

  // Pointer tracking & proximity letter interaction (Desktop only)
  useEffect(() => {
    if (reducedMotion || !mounted) return;
    const panel = panelRef.current;
    if (!panel) return;

    // Check fine pointer support
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasFinePointer) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isActive = false;
    let rafId: number;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = panel.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      isActive = true;
    };

    const handlePointerLeave = () => {
      isActive = false;
      setMousePos((prev) => ({ ...prev, active: false }));
      // Reset letter styles
      lettersRef.current.forEach((el) => {
        if (el) {
          el.style.filter = "";
          el.style.transform = "";
        }
      });
    };

    const updatePointer = () => {
      if (isActive) {
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;
        setMousePos({ x: currentX, y: currentY, active: true });

        // Calculate proximity for each letter
        lettersRef.current.forEach((el) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const panelRect = panel.getBoundingClientRect();
          const letterCenterX = rect.left - panelRect.left + rect.width / 2;
          const letterCenterY = rect.top - panelRect.top + rect.height / 2;

          const dx = currentX - letterCenterX;
          const dy = currentY - letterCenterY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const factor = 1 - dist / 140;
            const brightness = 1 + factor * 0.35;
            el.style.filter = `brightness(${brightness.toFixed(2)})`;
            el.style.transform = `scale(${(1 + factor * 0.03).toFixed(3)})`;
          } else {
            el.style.filter = "";
            el.style.transform = "";
          }
        });
      }
      rafId = requestAnimationFrame(updatePointer);
    };

    panel.addEventListener("pointermove", handlePointerMove);
    panel.addEventListener("pointerleave", handlePointerLeave);
    rafId = requestAnimationFrame(updatePointer);

    return () => {
      panel.removeEventListener("pointermove", handlePointerMove);
      panel.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, [mounted, reducedMotion]);

  return (
    <div
      ref={panelRef}
      data-testid="omnikon-banner"
      className="relative w-full rounded-3xl overflow-hidden border border-white/10 bg-[#070709] min-h-[240px] sm:min-h-[290px] md:min-h-[330px] flex flex-col items-center justify-center p-6 sm:p-10 select-none shadow-[0_0_50px_-15px_rgba(225,29,46,0.22)]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(225, 29, 46, 0.11) 0%, rgba(11, 11, 13, 0.85) 60%, #050505 100%)",
      }}
    >
      {/* 1. HUD Corner Brackets */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-4 left-4 sm:top-5 sm:left-5 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-red-bright/60 transition-opacity"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-4 sm:top-5 sm:right-5 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-red-bright/60 transition-opacity"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-4 sm:bottom-5 sm:left-5 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2 border-red-bright/60 transition-opacity"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 right-4 sm:bottom-5 sm:right-5 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-red-bright/60 transition-opacity"
      />

      {/* 2. Faint Grid Layer with Radial Mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-80"
        style={{
          backgroundSize: "36px 36px",
          backgroundImage:
            "linear-gradient(to right, rgba(225, 29, 46, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(225, 29, 46, 0.08) 1px, transparent 1px)",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 75%)",
        }}
      />

      {/* 3. Edge Light Streaks */}
      {!reducedMotion && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 w-24 sm:w-36 h-[1px] bg-gradient-to-r from-red-bright/40 to-transparent omnikon-edge-streak-left"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 w-24 sm:w-36 h-[1px] bg-gradient-to-l from-red-bright/40 to-transparent omnikon-edge-streak-right"
          />
        </>
      )}

      {/* 4. Canvas Particle Layer */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        data-testid="omnikon-banner-canvas"
        className={`pointer-events-none absolute inset-0 z-10 ${
          reducedMotion ? "hidden" : "block"
        }`}
      />

      {/* 5. Pointer Red Glow Trail (Desktop only) */}
      {!reducedMotion && mousePos.active && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-15 w-32 h-8 rounded-full bg-red-bright/20 blur-xl -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        />
      )}

      {/* 6. Wordmark & Glow Line Section */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
        {/* Wordmark Container */}
        <div
          data-testid="omnikon-wordmark"
          role="img"
          aria-label={BANNER_WORDMARK}
          className="relative inline-flex items-center justify-center font-mono font-black tracking-[0.14em] sm:tracking-[0.20em] text-[clamp(2.5rem,8vw,5.75rem)] leading-none select-none"
        >
          {letters.map((char, idx) => (
            <span
              key={`${char}-${idx}`}
              ref={(el) => {
                lettersRef.current[idx] = el;
              }}
              className={`inline-block transition-transform duration-150 ${
                reducedMotion ? "" : "omnikon-letter-anim"
              }`}
              style={{
                background: "linear-gradient(135deg, #E11D2E 0%, #FF3B4A 50%, #E11D2E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 20px rgba(225, 29, 46, 0.45))",
                animationDelay: reducedMotion ? "0s" : `${idx * 0.45}s`,
              }}
            >
              {char}
            </span>
          ))}

          {/* Diagonal Scan Sweep Overlay */}
          {!reducedMotion && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 omnikon-scan-sweep-layer overflow-hidden"
            >
              <div className="w-full h-full omnikon-scan-band" />
            </div>
          )}
        </div>

        {/* Glow Line Under Wordmark */}
        <div
          aria-hidden="true"
          className="relative mt-4 sm:mt-6 w-[65%] max-w-[440px] sm:max-w-[500px] h-[1.5px] overflow-hidden"
        >
          {/* Base Glowing Gradient Line */}
          <div
            className={`w-full h-full ${
              reducedMotion ? "" : "omnikon-line-pulse"
            }`}
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(225, 29, 46, 0.25) 20%, #FF3B4A 50%, rgba(225, 29, 46, 0.25) 80%, transparent 100%)",
              boxShadow: "0 0 10px 1px rgba(225, 29, 46, 0.75)",
            }}
          />

          {/* Traveling Highlight Streak along line */}
          {!reducedMotion && (
            <div className="absolute top-0 bottom-0 w-20 sm:w-28 omnikon-line-streak" />
          )}
        </div>
      </div>

      {/* Component-Scoped Keyframe Styles */}
      <style jsx>{`
        @keyframes omnikon-letter-shimmer {
          0%,
          100% {
            opacity: 0.75;
            filter: drop-shadow(0 0 16px rgba(225, 29, 46, 0.4)) brightness(0.9);
          }
          35% {
            opacity: 1;
            filter: drop-shadow(0 0 28px rgba(225, 29, 46, 0.8)) brightness(1.22);
          }
          70% {
            opacity: 0.75;
            filter: drop-shadow(0 0 16px rgba(225, 29, 46, 0.4)) brightness(0.9);
          }
        }

        .omnikon-letter-anim {
          animation: omnikon-letter-shimmer 6.5s ease-in-out infinite;
        }

        @keyframes omnikon-scan-sweep {
          0% {
            transform: translateX(-140%) skewX(-20deg);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          35% {
            transform: translateX(140%) skewX(-20deg);
            opacity: 0;
          }
          100% {
            transform: translateX(140%) skewX(-20deg);
            opacity: 0;
          }
        }

        .omnikon-scan-sweep-layer {
          mix-blend-mode: color-dodge;
        }

        .omnikon-scan-band {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 59, 74, 0.3) 45%,
            rgba(255, 255, 255, 0.75) 50%,
            rgba(255, 59, 74, 0.3) 55%,
            transparent 100%
          );
          animation: omnikon-scan-sweep 7.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes omnikon-line-pulse {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }

        .omnikon-line-pulse {
          animation: omnikon-line-pulse 4s ease-in-out infinite;
        }

        @keyframes omnikon-line-streak-anim {
          0% {
            left: -30%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          30% {
            left: 110%;
            opacity: 0;
          }
          100% {
            left: 110%;
            opacity: 0;
          }
        }

        .omnikon-line-streak {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.95) 50%,
            transparent 100%
          );
          animation: omnikon-line-streak-anim 4.2s ease-in-out infinite;
        }

        @keyframes omnikon-edge-streak-anim-left {
          0%,
          100% {
            top: 25%;
            opacity: 0;
            transform: scaleX(0.4);
          }
          12% {
            opacity: 0.8;
            transform: scaleX(1);
          }
          24% {
            opacity: 0;
            transform: scaleX(0.4);
          }
        }

        @keyframes omnikon-edge-streak-anim-right {
          0%,
          100% {
            bottom: 30%;
            opacity: 0;
            transform: scaleX(0.4);
          }
          40% {
            bottom: 30%;
            opacity: 0;
            transform: scaleX(0.4);
          }
          52% {
            opacity: 0.8;
            transform: scaleX(1);
          }
          64% {
            opacity: 0;
            transform: scaleX(0.4);
          }
        }

        .omnikon-edge-streak-left {
          animation: omnikon-edge-streak-anim-left 4.8s ease-in-out infinite;
        }

        .omnikon-edge-streak-right {
          animation: omnikon-edge-streak-anim-right 4.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
