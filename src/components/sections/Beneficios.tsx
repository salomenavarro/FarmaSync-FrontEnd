import {
  Search,
  CalendarCheck,
  Bell,
  Clock,
  Pill,
  ShieldCheck,
} from "lucide-react";

import type { ReactNode } from "react";

function BenefitCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article
      className="
        relative
        rounded-2xl
        border
        border-[#DCEEEE]
        border-t-4
        border-t-[#00A8A8]
        bg-white
        px-5
        pb-6
        pt-10
        text-center
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
        sm:px-6
        sm:pb-8
        sm:pt-12
      "
    >
      <div
        className="
          absolute
          left-1/2
          top-0
          z-10
          flex
          h-12
          w-12
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-[#00A8A8]
          text-white
          shadow-md
          sm:h-16
          sm:w-16
        "
      >
        {icon}
      </div>

      <h3 className="text-lg font-bold text-[#171717] sm:text-xl">
        {title}
      </h3>

      <p className="mt-3 text-xs leading-relaxed text-[#70798B] sm:mt-4 sm:text-base">
        {text}
      </p>
    </article>
  );
}

export default function Beneficios() {
  return (
    <section
      id="beneficios"
      className="bg-white px-4 py-12 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#171717] sm:text-4xl lg:text-5xl">
            Beneficios de FarmaSync
          </h2>

          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#00A8A8] sm:mt-4 sm:w-16" />

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#6B7280] sm:mt-6 sm:text-lg">
            Facilitamos el acceso a tus medicamentos y servicios de salud de
            manera eficiente y segura.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 pt-4 sm:grid-cols-2 sm:gap-8 sm:pt-6 lg:grid-cols-3">
          <BenefitCard
            icon={
              <Search
                className="h-6 w-6 sm:h-8 sm:w-8"
                strokeWidth={2.5}
              />
            }
            title="Consulta en tiempo real"
            text="Olvídate de recorrer múltiples farmacias a ciegas. Nuestra plataforma te permite verificar la disponibilidad exacta de tus medicamentos en tiempo real desde cualquier dispositivo."
          />

          <BenefitCard
            icon={
              <CalendarCheck
                className="h-6 w-6 sm:h-8 sm:w-8"
                strokeWidth={2.5}
              />
            }
            title="Reserva anticipada"
            text="Con tan solo unos pocos clics, puedes apartar los fármacos que necesitas de manera inmediata."
          />

          <BenefitCard
            icon={
              <Bell
                className="h-6 w-6 sm:h-8 sm:w-8"
                strokeWidth={2.5}
              />
            }
            title="Notificaciones"
            text="Mantente siempre informado. Recibe avisos automáticos directamente en tu dispositivo sobre el estado de tus reservas y si un medicamento de alta demanda vuelve a estar disponible."
          />

          <BenefitCard
            icon={
              <Clock
                className="h-6 w-6 sm:h-8 sm:w-8"
                strokeWidth={2.5}
              />
            }
            title="Menos espera"
            text="Reduce el tiempo de búsqueda y evita filas innecesarias para obtener tus medicamentos de manera más rápida y eficiente."
          />

          <BenefitCard
            icon={
              <Pill
                className="h-6 w-6 sm:h-8 sm:w-8"
                strokeWidth={2.5}
              />
            }
            title="Acceso oportuno"
            text="Mejora la continuidad de tus tratamientos médicos teniendo tus medicamentos disponibles cuando realmente los necesitas."
          />

          <BenefitCard
            icon={
              <ShieldCheck
                className="h-6 w-6 sm:h-8 sm:w-8"
                strokeWidth={2.5}
              />
            }
            title="Seguridad"
            text="Protegemos tu información personal y médica mediante un proceso diseñado para ofrecerte confianza y tranquilidad."
          />
        </div>
      </div>
    </section>
  );
}