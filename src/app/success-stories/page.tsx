"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_MAP_HUBS, MOCK_SUCCESS_STORIES } from "@/data/mockData";
import { MapPin, Building2, Users, ArrowRight, GraduationCap, Quote, ChevronDown, ChevronUp } from "lucide-react";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function SuccessStoriesPage() {
  const [activeHub, setActiveHub] = useState<string | null>(null);
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null);

  const toggleStory = (id: string) => {
    setExpandedStoryId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full min-h-screen bg-transparent py-12 px-6 md:px-8 overflow-x-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* Page Header */}
        <div className="mb-12 text-left">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-955 dark:text-slate-50 sm:text-5xl">
            Success Stories & <span className="text-srm-yellow font-extrabold">Global Reach</span>
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl">
            Explore stories of graduates pioneering tech globally, and interact with our global hub clusters to see where SRMIST Ramapuram alumni work.
          </p>
        </div>

        {/* SECTION 1: INTERACTIVE GLOBAL ALUMNI MAP */}
        <section className="mb-20">
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md p-6 md:p-8 relative overflow-hidden shadow-sm">
            {/* Corner Glow */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-srm-yellow/5 blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
              <div>
                <h2 className="font-display text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-srm-yellow" />
                  Global Alumni Map
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  Hover over or tap a hub node to explore the placement metrics in that city.
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-srm-yellow animate-pulse" />
                  <span>Primary Hubs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-600" />
                  <span>Other Clusters</span>
                </div>
              </div>
            </div>

            {/* Map Canvas relative container */}
            <div className="w-full h-[400px] md:h-[500px] relative border border-slate-200 dark:border-slate-900 rounded-2xl bg-slate-100/80 dark:bg-slate-950/40 overflow-hidden shadow-inner backdrop-blur-sm">
              
              {/* Technical Grid Blueprint Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-35" />

              <ErrorBoundary>
                {/* High-fidelity shifted outlines SVG for background context */}
                <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full pointer-events-none fill-none stroke-current" strokeWidth="0.5" strokeOpacity="0.4">
                  <g className="fill-slate-200/40 dark:fill-slate-800/30 stroke-slate-350 dark:stroke-slate-700/50 transition-colors duration-500" strokeWidth="1.5">
                    {/* Greenland */}
                    <path d="M 0 50 L 60 40 L 40 75 L 0 70 Z" />
                    {/* North America Split */}
                    <path d="M 860 120 L 900 100 L 940 80 L 1000 80 L 1000 185 L 980 190 L 960 200 L 940 210 L 920 240 L 930 280 L 910 280 L 900 250 L 870 200 L 850 170 Z" />
                    <path d="M 0 80 L 40 90 L 80 120 L 40 180 L 0 185 Z" />
                    {/* South America */}
                    <path d="M 910 280 L 940 290 L 960 320 L 970 360 L 950 420 L 930 450 L 920 440 L 900 380 L 895 320 Z" />
                    {/* Iceland */}
                    <path d="M 170 85 L 190 80 L 185 95 Z" />
                    {/* Africa */}
                    <path d="M 210 230 L 260 220 L 300 225 L 340 250 L 330 290 L 290 370 L 270 400 L 255 410 L 245 390 L 240 320 L 200 295 L 195 260 Z" />
                    {/* Madagascar */}
                    <path d="M 325 360 L 335 350 L 330 380 Z" />
                    {/* Eurasia */}
                    <path d="M 150 120 L 210 110 L 300 90 L 380 70 L 480 60 L 580 65 L 660 75 L 720 100 L 730 120 L 690 170 L 650 185 L 640 210 L 610 220 L 590 270 L 560 300 L 540 280 L 500 300 L 460 260 L 410 245 L 370 255 L 340 180 L 280 185 L 210 170 Z" />
                    {/* Japan */}
                    <path d="M 650 160 L 660 150 L 665 180 L 655 190 Z" />
                    {/* Australia */}
                    <path d="M 600 380 L 660 375 L 700 400 L 685 445 L 625 440 L 595 410 Z" />
                    {/* New Zealand */}
                    <path d="M 720 450 L 730 445 L 725 470 Z" />
                  </g>
                </svg>

                {/* Interactive Nodes */}
                {MOCK_MAP_HUBS.map((hub) => (
                  <div
                    key={hub.id}
                    style={{ left: `${hub.coordinates.x}%`, top: `${hub.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
                    onMouseEnter={() => setActiveHub(hub.id)}
                    onMouseLeave={() => setActiveHub(null)}
                  >
                    {/* Ping effect ring */}
                    <span className={`absolute -inset-2.5 rounded-full ${
                      hub.isPrimary 
                        ? "bg-rose-500/10 border border-rose-500/20 group-hover:bg-rose-500/20" 
                        : "bg-srm-yellow/10 border border-srm-yellow/20 group-hover:bg-srm-yellow/20"
                    } scale-100 group-hover:scale-125 transition-all duration-300 pointer-events-none`} />

                    {/* Pulsing Core node button */}
                    <button
                      onClick={() => setActiveHub(activeHub === hub.id ? null : hub.id)}
                      className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
                        hub.isPrimary
                          ? "bg-[#8B1E0F] border border-[#E5A93C] scale-125"
                          : (activeHub === hub.id ? "bg-srm-yellow scale-125" : "bg-srm-yellow/90 group-hover:bg-srm-yellow")
                      }`}
                      aria-label={`Explore ${hub.name}`}
                    >
                      <span className={`absolute h-full w-full rounded-full ${
                        hub.isPrimary ? "bg-[#8B1E0F]" : "bg-srm-yellow"
                      } opacity-75 animate-ping pointer-events-none`} />
                    </button>

                    {/* Floating overlay Tooltip */}
                    <AnimatePresence>
                      {activeHub === hub.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-52 rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md p-4 shadow-2xl z-30 pointer-events-none text-slate-800 dark:text-slate-200"
                        >
                          <h4 className="font-display font-bold text-slate-900 dark:text-white text-xs tracking-tight">
                            {hub.name}
                          </h4>
                          
                          <div className="flex items-center gap-1 text-[10px] text-[#E5A93C] font-bold uppercase mt-1">
                            <Users className="h-3 w-3 shrink-0" />
                            <span>{hub.isPrimary ? "Academic Headquarters" : `${hub.alumniCount}+ Placements`}</span>
                          </div>

                          <div className="border-t border-slate-200 dark:border-slate-900 mt-2 pt-2">
                            <span className="block text-[9px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">
                              Primary Employers
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {hub.topCompanies.map((c, i) => (
                                <span key={i} className="text-[9px] bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded px-1 py-0.5">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Dynamic bottom notification box inside map */}
                <div className="absolute bottom-4 left-4 right-4 md:right-auto bg-slate-200/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-300 dark:border-slate-800 rounded-xl p-3 max-w-sm pointer-events-none">
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                    <span className="font-semibold text-slate-900 dark:text-white">Global Nodes Active:</span> Our alumni are present in {MOCK_MAP_HUBS.length} key global cities, collaborating across organizations to drive digital innovation.
                  </p>
                </div>
              </ErrorBoundary>

            </div>
          </div>
        </section>

        {/* SECTION 2: SUCCESS STORIES LIST */}
        <section>
          <div className="mb-10">
            <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-200">
              Graduate <span className="text-srm-yellow">Journeys & Spotlight</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Read in-depth narratives detailing graduation, early struggles, career-defining projects, and placement tips.
            </p>
          </div>

          <div className="space-y-6">
            {MOCK_SUCCESS_STORIES.map((story) => {
              const isExpanded = expandedStoryId === story.id;
              return (
                <div
                  key={story.id}
                  className="rounded-3xl border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:border-srm-yellow/20 hover:shadow-xl hover:shadow-srm-yellow/5"
                >
                  {/* Glowing line overlay */}
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-srm-yellow to-[#E5A93C]" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Avatar & quick tags */}
                    <div className="lg:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
                      <div className="h-28 w-28 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shrink-0">
                        <img
                          src={story.imageUrl}
                          alt={story.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                          {story.name}
                        </h3>
                        <div className="flex flex-col text-xs text-slate-600 dark:text-slate-400 gap-0.5 mt-1">
                          <span className="font-medium text-slate-600 dark:text-slate-400">{story.degree}</span>
                          <span>Class of {story.batch}</span>
                          <span className="text-srm-red dark:text-[#E5A93C] font-semibold mt-1">
                            {story.role} @ {story.company}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Text elements */}
                    <div className="lg:col-span-9 space-y-4">
                      
                      <div className="flex items-start gap-3">
                        <Quote className="h-6 w-6 text-srm-yellow/20 shrink-0 mt-1" />
                        <h4 className="font-display text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                          {story.title}
                        </h4>
                      </div>

                      <blockquote className="text-sm font-medium italic text-slate-600 dark:text-slate-400 border-l-2 border-slate-200 dark:border-slate-800 pl-4 py-1 leading-relaxed">
                        &ldquo;{story.quote}&rdquo;
                      </blockquote>

                      {/* Expandable detailed story content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-2">
                              {story.story}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Expand/Collapse Toggle Button */}
                      <div className="pt-2 flex justify-start">
                        <button
                          onClick={() => toggleStory(story.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-srm-red dark:text-srm-yellow hover:text-srm-yellow/80 transition-colors uppercase tracking-wider cursor-pointer"
                        >
                          {isExpanded ? (
                            <>
                              Collapse Journey
                              <ChevronUp className="h-4 w-4" />
                            </>
                          ) : (
                            <>
                              Read Full Journey
                              <ChevronDown className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
