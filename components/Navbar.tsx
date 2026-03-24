"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const btnGhost =
  "bg-transparent border-none shadow-none rounded-none p-0 h-auto min-h-0";

const navLinks = [
  { label: "Le Domaine",  href: "#domaine" },
  { label: "Activités",   href: "#activites" },
  { label: "Nos Espaces", href: "#espaces" },
  { label: "Tarifs",      href: "#tarifs" },
  { label: "La Carte",    href: "#carte" },
  { label: "Galerie",     href: "#galerie" },
  { label: "Contact",     href: "#contact" },
];

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastY = 0;
    let hidden = false;

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        const currentY = self.scroll();
        const scrollingDown = currentY > lastY;
        const pastThreshold = currentY > 80;

        if (scrollingDown && pastThreshold && !hidden) {
          gsap.to(header, { yPercent: -100, duration: 0.35, ease: "power2.in" });
          hidden = true;
        } else if (!scrollingDown && hidden) {
          gsap.to(header, { yPercent: 0, duration: 0.45, ease: "power3.out" });
          hidden = false;
        }

        lastY = currentY;
      },
    });
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const linkClass = `${btnGhost} font-poppins text-xs tracking-[0.15em] uppercase text-white/80 hover:text-or transition-colors duration-300`;

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-vert-deep border-b border-or/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Button
            onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`${btnGhost} flex items-center gap-3 shrink-0`}
          >
            {/* Logo horizontal fond sombre (icône + texte intégré) */}
            <div className="relative w-32 h-9 md:w-40 md:h-11">
              <Image
                src="/logo_fond_noir.png"
                alt="Domaine Ambroise"
                fill
                sizes="160px"
                className="object-contain object-left"
                loading="eager"
              />
            </div>
          </Button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                onPress={() => handleNavClick(link.href)}
                className={linkClass}
              >
                {link.label}
              </Button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Button
              onPress={() => handleNavClick("#contact")}
              className="font-cinzel bg-or! text-vert! text-xs font-semibold tracking-[0.15em] uppercase px-6 py-2.5 rounded-none hover:bg-or-light! transition-colors duration-300 h-auto min-h-0"
            >
              Réserver
            </Button>
          </div>

          {/* Mobile hamburger */}
          <Button
            onPress={() => setMenuOpen(!menuOpen)}
            className={`${btnGhost} lg:hidden flex flex-col gap-1.5 p-2`}
            aria-label="Menu"
          >
            <span className={`block h-0.5 w-6 bg-or transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-or transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-or transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </Button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-vert-deep flex flex-col transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <Button
              key={link.href}
              onPress={() => handleNavClick(link.href)}
              className={`${btnGhost} font-cinzel text-white text-xl tracking-[0.2em] uppercase hover:text-or transition-colors duration-300`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {link.label}
            </Button>
          ))}
          <Button
            onPress={() => handleNavClick("#contact")}
            className="mt-4 font-cinzel bg-or! text-vert! text-sm font-bold tracking-[0.2em] uppercase px-10 py-4 rounded-none hover:bg-or-light! transition-colors duration-300 h-auto min-h-0"
          >
            Réserver
          </Button>
        </div>
      </div>
    </>
  );
}
