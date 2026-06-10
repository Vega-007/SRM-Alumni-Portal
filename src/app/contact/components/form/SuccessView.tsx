"use client";

import { m, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface SuccessViewProps {
  fullName: string;
  ticketId: string;
  onReset: () => void;
}

export function SuccessView({ fullName, ticketId, onReset }: SuccessViewProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      className="py-8 text-center"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mb-6">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-50">Update Request Received!</h3>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        Thank you for updating your profile, <strong className="text-slate-800 dark:text-slate-200">{fullName}</strong>.
      </p>
      <div className="mt-8 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5 max-w-sm mx-auto">
        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">Verification Ticket ID</span>
        <span className="block mt-1 font-mono text-lg font-bold text-srm-blue dark:text-srm-yellow">{ticketId}</span>
      </div>
      <div className="mt-8">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl bg-srm-blue text-white hover:bg-srm-blue/90 px-6 py-2.5 text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
        >
          Submit Another Profile Update
        </button>
      </div>
    </m.div>
  );
}
