"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Search, UserPlus, Globe, Sparkles } from "lucide-react";
import Link from "next/link";
import BackgroundBeams from "./BackgroundBeams";
import { MOCK_MAP_HUBS } from "@/data/mockData";

export default function Hero() {

  const [hoveredHub, setHoveredHub] = useState<string | null>(null);

  // Connection arcs between major hubs for animated SVG data packet paths
  const connectionArcs = [
    { from: "Bengaluru", to: "San Francisco", d: "M 720 290 Q 435 100 150 175", duration: 4.5 },
    { from: "Bengaluru", to: "London", d: "M 720 290 Q 600 180 480 140", duration: 3.5 },
    { from: "Bengaluru", to: "Singapore", d: "M 720 290 Q 750 305 780 320", duration: 2 },
    { from: "San Francisco", to: "Seattle", d: "M 150 175 Q 160 150 170 125", duration: 1.8 },
    { from: "Seattle", to: "Tokyo", d: "M 170 125 Q 515 60 860 190", duration: 5 },
    { from: "Singapore", to: "Sydney", d: "M 780 320 Q 860 345 900 410", duration: 3.2 },
    { from: "London", to: "San Francisco", d: "M 480 140 Q 315 80 150 175", duration: 4 },
  ];

  return (
    <>
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 md:py-20 overflow-hidden bg-transparent">
        
        {/* Dynamic Canvas Background Beams */}
        <BackgroundBeams />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-crimson-700/10 blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-gold-600/5 blur-[130px] pointer-events-none z-0" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left side: Copy & Call-to-actions */}
            <div className="lg:col-span-5 space-y-6 md:space-y-8 text-left">
              
              {/* Micro-badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-srm-red/20 bg-srm-red/5 px-4 py-1.5 text-xs font-semibold text-srm-red"
              >
                <Sparkles className="h-3.5 w-3.5 text-srm-yellow animate-pulse" />
                <span>SRMIST Ramapuram Network</span>
              </motion.div>

              {/* Headline */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 leading-[1.15]"
                >
                  Our Alumni Across the <span className="text-transparent bg-clip-text bg-gradient-to-r from-srm-yellow via-[#E5A93C] to-gold-600">Globe</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl"
                >
                  A global community of industry pioneers, academic leaders, and technocrats. Explore profiles, track career pathways, and re-engage with your alma mater.
                </motion.p>
              </div>

              {/* Dual CTAs in deep crimson brand highlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              >
                <Link
                  href="/directory"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-srm-red hover:bg-srm-red/90 py-4 px-8 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-srm-red/20 active:scale-[0.98] cursor-pointer shadow-md"
                >
                  <Search className="h-4.5 w-4.5" />
                  Explore Directory
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-slate-100 dark:bg-slate-900/40 hover:bg-slate-200/80 dark:hover:bg-slate-900/85 hover:border-srm-red/30 py-4 px-8 text-sm font-bold text-slate-700 dark:text-slate-200 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <UserPlus className="h-4.5 w-4.5 text-srm-yellow" />
                  Update Profile
                </Link>
              </motion.div>

              {/* Mini Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="pt-4 flex items-center gap-6"
              >
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
                  ].map((img, i) => (
                    <div key={i} className="h-9 w-9 rounded-full border border-slate-950 overflow-hidden bg-slate-900">
                      <img src={img} alt="Alumni thumbnail" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Join 15,000+ graduates</span> in Silicon Valley, London, Bengaluru, and beyond.
                </div>
              </motion.div>

            </div>

            {/* Right side: High-End Interactive Global Network Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 flex justify-center items-center relative z-10 w-full"
            >
              <div className="relative w-full aspect-[2/1] max-w-[700px] border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 rounded-3xl p-4 md:p-6 backdrop-blur-md shadow-sm overflow-hidden">
                
                {/* SVG Map Canvas */}
                <svg
                  viewBox="0 0 1000 500"
                  className="w-full h-full relative"
                >
                  <defs>
                    {/* Gradients */}
                    <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#A31D1D" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#050c1a" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A31D1D" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#E5A93C" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#A31D1D" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Dynamic central background glow */}
                  <circle cx="500" cy="250" r="300" fill="url(#mapGlow)" />

                  {/* Stylized geometric continent paths */}
                  <g className="fill-slate-900/40 stroke-slate-800/50" strokeWidth="1.5">
                    {/* Greenland */}
                    <path d="M 220 50 L 280 40 L 260 75 L 210 70 Z" />
                    {/* North America */}
                    <path d="M 80 120 L 120 100 L 160 80 L 220 80 L 260 90 L 300 120 L 260 180 L 200 190 L 180 200 L 160 210 L 140 240 L 150 280 L 130 280 L 120 250 L 90 200 L 70 170 Z" />
                    {/* South America */}
                    <path d="M 130 280 L 160 290 L 180 320 L 190 360 L 170 420 L 150 450 L 140 440 L 120 380 L 115 320 Z" />
                    {/* Iceland */}
                    <path d="M 390 85 L 410 80 L 405 95 Z" />
                    {/* Africa */}
                    <path d="M 430 230 L 480 220 L 520 225 L 560 250 L 550 290 L 510 370 L 490 400 L 475 410 L 465 390 L 460 320 L 420 295 L 415 260 Z" strokeLinejoin="round" />
                    {/* Madagascar */}
                    <path d="M 545 360 L 555 350 L 550 380 Z" />
                    {/* Eurasia (Europe + Asia) */}
                    <path d="M 370 120 L 430 110 L 520 90 L 600 70 L 700 60 L 800 65 L 880 75 L 940 100 L 950 120 L 910 170 L 870 185 L 860 210 L 830 220 L 810 270 L 780 300 L 760 280 L 720 300 L 680 260 L 630 245 L 590 255 L 560 180 L 500 185 L 430 170 Z" strokeLinejoin="round" />
                    {/* Japan */}
                    <path d="M 870 160 L 880 150 L 885 180 L 875 190 Z" />
                    {/* Australia */}
                    <path d="M 820 380 L 880 375 L 920 400 L 905 445 L 845 440 L 815 410 Z" />
                    {/* New Zealand */}
                    <path d="M 940 450 L 950 445 L 945 470 Z" />
                  </g>

                  {/* Connectivity arcs (glowing dotted paths + running light pulses) */}
                  {connectionArcs.map((arc, index) => (
                    <g key={index}>
                      {/* Underlay path */}
                      <path
                        d={arc.d}
                        fill="none"
                        stroke="rgba(229, 169, 60, 0.08)"
                        strokeWidth="1.5"
                      />
                      
                      {/* Dotted travel path */}
                      <path
                        d={arc.d}
                        fill="none"
                        stroke="rgba(163, 29, 29, 0.25)"
                        strokeWidth="1.5"
                        strokeDasharray="4 6"
                      />
                      
                      {/* Animated traveling data packet */}
                      <motion.path
                        d={arc.d}
                        fill="none"
                        stroke="url(#arcGradient)"
                        strokeWidth="2.5"
                        strokeDasharray="12 250"
                        animate={{ strokeDashoffset: [0, -300] }}
                        transition={{
                          duration: arc.duration,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </g>
                  ))}

                  {/* Active Hub Nodes with multi-ring radar pulses */}
                  {MOCK_MAP_HUBS.map((hub) => {
                    const cx = hub.coordinates.x * 10;
                    const cy = hub.coordinates.y * 5;
                    const isHovered = hoveredHub === hub.id;

                    return (
                      <g
                        key={hub.id}
                        onMouseEnter={() => setHoveredHub(hub.id)}
                        onMouseLeave={() => setHoveredHub(null)}
                        className="cursor-pointer"
                      >
                        {/* Radar Pulse 1 */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={18}
                          fill="none"
                          stroke={isHovered ? "#A31D1D" : "#E5A93C"}
                          strokeWidth="1"
                          className="animate-ping"
                          style={{
                            transformOrigin: `${cx}px ${cy}px`,
                            animationDuration: "3s"
                          }}
                        />

                        {/* Radar Pulse 2 */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={10}
                          fill="none"
                          stroke={isHovered ? "#E5A93C" : "#A31D1D"}
                          strokeWidth="1.5"
                          className="animate-pulse"
                          style={{
                            transformOrigin: `${cx}px ${cy}px`,
                            animationDuration: "2s"
                          }}
                        />

                        {/* Core Node Center */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={5}
                          fill={isHovered ? "#A31D1D" : "#E5A93C"}
                          className="transition-colors duration-200"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Floating Interactive Hub Detail Badge */}
                {MOCK_MAP_HUBS.map((hub) => {
                  const cx = hub.coordinates.x;
                  const cy = hub.coordinates.y;
                  const isHovered = hoveredHub === hub.id;

                  if (!isHovered) return null;

                  return (
                    <motion.div
                      key={hub.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute z-20 bg-slate-950/95 border border-crimson-500/30 rounded-xl p-3 shadow-2xl shadow-black pointer-events-none max-w-[200px]"
                      style={{
                        left: `${cx}%`,
                        top: `${cy - 20}%`,
                        transform: "translate(-50%, -100%)",
                      }}
                    >
                      <div className="text-xs font-extrabold text-white">{hub.name} Hub</div>
                      <div className="text-[10px] text-gold-500 font-bold mt-1">
                        {hub.alumniCount}+ Alumni Active
                      </div>
                      <div className="text-[9px] text-slate-400 mt-1 border-t border-slate-900 pt-1">
                        Top: {hub.topCompanies.slice(0, 3).join(", ")}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Standard floating markers */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-4 bg-slate-100/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 flex items-center gap-2 z-10 shadow-xl"
                >
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">San Francisco Chapter</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-4 left-4 bg-slate-100/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 flex items-center gap-2 z-10 shadow-xl"
                >
                  <Globe className="h-3 w-3 text-srm-yellow" />
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Bengaluru Chapter</span>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>

      </section>

    </>
  );
}
