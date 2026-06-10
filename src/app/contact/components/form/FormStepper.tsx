"use client";

import { GraduationCap, Briefcase, CheckCircle2 } from "lucide-react";

interface FormStepperProps {
  step: number;
  isSubmitting: boolean;
  onStepClick: (step: number) => void;
}

export function FormStepper({ step, isSubmitting, onStepClick }: FormStepperProps) {
  const steps = [
    { id: 1, label: "Academic", icon: GraduationCap },
    { id: 2, label: "Corporate", icon: Briefcase },
    { id: 3, label: "Verify", icon: CheckCircle2 },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
        <span>Progress Tracker</span>
        <span className="text-srm-blue dark:text-srm-lightBlue">Step {step} of 3</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden flex">
        <div
          className="h-full bg-srm-red dark:bg-srm-yellow transition-all duration-300 ease-out"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4 text-center">
        {steps.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => s.id < step && onStepClick(s.id)}
            disabled={s.id > step || isSubmitting}
            className={`text-xs font-semibold pb-1 border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              step === s.id
                ? "border-srm-red dark:border-srm-yellow text-slate-900 dark:text-slate-50 font-bold"
                : step > s.id
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-slate-400"
            }`}
          >
            <s.icon className="h-4 w-4" />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
