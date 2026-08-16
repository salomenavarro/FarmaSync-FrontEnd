"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* =========================================================
   CONTADOR ANIMADO
========================================================= */

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 1500,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  /* ---------------------------------------------------------
     DETECTAR CUANDO ENTRA EN PANTALLA
  --------------------------------------------------------- */

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [started]);

  /* ---------------------------------------------------------
     ANIMACIÓN DEL CONTADOR
  --------------------------------------------------------- */

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      /* Movimiento suave al final */

      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easeOut * value);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
        setFinished(true);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [started, value, duration]);

  return (
    <div
      ref={ref}
      className={`
        inline-block
        text-2xl
        font-extrabold
        text-[#00A8A8]
        sm:text-4xl
        transition-transform
        duration-300
        ease-out
        ${finished ? "scale-[1.08]" : "scale-100"}
      `}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

/* =========================================================
   TESTIMONIO
========================================================= */

function Testimonial({
  text,
  name,
  role,
  image,
}: {
  text: string;
  name: string;
  role: string;
  image?: string;
}) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <article
      className="
        flex
        h-full
        flex-col
        justify-between
        rounded-2xl
        border
        border-[#DCEEEE]
        bg-white
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
        sm:p-6
      "
    >
      <div>
        <div className="mb-2.5 text-base tracking-widest text-[#00A8A8] sm:mb-3 sm:text-lg">
          ★★★★★
        </div>

        <p className="text-xs leading-relaxed text-[#555555] sm:text-sm">
          "{text}"
        </p>
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-[#EAF2F2] pt-3.5 sm:mt-6 sm:pt-4">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00A8A8]/10 text-xs font-bold text-[#00A8A8] sm:h-10 sm:w-10 sm:text-sm">
            {initial}
          </div>
        )}

        <div>
          <h3 className="text-xs font-bold text-[#171717] sm:text-sm">
            {name}
          </h3>

          <p className="text-[11px] font-medium text-[#6B7280] sm:text-xs">
            {role}
          </p>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export default function PruebaSocial() {
  return (
    <section
      id="prueba_social"
      className="bg-[#e8f0ec] px-4 py-12 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            ENCABEZADO
        ================================================= */}

        <div className="mb-10 text-center sm:mb-12">

          <span className="inline-block rounded-full bg-[#00A8A8]/10 px-3.5 py-1 text-xs font-semibold text-[#00A8A8] sm:px-4 sm:py-1.5 sm:text-sm">
            PRUEBA SOCIAL
          </span>

          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#171717] sm:mt-4 sm:text-4xl lg:text-5xl">
            Confianza respaldada por resultados
          </h2>

          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#00A8A8] sm:mt-4" />
        </div>

        {/* =================================================
            ESTADÍSTICAS
        ================================================= */}

        <div className="mx-auto max-w-4xl rounded-2xl border border-[#DCEEEE] bg-white p-5 shadow-sm md:rounded-full sm:p-6">

          <div className="grid grid-cols-1 divide-y divide-[#E5E7EB] md:grid-cols-3 md:divide-x md:divide-y-0">

            {/* =================================================
                USUARIOS
            ================================================= */}

            <div className="pt-2 text-center md:pt-0">

              <AnimatedNumber
                value={1000}
                prefix="+"
              />

              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#6B7280] sm:text-xs">
                Usuarios Satisfechos
              </p>

            </div>

            {/* =================================================
                MENOS FILAS
            ================================================= */}

            <div className="pt-4 text-center md:pt-0">

              <AnimatedNumber
                value={98}
                suffix="%"
              />

              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#6B7280] sm:text-xs">
                Menos Filas
              </p>

            </div>

            {/* =================================================
                CONSULTAS
            ================================================= */}

            <div className="pt-4 text-center md:pt-0">

              {/* 24/7 SE MANTIENE EXACTAMENTE IGUAL */}

              <div className="text-2xl font-extrabold text-[#00A8A8] sm:text-4xl">
                24/7
              </div>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#6B7280] sm:text-xs">
                Consultas Disponibles
              </p>

            </div>

          </div>
        </div>

        {/* =================================================
            DESCRIPCIÓN
        ================================================= */}

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-[#6B7280] sm:mt-10 sm:text-lg">
          Lee las experiencias reales de pacientes y profesionales de la salud
          que ya transformaron su acceso a medicamentos con FarmaSync.
        </p>

        {/* =================================================
            TESTIMONIOS
        ================================================= */}

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">

          <Testimonial
            text="Excelente plataforma. Antes perdía horas haciendo filas en la farmacia solo para que me dijeran que no había stock. Ahora reservo desde casa."
            name="Carlos Mendoza"
            role="Paciente EPS"
          />

          <Testimonial
            text="Como regente de farmacia, FarmaSync nos ha ayudado a organizar mejor el inventario y reducir las aglomeraciones. El flujo de trabajo mejoró un 100%."
            name="Diana Restrepo"
            role="Regente de Farmacia"
          />

          <Testimonial
            text="Me encanta la sección de notificaciones. Me avisa exactamente cuándo puedo ir a recoger mis medicamentos crónicos sin contratiempos."
            name="Andrés Felipe G."
            role="Usuario Frecuente"
          />

        </div>

      </div>
    </section>
  );
}