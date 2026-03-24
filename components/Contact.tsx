"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  Button,
  Form,
  TextField,
  Input,
  TextArea,
  Select,
  ListBox,
  ListBoxItem,
  NumberField,
} from "@heroui/react";
import { Label } from "react-aria-components";
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

const fieldClass =
  "w-full border border-vert/20 bg-cream px-4 py-3 font-poppins text-sm text-black focus:outline-none focus:border-or transition-colors rounded-none";

const labelClass =
  "font-cinzel text-vert text-xs tracking-[0.2em] uppercase block mb-2";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [espace, setEspace] = useState<string>("");
  const [date, setDate] = useState("");
  const [personnes, setPersonnes] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`, "_blank");
  };

  const isFormValid = !!nom && !!telephone && !!espace;

  return (
    <section ref={sectionRef} id="contact" className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="contact-header text-center mb-20">
          <p className="font-cinzel text-or text-xs tracking-[0.4em] uppercase mb-4">Réservation</p>
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

          {/* Left: Contact info */}
          <div className="contact-info lg:col-span-2 flex flex-col gap-8">
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
            <Form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">

                {/* Nom */}
                <TextField
                  value={nom}
                  onChange={setNom}
                  isRequired
                  className="contact-field md:col-span-2 flex flex-col gap-2"
                >
                  <Label className={labelClass}>Nom complet *</Label>
                  <Input placeholder="Votre nom et prénom" className={fieldClass} />
                </TextField>

                {/* Téléphone */}
                <TextField
                  value={telephone}
                  onChange={setTelephone}
                  isRequired
                  inputMode="tel"
                  className="contact-field flex flex-col gap-2"
                >
                  <Label className={labelClass}>Téléphone *</Label>
                  <Input placeholder="+225 00 00 00 00 00" className={fieldClass} />
                </TextField>

                {/* Email */}
                <TextField
                  value={email}
                  onChange={setEmail}
                  type="email"
                  className="contact-field flex flex-col gap-2"
                >
                  <Label className={labelClass}>Email</Label>
                  <Input placeholder="votre@email.com" className={fieldClass} />
                </TextField>

                {/* Espace */}
                <div className="contact-field flex flex-col gap-2">
                  <label className={labelClass}>Espace souhaité *</label>
                  <Select
                    value={espace || null}
                    onChange={(k) => setEspace(String(k))}
                    placeholder="Sélectionner un espace"
                    className="w-full"
                  >
                    <Select.Trigger className={`${fieldClass} flex items-center justify-between`}>
                      <Select.Value className="font-poppins text-sm text-black/70" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="z-50 bg-white border border-vert/20 shadow-lg rounded-none">
                      <ListBox className="py-1 outline-none">
                        {espaceOptions.map((opt) => (
                          <ListBoxItem
                            key={opt}
                            id={opt}
                            className="font-poppins text-sm text-black/70 px-4 py-2.5 cursor-pointer hover:bg-or/10 hover:text-vert outline-none data-focused:bg-or/10 data-focused:text-vert transition-colors"
                          >
                            {opt}
                          </ListBoxItem>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* Date */}
                <TextField
                  value={date}
                  onChange={setDate}
                  type="date"
                  className="contact-field flex flex-col gap-2"
                >
                  <Label className={labelClass}>Date envisagée</Label>
                  <Input type="date" className={fieldClass} />
                </TextField>

                {/* Nombre de personnes */}
                <NumberField
                  value={personnes}
                  onChange={setPersonnes}
                  minValue={1}
                  className="contact-field flex flex-col gap-2"
                >
                  <Label className={labelClass}>Nombre de personnes</Label>
                  <NumberField.Group className="flex border border-vert/20 bg-cream">
                    <NumberField.DecrementButton className="px-3 py-3 text-vert hover:bg-or/10 transition-colors border-r border-vert/20 font-semibold">
                      −
                    </NumberField.DecrementButton>
                    <NumberField.Input
                      placeholder="Ex: 25"
                      className="flex-1 bg-transparent px-3 py-3 font-poppins text-sm text-black focus:outline-none text-center"
                    />
                    <NumberField.IncrementButton className="px-3 py-3 text-vert hover:bg-or/10 transition-colors border-l border-vert/20 font-semibold">
                      +
                    </NumberField.IncrementButton>
                  </NumberField.Group>
                </NumberField>

                {/* Message */}
                <TextField
                  value={message}
                  onChange={setMessage}
                  className="contact-field md:col-span-2 flex flex-col gap-2"
                >
                  <Label className={labelClass}>Message / Détails</Label>
                  <TextArea
                    rows={4}
                    placeholder="Décrivez votre événement, vos besoins particuliers..."
                    className={`${fieldClass} resize-none`}
                  />
                </TextField>
              </div>

              {/* Submit */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Button
                  type="submit"
                  isDisabled={!isFormValid}
                  className={`flex items-center gap-3 font-cinzel text-xs font-bold tracking-[0.2em] uppercase px-10 py-4 h-auto min-h-0 rounded-none transition-all duration-300 ${
                    isFormValid
                      ? "bg-or! text-vert! hover:bg-or-light! hover:scale-105"
                      : "bg-or/40! text-vert/50! cursor-not-allowed"
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Envoyer via WhatsApp
                </Button>
                <p className="font-poppins text-black/40 text-xs">* Champs obligatoires</p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
