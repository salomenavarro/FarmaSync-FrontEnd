import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";

import ReservasContent from "@/features/reservas/components/ReservasContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mis reservas | FarmaSync",
  description:
    "Consulta, administra y realiza el seguimiento de tus reservas de medicamentos.",
};

function ReservasLoading() {
  return (
    <div
      role="status"
      className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-[24px] border border-[#E0E8F3] bg-white"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F1FF] text-[#0755D8]">
        <LoaderCircle
          size={32}
          className="animate-spin"
          aria-hidden="true"
        />
      </div>

      <div className="text-center">
        <h2 className="text-base font-bold text-[#14285B]">
          Cargando tus reservas
        </h2>

        <p className="mt-1 text-sm text-[#64748B]">
          Estamos preparando tu información.
        </p>
      </div>
    </div>
  );
}

export default function ReservasPage() {
  const fechaInicial = Date.now();

  return (
    <Suspense fallback={<ReservasLoading />}>
      <ReservasContent fechaInicial={fechaInicial} />
    </Suspense>
  );
}