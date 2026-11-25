
"use client";

import Link from "next/link";
import {
  CalendarDays,
  Eye,
  FileText,
  Mail,
  Pencil,
  Trash2,
  UserRound,
} from "lucide-react";

import type { Dependiente } from "../types";
import { formatearFecha, ocultarDocumento } from "../utils";

interface DependienteCardProps {
  dependiente: Dependiente;
  onEdit: (dependiente: Dependiente) => void;
  onDelete: (dependiente: Dependiente) => void;
}

const nombresDocumentos = {
  RC: "Registro Civil",
  TI: "Tarjeta de Identidad",
  CC: "Cédula de Ciudadanía",
};


export default function DependienteCard({
  dependiente,
  onEdit,
  onDelete,
}: DependienteCardProps) {
  const nombreCompleto =
    `${dependiente.nombres} ${dependiente.apellidos}`;

  const estaActivo = dependiente.estado === "Activo";

  return (
    <article className="flex min-w-0 flex-col rounded-[22px] border border-[#D9E7F9] bg-white p-4 shadow-[0_5px_18px_rgba(24,71,135,0.04)] transition hover:border-[#B6D4FA] hover:shadow-md">
      {/* ENCABEZADO */}

      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#0755D8]">
          <UserRound size={25} strokeWidth={1.8} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-extrabold leading-snug text-[#14285B]">
            {nombreCompleto}
          </h3>

          <p className="mt-1 text-[12px] text-[#526783]">
            {dependiente.parentesco}
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
            estaActivo
              ? "bg-[#E0F5E9] text-[#167545]"
              : "bg-[#EDF0F4] text-[#64748B]"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              estaActivo ? "bg-[#18A65C]" : "bg-[#94A3B8]"
            }`}
          />
          {dependiente.estado}
        </span>
      </div>

      {/* INFORMACIÓN */}

      <div className="mt-4 grid flex-1 grid-cols-1 content-start gap-x-4 gap-y-3 sm:grid-cols-2">
        <div className="flex min-w-0 items-start gap-2.5">
          <FileText
            size={17}
            className="mt-0.5 shrink-0 text-[#0755D8]"
          />

          <div className="min-w-0">
            <p className="text-[11px] text-[#71829C]">
              Documento
            </p>

            <p className="text-[12px] font-bold text-[#14285B]">
              {nombresDocumentos[dependiente.tipoDocumento]}
            </p>

            <p className="text-[12px] text-[#526783]">
              {ocultarDocumento(dependiente.numeroDocumento)}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-start gap-2.5">
          <CalendarDays
            size={17}
            className="mt-0.5 shrink-0 text-[#0755D8]"
          />

          <div className="min-w-0">
            <p className="text-[11px] text-[#71829C]">
              Fecha de nacimiento
            </p>

            <p className="text-[12px] font-bold text-[#14285B]">
              {formatearFecha(dependiente.fechaNacimiento)}
            </p>
          </div>
        </div>

        {dependiente.tipoDocumento === "CC" &&
          dependiente.correoElectronico && (
            <div className="flex min-w-0 items-start gap-2.5 sm:col-span-2">
              <Mail
                size={17}
                className="mt-0.5 shrink-0 text-[#0755D8]"
              />

              <div className="min-w-0">
                <p className="text-[11px] text-[#71829C]">
                  Correo electrónico
                </p>

                <p className="break-all text-[12px] font-bold text-[#14285B]">
                  {dependiente.correoElectronico}
                </p>
              </div>
            </div>
          )}
      </div>

      {/* BOTONES */}

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#E7EEF8] pt-3">
        <Link
          href={`/dashboard/grupo-familiar/${dependiente.id}`}
          className="inline-flex items-center gap-2 rounded-xl bg-[#EAF3FF] px-3.5 py-2 text-[12px] font-bold text-[#0755D8] transition hover:bg-[#DCEBFF]"
        >
          <Eye size={16} />
          Ver detalle
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(dependiente)}
            aria-label={`Editar a ${nombreCompleto}`}
            title="Editar dependiente"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#CFE0F7] text-[#0755D8] transition hover:bg-[#EAF3FF]"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(dependiente)}
            aria-label={`Eliminar a ${nombreCompleto}`}
            title="Eliminar dependiente"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#F5D2D2] text-[#D92D20] transition hover:bg-[#FFF0F0]"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
