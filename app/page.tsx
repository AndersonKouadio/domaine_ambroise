import Script from "next/script";
import PageAnimations from "@/components/PageAnimations";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Domaine from "@/components/Domaine";
import Activites from "@/components/Activites";
import Espaces from "@/components/Espaces";
import HorizontalScroll from "@/components/HorizontalScroll";
import Galerie from "@/components/Galerie";
import CtaBanner from "@/components/CtaBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Script id="domaine-loading" strategy="beforeInteractive">
        {`document.documentElement.classList.add('domaine-loading')`}
      </Script>
      <PageAnimations />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Domaine />
        <Activites />
        <Espaces />
        <HorizontalScroll />
        <Galerie />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
