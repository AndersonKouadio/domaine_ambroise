import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-vert-deep text-white/70">
      <div className="gold-line" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            {/* Logo horizontal fond sombre */}
            <div className="relative w-44 h-12">
              <Image
                src="/logo_fond_noir.png"
                alt="Domaine Ambroise"
                fill
                sizes="176px"
                className="object-contain object-left md:object-left object-center"
              />
            </div>
            <p className="text-xs text-white/50 tracking-widest">
              Nature · Convivialité · Évasion
            </p>
            <p className="text-sm text-white/60 leading-relaxed text-center md:text-left max-w-xs">
              Un lieu où chaque instant devient un moment d&apos;exception.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <h3 className="font-cinzel text-or text-xs tracking-[0.2em] uppercase mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                ["Le Domaine", "#domaine"],
                ["Nos Espaces", "#espaces"],
                ["Galerie", "#galerie"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-white/60 hover:text-or transition-colors duration-300 tracking-wider"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h3 className="font-cinzel text-or text-xs tracking-[0.2em] uppercase mb-6">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-white/60">
              <p>Tiassalé, Côte d&apos;Ivoire</p>
              <p>117 km d&apos;Abidjan – Fleuve Bandama</p>
              <div className="gold-line my-4" />
              <a
                href="tel:+2250715552695"
                className="block hover:text-or transition-colors"
              >
                +225 07 15 55 26 95 / +33 6 03 26 32 85
              </a>
              <div className="pt-2">
                <a
                  href="https://wa.me/2250715552695"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-or hover:text-or-light transition-colors font-medium"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="gold-line mt-12 mb-6" />
        <p className="text-center text-xs text-white/30 tracking-widest">
          © {year} Domaine Ambroise. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
