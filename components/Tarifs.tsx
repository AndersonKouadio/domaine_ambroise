"use client";

import { useState } from "react";

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

const tabs = ["Visites & Espaces", "Privatisation", "L'Île", "Prestations"];

function PricingTable({ rows }: { rows: PricingRow[] }) {
  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex justify-between items-center py-3 border-b border-or/10 group/row hover:bg-or/5 px-3 transition-colors"
        >
          <span className="font-poppins text-sm text-[#1a1a1a]/70 group-hover/row:text-vert transition-colors">
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

export default function Tarifs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="tarifs" className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-cinzel text-or text-xs tracking-[0.4em] uppercase mb-4">
            Nos tarifs
          </p>
          <h2 className="font-cinzel text-4xl md:text-5xl text-vert font-semibold mb-6">
            Visites & Prestations
          </h2>
          <div className="gold-line w-32 mx-auto mb-6" />
          <p className="font-poppins text-[#1a1a1a]/60 max-w-lg mx-auto">
            Des tarifs transparents pour planifier votre séjour ou événement en toute sérénité.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`font-cinzel text-xs tracking-[0.15em] uppercase px-6 py-3 transition-all duration-300 ${
                activeTab === i
                  ? "bg-vert text-or shadow-lg"
                  : "bg-white text-vert border border-vert/20 hover:border-or"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="min-h-[400px]">
          {/* Visites & Espaces */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visitesData.map((espace) => (
                <div key={espace.title} className="bg-white shadow-sm border border-or/10">
                  <div className="bg-vert p-6 flex items-center gap-3">
                    <span className="text-2xl">{espace.icon}</span>
                    <h3 className="font-cinzel text-or text-sm tracking-[0.1em] font-semibold">
                      {espace.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <PricingTable rows={espace.rows} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Privatisation */}
          {activeTab === 1 && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white shadow-sm border border-or/10">
                <div className="bg-vert p-6">
                  <h3 className="font-cinzel text-or text-sm tracking-[0.1em] font-semibold">
                    Privatisation d&apos;espaces (+50 personnes)
                  </h3>
                  <p className="font-poppins text-white/60 text-xs mt-2">
                    Au-delà de 50 personnes, le tarif complet de location de l&apos;espace s&apos;applique.
                  </p>
                </div>
                <div className="p-6">
                  <PricingTable rows={privatisationData} />
                </div>
              </div>
            </div>
          )}

          {/* L'Île */}
          {activeTab === 2 && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white shadow-sm border border-or/10">
                <div className="bg-vert p-6 flex items-center gap-3">
                  <span className="text-2xl">🏝️</span>
                  <div>
                    <h3 className="font-cinzel text-or text-sm tracking-[0.1em] font-semibold">
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
              </div>
            </div>
          )}

          {/* Prestations */}
          {activeTab === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {prestationsData.map((section) => (
                <div key={section.title} className="bg-white shadow-sm border border-or/10">
                  <div className="bg-vert p-6">
                    <h3 className="font-cinzel text-or text-sm tracking-[0.1em] font-semibold">
                      {section.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <PricingTable rows={section.rows} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="font-poppins text-[#1a1a1a]/60 text-sm mb-4">
            Vous avez un projet particulier ?
          </p>
          <a
            href="#contact"
            className="inline-block font-cinzel border-2 border-vert text-vert text-xs font-semibold tracking-[0.2em] uppercase px-10 py-4 hover:bg-vert hover:text-or transition-all duration-300"
          >
            Demander un devis personnalisé
          </a>
        </div>
      </div>
    </section>
  );
}
