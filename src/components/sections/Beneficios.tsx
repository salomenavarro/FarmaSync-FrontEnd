"use client";

import {
  Search,
  CalendarCheck,
  Bell,
  Clock,
  Pill,
  ShieldCheck,
} from "lucide-react";

import type { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import DecorativeBackground from "@/components/DecorativeBackground";

interface BenefitItem {
  icon: ReactNode;
  title: string;
  text: string;
}

const benefitsData: BenefitItem[] = [
  {
    icon: <Search className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.2} />,
    title: "Consulta en tiempo real",
    text: "Olvídate de recorrer múltiples farmacias a ciegas. Nuestra plataforma te permite verificar la disponibilidad exacta de tus medicamentos en tiempo real desde cualquier dispositivo.",
  },
  {
    icon: <CalendarCheck className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.2} />,
    title: "Reserva anticipada",
    text: "Con tan solo unos pocos clics, puedes apartar los fármacos que necesitas de manera inmediata.",
  },
  {
    icon: <Bell className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.2} />,
    title: "Notificaciones",
    text: "Mantente siempre informado. Recibe avisos automáticos directamente en tu dispositivo sobre el estado de tus reservas y si un medicamento de alta demanda vuelve a estar disponible.",
  },
  {
    icon: <Clock className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.2} />,
    title: "Menos espera",
    text: "Reduce el tiempo de búsqueda y evita filas innecesarias para obtener tus medicamentos de manera más rápida y eficiente.",
  },
  {
    icon: <Pill className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.2} />,
    title: "Acceso oportuno",
    text: "Mejora la continuidad de tus tratamientos médicos teniendo tus medicamentos disponibles cuando realmente los necesitas.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.2} />,
    title: "Seguridad",
    text: "Protegemos tu información personal y médica mediante un proceso diseñado para ofrecerte confianza y tranquilidad.",
  },
];

// Variantes de animación para la grilla contenedora (más pausada)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Mayor intervalo de tiempo entre cada tarjeta
      delayChildren: 0.1,
    },
  },
};

// Variantes de animación para cada tarjeta individual (duración extendida)
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8, // Animación de entrada más larga
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

function BenefitCard({ icon, title, text }: BenefitItem) {
  return (
    <motion.article
      className="relative flex h-full min-h-[250px] flex-col items-center justify-center rounded-2xl border border-[#DCEEEE] border-t-4 border-t-[#00A8A8] bg-white px-5 pb-6 pt-10 text-center shadow-sm sm:min-h-[270px] sm:px-6 sm:pb-8 sm:pt-12"
      whileHover={{ y: -6, boxShadow: "0 10px 25px -5px rgba(0, 168, 168, 0.15)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="absolute left-1/2 top-0 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#00A8A8] text-white shadow-md sm:h-16 sm:w-16"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {icon}
      </motion.div>

      <h3 className="text-lg font-bold text-[#171717] sm:text-xl">{title}</h3>

      <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#70798B] sm:mt-4 sm:text-base">
        {text}
      </p>
    </motion.article>
  );
}

export default function Beneficios() {
  return (
    <section
      id="beneficios"
      className="relative overflow-hidden bg-[#e8f0ec] px-4 py-12 sm:px-6 sm:py-24 lg:px-8"
    >
      {/* FONDO DECORATIVO */}
      <DecorativeBackground variant="section" />

      {/* CONTENIDO */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* TÍTULO */}
        <motion.div
          className="mb-12 text-center sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-[#171717] sm:text-4xl lg:text-5xl">
            Beneficios de FarmaSync
          </h2>

          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#00A8A8] sm:mt-4 sm:w-16" />

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#6B7280] sm:mt-6 sm:text-lg">
            Facilitamos el acceso a tus medicamentos y servicios de salud de
            manera eficiente y segura.
          </p>
        </motion.div>

        {/* TARJETAS CON ANIMACIÓN ESCALONADA PAUSADA */}
        <motion.div
          className="grid grid-cols-1 gap-10 pt-4 sm:grid-cols-2 sm:gap-8 sm:pt-6 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefitsData.map((benefit, index) => (
            <motion.div key={index} variants={cardVariants} className="h-full">
              <BenefitCard {...benefit} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}