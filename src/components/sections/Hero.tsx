import Image from "next/image";
import { Inter } from "next/font/google";

/* =========================================
   FUENTE DEL TÍTULO
   Inter permite pesos de hasta 900 (Arial no).
========================================= */

const titleFont = Inter({
  subsets: ["latin"],
  weight: ["800", "900"],
});

/* =========================================
   DATOS
========================================= */

const BENEFITS = ["Fácil de usar", "Ahorra tiempo"] as const;

/* Forma orgánica compartida por la foto y el aro azul.
   Ajusta estos porcentajes si quieres variar la silueta. */
const BLOB_SHAPE = "rounded-[48%_52%_46%_54%/44%_52%_48%_56%]";

/* =========================================
   ICONOS
========================================= */

/* Check de los chips de beneficios */
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="m5 12 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Cruz médica decorativa (sólida o solo contorno) */
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
   HERO
========================================= */

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#DCEEFF] via-[#EAF4FF] to-[#C4DCFF]"
    >
      {/* =====================================
          FONDO DECORATIVO (luces + ondas)
      ===================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Luz azul oscura (arriba izquierda) */}
        <div className="absolute -left-32 -top-28 h-[380px] w-[380px] rounded-full bg-[#4A99ED]/15 blur-[90px]" />

        {/* Luz azul cielo (arriba derecha) */}
        <div className="absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-[#5AA9FF]/25 blur-[90px]" />

        {/* Ondas inferiores */}
        <svg
          viewBox="0 0 1440 700"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M0 610C240 680 460 605 700 645C950 690 1190 620 1440 555V700H0Z"
            fill="#FFFFFF"
            fillOpacity="0.45"
          />
          <path
            d="M0 660C260 700 470 640 730 675C1000 710 1220 660 1440 610V700H0Z"
            fill="#55A8E9"
            fillOpacity="0.2"
          />
        </svg>
      </div>

      {/* =====================================
          CONTENEDOR PRINCIPAL
          - Ancho máximo de 1360px: el texto y la imagen
            quedan un poco más cerca de los bordes
          - Más espacio arriba y abajo para que el contenido respire
      ===================================== */}
      <div className="relative mx-auto w-full max-w-[1360px] px-5 pb-16 pt-32 sm:px-8 lg:flex lg:min-h-[min(680px,100svh)] lg:items-center lg:px-10 lg:pt-36 xl:px-12">
        {/* En escritorio: columna de texto flexible + columna de imagen
            que toma el ancho de su contenido (auto) */}
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8 xl:gap-12">
          {/* =================================
              COLUMNA IZQUIERDA: TEXTO
              Cada bloque se anima por separado (hero-item)
          ================================= */}
          <div className="relative z-20 text-center lg:text-left">
            {/* Viñeta superior */}
            <div className="hero-item hero-delay-1 mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#C4DDF5] bg-white/95 px-4 py-2 shadow-[0_5px_18px_rgba(25,70,150,0.1)]">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#0869EF]" />
              <span className="text-sm font-bold text-[#1746B3] sm:text-[0.9375rem]">
                Inspirados en tu salud, enfocados en tu bienestar
              </span>
            </div>

            {/* Título principal:
                - Usa Inter (titleFont) para lograr un peso 900 real
                - El tamaño se limita por ancho (vw) y por alto (vh)
                  para que no se desborde en pantallas bajas */}
            <h1
              id="hero-title"
              className={`${titleFont.className} hero-item hero-delay-2 mx-auto max-w-[680px] text-[clamp(2rem,min(3.9vw,6vh),3.9rem)] font-[900] leading-[1.12] tracking-[-0.02em] text-[#14285B] lg:mx-0`}
            >
              Reserva tus
              <span className="block">medicamentos</span>

              <span className="my-1.5 block">
                {/* Resaltado con degradado azul */}
                <span className="inline-block rounded-[12px] bg-gradient-to-r from-[#0646DC] via-[#0869EF] to-[#2D9BF0] px-2 pb-1 pt-0.5 text-white shadow-[0_8px_22px_rgba(0,90,220,0.18)]">
                  a tiempo
                </span>{" "}
                con
              </span>

              <span className="block">FarmaSync</span>
            </h1>

            {/* Descripción */}
            <p className="hero-item hero-delay-3 mx-auto mt-5 max-w-[540px] text-[1.0625rem] font-medium leading-7 text-[#344766] lg:mx-0">
              Evita filas, consulta la disponibilidad en tiempo real y asegura
              tus medicamentos en las farmacias más cercanas de forma rápida y
              segura.
            </p>

            {/* Botones de acción
                Ambos llevan border-2 y la misma altura mínima
                para que midan exactamente lo mismo */}
            <div className="hero-item hero-delay-4 mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              {/* Botón principal */}
              <a
                href="#como_funciona"
                className="group inline-flex min-h-[52px] w-full items-center justify-center gap-4 rounded-full border-2 border-transparent bg-gradient-to-r from-[#0646DC] to-[#0869EF] bg-origin-border px-7 py-3 text-[0.9375rem] font-bold text-white shadow-[0_12px_28px_rgba(10,70,200,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(10,70,200,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0646DC] motion-reduce:transform-none sm:w-auto sm:text-[1.0625rem]"
              >
                Ver cómo funciona
                <span
                  aria-hidden="true"
                  className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                >
                  →
                </span>
              </a>

              {/* Botón secundario */}
              <a
                href="#buscar_farmacia"
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border-2 border-[#2465D8] bg-white/85 px-6 py-3 text-[0.9375rem] font-bold text-[#1746B3] transition-colors duration-300 hover:bg-[#E5F1FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1746B3] sm:w-auto sm:text-[1.0625rem]"
              >
                Buscar farmacia
              </a>
            </div>

            {/* Chips de beneficios */}
            <ul className="hero-item hero-delay-5 mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">
              {BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="inline-flex items-center gap-2 rounded-full border border-[#C4DDF5] bg-white/95 px-3.5 py-2 shadow-[0_5px_16px_rgba(28,94,173,0.1)]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D6E8FF] text-[#0758D1]">
                    <CheckIcon />
                  </span>
                  <span className="text-sm font-bold text-[#173B75] sm:text-[0.9375rem]">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================
              COLUMNA DERECHA: IMAGEN
              Móvil/tablet: ancho completo con tope.
              Escritorio: min(40% del ancho, 72% del alto, 520px)
              → nunca es más grande que la pantalla.
          ================================= */}
          <div className="hero-slide-in relative mx-auto w-full max-w-[420px] sm:max-w-[460px] lg:mx-0 lg:w-[min(40vw,72vh,520px)] lg:max-w-none lg:justify-self-end">
            {/* Contenedor con proporción fija para la forma orgánica */}
            <div className="relative aspect-[1.2/1] w-full">
              {/* Aro azul detrás de la foto */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 -translate-x-[5%] translate-y-[3%] -rotate-6 scale-[1.04] bg-gradient-to-br from-[#C9E1FF] via-[#7DB7F5] to-[#2F7BEF] opacity-90 ${BLOB_SHAPE}`}
              />

              {/* Foto recortada con la forma orgánica */}
              <div
                className={`absolute inset-0 overflow-hidden shadow-[0_20px_50px_rgba(20,80,160,0.18)] ${BLOB_SHAPE}`}
              >
                <Image
                  src="/images/doc11.png"
                  alt="Farmacéutica de FarmaSync en una farmacia"
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 460px, 40vw"
                  className="object-cover object-[60%_30%]"
                />
              </div>

              {/* Cruces médicas decorativas
                  (aparecen junto con la imagen y luego flotan) */}
              <MedicalCross
                variant="outline"
                className="hero-cross -top-3 right-[-2%] h-[10%] w-[10%] min-h-8 min-w-8"
              />
              <MedicalCross
                variant="solid"
                className="hero-cross left-[2%] top-[20%] h-[7%] w-[7%] min-h-6 min-w-6"
              />
              <MedicalCross
                variant="outline"
                className="hero-cross -left-[8%] bottom-[2%] h-[9%] w-[9%] min-h-7 min-w-7"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}