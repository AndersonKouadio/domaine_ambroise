"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type GalleryItem = {
  src: string;
  alt: string;
  category: string;
  span?: "wide" | "tall" | "normal";
};

const photos: GalleryItem[] = [
  { src: "/images/fleuve/1-Firefly_Gemini Flash_améliore la qualité 428380.jpg", alt: "Vue du fleuve Bandama", category: "Nature", span: "wide" },
  { src: "/images/cocotier/3-IMG_5857.jpg", alt: "Espace cocotier", category: "Espaces" },
  { src: "/images/personne/1-img (1).jpg", alt: "Ambiance conviviale", category: "Personnes" },
  { src: "/images/fleuve/4-IMG_5725.jpg", alt: "Rochers et eau", category: "Nature", span: "tall" },
  { src: "/images/bungalow/1-IMG_5714.jpg", alt: "Bungalow traditionnel", category: "Espaces" },
  { src: "/images/personne/2-img (2).jpg", alt: "Moment en famille", category: "Personnes" },
  { src: "/images/fleuve/6-IMG_5791.jpg", alt: "Le fleuve", category: "Nature" },
  { src: "/images/cocotier/2-IMG_5757.jpg", alt: "Sous les cocotiers", category: "Espaces", span: "wide" },
  { src: "/images/personne/5-IMG_5694.jpg", alt: "Détente au domaine", category: "Personnes" },
  { src: "/images/bungalow/3-IMG_5743.jpg", alt: "Architecture bungalow", category: "Espaces" },
  { src: "/images/fleuve/7-IMG_5829.jpg", alt: "L'île sur le Bandama", category: "Nature" },
  { src: "/images/personne/3-img (4).jpg", alt: "Repas en groupe", category: "Personnes" },
  { src: "/images/info/2-IMG_5651.jpg", alt: "Espace événement", category: "Événements" },
  { src: "/images/fleuve/8-IMG_5831.jpg", alt: "Coucher de soleil sur le fleuve", category: "Nature", span: "wide" },
  { src: "/images/bungalow/4-IMG_5745.jpg", alt: "Bungalow côté nature", category: "Espaces" },
  { src: "/images/personne/image2.jpg", alt: "Visiteurs au domaine", category: "Personnes", span: "tall" },
  { src: "/images/personne/image3.jpg", alt: "Moments de convivialité", category: "Personnes" },
  { src: "/images/personne/image4.jpg", alt: "Détente au bord du fleuve", category: "Personnes", span: "wide" },
  { src: "/images/personne/image5.jpg", alt: "Balade au domaine", category: "Personnes" },
  { src: "/images/personne/image6.jpg", alt: "Sourires et partage", category: "Personnes" },
  { src: "/images/personne/image7.jpg", alt: "Ambiance tropicale", category: "Personnes" },
  { src: "/images/personne/image8.jpg", alt: "Journée en groupe", category: "Personnes", span: "tall" },
  { src: "/images/personne/image9.jpg", alt: "Escapade nature", category: "Personnes" },
  { src: "/images/personne/image10.jpg", alt: "Famille au domaine", category: "Personnes", span: "wide" },
  { src: "/images/personne/image11.jpg", alt: "Rires et souvenirs", category: "Personnes" },
  { src: "/images/personne/image12.jpg", alt: "Au cœur du domaine", category: "Personnes" },
  { src: "/images/personne/canoe2.jpeg", alt: "Canoë sur le Bandama", category: "Personnes" },
  { src: "/images/personne/6-IMG_5724.jpg", alt: "Convivialité au domaine", category: "Personnes" },
  { src: "/images/personne/7-IMG_5729.jpg", alt: "Détente en groupe", category: "Personnes", span: "tall" },
  { src: "/images/personne/8-IMG_5761.jpg", alt: "Moments partagés", category: "Personnes" },
  { src: "/images/personne/9-IMG_5764.jpg", alt: "Joie au domaine", category: "Personnes" },
  { src: "/images/personne/10-IMG_5765.jpg", alt: "Nature et partage", category: "Personnes" },
];

const categoryList = ["Tout", "Nature", "Espaces", "Personnes", "Événements"];

export default function Galerie() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered =
    activeCategory === "Tout"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const isOpen = lightboxIdx !== null;
  const current = isOpen ? filtered[lightboxIdx] : null;

  // Animate image swap
  const goTo = useCallback(
    (nextIdx: number, dir: 1 | -1) => {
      const el = imgRef.current;
      if (!el) { setLightboxIdx(nextIdx); return; }
      gsap.to(el, {
        opacity: 0, x: -40 * dir, duration: 0.2, ease: "power2.in",
        onComplete: () => {
          setLightboxIdx(nextIdx);
          gsap.fromTo(el, { opacity: 0, x: 40 * dir }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" });
        },
      });
    },
    []
  );

  const prev = useCallback(() => {
    if (lightboxIdx === null) return;
    goTo((lightboxIdx - 1 + filtered.length) % filtered.length, -1);
  }, [lightboxIdx, filtered.length, goTo]);

  const next = useCallback(() => {
    if (lightboxIdx === null) return;
    goTo((lightboxIdx + 1) % filtered.length, 1);
  }, [lightboxIdx, filtered.length, goTo]);

  const close = useCallback(() => setLightboxIdx(null), []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "Escape")     close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, next, prev, close]);

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useGSAP(() => {
    gsap.from(".galerie-header > :not(.h2-mask-wrapper)", {
      opacity: 0, y: 40, stagger: 0.15, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ".galerie-header", start: "top 82%", once: true },
    });
    gsap.from(".galerie-header .section-h2-mask", {
      yPercent: 105, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: ".galerie-header", start: "top 82%", once: true },
    });
    gsap.from(".galerie-filters", {
      opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ".galerie-filters", start: "top 85%", once: true },
    });
    ScrollTrigger.batch(".galerie-photo", {
      start: "top 88%",
      onEnter: (batch) =>
        gsap.from(batch, { opacity: 0, scale: 0.92, stagger: 0.06, duration: 0.6, ease: "power3.out" }),
      once: true,
    });
  }, { scope: sectionRef });

  const handleFilterChange = (cat: string) => {
    setActiveCategory(cat);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        gsap.fromTo(
          ".galerie-photo",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, stagger: 0.04, duration: 0.45, ease: "power3.out" }
        );
      });
    });
  };

  return (
    <section ref={sectionRef} id="galerie" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="galerie-header text-center mb-16">
          <p className="font-cinzel text-or text-xs tracking-[0.4em] uppercase mb-4">Galerie</p>
          <div className="overflow-hidden h2-mask-wrapper">
            <h2 className="font-cinzel text-4xl md:text-5xl text-vert font-semibold mb-6 section-h2-mask">
              Le Domaine en images
            </h2>
          </div>
          <div className="gold-line w-32 mx-auto" />
        </div>

        {/* Filters */}
        <div className="galerie-filters flex flex-wrap justify-center gap-2 mb-12">
          {categoryList.map((cat) => (
            <Button
              key={cat}
              onPress={() => handleFilterChange(cat)}
              className={`font-poppins text-xs tracking-[0.15em] uppercase px-5 py-2.5 h-auto min-h-0 rounded-none transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-vert! text-or!"
                  : "bg-cream! text-vert! hover:bg-vert/10!"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((photo, i) => (
            <div
              key={`${photo.src}-${i}`}
              className={`galerie-photo relative overflow-hidden cursor-pointer group break-inside-avoid ${
                photo.span === "wide" ? "aspect-video" : photo.span === "tall" ? "aspect-[2/3]" : "aspect-square"
              }`}
              onClick={() => setLightboxIdx(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-4">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-cinzel text-or text-xs tracking-[0.2em] uppercase">
                    {photo.category}
                  </span>
                  <p className="font-poppins text-white text-sm mt-1">{photo.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && current && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <Button
            onPress={close}
            className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 border-none shadow-none rounded-full w-10 h-10 min-h-0 p-0 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Fermer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 font-cinzel text-white/50 text-xs tracking-[0.3em]">
            {(lightboxIdx! + 1).toString().padStart(2, "0")} / {filtered.length.toString().padStart(2, "0")}
          </div>

          {/* Prev */}
          <Button
            onPress={(e) => { prev(); }}
            className="absolute left-3 md:left-6 bg-white/10 hover:bg-or/80 border-none shadow-none rounded-full w-11 h-11 min-h-0 p-0 flex items-center justify-center text-white hover:text-vert transition-all duration-200 z-10"
            aria-label="Précédent"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>

          {/* Image */}
          <div
            ref={imgRef}
            className="relative w-full h-full max-w-6xl max-h-[88vh] mx-16 md:mx-24"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next */}
          <Button
            onPress={(e) => { next(); }}
            className="absolute right-3 md:right-6 bg-white/10 hover:bg-or/80 border-none shadow-none rounded-full w-11 h-11 min-h-0 p-0 flex items-center justify-center text-white hover:text-vert transition-all duration-200 z-10"
            aria-label="Suivant"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </Button>

          {/* Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <p className="font-cinzel text-or text-xs tracking-[0.25em] uppercase mb-1">{current.category}</p>
            <p className="font-poppins text-white/60 text-sm">{current.alt}</p>
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-xs md:max-w-lg overflow-hidden pointer-events-none">
            {filtered.map((_, i) => (
              <div
                key={i}
                className={`h-0.5 flex-1 transition-all duration-300 ${
                  i === lightboxIdx ? "bg-or" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
