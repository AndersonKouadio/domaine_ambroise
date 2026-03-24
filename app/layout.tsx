import type { Metadata } from "next";
import { Cinzel, Poppins } from "next/font/google";
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
  openGraph: {
    title: "Domaine Ambroise",
    description:
      "Un espace de détente et d'événements au bord du fleuve Bandama, Tiassalé, Côte d'Ivoire.",
    type: "website",
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
    >
      <body className="min-h-screen antialiased">
        <PageAnimations />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
