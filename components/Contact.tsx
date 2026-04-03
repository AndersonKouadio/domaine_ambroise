"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { MapPin, Phone, Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FieldGroup,
  Field,
  FieldLabel,
} from "@/components/ui/field";

// Réservations → compte WhatsApp Charles (priorité)
const WHATSAPP_NUMBER = "33603263285";

const espaceOptions = [
  "Espace Parking",
  "Espace Cocotier",
  "Espace Bungalow",
  "L'Île & Détente",
  "Privatisation complète",
  "Autre / Devis",
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [espace, setEspace] = useState("");
  const [date, setDate] = useState("");
  const [personnes, setPersonnes] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useGSAP(() => {
    gsap.from(".contact-header > :not(.h2-mask-wrapper)", {
      opacity: 0, y: 40, stagger: 0.15, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ".contact-header", start: "top 82%", once: true },
    });
    gsap.from(".contact-header .section-h2-mask", {
      yPercent: 105, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: ".contact-header", start: "top 82%", once: true },
    });
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.from(".contact-info", {
        opacity: 0, y: 60, scale: 0.98, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-info", start: "top 80%", once: true },
      });
      gsap.from(".contact-form", {
        opacity: 0, y: 60, scale: 0.98, duration: 1.1, ease: "power3.out", delay: 0.15,
        scrollTrigger: { trigger: ".contact-form", start: "top 80%", once: true },
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(".contact-info", {
        opacity: 0, y: 35, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-info", start: "top 85%", once: true },
      });
      gsap.from(".contact-form", {
        opacity: 0, y: 35, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-form", start: "top 85%", once: true },
      });
    });

    gsap.from(".contact-card", {
      opacity: 0, y: 30, stagger: 0.15, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ".contact-card", start: "top 82%", once: true },
    });
    gsap.from(".contact-field", {
      opacity: 0, y: 20, stagger: 0.07, duration: 0.6, ease: "power3.out",
      scrollTrigger: { trigger: ".contact-field", start: "top 82%", once: true },
    });

    // Parallax on contact photo (desktop only)
    const mmParallax = gsap.matchMedia();
    mmParallax.add("(min-width: 768px)", () => {
      gsap.to(".contact-hero-img", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }, { scope: sectionRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Send email via API
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, telephone, email, espace, date, personnes: personnes ? Number(personnes) : undefined, message }),
      });
    } catch {
      // Email failure is non-blocking — WhatsApp will still open
    }

    // Build WhatsApp message
    const lines = [
      "*Nouvelle demande – Domaine Ambroise*",
      "",
      `*Nom :* ${nom}`,
      `*Telephone :* ${telephone}`,
      email ? `*Email :* ${email}` : null,
      espace ? `*Espace :* ${espace}` : null,
      date ? `*Date :* ${date}` : null,
      personnes ? `*Personnes :* ${personnes}` : null,
      message ? `\n*Message :*\n${message}` : null,
    ].filter(Boolean).join("\n");

    setSending(false);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`, "_blank");
  };

  const isFormValid = !!nom && !!telephone && !!espace;

  return (
    <section ref={sectionRef} id="contact" className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="contact-header text-center mb-20">
          <p className="font-cinzel text-or text-xs md:text-base tracking-[0.4em] uppercase mb-4">Réservation</p>
          <div className="overflow-hidden h2-mask-wrapper">
            <h2 className="font-cinzel text-4xl md:text-5xl text-vert font-semibold mb-6 section-h2-mask">
              Planifiez votre séjour
            </h2>
          </div>
          <div className="gold-line w-32 mx-auto mb-6" />
          <p className="font-poppins text-black/60 max-w-md mx-auto">
            Remplissez le formulaire et nous vous répondrons directement sur WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Form first on mobile, second on desktop */}
          <div className="contact-form lg:col-span-3 order-1 lg:order-2" id="contact-form">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 shadow-sm">
              <FieldGroup className="gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">

                  {/* Nom — full width */}
                  <Field className="contact-field md:col-span-2">
                    <FieldLabel className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase" htmlFor="contact-nom">
                      Nom complet *
                    </FieldLabel>
                    <Input
                      id="contact-nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Votre nom et prénom"
                      required
                      className="h-12 rounded-none border-vert/20 bg-cream px-4 font-poppins text-sm text-black focus-visible:border-or focus-visible:ring-or/30"
                    />
                  </Field>

                  {/* Téléphone */}
                  <Field className="contact-field">
                    <FieldLabel className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase" htmlFor="contact-tel">
                      Téléphone *
                    </FieldLabel>
                    <Input
                      id="contact-tel"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder="+225 00 00 00 00 00"
                      inputMode="tel"
                      required
                      className="h-12 rounded-none border-vert/20 bg-cream px-4 font-poppins text-sm text-black focus-visible:border-or focus-visible:ring-or/30"
                    />
                  </Field>

                  {/* Email */}
                  <Field className="contact-field">
                    <FieldLabel className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase" htmlFor="contact-email">
                      Email
                    </FieldLabel>
                    <Input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="h-12 rounded-none border-vert/20 bg-cream px-4 font-poppins text-sm text-black focus-visible:border-or focus-visible:ring-or/30"
                    />
                  </Field>

                  {/* Espace — Select shadcn */}
                  <Field className="contact-field">
                    <Label className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase">
                      Espace souhaité *
                    </Label>
                    <Select value={espace} onValueChange={(v) => setEspace(v ?? "")} required>
                      <SelectTrigger className="h-12 w-full rounded-none border-vert/20 bg-cream px-4 font-poppins text-sm text-black focus-visible:border-or focus-visible:ring-or/30 data-placeholder:text-black/40">
                        <SelectValue placeholder="Sélectionner un espace" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none border-vert/20 bg-white shadow-lg">
                        <SelectGroup>
                          {espaceOptions.map((opt) => (
                            <SelectItem
                              key={opt}
                              value={opt}
                              className="font-poppins text-sm text-black/70 cursor-pointer hover:bg-or/10 hover:text-vert focus:bg-or/10 focus:text-vert"
                            >
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>

                  {/* Date */}
                  <Field className="contact-field">
                    <FieldLabel className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase" htmlFor="contact-date">
                      Date envisagée
                    </FieldLabel>
                    <Input
                      id="contact-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="h-12 w-full rounded-none border-vert/20 bg-cream px-4 font-poppins text-sm text-black focus-visible:border-or focus-visible:ring-or/30"
                    />
                  </Field>

                  {/* Nombre de personnes */}
                  <Field className="contact-field">
                    <FieldLabel className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase" htmlFor="contact-personnes">
                      Nombre de personnes
                    </FieldLabel>
                    <Input
                      id="contact-personnes"
                      type="number"
                      min={1}
                      value={personnes}
                      onChange={(e) => setPersonnes(e.target.value)}
                      placeholder="Ex: 25"
                      className="h-12 rounded-none border-vert/20 bg-cream px-4 font-poppins text-sm text-black focus-visible:border-or focus-visible:ring-or/30"
                    />
                  </Field>

                  {/* Message */}
                  <Field className="contact-field md:col-span-2">
                    <FieldLabel className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase" htmlFor="contact-message">
                      Message / Détails
                    </FieldLabel>
                    <Textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Décrivez votre événement, vos besoins particuliers..."
                      className="rounded-none border-vert/20 bg-cream px-4 py-3 font-poppins text-sm text-black resize-none focus-visible:border-or focus-visible:ring-or/30"
                    />
                  </Field>
                </div>
              </FieldGroup>

              {/* Submit */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Button
                  type="submit"
                  disabled={!isFormValid || sending}
                  className={`flex items-center gap-3 font-cinzel text-xs font-bold tracking-[0.2em] uppercase px-10 py-4 h-auto min-h-0 rounded-none transition-all duration-300 ${
                    isFormValid
                      ? "bg-or! text-vert! hover:bg-or-light! hover:scale-105 cursor-pointer"
                      : "bg-or/40! text-vert/50! cursor-not-allowed"
                  }`}
                >
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {sending ? "Envoi en cours..." : "Envoyer via WhatsApp"}
                </Button>
                <p className="font-poppins text-black/40 text-xs">* Champs obligatoires</p>
              </div>
            </form>
          </div>

          {/* Contact info + Maps — second on mobile, first on desktop */}
          <div className="contact-info lg:col-span-2 flex flex-col gap-8 order-2 lg:order-1">
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 scale-110">
                <Image
                  src="/images/fleuve/9-IMG_5858.jpg"
                  alt="Domaine Ambroise - Contact"
                  fill
                  className="object-cover contact-hero-img"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-vert/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-cinzel text-or text-sm">Domaine Ambroise</p>
                <p className="font-poppins text-white/80 text-xs mt-1">Fleuve Bandama, Tiassalé</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="contact-card bg-white p-5 border-l-2 border-or">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="size-4 text-or" />
                  <p className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase">Localisation</p>
                </div>
                <p className="font-poppins text-black/70 text-sm leading-relaxed">
                  Tiassalé, Côte d&apos;Ivoire<br />
                  117 km d&apos;Abidjan<br />
                  Bord du fleuve Bandama
                </p>
              </div>

              <div className="contact-card bg-white p-5 border-l-2 border-or">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="size-4 text-or" />
                  <p className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase">Téléphone</p>
                </div>
                <a href="tel:+2250715552695" className="font-poppins text-black/70 text-sm block hover:text-or transition-colors">
                  +225 07 15 55 26 95 / +33 6 03 26 32 85
                </a>
              </div>

              <div className="contact-card bg-white p-5 border-l-2 border-or">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="size-4 text-or" />
                  <p className="font-cinzel text-vert text-xs tracking-[0.2em] uppercase">Email</p>
                </div>
                <a href="mailto:contact@domaineambroise.com" className="font-poppins text-black/70 text-sm block hover:text-or transition-colors">
                  contact@domaineambroise.com
                </a>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card flex items-center gap-3 bg-[#25D366] text-white p-5 hover:bg-[#1fb959] transition-colors duration-300 group"
              >
                <svg className="size-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <p className="font-cinzel text-sm font-semibold tracking-wider">WhatsApp</p>
                  <p className="text-xs text-white/80">Réponse rapide garantie</p>
                </div>
              </a>
            </div>

            {/* Google Maps */}
            <div className="contact-card overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.754235150112!2d-4.820158999999999!3d5.8901129999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc091974a738d25%3A0x7822e4284721546!2sDomaine%20Ambroise!5e0!3m2!1sfr!2sci!4v1774892299440!5m2!1sfr!2sci"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Domaine Ambroise - Google Maps"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
