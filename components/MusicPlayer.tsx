"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const BARS = 4;

export default function MusicPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef     = useRef<HTMLAudioElement>(null);
  const eqRef        = useRef<HTMLDivElement>(null);
  const eqAnim       = useRef<gsap.core.Tween | null>(null);

  const [playing, setPlaying] = useState(false);

  // ── Entrance animation ──────────────────────────────────────────────────
  useGSAP(() => {
    gsap.set(containerRef.current, { y: 80, opacity: 0 });
    const reveal = () =>
      gsap.to(containerRef.current, { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.6 });

    if ((window as Window & { __domaineLoaded?: boolean }).__domaineLoaded) {
      reveal();
    } else {
      window.addEventListener("domaine:loaded", reveal, { once: true });
      const t = setTimeout(reveal, 4000);
      return () => clearTimeout(t);
    }
  }, []);

  // ── Equalizer bars ──────────────────────────────────────────────────────
  useGSAP(() => {
    if (!eqRef.current) return;
    const bars = eqRef.current.querySelectorAll<HTMLElement>(".eq-bar");
    eqAnim.current = gsap.to(bars, {
      scaleY: () => 0.15 + Math.random() * 0.85,
      duration: () => 0.22 + Math.random() * 0.28,
      ease: "power1.inOut",
      stagger: { each: 0.07, repeat: -1, yoyo: true },
      transformOrigin: "bottom center",
      paused: true,
    });
  }, { scope: eqRef });

  // ── Sync eq with play state ─────────────────────────────────────────────
  useEffect(() => {
    if (playing) {
      eqAnim.current?.play();
    } else {
      eqAnim.current?.pause();
      if (eqRef.current) {
        gsap.to(eqRef.current.querySelectorAll(".eq-bar"), {
          scaleY: 0.25, duration: 0.4, ease: "power2.out",
        });
      }
    }
  }, [playing]);

  // ── Autoplay on first user interaction ─────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
    audio.loop   = true;

    const tryPlay = () => {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    };

    // Try immediate autoplay first
    tryPlay();

    // Fallback: first user interaction
    const onInteract = () => {
      if (!playing) tryPlay();
    };
    window.addEventListener("click",      onInteract, { once: true });
    window.addEventListener("touchstart", onInteract, { once: true });
    window.addEventListener("scroll",     onInteract, { once: true });

    return () => {
      window.removeEventListener("click",      onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("scroll",     onInteract);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Toggle ──────────────────────────────────────────────────────────────
  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const onMouseEnter = () =>
    gsap.to(containerRef.current, { y: -3, duration: 0.25, ease: "power2.out" });
  const onMouseLeave = () =>
    gsap.to(containerRef.current, { y: 0,  duration: 0.35, ease: "power3.out" });

  return (
    <>
      <audio ref={audioRef} src="/musics/deep-instrumental.mp3" preload="auto" />

      <div
        ref={containerRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={toggle}
        role="button"
        aria-label={playing ? "Mettre en pause" : "Lancer la musique"}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2.5 cursor-pointer select-none
                   bg-vert-deep border border-or/25 shadow-lg shadow-black/30
                   px-3 py-2.5 md:px-4 md:py-3"
      >
        {/* Equalizer */}
        <div ref={eqRef} className="flex items-end gap-[2px] md:gap-[3px] h-3.5 md:h-5">
          {Array.from({ length: BARS }).map((_, i) => (
            <div
              key={i}
              className="eq-bar w-[2px] md:w-[3px] bg-or rounded-full"
              style={{
                height: "100%",
                transform: "scaleY(0.25)",
                transformOrigin: "bottom center",
                opacity: playing ? 1 : 0.4,
                transition: "opacity 0.3s",
              }}
            />
          ))}
        </div>

        {/* Label */}
        <div className="flex flex-col leading-none">
          <span className="font-cinzel text-or text-[8px] md:text-[9px] tracking-[0.35em] uppercase">
            Ambiance
          </span>
          <span className="font-poppins text-white/35 text-[7px] md:text-[8px] tracking-[0.1em] mt-0.5">
            {playing ? "En cours…" : "Écouter"}
          </span>
        </div>

        {/* Separator */}
        <div className="w-px h-4 md:h-5 bg-or/20" />

        {/* Play / Pause */}
        <div className="relative w-5 h-5 md:w-7 md:h-7 flex items-center justify-center shrink-0">
          {playing && (
            <div className="absolute inset-0 rounded-full border border-or/30 animate-ping opacity-50" />
          )}
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-or/50 flex items-center justify-center bg-or/10">
            {playing ? (
              <div className="flex gap-[2px] md:gap-[3px]">
                <div className="w-[2px] h-2 md:h-2.5 bg-or rounded-full" />
                <div className="w-[2px] h-2 md:h-2.5 bg-or rounded-full" />
              </div>
            ) : (
              <svg className="w-2 h-2 md:w-2.5 md:h-2.5 text-or fill-current ml-0.5" viewBox="0 0 10 12">
                <path d="M0 0 L10 6 L0 12 Z" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
