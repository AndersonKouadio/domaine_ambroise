"use client";

import { useRef } from "react";
import Image from "next/image";
import { Card } from "@heroui/react";
import { gsap, useGSAP } from "@/lib/gsap";

const stats = [
  { value: 117, suffix: " km", label: "d'Abidjan" },
  { value: 1367000, suffix: "", label: "visiteurs" },
  { value: 3, suffix: "", label: "espaces privatisables" },
];

const fmt = (v: number) => new Intl.NumberFormat("fr-FR").format(v);

export default function Domaine() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Counter animation (toujours actif, indépendant du breakpoint)
    stats.forEach((stat, i) => {
      const el = document.querySelector(`[data-stat="${i}"]`);
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate() {
          el.textContent = fmt(Math.round(obj.val)) + stat.suffix;
        },
        onComplete() {
          el.textContent = fmt(stat.value) + stat.suffix;
        },
      });
    });

    const mm = gsap.matchMedia();

    // ── Desktop ────────────────────────────────────────────────────────────────
    mm.add("(min-width: 768px)", () => {
      // Header : enfants en stagger puis gold line qui se déploie depuis le centre
      gsap.from(".domaine-header > :not(.gold-line):not(.h2-mask-wrapper)", {
        opacity: 0, y: 50, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".domaine-header", start: "top 82%", once: true },
      });
      gsap.from(".domaine-header .section-h2-mask", {
        yPercent: 105, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".domaine-header", start: "top 82%", once: true },
      });
      gsap.fromTo(".domaine-header .gold-line",
        { scaleX: 0, transformOrigin: "center" },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut", delay: 0.5,
          scrollTrigger: { trigger: ".domaine-header", start: "top 82%", once: true } }
      );

      // Images : stagger scale-settle cinématique sur chaque container
      gsap.from(".domaine-img", {
        opacity: 0, scale: 1.08, stagger: 0.12, duration: 1.4, ease: "power2.out",
        scrollTrigger: { trigger: ".domaine-images", start: "top 78%", once: true },
      });

      // Texte : enfants en cascade verticale (plus d'horizontal)
      gsap.from(".domaine-text > *", {
        opacity: 0, y: 50, stagger: 0.1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".domaine-text", start: "top 78%", once: true },
      });

      // Mission / Vision : scale + élévation (rendu éditorial)
      gsap.from(".domaine-block", {
        opacity: 0, y: 50, scale: 0.97, stagger: 0.2, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ".domaine-block", start: "top 85%", once: true },
      });
    });

    // ── Mobile ─────────────────────────────────────────────────────────────────
    mm.add("(max-width: 767px)", () => {
      gsap.from(".domaine-header > :not(.h2-mask-wrapper)", {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".domaine-header", start: "top 85%", once: true },
      });
      gsap.from(".domaine-header .section-h2-mask", {
        yPercent: 105, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".domaine-header", start: "top 85%", once: true },
      });
      gsap.from(".domaine-images", {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".domaine-images", start: "top 85%", once: true },
      });
      gsap.from(".domaine-text > *", {
        opacity: 0, y: 25, stagger: 0.08, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".domaine-text", start: "top 85%", once: true },
      });
      gsap.from(".domaine-block", {
        opacity: 0, y: 25, stagger: 0.12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".domaine-block", start: "top 85%", once: true },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="domaine" className="bg-cream py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="domaine-header text-center mb-20">
          <p className="font-cinzel text-or text-xs tracking-[0.45em] uppercase mb-4">Notre histoire</p>
          <div className="overflow-hidden h2-mask-wrapper">
            <h2 className="font-cinzel text-4xl md:text-5xl text-vert font-semibold mb-6 section-h2-mask">Le Domaine Ambroise</h2>
          </div>
          <div className="gold-line w-32 mx-auto" />
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

          {/* Images */}
          <div className="domaine-images relative grid grid-cols-2 gap-3 h-[480px]">
            <div className="domaine-img relative col-span-1 row-span-2 overflow-hidden">
              <Image src="/images/fleuve/5-IMG_5790.jpg" alt="Le fleuve Bandama" fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
            <div className="domaine-img relative overflow-hidden">
              <Image src="/images/personne/1-img (1).jpg" alt="Ambiance" fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
            <div className="domaine-img relative overflow-hidden">
              <Image src="/images/personne/image9.jpg" alt="Les cocotiers" fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-or -z-10" />
            <div className="absolute -top-4 -left-4 w-14 h-14 bg-or/10 -z-10" />
          </div>

          {/* Text */}
          <div className="domaine-text flex flex-col gap-6">
            <div>
              <p className="font-cinzel text-or text-sm tracking-[0.2em] uppercase mb-3">Un cadre naturel unique</p>
              <p className="font-poppins text-black/80 text-lg leading-relaxed">
                Situé à Tiassalé, en bordure du majestueux fleuve Bandama,
                le <strong className="text-vert">Domaine Ambroise </strong> est un lieu d&apos;exception dédié
                à la détente, aux loisirs et aux événements mémorables.
              </p>
            </div>

            <div className="gold-line" />

            <p className="font-poppins text-black/65 leading-relaxed">
              Entouré d&apos;une nature luxuriante, entre cocotiers, vastes espaces verts
              et panorama apaisant sur le fleuve Bandama et le N&apos;zi, le domaine offre une expérience immersive
              où calme, beauté et élégance se rencontrent.
            </p>

            {/* Stats with counter */}
            <div className="grid grid-cols-3 gap-4 mt-2">
              {stats.map((stat, i) => (
                <Card key={stat.label} className="text-center p-4 border border-or/20 bg-white/70 shadow-none rounded-none">
                  <p
                    data-stat={i}
                    className="font-cinzel text-or text-base md:text-lg font-bold leading-tight"
                  >
                    0{stat.suffix}
                  </p>
                  <p className="font-poppins text-vert text-xs mt-1 leading-tight">{stat.label}</p>
                </Card>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              {["Accès direct au fleuve", "Cocotiers & espaces verts", "Atmosphère tropicale", "Rochers naturels"].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-or shrink-0" />
                  <p className="font-poppins text-sm text-black/65">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="domaine-block bg-vert p-10 md:p-14 text-center">
          <p className="font-cinzel text-or text-xs tracking-[0.3em] uppercase mb-4">Notre mission</p>
          <p className="font-poppins text-white/85 leading-relaxed max-w-2xl mx-auto">
            Offrir un espace unique où particuliers et entreprises peuvent vivre des moments d&apos;exception,
            dans un cadre naturel unique, en alliant confort, convivialité et qualité de service.
          </p>
        </div>
      </div>
    </section>
  );
}
