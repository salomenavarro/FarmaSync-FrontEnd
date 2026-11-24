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
      {/* DECORACIONES DEL ENCABEZADO */}

      <BannerWaves />

      <div className="relative z-10 flex w-full flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* INFORMACIÓN PRINCIPAL */}

        <div className="min-w-0">

          {/* ETIQUETA SUPERIOR */}

          <div
            className="
              mb-3 inline-flex items-center gap-2
              rounded-full border border-white/20
              bg-white/10 px-3 py-1.5
            "
          >
            <ShieldCheck
              size={15}
              aria-hidden="true"
            />

            <span className="text-xs font-semibold">
              Panel de control EPS
            </span>
          </div>

          {/* SALUDO PERSONALIZADO */}

          <h1
            className="
              text-[26px] font-extrabold
              tracking-tight sm:text-[30px]
            "
          >
            Hola, {primerNombre}
          </h1>

          {/* DESCRIPCIÓN */}

          <p
            className="
              mt-2 max-w-xl text-[13px]
              leading-relaxed text-[#E1EDFF]
              sm:text-sm
            "
          >
            Gestiona tu equipo, supervisa la disponibilidad
            de medicamentos y monitorea el rendimiento
            de las sedes de farmacia.
          </p>

        </div>

        {/* FECHA ACTUAL */}

        <div
          className="
            flex w-fit max-w-full shrink-0
            items-center gap-3
            rounded-2xl border border-white/20
            bg-white/10 px-4 py-3
            backdrop-blur-sm lg:ml-auto
          "
        >
          <span
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl bg-white/15
            "
          >
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