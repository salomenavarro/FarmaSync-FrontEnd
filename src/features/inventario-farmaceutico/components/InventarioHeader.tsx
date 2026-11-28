import { Boxes, Package, ScanBarcode } from "lucide-react";

import BannerWaves from "@/components/layout/BannerWaves";

export default function InventarioHeader() {
  return (
    <section
      aria-labelledby="inventario-titulo"
      className="relative isolate flex min-h-[150px] shrink-0 items-center overflow-hidden rounded-[24px] bg-gradient-to-r from-[#0B1F5C] via-[#0755D8] to-[#0876E9] px-5 py-5 text-white shadow-[0_10px_25px_rgba(5,91,210,0.18)] sm:px-8 lg:min-h-[166px]"
    >
      <BannerWaves />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-[720px] 2xl:max-w-[65%]">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold">
          <Boxes size={15} aria-hidden="true" />
          FarmaSync · Gestión farmacéutica
        </div>

        <h1
          id="inventario-titulo"
          className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-[32px]"
        >
          Inventario de medicamentos
        </h1>

        <p className="mt-2 max-w-[620px] text-sm leading-relaxed text-blue-50 sm:text-[15px]">
          Consulta las existencias de tu sede, identifica
          medicamentos con stock bajo y gestiona el ingreso
          de nuevas unidades.
        </p>
      </div>

      {/* Ilustración decorativa */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-12 top-1/2 hidden -translate-y-1/2 items-center justify-center 2xl:flex"
      >
        <div className="relative flex h-28 w-40 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex h-24 w-24 -rotate-6 items-center justify-center rounded-[24px] border border-white/30 bg-white/15 shadow-xl backdrop-blur-sm">
            <Boxes size={53} strokeWidth={1.5} />
          </div>

          <div className="absolute -right-1 -top-1 flex h-12 w-12 rotate-12 items-center justify-center rounded-2xl border border-white/30 bg-[#418EF1] shadow-lg">
            <Package size={26} strokeWidth={1.8} />
          </div>

          <div className="absolute -bottom-1 left-0 flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-[#418EF1] shadow-lg">
            <ScanBarcode size={25} strokeWidth={1.8} />
          </div>
        </div>
      </div>
    </section>
  );
}