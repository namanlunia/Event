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

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
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

    const render = () => {
      ctx.clearRect(0, 0, width, height);

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

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.type === "ember") {
          ctx.shadowBlur = p.glow;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
        } else {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * 0.5;
        }

        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

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
