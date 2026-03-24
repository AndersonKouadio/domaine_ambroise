import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Domaine from "@/components/Domaine";
import Activites from "@/components/Activites";
import Espaces from "@/components/Espaces";
import HorizontalScroll from "@/components/HorizontalScroll";
import Tarifs from "@/components/Tarifs";
import Carte from "@/components/Carte";
import Galerie from "@/components/Galerie";
import CtaBanner from "@/components/CtaBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Domaine />
        <Activites />
        <Espaces />
        <HorizontalScroll />
        <Tarifs />
        <Carte />
        <Galerie />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
