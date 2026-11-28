import { UserRound, ShieldCheck } from "lucide-react";
import BannerWaves from "@/components/layout/BannerWaves";

export default function PerfilHeader() {
  return (
    <section className="relative isolate flex min-h-[140px] shrink-0 items-center overflow-hidden rounded-[24px] bg-gradient-to-r from-[#0B1F5C] via-[#0755D8] to-[#0876E9] px-5 py-3 text-white shadow-[0_10px_25px_rgba(5,91,210,0.18)] sm:px-8 lg:min-h-[150px]">
      <BannerWaves />

      {/* Contenido del encabezado */}

      <div className="relative flex w-full items-center justify-between gap-5">
        <div className="min-w-0">

          {/* Etiqueta superior */}

          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1">
            <UserRound size={15} aria-hidden="true" />

            <span className="text-xs font-semibold">
              FarmaSync · Tu cuenta
            </span>
          </div>

          {/* Título */}

          <h1 className="text-[26px] font-extrabold tracking-tight sm:text-[30px]">
            Mi perfil
          </h1>

          {/* Descripción */}

          <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-[#E1EDFF] sm:text-sm">
            Administra tu información personal y configura
            la seguridad de tu cuenta desde un solo lugar.
          </p>
        </div>

        {/* Elemento decorativo */}

        <div
          aria-hidden="true"
          className="relative mr-5 hidden h-24 w-24 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 lg:flex"
        >
          <div className="absolute inset-2 rounded-full border border-white/15" />

          <ShieldCheck
            size={44}
            strokeWidth={1.5}
            className="text-white"
          />
        </div>
      </div>
    </section>
  );
}