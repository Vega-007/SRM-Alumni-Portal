"use client";

import React, { useEffect, useRef } from "react";

interface Beam {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
  width: number;
  color: string;
}

export default function BackgroundBeams() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Color palette matching SRMist tokens: deep slate, gold, and deep crimson
    const colors = [
      "rgba(144, 10, 34, 0.12)", // Crimson
      "rgba(250, 204, 21, 0.08)", // Gold
      "rgba(59, 130, 246, 0.08)",  // Slate blue
    ];

    const beamsCount = 18;
    const beams: Beam[] = [];

    // Initialize beams
    for (let i = 0; i < beamsCount; i++) {
      beams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 300 + 150,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.7 + 0.3,
        angle: Math.random() * 0.2 - 0.1 + Math.PI / 4, // angle downwards right
        width: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const drawBeam = (beam: Beam) => {
      if (!ctx) return;
      ctx.beginPath();

      const startX = beam.x;
      const startY = beam.y;
      const endX = beam.x + Math.cos(beam.angle) * beam.length;
      const endY = beam.y + Math.sin(beam.angle) * beam.length;

      // Create glowing gradient for each beam
      const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(0.3, beam.color);
      gradient.addColorStop(0.7, beam.color);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = beam.width;
      ctx.shadowBlur = 10;
      ctx.shadowColor = beam.color;

      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw horizontal grid lines for tech blueprint overlay
      const isDark = document.documentElement.classList.contains("dark");
      ctx.strokeStyle = isDark ? "rgba(15, 23, 42, 0.25)" : "rgba(203, 213, 225, 0.45)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw and update beams
      beams.forEach((beam) => {
        // Subtle mouse influence: bend the angle slightly toward mouse
        const dx = mouseRef.current.x - beam.x;
        const dy = mouseRef.current.y - beam.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400) {
          const targetAngle = Math.atan2(dy, dx);
          beam.angle += (targetAngle - beam.angle) * 0.01;
        }

        // Move beams
        beam.x += Math.cos(beam.angle) * beam.speed;
        beam.y += Math.sin(beam.angle) * beam.speed;

        // Reset beam if it goes off screen
        if (beam.x > width + 100 || beam.y > height + 100 || beam.x < -100 || beam.y < -100) {
          beam.x = Math.random() * width - 100;
          beam.y = -150;
          beam.speed = Math.random() * 0.4 + 0.1;
          beam.length = Math.random() * 300 + 150;
        }

        drawBeam(beam);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
