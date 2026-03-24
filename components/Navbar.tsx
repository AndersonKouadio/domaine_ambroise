"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";

const btnGhost = "bg-transparent border-none shadow-none rounded-none p-0 h-auto min-h-0";

const navLinks = [
  { label: "Le Domaine", href: "#domaine" },
  { label: "Nos Espaces", href: "#espaces" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "La Carte", href: "#carte" },
  { label: "Galerie", href: "#galerie" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-vert/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Button
            onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`${btnGhost} flex items-center gap-3 group shrink-0`}
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/logo.png"
                alt="Domaine Ambroise"
                fill
                sizes="48px"
                className="object-contain"
                loading="eager"
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-cinzel text-or text-xs md:text-sm font-semibold tracking-[0.2em] leading-none">
                DOMAINE
              </p>
              <p className="font-cinzel text-or text-[10px] md:text-xs tracking-[0.35em] leading-none mt-0.5">
                AMBROISE
              </p>
            </div>
          </Button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                onPress={() => handleNavClick(link.href)}
                className={`${btnGhost} font-poppins text-white/90 text-xs tracking-[0.15em] uppercase hover:text-or transition-colors duration-300`}
              >
                {link.label}
              </Button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button
              onPress={() => handleNavClick("#contact")}
              className="font-cinzel bg-or! text-vert! text-xs font-semibold tracking-[0.15em] uppercase px-6 py-2.5 rounded-none hover:bg-or-light! transition-colors duration-300 h-auto min-h-0"
            >
              Réserver
            </Button>
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-vert flex flex-col transition-all duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 md:gap-10">
          {navLinks.map((link, i) => (
            <Button
              key={link.href}
              onPress={() => handleNavClick(link.href)}
              className={`${btnGhost} font-cinzel text-white text-xl md:text-2xl tracking-[0.2em] uppercase hover:text-or transition-colors duration-300 animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.08}s` }}
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
