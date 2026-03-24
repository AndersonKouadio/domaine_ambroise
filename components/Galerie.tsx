"use client";

import { useRef, useState } from "react";
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
];

const categoryList = ["Tout", "Nature", "Espaces", "Personnes", "Événements"];

export default function Galerie() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered =
    activeCategory === "Tout"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  useGSAP(() => {
    // Header
    gsap.from(".galerie-header > *", {
      opacity: 0, y: 40, stagger: 0.15, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ".galerie-header", start: "top 82%", once: true },
    });

    // Filter buttons
    gsap.from(".galerie-filters", {
      opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ".galerie-filters", start: "top 85%", once: true },
    });

    // Photos batch reveal
    ScrollTrigger.batch(".galerie-photo", {
      start: "top 88%",
      onEnter: (batch) =>
        gsap.from(batch, {
          opacity: 0,
          scale: 0.92,
          stagger: 0.06,
          duration: 0.6,
          ease: "power3.out",
        }),
      once: true,
    });
  }, { scope: sectionRef });

  const handleFilterChange = (cat: string) => {
    setActiveCategory(cat);
    // Animate new set of photos after React re-renders
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
          <h2 className="font-cinzel text-4xl md:text-5xl text-vert font-semibold mb-6">
            Le Domaine en images
          </h2>
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

        {/* Masonry-style grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((photo, i) => (
            <div
              key={`${photo.src}-${i}`}
              className={`galerie-photo relative overflow-hidden cursor-pointer group break-inside-avoid ${
                photo.span === "wide" ? "aspect-video" : photo.span === "tall" ? "aspect-[2/3]" : "aspect-square"
              }`}
              onClick={() => setLightbox(photo)}
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
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <Button
            onPress={() => setLightbox(null)}
            className="absolute top-6 right-6 bg-transparent border-none shadow-none p-0 h-auto min-h-0 rounded-none text-white/70 hover:text-or transition-colors"
            aria-label="Fermer"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
          <div
            className="relative max-w-5xl w-full max-h-[85vh] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="font-cinzel text-or text-xs tracking-[0.2em] uppercase">{lightbox.category}</p>
            <p className="font-poppins text-white/70 text-sm mt-1">{lightbox.alt}</p>
          </div>
        </div>
      )}
    </section>
  );
}
