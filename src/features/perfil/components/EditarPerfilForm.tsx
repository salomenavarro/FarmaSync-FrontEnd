"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserRound,
  Phone,
  Mail,
  ContactRound,
  Save,
  X,
  Info,
  LockKeyhole,
} from "lucide-react";

import {
  perfilSchema,
  type PerfilFormValues,
} from "../schemas/perfil.schema";

import type { PerfilPaciente } from "../types";

interface EditarPerfilFormProps {
  perfil: PerfilPaciente;
  telefono?: string;
  onCancelar: () => void;
  onGuardar?: (data: PerfilFormValues) => Promise<void>;
}

const INPUT_CLASS =
  "w-full rounded-xl border border-[#DCE4EF] bg-white py-3 pl-11 pr-4 text-sm text-[#14285B] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#0755D8] focus:ring-2 focus:ring-[#0755D8]/10";

const LABEL_CLASS =
  "mb-2 block text-sm font-semibold text-[#14285B]";

const ERROR_CLASS =
  "mt-1.5 text-xs font-medium text-red-600";

export default function EditarPerfilForm({
  perfil,
  telefono,
  onCancelar,
  onGuardar,
}: EditarPerfilFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PerfilFormValues>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      nombreCompleto: perfil.nombreCompleto,
      telefono: telefono ?? "",
    },
  });

  const puedeGuardar = Boolean(onGuardar);

  async function onSubmit(data: PerfilFormValues) {
    if (!onGuardar) return;

    try {
      await onGuardar(data);
    } catch {
      setError("root", {
        message:
          "No fue posible actualizar tu información. Inténtalo nuevamente.",
      });
    }
  }

  return (
    <section className="rounded-[20px] border border-[#DCE4EF] bg-white p-5 shadow-sm sm:p-6">

      {/* Encabezado del formulario */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#14285B]">
            Editar información personal
          </h2>

          <p className="mt-1 text-sm text-[#64748B]">
            Actualiza los datos personales de tu cuenta.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancelar}
          disabled={isSubmitting}
          aria-label="Cancelar edición"
          className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#F5F9FF] hover:text-[#0755D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D8]"
        >
          <X size={20} />
        </button>
      </div>

      <div className="my-5 border-t border-[#E8EDF4]" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          {/* Nombre completo */}
          <div>
            <label
              htmlFor="perfil-nombre"
              className={LABEL_CLASS}
            >
              Nombre completo
            </label>

            <div className="relative">
              <UserRound
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                aria-hidden="true"
              />

              <input
                id="perfil-nombre"
                type="text"
                autoComplete="name"
                placeholder="Ingresa tu nombre completo"
                aria-invalid={Boolean(errors.nombreCompleto)}
                aria-describedby={
                  errors.nombreCompleto
                    ? "error-perfil-nombre"
                    : undefined
                }
                className={INPUT_CLASS}
                {...register("nombreCompleto")}
              />
            </div>

            {errors.nombreCompleto && (
              <p
                id="error-perfil-nombre"
                className={ERROR_CLASS}
              >
                {errors.nombreCompleto.message}
              </p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label
              htmlFor="perfil-telefono"
              className={LABEL_CLASS}
            >
              Teléfono
            </label>

            <div className="relative">
              <Phone
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                aria-hidden="true"
              />

              <input
                id="perfil-telefono"
                type="tel"
                autoComplete="tel"
                placeholder="Ingresa tu número de teléfono"
                aria-invalid={Boolean(errors.telefono)}
                aria-describedby={
                  errors.telefono
                    ? "error-perfil-telefono"
                    : undefined
                }
                className={INPUT_CLASS}
                {...register("telefono")}
              />
            </div>

            {errors.telefono && (
              <p
                id="error-perfil-telefono"
                className={ERROR_CLASS}
              >
                {errors.telefono.message}
              </p>
            )}
          </div>

          {/* Documento de identidad */}
          <div>
            <label
              htmlFor="perfil-documento"
              className={LABEL_CLASS}
            >
              Documento de identidad
            </label>

            <div className="relative">
              <ContactRound
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                aria-hidden="true"
              />

              <input
                id="perfil-documento"
                type="text"
                value={perfil.numeroDocumento}
                readOnly
                className={`${INPUT_CLASS} cursor-default bg-[#F8FAFC] pr-10`}
              />

              <LockKeyhole
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                aria-hidden="true"
              />
            </div>

            <p className="mt-1.5 text-xs text-[#64748B]">
              Este dato no se puede modificar desde aquí.
            </p>
          </div>

          {/* Correo electrónico */}
          <div>
            <label
              htmlFor="perfil-correo"
              className={LABEL_CLASS}
            >
              Correo electrónico
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                aria-hidden="true"
              />

              <input
                id="perfil-correo"
                type="email"
                value={perfil.correo}
                readOnly
                className={`${INPUT_CLASS} cursor-default bg-[#F8FAFC] pr-10`}
              />

              <LockKeyhole
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                aria-hidden="true"
              />
            </div>

            <p className="mt-1.5 text-xs text-[#64748B]">
              Correo asociado a tu cuenta.
            </p>
          </div>
        </div>

        {/* Información sobre la conexión */}
        {!puedeGuardar && (
          <div className="flex items-start gap-3 rounded-xl border border-[#D6E5FF] bg-[#EFF6FF] p-4">
            <Info
              size={20}
              className="shrink-0 text-[#0755D8]"
              aria-hidden="true"
            />

            <p className="text-xs leading-relaxed text-[#475569] sm:text-sm">
              La actualización de datos personales todavía
              no está disponible. Los cambios realizados
              en este formulario no se guardarán.
            </p>
          </div>
        )}

        {/* Error general */}
        {errors.root?.message && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {errors.root.message}
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col-reverse gap-3 border-t border-[#E8EDF4] pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancelar}
            disabled={isSubmitting}
            className="rounded-xl border border-[#DCE4EF] px-5 py-3 text-sm font-semibold text-[#64748B] transition-colors hover:bg-[#F5F9FF] disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={!puedeGuardar || isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0755D8] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0648B8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={17} aria-hidden="true" />

            {isSubmitting
              ? "Guardando..."
              : "Guardar cambios"}
          </button>
        </div>
      </form>
    </section>
  );
}
