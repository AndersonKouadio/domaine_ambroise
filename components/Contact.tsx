"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { gsap, useGSAP } from "@/lib/gsap";

const WHATSAPP_NUMBER = "2250554020623";

const espaceOptions = [
  "Espace Terrain",
  "Espace Cocotier",
  "Espace Bungalow",
  "L'Île & Détente",
  "Privatisation complète",
  "Autre / Devis",
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    email: "",
    espace: "",
    date: "",
    personnes: "",
    message: "",
  });

  useGSAP(() => {
    // Header
    gsap.from(".contact-header > *", {
      opacity: 0, y: 40, stagger: 0.15, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ".contact-header", start: "top 82%" },
    });

    // Left info panel slides from left
    gsap.from(".contact-info", {
      opacity: 0, x: -60, duration: 1.1, ease: "power3.out",
      scrollTrigger: { trigger: ".contact-info", start: "top 80%" },
    });

    // Form slides from right
    gsap.from(".contact-form", {
      opacity: 0, x: 60, duration: 1.1, ease: "power3.out",
      scrollTrigger: { trigger: ".contact-form", start: "top 80%" },
    });

    // Info cards stagger
    gsap.from(".contact-card", {
      opacity: 0, y: 30, stagger: 0.15, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ".contact-card", start: "top 82%" },
    });

    // Form fields stagger
    gsap.from(".contact-field", {
      opacity: 0, y: 20, stagger: 0.07, duration: 0.6, ease: "power3.out",
      scrollTrigger: { trigger: ".contact-field", start: "top 82%" },
    });
  }, { scope: sectionRef });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "*Nouvelle demande – Domaine Ambroise*",
      "",
      `*Nom :* ${form.nom}`,
      `*Telephone :* ${form.telephone}`,
      form.email ? `*Email :* ${form.email}` : null,
      `*Espace :* ${form.espace}`,
      form.date ? `*Date :* ${form.date}` : null,
      form.personnes ? `*Personnes :* ${form.personnes}` : null,
      form.message ? `\n*Message :*\n${form.message}` : null,
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`, "_blank");
  };

  const isFormValid = form.nom && form.telephone && form.espace;

  return (
    <section ref={sectionRef} id="contact" className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="contact-header text-center mb-20">
          <p className="font-cinzel text-or text-xs tracking-[0.4em] uppercase mb-4">Réservation</p>
          <h2 className="font-cinzel text-4xl md:text-5xl text-vert font-semibold mb-6">
            Planifiez votre séjour
          </h2>
          <div className="gold-line w-32 mx-auto mb-6" />
          <p className="font-poppins text-black/60 max-w-md mx-auto">
            Remplissez le formulaire et nous vous répondrons directement sur WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: Contact info */}
          <div className="contact-info lg:col-span-2 flex flex-col gap-8">
            {/* Photo */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/images/fleuve/9-IMG_5858.jpg"
                alt="Domaine Ambroise - Contact"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vert/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-cinzel text-or text-sm">Domaine Ambroise</p>
                <p className="font-poppins text-white/80 text-xs mt-1">Fleuve Bandama, Tiassalé</p>
              </div>
            </div>

            {/* Info cards */}
            <div className="space-y-4">
              <div className="contact-card bg-white p-5 border-l-2 border-or">
                <p className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase mb-2">Localisation</p>
                <p className="font-poppins text-black/70 text-sm leading-relaxed">
                  Tiassalé, Côte d&apos;Ivoire<br />
                  117 km d&apos;Abidjan<br />
                  Bord du fleuve Bandama
                </p>
              </div>

              <div className="contact-card bg-white p-5 border-l-2 border-or">
                <p className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase mb-2">Téléphone</p>
                <a href="tel:+2250555966100" className="font-poppins text-black/70 text-sm block hover:text-or transition-colors">
                  05 55 96 61 00
                </a>
                <a href="tel:+2250505002228" className="font-poppins text-black/70 text-sm block hover:text-or transition-colors">
                  05 05 00 22 28
                </a>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card flex items-center gap-3 bg-[#25D366] text-white p-5 hover:bg-[#1fb959] transition-colors duration-300 group"
              >
                <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <p className="font-cinzel text-sm font-semibold tracking-wider">WhatsApp</p>
                  <p className="text-xs text-white/80">Réponse rapide garantie</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="contact-field md:col-span-2">
                  <label className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase block mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom et prénom"
                    className="w-full border border-vert/20 bg-cream px-4 py-3 font-poppins text-sm text-black focus:outline-none focus:border-or transition-colors"
                  />
                </div>

                <div className="contact-field">
                  <label className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase block mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    required
                    placeholder="+225 00 00 00 00 00"
                    className="w-full border border-vert/20 bg-cream px-4 py-3 font-poppins text-sm text-black focus:outline-none focus:border-or transition-colors"
                  />
                </div>

                <div className="contact-field">
                  <label className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="w-full border border-vert/20 bg-cream px-4 py-3 font-poppins text-sm text-black focus:outline-none focus:border-or transition-colors"
                  />
                </div>

                <div className="contact-field">
                  <label className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase block mb-2">
                    Espace souhaité *
                  </label>
                  <select
                    name="espace"
                    value={form.espace}
                    onChange={handleChange}
                    required
                    className="w-full border border-vert/20 bg-cream px-4 py-3 font-poppins text-sm text-black focus:outline-none focus:border-or transition-colors"
                  >
                    <option value="">Sélectionner un espace</option>
                    {espaceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="contact-field">
                  <label className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase block mb-2">
                    Date envisagée
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border border-vert/20 bg-cream px-4 py-3 font-poppins text-sm text-black focus:outline-none focus:border-or transition-colors"
                  />
                </div>

                <div className="contact-field">
                  <label className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase block mb-2">
                    Nombre de personnes
                  </label>
                  <input
                    type="number"
                    name="personnes"
                    value={form.personnes}
                    onChange={handleChange}
                    min="1"
                    placeholder="Ex: 25"
                    className="w-full border border-vert/20 bg-cream px-4 py-3 font-poppins text-sm text-black focus:outline-none focus:border-or transition-colors"
                  />
                </div>

                <div className="contact-field md:col-span-2">
                  <label className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase block mb-2">
                    Message / Détails
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Décrivez votre événement, vos besoins particuliers..."
                    className="w-full border border-vert/20 bg-cream px-4 py-3 font-poppins text-sm text-black focus:outline-none focus:border-or transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Button
                  type="submit"
                  isDisabled={!isFormValid}
                  className={`flex items-center gap-3 font-cinzel text-xs font-bold tracking-[0.2em] uppercase px-10 py-4 h-auto min-h-0 rounded-none transition-all duration-300 ${
                    isFormValid
                      ? "bg-or text-vert hover:bg-or-light hover:scale-105"
                      : "bg-or/40 text-vert/50 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Envoyer via WhatsApp
                </Button>
                <p className="font-poppins text-black/40 text-xs">* Champs obligatoires</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
