"use client";

import {
  AlertCircle,
  Boxes,
  Building2,
  LoaderCircle,
  PackageSearch,
  RefreshCw,
  SearchX,
} from "lucide-react";

import type { EstadoStock } from "@/features/catalogo/types";
import type { MedicamentoInventario } from "../types";

import {
  obtenerEstadoInventario,
  formatearCantidad,
} from "../utils/inventario.utils";

// =========================================================
// PROPIEDADES
// =========================================================

interface InventarioTableProps {
  medicamentos: MedicamentoInventario[];
  cargando: boolean;
  error: string | null;
  sedeDisponible: boolean;
  inventarioConsultado: boolean;
  hayFiltrosActivos: boolean;
  recargarInventario: () => void;
  restablecerFiltros: () => void;
}

// =========================================================
// ESTILOS DE DISPONIBILIDAD
// =========================================================

const ESTILOS_ESTADO: Record<
  EstadoStock,
  {
    etiqueta: string;
    fondo: string;
    punto: string;
  }
> = {
  Disponible: {
    etiqueta: "Disponible",
    fondo: "bg-[#DCFCE7] text-[#166534]",
    punto: "bg-[#16A34A]",
  },

  "Disponibilidad limitada": {
    etiqueta: "Stock bajo",
    fondo: "bg-[#FEF3C7] text-[#92400E]",
    punto: "bg-[#D97706]",
  },

  Agotado: {
    etiqueta: "Agotado",
    fondo: "bg-[#FEE2E2] text-[#B91C1C]",
    punto: "bg-[#DC2626]",
  },
};

// =========================================================
// ETIQUETA DE ESTADO
// =========================================================

function EstadoInventarioBadge({
  medicamento,
}: {
  medicamento: MedicamentoInventario;
}) {
  const estado = obtenerEstadoInventario(medicamento);
  const estilos = ESTILOS_ESTADO[estado];

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${estilos.fondo}`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 shrink-0 rounded-full ${estilos.punto}`}
      />

      {estilos.etiqueta}
    </span>
  );
}

// =========================================================
// TABLA DE INVENTARIO
// =========================================================

export default function InventarioTable({
  medicamentos,
  cargando,
  error,
  sedeDisponible,
  inventarioConsultado,
  hayFiltrosActivos,
  recargarInventario,
  restablecerFiltros,
}: InventarioTableProps) {
  return (
    <section
      aria-labelledby="inventario-tabla-titulo"
      aria-busy={cargando}
      className="min-w-0 overflow-hidden rounded-[22px] border border-[#DCE9F8] bg-white shadow-[0_4px_14px_rgba(20,40,91,0.04)]"
    >
      {/* Encabezado */}

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5EDF8] p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F1FF] text-[#0755D8]">
            <Boxes size={23} aria-hidden="true" />
          </div>

          <div>
            <h2
              id="inventario-tabla-titulo"
              className="text-base font-extrabold text-[#14285B] sm:text-lg"
            >
              Existencias de medicamentos
            </h2>

            <p className="mt-0.5 text-xs text-[#64748B] sm:text-sm">
              Inventario actual de la sede.
            </p>
          </div>
        </div>

        {inventarioConsultado && (
          <span className="rounded-full bg-[#E5F1FF] px-3 py-1.5 text-xs font-bold text-[#0755D8]">
            {medicamentos.length} medicamentos
          </span>
        )}
      </div>

      {/* Sede no disponible */}

      {!sedeDisponible ? (
        <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F1FF] text-[#0755D8]">
            <Building2 size={30} aria-hidden="true" />
          </div>

          <h3 className="mt-4 text-base font-bold text-[#14285B]">
            Sede pendiente de identificación
          </h3>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-[#64748B]">
            No ha sido posible identificar la sede asignada
            a tu cuenta. Las existencias estarán disponibles
            cuando se complete esta integración.
          </p>
        </div>
      ) : cargando ? (

        /* Estado de carga */

        <div
          role="status"
          className="flex flex-col items-center justify-center px-5 py-12 text-center"
        >
          <LoaderCircle
            size={34}
            aria-hidden="true"
            className="animate-spin text-[#0755D8] motion-reduce:animate-none"
          />

          <p className="mt-4 text-sm font-semibold text-[#526580]">
            Consultando inventario...
          </p>
        </div>
      ) : error ? (

        /* Estado de error */

        <div
          role="alert"
          className="flex flex-col items-center justify-center px-5 py-12 text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertCircle size={30} aria-hidden="true" />
          </div>

          <h3 className="mt-4 text-base font-bold text-[#14285B]">
            No se pudo cargar el inventario
          </h3>

          <p className="mt-2 max-w-md text-sm text-[#64748B]">
            {error}
          </p>

          <button
            type="button"
            onClick={recargarInventario}
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0755D8] px-5 text-sm font-bold text-white transition hover:bg-[#0649B8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]"
          >
            <RefreshCw size={17} aria-hidden="true" />
            Reintentar
          </button>
        </div>
      ) : !inventarioConsultado ? (

        /* Consulta pendiente */

        <div className="px-5 py-12 text-center">
          <p className="text-sm text-[#64748B]">
            Inventario pendiente de consulta.
          </p>
        </div>
      ) : medicamentos.length === 0 ? (

        /* Estado vacío */

        <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F1FF] text-[#0755D8]">
            {hayFiltrosActivos ? (
              <SearchX size={30} aria-hidden="true" />
            ) : (
              <PackageSearch size={30} aria-hidden="true" />
            )}
          </div>

          <h3 className="mt-4 text-base font-bold text-[#14285B]">
            {hayFiltrosActivos
              ? "No encontramos coincidencias"
              : "No hay medicamentos registrados"}
          </h3>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-[#64748B]">
            {hayFiltrosActivos
              ? "Intenta modificar la búsqueda o los filtros seleccionados."
              : "Actualmente no existen registros de inventario para esta sede."}
          </p>

          {hayFiltrosActivos && (
            <button
              type="button"
              onClick={restablecerFiltros}
              className="mt-5 min-h-11 rounded-xl border border-[#B9C9DE] px-5 text-sm font-bold text-[#0755D8] transition hover:bg-[#E5F1FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]"
            >
              Restablecer filtros
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Tabla para escritorio */}

          <div className="hidden xl:block">
            <table className="w-full table-fixed text-left text-sm">
              <thead className="border-b border-[#DCE9F8] bg-[#F5F9FF] text-xs font-semibold text-[#526580]">
                <tr>
                  <th scope="col" className="w-[19%] px-4 py-3">
                    Código
                  </th>

                  <th scope="col" className="w-[28%] px-4 py-3">
                    Medicamento
                  </th>

                  <th scope="col" className="w-[15%] px-4 py-3">
                    Concentración
                  </th>

                  <th scope="col" className="w-[14%] px-4 py-3">
                    Presentación
                  </th>

                  <th scope="col" className="w-[10%] px-3 py-3 text-center">
                    Stock
                  </th>

                  <th scope="col" className="w-[14%] px-3 py-3">
                    Estado
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E5EDF8]">
                {medicamentos.map((medicamento) => (
                  <tr
                    key={`${medicamento.sedeId}-${medicamento.id}`}
                    className="transition hover:bg-[#F8FBFF]"
                  >
                    <td className="break-all px-4 py-4 text-xs font-semibold text-[#526580]">
                      {medicamento.codigo}
                    </td>

                    <td className="break-words px-4 py-4 font-bold text-[#14285B]">
                      {medicamento.nombreGenerico}
                    </td>

                    <td className="break-words px-4 py-4 text-[#526580]">
                      {medicamento.concentracion || "—"}
                    </td>

                    <td className="break-words px-4 py-4 text-[#526580]">
                      {medicamento.presentacion || "—"}
                    </td>

                    <td className="break-all px-3 py-4 text-center font-extrabold text-[#14285B] tabular-nums">
                      {formatearCantidad(
                        medicamento.cantidad,
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <EstadoInventarioBadge
                        medicamento={medicamento}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tarjetas para móvil y tableta */}

          <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 xl:hidden">
            {medicamentos.map((medicamento) => (
              <article
                key={`${medicamento.sedeId}-${medicamento.id}`}
                className="min-w-0 rounded-2xl border border-[#DCE9F8] bg-[#F8FBFF] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="break-words text-sm font-extrabold text-[#14285B]">
                      {medicamento.nombreGenerico}
                    </h3>

                    <p className="mt-1 text-xs text-[#64748B]">
                      {medicamento.concentracion || "—"}
                      {" · "}
                      {medicamento.presentacion || "—"}
                    </p>
                  </div>

                  <EstadoInventarioBadge
                    medicamento={medicamento}
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE9F8] pt-3">
                  <div className="min-w-0">
                    <p className="text-xs text-[#64748B]">
                      Código
                    </p>

                    <p className="mt-1 break-all text-xs font-semibold text-[#14285B]">
                      {medicamento.codigo}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-[#64748B]">
                      Unidades
                    </p>

                    <p className="mt-1 text-xl font-extrabold text-[#14285B] tabular-nums">
                      {formatearCantidad(
                        medicamento.cantidad,
                      )}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}