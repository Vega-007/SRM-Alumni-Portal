"use client";

import { MOCK_ALUMNI, Alumni } from "@/data/mockData";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Map degree names to department styles to reflect specific disciplines (e.g. MCA Gen AI)
const getDepartmentLabel = (alumniItem: Alumni) => {
  if (alumniItem.name === "Aditya Vardhan") return "B.Tech CSE (AI & ML)";
  if (alumniItem.name === "Ananya Sen") return "MCA (Gen AI)";
  return alumniItem.degree;
};

function AlumniCard({ alumni }: { alumni: Alumni }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-slate-100/40 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md p-4 min-w-[290px] max-w-[320px] transition-all duration-300 hover:scale-105 hover:border-srm-yellow/50 select-none shrink-0 group">
      
      {/* Profile Photo Thumbnail */}
      <div className="h-11 w-11 rounded-full overflow-hidden shrink-0 border-2 border-slate-200 dark:border-slate-900 group-hover:border-srm-yellow/30 transition-colors relative">
        <Image
          src={alumni.imageUrl}
          alt={alumni.name}
          fill
          sizes="44px"
          className="object-cover"
        />
      </div>
      
      {/* Profile info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-srm-yellow transition-colors truncate">
          {alumni.name}
        </h4>
        <p className="text-[10px] text-slate-600 dark:text-slate-400 font-extrabold truncate mt-0.5 uppercase tracking-wide">
          {getDepartmentLabel(alumni)}
        </p>
        
        {/* Company & Logo Text Tag */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-[9px] font-black text-slate-600 dark:text-slate-400">
            {alumni.companyLogoText}
          </div>
          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 truncate">{alumni.company}</span>
        </div>
      </div>

      {/* Prominent Gold Package Tag */}
      <div className="shrink-0 flex flex-col items-end justify-between h-full py-0.5">
        <div className="text-[10px] font-black tracking-wide text-[#E5A93C] border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase">
          {alumni.ctc}
        </div>
        <span className="text-[8px] text-slate-600 dark:text-slate-400 font-extrabold uppercase tracking-widest mt-1">
          Class of {alumni.batch}
        </span>
      </div>

    </div>
  );
}

export default function FeaturedAlumni() {
  const featuredList = MOCK_ALUMNI.filter((alumni) => alumni.featured);
  
  // Triple the list to ensure infinite seamless scrolling loop across widescreen viewpoints
  const marqueeAlumni = [...featuredList, ...featuredList, ...featuredList];

  return (
    <section className="py-24 bg-gradient-to-b from-transparent to-slate-950/20 relative border-t border-slate-200 dark:border-slate-800/40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            {/* Micro-badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-srm-red/20 bg-srm-red/5 px-3 py-1 text-[10px] font-black uppercase text-srm-red tracking-widest mb-3">
              <Sparkles className="h-3 w-3" />
              <span>Global Footprint</span>
            </div>
            
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-srm-yellow to-[#E5A93C]">Alumni Spotlights</span>
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Meet our distinguished graduates who are leading innovations, engineering high-scale products, and setting benchmarks worldwide.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/directory"
              className="inline-flex items-center gap-2 rounded-xl bg-srm-red hover:bg-srm-red/90 py-3 px-6 text-xs font-black uppercase text-white tracking-widest transition-all hover:shadow-lg hover:shadow-srm-red/20 active:scale-[0.98] border border-srm-red/20"
            >
              Explore Full Directory
            </Link>
          </div>
        </div>

        {/* Infinite Revolving Horizontal Track Carousel */}
        <div className="w-full overflow-hidden relative mt-12 py-4 select-none">
          
          {/* Smooth Side Vignettes for Infinite Scroll Fade effect */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/70 to-transparent pointer-events-none z-10 dark:from-slate-950 dark:via-slate-950/70" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/70 to-transparent pointer-events-none z-10 dark:from-slate-950 dark:via-slate-950/70" />

          {/* Marquee Track Container */}
          <div className="flex w-full overflow-hidden">
            <div className="flex shrink-0 gap-6 min-w-full animate-infinite-scroll hover:[animation-play-state:paused] py-2">
              {marqueeAlumni.map((alumni, index) => (
                <AlumniCard key={`${alumni.id}-${index}`} alumni={alumni} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
