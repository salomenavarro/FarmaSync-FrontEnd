import { Bell, BellRing } from "lucide-react";
import BannerWaves from "@/components/layout/BannerWaves";

export default function NotificacionesHeader() {
  return (
    <section className="relative isolate flex min-h-[150px] shrink-0 items-center overflow-hidden rounded-[24px] bg-gradient-to-r from-[#0B1F5C] via-[#0755D8] to-[#0876E9] px-5 py-4 text-white shadow-[0_10px_25px_rgba(5,91,210,0.18)] sm:px-8 lg:min-h-[186px]">
      <BannerWaves />

      {/* Contenido del encabezado */}
      <div className="relative flex w-full items-center justify-between gap-6">
        <div className="min-w-0">
          {/* Etiqueta superior */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
            <Bell size={15} aria-hidden="true" />

            <span className="text-xs font-semibold">
              FarmaSync · Tu salud al día
            </span>
          </div>

          {/* Título */}
          <h1 className="text-[26px] font-extrabold tracking-tight sm:text-[30px]">
            Notificaciones
          </h1>

          {/* Descripción */}
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-[#E1EDFF] sm:text-sm">
            Mantente informado sobre tus reservas, medicamentos
            y novedades del servicio farmacéutico.
          </p>
        </div>

        {/* Elemento decorativo */}
        <div
          aria-hidden="true"
          className="relative mr-5 hidden h-28 w-28 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 lg:flex"
        >
          <div className="absolute inset-2 rounded-full border border-white/15" />

          <BellRing
            size={52}
            strokeWidth={1.5}
            className="text-white"
          />

          <div className="absolute right-3 top-3 h-3.5 w-3.5 rounded-full border-2 border-[#0876E9] bg-[#6EE7B7]" />
        </div>
      </div>
    </section>
  );
}