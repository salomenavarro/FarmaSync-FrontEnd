"use client";

import {
  UserRound,
  ContactRound,
  Mail,
  Phone,
  Pencil,
  ShieldCheck,
} from "lucide-react";

import type { PerfilPaciente } from "../types";

interface DatosPersonalesViewProps {
  perfil: PerfilPaciente;
  onEditar: () => void;
}

export default function DatosPersonalesView({
  perfil,
  onEditar,
}: DatosPersonalesViewProps) {
  const iniciales = perfil.nombreCompleto
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((nombre) => nombre.charAt(0).toUpperCase())
    .join("");

  const documentoOculto =
    perfil.numeroDocumento.length > 4
      ? `${"•".repeat(
          perfil.numeroDocumento.length - 4
        )}${perfil.numeroDocumento.slice(-4)}`
      : "••••";

  const campos = [
    {
      label: "Nombre completo",
      valor: perfil.nombreCompleto,
      icon: UserRound,
    },
    {
      label: "Documento de identidad",
      valor: documentoOculto,
      icon: ContactRound,
    },
    {
      label: "Correo electrónico",
      valor: perfil.correo,
      icon: Mail,
    },
    {
      label: "Teléfono",
      valor: "No disponible",
      icon: Phone,
    },
  ];

  return (
    <div className="flex min-w-0 flex-col gap-2.5">

      {/* Tarjeta de presentación del paciente */}

      <section className="rounded-[20px] border border-[#DCE4EF] bg-white p-4 shadow-sm sm:px-5 sm:py-3.5">
        <div className="flex items-center gap-4">

          {/* Avatar con iniciales */}

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-[#F5F9FF] bg-[#EAF2FF] text-xl font-extrabold text-[#0755D8] sm:h-16 sm:w-16 sm:text-2xl">
            {iniciales || <UserRound size={26} />}
          </div>

          {/* Información principal */}

          <div className="min-w-0">
            <h2 className="break-words text-lg font-bold leading-tight text-[#14285B] sm:text-xl">
              {perfil.nombreCompleto}
            </h2>

            <p className="mt-0.5 text-sm text-[#64748B]">
              Paciente de FarmaSync
            </p>

            <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#EAF2FF] px-2.5 py-0.5 text-xs font-medium text-[#0755D8]">
              <UserRound size={13} aria-hidden="true" />
              Mi cuenta personal
            </div>
          </div>
        </div>
      </section>

      {/* Información personal */}

      <section className="rounded-[20px] border border-[#DCE4EF] bg-white p-4 shadow-sm sm:p-5">

        {/* Encabezado de la tarjeta */}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-[#14285B] sm:text-lg">
              Información personal
            </h2>

            <p className="mt-0.5 text-xs text-[#64748B] sm:text-sm">
              Consulta los datos asociados a tu cuenta.
            </p>
          </div>

          <button
            type="button"
            onClick={onEditar}
            className="
              inline-flex items-center justify-center gap-2
              rounded-xl border border-[#D6E5FF]
              bg-[#EAF2FF] px-4 py-2
              text-xs font-semibold text-[#0755D8]
              transition-colors hover:bg-[#DCEAFF]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#0755D8]
              focus-visible:ring-offset-2
              sm:text-sm
            "
          >
            <Pencil size={16} aria-hidden="true" />
            Editar perfil
          </button>
        </div>

        {/* Separador */}

        <div className="my-3 border-t border-[#E8EDF4]" />

        {/* Campos de información */}

        <dl className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {campos.map(({ label, valor, icon: Icon }) => (
            <div
              key={label}
              className="min-w-0 rounded-xl border border-[#E8EDF4] bg-[#F8FAFC] px-4 py-2.5"
            >
              <dt className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
                <Icon
                  size={17}
                  strokeWidth={1.8}
                  className="shrink-0 text-[#0755D8]"
                  aria-hidden="true"
                />

                {label}
              </dt>

              <dd className="mt-1.5 break-words text-sm font-semibold text-[#14285B]">
                {valor}
              </dd>
            </div>
          ))}
        </dl>

        {/* Mensaje informativo */}

        <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#D6E5FF] bg-[#EFF6FF] px-3 py-2.5">
          <ShieldCheck
            size={21}
            strokeWidth={1.8}
            className="shrink-0 text-[#0755D8]"
            aria-hidden="true"
          />

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-[#14285B]">
              Protegemos tu información
            </h3>

            <p className="mt-0.5 text-xs leading-relaxed text-[#475569]">
              Mantén tus datos personales actualizados para
              facilitar la gestión de tus servicios en FarmaSync.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}