import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-8 px-6 py-12">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">FarmaSync</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">Consulta antes de desplazarte.</h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Base inicial de la plataforma para consultar disponibilidad y gestionar reservas de medicamentos.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link className="rounded-md bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800" href="/login">
          Iniciar sesión
        </Link>
        <Link className="rounded-md border border-slate-300 px-4 py-2 font-medium text-slate-800 hover:bg-slate-50" href="/registro">
          Crear cuenta
        </Link>
      </div>
    </main>
  );
}
