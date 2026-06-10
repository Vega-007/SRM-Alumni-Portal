import { MapPin } from "lucide-react";

export function CampusMap() {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md p-4 shadow-sm overflow-hidden">
      <div className="relative h-64 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950">
        <iframe
          title="SRMIST Ramapuram Campus Map"
          src="https://maps.google.com/maps?q=SRM%20University%20Ramapuram%20Campus%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          className="border-0 filter grayscale dark:invert-[0.9] dark:opacity-85"
          sandbox="allow-scripts allow-popups"
          loading="lazy"
        ></iframe>
      </div>
      <div className="mt-3 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <MapPin className="h-3.5 w-3.5 text-srm-red" />
          Official Geo Location: SRMIST Ramapuram, Chennai
        </span>
      </div>
    </div>
  );
}
