"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { InstitutionalInfo } from "./components/InstitutionalInfo";
import { CampusMap } from "./components/CampusMap";
import { ProfileUpdateForm } from "./components/ProfileUpdateForm";

export default function ContactClient() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:py-20 md:px-8 overflow-x-hidden">
        {/* Title Header */}
        <div className="mb-12 text-center md:mb-16">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
            Alumni <span className="text-srm-red dark:text-srm-yellow">Contact & Info Gateway</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400">
            Reach out to the SRMIST Ramapuram Alumni Association or update your corporate profile to maintain credentials and active verification on the portal.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Contact Details & Campus Map */}
          <div className="lg:col-span-5 space-y-8">
            <InstitutionalInfo />
            <CampusMap />
          </div>

          {/* Right Column - Profile Update & Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md p-6 md:p-8 shadow-sm relative">
              <ProfileUpdateForm />
            </div>
          </div>

        </div>
      </div>
    </LazyMotion>
  );
}
