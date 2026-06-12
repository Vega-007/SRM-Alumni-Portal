"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { MOCK_MAP_HUBS } from "@/data/mockData";

// Latitudes and Longitudes mapping for MOCK_MAP_HUBS
const HUB_COORDINATES: Record<string, [number, number]> = {
  chennai: [13.0827, 80.2707],      // SRM Ramapuram Campus (Chennai)
  h1: [37.7749, -122.4194],          // San Francisco
  h2: [47.6062, -122.3321],          // Seattle
  h3: [51.5074, -0.1278],            // London
  h4: [12.9716, 77.5946],            // Bengaluru
  h5: [1.3521, 103.8198],            // Singapore
  h6: [35.6762, 139.6503],           // Tokyo
  h7: [-33.8688, 151.2093],          // Sydney
};

export function ThreeDGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionStart = useRef<number>(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const rRef = useRef(0);

  // Monitor document dark mode class
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = rect.width || 450;

    // Set canvas dimensions explicitly for WebGL
    canvasRef.current.width = size * dpr;
    canvasRef.current.height = size * dpr;

    let phi = 0;

    // Convert mock hubs coordinates to cobe markers format
    const markers = MOCK_MAP_HUBS.map((hub) => {
      const coords = HUB_COORDINATES[hub.id] || [0, 0];
      return {
        location: coords,
        size: hub.isPrimary ? 0.08 : 0.05,
      };
    });

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: 0,
      theta: 0.25, // tilt it slightly down to view northern hemisphere clearly
      dark: isDarkMode ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: isDarkMode ? 6 : 1.2,
      baseColor: isDarkMode ? [0.08, 0.1, 0.15] : [0.93, 0.94, 0.96],
      markerColor: isDarkMode ? [0.9, 0.66, 0.24] : [0.55, 0.12, 0.06], // gold in dark mode, red in light mode
      glowColor: isDarkMode ? [0.12, 0.06, 0.08] : [0.8, 0.8, 0.85],
      markers: markers,
      onRender: (state: any) => {
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        state.phi = phi + rRef.current;
      },
    } as any);

    // Fade in animation
    canvasRef.current.style.opacity = "0";
    const timer = setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.transition = "opacity 0.5s ease";
        canvasRef.current.style.opacity = "1";
      }
    }, 50);

    return () => {
      globe.destroy();
      clearTimeout(timer);
    };
  }, [isDarkMode]);

  return (
    <div className="w-full h-full flex justify-center items-center relative overflow-hidden select-none bg-transparent">
      <div className="relative w-[450px] h-[450px] max-w-full max-h-full">
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX - pointerInteractionStart.current;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = "grabbing";
            }
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = "grab";
            }
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = "grab";
            }
          }}
          onPointerMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionStart.current = delta;
              rRef.current = delta / 200;
            }
          }}
          className="w-full h-full cursor-grab transition-opacity duration-1000"
          style={{ width: 450, height: 450, maxWidth: "100%", aspectRatio: "1/1" }}
        />
        {/* Drag Hint */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none text-[9px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1 bg-white/40 dark:bg-slate-950/40 px-3 py-1 rounded-full backdrop-blur-sm">
          <span>Click & Drag to rotate</span>
        </div>
      </div>
    </div>
  );
}
