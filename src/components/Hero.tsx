"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import BackgroundBeams from "./BackgroundBeams";
import { HeroContent } from "./Hero/HeroContent";
import { GlobalMap } from "./Hero/GlobalMap";

export default function Hero() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 md:py-20 overflow-hidden bg-transparent">
        
        {/* Dynamic Canvas Background Beams */}
        <BackgroundBeams />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-crimson-700/10 blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-gold-600/5 blur-[130px] pointer-events-none z-0" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <HeroContent />
            <GlobalMap />
          </div>
        </div>

      </section>
    </LazyMotion>
  );
}
