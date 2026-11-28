"use client";

import {
  ShieldCheck,
  LockKeyhole,
  CircleCheck,
  ChevronRight,
  LogOut,
} from "lucide-react";

import LogoutButton from "@/features/auth/components/LogoutButton";

interface SeguridadViewProps {
  onCambiarPassword: () => void;
}

const RECOMENDACIONES = [
  "Utiliza una contraseña segura y única para tu cuenta.",
  "No compartas tus credenciales de acceso con otras personas.",
  "Cierra sesión cuando utilices dispositivos compartidos.",
  "Evita ingresar a tu cuenta desde enlaces desconocidos.",
];

export default function SeguridadView({
  onCambiarPassword,
}: SeguridadViewProps) {
  return (
    <div className="space-y-3">

      {/* Seguridad de la cuenta */}
      <section className="rounded-[20px] border border-[#DCE4EF] bg-white p-5 shadow-sm sm:p-6">

        {/* Encabezado */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#0755D8]">
            <ShieldCheck
              size={26}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="text-base font-bold text-[#14285B] sm:text-lg">
              Seguridad de la cuenta
            </h2>

            <p className="mt-1 text-xs text-[#64748B] sm:text-sm">
              Administra y protege el acceso a tu cuenta.
            </p>
          </div>
        </div>

        <div className="my-5 border-t border-[#E8EDF4]" />

        {/* Cambiar contraseña */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E8EDF4] bg-[#F8FAFC] p-4">

          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#0755D8]">
              <LockKeyhole
                size={22}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-[#14285B]">
                Cambiar contraseña
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                Actualiza tu contraseña de acceso a FarmaSync.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCambiarPassword}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#D6E5FF] bg-[#EAF2FF] px-4 py-2.5 text-xs font-semibold text-[#0755D8] transition-colors hover:bg-[#DCEAFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D8] focus-visible:ring-offset-2 sm:w-auto sm:text-sm"
          >
            Cambiar contraseña

            <ChevronRight
              size={16}
              aria-hidden="true"
            />
          </button>
        </div>
      </section>

      {/* Recomendaciones de seguridad */}
      <section className="rounded-[20px] border border-[#DCE4EF] bg-white p-5 shadow-sm sm:p-6">

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#0755D8]">
            <ShieldCheck
              size={23}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="text-base font-bold text-[#14285B]">
              Recomendaciones de seguridad
            </h2>

            <p className="mt-1 text-xs text-[#64748B] sm:text-sm">
              Pequeñas acciones para proteger tu información.
            </p>
          </div>
        </div>

        <div className="my-4 border-t border-[#E8EDF4]" />

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {RECOMENDACIONES.map((recomendacion) => (
            <li
              key={recomendacion}
              className="flex items-start gap-2.5 rounded-xl bg-[#F8FAFC] p-3"
            >
              <CircleCheck
                size={18}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-[#059669]"
                aria-hidden="true"
              />

              <span className="text-xs leading-relaxed text-[#475569] sm:text-sm">
                {recomendacion}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Cierre de sesión */}
      <section className="rounded-[20px] border border-[#DCE4EF] bg-white p-5 shadow-sm sm:p-6">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FEF2F2] text-[#DC2626]">
              <LogOut
                size={22}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>

            <div>
              <h2 className="text-sm font-bold text-[#14285B]">
                Cerrar sesión
              </h2>

              <p className="mt-1 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                Finaliza tu sesión actual de forma segura.
              </p>
            </div>
          </div>

          <LogoutButton
            iconSize={17}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-[#DC2626] transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:w-auto"
          />
        </div>
      </section>
    </div>
  );
}