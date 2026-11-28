import {
  PackageCheck,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react";

import BannerWaves from "@/components/layout/BannerWaves";

export default function EntregasHeader() {
  return (
    <section
      aria-labelledby="entregas-titulo"
      className="relative isolate flex min-h-[150px] shrink-0 items-center overflow-hidden rounded-[24px] bg-gradient-to-r from-[#0B1F5C] via-[#0755D8] to-[#0876E9] px-5 py-5 text-white shadow-[0_10px_25px_rgba(5,91,210,0.18)] sm:px-8 lg:min-h-[166px]"
    >
      {/* DECORACIONES DE FONDO */}

      <BannerWaves />

      {/* CONTENIDO PRINCIPAL */}

      <div className="relative z-10 w-full 2xl:max-w-[75%]">

        {/* IDENTIFICADOR DEL MÓDULO */}

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium backdrop-blur-sm sm:text-xs">
          <PackageCheck
            size={14}
            aria-hidden="true"
          />

          FarmaSync · Gestión farmacéutica
        </div>

        {/* TÍTULO */}

        <h1
          id="entregas-titulo"
          className="text-[25px] font-bold leading-tight tracking-tight sm:text-[30px] lg:text-[32px]"
        >
          Entrega de medicamentos
        </h1>

        {/* DESCRIPCIÓN */}

        <p className="mt-2 max-w-[650px] text-sm leading-relaxed text-blue-50 sm:text-[15px]">
          Consulta las reservas, verifica la información del
          paciente y del medicamento, y realiza el seguimiento
          de las entregas de tu sede.
        </p>
      </div>

      {/* ILUSTRACIÓN DECORATIVA */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center 2xl:flex"
      >
        <div className="relative flex h-[120px] w-[120px] items-center justify-center">

          {/* CÍRCULOS DECORATIVOS */}

          <div className="absolute inset-0 rounded-full border border-white/15 bg-white/5" />

          <div className="absolute inset-3 rounded-full border border-white/20 bg-white/10" />

          {/* ICONO PRINCIPAL */}

          <PackageCheck
            size={64}
            strokeWidth={1.4}
            className="relative text-white"
          />

          {/* ICONO DE VERIFICACIÓN */}

          <div className="absolute -right-2 top-1 flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-[#398AF2] shadow-lg">
            <ClipboardCheck
              size={21}
              strokeWidth={1.8}
            />
          </div>

          {/* ICONO DE SEGURIDAD */}

          <div className="absolute -bottom-1 -left-2 flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-[#1766D5] shadow-lg">
            <ShieldCheck
              size={21}
              strokeWidth={1.8}
            />
          </div>
        </div>
      </div>
    </section>
  );
}