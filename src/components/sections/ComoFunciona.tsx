"use client";

import {
  Search,
  Clock,
  MapPin,
  Bell,
  ShieldCheck,
} from "lucide-react";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

/* =========================================================
   PASO
========================================================= */

function Step({
  number,
  title,
  text,
  delay,
}: {
  number: string;
  title: string;
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      className="
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
        transition-colors
        duration-300
        hover:border-[#00A8A8]
        sm:gap-6
        sm:p-6
      "
      initial={{
        opacity: 0,
        x: 15,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.05,
      }}
      transition={{
        duration: 0.35,
        delay,
        ease: "easeOut",
      }}
    >
      {/* LÍNEA LATERAL */}

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
          duration-300
          group-hover:scale-y-100
        "
      />

      {/* NÚMERO */}

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

      {/* CONTENIDO */}

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
    </motion.div>
  );
}

/* =========================================================
   BENEFICIO
========================================================= */

function WorkflowBenefit({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div
      className="
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
        sm:text-sm
      "
    >
      <span className="text-[#00A8A8]">
        {icon}
      </span>

      <span className="font-medium text-[#171717]">
        {text}
      </span>
    </div>
  );
}

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export default function ComoFunciona() {
  return (
    <section
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

        {/* =================================================
            ENCABEZADO
        ================================================= */}

        <div className="mb-12 text-center sm:mb-16">

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

          {/* SIN ANIMACIÓN */}

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

        {/* =================================================
            CONTENIDO PRINCIPAL
        ================================================= */}

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

          {/* =================================================
              TELÉFONO
          ================================================= */}

          <motion.div
            className="flex justify-center"
            initial={{
              opacity: 0,
              x: -12,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <div
              className="
                w-full
                max-w-xs
                rounded-3xl
                border
                border-[#DCEEEE]
                bg-white
                p-5
                shadow-xl
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

              {/* BUSCADOR */}

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
                <Search
                  size={18}
                  className="shrink-0 text-[#00A8A8]"
                />

                <span className="text-xs font-medium sm:text-sm">
                  Paracetamol
                </span>
              </div>

              {/* DISPONIBILIDAD */}

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

                <span
                  className="
                    mt-2
                    block
                    text-xs
                    font-semibold
                    text-green-600
                  "
                >
                  ✓ En stock
                </span>
              </div>

              {/* RESERVA */}

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
          </motion.div>

          {/* =================================================
              PASOS
          ================================================= */}

          <div className="flex flex-col gap-3.5 sm:gap-4">

            <Step
              number="01"
              title="Busca tu medicamento"
              text="Consulta la disponibilidad exacta en tiempo real antes de salir de tu hogar."
              delay={0}
            />

            <Step
              number="02"
              title="Encuentra una farmacia"
              text="Visualiza los puntos de distribución de tu EPS que cuentan con el stock necesario."
              delay={0.07}
            />

            <Step
              number="03"
              title="Realiza tu reserva"
              text="Aparta tus fármacos de forma digital con un solo toque de manera inmediata."
              delay={0.14}
            />

            <Step
              number="04"
              title="Recibe confirmación"
              text="Obtén un código QR único de reserva y alertas automáticas sobre su estado."
              delay={0.21}
            />

            <Step
              number="05"
              title="Recoge tu medicamento"
              text="Presenta tu comprobante digital en la ventanilla rápida y retira sin filas."
              delay={0.28}
            />

          </div>

        </div>

        {/* =================================================
            BENEFICIOS
        ================================================= */}

        <motion.div
          className="
            mt-10
            flex
            flex-wrap
            justify-center
            gap-2.5
            sm:mt-12
            sm:gap-5
          "
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.4,
            delay: 0.35,
            ease: "easeOut",
          }}
        >

          <WorkflowBenefit
            icon={<Clock size={16} />}
            text="Ahorra tiempo"
          />

          <WorkflowBenefit
            icon={<MapPin size={16} />}
            text="Menos desplazamientos"
          />

          <WorkflowBenefit
            icon={<Bell size={16} />}
            text="Notificaciones automáticas"
          />

          <WorkflowBenefit
            icon={<ShieldCheck size={16} />}
            text="Proceso seguro"
          />

        </motion.div>

      </div>
    </section>
  );
}