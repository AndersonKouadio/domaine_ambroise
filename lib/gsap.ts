/**
 * Central GSAP registration — import from here, never re-register in components.
 * All plugins are registered once at module level.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
export { useGSAP } from "@gsap/react";
