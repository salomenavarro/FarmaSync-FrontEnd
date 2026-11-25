"use client";

import { Trash2, X } from "lucide-react";
import type { Dependiente } from "../types";

interface DeleteDependienteDialogProps {
  dependiente: Dependiente | null;
  onClose: () => void;
  // Permite confirmar de forma síncrona o asíncrona (mutation) para cerrar el
  // diálogo solo cuando el backend responda sin error.
  onConfirm: () => Promise<void> | void;
  isDeleting?: boolean;
  errorMessage?: string | null;
}

export default function DeleteDependienteDialog({
  dependiente,
  onClose,
  onConfirm,
  isDeleting = false,
  errorMessage = null,
}: DeleteDependienteDialogProps) {
  if (!dependiente) return null;

  const handleConfirmClick = async () => {
    if (isDeleting) return;

    try {
      await onConfirm();
      onClose();
    } catch {
      // El error queda visible en `errorMessage` y el modal sigue abierto
      // para que el usuario pueda reintentar o cancelar.
    }
  };

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
            disabled={isDeleting}
            aria-label="Cerrar confirmación"
            className="rounded-lg p-1.5 text-[#64748B] hover:bg-[#F1F5F9] disabled:opacity-50"
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
          Se actualizará tu grupo familiar y se conservará el historial de sus
          reservas cuando aplique.
        </p>

        {errorMessage && (
          <p
            role="alert"
            className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
          >
            {errorMessage}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl border border-[#D6E3F4] px-4 py-2.5 text-sm font-bold text-[#263D65] hover:bg-[#F5F9FF] disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirmClick}
            disabled={isDeleting}
            className="rounded-xl bg-[#D92D20] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#B42318] disabled:opacity-60"
          >
            {isDeleting ? "Eliminando..." : "Sí, eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}