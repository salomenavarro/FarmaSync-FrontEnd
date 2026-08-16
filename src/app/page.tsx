import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import Propuesta from "@/components/sections/Propuesta";
import Beneficios from "@/components/sections/Beneficios";
import ComoFunciona from "@/components/sections/ComoFunciona";
import PruebaSocial from "@/components/sections/PruebaSocial";
import Faq from "@/components/sections/Faq";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4FBFA] text-[#374151]">
      <Navbar />

      <Hero />

      <Propuesta />

      <Beneficios />

      <ComoFunciona />

      <PruebaSocial />

      <Faq />

      <Footer />
    </main>
  );
}