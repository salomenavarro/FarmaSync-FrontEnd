"use client";

import { Trash2, X } from "lucide-react";
import type { Dependiente } from "../types";

interface DeleteDependienteDialogProps {
  dependiente: Dependiente | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteDependienteDialog({
  dependiente,
  onClose,
  onConfirm,
}: DeleteDependienteDialogProps) {
  if (!dependiente) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#071B42]/60 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="eliminar-dependiente-titulo"
        aria-describedby="eliminar-dependiente-descripcion"
        className="w-full max-w-[430px] rounded-[24px] bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0F0] text-[#D92D20]">
            <Trash2 size={23} />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar confirmación"
            className="rounded-lg p-1.5 text-[#64748B] hover:bg-[#F1F5F9]"
          >
            <X size={20} />
          </button>
        </div>

        <h2
          id="eliminar-dependiente-titulo"
          className="mt-4 text-xl font-extrabold text-[#14285B]"
        >
          ¿Eliminar dependiente?
        </h2>

        <p
          id="eliminar-dependiente-descripcion"
          className="mt-2 text-sm leading-relaxed text-[#526783]"
        >
          ¿Estás seguro de que deseas eliminar a{" "}
          <strong>
            {dependiente.nombres} {dependiente.apellidos}
          </strong>
          ?
        </p>

        <p className="mt-2 text-xs text-[#64748B]">
          Esta acción solo modificará los datos temporales de esta demostración.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#D6E3F4] px-4 py-2.5 text-sm font-bold text-[#263D65] hover:bg-[#F5F9FF]"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-[#D92D20] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#B42318]"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
