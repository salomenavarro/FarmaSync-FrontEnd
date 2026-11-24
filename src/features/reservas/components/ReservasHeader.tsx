import Link from "next/link";
import { CalendarCheck, Search, ArrowRight } from "lucide-react";
import BannerWaves from "@/components/layout/BannerWaves";

export default function ReservasHeader() {
  return (
    <section
      className="
        relative isolate flex min-h-[150px]
        shrink-0 items-center overflow-hidden
        rounded-[24px]
        bg-gradient-to-r
        from-[#0B1F5C]
        via-[#0755D8]
        to-[#0876E9]
        px-5 py-4 text-white
        shadow-[0_10px_25px_rgba(5,91,210,0.18)]
        sm:px-8 lg:min-h-[186px]
      "
    >
      {/* Ondas decorativas reutilizables */}
      <BannerWaves />

      <div className="relative z-10 flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        {/* Información principal */}
        <div className="min-w-0">

          {/* Etiqueta superior */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
            <CalendarCheck
              size={15}
              aria-hidden="true"
            />

            <span className="text-xs font-semibold">
              Gestión de medicamentos
            </span>
          </div>

          {/* Título */}
          <h1 className="text-[26px] font-extrabold tracking-tight sm:text-[30px]">
            Mis reservas
          </h1>

          {/* Descripción */}
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-[#E1EDFF] sm:text-sm">
            Consulta, organiza y realiza el seguimiento de tus
            reservas de medicamentos y las de tu grupo familiar,
            todo en un mismo lugar.
          </p>
        </div>

        {/* Botón para buscar medicamentos */}
        <Link
          href="/medicamentos"
          className="
            group inline-flex w-fit shrink-0
            items-center justify-center gap-2.5
            rounded-xl bg-white px-4 py-3
            text-sm font-bold text-[#0755D8]
            shadow-sm transition-all duration-200
            hover:bg-[#E8F1FF]
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-white
            sm:ml-auto
          "
        >
          <Search
            size={18}
            aria-hidden="true"
          />

          <span>Buscar medicamentos</span>

          <ArrowRight
            size={17}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}