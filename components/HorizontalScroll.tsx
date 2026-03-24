"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const moments = [
  {
    time: "10h",
    title: "Arrivée & Accueil",
    desc: "Bienvenue dans un cadre hors du commun",
    image: "/images/cocotier/IMG_5878.JPG",
  },
  {
    time: "12h",
    title: "Déjeuner sous les cocotiers",
    desc: "Saveurs et ombre tropicale au bord du Bandama",
    image: "/images/cocotier/2-IMG_5757.jpg",
  },
  {
    time: "15h",
    title: "Traversée vers l'Île",
    desc: "L'aventure et l'évasion vous appellent",
    image: "/images/fleuve/7-IMG_5829.jpg",
  },
  {
    time: "18h",
    title: "Coucher de soleil",
    desc: "Le Bandama s'embrase de mille nuances d'or",
    image: "/images/fleuve/8-IMG_5831.jpg",
  },
  {
    time: "20h",
    title: "Soirée & Magie",
    desc: "La nuit au Domaine vous appartient",
    image: "/images/personne/3-img (4).jpg",
  },
];

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ── Desktop: pinned horizontal track ─────────────────────────────────
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      if (!track) return;

      // Horizontal translation tied to scroll
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Gold progress bar
      gsap.to(".hs-progress-bar", {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Cards entrance: stagger on first entry
      gsap.from(".hs-card", {
        opacity: 0, y: 30, stagger: 0.12, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    });

    // ── Mobile: batch reveal ──────────────────────────────────────────────
    mm.add("(max-width: 1023px)", () => {
      gsap.from(".hs-mob-header > *", {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".hs-mob-header", start: "top 85%", once: true },
      });
      ScrollTrigger.batch(".hs-card-mob", {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: "power3.out",
          }),
        once: true,
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="moments" className="relative bg-vert-deep overflow-hidden">

      {/* ═══════════════ DESKTOP ═══════════════ */}
      <div className="hidden lg:block">
        {/* Floating header */}
        <div className="absolute top-10 left-14 xl:left-20 z-20">
          <p className="font-cinzel text-or text-xs tracking-[0.45em] uppercase mb-2">
            Immersion
          </p>
          <h2 className="font-cinzel text-white text-4xl font-semibold">
            Une journée au Domaine
          </h2>
          <div className="gold-line w-24 mt-4" />
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex h-screen will-change-transform"
          style={{ width: `${moments.length * 100}vw` }}
        >
          {moments.map((m, i) => (
            <div
              key={i}
              className="hs-card relative shrink-0 w-screen h-full overflow-hidden"
            >
              <Image
                src={m.image}
                alt={m.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-16 left-14 xl:left-20 max-w-lg">
                <p className="font-cinzel text-or/70 text-xs tracking-[0.45em] uppercase mb-3">
                  {m.time}
                </p>
                <h3 className="font-cinzel text-white text-4xl xl:text-5xl font-semibold mb-3 leading-tight">
                  {m.title}
                </h3>
                <div className="w-12 h-px bg-or/60 mb-4" />
                <p className="font-poppins text-white/60 text-base">{m.desc}</p>
              </div>

              {/* Card number watermark */}
              <span className="absolute top-8 right-14 font-cinzel text-white/6 text-[150px] font-bold leading-none select-none">
                0{i + 1}
              </span>

              {/* Right edge separator */}
              {i < moments.length - 1 && (
                <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-white/10" />
              )}
            </div>
          ))}
        </div>

        {/* Gold progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-20">
          <div className="hs-progress-bar h-full bg-or origin-left scale-x-0" />
        </div>
      </div>

      {/* ═══════════════ MOBILE ═══════════════ */}
      <div className="lg:hidden pt-16 pb-20">
        <div className="hs-mob-header text-center mb-10 px-6">
          <p className="font-cinzel text-or text-xs tracking-[0.45em] uppercase mb-4">
            Immersion
          </p>
          <h2 className="font-cinzel text-white text-4xl font-semibold mb-6">
            Une journée au Domaine
          </h2>
          <div className="gold-line w-24 mx-auto" />
        </div>

        {/* Snap carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {moments.map((m, i) => (
            <div
              key={i}
              className="hs-card-mob relative shrink-0 w-[80vw] h-[65vw] max-h-72 overflow-hidden snap-start rounded-sm"
            >
              <Image
                src={m.image}
                alt={m.title}
                fill
                className="object-cover"
                sizes="80vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-cinzel text-or/70 text-[10px] tracking-[0.35em] uppercase mb-1">
                  {m.time}
                </p>
                <h3 className="font-cinzel text-white text-xl font-semibold leading-tight">
                  {m.title}
                </h3>
                <p className="font-poppins text-white/55 text-xs mt-1">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-1.5 mt-5">
          {moments.map((_, i) => (
            <div key={i} className={`h-px ${i === 0 ? "w-6 bg-or" : "w-3 bg-white/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
