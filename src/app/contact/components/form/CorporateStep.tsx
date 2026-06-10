"use client";

import { m, useReducedMotion } from "framer-motion";
import { Building, Briefcase, DollarSign } from "lucide-react";
import { ChangeEvent } from "react";

interface CorporateStepProps {
  formData: {
    company: string;
    jobTitle: string;
    ctc: string;
  };
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function CorporateStep({ formData, onInputChange }: CorporateStepProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      key="step-2"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="space-y-5"
    >
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-1">Corporate Details</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">Current career standings.</p>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="company" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
          <Building className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={onInputChange}
          placeholder="e.g. Google India"
          className="w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm outline-none"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="jobTitle" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={onInputChange}
            placeholder="e.g. Software Engineer"
            className="w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="ctc" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
            <DollarSign className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
            CTC (LPA)
          </label>
          <input
            type="text"
            id="ctc"
            name="ctc"
            value={formData.ctc}
            onChange={onInputChange}
            placeholder="e.g. 18.5"
            className="w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm outline-none"
          />
        </div>
      </div>
    </m.div>
  );
}
