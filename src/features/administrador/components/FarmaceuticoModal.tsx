"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

import {
  X,
  UserPlus,
  UserRoundPen,
  ShieldCheck,
  Building2,
  Save,
  Info,
} from "lucide-react";

import type {
  Farmaceutico,
  FarmaceuticoFormData,
  SedeFarmacia,
} from "../types";

// =========================================================
// TIPOS
// =========================================================

type FarmaceuticoModalProps = {
  farmaceutico?: Farmaceutico | null;
  farmaceuticos: Farmaceutico[];
  sedes: SedeFarmacia[];
  onCerrar: () => void;
  onGuardar: (datos: FarmaceuticoFormData) => void;
};

type ErroresFormulario = Partial<
  Record<keyof FarmaceuticoFormData, string>
>;

// =========================================================
// ESTILOS REUTILIZABLES
// =========================================================

const INPUT_STYLE = `
  w-full rounded-xl border border-[#DCE5F0]
  bg-[#F8FAFD] px-3 py-2.5
  text-sm text-[#14285B]
  outline-none transition-colors
  placeholder:text-[#94A3B8]
  focus:border-[#0755D8]
  focus:ring-2 focus:ring-[#0755D8]/10
`;

const LABEL_STYLE =
  "mb-1.5 block text-sm font-semibold text-[#14285B]";

// =========================================================
// FORMULARIO DEL FARMACÉUTICO
// =========================================================

export default function FarmaceuticoModal({
  farmaceutico,
  farmaceuticos,
  sedes,
  onCerrar,
  onGuardar,
}: FarmaceuticoModalProps) {
  const editando = Boolean(farmaceutico);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [formulario, setFormulario] =
    useState<FarmaceuticoFormData>({
      nombres: farmaceutico?.nombres ?? "",
      apellidos: farmaceutico?.apellidos ?? "",
      numeroDocumento: farmaceutico?.numeroDocumento ?? "",
      correo: farmaceutico?.correo ?? "",
      telefono: farmaceutico?.telefono ?? "",
      sedeId: farmaceutico?.sedeId ?? 0,
      estado: farmaceutico?.estado ?? "ACTIVO",
    });

  const [errores, setErrores] =
    useState<ErroresFormulario>({});

  const sedesActivas = sedes.filter(
    (sede) => sede.activa
  );

  // =======================================================
  // APERTURA DEL MODAL
  // =======================================================

  useEffect(() => {
    const dialogo = dialogRef.current;

    if (dialogo && !dialogo.open) {
      dialogo.showModal();
    }

    return () => {
      if (dialogo?.open) {
        dialogo.close();
      }
    };
  }, []);

  // =======================================================
  // ACTUALIZAR CAMPOS
  // =======================================================

  function actualizarCampo<
    K extends keyof FarmaceuticoFormData
  >(
    campo: K,
    valor: FarmaceuticoFormData[K]
  ) {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));

    setErrores((anteriores) => ({
      ...anteriores,
      [campo]: undefined,
    }));
  }

  // =======================================================
  // VALIDACIONES
  // =======================================================

  function validarFormulario() {
    const nuevosErrores: ErroresFormulario = {};

    if (formulario.nombres.trim().length < 2) {
      nuevosErrores.nombres =
        "Ingresa los nombres del farmacéutico.";
    }

    if (formulario.apellidos.trim().length < 2) {
      nuevosErrores.apellidos =
        "Ingresa los apellidos del farmacéutico.";
    }

    if (
      !/^\d{5,15}$/.test(
        formulario.numeroDocumento.trim()
      )
    ) {
      nuevosErrores.numeroDocumento =
        "Ingresa un documento válido de 5 a 15 dígitos.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formulario.correo.trim()
      )
    ) {
      nuevosErrores.correo =
        "Ingresa un correo electrónico válido.";
    }

    if (!/^\d{10}$/.test(formulario.telefono.trim())) {
      nuevosErrores.telefono =
        "Ingresa un teléfono de 10 dígitos.";
    }

    const sedeValida = sedesActivas.some(
      (sede) => sede.id === formulario.sedeId
    );

    if (!sedeValida) {
      nuevosErrores.sedeId =
        "Debes seleccionar una sede de farmacia activa.";
    }

    // VALIDAR DOCUMENTO DUPLICADO

    const documentoDuplicado = farmaceuticos.some(
      (empleado) =>
        empleado.id !== farmaceutico?.id &&
        empleado.numeroDocumento.trim() ===
          formulario.numeroDocumento.trim()
    );

    if (documentoDuplicado) {
      nuevosErrores.numeroDocumento =
        "Este documento ya está registrado.";
    }

    // VALIDAR CORREO DUPLICADO

    const correoDuplicado = farmaceuticos.some(
      (empleado) =>
        empleado.id !== farmaceutico?.id &&
        empleado.correo.trim().toLowerCase() ===
          formulario.correo.trim().toLowerCase()
    );

    if (correoDuplicado) {
      nuevosErrores.correo =
        "Este correo ya está registrado.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  }

  // =======================================================
  // GUARDAR FORMULARIO
  // =======================================================

  function manejarEnvio(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    onGuardar({
      ...formulario,
      nombres: formulario.nombres.trim(),
      apellidos: formulario.apellidos.trim(),
      numeroDocumento: formulario.numeroDocumento.trim(),
      correo: formulario.correo.trim().toLowerCase(),
      telefono: formulario.telefono.trim(),
    });
  }

  // =======================================================
  // MENSAJES DE ERROR
  // =======================================================

  function mostrarError(
    campo: keyof FarmaceuticoFormData
  ) {
    return errores[campo] ? (
      <p
        id={`error-${campo}`}
        role="alert"
        className="mt-1 text-xs text-[#DC2626]"
      >
        {errores[campo]}
      </p>
    ) : null;
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="farmaceutico-modal-title"
      onCancel={(event) => {
        event.preventDefault();
        onCerrar();
      }}
      className="
        fixed inset-0 m-auto
        max-h-[90dvh] w-[calc(100%-2rem)]
        max-w-[620px]
        overflow-y-auto
        rounded-[24px] border-0
        bg-white p-0
        text-[#14285B]
        shadow-2xl
        backdrop:bg-[#0B1F5C]/50
        backdrop:backdrop-blur-sm
      "
    >
      {/* ENCABEZADO */}

      <div className="flex items-start justify-between gap-3 border-b border-[#E3EBF5] px-5 py-5 sm:px-6">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F1FF] text-[#0755D8]">

            {editando ? (
              <UserRoundPen size={25} aria-hidden="true" />
            ) : (
              <UserPlus size={25} aria-hidden="true" />
            )}

          </div>

          <div>
            <h2
              id="farmaceutico-modal-title"
              className="text-lg font-extrabold"
            >
              {editando
                ? "Editar farmacéutico"
                : "Nuevo farmacéutico"}
            </h2>

            <p className="mt-1 text-xs text-[#64748B]">
              {editando
                ? "Actualiza la información del empleado."
                : "Registra un nuevo empleado de la EPS."}
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar formulario"
          className="cursor-pointer rounded-lg p-2 text-[#64748B] hover:bg-[#F1F5F9]"
        >
          <X size={22} aria-hidden="true" />
        </button>

      </div>

      {/* FORMULARIO */}

      <form onSubmit={manejarEnvio} noValidate>

        <div className="space-y-5 px-5 py-5 sm:px-6">

          {/* INFORMACIÓN PERSONAL */}

          <div>

            <h3 className="mb-3 text-sm font-bold text-[#14285B]">
              Información personal
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* NOMBRES */}

              <div>
                <label
                  htmlFor="nombres"
                  className={LABEL_STYLE}
                >
                  Nombres *
                </label>

                <input
                  id="nombres"
                  type="text"
                  required
                  maxLength={80}
                  value={formulario.nombres}
                  onChange={(event) =>
                    actualizarCampo(
                      "nombres",
                      event.target.value
                    )
                  }
                  aria-invalid={Boolean(errores.nombres)}
                  aria-describedby={
                    errores.nombres
                      ? "error-nombres"
                      : undefined
                  }
                  placeholder="Ej. María"
                  className={INPUT_STYLE}
                />

                {mostrarError("nombres")}
              </div>

              {/* APELLIDOS */}

              <div>
                <label
                  htmlFor="apellidos"
                  className={LABEL_STYLE}
                >
                  Apellidos *
                </label>

                <input
                  id="apellidos"
                  type="text"
                  required
                  maxLength={80}
                  value={formulario.apellidos}
                  onChange={(event) =>
                    actualizarCampo(
                      "apellidos",
                      event.target.value
                    )
                  }
                  aria-invalid={Boolean(errores.apellidos)}
                  aria-describedby={
                    errores.apellidos
                      ? "error-apellidos"
                      : undefined
                  }
                  placeholder="Ej. Gómez"
                  className={INPUT_STYLE}
                />

                {mostrarError("apellidos")}
              </div>

              {/* DOCUMENTO */}

              <div>
                <label
                  htmlFor="numeroDocumento"
                  className={LABEL_STYLE}
                >
                  Número de documento *
                </label>

                <input
                  id="numeroDocumento"
                  type="text"
                  inputMode="numeric"
                  required
                  maxLength={15}
                  value={formulario.numeroDocumento}
                  onChange={(event) =>
                    actualizarCampo(
                      "numeroDocumento",
                      event.target.value.replace(/\D/g, "")
                    )
                  }
                  aria-invalid={Boolean(
                    errores.numeroDocumento
                  )}
                  aria-describedby={
                    errores.numeroDocumento
                      ? "error-numeroDocumento"
                      : undefined
                  }
                  placeholder="Número de identificación"
                  className={INPUT_STYLE}
                />

                {mostrarError("numeroDocumento")}
              </div>

              {/* TELÉFONO */}

              <div>
                <label
                  htmlFor="telefono"
                  className={LABEL_STYLE}
                >
                  Teléfono *
                </label>

                <input
                  id="telefono"
                  type="tel"
                  inputMode="numeric"
                  required
                  maxLength={10}
                  value={formulario.telefono}
                  onChange={(event) =>
                    actualizarCampo(
                      "telefono",
                      event.target.value.replace(/\D/g, "")
                    )
                  }
                  aria-invalid={Boolean(errores.telefono)}
                  aria-describedby={
                    errores.telefono
                      ? "error-telefono"
                      : undefined
                  }
                  placeholder="3001234567"
                  className={INPUT_STYLE}
                />

                {mostrarError("telefono")}
              </div>

              {/* CORREO ELECTRÓNICO */}

              <div className="sm:col-span-2">
                <label
                  htmlFor="correo"
                  className={LABEL_STYLE}
                >
                  Correo electrónico *
                </label>

                <input
                  id="correo"
                  type="email"
                  required
                  maxLength={254}
                  value={formulario.correo}
                  onChange={(event) =>
                    actualizarCampo(
                      "correo",
                      event.target.value
                    )
                  }
                  aria-invalid={Boolean(errores.correo)}
                  aria-describedby={
                    errores.correo
                      ? "error-correo"
                      : undefined
                  }
                  placeholder="farmaceutico@correo.com"
                  className={INPUT_STYLE}
                />

                {mostrarError("correo")}
              </div>

            </div>

          </div>

          {/* INFORMACIÓN LABORAL */}

          <div className="border-t border-[#E3EBF5] pt-4">

            <h3 className="mb-3 text-sm font-bold">
              Información laboral
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* SEDE OBLIGATORIA */}

              <div className="sm:col-span-2">

                <label
                  htmlFor="sedeId"
                  className={LABEL_STYLE}
                >
                  Sede de farmacia *
                </label>

                <div className="relative">

                  <Building2
                    size={18}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#0755D8]"
                  />

                  <select
                    id="sedeId"
                    required
                    value={formulario.sedeId}
                    onChange={(event) =>
                      actualizarCampo(
                        "sedeId",
                        Number(event.target.value)
                      )
                    }
                    aria-invalid={Boolean(errores.sedeId)}
                    aria-describedby={
                      errores.sedeId
                        ? "error-sedeId"
                        : undefined
                    }
                    className={`${INPUT_STYLE} cursor-pointer pl-10`}
                  >

                    <option value={0} disabled>
                      Selecciona una sede
                    </option>

                    {sedesActivas.map((sede) => (
                      <option
                        key={sede.id}
                        value={sede.id}
                      >
                        {sede.nombre} - {sede.ciudad}
                      </option>
                    ))}

                  </select>

                </div>

                {mostrarError("sedeId")}

              </div>

              {/* ROL FIJO */}

              <div>

                <label
                  htmlFor="rol"
                  className={LABEL_STYLE}
                >
                  Rol asignado
                </label>

                <div className="relative">

                  <ShieldCheck
                    size={18}
                    aria-hidden="true"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0755D8]"
                  />

                  <input
                    id="rol"
                    type="text"
                    value="FARMACEUTICO"
                    readOnly
                    className={`${INPUT_STYLE} bg-[#E8F1FF] pl-10 font-semibold`}
                  />

                </div>

              </div>

              {/* ESTADO DE LA CUENTA */}

              <div>

                <label
                  htmlFor="estado"
                  className={LABEL_STYLE}
                >
                  Estado de la cuenta
                </label>

                <select
                  id="estado"
                  value={formulario.estado}
                  onChange={(event) =>
                    actualizarCampo(
                      "estado",
                      event.target.value === "ACTIVO"
                        ? "ACTIVO"
                        : "INACTIVO"
                    )
                  }
                  className={`${INPUT_STYLE} cursor-pointer`}
                >
                  <option value="ACTIVO">
                    Activo
                  </option>

                  <option value="INACTIVO">
                    Inactivo
                  </option>
                </select>

              </div>

            </div>

          </div>

          {/* MENSAJE INFORMATIVO */}

          <div className="flex items-start gap-3 rounded-xl border border-[#D6E6FF] bg-[#F0F6FF] p-3">

            <Info
              size={19}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-[#0755D8]"
            />

            <p className="text-xs leading-relaxed text-[#355784]">
              Cada farmacéutico debe estar asociado a una
              sede de farmacia. El rol asignado no puede
              modificarse desde este formulario.
            </p>

          </div>

        </div>

        {/* BOTONES DEL FORMULARIO */}

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#E3EBF5] bg-[#F8FAFD] px-5 py-4 sm:px-6">

          <button
            type="button"
            onClick={onCerrar}
            className="cursor-pointer rounded-xl border border-[#DCE5F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#526582] transition-colors hover:bg-[#EDF2F8]"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0755D8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0647B8]"
          >

            {editando ? (
              <Save size={18} aria-hidden="true" />
            ) : (
              <UserPlus size={18} aria-hidden="true" />
            )}

            {editando
              ? "Guardar cambios"
              : "Crear farmacéutico"}

          </button>

        </div>

      </form>

    </dialog>
  );
}