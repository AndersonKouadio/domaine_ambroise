"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Cursor from "@/components/Cursor";
import MusicPlayer from "@/components/MusicPlayer";

// SSR disabled — Loader uses GSAP + document.body
const Loader = dynamic(() => import("@/components/Loader"), { ssr: false });

export default function PageAnimations() {
  const [loaderDone, setLoaderDone] = useState(false);

  const handleLoaderComplete = () => {
    setLoaderDone(true);
    if (typeof window !== "undefined") {
      (window as Window & { __domaineLoaded?: boolean }).__domaineLoaded = true;
      window.dispatchEvent(new CustomEvent("domaine:loaded"));
    }
  };

  return (
    <>
      {!loaderDone && <Loader onComplete={handleLoaderComplete} />}
      <Cursor />
      <MusicPlayer />
    </>
  );
}
