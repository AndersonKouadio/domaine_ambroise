"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Cursor from "@/components/Cursor";
import MusicPlayer from "@/components/MusicPlayer";

// SSR disabled — Loader uses GSAP + document.body
const Loader = dynamic(() => import("@/components/Loader"), { ssr: false });

export default function PageAnimations() {
  const [loaderDone, setLoaderDone] = useState(false);

  // Fallback de sécurité : révèle le body après 6s si le Loader ne se complète pas
  useEffect(() => {
    const fallback = setTimeout(() => {
      setLoaderDone(true);
      document.documentElement.classList.remove("domaine-loading");
      document.body.style.visibility = "";
    }, 6000);
    return () => clearTimeout(fallback);
  }, []);

  const handleLoaderComplete = () => {
    setLoaderDone(true);
    if (typeof window !== "undefined") {
      // Révèle le contenu de la page
      document.documentElement.classList.remove("domaine-loading");
      document.body.style.visibility = "";
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
