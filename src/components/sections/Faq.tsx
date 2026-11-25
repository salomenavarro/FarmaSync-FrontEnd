"use client";

import { useMemo, useState } from "react";
import { Inter } from "next/font/google";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Plus, Search, X } from "lucide-react";

const titleFont = Inter({ subsets: ["latin"], weight: ["800", "900"] });
const EASE = [0.22, 1, 0.36, 1] as const;

/* =========================================
   DATOS
   popular: true → se muestra al inicio.
   Las demás aparecen al buscar o elegir una categoría.
========================================= */

type ItemCategory = "reservas" | "cuenta" | "seguridad" | "uso";
type Filter = ItemCategory | "populares" | "todas";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "populares", label: "Populares" },
  { id: "todas", label: "Todas" },
  { id: "reservas", label: "Reservas" },
  { id: "cuenta", label: "Cuenta y acceso" },
  { id: "seguridad", label: "Privacidad y seguridad" },
  { id: "uso", label: "Uso de la plataforma" },
];

const ITEMS: {
  id: string;
  category: ItemCategory;
  popular?: boolean;
  q: string;
  a: string;
}[] = [
  {
    id: "anticipacion",
    category: "reservas",
    popular: true,
    q: "¿Con cuánta anticipación puedo reservar?",
    a: "Puedes reservar con hasta 5 días hábiles de anticipación, eligiendo la farmacia, la fecha y la hora estimada de retiro. Si tu tratamiento es crónico, lo ideal es reservar con al menos 48 horas para que la farmacia alcance a prepararlo.",
  },
  {
    id: "disponibilidad",
    category: "uso",
    popular: true,
    q: "¿Cómo sé si hay medicamento disponible?",
    a: "Busca por nombre o código y verás la disponibilidad en cada farmacia junto con la hora de su última actualización. Los farmacéuticos mantienen actualizado el estado de cada medicamento.",
  },
  {
    id: "retiro",
    category: "reservas",
    popular: true,
    q: "¿Cómo retiro mi medicamento?",
    a: "Al confirmar tu reserva recibes un código único. Muéstralo en la farmacia y el farmacéutico gestiona la entrega.",
  },
  {
    id: "cancelar",
    category: "reservas",
    popular: true,
    q: "¿Puedo cancelar una reserva?",
    a: "Sí. Puedes cancelar una reserva activa hasta 1 hora antes del retiro. Al cancelar, el medicamento vuelve a estar disponible para otros pacientes.",
  },
  {
    id: "cuidador",
    category: "reservas",
    popular: true,
    q: "¿Puedo reservar por otra persona?",
    a: "Sí, si eres cuidador. Solo necesitas el documento del paciente, si es mayor de edad debes agregar su correo, y reservas en su nombre.",
  },
  {
    id: "olvide",
    category: "cuenta",
    q: "Olvidé mi contraseña, ¿qué hago?",
    a: "Pide un enlace de recuperación y te lo enviamos a tu correo. El enlace caduca a los 30 minutos; si vence, solicita uno nuevo.",
  },
  {
    id: "datos",
    category: "seguridad",
    q: "¿Cómo protegen mis datos personales?",
    a: "Cumplimos la Ley 1581 de 2012 de protección de datos personales. Tus contraseñas se guardan cifradas y la comunicación viaja por una conexión segura (HTTPS).",
  },
  {
    id: "stock",
    category: "reservas",
    q: "¿Qué pasa si el medicamento se agota antes de confirmar?",
    a: "Verificamos el stock en el momento de confirmar. Si ya no hay unidades, te lo decimos y te sugerimos alternativas para que no pierdas el viaje.",
  },
  {
    id: "quien",
    category: "cuenta",
    q: "¿Quién puede crear una cuenta?",
    a: "Pacientes, cuidadores, farmacéuticos y administradores de EPS. Cada rol ve solo las funciones que le corresponden.",
  },
  {
    id: "login",
    category: "cuenta",
    q: "¿Cómo inicio sesión y qué contraseña necesito?",
    a: "Inicias sesión con tu documento y tu contraseña. Al registrarte, la contraseña debe tener mínimo 8 caracteres, una mayúscula y un número.",
  },
  {
    id: "bloqueo",
    category: "cuenta",
    q: "¿Por qué me bloquearon el acceso?",
    a: "Por seguridad, tras 5 intentos fallidos seguidos la cuenta se bloquea durante 15 minutos. Pasado ese tiempo puedes intentarlo de nuevo.",
  },
  {
    id: "sesion",
    category: "seguridad",
    q: "¿Por qué se cierra mi sesión sola?",
    a: "Por tu protección, cerramos la sesión después de 15 minutos sin actividad. También puedes cerrarla tú cuando quieras.",
  },
  {
    id: "eliminar",
    category: "seguridad",
    q: "¿Puedo pedir que eliminen mis datos?",
    a: "Sí. Puedes solicitar la eliminación de tus datos personales. Además, te pedimos tu consentimiento informado cuando te registras.",
  },
  {
    id: "avisos",
    category: "uso",
    q: "¿Qué avisos voy a recibir?",
    a: "Te avisamos cuando se confirma tu reserva, cuando tu medicamento está listo, una hora antes de tu retiro y si la farmacia cancela.",
  },
  {
    id: "dispositivos",
    category: "uso",
    q: "¿Desde qué dispositivos puedo usar FarmaSync?",
    a: "Desde Chrome, Firefox o Edge, en computador o celular. La pantalla se adapta incluso a celulares pequeños.",
  },
];

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

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
   COMPONENTE
========================================= */

export default function Faq() {
  const [filter, setFilter] = useState<Filter>("populares");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(ITEMS[0].id);

  const hasQuery = query.trim().length > 0;

  const results = useMemo(() => {
    const q = normalize(query.trim());

    /* Sin búsqueda, "Populares" muestra solo las destacadas.
       Con búsqueda, se recorren todas (incluidas las ocultas). */
    const base = ITEMS.filter((item) => {
      if (filter === "populares") return hasQuery || item.popular;
      if (filter === "todas") return true;
      return item.category === filter;
    });

    if (!q) return base;
    return base.filter((item) => normalize(`${item.q} ${item.a}`).includes(q));
  }, [filter, query, hasQuery]);

  const showMoreButton = filter === "populares" && !hasQuery;

  function resetFilters() {
    setFilter("populares");
    setQuery("");
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="faq"
        aria-labelledby="faq-title"
        className="relative isolate overflow-hidden bg-gradient-to-b from-[#F5F9FF] to-[#EAF4FF] px-5 pb-28 pt-16 sm:px-8 sm:pb-32 sm:pt-20 lg:px-12 lg:pb-36 lg:pt-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-32 top-0 h-[340px] w-[340px] rounded-full bg-[#5AA9FF]/15 blur-[90px]" />
          <Waves />
        </div>

        <div className="mx-auto grid w-full max-w-[1280px] items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          {/* Izquierda: título, buscador y categorías */}
          <div className="lg:sticky lg:top-28">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.04em] text-[#0646DC] sm:text-[0.8125rem]">
              <span
                aria-hidden="true"
                className="h-5 w-[3px] rounded-full bg-gradient-to-b from-[#0646DC] to-[#2D9BF0]"
              />
              Preguntas frecuentes
            </p>

            <h2
              id="faq-title"
              className={`${titleFont.className} mt-5 text-[clamp(1.95rem,2.95vw,2.95rem)] font-[800] leading-[1.17] tracking-[-0.025em] text-[#14285B]`}
            >
              Resolvemos tus{" "}
              <span className="mt-1 inline-block rounded-[10px] bg-gradient-to-r from-[#0646DC] via-[#0869EF] to-[#2D9BF0] px-2.5 pb-1 pt-0.5 text-white shadow-[0_8px_22px_rgba(0,90,220,0.18)]">
                dudas
              </span>
            </h2>

            <p className="mt-5 max-w-[480px] text-[0.9375rem] leading-[1.75] text-[#4A5B78] sm:text-base">
              Empieza por las más comunes, o busca por palabra y filtra por tema
              para encontrar tu respuesta más rápido.
            </p>

            {/* Buscador */}
            <div className="relative mt-7 max-w-[480px]">
              <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0869EF]"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar en las preguntas frecuentes"
                placeholder="Ej: contraseña, cancelar, datos"
                className="w-full rounded-full border-2 border-[#C9E0FA] bg-white py-3 pl-11 pr-11 text-[0.9375rem] text-[#14285B] placeholder:text-[#8FA3C4] focus-visible:border-[#0646DC] focus-visible:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Borrar búsqueda"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#4A5B78] transition-colors hover:bg-[#E8F3FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0646DC]"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Categorías */}
            <div className="mt-5 flex max-w-[520px] flex-wrap gap-2">
              {FILTERS.map((f) => {
                const isActive = f.id === filter;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    aria-pressed={isActive}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0646DC] ${
                      isActive
                        ? "border-transparent bg-gradient-to-r from-[#0646DC] to-[#0869EF] text-white shadow-[0_8px_18px_rgba(10,70,200,0.22)]"
                        : "border-[#C4DDF5] bg-white/90 text-[#1746B3] hover:bg-[#E5F1FF]"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Derecha: acordeón */}
          <div>
            <p className="sr-only" aria-live="polite">
              {results.length} preguntas encontradas
            </p>

            {results.length === 0 ? (
              <div className="rounded-[22px] border border-[#DCE9F8] bg-white/95 p-6 text-center shadow-[0_10px_26px_rgba(25,70,150,0.08)] sm:p-8">
                <p
                  className={`${titleFont.className} text-lg font-[800] text-[#14285B]`}
                >
                  No encontramos resultados
                </p>
                <p className="mt-2 text-[0.9375rem] text-[#4A5B78]">
                  Prueba con otra palabra o elige otro tema.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-[#2465D8] bg-white/85 px-6 text-[0.9375rem] font-bold text-[#1746B3] transition-colors duration-300 hover:bg-[#E5F1FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1746B3]"
                >
                  Volver a las populares
                </button>
              </div>
            ) : (
              <ul className="flex flex-col gap-3.5">
                <AnimatePresence initial={false}>
                  {results.map((item) => {
                    const isOpen = openId === item.id;
                    return (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        <div
                          className={`rounded-[22px] border bg-white/95 transition-all duration-300 ${
                            isOpen
                              ? "border-[#0646DC]/50 shadow-[0_14px_30px_rgba(25,70,150,0.16)]"
                              : "border-[#DCE9F8] shadow-[0_10px_26px_rgba(25,70,150,0.06)] hover:shadow-[0_14px_30px_rgba(25,70,150,0.12)]"
                          }`}
                        >
                          <h3>
                            <button
                              type="button"
                              id={`faq-btn-${item.id}`}
                              aria-expanded={isOpen}
                              aria-controls={`faq-panel-${item.id}`}
                              onClick={() => setOpenId(isOpen ? null : item.id)}
                              className="flex w-full items-center gap-4 rounded-[22px] p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0646DC] sm:p-5"
                            >
                              <span className="relative min-w-0 flex-1 pl-3">
                                <span
                                  aria-hidden="true"
                                  className="absolute left-0 top-0.5 h-6 w-[3px] rounded-full bg-gradient-to-b from-[#0646DC] to-[#2D9BF0]"
                                />
                                <span
                                  className={`${titleFont.className} block text-[1rem] font-[800] leading-snug text-[#14285B] sm:text-[1.0625rem]`}
                                >
                                  {item.q}
                                </span>
                              </span>

                              <span
                                aria-hidden="true"
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                                  isOpen
                                    ? "rotate-45 bg-[#0646DC] text-white"
                                    : "bg-[#E8F3FF] text-[#0869EF]"
                                }`}
                              >
                                <Plus size={18} strokeWidth={2.6} />
                              </span>
                            </button>
                          </h3>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                id={`faq-panel-${item.id}`}
                                role="region"
                                aria-labelledby={`faq-btn-${item.id}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: EASE }}
                                className="overflow-hidden"
                              >
                                <p className="px-4 pb-5 pl-[1.75rem] pr-6 text-[0.9375rem] leading-[1.7] text-[#4A5B78] sm:px-5 sm:pb-6 sm:pl-[2.25rem] sm:text-base">
                                  {item.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            )}

            {showMoreButton && (
              <button
                type="button"
                onClick={() => setFilter("todas")}
                className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-[#2465D8] bg-white/85 px-7 text-[0.9375rem] font-bold text-[#1746B3] transition-colors duration-300 hover:bg-[#E5F1FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1746B3]"
              >
                Ver todas las preguntas ({ITEMS.length})
              </button>
            )}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}