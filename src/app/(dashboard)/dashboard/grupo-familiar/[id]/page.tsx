
import Link from "next/link";

export default function DependienteDetallePage() {
  return (
    <main className="min-h-full bg-[#F5F9FF] p-6">
      <div className="rounded-2xl border border-[#DCE8F7] bg-white p-6">
        <h1 className="text-2xl font-extrabold text-[#14285B]">
          Detalle del dependiente
        </h1>

        <p className="mt-3 text-sm text-[#526783]">
          Próximamente podrás consultar aquí la información
          del familiar y sus reservas de medicamentos.
        </p>

        <Link
          href="/dashboard/grupo-familiar"
          className="mt-5 inline-block rounded-xl bg-[#0755D8] px-4 py-2.5 text-sm font-bold text-white"
        >
          Volver a Mi Grupo Familiar
        </Link>
      </div>
    </main>
  );
}
