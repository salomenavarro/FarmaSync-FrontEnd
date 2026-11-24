import { CalendarDays, ShieldCheck } from "lucide-react";
import BannerWaves from "@/components/layout/BannerWaves";

// =========================================================
// TIPOS
// =========================================================

type AdminHeaderProps = {
  nombre: string;
};

// =========================================================
// ENCABEZADO DEL DASHBOARD ADMINISTRATIVO
// =========================================================

export default function AdminHeader({
  nombre,
}: AdminHeaderProps) {
  const fechaActual = new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Bogota",
  }).format(new Date());

  const primerNombre =
    nombre.trim().split(/\s+/)[0] || "Administrador";

  return (
    <section
      className="
        relative isolate overflow-hidden
        rounded-[24px]
        bg-gradient-to-r
        from-[#0B1F5C]
        via-[#0755D8]
        to-[#0876E9]
        px-5 py-5
        text-white
        shadow-[0_8px_25px_rgba(7,85,216,0.15)]
        sm:px-7
      "
    >
      {/* DECORACIONES DEL ENCABEZADO */}

      <BannerWaves />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* INFORMACIÓN PRINCIPAL */}

        <div className="min-w-0">

          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
            <ShieldCheck
              size={15}
              aria-hidden="true"
            />

            <span className="text-xs font-semibold">
              Panel de control EPS
            </span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight sm:text-[28px]">
            Hola, {primerNombre}
          </h1>

          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[#E1EDFF]">
            Gestiona tu equipo, supervisa la disponibilidad
            de medicamentos y monitorea el rendimiento
            de las sedes de farmacia.
          </p>

        </div>

        {/* FECHA ACTUAL */}

        <div className="flex w-fit shrink-0 items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <CalendarDays
              size={21}
              aria-hidden="true"
            />
          </span>

          <div>
            <p className="text-xs text-[#D5E5FF]">
              Fecha actual
            </p>

            <p className="mt-0.5 text-sm font-semibold capitalize">
              {fechaActual}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}