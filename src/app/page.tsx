"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import CompanyMarquee from "@/components/CompanyMarquee";
import StatsSection from "@/components/StatsSection";
import FeaturedAlumni from "@/components/FeaturedAlumni";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-transparent flex flex-col"
    >
      {/* 1. Hero Landing Section */}
      <Hero />

      {/* 2. Company scrolling Marquee */}
      <CompanyMarquee />

      {/* 3. Academic & Career statistics grid */}
      <StatsSection />

      {/* 4. Highlighted alumni spotlights */}
      <FeaturedAlumni />
    </motion.div>
  );
}
