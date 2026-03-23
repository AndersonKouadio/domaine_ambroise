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
    description: "Notre espace terrain vous offre une immersion totale dans la nature, avec une vue directe sur le fleuve Bandama. Idéal pour les pique-niques, les événements en plein air et les rassemblements conviviaux.",
    image: "/images/cocotier/IMG_5878.jpg",
    features: ["Vue fleuve panoramique", "Tréteaux disponibles", "Jusqu'à 50 personnes", "Privatisation possible"],
    accent: "#dda228",
  },
  {
    id: "cocotier",
    title: "Espace Cocotier",
    subtitle: "Ombre & sérénité",
    description: "Sous les cocotiers majestueux, cet espace offre une ambiance tropicale unique. Profitez de l'ombre naturelle des palmiers pour vos réunions, célébrations et moments de détente.",
    image: "/images/cocotier/3-IMG_5857.jpg",
    features: ["Sous les palmiers", "Ambiance tropicale", "Jusqu'à 50 personnes", "Piste & bordure"],
    accent: "#3e8a63",
  },
  {
    id: "bungalow",
    title: "Espace Bungalow",
    subtitle: "Authenticité & confort",
    description: "Nos bungalows traditionnels offrent un cadre intime et authentique. Parfaits pour les séjours, les petits groupes et les événements qui demandent une touche de caractère et d'élégance naturelle.",
    image: "/images/bungalow/2-IMG_5740.jpg",
    features: ["Architecture traditionnelle", "Confort moderne", "Jusqu'à 50 personnes", "Piste & bordure"],
    accent: "#dda228",
  },
  {
    id: "ile",
    title: "L'Île & Détente",
    subtitle: "Évasion & exclusivité",
    description: "Une île accessible en traversée, pour une expérience véritablement hors du commun. Hamacs, salons privatifs et vue imprenable sur le Bandama. L'évasion ultime au cœur de la nature.",
    image: "/images/fleuve/7-IMG_5829.jpg",
    features: ["Traversée incluse", "Salons privatifs", "Location de hamacs", "Vue 360° fleuve"],
    accent: "#3e8a63",
  },
];

export default function Espaces() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header
    gsap.from(".espaces-header > *", {
      opacity: 0, y: 40, stagger: 0.15, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ".espaces-header", start: "top 82%" },
    });

    // Each row: alternate slide from left / right
    gsap.utils.toArray<HTMLElement>(".espace-row").forEach((row, i) => {
      const fromLeft = i % 2 === 0;
      gsap.from(row, {
        opacity: 0,
        x: fromLeft ? -80 : 80,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 82%", once: true },
      });
    });

    // Capacité banner
    gsap.from(".espaces-banner", {
      opacity: 0, y: 50, scale: 0.97, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ".espaces-banner", start: "top 85%" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="espaces" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="espaces-header text-center mb-20">
          <p className="font-cinzel text-or text-xs tracking-[0.45em] uppercase mb-4">Nos espaces</p>
          <h2 className="font-cinzel text-4xl md:text-5xl text-vert font-semibold mb-6">Choisissez votre cadre</h2>
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
              <div className={`relative h-64 sm:h-80 lg:h-full lg:min-h-[440px] overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
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
              <div className={`flex flex-col justify-center p-8 md:p-12 lg:p-14 bg-cream min-h-[440px] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
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

                <a
                  href="#tarifs"
                  className="inline-flex items-center gap-3 font-cinzel text-xs tracking-[0.2em] uppercase font-semibold group/link w-fit"
                  style={{ color: espace.accent }}
                >
                  Voir les tarifs
                  <span className="h-px w-8 group-hover/link:w-16 transition-all duration-400" style={{ backgroundColor: espace.accent }} />
                </a>
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
            className="font-cinzel bg-or text-vert text-xs font-bold tracking-[0.2em] uppercase px-10 py-4 rounded-none hover:bg-or-light h-auto min-h-0 transition-all duration-300 relative"
          >
            Demander un devis
          </Button>
        </div>
      </div>
    </section>
  );
}
