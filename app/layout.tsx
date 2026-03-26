import type { Metadata } from "next";
import { Cinzel, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import PageAnimations from "@/components/PageAnimations";
import ScrollProgress from "@/components/ScrollProgress";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Domaine Ambroise – Nature · Convivialité · Évasion · Élégance",
  description:
    "Au bord du fleuve Bandama à Tiassalé, le Domaine Ambroise vous accueille dans un cadre naturel unique pour vos événements, séjours et moments de détente.",
  metadataBase: new URL("https://www.domaineambroise.com"),
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
  openGraph: {
    title: "Domaine Ambroise – Un lieu où chaque instant devient un moment d'exception",
    description:
      "Un espace de détente et d'événements au bord du fleuve Bandama, Tiassalé, Côte d'Ivoire. Nature · Convivialité · Évasion · Élégance.",
    type: "website",
    url: "https://www.domaineambroise.com",
    siteName: "Domaine Ambroise",
    images: [{ url: "/logo_fond_noir.png", width: 400, height: 120, alt: "Domaine Ambroise" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cinzel.variable} ${poppins.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <Script id="domaine-loading" strategy="beforeInteractive">
          {`document.documentElement.classList.add('domaine-loading')`}
        </Script>
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <PageAnimations />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
