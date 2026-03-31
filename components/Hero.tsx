"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const scrollTo = (hash: string) =>
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });

// Premier slide (cocotier) retiré sur demande — on garde les 3 autres
const slides = [
  { src: "/images/fleuve/4-IMG_5725.jpg", alt: "Rochers et nature au bord du Bandama" },
  { src: "/images/cocotier/img5.jpg", alt: "Balade en pirogue sur le Bandama" },
  { src: "/images/bungalow/1-IMG_5714.jpg", alt: "Bungalow traditionnel du domaine" },
  { src: "/images/cocotier/3-img3.jpg", alt: "Balade en pirogue sur le Bandama" },
];

const words = ["Nature", "Convivialité", "Évasion"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  // Slideshow — useRef to avoid double-interval in Strict Mode
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (slideTimer.current) clearInterval(slideTimer.current);
    slideTimer.current = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6000);
    return () => { if (slideTimer.current) clearInterval(slideTimer.current); };
  }, []);

  // Animated word
  useEffect(() => {
    const t = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => { setWordIdx((p) => (p + 1) % words.length); setWordVisible(true); }, 450);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  // GSAP entrance + parallax
  useGSAP(() => {
    // Entrance timeline — pausée, lancée après le loader
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, paused: true });
    tl.from(".hero-logo", { opacity: 0, scale: 0.7, duration: 1 })
      .from(".hero-loc", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
      .from(".hero-title-1", { opacity: 0, y: 60, duration: 1 }, "-=0.3")
      .from(".hero-title-2", { opacity: 0, y: 60, duration: 1 }, "-=0.7")
      .from(".hero-sub", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
      .from(".hero-cta", { opacity: 0, y: 25, stagger: 0.15, duration: 0.7 }, "-=0.4")
      .from(".hero-dots", { opacity: 0, duration: 0.5 }, "-=0.3");

    const play = () => tl.play();
    let observer: MutationObserver | null = null;

    // Démarre quand domaine-loading est retiré du <html> (loader ou fallback 6s)
    if (!document.documentElement.classList.contains("domaine-loading")) {
      play();
    } else {
      observer = new MutationObserver(() => {
        if (!document.documentElement.classList.contains("domaine-loading")) {
          observer!.disconnect();
          play();
        }
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    // Parallax on scroll: bg moves slower than scroll
    gsap.to(bgRef.current, {
      yPercent: 25,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Scroll indicator fades out
    gsap.to(".hero-scroll", {
      opacity: 0,
      y: 20,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "200px top",
        scrub: true,
      },
    });

    return () => observer?.disconnect();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative h-screen min-h-150 overflow-hidden">

      {/* Background slides with parallax wrapper */}
      <div ref={bgRef} className="absolute inset-0 scale-110 origin-top">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1800 ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/25 to-black/80" />

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-or to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6 pt-16">

        <div className="hero-logo w-20 h-20 md:w-24 md:h-24 relative mb-6">
          <Image src="/icon.png" alt="Domaine Ambroise" fill sizes="128px" className="object-contain" loading="eager" />
        </div>

        <p className="hero-loc font-cinzel text-or text-xs md:text-base tracking-[0.45em] uppercase mb-5">
          Tiassalé · Côte d&apos;Ivoire
        </p>

        <h1 className="hero-title-1 font-cinzel text-5xl md:text-7xl lg:text-8xl font-semibold leading-none mb-1">
          Domaine
        </h1>
        <h1 className="hero-title-2 font-cinzel text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[0.12em] mb-8">
          <span className="text-gradient-gold">Ambroise</span>
        </h1>

        {/* Animated word */}
        <div className="hero-sub h-7 mb-10 flex items-center justify-center gap-3">
          <div className="w-10 h-px bg-or/70" />
          <span className={`font-poppins text-white/80 text-xs md:text-base tracking-[0.35em] uppercase transition-all duration-450 ${wordVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
            {words[wordIdx]}
          </span>
          <div className="w-10 h-px bg-or/70" />
        </div>

        <p className="hero-sub font-poppins text-white/70 text-sm md:text-lg max-w-lg leading-relaxed mb-12">
          Un espace d&apos;exception au bord du fleuve Bandama,
          <br className="hidden md:block" /> à seulement 117 km d&apos;Abidjan.
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Button
            onPress={() => scrollTo("#espaces")}
            className="font-cinzel bg-or! text-vert! text-xs font-bold tracking-[0.2em] uppercase px-10 py-4 h-auto min-h-0 rounded-none hover:bg-or-light! transition-colors duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            Découvrir les espaces
          </Button>
          <Button
            variant="ghost"
            onPress={() => scrollTo("#contact")}
            className="font-cinzel bg-transparent! text-white! border-2 border-white/70 text-xs font-semibold tracking-[0.2em] uppercase px-10 py-4 h-auto min-h-0 rounded-none hover:border-or hover:text-or! transition-all duration-300 w-full sm:w-auto"
          >
            Réserver
          </Button>
        </div>
      </div>

      {/* Slide dots */}
      <div className="hero-dots absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${i === current ? "w-8 h-1 bg-or" : "w-2 h-1 bg-white/40"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll hidden md:flex absolute bottom-8 right-8 z-10 flex-col items-center gap-2">
        <p className="font-cinzel text-white/40 text-[9px] tracking-[0.3em] uppercase [writing-mode:vertical-rl] mb-2">Défiler</p>
        <div className="w-px h-12 bg-linear-to-b from-or to-transparent" />
      </div>
    </section>
  );
}
