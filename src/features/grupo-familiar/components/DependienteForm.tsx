"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CalendarDays, UserRoundPlus, X } from "lucide-react";

import {
  PARENTESCOS,
  PARENTESCO_LABELS,
  TIPO_DOCUMENTO_LABELS,
  TIPOS_DOCUMENTO,
} from "../schemas/dependiente.constants";
import { dependienteFormSchema } from "../schemas/dependiente.schema";
import type { DependienteFormData, TipoDocumento } from "../types";

interface DependienteFormProps {
  isOpen: boolean;
  onClose: () => void;
  // Permite guardar de forma síncrona o asíncrona (mutation) para que el modal
  // solo se cierre cuando el servidor confirme el guardado y conserve errores 409/400.
  onSave: (dependiente: DependienteFormData) => Promise<void> | void;
  initialData?: DependienteFormData;
  isSubmitting?: boolean;
  serverError?: string | null;
}

// Estado inicial tipado con códigos estables de parentesco y documento para
// mantener sincronía con el schema de validación y el contrato del backend.
const formularioInicial: DependienteFormData = {
  nombres: "",
  apellidos: "",
  parentesco: "HIJO",
  tipoDocumento: "RC",
  numeroDocumento: "",
  fechaNacimiento: "",
  correoElectronico: "",
};

const inputClass =
  "w-full rounded-xl border border-[#D6E3F4] bg-white px-3.5 py-2.5 text-sm text-[#14285B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0755D8] focus:ring-2 focus:ring-[#0755D8]/15";

const labelClass = "mb-1.5 block text-sm font-semibold text-[#263D65]";

export default function DependienteForm({
  isOpen,
  onClose,
  onSave,
  initialData,
  isSubmitting = false,
  serverError = null,
}: DependienteFormProps) {
  const [formData, setFormData] =
    useState<DependienteFormData>(formularioInicial);

  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData ? { ...formularioInicial, ...initialData } : { ...formularioInicial });
      setError("");
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, isSubmitting]);

  if (!isOpen) return null;

  const mostrarCorreo = formData.tipoDocumento === "CC";
  const mensajeErrorVisible = error || serverError || "";

  const actualizarCampo = <K extends keyof DependienteFormData>(
    campo: K,
    valor: DependienteFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor,
    }));

    setError("");
  };

  const cambiarDocumento = (tipo: TipoDocumento) => {
    setFormData((prev) => ({
      ...prev,
      tipoDocumento: tipo,
      correoElectronico: tipo === "CC" ? prev.correoElectronico : "",
    }));

    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    // Delega la validación de campos, fecha no futura y regla de correo para CC
    // al schema de Zod en la capa de schemas de la feature.
    const parsed = dependienteFormSchema.safeParse(formData);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      setError(firstIssue?.message ?? "Revisa los datos del formulario.");
      return;
    }

    const payloadLimpio: DependienteFormData = {
      nombres: parsed.data.nombres,
      apellidos: parsed.data.apellidos,
      parentesco: parsed.data.parentesco,
      tipoDocumento: parsed.data.tipoDocumento,
      numeroDocumento: parsed.data.numeroDocumento,
      fechaNacimiento: parsed.data.fechaNacimiento,
      correoElectronico: parsed.data.correoElectronico ?? "",
    };

    try {
      await onSave(payloadLimpio);
      onClose();
    } catch {
      // El error de la mutación queda expuesto vía `serverError` en la vista
      // y el modal permanece abierto para que el usuario pueda corregir.
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071B42]/55 p-4 backdrop-blur-[3px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dependiente-form-title"
        className="flex max-h-[90dvh] w-full max-w-[540px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_24px_80px_rgba(5,24,66,0.25)]"
      >
        {/* ENCABEZADO */}

        <div className="relative shrink-0 bg-gradient-to-r from-[#0755D8] to-[#29A9E8] px-6 py-5 text-white">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Cerrar formulario"
            className="absolute right-4 top-4 rounded-lg p-1.5 transition hover:bg-white/20 disabled:opacity-50"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
              <UserRoundPlus size={24} />
            </div>

            <div>
              <h2
                id="dependiente-form-title"
                className="text-xl font-extrabold"
              >
                {initialData ? "Editar dependiente" : "Agregar dependiente"}
              </h2>

              <p className="mt-0.5 text-xs text-white/90">
                Completa los datos de tu familiar
              </p>
            </div>
          </div>
        </div>

        {/* FORMULARIO */}

        <form
          id="dependiente-form"
          onSubmit={handleSubmit}
          noValidate
          className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="dep-nombres" className={labelClass}>
                Nombres *
              </label>

              <input
                id="dep-nombres"
                type="text"
                autoComplete="given-name"
                value={formData.nombres}
                onChange={(event) =>
                  actualizarCampo("nombres", event.target.value)
                }
                placeholder="Ej. María"
                className={inputClass}
                disabled={isSubmitting}
                required
              />
            </div>

            <div>
              <label htmlFor="dep-apellidos" className={labelClass}>
                Apellidos *
              </label>

              <input
                id="dep-apellidos"
                type="text"
                autoComplete="family-name"
                value={formData.apellidos}
                onChange={(event) =>
                  actualizarCampo("apellidos", event.target.value)
                }
                placeholder="Ej. Gómez Pérez"
                className={inputClass}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="dep-parentesco" className={labelClass}>
              Parentesco *
            </label>

            <select
              id="dep-parentesco"
              value={formData.parentesco}
              onChange={(event) =>
                actualizarCampo(
                  "parentesco",
                  event.target.value as DependienteFormData["parentesco"]
                )
              }
              className={inputClass}
              disabled={isSubmitting}
              required
            >
              {PARENTESCOS.map((parentesco) => (
                <option key={parentesco} value={parentesco}>
                  {PARENTESCO_LABELS[parentesco]}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="dep-tipo-documento" className={labelClass}>
                Tipo de documento *
              </label>

              <select
                id="dep-tipo-documento"
                value={formData.tipoDocumento}
                onChange={(event) =>
                  cambiarDocumento(event.target.value as TipoDocumento)
                }
                className={inputClass}
                disabled={isSubmitting}
                required
              >
                {TIPOS_DOCUMENTO.map((documento) => (
                  <option key={documento} value={documento}>
                    {TIPO_DOCUMENTO_LABELS[documento]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dep-numero-documento" className={labelClass}>
                Número de documento *
              </label>

              <input
                id="dep-numero-documento"
                type="text"
                inputMode="numeric"
                value={formData.numeroDocumento}
                onChange={(event) =>
                  actualizarCampo(
                    "numeroDocumento",
                    event.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="Número de documento"
                className={inputClass}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          {/* CORREO CONDICIONAL */}

          {mostrarCorreo && (
            <div className="rounded-2xl border border-[#C4DDFB] bg-[#F1F7FF] p-3.5">
              <label htmlFor="dep-correo" className={labelClass}>
                Correo electrónico *
              </label>

              <input
                id="dep-correo"
                type="email"
                autoComplete="email"
                value={formData.correoElectronico ?? ""}
                onChange={(event) =>
                  actualizarCampo("correoElectronico", event.target.value)
                }
                placeholder="ejemplo@correo.com"
                className={inputClass}
                disabled={isSubmitting}
                required
              />

              <p className="mt-2 text-xs leading-relaxed text-[#526783]">
                Este campo es obligatorio cuando el dependiente se registra con
                Cédula de Ciudadanía.
              </p>
            </div>
          )}

          <div>
            <label htmlFor="dep-fecha" className={labelClass}>
              Fecha de nacimiento *
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#52709B]"
              />

              <input
                id="dep-fecha"
                type="date"
                value={formData.fechaNacimiento}
                max={new Date().toISOString().slice(0, 10)}
                onChange={(event) =>
                  actualizarCampo("fechaNacimiento", event.target.value)
                }
                className={`${inputClass} pl-10`}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          {mensajeErrorVisible && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {mensajeErrorVisible}
            </p>
          )}

          <p className="rounded-xl bg-[#F2F6FB] px-3 py-2.5 text-xs leading-relaxed text-[#526783]">
            Los datos del dependiente se utilizarán para gestionar sus reservas
            de medicamentos.
          </p>
        </form>

        {/* BOTONES INFERIORES */}

        <div className="flex shrink-0 justify-end gap-3 border-t border-[#E5EDF7] bg-white px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl border border-[#CAD8E8] px-5 py-2.5 text-sm font-bold text-[#263D65] transition hover:bg-[#F3F7FC] disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            form="dependiente-form"
            disabled={isSubmitting}
            className="rounded-xl bg-[#0755D8] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0646B7] disabled:opacity-60"
          >
            {isSubmitting
              ? "Guardando..."
              : initialData
                ? "Guardar cambios"
                : "Guardar dependiente"}
          </button>
        </div>
      </div>
    </div>
  );
}