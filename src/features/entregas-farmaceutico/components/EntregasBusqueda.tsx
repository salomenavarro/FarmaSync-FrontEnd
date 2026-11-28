"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Search,
  QrCode,
  ScanLine,
  X,
  Info,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  buscarReservaSchema,
  type BuscarReservaFormData,
} from "../schemas/entregas.schema";

import type { EstadoBusquedaEntrega } from "../types";

// =========================================================
// PROPIEDADES DEL COMPONENTE
// =========================================================

interface EntregasBusquedaProps {
  codigoBuscado: string;
  estadoBusqueda: EstadoBusquedaEntrega;
  cargando: boolean;
  buscarReserva: (codigo: string) => void;
  limpiarBusqueda: () => void;
}

// =========================================================
// COMPONENTE PRINCIPAL
// =========================================================

export default function EntregasBusqueda({
  codigoBuscado,
  estadoBusqueda,
  cargando,
  buscarReserva,
  limpiarBusqueda,
}: EntregasBusquedaProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BuscarReservaFormData>({
    resolver: zodResolver(buscarReservaSchema),
    defaultValues: {
      codigo: codigoBuscado,
    },
  });

  const buscando =
    cargando || estadoBusqueda === "BUSCANDO";

  // =========================================================
  // ENVÍO DEL FORMULARIO
  // =========================================================

  function onSubmit(data: BuscarReservaFormData) {
    buscarReserva(data.codigo);
  }

  // =========================================================
  // LIMPIAR FORMULARIO
  // =========================================================

  function manejarLimpiar() {
    reset({
      codigo: "",
    });

    limpiarBusqueda();
  }

  return (
    <section
      aria-labelledby="buscar-reserva-titulo"
      className="min-w-0 rounded-[22px] border border-[#DCE9F8] bg-white p-4 shadow-[0_3px_12px_rgba(20,40,91,0.04)] sm:p-5"
    >
      {/* ENCABEZADO */}

      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FF] text-[#0755D8]">
          <ScanLine
            size={23}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0">
          <h2
            id="buscar-reserva-titulo"
            className="text-base font-bold text-[#14285B] sm:text-lg"
          >
            Entrega en ventanilla
          </h2>

          <p className="mt-1 text-xs leading-relaxed text-[#64748B] sm:text-sm">
            Identifica la reserva del paciente para consultar
            la información de la entrega.
          </p>
        </div>
      </div>

      {/* FORMULARIO DE BÚSQUEDA */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5"
        noValidate
      >
        <label
          htmlFor="codigo-reserva"
          className="mb-2 block text-sm font-semibold text-[#14285B]"
        >
          Código de reserva
        </label>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-start">

          {/* CAMPO DE BÚSQUEDA */}

          <div className="min-w-0 flex-1">
            <div className="relative">
              <Search
                size={19}
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
              />

              <input
                id="codigo-reserva"
                type="text"
                placeholder="Ej. FS-8K7L"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                disabled={buscando}
                aria-invalid={!!errors.codigo}
                aria-describedby={
                  errors.codigo
                    ? "codigo-reserva-error"
                    : undefined
                }
                {...register("codigo")}
                className={`h-12 w-full rounded-xl border bg-[#F8FAFD] pl-11 pr-4 text-sm font-medium text-[#14285B] outline-none transition-colors placeholder:font-normal placeholder:text-[#94A3B8] focus:border-[#0755D8] focus:ring-2 focus:ring-[#0755D8]/15 disabled:opacity-60 ${
                  errors.codigo
                    ? "border-red-500"
                    : "border-[#DCE4EF]"
                }`}
              />
            </div>

            {errors.codigo && (
              <p
                id="codigo-reserva-error"
                role="alert"
                className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600"
              >
                <AlertCircle
                  size={14}
                  aria-hidden="true"
                />

                {errors.codigo.message}
              </p>
            )}
          </div>

          {/* BOTÓN BUSCAR */}

          <Button
            type="submit"
            disabled={buscando}
            className="h-12 shrink-0 gap-2 rounded-xl bg-[#0755D8] px-5 font-semibold text-white hover:bg-[#0648B8]"
          >
            {buscando ? (
              <Loader2
                size={18}
                className="animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Search
                size={18}
                aria-hidden="true"
              />
            )}

            {buscando ? "Buscando..." : "Buscar reserva"}
          </Button>

          {/* BOTÓN LIMPIAR */}

          <Button
            type="button"
            variant="outline"
            onClick={manejarLimpiar}
            disabled={buscando}
            className="h-12 shrink-0 gap-2 rounded-xl border-[#DCE4EF] px-4 text-[#475569] hover:bg-[#F1F5F9]"
          >
            <X
              size={17}
              aria-hidden="true"
            />

            Limpiar
          </Button>
        </div>
      </form>

      {/* SEPARADOR */}

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#E2E8F0]" />

        <span className="text-xs font-medium text-[#64748B]">
          O utiliza el código QR
        </span>

        <div className="h-px flex-1 bg-[#E2E8F0]" />
      </div>

      {/* ESCANEO QR */}

      <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-[#BFD3EF] bg-[#F5F9FF] p-4 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#0755D8] shadow-sm">
          <QrCode
            size={27}
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-[#14285B]">
            Escanear código QR
          </h3>

          <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
            Funcionalidad pendiente de implementación.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled
          className="h-10 shrink-0 gap-2 rounded-xl border-[#BFD3EF] bg-white text-[#0755D8]"
        >
          <ScanLine
            size={17}
            aria-hidden="true"
          />

          Escanear QR
        </Button>
      </div>

      {/* RESERVA NO ENCONTRADA */}

      {estadoBusqueda === "NO_ENCONTRADA" && (
        <div
          role="status"
          className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#FDE3B0] bg-[#FFF8E8] p-3"
        >
          <AlertCircle
            size={19}
            className="shrink-0 text-[#A16207]"
            aria-hidden="true"
          />

          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#92400E]">
              Reserva no encontrada
            </p>

            <p className="mt-1 break-all text-xs leading-relaxed text-[#92400E]">
              No encontramos una reserva con el código{" "}
              <strong>{codigoBuscado}</strong>. Verifica
              el código e inténtalo nuevamente.
            </p>
          </div>
        </div>
      )}

      {/* ERROR DE BÚSQUEDA */}

      {estadoBusqueda === "ERROR" && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle
            size={18}
            className="shrink-0"
            aria-hidden="true"
          />

          No fue posible realizar la búsqueda. Inténtalo
          nuevamente.
        </div>
      )}

      {/* RECOMENDACIÓN */}

      <div className="mt-4 flex items-start gap-2">
        <Info
          size={16}
          className="mt-0.5 shrink-0 text-[#0755D8]"
          aria-hidden="true"
        />

        <p className="text-xs leading-relaxed text-[#64748B]">
          Recuerda verificar la identidad del beneficiario y
          la orden médica antes de confirmar cualquier
          entrega.
        </p>
      </div>
    </section>
  );
}