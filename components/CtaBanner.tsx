"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const WHATSAPP = "2250715552695";

export default function CtaBanner() {
  const sectionRef  = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef    = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const waveTopRef  = useRef<SVGPathElement>(null);
  const waveBotRef  = useRef<SVGPathElement>(null);
  const leaf1Ref    = useRef<HTMLDivElement>(null);
  const leaf2Ref    = useRef<HTMLDivElement>(null);
  const leaf3Ref    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ── Background color-shift (cream → vert → vert-deep) ─────────────────
    const bgTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    bgTl
      .to(section, { backgroundColor: "#0f4c3a", duration: 1, ease: "none" })
      .to(section, { backgroundColor: "#0a3528", duration: 1, ease: "none" });

    // ── SVG wave draw (stroke-dashoffset trick) ────────────────────────────
    const setupWave = (el: SVGPathElement | null, scrubStart: string, scrubEnd: string) => {
      if (!el) return;
      const len = el.getTotalLength ? el.getTotalLength() : 1400;
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(el, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { trigger: section, start: scrubStart, end: scrubEnd, scrub: 1 },
      });
    };
    setupWave(waveTopRef.current, "top 85%", "center center");
    setupWave(waveBotRef.current, "center center", "bottom 20%");

    // ── SVG leaf parallax (3 elements, different speeds) ──────────────────
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.to(leaf1Ref.current, {
        y: -100, rotation: -12,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(leaf2Ref.current, {
        y: -60, rotation: 8,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(leaf3Ref.current, {
        y: -140, rotation: -6,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });

    // ── Parallax text layers ───────────────────────────────────────────────
    gsap.to(subtitleRef.current, {
      y: -55,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
    });
    gsap.to(titleRef.current, {
      y: -35,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
    });

    // ── CTA entrance ──────────────────────────────────────────────────────
    gsap.from(ctaRef.current, {
      opacity: 0, y: 40, scale: 0.97, duration: 1.1, ease: "power3.out",
      scrollTrigger: { trigger: ctaRef.current, start: "top 88%", once: true },
    });

    // ── Title reveal ──────────────────────────────────────────────────────
    gsap.from(".cta-title-inner", {
      opacity: 0, y: 50, duration: 1.3, ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 70%", once: true },
    });
    gsap.from(subtitleRef.current, {
      opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 75%", once: true },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#f5f3eb" }}
    >
      {/* Top SVG wave */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          ref={waveTopRef}
          d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 C1320,65 1380,50 1440,40"
          stroke="rgba(221,162,40,0.35)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Bottom SVG wave */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          ref={waveBotRef}
          d="M1440,40 C1240,0 1040,80 840,40 C640,0 440,80 240,40 C120,15 60,30 0,40"
          stroke="rgba(221,162,40,0.35)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Palm leaf — bottom-left, large */}
      <div
        ref={leaf1Ref}
        className="absolute -left-16 bottom-0 w-72 h-72 opacity-[0.08] pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 160 260" fill="none">
          <path d="M80,250 C55,180 10,140 5,60 C35,105 62,125 80,108 C98,125 125,105 155,60 C150,140 105,180 80,250Z" fill="#dda228" />
          <line x1="80" y1="250" x2="80" y2="58" stroke="#dda228" strokeWidth="1.5" />
          <path d="M80,180 Q30,150 8,100" stroke="#dda228" strokeWidth="0.8" fill="none" />
          <path d="M80,180 Q130,150 152,100" stroke="#dda228" strokeWidth="0.8" fill="none" />
        </svg>
      </div>

      {/* Palm leaf — top-right, medium */}
      <div
        ref={leaf2Ref}
        className="absolute -right-10 top-0 w-56 h-56 opacity-[0.07] pointer-events-none rotate-165"
        aria-hidden="true"
      >
        <svg viewBox="0 0 160 260" fill="none">
          <path d="M80,250 C55,180 10,140 5,60 C35,105 62,125 80,108 C98,125 125,105 155,60 C150,140 105,180 80,250Z" fill="#dda228" />
          <line x1="80" y1="250" x2="80" y2="58" stroke="#dda228" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Geometric diamond — center-right, small */}
      <div
        ref={leaf3Ref}
        className="absolute right-1/4 top-16 w-24 h-24 opacity-[0.06] pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="none">
          <polygon points="50,5 95,50 50,95 5,50" stroke="#dda228" strokeWidth="1" fill="none" />
          <polygon points="50,20 80,50 50,80 20,50" stroke="#dda228" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Subtle diagonal pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(221,162,40,0.03), rgba(221,162,40,0.03) 1px, transparent 1px, transparent 36px)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p
          ref={subtitleRef}
          className="font-cinzel text-or text-xs md:text-base tracking-[0.55em] uppercase mb-8"
        >
          Réservation
        </p>

        <div ref={titleRef} className="overflow-hidden mb-10">
          <div className="cta-title-inner">
            <h2 className="font-cinzel text-white text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight">
              Votre moment<br />
              <span className="text-gradient-gold">d&apos;exception</span>
              <br />vous attend
            </h2>
          </div>
        </div>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary: WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-cinzel bg-or text-vert text-xs font-bold tracking-[0.2em] uppercase px-10 py-4 hover:bg-or-light transition-colors duration-300"
          >
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Réserver sur WhatsApp
          </a>

          {/* Secondary: form */}
          <button
            onClick={() =>
              document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-cinzel text-white/60 border border-white/20 text-xs tracking-[0.2em] uppercase px-10 py-4 hover:border-or hover:text-or transition-all duration-300"
          >
            Formulaire de réservation
          </button>
        </div>
      </div>
    </section>
  );
}
