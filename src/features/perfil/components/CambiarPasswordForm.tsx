"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  CircleCheck,
  Circle,
  Save,
  X,
  Info,
} from "lucide-react";

import {
  passwordSchema,
  type PasswordFormValues,
} from "../schemas/password.schema";

interface CambiarPasswordFormProps {
  onCancelar: () => void;
  onGuardar?: (data: PasswordFormValues) => Promise<void>;
}

type CampoPassword = keyof PasswordFormValues;

const CAMPOS = [
  {
    name: "passwordActual",
    label: "Contraseña actual",
    placeholder: "Ingresa tu contraseña actual",
    autoComplete: "current-password",
  },
  {
    name: "passwordNueva",
    label: "Nueva contraseña",
    placeholder: "Ingresa tu nueva contraseña",
    autoComplete: "new-password",
  },
  {
    name: "confirmarPassword",
    label: "Confirmar nueva contraseña",
    placeholder: "Confirma tu nueva contraseña",
    autoComplete: "new-password",
  },
] as const;

export default function CambiarPasswordForm({
  onCancelar,
  onGuardar,
}: CambiarPasswordFormProps) {
  const [visibilidad, setVisibilidad] = useState<
    Record<CampoPassword, boolean>
  >({
    passwordActual: false,
    passwordNueva: false,
    confirmarPassword: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      passwordActual: "",
      passwordNueva: "",
      confirmarPassword: "",
    },
  });

  const puedeGuardar = Boolean(onGuardar);

  const passwordNueva = watch("passwordNueva");

  const requisitos = [
    {
      label: "Mínimo 8 caracteres",
      cumple: passwordNueva.length >= 8,
    },
    {
      label: "Al menos una letra mayúscula",
      cumple: /[A-Z]/.test(passwordNueva),
    },
    {
      label: "Al menos un número",
      cumple: /[0-9]/.test(passwordNueva),
    },
  ];

  function alternarVisibilidad(campo: CampoPassword) {
    setVisibilidad((anterior) => ({
      ...anterior,
      [campo]: !anterior[campo],
    }));
  }

  function cancelarFormulario() {
    reset();
    onCancelar();
  }

  async function onSubmit(data: PasswordFormValues) {
    if (!onGuardar) return;

    try {
      await onGuardar(data);
      reset();
    } catch {
      setError("root", {
        message:
          "No fue posible actualizar tu contraseña. Verifica tus datos e inténtalo nuevamente.",
      });
    }
  }

  return (
    <section className="rounded-[20px] border border-[#DCE4EF] bg-white p-4 shadow-sm sm:p-5">

      {/* Encabezado del formulario */}

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#0755D8]">
            <LockKeyhole
              size={22}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-bold text-[#14285B] sm:text-lg">
              Cambiar contraseña
            </h2>

            <p className="mt-0.5 text-xs text-[#64748B] sm:text-sm">
              Protege el acceso a tu cuenta de FarmaSync.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={cancelarFormulario}
          disabled={isSubmitting}
          aria-label="Cerrar formulario"
          className="shrink-0 rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#EFF6FF] hover:text-[#0755D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D8] disabled:opacity-50"
        >
          <X size={20} />
        </button>
      </div>

      <div className="my-3 border-t border-[#E8EDF4]" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-3"
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          {/* Campos de contraseña */}

          <div className="min-w-0 space-y-3">
            {CAMPOS.map(
              ({ name, label, placeholder, autoComplete }) => {
                const visible = visibilidad[name];
                const error = errors[name];

                return (
                  <div key={name}>
                    <label
                      htmlFor={name}
                      className="mb-1.5 block text-sm font-semibold text-[#14285B]"
                    >
                      {label}
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                        aria-hidden="true"
                      />

                      <input
                        id={name}
                        type={visible ? "text" : "password"}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        disabled={!puedeGuardar || isSubmitting}
                        aria-invalid={Boolean(error)}
                        aria-describedby={
                          error ? `error-${name}` : undefined
                        }
                        className={`w-full rounded-xl border bg-white py-2.5 pl-11 pr-12 text-sm text-[#14285B] outline-none transition-colors placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#0755D8]/10 disabled:cursor-not-allowed disabled:bg-[#F8FAFC] ${
                          error
                            ? "border-red-400"
                            : "border-[#DCE4EF] focus:border-[#0755D8]"
                        }`}
                        {...register(name)}
                      />

                      <button
                        type="button"
                        disabled={!puedeGuardar || isSubmitting}
                        onClick={() =>
                          alternarVisibilidad(name)
                        }
                        aria-label={
                          visible
                            ? `Ocultar ${label.toLowerCase()}`
                            : `Mostrar ${label.toLowerCase()}`
                        }
                        aria-pressed={visible}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#64748B] transition-colors hover:text-[#0755D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D8] disabled:opacity-50"
                      >
                        {visible ? (
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </button>
                    </div>

                    {error && (
                      <p
                        id={`error-${name}`}
                        className="mt-1 text-xs font-medium text-red-600"
                      >
                        {error.message}
                      </p>
                    )}
                  </div>
                );
              }
            )}
          </div>

          {/* Requisitos de seguridad */}

          <div className="h-fit min-w-0 rounded-[18px] border border-[#D6E5FF] bg-[#EFF6FF] p-4">

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#DCEAFF] text-[#0755D8]">
                <ShieldCheck
                  size={21}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-sm font-bold text-[#14285B]">
                Requisitos de seguridad
              </h3>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-[#475569] sm:text-sm">
              Tu nueva contraseña debe cumplir las siguientes
              condiciones:
            </p>

            <ul className="mt-3 space-y-2">
              {requisitos.map(({ label, cumple }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5"
                >
                  {cumple ? (
                    <CircleCheck
                      size={18}
                      className="shrink-0 text-[#059669]"
                      aria-hidden="true"
                    />
                  ) : (
                    <Circle
                      size={18}
                      className="shrink-0 text-[#94A3B8]"
                      aria-hidden="true"
                    />
                  )}

                  <span
                    className={`text-xs font-medium sm:text-sm ${
                      cumple
                        ? "text-[#047857]"
                        : "text-[#64748B]"
                    }`}
                  >
                    {label}

                    <span className="sr-only">
                      {cumple
                        ? ": cumplido"
                        : ": pendiente"}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-3 border-t border-[#D6E5FF] pt-3">
              <p className="text-xs leading-relaxed text-[#475569]">
                Utiliza una contraseña diferente a la actual
                y evita incluir información personal fácil
                de adivinar.
              </p>
            </div>
          </div>
        </div>

        {/* Estado de conexión con el backend */}

        {!puedeGuardar && (
          <div className="flex items-center gap-2.5 rounded-xl border border-[#D6E5FF] bg-[#EFF6FF] px-3 py-2.5">
            <Info
              size={18}
              className="shrink-0 text-[#0755D8]"
              aria-hidden="true"
            />

            <p className="text-xs leading-relaxed text-[#475569]">
              El cambio de contraseña todavía no está
              disponible. Esta funcionalidad se habilitará
              cuando esté conectada al servicio de
              actualización de credenciales.
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

        <div className="flex flex-col-reverse gap-3 border-t border-[#E8EDF4] pt-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={cancelarFormulario}
            disabled={isSubmitting}
            className="
              inline-flex items-center justify-center
              rounded-xl border border-[#0755D8]
              bg-white px-5 py-2.5
              text-sm font-semibold text-[#0755D8]
              transition-colors
              hover:bg-[#EFF6FF]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#0755D8]/30
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={!puedeGuardar || isSubmitting}
            className="
              inline-flex items-center justify-center gap-2
              rounded-xl bg-[#0755D8]
              px-5 py-2.5
              text-sm font-semibold text-white
              transition-colors
              enabled:hover:bg-[#0648B8]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#0755D8]/30
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Save size={17} aria-hidden="true" />

            {isSubmitting
              ? "Actualizando..."
              : "Actualizar contraseña"}
          </button>
        </div>
      </form>
    </section>
  );
}