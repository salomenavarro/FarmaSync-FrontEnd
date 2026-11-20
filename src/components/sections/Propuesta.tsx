
"use client";

import { Inter } from "next/font/google";
import { motion, MotionConfig } from "framer-motion";
import { CalendarCheck, Search, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* =========================================
   FUENTE DE LOS TÍTULOS
========================================= */

const titleFont = Inter({
  subsets: ["latin"],
  weight: ["800", "900"],
});

/* =========================================
   DATOS DE LA PROPUESTA
========================================= */

type Step = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  text: string;
};

const STEPS: Step[] = [
  {
    icon: Search,
    eyebrow: "Sin desplazamientos en vano",
    title: "Consulta antes de salir",
    text: "Verifica en tiempo real si tu medicamento está disponible en las farmacias asociadas a tu EPS. Sin llamadas, sin filas, sin viajes innecesarios.",
  },
  {
    icon: CalendarCheck,
    eyebrow: "Para pacientes crónicos y cuidadores",
    title: "Reserva con hasta 5 días de anticipación",
    text: "Aparta tu medicamento antes de que se agote. Si eres cuidador, puedes hacer la reserva en nombre del paciente a tu cargo sin necesitar que esté presente.",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Tranquilidad garantizada",
    title: "Tu código, tu medicamento",
    text: "Al confirmar tu reserva recibes un código único. Llévalo a mostrar en la farmacia y retira sin filas. Tu tratamiento continúa sin interrupciones.",
  },
];

/* =========================================
   CONFIGURACIÓN DE ANIMACIONES
========================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

/* =========================================
   CRUCES MÉDICAS DECORATIVAS
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
   COMPONENTE PROPUESTA
========================================= */

export default function Propuesta() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="propuesta"
        aria-labelledby="propuesta-title"
        className="relative isolate overflow-hidden bg-white px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-20"
      >
        {/* =====================================
            FONDO DECORATIVO
        ===================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          {/* Mancha azul superior */}
          <div className="absolute -left-40 -top-32 h-[360px] w-[460px] rounded-full bg-[#DCEBFF]/70 blur-3xl" />

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

        {/* =====================================
            CONTENEDOR PRINCIPAL
        ===================================== */}

        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12 xl:gap-16">

          {/* =====================================
              COLUMNA IZQUIERDA
          ===================================== */}

          <motion.div
            className="relative max-w-[550px]"
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            {/* Cruces decorativas */}
            <MedicalCross
              variant="outline"
              className="-top-12 left-[52%] hidden h-9 w-9 sm:block"
            />

            <MedicalCross
              variant="solid"
              className="-top-7 left-[42%] hidden h-7 w-7 sm:block"
            />

            {/* =====================================
                ETIQUETA SUPERIOR
            ===================================== */}

            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.04em] text-[#0646DC] sm:text-[0.8125rem]">
              <span
                aria-hidden="true"
                className="h-5 w-[3px] rounded-full bg-gradient-to-b from-[#0646DC] to-[#2D9BF0]"
              />

              El efecto FarmaSync
            </p>

            {/* =====================================
                TÍTULO PRINCIPAL
            ===================================== */}

            <h2
              id="propuesta-title"
              className={`${titleFont.className} mt-5 text-[clamp(1.95rem,2.95vw,2.95rem)] font-[800] leading-[1.17] tracking-[-0.025em] text-[#14285B]`}
            >
              Tu tratamiento no debería depender de la{" "}
              <span className="mt-1 inline-block rounded-[10px] bg-gradient-to-r from-[#0646DC] via-[#0869EF] to-[#2D9BF0] px-2.5 pb-1 pt-0.5 text-white shadow-[0_8px_22px_rgba(0,90,220,0.18)]">
                suerte
              </span>
            </h2>

            {/* =====================================
                DESCRIPCIÓN
            ===================================== */}

            <p className="mt-5 max-w-[530px] text-[0.9375rem] leading-[1.75] text-[#4A5B78] sm:text-base">
              Miles de pacientes en Colombia se desplazan a su farmacia EPS sin
              saber si el medicamento que necesitan está disponible. FarmaSync
              elimina esa incertidumbre y las barreras entre tú y tus
              medicamentos, una experiencia diseñada desde la empatía, la
              claridad y el respeto por tu tiempo.
            </p>

            {/* =====================================
                DETALLE DECORATIVO
            ===================================== */}

            <div
              aria-hidden="true"
              className="mt-6 flex items-center gap-3"
            >
              <div className="h-[5px] w-11 rounded-full bg-gradient-to-r from-[#0646DC] to-[#2D9BF0]" />
              <div className="h-2 w-2 rounded-full bg-[#BFD9F7]" />
              <div className="h-2 w-2 rounded-full bg-[#DCEAFA]" />
            </div>
          </motion.div>

          {/* =====================================
              COLUMNA DERECHA
              LÍNEA DE TIEMPO
          ===================================== */}

          <div className="relative min-w-0">

            {/* Línea vertical */}
            <div
              aria-hidden="true"
              className="absolute bottom-5 left-[21px] top-6 w-[2px] rounded-full bg-gradient-to-b from-[#7DB7F5] to-[#2D9BF0] sm:left-[23px]"
            />

            {/* =====================================
                LISTA DE TARJETAS
            ===================================== */}

            <ol className="flex flex-col gap-[22px]">
              {STEPS.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.li
                    key={step.title}
                    className="group relative flex items-start gap-3 sm:gap-4"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 1.1,
                      delay: 0.15 * (index + 1),
                      ease: EASE,
                    }}
                  >
                    {/* =====================================
                        NÚMERO DEL PASO
                    ===================================== */}

                    <motion.div
                      className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#C9E0FA] bg-white text-base font-extrabold text-[#0646DC] shadow-[0_6px_16px_rgba(25,70,150,0.1)] transition-all duration-300 group-hover:border-[#0646DC] group-hover:bg-[#0646DC] group-hover:text-white sm:h-12 sm:w-12"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.25 }}
                    >
                      {index + 1}
                    </motion.div>

                    {/* =====================================
                        TARJETA
                    ===================================== */}

                    <motion.div
                      className="flex min-w-0 flex-1 items-start gap-3 rounded-[22px] border border-[#DCE9F8] bg-white/95 p-3.5 shadow-[0_10px_26px_rgba(25,70,150,0.08)] transition-shadow duration-300 group-hover:shadow-[0_14px_30px_rgba(25,70,150,0.14)] sm:gap-4 sm:p-5"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* =====================================
                          ICONO DE LA TARJETA
                      ===================================== */}

                      <div
                        aria-hidden="true"
                        className="hidden h-[54px] w-[54px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#E8F3FF] to-[#CFE5FF] text-[#0869EF] sm:flex"
                      >
                        <Icon size={27} strokeWidth={2.2} />
                      </div>

                      {/* =====================================
                          CONTENIDO DE LA TARJETA
                      ===================================== */}

                      <div className="relative min-w-0 pl-3">

                        {/* Barra decorativa */}
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-1 h-8 w-[3px] rounded-full bg-gradient-to-b from-[#0646DC] to-[#2D9BF0]"
                        />

                        {/* Etiqueta */}
                        <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.035em] text-[#0646DC] sm:text-xs">
                          {step.eyebrow}
                        </span>

                        {/* Título de la tarjeta */}
                        <h3
                          className={`${titleFont.className} mt-1 text-[1.125rem] font-[800] leading-snug text-[#14285B] sm:text-[1.3125rem]`}
                        >
                          {step.title}
                        </h3>

                        {/* Descripción */}
                        <p className="mt-2 text-[0.875rem] leading-[1.55] text-[#4A5B78] sm:text-[0.96875rem]">
                          {step.text}
                        </p>
                      </div>
                    </motion.div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
