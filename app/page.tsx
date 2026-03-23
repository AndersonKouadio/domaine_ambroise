import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Domaine from "@/components/Domaine";
import Espaces from "@/components/Espaces";
import Tarifs from "@/components/Tarifs";
import Carte from "@/components/Carte";
import Galerie from "@/components/Galerie";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Domaine />
        <Espaces />
        <Tarifs />
        <Carte />
        <Galerie />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
