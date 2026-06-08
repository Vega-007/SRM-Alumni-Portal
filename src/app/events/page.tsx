"use client";

import { motion } from "framer-motion";
import { Sparkles, CalendarDays } from "lucide-react";
import UpcomingEvents from "@/components/UpcomingEvents";

export default function EventsViewPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-screen bg-transparent py-12 overflow-x-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Route Header */}
        <div className="mb-12 text-center md:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-srm-blue/20 bg-srm-blue/5 px-3 py-1 text-[10px] font-black uppercase text-srm-blue dark:text-srm-lightBlue tracking-widest mb-3">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>Alumni Event Board</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
            SRMIST Alumni <span className="text-srm-blue dark:text-srm-yellow">Networking Milestones</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400">
            Keep track of networking mixers, technical seminars, and innovation panels organized by the SRMIST Ramapuram Alumni Association.
          </p>
        </div>

        {/* Reusing UpcomingEvents component to render the event grid */}
        <UpcomingEvents limit={4} />

        {/* Informative Help Card at the bottom */}
        <div className="mt-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md p-6 md:p-8 text-center max-w-3xl mx-auto shadow-sm">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-srm-blue/10 dark:bg-srm-yellow/10 text-srm-blue dark:text-srm-yellow mb-4">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-slate-50">Want to propose or host an event?</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 max-w-lg mx-auto leading-relaxed">
            If you represent a corporate company seeking recruitments or want to host a regional chapter meet in your city, submit your event proposal to the Alumni Relations desk.
          </p>
          <div className="mt-5">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-srm-red hover:bg-[#72180c] py-3 px-6 text-xs font-bold uppercase text-white tracking-widest transition-all active:scale-[0.98] shadow-md"
            >
              Submit Event Proposal
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
