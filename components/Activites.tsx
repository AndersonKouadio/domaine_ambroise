"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const activities = [
  {
    id: "01",
    title: "Canoë & Balade en Pirogue",
    subtitle: "Explorer le Bandama",
    description:
      "Embarquez à bord d'une pirogue artisanale ou d'un canoë sur le fleuve Bandama. Pagayez en pleine nature, découvrez les berges verdoyantes, les rochers et l'île depuis l'eau.",
    image: "/images/personne/canoe2.jpeg",
    alt: "Canoë sur le fleuve Bandama",
  },
  {
    id: "02",
    title: "Traversée vers l'Île",
    subtitle: "L'évasion exclusive",
    description:
      "Embarquez pour une traversée vers notre île privée accessible uniquement depuis le Domaine. Salons privatifs, hamacs et panorama 360° sur le Bandama.",
    image: "/images/fleuve/7-IMG_5829.jpg",
    alt: "L'île sur le Bandama",
  },
  {
    id: "03",
    title: "Pique-nique & Convivialité",
    subtitle: "Sous les cocotiers",
    description:
      "Installez-vous sous nos cocotiers majestueux avec vos proches. Tréteaux, espaces verts et ambiance tropicale pour des moments de partage inoubliables.",
    image: "/images/personne/image10.jpg",
    alt: "Pique-nique sous les cocotiers",
  },
  {
    id: "04",
    title: "Fêtes & Célébrations",
    subtitle: "Vos plus beaux événements",
    description:
      "Mariages, anniversaires, baptêmes, soirées d'entreprise — nos espaces se transforment en décor d'exception pour tous vos moments festifs jusqu'à 1 000 personnes.",
    image: "/images/personne/image11.jpg",
    alt: "Fête et célébration au domaine",
  },
  {
    id: "05",
    title: "Photo & Création",
    subtitle: "Un décor naturel unique",
    description:
      "Un cadre exceptionnel pour vos shootings photo, tournages de clips et projets artistiques. La lumière dorée et la nature du Bandama comme toile de fond.",
    image: "/images/personne/3-img (4).jpg",
    alt: "Cadre naturel pour la création",
  },
];

// Navbar height offset for sticky top
const STICKY_TOP = 64; // px — h-16

export default function Activites() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ── Desktop: Apple Feature Block (pinned) ─────────────────────────────
    mm.add("(min-width: 1024px)", () => {
      const N = activities.length;

      gsap.from(".act-header > *", {
        opacity: 0, y: 40, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".act-header", start: "top 82%", once: true },
      });
      gsap.fromTo(".act-header .gold-line",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: ".act-header", start: "top 82%", once: true } }
      );
      gsap.from("[data-act-item]", {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: "[data-act-item='0']", start: "top 80%", once: true },
      });

      // DWELL = 2 units hold, FADE = 1 unit crossfade
      // Each image holds ~150vh before transitioning over ~75vh
      const DWELL = 2;
      const FADE  = 1;
      const totalUnits = (N - 1) * (DWELL + FADE);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: `+=${totalUnits * 75}vh`,
          scrub: 1.5,
        },
      });

      for (let i = 1; i < N; i++) {
        const at = `${(i - 1) * (DWELL + FADE) + DWELL}`;

        tl.to(`[data-act-item="${i - 1}"]`, { opacity: 0.28, duration: FADE },          at)
          .to(`[data-act-item="${i}"]`,     { opacity: 1,    duration: FADE },          at)
          .to(`[data-act-img="${i - 1}"]`,  { opacity: 0,    duration: FADE },          at)
          .to(`[data-act-img="${i}"]`,       { opacity: 1,    duration: FADE },          at)
          .to(`[data-act-desc="${i - 1}"]`, { opacity: 0, y: -10, duration: FADE * 0.8 }, at)
          .to(`[data-act-desc="${i}"]`,     { opacity: 1, y: 0,   duration: FADE * 0.8 }, at);
      }
    });

    // ── Mobile: Sticky Card Stack ─────────────────────────────────────────
    mm.add("(max-width: 1023px)", () => {
      // Header entrance
      gsap.from(".act-mob-header > *", {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".act-mob-header", start: "top 85%", once: true },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".act-mobile-card");

      cards.forEach((card, i) => {
        // Last card just fades in — nothing to shrink after it
        if (i >= cards.length - 1) return;

        const overlay = card.querySelector<HTMLElement>(".act-mob-overlay");

        // will-change pour éviter les repaints sur mobile
        gsap.set(card, { willChange: "transform" });

        // scrub: 1 (avec inertie) = beaucoup plus fluide sur mobile que scrub: true
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: `top top+=${STICKY_TOP}`,
            end:   `bottom top+=${STICKY_TOP}`,
            scrub: 1,
          },
        })
          .to(card, {
            scale: 0.9,
            transformOrigin: "top center",
            ease: "none",
          }, 0)
          .to(overlay, { opacity: 0.45, ease: "none" }, 0);
      });

      // Entrance animation for first card
      ScrollTrigger.batch(".act-mobile-card", {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.from(batch, { opacity: 0, y: 50, stagger: 0.12, duration: 0.8, ease: "power3.out" }),
        once: true,
      });
    });
  }, { scope: sectionRef });

  return (
    // overflow-hidden removed so sticky children work correctly
    <section ref={sectionRef} id="activites" className="relative bg-cream">

      {/* ═══════════════ DESKTOP ═══════════════ */}
      <div className="hidden lg:grid grid-cols-5 min-h-screen overflow-hidden">

        {/* Left: header + list + description */}
        <div className="col-span-2 flex flex-col justify-center px-14 xl:px-20 py-20 bg-cream z-10">

          <div className="act-header mb-14">
            <p className="font-cinzel text-or text-xs tracking-[0.45em] uppercase mb-4">
              Expériences
            </p>
            <h2 className="overflow-hidden">
              <span className="block font-cinzel text-4xl xl:text-5xl text-vert font-semibold leading-tight">
                Ce que vous<br />pouvez vivre
              </span>
            </h2>
            <div className="gold-line w-24 mt-6" />
          </div>

          {/* Activity list */}
          <ul className="space-y-5">
            {activities.map((act, i) => (
              <li
                key={act.id}
                data-act-item={i}
                className={`cursor-default transition-opacity ${i === 0 ? "opacity-100" : "opacity-[0.28]"}`}
              >
                <div className="flex items-start gap-5">
                  <span className="font-cinzel text-or/60 text-xs mt-1 shrink-0 w-6 tabular-nums">
                    {act.id}
                  </span>
                  <div>
                    <p className="font-cinzel text-vert text-base xl:text-lg font-semibold leading-snug">
                      {act.title}
                    </p>
                    <p className="font-poppins text-or text-xs tracking-[0.2em] uppercase mt-0.5">
                      {act.subtitle}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Description stack */}
          <div className="relative mt-10 h-28">
            {activities.map((act, i) => (
              <p
                key={act.id}
                data-act-desc={i}
                className={`absolute inset-0 font-poppins text-black/60 text-sm leading-relaxed ${
                  i === 0 ? "opacity-100" : "opacity-0"
                }`}
                style={{ transform: i === 0 ? "translateY(0)" : "translateY(12px)" }}
              >
                {act.description}
              </p>
            ))}
          </div>
        </div>

        {/* Right: stacked images */}
        <div className="col-span-3 relative">
          {activities.map((act, i) => (
            <div
              key={act.id}
              data-act-img={i}
              className={`absolute inset-0 ${i === 0 ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={act.image}
                alt={act.alt}
                fill
                className="object-cover"
                sizes="60vw"
              />
              <div className="absolute inset-0 bg-linear-to-r from-cream/30 to-transparent" />
              <span className="absolute bottom-10 right-10 font-cinzel text-white/[0.07] text-[130px] font-bold leading-none select-none">
                {act.id}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════ MOBILE: Sticky Card Stack ═══════════════ */}
      <div className="lg:hidden">

        {/* Header */}
        <div className="act-mob-header text-center pt-24 pb-10 px-6">
          <p className="font-cinzel text-or text-xs tracking-[0.45em] uppercase mb-4">
            Expériences
          </p>
          <h2 className="font-cinzel text-4xl text-vert font-semibold mb-6">
            Ce que vous pouvez vivre
          </h2>
          <div className="gold-line w-24 mx-auto" />
        </div>

        {/* Cards — each sticks at top-16, no bottom padding = no empty space */}
        <div>
          {activities.map((act, i) => (
            <div
              key={act.id}
              className="act-mobile-card sticky overflow-hidden"
              style={{
                top: `${STICKY_TOP}px`,
                zIndex: i + 1,
                height: "80vh",
              }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={act.image}
                  alt={act.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              {/* Multi-layer gradient — rich and cinematic */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-b from-black/40 to-transparent h-32" />

              {/* Scroll-darkening overlay (animated by GSAP) */}
              <div className="act-mob-overlay absolute inset-0 bg-black opacity-0" />

              {/* Top-left: card counter badge */}
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="font-cinzel text-or text-[10px] tracking-[0.3em] tabular-nums">
                  {act.id}
                </span>
                <span className="w-6 h-px bg-or/50" />
                <span className="font-cinzel text-white/30 text-[10px] tracking-[0.2em] tabular-nums">
                  {String(activities.length).padStart(2, "0")}
                </span>
              </div>

              {/* Top-right: category tag */}
              <div className="absolute top-5 right-5">
                <span className="font-cinzel text-or/70 text-[9px] tracking-[0.35em] uppercase border border-or/30 px-2 py-1">
                  {act.subtitle.split(" ")[0]}
                </span>
              </div>

              {/* Gold left accent bar */}
              <div className="absolute left-0 bottom-24 w-0.5 h-20 bg-linear-to-b from-transparent via-or to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
                {/* Subtitle */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-1 rounded-full bg-or" />
                  <p className="font-cinzel text-or text-[9px] tracking-[0.45em] uppercase">
                    {act.subtitle}
                  </p>
                </div>

                {/* Title */}
                <h3 className="font-cinzel text-white text-2xl md:text-3xl font-semibold leading-tight mb-3 drop-shadow-lg">
                  {act.title}
                </h3>

                {/* Gold rule */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-px bg-or" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-or/60" />
                </div>

                {/* Description */}
                <p className="font-poppins text-white/60 text-xs leading-relaxed line-clamp-2">
                  {act.description}
                </p>

                {/* Progress dots */}
                <div className="flex gap-1.5 mt-4">
                  {activities.map((_, j) => (
                    <div
                      key={j}
                      className={`h-px transition-all duration-300 ${
                        j === i ? "w-5 bg-or" : "w-2 bg-white/25"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
