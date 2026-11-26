"use client";

import { useRef, useState, type ReactNode } from "react";
import { Inter } from "next/font/google";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  Bell,
  CalendarCheck,
  Check,
  MapPin,
  Search,
  Store,
  Ticket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const titleFont = Inter({ subsets: ["latin"], weight: ["800", "900"] });
const EASE = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 5500;

/* =========================================
   DATOS
========================================= */

type Step = { icon: LucideIcon; title: string; text: string };

const STEPS: Step[] = [
  {
    icon: Search,
    title: "Busca tu medicamento",
    text: "Escribe el nombre o el código y mira en qué farmacias hay disponibilidad antes de salir de casa.",
  },
  {
    icon: MapPin,
    title: "Elige una farmacia",
    text: "Compara las farmacias de tu EPS, su disponibilidad y la hora de la última actualización.",
  },
  {
    icon: CalendarCheck,
    title: "Reserva tu medicamento",
    text: "Escoge fecha y hora de retiro hasta con 5 días hábiles de anticipación. Si no hay stock, te sugerimos alternativas.",
  },
  {
    icon: Ticket,
    title: "Recibe tu código",
    text: "Al confirmar te damos un código único y te avisamos de cada cambio en el estado de tu reserva.",
  },
  {
    icon: Store,
    title: "Retira sin filas",
    text: "Presenta tu código en la farmacia y recibe tu medicamento. Si no puedes ir, cancela hasta 1 hora antes.",
  },
];

/* =========================================
   DECORACIÓN
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

function Waves() {
  return (
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
  );
}

/* =========================================
   PANTALLAS DEL TELÉFONO
========================================= */

const label = "text-[11px] font-semibold text-[#4A5B78]";

function SearchScreen() {
  const results = [
    { name: "Losartán 50 mg", sub: "Tabletas x 30" },
    { name: "Losartán 100 mg", sub: "Tabletas x 30" },
    { name: "Losartán potásico", sub: "Genérico" },
  ];
  return (
    <div className="flex flex-col gap-3">
      <p className={label}>¿Qué medicamento necesitas?</p>
      <div className="flex items-center gap-2 rounded-xl border-2 border-[#0869EF] bg-white px-3 py-2.5 shadow-[0_6px_16px_rgba(8,105,239,0.12)]">
        <Search size={16} className="text-[#0869EF]" aria-hidden="true" />
        <span className="text-sm font-semibold text-[#14285B]">
          Losartán 50 mg
          <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-[#0869EF] align-middle" />
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {results.map((r, i) => (
          <li
            key={r.name}
            className={`rounded-xl border p-3 ${
              i === 0
                ? "border-[#0869EF] bg-[#EAF4FF]"
                : "border-[#DCE9F8] bg-white"
            }`}
          >
            <p className="text-sm font-bold text-[#14285B]">{r.name}</p>
            <p className="text-[11px] text-[#4A5B78]">{r.sub}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PharmacyScreen() {
  const pharmacies = [
    { name: "Farmacia Central", dist: "A 0,8 km", ok: true },
    { name: "Droguería Norte", dist: "A 1,6 km", ok: true },
    { name: "Farmacia del Parque", dist: "A 2,4 km", ok: false },
  ];
  return (
    <div className="flex flex-col gap-3">
      <p className={label}>Losartán 50 mg en tu EPS</p>
      <ul className="flex flex-col gap-2">
        {pharmacies.map((p, i) => (
          <li
            key={p.name}
            className={`rounded-xl border p-3 ${
              i === 0
                ? "border-[#0869EF] bg-[#EAF4FF]"
                : "border-[#DCE9F8] bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-[#14285B]">{p.name}</p>
                <p className="text-[11px] text-[#4A5B78]">{p.dist}</p>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  p.ok
                    ? "bg-[#A3E8C1] text-[#0B6B3A]"
                    : "bg-[#FDE8E8] text-[#B42318]"
                }`}
              >
                {p.ok ? "Disponible" : "No disponible"}
              </span>
            </div>
            {p.ok && (
              <p className="mt-1.5 text-[10px] text-[#6B7C99]">
                Actualizado hace 10 min
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReserveScreen() {
  const chip = (selected: boolean) =>
    `rounded-lg border py-2 text-center text-xs font-bold ${
      selected
        ? "border-[#0646DC] bg-[#0646DC] text-white"
        : "border-[#DCE9F8] bg-white text-[#14285B]"
    }`;
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl bg-[#EAF4FF] p-3">
        <p className={label}>Medicamento</p>
        <p className="text-sm font-extrabold text-[#14285B]">Losartán 50 mg</p>
        <p className="text-xs text-[#4A5B78]">Farmacia Central</p>
      </div>
      <p className={label}>Día de retiro</p>
      <div className="grid grid-cols-3 gap-2">
        {["Mié 25", "Jue 26", "Vie 27"].map((d, i) => (
          <span key={d} className={chip(i === 1)}>
            {d}
          </span>
        ))}
      </div>
      <p className={label}>Hora estimada</p>
      <div className="grid grid-cols-3 gap-2">
        {["8:00", "10:30", "14:00"].map((h, i) => (
          <span key={h} className={chip(i === 1)}>
            {h}
          </span>
        ))}
      </div>
      <div className="mt-1 rounded-full bg-gradient-to-r from-[#0646DC] to-[#0869EF] py-2.5 text-center text-sm font-bold text-white shadow-[0_8px_18px_rgba(10,70,200,0.25)]">
        Confirmar reserva
      </div>
    </div>
  );
}

function CodeScreen() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#A3E8C1] text-[#0B6B3A]">
        <Check size={26} strokeWidth={3} aria-hidden="true" />
      </span>
      <p className="text-base font-extrabold text-[#14285B]">
        Reserva confirmada
      </p>
      <div className="w-full rounded-2xl border-2 border-dashed border-[#9CC4F5] bg-[#F3F8FF] py-4">
        <p className={label}>Tu código único</p>
        <p className="mt-1 text-3xl font-black tracking-[0.12em] text-[#0646DC]">
          FS-2481
        </p>
      </div>
      <div className="flex w-full items-start gap-2 rounded-xl border border-[#DCE9F8] bg-white p-3 text-left shadow-[0_6px_16px_rgba(25,70,150,0.08)]">
        <Bell size={16} className="mt-0.5 shrink-0 text-[#0869EF]" aria-hidden="true" />
        <p className="text-xs leading-snug text-[#4A5B78]">
          Te avisaremos cuando tu medicamento esté listo para retiro.
        </p>
      </div>
    </div>
  );
}

function PickupScreen() {
  const states = ["Pendiente", "Confirmada", "Lista para retiro", "Entregada"];
  const current = 2;
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-base font-extrabold text-[#14285B]">
          Tu medicamento está listo
        </p>
        <p className="text-xs text-[#4A5B78]">
          Presenta el código FS-2481 en Farmacia Central.
        </p>
      </div>
      <ol className="flex flex-col gap-3">
        {states.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span
              className={`relative flex h-6 w-6 items-center justify-center rounded-full text-white ${
                i < current
                  ? "bg-[#0646DC]"
                  : i === current
                    ? "bg-[#0869EF] ring-4 ring-[#0869EF]/20"
                    : "border-2 border-[#C9E0FA] bg-white"
              }`}
            >
              {i < current && <Check size={13} strokeWidth={3} aria-hidden="true" />}
            </span>
            <span
              className={`text-sm ${
                i === current
                  ? "font-extrabold text-[#14285B]"
                  : i < current
                    ? "font-semibold text-[#4A5B78]"
                    : "text-[#9AA9C2]"
              }`}
            >
              {s}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function renderScreen(index: number): ReactNode {
  switch (index) {
    case 0:
      return <SearchScreen />;
    case 1:
      return <PharmacyScreen />;
    case 2:
      return <ReserveScreen />;
    case 3:
      return <CodeScreen />;
    default:
      return <PickupScreen />;
  }
}

/* =========================================
   COMPONENTE
========================================= */

export default function ComoFunciona() {
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { amount: 0.2 });

  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0); // reinicia la barra al hacer clic
  const [hovered, setHovered] = useState(false);

  const autoplay = !reduce;
  const running = inView && !hovered;

  function selectStep(index: number) {
    setActive(index);
    setTick((t) => t + 1);
  }

  /* Al terminar la barra del paso, avanza; tras el 5 vuelve al 1 */
  function nextStep() {
    setActive((a) => (a + 1) % STEPS.length);
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="como_funciona"
        aria-labelledby="como-funciona-title"
        className="relative isolate overflow-hidden bg-gradient-to-b from-[#EAF4FF] via-[#F5F9FF] to-white px-5 pb-28 pt-16 sm:px-8 sm:pb-32 sm:pt-20 lg:px-12 lg:pb-36 lg:pt-24"
      >
        <style>{`@keyframes fs-step-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>

        {/* Fondo decorativo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -right-32 top-10 h-[380px] w-[380px] rounded-full bg-[#5AA9FF]/20 blur-[90px]" />
          <div className="absolute -left-32 bottom-20 h-[340px] w-[340px] rounded-full bg-[#4A99ED]/15 blur-[90px]" />
          <Waves />
        </div>

        <div className="mx-auto w-full max-w-[1280px]">
          {/* Encabezado */}
          <div className="max-w-[640px]">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.04em] text-[#0646DC] sm:text-[0.8125rem]">
              <span
                aria-hidden="true"
                className="h-5 w-[3px] rounded-full bg-gradient-to-b from-[#0646DC] to-[#2D9BF0]"
              />
              ¿Cómo funciona?
            </p>

            <h2
              id="como-funciona-title"
              className={`${titleFont.className} mt-5 text-[clamp(1.95rem,2.95vw,2.95rem)] font-[800] leading-[1.17] tracking-[-0.025em] text-[#14285B]`}
            >
              De la búsqueda al retiro en{" "}
              <span className="mt-1 inline-block rounded-[10px] bg-gradient-to-r from-[#0646DC] via-[#0869EF] to-[#2D9BF0] px-2.5 pb-1 pt-0.5 text-white shadow-[0_8px_22px_rgba(0,90,220,0.18)]">
                5 pasos
              </span>
            </h2>

            <p className="mt-5 max-w-[530px] text-[0.9375rem] leading-[1.75] text-[#4A5B78] sm:text-base">
              Toca cada paso y mira cómo se ve en la aplicación.
            </p>
          </div>

          <div
            ref={gridRef}
            className="mt-12 grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setHovered(true);
            }}
            onPointerLeave={() => setHovered(false)}
          >
            {/* Teléfono (ilustrativo) */}
            <div className="relative mx-auto w-full max-w-[300px]" aria-hidden="true">
              <MedicalCross
                variant="outline"
                className="-right-8 -top-6 hidden h-9 w-9 sm:block"
              />
              <MedicalCross
                variant="solid"
                className="-left-7 bottom-16 hidden h-6 w-6 sm:block"
              />

              <div className="overflow-hidden rounded-[2.6rem] border-[7px] border-[#14285B] bg-white shadow-[0_30px_60px_rgba(20,40,91,0.25)]">
                <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-[#14285B]/15" />
                <div className="flex items-center justify-between px-5 pt-3">
                  <span
                    className={`${titleFont.className} bg-gradient-to-r from-[#0646DC] to-[#2D9BF0] bg-clip-text text-base font-[900] text-transparent`}
                  >
                    FarmaSync
                  </span>
                  <span className="text-[11px] font-semibold text-[#6B7C99]">
                    Paso {active + 1} de {STEPS.length}
                  </span>
                </div>

                <div className="relative h-[400px] px-5 pb-6 pt-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      {renderScreen(active)}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Pasos */}
            <ol className="flex flex-col gap-3.5">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === active;
                const isDone = index < active;

                return (
                  <li key={step.title} className="relative">
                    {/* Conector hacia el siguiente paso */}
                    {index < STEPS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-3.5 left-[21px] top-11 w-[2px] rounded-full transition-colors duration-500 sm:left-[23px] sm:top-12 ${
                          isDone ? "bg-[#2D9BF0]" : "bg-[#D3E6FB]"
                        }`}
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => selectStep(index)}
                      aria-current={isActive ? "step" : undefined}
                      className="group relative flex w-full items-start gap-3 rounded-[22px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0646DC] sm:gap-4"
                    >
                      {/* Número / check */}
                      <span
                        className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-base font-extrabold shadow-[0_6px_16px_rgba(25,70,150,0.1)] transition-all duration-300 sm:h-12 sm:w-12 ${
                          isActive
                            ? "border-[#0646DC] bg-[#0646DC] text-white"
                            : isDone
                              ? "border-[#0646DC] bg-white text-[#0646DC]"
                              : "border-[#C9E0FA] bg-white text-[#6B7C99] group-hover:border-[#0646DC] group-hover:text-[#0646DC]"
                        }`}
                      >
                        {isDone ? (
                          <Check size={20} strokeWidth={3} aria-hidden="true" />
                        ) : (
                          index + 1
                        )}
                      </span>

                      {/* Tarjeta */}
                      <span
                        className={`relative flex min-w-0 flex-1 items-start gap-3 overflow-hidden rounded-[22px] border bg-white/95 p-3.5 transition-all duration-300 sm:gap-4 sm:p-5 ${
                          isActive
                            ? "border-[#0646DC]/50 shadow-[0_14px_30px_rgba(25,70,150,0.16)]"
                            : "border-[#DCE9F8] shadow-[0_10px_26px_rgba(25,70,150,0.06)] group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_30px_rgba(25,70,150,0.12)]"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`hidden h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl transition-colors duration-300 sm:flex ${
                            isActive
                              ? "bg-gradient-to-br from-[#0646DC] to-[#2D9BF0] text-white"
                              : "bg-gradient-to-br from-[#E8F3FF] to-[#CFE5FF] text-[#0869EF]"
                          }`}
                        >
                          <Icon size={23} strokeWidth={2.2} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span
                            className={`${titleFont.className} block text-[1.0625rem] font-[800] leading-snug text-[#14285B] sm:text-[1.1875rem]`}
                          >
                            {step.title}
                          </span>

                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.span
                                key="text"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: EASE }}
                                className="block overflow-hidden"
                              >
                                <span className="block pt-2 text-[0.875rem] leading-[1.55] text-[#4A5B78] sm:text-[0.96875rem]">
                                  {step.text}
                                </span>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>

                        {/* Barra de progreso: al terminar pasa al siguiente paso.
                            Se congela cuando el mouse está encima o la sección no se ve. */}
                        {isActive && autoplay && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-5 bottom-0 h-[3px] overflow-hidden rounded-full bg-[#E3EEFB]"
                          >
                            <span
                              key={`${active}-${tick}`}
                              onAnimationEnd={nextStep}
                              className="block h-full origin-left rounded-full bg-gradient-to-r from-[#0646DC] to-[#2D9BF0]"
                              style={{
                                animation: `fs-step-progress ${STEP_MS}ms linear forwards`,
                                animationPlayState: running ? "running" : "paused",
                              }}
                            />
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}