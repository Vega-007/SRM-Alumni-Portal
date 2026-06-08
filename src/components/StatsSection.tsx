"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Award, Building2, TrendingUp } from "lucide-react";
import CountUpTicker from "./CountUpTicker";

// Mouse tracking bento card spotlight wrapper
function BentoCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800/60 bg-slate-100/40 dark:bg-slate-950/40 backdrop-blur-sm p-8 flex flex-col justify-between transition-all duration-300 hover:border-crimson-500/20 group hover:shadow-2xl hover:shadow-crimson-950/10 ${className}`}
    >
      {/* Spotlight Radial Background Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(163, 29, 29, 0.12), transparent 85%)`
          }}
        />
      )}
      
      {/* Spotlight Glowing Border */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl z-0"
          style={{
            border: '1px solid transparent',
            background: `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, rgba(229, 169, 60, 0.35), transparent 70%)`,
            WebkitMaskImage: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px'
          }}
        />
      )}
      
      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        {children}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const chartRef = useRef(null);
  const isChartInView = useInView(chartRef, { once: true, margin: "-50px" });

  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-crimson-700/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-gold-650/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            A Legacy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-srm-yellow via-[#E5A93C] to-gold-600">Unmatched Success</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Our graduates continue to excel across the tech landscape, paving pathways for innovation and mentoring the next generation.
          </p>
        </div>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Total Alumni */}
          <BentoCard className="md:col-span-2 min-h-[220px] relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
              
              <div className="space-y-4 max-w-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-srm-yellow group-hover:border-srm-yellow/20 transition-colors">
                    <Users className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Total Alumni Network
                  </span>
                </div>
                
                <div className="flex items-baseline text-5xl font-black text-slate-900 dark:text-slate-50">
                  <CountUpTicker value="15,000+" />
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Spread across 45+ countries. Strong student chapters established in Silicon Valley, London, Bengaluru, and Singapore.
                </p>
              </div>

              {/* Decorative Tech Dot Grid */}
              <div className="absolute right-4 bottom-4 opacity-[0.03] text-white pointer-events-none hidden md:block">
                <svg width="160" height="160" viewBox="0 0 160 160">
                  <defs>
                    <pattern id="dot-matrix" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                      <circle cx="3" cy="3" r="2" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="160" height="160" fill="url(#dot-matrix)" />
                </svg>
              </div>

            </div>
          </BentoCard>

          {/* Card 2: Highest Package */}
          <BentoCard className="md:col-span-1 min-h-[220px]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-srm-red group-hover:border-srm-red/20 transition-colors">
                  <Award className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Highest package
                </span>
              </div>
              
              <div className="flex items-baseline text-5xl font-black text-slate-900 dark:text-slate-50">
                <CountUpTicker value="₹42.5 LPA" />
              </div>
              
              <p className="text-sm text-slate-650 dark:text-slate-300">
                Offered by Amazon, Seattle. Consistently placing graduates in top international technological hubs.
              </p>
            </div>
          </BentoCard>

          {/* Card 3: Partner Companies */}
          <BentoCard className="md:col-span-1 min-h-[220px]">
            <div className="flex flex-col justify-between h-full space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-srm-yellow group-hover:border-srm-yellow/20 transition-colors">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Partner recruiters
                  </span>
                </div>
                
                <div className="flex items-baseline text-5xl font-black text-slate-900 dark:text-slate-50">
                  <CountUpTicker value="500+" />
                </div>
                
                <p className="text-sm text-slate-650 dark:text-slate-305">
                  Global firms recruit campus graduates directly from SRMIST.
                </p>
              </div>

              {/* Ticker marquee */}
              <div className="overflow-hidden relative w-full border-t border-slate-200 dark:border-slate-900 pt-4">
                <div className="flex gap-6 animate-[infinite-scroll_20s_linear_infinite] whitespace-nowrap text-[9px] text-slate-450 dark:text-slate-500 font-extrabold uppercase tracking-widest">
                  {["Google", "Microsoft", "Amazon", "Meta", "Zoho", "Stripe"].map((c, i) => (
                    <span key={i}>{c}</span>
                  ))}
                  {/* Duplicates for infinite scrolling */}
                  {["Google", "Microsoft", "Amazon", "Meta", "Zoho", "Stripe"].map((c, i) => (
                    <span key={`dup-${i}`} className="text-slate-650">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 4: Placement Rate */}
          <BentoCard className="md:col-span-2 min-h-[220px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 h-full w-full">
              
              <div className="space-y-4 max-w-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-srm-red group-hover:border-srm-red/20 transition-colors">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Placement rate
                  </span>
                </div>
                
                <div className="flex items-baseline text-5xl font-black text-slate-900 dark:text-slate-50">
                  <CountUpTicker value="98.2%" />
                </div>
                
                <p className="text-sm text-slate-655 dark:text-slate-300 leading-relaxed">
                  Consistent record of high-performance placements for five consecutive academic cycles.
                </p>
              </div>

              {/* SVG Glowing Line Chart Visualizer */}
              <div ref={chartRef} className="flex-1 max-w-[280px] h-[100px] border border-slate-200 dark:border-slate-800 bg-slate-100/85 dark:bg-slate-950/60 rounded-2xl p-4 flex items-center justify-center relative shadow-inner overflow-hidden">
                <svg viewBox="0 0 200 80" className="w-full h-full">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8B1E0F" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#8B1E0F" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="10" y1="65" x2="190" y2="65" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                  <line x1="10" y1="40" x2="190" y2="40" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                  <line x1="10" y1="15" x2="190" y2="15" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />

                  {/* Area fill under trend line */}
                  {isChartInView && (
                    <motion.path
                      d="M 10 70 Q 50 50 90 45 Q 130 35 170 15 L 170 75 L 10 75 Z"
                      fill="url(#chartGradient)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  )}

                  {/* Trend Line */}
                  <motion.path
                    d="M 10 70 Q 50 50 90 45 Q 130 35 170 15"
                    fill="none"
                    stroke="#FFD200"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isChartInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />

                  {/* Glow underlay */}
                  <motion.path
                    d="M 10 70 Q 50 50 90 45 Q 130 35 170 15"
                    fill="none"
                    stroke="#8B1E0F"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="opacity-40 blur-sm pointer-events-none"
                    initial={{ pathLength: 0 }}
                    animate={isChartInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />

                  {/* Data Points */}
                  {isChartInView && (
                    <>
                      <circle cx="10" cy="70" r="3" fill="#FFD200" />
                      <circle cx="90" cy="45" r="3" fill="#FFD200" />
                      <circle cx="170" cy="15" r="4" fill="#8B1E0F" stroke="#FFD200" strokeWidth="1.5" />
                    </>
                  )}
                </svg>

                {/* Micro badge indicator */}
                <div className="absolute top-2 right-2 text-[8px] text-srm-yellow/85 font-bold tracking-widest uppercase">
                  Growth Trend
                </div>
              </div>

            </div>
          </BentoCard>

        </div>

      </div>
    </section>
  );
}
