"use client";

import {
  Info,
  Minus,
  PackageCheck,
  PackagePlus,
  Plus,
  ScanBarcode,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ingresoMedicamentoSchema } from "../schemas/inventario.schema";

import type { IngresoMedicamentoFormData } from "../types";

// =========================================================
// ESTILOS COMPARTIDOS
// =========================================================

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]";

// =========================================================
// FORMULARIO DE INGRESO
// =========================================================

export default function InventarioIngresoForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IngresoMedicamentoFormData>({
    resolver: zodResolver(ingresoMedicamentoSchema),
    mode: "onChange",
    defaultValues: {
      ean: "",
      cantidad: 1,
    },
  });

  const cantidad = watch("cantidad");

  function cambiarCantidad(nuevaCantidad: number) {
    if (
      !Number.isSafeInteger(nuevaCantidad) ||
      nuevaCantidad < 1
    ) {
      return;
    }

    setValue("cantidad", nuevaCantidad, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  // El registro real permanece deshabilitado.
  // Se conectará mediante el hook cuando exista
  // un contrato de ingreso autorizado por sede.

  return (
    <section
      aria-labelledby="ingreso-titulo"
      className="min-w-0 rounded-[22px] border border-[#DCE9F8] bg-white p-4 shadow-[0_4px_14px_rgba(20,40,91,0.04)] sm:p-5"
    >
      {/* Encabezado */}

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5F1FF] text-[#0755D8]">
          <PackagePlus size={25} aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <h2
            id="ingreso-titulo"
            className="text-base font-extrabold text-[#14285B] sm:text-lg"
          >
            Ingreso de medicamentos
          </h2>

          <p className="mt-0.5 text-xs leading-relaxed text-[#64748B] sm:text-sm">
            Registra nuevas unidades en el inventario.
          </p>
        </div>
      </div>

      {/* Formulario */}

      <form
        noValidate
        onSubmit={handleSubmit(() => {
          // No se realizan modificaciones de inventario.
        })}
        className="mt-5 flex flex-col gap-4"
      >
        {/* Escaneo EAN-13 */}

        <button
          type="button"
          disabled
          aria-describedby="escaneo-pendiente"
          className={`flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#8ABBF6] bg-[#E5F1FF] px-4 py-3 text-sm font-bold text-[#0755D8] disabled:cursor-not-allowed disabled:opacity-70 ${FOCO}`}
        >
          <ScanBarcode size={24} aria-hidden="true" />
          Escanear EAN-13
        </button>

        <p
          id="escaneo-pendiente"
          className="-mt-2 text-xs text-[#64748B]"
        >
          Escaneo pendiente de integración. Puedes ingresar
          el código manualmente.
        </p>

        {/* Código y cantidad */}

        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">

          {/* Código EAN-13 */}

          <div className="min-w-0">
            <label
              htmlFor="inventario-ean"
              className="text-sm font-bold text-[#14285B]"
            >
              Código EAN-13
            </label>

            <input
              id="inventario-ean"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              maxLength={13}
              placeholder="7501234567893"
              aria-invalid={Boolean(errors.ean)}
              aria-describedby={
                errors.ean
                  ? "inventario-ean-error"
                  : undefined
              }
              {...register("ean")}
              className={`mt-1.5 h-11 w-full rounded-xl border bg-white px-3 text-sm text-[#14285B] placeholder:text-[#94A3B8] ${
                errors.ean
                  ? "border-red-500"
                  : "border-[#B9C9DE]"
              } ${FOCO}`}
            />

            {errors.ean && (
              <p
                id="inventario-ean-error"
                role="alert"
                className="mt-1.5 text-xs text-red-700"
              >
                {errors.ean.message}
              </p>
            )}
          </div>

          {/* Cantidad */}

          <div>
            <label
              htmlFor="inventario-cantidad"
              className="text-sm font-bold text-[#14285B]"
            >
              Cantidad
            </label>

            <div
              className={`mt-1.5 flex h-11 items-center rounded-xl border bg-white ${
                errors.cantidad
                  ? "border-red-500"
                  : "border-[#B9C9DE]"
              }`}
            >
              <button
                type="button"
                aria-label="Disminuir cantidad"
                disabled={
                  !Number.isFinite(cantidad) ||
                  cantidad <= 1
                }
                onClick={() =>
                  cambiarCantidad(cantidad - 1)
                }
                className={`flex h-full w-11 shrink-0 items-center justify-center rounded-l-[11px] bg-[#EAF2FF] text-[#0755D8] transition hover:bg-[#D8E8FF] disabled:cursor-not-allowed disabled:opacity-40 ${FOCO}`}
              >
                <Minus size={18} aria-hidden="true" />
              </button>

              <input
                id="inventario-cantidad"
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                aria-invalid={Boolean(errors.cantidad)}
                aria-describedby={
                  errors.cantidad
                    ? "inventario-cantidad-error"
                    : undefined
                }
                {...register("cantidad", {
                  valueAsNumber: true,
                })}
                className={`h-full w-full min-w-0 bg-transparent text-center text-sm font-bold text-[#14285B] [appearance:textfield] sm:w-16 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${FOCO}`}
              />

              <button
                type="button"
                aria-label="Aumentar cantidad"
                disabled={
                  cantidad >= Number.MAX_SAFE_INTEGER
                }
                onClick={() =>
                  cambiarCantidad(
                    Number.isFinite(cantidad)
                      ? cantidad + 1
                      : 1,
                  )
                }
                className={`flex h-full w-11 shrink-0 items-center justify-center rounded-r-[11px] bg-[#EAF2FF] text-[#0755D8] transition hover:bg-[#D8E8FF] disabled:cursor-not-allowed disabled:opacity-40 ${FOCO}`}
              >
                <Plus size={18} aria-hidden="true" />
              </button>
            </div>

            {errors.cantidad && (
              <p
                id="inventario-cantidad-error"
                role="alert"
                className="mt-1.5 text-xs text-red-700"
              >
                {errors.cantidad.message}
              </p>
            )}
          </div>
        </div>

        {/* Botón de registro */}

        <button
          type="submit"
          disabled
          aria-describedby="ingreso-pendiente"
          className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0649D8] to-[#0876E9] px-4 py-3 text-sm font-extrabold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${FOCO}`}
        >
          <PackageCheck size={21} aria-hidden="true" />
          Registrar ingreso
        </button>

        {/* Información de integración */}

        <div
          id="ingreso-pendiente"
          className="flex items-start gap-2.5 rounded-xl border border-[#D8E8FF] bg-[#EFF6FF] p-3"
        >
          <Info
            size={18}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[#0755D8]"
          />

          <p className="text-xs leading-relaxed text-[#1E40AF]">
            El registro de ingresos estará disponible
            cuando se complete la integración con el
            backend y se confirme la sede asignada al
            farmacéutico.
          </p>
        </div>
      </form>
    </section>
  );
}