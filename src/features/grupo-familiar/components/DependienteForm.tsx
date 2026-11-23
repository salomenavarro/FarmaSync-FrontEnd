
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CalendarDays, UserRoundPlus, X } from "lucide-react";

import {
  PARENTESCOS,
  TIPOS_DOCUMENTO,
  type DependienteFormData,
  type TipoDocumento,
} from "../types";

interface DependienteFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dependiente: DependienteFormData) => void;
  initialData?: DependienteFormData;
}

const formularioInicial: DependienteFormData = {
  nombres: "",
  apellidos: "",
  parentesco: "Hijo / Hija",
  tipoDocumento: "RC",
  numeroDocumento: "",
  fechaNacimiento: "",
  correoElectronico: "",
};

const inputClass =
  "w-full rounded-xl border border-[#D6E3F4] bg-white px-3.5 py-2.5 text-sm text-[#14285B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0755D8] focus:ring-2 focus:ring-[#0755D8]/15";

const labelClass =
  "mb-1.5 block text-sm font-semibold text-[#263D65]";

export default function DependienteForm({
  isOpen,
  onClose,
  onSave,
  initialData,
}: DependienteFormProps) {
  const [formData, setFormData] =
    useState<DependienteFormData>(formularioInicial);

  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData ?? { ...formularioInicial });
      setError("");
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mostrarCorreo = formData.tipoDocumento === "CC";

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
      correoElectronico:
        tipo === "CC" ? prev.correoElectronico : "",
    }));

    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formData.nombres.trim() ||
      !formData.apellidos.trim() ||
      !formData.numeroDocumento.trim() ||
      !formData.fechaNacimiento
    ) {
      setError("Completa todos los campos obligatorios.");
      return;
    }

    if (
      formData.tipoDocumento === "CC" &&
      !formData.correoElectronico?.trim()
    ) {
      setError(
        "El correo electrónico es obligatorio para Cédula de Ciudadanía."
      );
      return;
    }

    if (formData.fechaNacimiento > new Date().toISOString().slice(0, 10)) {
      setError("La fecha de nacimiento no puede ser futura.");
      return;
    }

    onSave({
      ...formData,
      nombres: formData.nombres.trim(),
      apellidos: formData.apellidos.trim(),
      numeroDocumento: formData.numeroDocumento.trim(),
      correoElectronico: mostrarCorreo
        ? formData.correoElectronico?.trim()
        : "",
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071B42]/55 p-4 backdrop-blur-[3px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
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
            aria-label="Cerrar formulario"
            className="absolute right-4 top-4 rounded-lg p-1.5 transition hover:bg-white/20"
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
                {initialData
                  ? "Editar dependiente"
                  : "Agregar dependiente"}
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
              required
            >
              {PARENTESCOS.map((parentesco) => (
                <option key={parentesco} value={parentesco}>
                  {parentesco}
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
                required
              >
                {TIPOS_DOCUMENTO.map((documento) => (
                  <option
                    key={documento.value}
                    value={documento.value}
                  >
                    {documento.label}
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
                required
              />
            </div>
          </div>

          {/* CORREO CONDICIONAL */}

          {mostrarCorreo && (
            <div className="rounded-2xl border border-[#C4DDFB] bg-[#F1F7FF] p-3.5">
              <label
                htmlFor="dep-correo"
                className={labelClass}
              >
                Correo electrónico *
              </label>

              <input
                id="dep-correo"
                type="email"
                autoComplete="email"
                value={formData.correoElectronico ?? ""}
                onChange={(event) =>
                  actualizarCampo(
                    "correoElectronico",
                    event.target.value
                  )
                }
                placeholder="ejemplo@correo.com"
                className={inputClass}
                required
              />

              <p className="mt-2 text-xs leading-relaxed text-[#526783]">
                Este campo es obligatorio cuando el
                dependiente se registra con Cédula de Ciudadanía.
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
                  actualizarCampo(
                    "fechaNacimiento",
                    event.target.value
                  )
                }
                className={`${inputClass} pl-10`}
                required
              />
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <p className="rounded-xl bg-[#F2F6FB] px-3 py-2.5 text-xs leading-relaxed text-[#526783]">
            Los datos del dependiente se utilizarán para
            gestionar sus reservas de medicamentos.
          </p>
        </form>

        {/* BOTONES INFERIORES */}

        <div className="flex shrink-0 justify-end gap-3 border-t border-[#E5EDF7] bg-white px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#CAD8E8] px-5 py-2.5 text-sm font-bold text-[#263D65] transition hover:bg-[#F3F7FC]"
          >
            Cancelar
          </button>

          <button
            type="submit"
            form="dependiente-form"
            className="rounded-xl bg-[#0755D8] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0646B7]"
          >
            {initialData
              ? "Guardar cambios"
              : "Guardar dependiente"}
          </button>
        </div>
      </div>
    </div>
  );
}
