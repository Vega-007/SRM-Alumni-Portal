"use client";

import { m, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Globe } from "lucide-react";
import { MOCK_MAP_HUBS } from "@/data/mockData";
import { ErrorBoundary } from "../ErrorBoundary";

const connectionArcs = [
  { from: "Chennai", to: "San Francisco", d: "M 515 298 Q 722 100 930 175", duration: 2.5 },
  { from: "Chennai", to: "London", d: "M 515 298 Q 387 180 260 140", duration: 2.0 },
  { from: "Chennai", to: "Bengaluru", d: "M 515 298 Q 507 294 500 290", duration: 1.0 },
  { from: "Chennai", to: "Singapore", d: "M 515 298 Q 537 309 560 320", duration: 1.2 },
  { from: "Chennai", to: "Tokyo", d: "M 515 298 Q 577 190 640 190", duration: 2.2 },
  { from: "Chennai", to: "Sydney", d: "M 515 298 Q 597 354 680 410", duration: 2.4 },
  { from: "Chennai", to: "Seattle", d: "M 515 298 Q 732 100 950 125", duration: 2.6 },
];

export function GlobalMap() {
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="lg:col-span-7 flex justify-center items-center relative z-10 w-full"
    >
      <div className="relative w-full aspect-[2/1] max-w-[700px] border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 rounded-3xl p-4 md:p-6 backdrop-blur-md shadow-sm overflow-hidden">
        <ErrorBoundary>
          <svg viewBox="0 0 1000 500" className="w-full h-full relative">
            <defs>
              <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8B1E0F" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#050c1a" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B1E0F" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#E5A93C" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8B1E0F" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <circle cx="500" cy="250" r="300" fill="url(#mapGlow)" />
            <g className="fill-slate-200/70 dark:fill-slate-800/50 stroke-slate-300 dark:stroke-slate-700/80 transition-colors duration-500" strokeWidth="1.5">
              <path d="M 0 50 L 60 40 L 40 75 L 0 70 Z" />
              <path d="M 860 120 L 900 100 L 940 80 L 1000 80 L 1000 185 L 980 190 L 960 200 L 940 210 L 920 240 L 930 280 L 910 280 L 900 250 L 870 200 L 850 170 Z" />
              <path d="M 0 80 L 40 90 L 80 120 L 40 180 L 0 185 Z" />
              <path d="M 910 280 L 940 290 L 960 320 L 970 360 L 950 420 L 930 450 L 920 440 L 900 380 L 895 320 Z" />
              <path d="M 170 85 L 190 80 L 185 95 Z" />
              <path d="M 210 230 L 260 220 L 300 225 L 340 250 L 330 290 L 290 370 L 270 400 L 255 410 L 245 390 L 240 320 L 200 295 L 195 260 Z" />
              <path d="M 325 360 L 335 350 L 330 380 Z" />
              <path d="M 150 120 L 210 110 L 300 90 L 380 70 L 480 60 L 580 65 L 660 75 L 720 100 L 730 120 L 690 170 L 650 185 L 640 210 L 610 220 L 590 270 L 560 300 L 540 280 L 500 300 L 460 260 L 410 245 L 370 255 L 340 180 L 280 185 L 210 170 Z" />
              <path d="M 650 160 L 660 150 L 665 180 L 655 190 Z" />
              <path d="M 600 380 L 660 375 L 700 400 L 685 445 L 625 440 L 595 410 Z" />
              <path d="M 720 450 L 730 445 L 725 470 Z" />
            </g>
            {!shouldReduceMotion && connectionArcs.map((arc, index) => (
              <g key={index}>
                <path d={arc.d} fill="none" stroke="rgba(229, 169, 60, 0.08)" strokeWidth="1.5" />
                <path d={arc.d} fill="none" stroke="rgba(139, 30, 15, 0.25)" strokeWidth="1.5" strokeDasharray="4 6" />
                <m.path
                  d={arc.d}
                  fill="none"
                  stroke="url(#arcGradient)"
                  strokeWidth="2.5"
                  strokeDasharray="12 250"
                  animate={{ strokeDashoffset: [0, -300] }}
                  transition={{ duration: arc.duration, repeat: Infinity, ease: "linear" }}
                />
              </g>
            ))}
            {MOCK_MAP_HUBS.map((hub) => {
              const cx = hub.coordinates.x * 10;
              const cy = hub.coordinates.y * 5;
              const isHovered = hoveredHub === hub.id;
              const isPrimary = hub.isPrimary;
              return (
                <g key={hub.id} onMouseEnter={() => setHoveredHub(hub.id)} onMouseLeave={() => setHoveredHub(null)} className="cursor-pointer">
                  {!shouldReduceMotion && (
                    <circle cx={cx} cy={cy} r={isPrimary ? 24 : 18} fill="none" stroke={isPrimary ? "#8B1E0F" : (isHovered ? "#8B1E0F" : "#E5A93C")} strokeWidth={isPrimary ? "1.5" : "1"} className="animate-ping" style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: isPrimary ? "2.5s" : "3s" }} />
                  )}
                  <circle cx={cx} cy={cy} r={isPrimary ? 14 : 10} fill="none" stroke={isPrimary ? "#E5A93C" : (isHovered ? "#E5A93C" : "#8B1E0F")} strokeWidth="1.5" className={shouldReduceMotion ? "" : "animate-pulse"} style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: "2s" }} />
                  {isPrimary ? (
                    <path d={`M ${cx} ${cy - 7} L ${cx + 7} ${cy} L ${cx} ${cy + 7} L ${cx - 7} ${cy} Z`} fill="#8B1E0F" stroke="#E5A93C" strokeWidth="1.5" />
                  ) : (
                    <circle cx={cx} cy={cy} r={5} fill={isHovered ? "#8B1E0F" : "#E5A93C"} />
                  )}
                </g>
              );
            })}
          </svg>
          {MOCK_MAP_HUBS.map((hub) => {
            if (hoveredHub !== hub.id) return null;
            return (
              <m.div key={hub.id} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="absolute z-20 bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-slate-800/60 rounded-xl p-3 shadow-2xl pointer-events-none max-w-[200px] backdrop-blur-md" style={{ left: `${hub.coordinates.x}%`, top: `${hub.coordinates.y - 20}%`, transform: "translate(-50%, -100%)" }}>
                <div className="text-xs font-extrabold">{hub.name} Hub</div>
                <div className="text-[10px] text-[#E5A93C] font-bold mt-1">{hub.isPrimary ? "Academic Headquarters" : `${hub.alumniCount}+ Alumni Active`}</div>
              </m.div>
            );
          })}
        </ErrorBoundary>
        <m.div animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="absolute top-4 right-4 bg-slate-100/90 dark:bg-slate-950/90 border border-slate-200 rounded-2xl p-2.5 flex items-center gap-2 z-10 shadow-xl">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold">San Francisco Chapter</span>
        </m.div>
        <m.div animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }} transition={{ duration: 0.8, delay: 1.5, repeat: Infinity }} className="absolute bottom-4 left-4 bg-slate-100/90 dark:bg-slate-950/90 border border-slate-200 rounded-2xl p-2.5 flex items-center gap-2 z-10 shadow-xl">
          <Globe className="h-3 w-3 text-srm-yellow" />
          <span className="text-[10px] font-bold">Bengaluru Chapter</span>
        </m.div>
      </div>
    </m.div>
  );
}
