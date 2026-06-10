"use client";

import { m, useReducedMotion } from "framer-motion";
import { User, GraduationCap, Building } from "lucide-react";
import { ChangeEvent } from "react";

interface AcademicStepProps {
  formData: {
    fullName: string;
    batch: string;
    degree: string;
  };
  errors: {
    fullName?: string;
  };
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function AcademicStep({ formData, errors, onInputChange }: AcademicStepProps) {
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();
  const batchYears = Array.from({ length: currentYear - 1999 }, (_, i) => String(currentYear - i));

  return (
    <m.div
      key="step-1"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="space-y-5"
    >
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-1">Academic Profile Details</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">Official graduation details.</p>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="fullName" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
          <User className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={onInputChange}
          placeholder="e.g. Adithya Varadhan"
          className={`w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border ${
            errors.fullName ? "border-rose-500" : "border-slate-200 dark:border-slate-800"
          } px-4 py-3 text-sm outline-none focus:ring-4 transition-all`}
        />
        {errors.fullName && <p className="text-xs text-rose-500 font-semibold">{errors.fullName}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="batch" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
            <GraduationCap className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
            Batch
          </label>
          <select
            id="batch"
            name="batch"
            value={formData.batch}
            onChange={onInputChange}
            className="w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm outline-none"
          >
            <option value="">Select Year</option>
            {batchYears.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="degree" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
            <Building className="h-3.5 w-3.5 text-srm-blue dark:text-srm-lightBlue" />
            Degree
          </label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={onInputChange}
            placeholder="e.g. B.Tech CSE"
            className="w-full rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm outline-none"
          />
        </div>
      </div>
    </m.div>
  );
}
