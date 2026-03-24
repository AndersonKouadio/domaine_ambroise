"use client";

import { useRef } from "react";
import { Card } from "@heroui/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type DrinkItem = { name: string; price: string };
type DrinkCategory = { title: string; icon: string; items: DrinkItem[] };

const categories: DrinkCategory[] = [
  {
    title: "Bières",
    icon: "🍺",
    items: [
      { name: "Bock 50 / 66", price: "700 F" },
      { name: "Bock 100", price: "1 000 F" },
      { name: "Ivoire Bleu 50", price: "700 F" },
      { name: "Ivoire Black 50", price: "700 F" },
      { name: "Castel 50", price: "700 F" },
      { name: "Guinness 65", price: "1 500 F" },
      { name: "Beaufort 50", price: "1 000 F" },
      { name: "Heineken", price: "700 F" },
      { name: "Desperados", price: "700 F" },
      { name: "Chill 50 / Doppel 50", price: "700 F" },
    ],
  },
  {
    title: "Vins & Spiritueux",
    icon: "🍷",
    items: [
      { name: "Valpierre 100", price: "2 500 F" },
      { name: "Valpierre 50", price: "1 200 F" },
      { name: "Vins bouchés (dès)", price: "2 000 F" },
      { name: "Tequila 50", price: "700 F" },
      { name: "Racine 50", price: "700 F" },
    ],
  },
  {
    title: "Sans Alcool",
    icon: "🥤",
    items: [
      { name: "Coca-Cola (grand)", price: "1 000 F" },
      { name: "Orangina", price: "1 000 F" },
      { name: "Cody's", price: "1 000 F" },
      { name: "Rhino / Doppel Énergie", price: "700 F" },
      { name: "Eau minérale", price: "600 F" },
    ],
  },
];

export default function Carte() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header stagger
    gsap.from(".carte-header > :not(.h2-mask-wrapper)", {
      opacity: 0, y: 40, stagger: 0.15, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ".carte-header", start: "top 82%", once: true },
    });
    gsap.from(".carte-header .section-h2-mask", {
      yPercent: 105, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: ".carte-header", start: "top 82%", once: true },
    });

    // Cards batch reveal: staggered as they enter viewport
    ScrollTrigger.batch(".carte-card", {
      start: "top 85%",
      onEnter: (batch) =>
        gsap.from(batch, {
          opacity: 0,
          y: 60,
          stagger: 0.18,
          duration: 0.9,
          ease: "power3.out",
        }),
      once: true,
    });

    // Bottom note
    gsap.from(".carte-note", {
      opacity: 0, y: 20, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ".carte-note", start: "top 90%", once: true },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="carte" className="bg-vert py-24 md:py-32 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, #dda228, #dda228 1px, transparent 1px, transparent 30px)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Header */}
        <div className="carte-header text-center mb-20">
          <p className="font-cinzel text-or text-xs tracking-[0.4em] uppercase mb-4">Nos boissons</p>
          <div className="overflow-hidden h2-mask-wrapper">
            <h2 className="font-cinzel text-4xl md:text-5xl text-white font-semibold mb-6 section-h2-mask">La Carte</h2>
          </div>
          <div className="gold-line w-32 mx-auto mb-6" />
          <p className="font-poppins text-white/60 max-w-md mx-auto">
            Une sélection soigneuse pour accompagner vos moments de convivialité.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Card
              key={cat.title}
              className="carte-card border border-or/20 bg-vert-deep/60 backdrop-blur-sm rounded-none shadow-none p-0 gap-0"
            >
              {/* Category header */}
              <div className="p-6 border-b border-or/20 flex items-center gap-3">
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="font-cinzel text-or text-lg font-semibold tracking-widest">
                  {cat.title}
                </h3>
              </div>

              {/* Items */}
              <div className="p-6 space-y-3">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-center group/item">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="font-poppins text-white/70 text-sm group-hover/item:text-white/90 transition-colors">
                        {item.name}
                      </span>
                      <div className="flex-1 border-b border-dotted border-or/20 mx-2" />
                    </div>
                    <span className="font-cinzel text-or text-sm font-semibold whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom note */}
        <div className="carte-note text-center mt-16">
          <div className="gold-line w-24 mx-auto mb-6" />
          <p className="font-cinzel text-white/40 text-xs tracking-[0.3em] uppercase">
            Coco frais disponible · 200 F
          </p>
        </div>
      </div>
    </section>
  );
}
