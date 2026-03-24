"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

const TICKS = 20;

export default function ScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef      = useRef<HTMLDivElement>(null);
  const [progress, setProgress]   = useState(0);
  const [visible,  setVisible]    = useState(false);

  // Set initial scaleY via GSAP (not inline style — scaleY is not a valid CSS property)
  useLayoutEffect(() => {
    if (fillRef.current) gsap.set(fillRef.current, { scaleY: 0, transformOrigin: "top" });
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const onScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const pct        = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
      setVisible(scrollTop > 80);

      // Animate fill bar via GSAP for smoothness
      if (fillRef.current) {
        gsap.to(fillRef.current, {
          scaleY: pct / 100,
          duration: 0.4,
          ease: "power2.out",
          overwrite: true,
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Counter */}
      <span className="font-cinzel text-or text-[10px] tracking-[0.15em] tabular-nums w-7 text-center">
        {progress.toString().padStart(2, "0")}
      </span>

      {/* Ruler with animated fill */}
      <div className="relative flex gap-1 items-end h-40">
        {/* Tick marks */}
        <div className="flex flex-col justify-between h-full py-0.5 gap-0">
          {Array.from({ length: TICKS }).map((_, i) => (
            <div
              key={i}
              className={`w-${i % 5 === 0 ? "3" : "1.5"} h-px transition-colors duration-300`}
              style={{
                width: i % 5 === 0 ? "12px" : "6px",
                backgroundColor:
                  (i / TICKS) * 100 <= progress
                    ? "rgba(221,162,40,0.9)"
                    : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* Vertical track */}
        <div className="relative w-px h-full bg-white/15 overflow-hidden">
          <div
            ref={fillRef}
            className="absolute top-0 left-0 right-0 bg-or origin-top"
            style={{ height: "100%" }}
          />
        </div>
      </div>

      {/* Bottom label */}
      <span className="font-cinzel text-white/30 text-[8px] tracking-[0.2em] uppercase [writing-mode:vertical-rl]">
        scroll
      </span>
    </div>
  );
}
