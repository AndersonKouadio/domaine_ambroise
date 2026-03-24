"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only show on pointer-fine devices (mouse/trackpad, not touch)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Center both elements relative to cursor position
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const moveX = gsap.quickTo(dot, "x", { duration: 0.08 });
    const moveY = gsap.quickTo(dot, "y", { duration: 0.08 });
    const followX = gsap.quickTo(ring, "x", { duration: 0.38, ease: "power3.out" });
    const followY = gsap.quickTo(ring, "y", { duration: 0.38, ease: "power3.out" });

    let visible = false;

    const onMove = (e: MouseEvent) => {
      moveX(e.clientX);
      moveY(e.clientY);
      followX(e.clientX);
      followY(e.clientY);
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
    };

    const onEnter = () => {
      gsap.to(ring, { scale: 1.7, duration: 0.3, ease: "power3.out" });
      gsap.to(dot, { scale: 0.25, duration: 0.2 });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);

    // Attach hover to all interactive elements, observe DOM changes
    function attachHovers() {
      document.querySelectorAll("a, button").forEach((el) => {
        if (el.getAttribute("data-c")) return;
        el.setAttribute("data-c", "1");
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    }
    attachHovers();
    const observer = new MutationObserver(attachHovers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Gold dot — instant tracking */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform"
      >
        <div className="w-2 h-2 rounded-full bg-or" />
      </div>
      {/* Ring — lagged tracking */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none will-change-transform"
      >
        <div
          className="w-7 h-7 rounded-full border border-or/50"
        />
      </div>
    </>
  );
}
