"use client";

import { MOCK_COMPANIES } from "@/data/mockData";

// Duplicate list to achieve infinite seamless loop
const doubleCompanies = [...MOCK_COMPANIES, ...MOCK_COMPANIES];

// Colors for logos when hovered (simulated with vibrant text-shadow/gradients)
const getBrandStyle = (name: string) => {
  switch (name) {
    case "Google": return "hover:text-red-500 hover:border-red-500/20 hover:bg-red-500/5";
    case "Amazon": return "hover:text-amber-500 hover:border-amber-500/20 hover:bg-amber-500/5";
    case "Microsoft": return "hover:text-blue-500 hover:border-blue-500/20 hover:bg-blue-500/5";
    case "Meta": return "hover:text-cyan-500 hover:border-cyan-500/20 hover:bg-cyan-500/5";
    case "Apple": return "hover:text-slate-200 hover:border-slate-500/20 hover:bg-slate-500/5";
    case "Netflix": return "hover:text-rose-600 hover:border-rose-500/20 hover:bg-rose-500/5";
    case "Stripe": return "hover:text-indigo-500 hover:border-indigo-500/20 hover:bg-indigo-500/5";
    case "Zoho": return "hover:text-yellow-500 hover:border-yellow-500/20 hover:bg-yellow-500/5";
    case "TCS": return "hover:text-teal-400 hover:border-teal-500/20 hover:bg-teal-500/5";
    default: return "hover:text-yellow-500 hover:border-yellow-500/20 hover:bg-yellow-500/5";
  }
};

export default function CompanyMarquee() {
  return (
    <section className="w-full bg-navy-950 border-y border-slate-900/60 py-10 overflow-hidden relative">
      {/* Soft gradient edge overlays for fade effect aligned with base canvas */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8 mb-6">
        <p className="text-center font-display text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Where Our Graduates Build the Future
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="flex w-full overflow-hidden select-none">
        <div className="flex shrink-0 gap-6 min-w-full animate-infinite-scroll hover:[animation-play-state:paused] py-2">
          {doubleCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className={`flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 px-8 py-3.5 text-base font-semibold tracking-tight text-slate-550 transition-all duration-300 ${getBrandStyle(
                company.name
              )} cursor-default`}
            >
              {/* Modern minimalist tech icon representation */}
              <span className="font-display tracking-widest uppercase text-sm font-black">
                {company.name === "Google" && "G O O G L E"}
                {company.name === "Amazon" && "A M A Z O N"}
                {company.name === "Microsoft" && "M I C R O S O F T"}
                {company.name === "Meta" && "M E T A"}
                {company.name === "Apple" && "A P P L E"}
                {company.name === "Netflix" && "N E T F L I X"}
                {company.name === "Stripe" && "S T R I P E"}
                {company.name === "Zoho" && "Z O H O"}
                {company.name === "TCS" && "T C S"}
                {company.name === "Cognizant" && "C O G N I Z A N T"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
