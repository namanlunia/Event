"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: "snow" | "ember";
  color: string;
  glow: number;
}

/**
 * Prerender an ember glow sprite once instead of paying for `ctx.shadowBlur`
 * (one of the slowest canvas operations) on every particle, every frame.
 * The sprite is a solid glowing core with a soft radial halo, scaled per
 * particle at draw time — visually equivalent and dramatically cheaper.
 */
const SPRITE_SIDE = 96;
const SPRITE_CORE = 6; // sprite px representing a baseline particle radius
const SPRITE_GLOW = 44; // sprite px radius of the soft halo

const spriteCache = new Map<string, HTMLCanvasElement>();

function getEmberSprite(color: string): HTMLCanvasElement | null {
  const cached = spriteCache.get(color);
  if (cached) return cached;

  const sprite = document.createElement("canvas");
  sprite.width = SPRITE_SIDE;
  sprite.height = SPRITE_SIDE;
  const ctx = sprite.getContext("2d");
  if (!ctx) return null;

  const center = SPRITE_SIDE / 2;

  // Soft radial halo
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, SPRITE_GLOW);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.28, color);
  gradient.addColorStop(0.62, color);
  gradient.addColorStop(1, color);

  ctx.globalAlpha = 0.42;
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(center, center, SPRITE_GLOW, 0, Math.PI * 2);
  ctx.fill();

  // Bright crisp core
  ctx.globalAlpha = 1;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(center, center, SPRITE_CORE, 0, Math.PI * 2);
  ctx.fill();

  spriteCache.set(color, sprite);
  return sprite;
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number
) {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((p) => {
    if (p.type === "ember") {
      const sprite = getEmberSprite(p.color);
      if (sprite) {
        const scale = p.size / SPRITE_CORE;
        const drawSize = SPRITE_SIDE * scale;
        ctx.globalAlpha = p.opacity;
        ctx.drawImage(sprite, p.x - drawSize / 2, p.y - drawSize / 2, drawSize, drawSize);
      } else {
        // Fallback: plain circle if sprite creation is unavailable
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity * 0.5;
      ctx.fill();
    }
  });
}

export default function EmberSnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Keep the background looking correct after any resize without motion
      if (prefersReducedMotion || document.hidden) {
        drawParticles(ctx, particles, width, height);
      }
    };

    window.addEventListener("resize", handleResize);

    // Create particles (blend of winter snowflakes and rising red embers)
    const particleCount = Math.min(85, Math.floor((width * height) / 16000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isEmber = Math.random() > 0.55;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isEmber ? Math.random() * 2.5 + 1 : Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: isEmber ? -(Math.random() * 0.9 + 0.3) : Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        type: isEmber ? "ember" : "snow",
        color: isEmber
          ? Math.random() > 0.4
            ? "#FF3B4A"
            : "#E11D2E"
          : "#FFFFFF",
        glow: isEmber ? Math.random() * 10 + 6 : 0,
      });
    }

    const updateParticles = () => {
      particles.forEach((p) => {
        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.type === "ember") {
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        } else {
          if (p.y > height + 10) {
            p.y = -10;
            p.x = Math.random() * width;
          }
        }

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      });
    };

    const render = () => {
      if (document.hidden) {
        // Stop scheduling while the tab is hidden; resumed on visibilitychange
        isRunning = false;
        return;
      }

      updateParticles();
      drawParticles(ctx, particles, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    let isRunning = false;

    const startLoop = () => {
      if (isRunning || prefersReducedMotion || document.hidden) return;
      isRunning = true;
      animationFrameId = requestAnimationFrame(render);
    };

    if (prefersReducedMotion) {
      // Draw a tasteful single static frame; no animation loop
      drawParticles(ctx, particles, width, height);
    } else {
      startLoop();

      const handleVisibility = () => {
        if (document.hidden) {
          cancelAnimationFrame(animationFrameId);
          isRunning = false;
        } else {
          startLoop();
        }
      };
      document.addEventListener("visibilitychange", handleVisibility);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibility);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
