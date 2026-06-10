"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";
import Hero from "@/components/Hero";
import CompanyMarquee from "@/components/CompanyMarquee";
import StatsSection from "@/components/StatsSection";
import FeaturedAlumni from "@/components/FeaturedAlumni";
import UpcomingEvents from "@/components/UpcomingEvents";

export default function HomeClient() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full min-h-screen bg-transparent flex flex-col overflow-x-hidden"
      >
        {/* 1. Hero Landing Section */}
        <Hero />

        {/* 2. Company scrolling Marquee */}
        <CompanyMarquee />

        {/* 3. Academic & Career statistics grid */}
        <StatsSection />

        {/* 4. Highlighted alumni spotlights */}
        <FeaturedAlumni />

        {/* 5. Upcoming university & alumni events */}
        <UpcomingEvents limit={4} />
      </m.div>
    </LazyMotion>
  );
}
