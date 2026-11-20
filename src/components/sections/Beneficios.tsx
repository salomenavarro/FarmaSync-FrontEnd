
"use client";

import { Inter } from "next/font/google";
import { motion, MotionConfig } from "framer-motion";
import {
  SearchCheck,
  CalendarCheck,
  BellRing,
  Clock3,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* =========================================
   FUENTE DE LOS TÍTULOS
========================================= */

const titleFont = Inter({
  subsets: ["latin"],
  weight: ["800", "900"],
});

/* =========================================
   DATOS
========================================= */

type Benefit = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const BENEFITS: Benefit[] = [
  {
    icon: SearchCheck,
    title: "Consulta en tiempo real",
    text: "Verifica la disponibilidad de tus medicamentos desde cualquier dispositivo, sin desplazamientos innecesarios.",
  },
  {
    icon: CalendarCheck,
    title: "Reserva anticipada",
    text: "Aparta los medicamentos que necesitas de manera rápida y sencilla, con solo unos pocos clics.",
  },
  {
    icon: BellRing,
    title: "Notificaciones",
    text: "Recibe avisos sobre tus reservas y mantente informado sobre la disponibilidad de tus medicamentos.",
  },
  {
    icon: Clock3,
    title: "Menos espera",
    text: "Reduce el tiempo de búsqueda y evita filas innecesarias al momento de reclamar tus medicamentos.",
  },
  {
    icon: HeartPulse,
    title: "Acceso oportuno",
    text: "Favorece la continuidad de tus tratamientos al acceder a tus medicamentos cuando los necesitas.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad",
    text: "Protegemos tu información personal mediante un proceso diseñado para brindarte confianza.",
  },
];

/* =========================================
   ANIMACIÓN COMPARTIDA
========================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* =========================================
   ICONOS DECORATIVOS
========================================= */

function MedicalCross({
  variant = "solid",
  className = "",
}: {
  variant?: "solid" | "outline";
  className?: string;
}) {
  const isSolid = variant === "solid";

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`absolute text-[#3B8EEA] ${className}`}
      fill={isSolid ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={isSolid ? 2 : 1.8}
      strokeLinejoin="round"
    >
      <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" />
    </svg>
  );
}

/* =========================================
   BENEFICIOS
========================================= */

export default function Beneficios() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="beneficios"
        aria-labelledby="beneficios-title"
        className="relative isolate overflow-hidden bg-[#F5FAFF] px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-16 lg:px-12 lg:pb-26 lg:pt-21"
      >
        {/* =====================================================
            FONDO DECORATIVO
        ===================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          {/* Mancha azul superior derecha */}
          <div className="absolute -right-40 -top-40 h-[400px] w-[480px] rounded-full bg-[#DCEBFF]/70 blur-3xl" />

          {/* Mancha turquesa inferior izquierda */}
          <div className="absolute -bottom-32 -left-40 h-[360px] w-[450px] rounded-full bg-[#C7F4F2]/45 blur-3xl" />

          {/* Ondas inferiores */}
          <svg
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-[90px] w-full sm:h-[110px]"
          >
            <path
              d="M0 70C220 20 440 30 700 70C960 110 1200 90 1440 40V160H0Z"
              fill="#BFE0FF"
              fillOpacity="0.45"
            />

            <path
              d="M0 110C260 70 480 90 740 115C1000 140 1220 120 1440 85V160H0Z"
              fill="#7DB7F5"
              fillOpacity="0.3"
            />
          </svg>
        </div>

        {/* =====================================================
            CONTENEDOR PRINCIPAL
        ===================================================== */}

        <div className="mx-auto w-full max-w-[1280px]">

          {/* =================================================
              ENCABEZADO
          ================================================= */}

          <motion.div
            className="relative mx-auto max-w-[760px] text-center"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 1.1,
              ease: EASE,
            }}
          >
            {/* Cruces médicas decorativas */}
            <MedicalCross
              variant="outline"
              className="-left-8 top-2 hidden h-9 w-9 sm:block"
            />

            <MedicalCross
              variant="solid"
              className="-right-8 top-16 hidden h-7 w-7 sm:block"
            />

            {/* Etiqueta superior
            <p className="flex items-center justify-center gap-3 text-[0.8125rem] font-bold uppercase tracking-[0.04em] text-[#0646DC]">
              <span
                aria-hidden="true"
                className="h-6 w-[3px] rounded-full bg-gradient-to-b from-[#0646DC] to-[#2D9BF0]"
              />
              Pensado para tu bienestar
            </p> */}

            {/* Título principal */}
            <h2
              id="beneficios-title"
              className={`${titleFont.className} mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-[900] leading-[1.12] tracking-[-0.02em] text-[#14285B]`}
            >
              Beneficios de{" "}
              <span className="inline-block rounded-[12px] bg-gradient-to-r from-[#0646DC] via-[#0869EF] to-[#2D9BF0] px-3 pb-1 pt-0.5 text-white shadow-[0_8px_22px_rgba(0,90,220,0.18)]">
                FarmaSync
              </span>
            </h2>

            {/* Descripción */}
            <p className="mx-auto mt-4 max-w-[650px] text-[0.9375rem] leading-[1.65] text-[#4A5B78] sm:text-base">
              Facilitamos el acceso a tus medicamentos y servicios de salud
              de manera eficiente y segura, ayudándote a ahorrar tiempo,
              evitar desplazamientos y cuidar tu bienestar.
            </p>

            {/* Detalle decorativo */}
            <div
              aria-hidden="true"
              className="mt-5 flex items-center justify-center gap-3"
            >
              <div className="h-[6px] w-12 rounded-full bg-gradient-to-r from-[#0646DC] to-[#2D9BF0]" />

              <div className="h-2.5 w-2.5 rounded-full bg-[#BFD9F7]" />

              <div className="h-2.5 w-2.5 rounded-full bg-[#DCEAFA]" />
            </div>
          </motion.div>

          {/* =================================================
              TARJETAS DE BENEFICIOS
          ================================================= */}

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.article
                  key={benefit.title}
                  className="group relative flex h-full items-start gap-4 overflow-hidden rounded-[24px] border border-[#DCE9F8] bg-white/95 p-5 shadow-[0_10px_28px_rgba(25,70,150,0.08)] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(25,70,150,0.14)]"
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1 * (index % 3),
                    ease: EASE,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                >
                  {/* Línea decorativa superior */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0646DC] via-[#2D9BF0] to-[#00BFC9]"
                  />

                  {/* =========================================
                      ICONO
                  ========================================= */}

                  <div
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E8F3FF] to-[#CFE5FF] text-[#0869EF] transition-transform duration-300 group-hover:scale-105"
                  >
                    <Icon size={25} strokeWidth={2.2} />
                  </div>

                  {/* =========================================
                      TEXTO
                  ========================================= */}

                  <div className="min-w-0 flex-1">
                    {/* Título */}
                    <h3
                      className={`${titleFont.className} text-[1.0625rem] font-[800] leading-[1.3] text-[#14285B] sm:text-[1.125rem]`}
                    >
                      {benefit.title}
                    </h3>

                    {/* Descripción */}
                    <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[#4A5B78]">
                      {benefit.text}
                    </p>

                    {/* Barra decorativa */}
                    <div
                      aria-hidden="true"
                      className="mt-4 h-[4px] w-9 rounded-full bg-gradient-to-r from-[#0646DC] to-[#2D9BF0]"
                    />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
