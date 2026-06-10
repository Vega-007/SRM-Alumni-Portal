"use client";

import { m, useReducedMotion } from "framer-motion";
import { Search, UserPlus, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroContent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="lg:col-span-5 space-y-6 md:space-y-8 text-left">
      {/* Micro-badge */}
      <m.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-srm-red/20 bg-srm-red/5 px-4 py-1.5 text-xs font-semibold text-srm-red"
      >
        <Sparkles className="h-3.5 w-3.5 text-srm-yellow animate-pulse" />
        <span>SRMIST Ramapuram Network</span>
      </m.div>

      {/* Headline */}
      <div className="space-y-4">
        <m.h1
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]"
        >
          Our Alumni Across the <span className="text-srm-yellow">Globe</span>
        </m.h1>
        
        <m.p
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl"
        >
          A global community of industry pioneers, academic leaders, and technocrats. Explore profiles, track career pathways, and re-engage with your alma mater.
        </m.p>
      </div>

      {/* Dual CTAs */}
      <m.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
      >
        <Link
          href="/directory"
          className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-srm-red hover:bg-srm-red/90 py-3.5 px-8 text-sm font-semibold text-white transition-all active:scale-[0.98] cursor-pointer"
        >
          <Search className="h-4.5 w-4.5" />
          Explore Directory
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 py-3.5 px-8 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all active:scale-[0.98] cursor-pointer"
        >
          <UserPlus className="h-4.5 w-4.5 text-srm-yellow" />
          Update Profile
        </Link>
      </m.div>

      {/* Mini Social proof */}
      <m.div
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
            <div key={i} className="h-9 w-9 rounded-full border border-slate-950 overflow-hidden bg-slate-900 relative">
              <Image src={img} alt="Alumni thumbnail" fill sizes="36px" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-500">
          <span className="font-semibold text-slate-800 dark:text-slate-200">Join 15,000+ graduates</span> in Silicon Valley, London, Bengaluru, and beyond.
        </div>
      </m.div>
    </div>
  );
}
