"use client";

import { useRef } from "react";
import { Tabs, Card, Button } from "@heroui/react";
import { gsap, useGSAP } from "@/lib/gsap";

type PricingRow = { label: string; price: string };

const visitesData: { title: string; icon: string; rows: PricingRow[] }[] = [
  {
    title: "Espace Terrain",
    icon: "☀️",
    rows: [
      { label: "1 à 10 pers. (2 tréteaux)", price: "10 000 F" },
      { label: "1 à 20 pers. (3 tréteaux)", price: "20 000 F" },
      { label: "1 à 30 pers. (4 tréteaux)", price: "30 000 F" },
      { label: "1 à 40 pers. (4 tréteaux)", price: "40 000 F" },
      { label: "1 à 50 pers. (5 tréteaux)", price: "50 000 F" },
    ],
  },
  {
    title: "Espace Cocotier",
    icon: "🌴",
    rows: [
      { label: "1 à 10 pers. (2 tréteaux)", price: "15 000 F" },
      { label: "1 à 20 pers. (3 tréteaux)", price: "30 000 F" },
      { label: "1 à 30 pers. (4 tréteaux)", price: "45 000 F" },
      { label: "1 à 40 pers. (4 tréteaux)", price: "60 000 F" },
      { label: "1 à 50 pers. (5 tréteaux)", price: "75 000 F" },
    ],
  },
  {
    title: "Espace Bungalow",
    icon: "🏡",
    rows: [
      { label: "1 à 10 pers. (2 tréteaux)", price: "15 000 F" },
      { label: "1 à 20 pers. (3 tréteaux)", price: "30 000 F" },
      { label: "1 à 30 pers. (4 tréteaux)", price: "45 000 F" },
      { label: "1 à 40 pers. (4 tréteaux)", price: "60 000 F" },
      { label: "1 à 50 pers. (5 tréteaux)", price: "75 000 F" },
    ],
  },
];

const privatisationData: PricingRow[] = [
  { label: "Domaine Entier (Accès total)", price: "400 000 F" },
  { label: "Espace Cocotier (Piste & bordure)", price: "200 000 F" },
  { label: "Espace Bungalow (Piste & bordure)", price: "130 000 F" },
  { label: "Espace Terrain", price: "100 000 F" },
];

const ileData: PricingRow[] = [
  { label: "Salon 6 places (traversée incluse)", price: "5 000 F" },
  { label: "Salon 4 places (traversée incluse)", price: "4 000 F" },
  { label: "Salon 2 places (traversée incluse)", price: "2 000 F" },
  { label: "Visite simple (traversée seule)", price: "2 000 F" },
  { label: "Location hamac", price: "500 F" },
];

const prestationsData: { title: string; rows: PricingRow[] }[] = [
  {
    title: "Prestations audiovisuelles",
    rows: [
      { label: "Tournage de clip", price: "100 000 F" },
      { label: "Forfait sonorisation (journée)", price: "50 000 F" },
      { label: "Frais sono externe (électricité)", price: "5 000 F" },
      { label: "Prise de vue", price: "2 000 F" },
    ],
  },
  {
    title: "Matériel & Extras",
    rows: [
      { label: "Location tréteaux", price: "1 500 F" },
      { label: "Coco frais", price: "200 F" },
      { label: "Location chaise", price: "75 F" },
      { label: "Visite site touristique", price: "Sur devis" },
    ],
  },
];

function PricingTable({ rows }: { rows: PricingRow[] }) {
  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex justify-between items-center py-3 border-b border-or/10 group/row hover:bg-or/5 px-3 transition-colors"
        >
          <span className="font-poppins text-sm text-black/70 group-hover/row:text-vert transition-colors">
            {row.label}
          </span>
          <span className="font-cinzel text-or text-sm font-semibold whitespace-nowrap ml-4">
            {row.price}
          </span>
        </div>
      ))}
    </div>
  );
}

const tabClass =
  "font-cinzel text-xs min-w-fit tracking-[0.15em] uppercase px-6 py-3 transition-all duration-300 outline-none cursor-pointer " +
  "bg-white text-vert border border-vert/20 hover:border-or " +
  "data-[selected]:bg-vert data-[selected]:text-or data-[selected]:border-transparent data-[selected]:shadow-lg";

export default function Tarifs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".tarifs-header > *", {
      opacity: 0, y: 40, stagger: 0.15, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ".tarifs-header", start: "top 82%" },
    });
    gsap.from(".tarifs-tabs", {
      opacity: 0, y: 50, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ".tarifs-tabs", start: "top 80%" },
    });
    gsap.from(".tarifs-cta", {
      opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ".tarifs-cta", start: "top 88%" },
    });
  }, { scope: sectionRef });

  const animateCards = () => {
    requestAnimationFrame(() => {
      gsap.fromTo(
        ".tarifs-card",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.45, ease: "power3.out" }
      );
    });
  };

  return (
    <section ref={sectionRef} id="tarifs" className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="tarifs-header text-center mb-16">
          <p className="font-cinzel text-or text-xs tracking-[0.4em] uppercase mb-4">Nos tarifs</p>
          <h2 className="font-cinzel text-4xl md:text-5xl text-vert font-semibold mb-6">
            Visites & Prestations
          </h2>
          <div className="gold-line w-32 mx-auto mb-6" />
          <p className="font-poppins text-black/60 max-w-lg mx-auto">
            Des tarifs transparents pour planifier votre séjour ou événement en toute sérénité.
          </p>
        </div>

        {/* Tabs */}
        <div className="tarifs-tabs">
          <Tabs
            defaultSelectedKey="visites"
            onSelectionChange={animateCards}
            className="w-full max-w-md"
          >
            {/* Tab list */}
            <Tabs.ListContainer>
              <Tabs.List
                aria-label="Tarifs"
                className="bg-transparent border-none p-0"
              >
                <Tabs.Tab id="visites" className={tabClass}>
                  Visites & Espaces
                </Tabs.Tab>
                <Tabs.Tab id="privatisation" className={tabClass}>
                  Privatisation
                </Tabs.Tab>
                <Tabs.Tab id="ile" className={tabClass}>
                  L&apos;Île
                </Tabs.Tab>
                <Tabs.Tab id="prestations" className={tabClass}>
                  Prestations
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>

            {/* Visites & Espaces */}
            <Tabs.Panel id="visites" className="min-h-100 outline-none">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {visitesData.map((espace) => (
                  <Card
                    key={espace.title}
                    className="tarifs-card bg-white shadow-sm border border-or/10 rounded-none p-0 gap-0"
                  >
                    <div className="bg-vert p-6 flex items-center gap-3">
                      <span className="text-2xl">{espace.icon}</span>
                      <h3 className="font-cinzel text-or text-sm tracking-widest font-semibold">
                        {espace.title}
                      </h3>
                    </div>
                    <div className="p-6">
                      <PricingTable rows={espace.rows} />
                    </div>
                  </Card>
                ))}
              </div>
            </Tabs.Panel>

            {/* Privatisation */}
            <Tabs.Panel id="privatisation" className="min-h-100 outline-none">
              <div className="max-w-2xl mx-auto">
                <Card className="tarifs-card bg-white shadow-sm border border-or/10 rounded-none p-0 gap-0">
                  <div className="bg-vert p-6">
                    <h3 className="font-cinzel text-or text-sm tracking-widest font-semibold">
                      Privatisation d&apos;espaces (+50 personnes)
                    </h3>
                    <p className="font-poppins text-white/60 text-xs mt-2">
                      Au-delà de 50 personnes, le tarif complet de location de l&apos;espace s&apos;applique.
                    </p>
                  </div>
                  <div className="p-6">
                    <PricingTable rows={privatisationData} />
                  </div>
                </Card>
              </div>
            </Tabs.Panel>

            {/* L'Île */}
            <Tabs.Panel id="ile" className="min-h-100 outline-none">
              <div className="max-w-2xl mx-auto">
                <Card className="tarifs-card bg-white shadow-sm border border-or/10 rounded-none p-0 gap-0">
                  <div className="bg-vert p-6 flex items-center gap-3">
                    <span className="text-2xl">🏝️</span>
                    <div>
                      <h3 className="font-cinzel text-or text-sm tracking-widest font-semibold">
                        L&apos;Île & Détente
                      </h3>
                      <p className="font-poppins text-white/60 text-xs mt-1">
                        Traversée incluse dans les forfaits salon
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <PricingTable rows={ileData} />
                  </div>
                </Card>
              </div>
            </Tabs.Panel>

            {/* Prestations */}
            <Tabs.Panel id="prestations" className="min-h-100 outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {prestationsData.map((section) => (
                  <Card
                    key={section.title}
                    className="tarifs-card bg-white shadow-sm border border-or/10 rounded-none p-0 gap-0"
                  >
                    <div className="bg-vert p-6">
                      <h3 className="font-cinzel text-or text-sm tracking-widest font-semibold">
                        {section.title}
                      </h3>
                    </div>
                    <div className="p-6">
                      <PricingTable rows={section.rows} />
                    </div>
                  </Card>
                ))}
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>

        {/* CTA */}
        <div className="tarifs-cta text-center mt-16">
          <p className="font-poppins text-black/60 text-sm mb-4">
            Vous avez un projet particulier ?
          </p>
          <Button
            onPress={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="font-cinzel border-2 border-vert text-vert bg-transparent text-xs font-semibold tracking-[0.2em] uppercase px-10 py-4 h-auto min-h-0 rounded-none hover:bg-vert hover:text-or transition-all duration-300"
          >
            Demander un devis personnalisé
          </Button>
        </div>
      </div>
    </section>
  );
}
