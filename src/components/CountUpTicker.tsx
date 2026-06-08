"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface CountUpTickerProps {
  value: string;
}

export default function CountUpTicker({ value }: CountUpTickerProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  
  // Start the display at "1" or matching prefix + "1" + suffix
  const [displayValue, setDisplayValue] = useState(() => {
    const match = value.match(/([^\d\.]*)([\d\.,]+)([^\d\.]*)/);
    if (!match) return value;
    return `${match[1]}1${match[3]}`;
  });

  useEffect(() => {
    if (!isInView) return;

    // Parse numeric parts and surrounding characters
    // Examples: "15,000+", "₹42.5 LPA", "500+", "98.2%"
    const match = value.match(/([^\d\.]*)([\d\.,]+)([^\d\.]*)/);
    if (!match) return;

    const prefix = match[1];
    const numString = match[2].replace(/,/g, ""); // remove commas for numeric parsing
    const suffix = match[3];

    const targetNum = parseFloat(numString);
    if (isNaN(targetNum)) return;

    const hasCommas = match[2].includes(",");
    const isDecimal = numString.includes(".");
    const decimalPlaces = isDecimal ? numString.split(".")[1].length : 0;

    // Smooth physics-based count up from 1 to target value in exactly 2.5 seconds
    const controls = animate(1, targetNum, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate(latestValue) {
        let formattedValue: string;
        
        if (isDecimal) {
          formattedValue = latestValue.toFixed(decimalPlaces);
        } else {
          formattedValue = Math.floor(latestValue).toString();
        }

        if (hasCommas) {
          // Add back commas: e.g. 15000 -> 15,000
          formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        setDisplayValue(`${prefix}${formattedValue}${suffix}`);
      }
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span
      ref={containerRef}
      className="inline-block tabular-nums font-display font-extrabold text-srm-yellow select-none leading-none tracking-tight"
    >
      {displayValue}
    </span>
  );
}
