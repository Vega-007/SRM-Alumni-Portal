"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { MOCK_EVENTS, AlumniEvent } from "@/data/mockData";
import Link from "next/link";

interface UpcomingEventsProps {
  limit?: number;
}

export function EventBrochureCard({ event }: { event: AlumniEvent }) {
  // Map event IDs to specific brand glow highlights to reflect the SRM brand colors dynamically
  const getGlowColor = (id: string) => {
    switch (id) {
      case "e1": return "hover:shadow-srm-blue/20 hover:border-srm-blue/40";
      case "e2": return "hover:shadow-srm-yellow/25 hover:border-srm-yellow/40";
      case "e3": return "hover:shadow-srm-red/20 hover:border-srm-red/40";
      default: return "hover:shadow-[#1A73E8]/20 hover:border-[#1A73E8]/40";
    }
  };


  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col rounded-3xl border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-2xl ${getGlowColor(event.id)} group`}
    >
      {/* 3:4 Aspect Ratio Image Section */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={event.imageUrl}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

        {/* Date Overlay Badge */}
        <div className="absolute top-4 left-4 bg-slate-950/80 dark:bg-slate-900/95 backdrop-blur-sm border border-white/10 rounded-2xl px-3 py-1.5 flex items-center gap-1.5 shadow-md">
          <Calendar className="h-3.5 w-3.5 text-srm-yellow shrink-0" />
          <span className="text-[10px] font-bold text-slate-100 tracking-wide uppercase">{event.date}</span>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Time & Location Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-srm-lightBlue shrink-0" />
              {event.time}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="flex items-center gap-1.5 truncate max-w-[180px]" title={event.location}>
              <MapPin className="h-3.5 w-3.5 text-srm-red shrink-0" />
              {event.location.split(",")[0]}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-slate-50 group-hover:text-srm-blue dark:group-hover:text-srm-yellow transition-colors leading-tight">
            {event.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Action Button */}
        <a
          href="https://forms.gle/SRMAlumniEvents2026"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold text-white tracking-wider uppercase transition-colors duration-300 cursor-pointer shadow-md bg-[#8B1E0F] hover:bg-[#E5A93C] active:scale-95"
        >
          Register & Submit Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}

export default function UpcomingEvents({ limit }: UpcomingEventsProps) {
  const eventsToShow = limit ? MOCK_EVENTS.slice(0, limit) : MOCK_EVENTS;

  return (
    <section className="py-24 relative overflow-hidden border-t border-slate-200 dark:border-slate-800/40">
      {/* Background Elements */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-srm-blue/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-srm-red/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-srm-red/20 bg-srm-red/5 px-3 py-1 text-[10px] font-black uppercase text-srm-red tracking-widest mb-3">
              <Sparkles className="h-3 w-3" />
              <span>Campus Networking</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
              Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-srm-red via-srm-lightBlue to-srm-blue">Alumni Events</span>
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Mark your calendars for upcoming conferences, webinars, hackathons, and global alumni gatherings designed to advance your network.
            </p>
          </div>
          
          {!limit && (
            <div className="shrink-0">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-xl bg-srm-blue hover:bg-srm-blue/90 py-3 px-6 text-xs font-black uppercase text-white tracking-widest transition-all hover:shadow-lg hover:shadow-srm-blue/20 active:scale-[0.98] border border-srm-blue/20 shadow-md"
              >
                View Event Showcase
              </Link>
            </div>
          )}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {eventsToShow.map((event) => (
            <EventBrochureCard key={event.id} event={event} />
          ))}
        </div>

      </div>
    </section>
  );
}
