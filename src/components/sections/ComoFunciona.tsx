"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Search,
  Clock,
  MapPin,
  Bell,
  ShieldCheck,
} from "lucide-react";

/* =========================================================
   PASO
========================================================= */

function Step({
  number,
  title,
  text,
  isVisible,
}: {
  number: string;
  title: string;
  text: string;
  isVisible: boolean;
}) {
  return (
    <div
      className={`
        group
        relative
        flex
        items-start
        gap-3.5
        overflow-hidden
        rounded-2xl
        border
        border-[#DCEEEE]
        bg-white
        p-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#00A8A8]
        hover:shadow-md
        sm:gap-6
        sm:p-6
        ${isVisible ? "hero-slide-in" : "opacity-0"}
      `}
    >
      <span
        className="
          absolute
          left-0
          top-0
          h-full
          w-1
          origin-top
          scale-y-0
          bg-[#00A8A8]
          transition-transform
          duration-200
          group-hover:scale-y-100
        "
      />

      <div
        className="
          min-w-8
          text-xl
          font-extrabold
          text-[#00A8A8]
          sm:text-3xl
        "
      >
        {number}
      </div>

      <div>
        <h3
          className="
            mb-0.5
            text-sm
            font-bold
            text-[#171717]
            sm:mb-1
            sm:text-lg
          "
        >
          {title}
        </h3>

        <p
          className="
            text-xs
            leading-relaxed
            text-[#536078]
            sm:text-sm
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   BENEFICIO
========================================================= */

function WorkflowBenefit({
  icon,
  text,
  isVisible,
}: {
  icon: ReactNode;
  text: string;
  isVisible: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-center
        gap-2
        rounded-full
        border
        border-[#DCEEEE]
        bg-white
        px-3.5
        py-2
        text-xs
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#00A8A8]
        hover:shadow-md
        sm:text-sm
        ${isVisible ? "hero-text-in" : "opacity-0"}
      `}
    >
      <span className="text-[#00A8A8]">{icon}</span>
      <span className="font-medium text-[#171717]">{text}</span>
    </div>
  );
}

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export default function ComoFunciona() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Dispara la animación una sola vez al entrar en la pantalla
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15, // Se activa cuando el 15% de la sección es visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="como_funciona"
      className="
        bg-white
        px-4
        py-12
        sm:px-6
        sm:py-24
        lg:px-8
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* ENCABEZADO */}
        <div
          className={`mb-12 text-center sm:mb-16 ${
            isVisible ? "hero-text-in" : "opacity-0"
          }`}
        >
          <span
            className="
              mb-2
              inline-block
              rounded-full
              bg-[#00A8A8]/10
              px-3.5
              py-1
              text-xs
              font-semibold
              text-[#00A8A8]
              sm:mb-3
              sm:px-4
              sm:py-1.5
              sm:text-sm
            "
          >
            ¿Cómo funciona?
          </span>

          <h2
            className="
              mb-3
              text-2xl
              font-extrabold
              tracking-tight
              text-[#171717]
              sm:mb-4
              sm:text-4xl
              lg:text-5xl
            "
          >
            Tu medicamento en solo 5 pasos
          </h2>

          <p
            className="
              mx-auto
              max-w-xl
              text-sm
              text-[#536078]
              sm:text-base
            "
          >
            Consulta disponibilidad, reserva y recibe notificaciones desde una
            sola plataforma.
          </p>
        </div>

        {/* CONTENIDO */}
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-8
            sm:gap-12
            lg:grid-cols-2
          "
        >

          {/* MOCKUP TELÉFONO */}
          <div
            className={`flex justify-center ${
              isVisible ? "hero-slide-in" : "opacity-0"
            }`}
          >
            <div
              className="
                animate-float
                w-full
                max-w-xs
                rounded-3xl
                border
                border-[#DCEEEE]
                bg-white
                p-5
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                sm:max-w-sm
                sm:p-8
              "
            >
              <div
                className="
                  mb-5
                  text-center
                  text-lg
                  font-bold
                  text-[#171717]
                  sm:mb-6
                  sm:text-xl
                "
              >
                FarmaSync
              </div>

              {/* Buscador */}
              <div
                className="
                  mb-3.5
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  bg-[#EAF8F7]
                  p-3.5
                  sm:mb-4
                  sm:p-4
                "
              >
                <Search size={18} className="shrink-0 text-[#00A8A8]" />
                <span className="text-xs font-medium sm:text-sm">
                  Paracetamol
                </span>
              </div>

              {/* Disponibilidad */}
              <div
                className="
                  mb-3.5
                  rounded-xl
                  border
                  border-[#DCEEEE]
                  p-3.5
                  sm:mb-4
                  sm:p-4
                "
              >
                <h4 className="text-sm font-bold sm:text-base">
                  Disponible
                </h4>
                <p className="mt-0.5 text-xs text-gray-500">
                  Farmacia Central
                </p>
                <span className="mt-2 block text-xs font-semibold text-green-600">
                  ✓ En stock
                </span>
              </div>

              {/* Reserva */}
              <div
                className="
                  rounded-xl
                  border
                  border-[#DCEEEE]
                  p-3.5
                  sm:p-4
                "
              >
                <h4 className="text-sm font-bold sm:text-base">
                  Reserva creada
                </h4>
                <p className="mt-0.5 text-xs text-gray-500">
                  Código: FS-2481
                </p>
              </div>
            </div>
          </div>

          {/* LISTA DE PASOS */}
          <div className="flex flex-col gap-3.5 sm:gap-4">
            <Step
              number="01"
              title="Busca tu medicamento"
              text="Consulta la disponibilidad exacta en tiempo real antes de salir de tu hogar."
              isVisible={isVisible}
            />
            <Step
              number="02"
              title="Encuentra una farmacia"
              text="Visualiza los puntos de distribución de tu EPS que cuentan con el stock necesario."
              isVisible={isVisible}
            />
            <Step
              number="03"
              title="Realiza tu reserva"
              text="Aparta tus fármacos de forma digital con un solo toque de manera inmediata."
              isVisible={isVisible}
            />
            <Step
              number="04"
              title="Recibe confirmación"
              text="Obtén un código QR único de reserva y alertas automáticas sobre su estado."
              isVisible={isVisible}
            />
            <Step
              number="05"
              title="Recoge tu medicamento"
              text="Presenta tu comprobante digital en la ventanilla rápida y retira sin filas."
              isVisible={isVisible}
            />
          </div>
        </div>

        {/* BENEFICIOS */}
        <div
          className="
            mt-10
            flex
            flex-wrap
            justify-center
            gap-2.5
            sm:mt-12
            sm:gap-5
          "
        >
          <WorkflowBenefit
            icon={<Clock size={16} />}
            text="Ahorra tiempo"
            isVisible={isVisible}
          />
          <WorkflowBenefit
            icon={<MapPin size={16} />}
            text="Menos desplazamientos"
            isVisible={isVisible}
          />
          <WorkflowBenefit
            icon={<Bell size={16} />}
            text="Notificaciones automáticas"
            isVisible={isVisible}
          />
          <WorkflowBenefit
            icon={<ShieldCheck size={16} />}
            text="Proceso seguro"
            isVisible={isVisible}
          />
        </div>
      </div>
    </section>
  );
}