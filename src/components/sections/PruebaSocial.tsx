"use client";

import { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
import {
  animate,
  AnimatePresence,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Bell, CalendarCheck, ChevronRight, Quote, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const titleFont = Inter({ subsets: ["latin"], weight: ["800", "900"] });
const EASE = [0.22, 1, 0.36, 1] as const;

/* =========================================
   DATOS
========================================= */

type Voice = {
  id: string;
  name: string;
  role: string;
  quote: string;
  tag: string;
  icon: LucideIcon;
};

/* Reemplaza estos textos por comentarios reales cuando
   tengan retroalimentación del piloto. */
const VOICES: Voice[] = [
  {
    id: "carlos",
    name: "Carlos Mendoza",
    role: "Paciente EPS",
    quote:
      "Antes perdía horas haciendo fila en la farmacia solo para que me dijeran que no había stock. Ahora reservo desde casa.",
    tag: "Reserva desde casa",
    icon: CalendarCheck,
  },
  {
    id: "andres",
    name: "Andrés Felipe G.",
    role: "Paciente crónico",
    quote:
      "Me encanta la sección de notificaciones. Me avisa cuándo puedo ir a recoger mis medicamentos sin contratiempos.",
    tag: "Avisos a tiempo",
    icon: Bell,
  },
  {
    id: "diana",
    name: "Diana Restrepo",
    role: "Regente de farmacia",
    quote:
      "FarmaSync nos ayuda a organizar mejor las entregas y a reducir las aglomeraciones en el mostrador.",
    tag: "Menos aglomeraciones",
    icon: Store,
  },
];

const GOALS = [
  { value: 60, suffix: "%", text: "menos desplazamientos a farmacias sin disponibilidad" },
  { value: 30, suffix: "%", text: "menos tiempo de espera en el mostrador" },
  { value: 48, suffix: " h", text: "de anticipación para reservar tratamientos crónicos" },
];

/* =========================================
   AUXILIARES
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
      className={`absolute ${className}`}
      fill={isSolid ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={isSolid ? 2 : 1.8}
      strokeLinejoin="round"
    >
      <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" />
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("");
}

function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      {reduce ? value : n}
      {suffix}
    </span>
  );
}

/* =========================================
   COMPONENTE
========================================= */

export default function PruebaSocial() {
  const [activeId, setActiveId] = useState(VOICES[0].id);
  const voice = VOICES.find((v) => v.id === activeId) ?? VOICES[0];
  const TagIcon = voice.icon;

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="prueba_social"
        aria-labelledby="voces-title"
        className="relative isolate overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-40 -top-32 h-[360px] w-[460px] rounded-full bg-[#DCEBFF]/70 blur-3xl" />
          <div className="absolute -right-32 bottom-10 h-[320px] w-[320px] rounded-full bg-[#BFE0FF]/50 blur-3xl" />
        </div>

        <div className="mx-auto w-full max-w-[1280px]">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            {/* Izquierda: título + selector */}
            <div>
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.04em] text-[#0646DC] sm:text-[0.8125rem]">
                <span
                  aria-hidden="true"
                  className="h-5 w-[3px] rounded-full bg-gradient-to-b from-[#0646DC] to-[#2D9BF0]"
                />
                Voces FarmaSync
              </p>

              <h2
                id="voces-title"
                className={`${titleFont.className} mt-5 max-w-[520px] text-[clamp(1.95rem,2.95vw,2.95rem)] font-[800] leading-[1.17] tracking-[-0.025em] text-[#14285B]`}
              >
                Menos filas, más{" "}
                <span className="mt-1 inline-block rounded-[10px] bg-gradient-to-r from-[#0646DC] via-[#0869EF] to-[#2D9BF0] px-2.5 pb-1 pt-0.5 text-white shadow-[0_8px_22px_rgba(0,90,220,0.18)]">
                  tranquilidad
                </span>
              </h2>

              <p className="mt-5 max-w-[500px] text-[0.9375rem] leading-[1.75] text-[#4A5B78] sm:text-base">
                Pacientes y farmacias cuentan cómo cambia su día a día. Elige
                una voz para leer su experiencia.
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {VOICES.map((v) => {
                  const isActive = v.id === activeId;
                  return (
                    <li key={v.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId(v.id)}
                        aria-pressed={isActive}
                        className={`group flex w-full items-center gap-3.5 rounded-[22px] border bg-white/95 p-3.5 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0646DC] sm:p-4 ${
                          isActive
                            ? "border-[#0646DC]/50 shadow-[0_14px_30px_rgba(25,70,150,0.16)]"
                            : "border-[#DCE9F8] shadow-[0_10px_26px_rgba(25,70,150,0.06)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(25,70,150,0.12)]"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-extrabold transition-colors duration-300 ${
                            isActive
                              ? "bg-[#0646DC] text-white"
                              : "bg-gradient-to-br from-[#E8F3FF] to-[#CFE5FF] text-[#0646DC]"
                          }`}
                        >
                          {initials(v.name)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`${titleFont.className} block text-[1rem] font-[800] leading-snug text-[#14285B]`}
                          >
                            {v.name}
                          </span>
                          <span className="block text-[0.8125rem] text-[#4A5B78]">
                            {v.role}
                          </span>
                        </span>
                        <ChevronRight
                          size={20}
                          aria-hidden="true"
                          className={`shrink-0 transition-all duration-300 ${
                            isActive
                              ? "translate-x-0 text-[#0646DC]"
                              : "-translate-x-1 text-[#9AB3D6] group-hover:translate-x-0"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Derecha: testimonio destacado */}
            <div className="relative">
              <div className="relative min-h-[340px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0646DC] via-[#0869EF] to-[#2D9BF0] p-7 text-white shadow-[0_24px_50px_rgba(8,70,200,0.28)] sm:p-10">
                <MedicalCross
                  variant="outline"
                  className="-right-4 -top-4 h-24 w-24 text-white/20"
                />
                <MedicalCross
                  variant="solid"
                  className="bottom-6 right-8 hidden h-6 w-6 text-white/25 sm:block"
                />
                <Quote
                  size={44}
                  aria-hidden="true"
                  className="relative text-white/40"
                />

                <AnimatePresence mode="wait">
                  <motion.figure
                    key={voice.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="relative mt-4"
                  >
                    <blockquote
                      className={`${titleFont.className} text-[clamp(1.25rem,2vw,1.75rem)] font-[800] leading-snug tracking-[-0.015em]`}
                    >
                      {voice.quote}
                    </blockquote>

                    <figcaption className="mt-8 flex flex-wrap items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-extrabold text-[#0646DC]"
                      >
                        {initials(voice.name)}
                      </span>
                      <span>
                        <span className="block text-base font-bold">
                          {voice.name}
                        </span>
                        <span className="block text-sm text-white/80">
                          {voice.role}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-bold">
                        <TagIcon size={16} aria-hidden="true" />
                        {voice.tag}
                      </span>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Metas del proyecto */}
          <div className="mt-16 sm:mt-20">
            <h3
              className={`${titleFont.className} text-xl font-[800] text-[#14285B] sm:text-2xl`}
            >
              Las metas que nos guían
            </h3>

            <ul className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
              {GOALS.map((g) => (
                <li
                  key={g.text}
                  className="rounded-[22px] border border-[#DCE9F8] bg-white/95 p-5 shadow-[0_10px_26px_rgba(25,70,150,0.08)] sm:p-6"
                >
                  <p
                    className={`${titleFont.className} bg-gradient-to-r from-[#0646DC] to-[#2D9BF0] bg-clip-text text-5xl font-[900] tracking-[-0.03em] text-transparent`}
                  >
                    <Counter value={g.value} suffix={g.suffix} />
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-snug text-[#4A5B78]">
                    {g.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}