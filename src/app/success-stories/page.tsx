"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_MAP_HUBS, MOCK_SUCCESS_STORIES } from "@/data/mockData";
import { MapPin, Building2, Users, ArrowRight, GraduationCap, Quote, ChevronDown, ChevronUp } from "lucide-react";

export default function SuccessStoriesPage() {
  const [activeHub, setActiveHub] = useState<string | null>(null);
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null);

  const toggleStory = (id: string) => {
    setExpandedStoryId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full min-h-screen bg-transparent py-12 px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Page Header */}
        <div className="mb-12 text-left">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
            Success Stories & <span className="text-srm-yellow font-extrabold">Global Reach</span>
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl">
            Explore stories of graduates pioneering tech globally, and interact with our global hub clusters to see where SRMIST Ramapuram alumni work.
          </p>
        </div>

        {/* SECTION 1: INTERACTIVE GLOBAL ALUMNI MAP */}
        <section className="mb-20">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100/30 dark:bg-slate-900/10 p-6 md:p-8 glass-panel relative overflow-hidden">
            {/* Corner Glow */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-srm-yellow/5 blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-srm-yellow" />
                  Global Alumni Map
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Hover over or tap a hub node to explore the placement metrics in that city.
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
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
            <div className="relative w-full aspect-[2/1] min-h-[300px] border border-slate-200 dark:border-slate-900 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 overflow-hidden shadow-inner">
              
              {/* Technical Grid Blueprint Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-35" />

              {/* Simplified world outlines SVG for background context */}
              <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full text-slate-300 dark:text-slate-900 pointer-events-none fill-none stroke-current" strokeWidth="0.5" strokeOpacity="0.4">
                {/* Simulated continents circles/shapes */}
                <circle cx="200" cy="180" r="100" strokeDasharray="3,3" /> {/* North America */}
                <circle cx="220" cy="280" r="60" strokeDasharray="3,3" />  {/* South America */}
                <circle cx="500" cy="170" r="90" strokeDasharray="3,3" />  {/* Europe */}
                <circle cx="530" cy="270" r="70" strokeDasharray="3,3" />  {/* Africa */}
                <circle cx="730" cy="210" r="110" strokeDasharray="3,3" /> {/* Asia */}
                <circle cx="880" cy="380" r="65" strokeDasharray="3,3" />  {/* Australia */}
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
                  <span className="absolute -inset-2.5 rounded-full bg-srm-yellow/10 border border-srm-yellow/20 scale-100 group-hover:scale-125 group-hover:bg-srm-yellow/20 transition-all duration-300 pointer-events-none" />

                  {/* Pulsing Core node button */}
                  <button
                    onClick={() => setActiveHub(activeHub === hub.id ? null : hub.id)}
                    className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
                      activeHub === hub.id ? "bg-srm-yellow scale-125" : "bg-srm-yellow/90 group-hover:bg-srm-yellow"
                    }`}
                    aria-label={`Explore ${hub.name}`}
                  >
                    <span className="absolute h-full w-full rounded-full bg-srm-yellow opacity-75 animate-ping pointer-events-none" />
                  </button>

                  {/* Floating overlay Tooltip */}
                  <AnimatePresence>
                    {activeHub === hub.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-52 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 p-4 shadow-2xl z-30 pointer-events-none"
                      >
                        <h4 className="font-display font-bold text-slate-900 dark:text-white text-xs tracking-tight">
                          {hub.name}
                        </h4>
                        
                        <div className="flex items-center gap-1 text-[10px] text-srm-yellow font-bold uppercase mt-1">
                          <Users className="h-3 w-3 shrink-0" />
                          <span>{hub.alumniCount}+ Placements</span>
                        </div>

                        <div className="border-t border-slate-200 dark:border-slate-900 mt-2 pt-2">
                          <span className="block text-[9px] font-semibold text-slate-500 uppercase tracking-wider">
                            Primary Employers
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {hub.topCompanies.map((c, i) => (
                              <span key={i} className="text-[9px] bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded px-1 py-0.5">
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
                <p className="text-[11px] text-slate-650 dark:text-slate-400 leading-normal">
                  <span className="font-semibold text-slate-900 dark:text-white">Global Nodes Active:</span> Our alumni are present in {MOCK_MAP_HUBS.length} key global cities, collaborating across organizations to drive digital innovation.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: SUCCESS STORIES LIST */}
        <section>
          <div className="mb-10">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Graduate <span className="text-srm-yellow">Journeys & Spotlight</span>
            </h2>
            <p className="text-sm text-slate-550 dark:text-slate-400 mt-1 max-w-xl">
              Read in-depth narratives detailing graduation, early struggles, career-defining projects, and placement tips.
            </p>
          </div>

          <div className="space-y-6">
            {MOCK_SUCCESS_STORIES.map((story) => {
              const isExpanded = expandedStoryId === story.id;
              return (
                <div
                  key={story.id}
                  className="rounded-3xl border border-slate-200 dark:border-slate-900 bg-slate-100/50 dark:bg-slate-900/10 p-6 md:p-8 glass-panel relative overflow-hidden transition-all duration-300 hover:border-srm-yellow/10"
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
                        <div className="flex flex-col text-xs text-slate-500 dark:text-slate-400 gap-0.5 mt-1">
                          <span className="font-medium text-slate-700 dark:text-slate-300">{story.degree}</span>
                          <span>Class of {story.batch}</span>
                          <span className="text-srm-red dark:text-srm-yellow font-semibold mt-1">
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

                      <blockquote className="text-sm font-medium italic text-slate-600 dark:text-slate-300 border-l-2 border-slate-200 dark:border-slate-800 pl-4 py-1 leading-relaxed">
                        "{story.quote}"
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
                            <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed pt-2">
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
