import Link from "next/link";
import { Heart, Search, ArrowRight } from "lucide-react";

import BannerWaves from "@/components/layout/BannerWaves";

// =========================================================
// ENCABEZADO DE MIS MEDICAMENTOS
// =========================================================

export default function MisMedicamentosHeader() {
  return (
    <section
      className="
        relative isolate flex min-h-[150px]
        shrink-0 items-center overflow-hidden
        rounded-[24px]
        bg-gradient-to-r
        from-[#0B1F5C] via-[#0755D8] to-[#0876E9]
        px-5 py-4 text-white
        shadow-[0_10px_25px_rgba(5,91,210,0.18)]
        sm:px-8 lg:min-h-[186px]
      "
    >
      {/* ONDAS DECORATIVAS */}

      <BannerWaves />

      <div className="relative z-10 flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        {/* INFORMACIÓN PRINCIPAL */}

        <div className="min-w-0">

          {/* ETIQUETA SUPERIOR */}

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
            <Heart size={15} aria-hidden="true" />

            <span className="text-xs font-semibold">
              Medicamentos favoritos
            </span>
          </div>

          {/* TÍTULO */}

          <h1 className="text-[26px] font-extrabold tracking-tight sm:text-[30px]">
            Mis medicamentos
          </h1>

          {/* DESCRIPCIÓN */}

          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-[#E1EDFF] sm:text-sm">
            Organiza tus medicamentos favoritos, consulta su
            disponibilidad en las diferentes sedes y encuentra
            fácilmente los que necesitas.
          </p>
        </div>

        {/* BOTÓN DE BÚSQUEDA */}

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
          <Search size={18} aria-hidden="true" />

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