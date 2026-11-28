import { ClipboardList, PackageCheck } from "lucide-react";
import BannerWaves from "@/components/layout/BannerWaves";

export default function SolicitudesHeader() {
  return (
    <header
      className="
        relative isolate flex min-h-[150px] shrink-0
        items-center overflow-hidden rounded-[24px]
        bg-gradient-to-r from-[#0B1F5C] via-[#0755D8]
        to-[#0876E9] px-5 py-5 text-white
        shadow-[0_10px_25px_rgba(5,91,210,0.18)]
        sm:px-8 lg:min-h-[166px]
      "
    >
      {/* Decoración compartida */}
      <BannerWaves />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-2xl">
        <div
          className="
            mb-3 inline-flex items-center gap-2
            rounded-full border border-white/20
            bg-white/10 px-3 py-1.5
            text-xs font-medium
          "
        >
          <ClipboardList
            size={14}
            aria-hidden="true"
          />

          FarmaSync · Gestión farmacéutica
        </div>

        <h1
          className="
            text-2xl font-bold tracking-tight
            sm:text-3xl lg:text-[32px]
          "
        >
          Solicitudes de medicamentos
        </h1>

        <p
          className="
            mt-2 max-w-xl text-sm leading-relaxed
            text-blue-50 sm:text-[15px]
          "
        >
          Consulta, organiza y prioriza las reservas de tu
          sede para facilitar el alistamiento y la entrega
          oportuna de medicamentos.
        </p>
      </div>

      {/* Decoración derecha */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute right-10
          top-1/2 hidden -translate-y-1/2
          lg:flex
        "
      >
        <div
          className="
            relative flex h-28 w-28 items-center
            justify-center rounded-[28px]
            border border-white/20 bg-white/10
          "
        >
          <ClipboardList
            size={58}
            strokeWidth={1.3}
            className="text-white/90"
          />

          <div
            className="
              absolute -bottom-2 -right-2
              flex h-11 w-11 items-center
              justify-center rounded-2xl
              border border-white/30
              bg-[#438DEB]
            "
          >
            <PackageCheck
              size={24}
              strokeWidth={1.7}
            />
          </div>
        </div>
      </div>
    </header>
  );
}