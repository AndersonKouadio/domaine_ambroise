"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete() {
        document.body.style.overflow = "";
        onComplete();
      },
    });

    tl.from(logoRef.current, { opacity: 0, scale: 0.82, duration: 0.6, ease: "power3.out" })
      .from(nameRef.current, { opacity: 0, y: 8, duration: 0.4, ease: "power3.out" }, "-=0.3")
      .fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "center" },
        { scaleX: 1, duration: 0.6, ease: "expo.out" },
        "-=0.2"
      )
      .to([logoRef.current, nameRef.current, lineRef.current], {
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
        delay: 0.35,
      })
      .to(topRef.current, { yPercent: -100, duration: 0.75, ease: "expo.inOut" }, "-=0.05")
      .to(bottomRef.current, { yPercent: 100, duration: 0.75, ease: "expo.inOut" }, "<");
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
    >
      {/* Top curtain */}
      <div ref={topRef} className="absolute inset-x-0 top-0 h-1/2 bg-vert-deep" />
      {/* Bottom curtain */}
      <div ref={bottomRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-vert-deep" />

      {/* Center logo (above both curtains) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
        <div ref={logoRef} className="relative w-20 h-20">
          <Image
            src="/logo.png"
            alt="Domaine Ambroise"
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
        <p
          ref={nameRef}
          className="font-cinzel text-or text-xs tracking-[0.55em] uppercase"
        >
          Domaine Ambroise
        </p>
        <div
          ref={lineRef}
          className="w-16 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #dda228, transparent)",
          }}
        />
      </div>
    </div>
  );
}
