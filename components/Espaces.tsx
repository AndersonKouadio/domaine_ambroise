"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const espaces = [
  {
    id: "terrain",
    title: "Espace Terrain",
    subtitle: "Grand air & liberté",
    description: "Notre espace terrain vous offre une immersion totale dans la nature, avec une vue directe sur le fleuve Bandama. Idéal pour les pique-niques, les événements en plein air et les grands rassemblements.",
    image: "/images/cocotier/IMG_5878.JPG",
    features: ["Vue fleuve panoramique", "Tréteaux disponibles", "Jusqu'à 500 personnes", "Privatisation possible"],
    accent: "#dda228",
  },
  {
    id: "cocotier",
    title: "Espace Cocotier",
    subtitle: "Ombre & sérénité",
    description: "Sous les cocotiers majestueux en bordure du fleuve, cet espace offre une ambiance tropicale unique. Profitez de l'ombre naturelle pour vos réunions, célébrations et moments de détente.",
    image: "/images/cocotier/1-IMG_5755.jpg",
    features: ["Ambiance tropicale", "En bordure du fleuve", "Jusqu'à 500 personnes", "Piste & bordure"],
    accent: "#3e8a63",
  },
  {
    id: "bungalow",
    title: "Espace Bungalow",
    subtitle: "Authenticité & confort",
    description: "Nos bungalows traditionnels offrent un cadre intime et authentique. Parfaits pour les séjours, les petits groupes et les événements qui demandent une touche de caractère et d'élégance naturelle.",
    image: "/images/bungalow/2-IMG_5740.jpg",
    features: ["Architecture traditionnelle", "Confort moderne", "Jusqu'à 250 personnes", "Piste & bordure"],
    accent: "#dda228",
  },
  {
    id: "ile",
    title: "L'Île & Détente",
    subtitle: "Évasion & exclusivité",
    description: "Accessible en pirogue artisanale, notre île est le seul endroit d'où vous pouvez observer à la fois le fleuve Bandama et le N'Zi. Hamacs, salons privatifs et vue imprenable sur les deux cours d'eau.",
    image: "/images/fleuve/7-IMG_5829.jpg",
    features: ["Pirogue artisanale", "Salons privatifs", "Location de hamacs", "Vue Bandama & N'Zi"],
    accent: "#3e8a63",
  },
];

export default function Espaces() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ── Desktop ────────────────────────────────────────────────────────────────
    mm.add("(min-width: 768px)", () => {
      // Header : stagger + gold line
      gsap.from(".espaces-header > :not(.gold-line):not(.h2-mask-wrapper)", {
        opacity: 0, y: 50, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".espaces-header", start: "top 82%", once: true },
      });
      gsap.from(".espaces-header .section-h2-mask", {
        yPercent: 105, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".espaces-header", start: "top 82%", once: true },
      });
      gsap.fromTo(".espaces-header .gold-line",
        { scaleX: 0, transformOrigin: "center" },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut", delay: 0.5,
          scrollTrigger: { trigger: ".espaces-header", start: "top 82%", once: true } }
      );

      // Chaque ligne : image en rideau top→bottom, contenu en cascade
      gsap.utils.toArray<HTMLElement>(".espace-row").forEach((row) => {
        const imgCtr = row.querySelector(".espace-img-container") as HTMLElement;
        const content = row.querySelector(".espace-content") as HTMLElement;

        if (imgCtr) {
          gsap.fromTo(imgCtr,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power2.inOut",
              scrollTrigger: { trigger: row, start: "top 82%", once: true } }
          );
        }
        if (content) {
          gsap.from(Array.from(content.children), {
            opacity: 0, y: 40, stagger: 0.09, duration: 0.9, ease: "power3.out", delay: 0.25,
            scrollTrigger: { trigger: row, start: "top 78%", once: true },
          });
        }
      });

      // Banner
      gsap.from(".espaces-banner", {
        opacity: 0, y: 50, scale: 0.97, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ".espaces-banner", start: "top 85%", once: true },
      });
    });

    // ── Mobile ─────────────────────────────────────────────────────────────────
    mm.add("(max-width: 767px)", () => {
      gsap.from(".espaces-header > :not(.h2-mask-wrapper)", {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".espaces-header", start: "top 85%", once: true },
      });
      gsap.from(".espaces-header .section-h2-mask", {
        yPercent: 105, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".espaces-header", start: "top 85%", once: true },
      });
      gsap.utils.toArray<HTMLElement>(".espace-row").forEach((row) => {
        gsap.from(row, {
          opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        });
      });
      gsap.from(".espaces-banner", {
        opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".espaces-banner", start: "top 88%", once: true },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="espaces" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="espaces-header text-center mb-20">
          <p className="font-cinzel text-or text-xs tracking-[0.45em] uppercase mb-4">Nos espaces</p>
          <div className="overflow-hidden h2-mask-wrapper">
            <h2 className="font-cinzel text-4xl md:text-5xl text-vert font-semibold mb-6 section-h2-mask">Choisissez votre cadre</h2>
          </div>
          <div className="gold-line w-32 mx-auto mb-6" />
          <p className="font-poppins text-black/55 max-w-xl mx-auto">
            Quatre espaces distincts pour des expériences uniques, de l&apos;intimité au grand rassemblement.
          </p>
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {espaces.map((espace, i) => (
            <div
              key={espace.id}
              className="espace-row grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden group"
            >
              {/* Image */}
              <div className={`espace-img-container relative h-64 sm:h-80 lg:h-full lg:min-h-[440px] overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={espace.image}
                  alt={espace.title}
                  fill
                  className="object-cover group-hover:scale-106 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 to-transparent" />
                <div className="absolute top-6 left-6 font-cinzel text-white/20 text-7xl font-bold leading-none select-none">
                  0{i + 1}
                </div>
              </div>

              {/* Content */}
              <div className={`espace-content flex flex-col justify-center p-8 md:p-12 lg:p-14 bg-cream min-h-[440px] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <p className="font-cinzel text-xs tracking-[0.3em] uppercase mb-2" style={{ color: espace.accent }}>
                  {espace.subtitle}
                </p>
                <h3 className="font-cinzel text-3xl md:text-4xl text-vert font-semibold mb-4">{espace.title}</h3>
                <div className="w-12 h-0.5 mb-6" style={{ backgroundColor: espace.accent }} />
                <p className="font-poppins text-black/65 leading-relaxed mb-8">{espace.description}</p>

                <ul className="grid grid-cols-2 gap-2 mb-8">
                  {espace.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: espace.accent }} />
                      <span className="font-poppins text-sm text-black/65">{f}</span>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          ))}
        </div>

        {/* Capacité banner */}
        <div className="espaces-banner mt-4 bg-vert p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, #dda228, #dda228 1px, transparent 1px, transparent 24px)" }} />
          <p className="font-cinzel text-or text-xs tracking-[0.3em] uppercase mb-3 relative">Privatisation</p>
          <h3 className="font-cinzel text-white text-3xl md:text-4xl font-semibold mb-4 relative">
            Jusqu&apos;à <span className="text-or">1 000 personnes</span>
          </h3>
          <p className="font-poppins text-white/65 max-w-xl mx-auto mb-8 relative">
            Mariages, anniversaires, événements d&apos;entreprise, festivals — nous accueillons tous vos grands projets
            dans un cadre naturel exceptionnel.
          </p>
          <Button
            onPress={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="font-cinzel bg-or! text-vert! text-xs font-bold tracking-[0.2em] uppercase px-10 py-4 rounded-none hover:bg-or-light! h-auto min-h-0 transition-all duration-300 relative"
          >
            Demander un devis
          </Button>
        </div>
      </div>
    </section>
  );
}
