"use client";

import Image from "next/image";
import DecorativeBackground from "../DecorativeBackground";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#e8f0ec] pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-36"
    >
      {/* ===================================================== */}
      {/* DECORACIONES DE FONDO */}
      {/* ===================================================== */}

      <DecorativeBackground variant="hero" />

      {/* ===================================================== */}
      {/* CONTENIDO PRINCIPAL */}
      {/* ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">

          {/* ================================================= */}
          {/* TEXTO */}
          {/* ================================================= */}

          <div className="hero-text-in z-10 text-center lg:col-span-7 lg:text-left">

            {/* ETIQUETA */}
            <div className="mb-4 inline-flex rounded-full border border-[#00A8A8]/20 bg-[#F0FAFA] px-3.5 py-1.5 text-xs shadow-sm sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
              <span className="font-semibold tracking-wide text-[#00A8A8]">
                Inspirados en tu salud, enfocados en tu bienestar.
              </span>
            </div>

            {/* TÍTULO */}
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#171717] sm:text-4xl lg:text-5xl xl:text-6xl">
              Reserva tus medicamentos{" "}
              <br className="hidden sm:inline" />

              <span className="bg-gradient-to-r from-[#00A8A8] to-[#006666] bg-clip-text text-transparent">
                a tiempo
              </span>{" "}

              con FarmaSync
            </h1>

            {/* DESCRIPCIÓN */}
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#536078] sm:mt-6 sm:text-lg lg:mx-0">
              Evita filas, consulta la disponibilidad en tiempo real y asegura
              tus medicamentos en las farmacias más cercanas de forma rápida y
              segura.
            </p>

            {/* BOTONES */}
            <div className="mt-7 flex flex-col items-center justify-center gap-3.5 sm:mt-8 sm:flex-row sm:gap-4 lg:justify-start">

              {/* BOTÓN PRINCIPAL */}
              <a
                href="#propuesta"
                className="w-full rounded-full bg-[#00A8A8] px-8 py-3.5 text-center text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#009494] hover:shadow-lg sm:w-auto sm:py-4 sm:text-base"
              >
                Reservar Ahora
              </a>

              {/* BOTÓN SECUNDARIO */}
              <a
                href="#como_funciona"
                className="w-full rounded-full border border-[#CFE3E3] bg-white px-8 py-3.5 text-center text-sm font-semibold text-[#171717] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00A8A8] hover:text-[#00A8A8] sm:w-auto sm:py-4 sm:text-base"
              >
                Ver cómo funciona
              </a>

            </div>
          </div>

          {/* ================================================= */}
          {/* DOCTORA */}
          {/* ================================================= */}

          <div className="hero-slide-in relative flex justify-center lg:col-span-5 lg:justify-end">

            {/* DESTELLO DETRÁS DE LA DOCTORA */}
            <div className="pointer-events-none absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#00A8A8]/15 blur-3xl sm:h-96 sm:w-96" />

            {/* CÍRCULO DECORATIVO */}
            <div className="pointer-events-none absolute right-4 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border-[24px] border-[#00A8A8]/5 sm:h-80 sm:w-80 sm:border-[35px]" />

            {/* IMAGEN */}
            <div className="relative z-10 w-full max-w-xs sm:max-w-md lg:max-w-lg">
              <Image
                src="/images/doc6.png"
                alt="Profesional de salud de FarmaSync"
                width={1199}
                height={1312}
                priority
                quality={100}
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 450px, 520px"
                className="
                  h-auto
                  w-full
                  object-contain
                  drop-shadow-[0_20px_30px_rgba(0,168,168,0.15)]
                  animate-float
                "
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}