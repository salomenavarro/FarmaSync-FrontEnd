"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DecorativeBackground from "../DecorativeBackground";

/* =========================================================
   CONTADOR ANIMADO
========================================================= */

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 2500,
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

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOut * value));

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
        transition-all
        duration-700
        ease-out
        sm:text-4xl
        ${finished ? "scale-100 opacity-100" : "scale-95 opacity-90"}
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
  isVisible,
  delayStyle = {},
}: {
  text: string;
  name: string;
  role: string;
  image?: string;
  isVisible: boolean;
  delayStyle?: React.CSSProperties;
}) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <article
      style={delayStyle}
      className={`
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
        duration-1000
        ease-in-out
        hover:-translate-y-1
        hover:shadow-md
        sm:p-6
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-16 opacity-0"
        }
      `}
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="prueba_social"
      className="
        relative
        overflow-hidden
        bg-[#e8f0ec]
        px-4
        py-12
        sm:px-6
        sm:py-24
        lg:px-8
      "
    >

      {/* =================================================
          FONDO DECORATIVO DEL HERO
      ================================================= */}

      <DecorativeBackground variant="section" />

      {/* =================================================
          CONTENIDO
      ================================================= */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ENCABEZADO */}

        <div
          className={`mb-10 text-center transition-all duration-1000 ease-in-out sm:mb-12 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
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

        <div
          style={{
            transitionDuration: "2500ms",
            transitionTimingFunction:
              "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "100ms",
          }}
          className={`mx-auto max-w-4xl rounded-2xl border border-[#DCEEEE] bg-white p-5 shadow-sm transition-all md:rounded-full sm:p-6 ${
            isVisible
              ? "scale-100 opacity-100"
              : "scale-50 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 divide-y divide-[#E5E7EB] md:grid-cols-3 md:divide-x md:divide-y-0">

            <div className="pt-2 text-center md:pt-0">
              <AnimatedNumber
                value={1000}
                prefix="+"
                duration={2500}
              />

              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#6B7280] sm:text-xs">
                Usuarios Satisfechos
              </p>
            </div>

            <div className="pt-4 text-center md:pt-0">
              <AnimatedNumber
                value={98}
                suffix="%"
                duration={2500}
              />

              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#6B7280] sm:text-xs">
                Menos Filas
              </p>
            </div>

            <div className="pt-4 text-center md:pt-0">
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

        <p
          style={{ transitionDelay: "500ms" }}
          className={`mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-[#6B7280] transition-all duration-1000 ease-in-out sm:mt-10 sm:text-lg ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
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
            isVisible={isVisible}
            delayStyle={{
              transitionDelay: "700ms",
            }}
          />

          <Testimonial
            text="Como regente de farmacia, FarmaSync nos ha ayudado a organizar mejor el inventario y reducir las aglomeraciones. El flujo de trabajo mejoró un 100%."
            name="Diana Restrepo"
            role="Regente de Farmacia"
            isVisible={isVisible}
            delayStyle={{
              transitionDelay: "900ms",
            }}
          />

          <Testimonial
            text="Me encanta la sección de notificaciones. Me avisa exactamente cuándo puedo ir a recoger mis medicamentos crónicos sin contratiempos."
            name="Andrés Felipe G."
            role="Usuario Frecuente"
            isVisible={isVisible}
            delayStyle={{
              transitionDelay: "1100ms",
            }}
          />

        </div>

      </div>
    </section>
  );
}