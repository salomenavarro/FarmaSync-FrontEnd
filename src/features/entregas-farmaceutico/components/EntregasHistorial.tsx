"use client";

import {
  History,
  Search,
  CalendarDays,
  PackageCheck,
  RotateCcw,
  Inbox,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type {
  ReservaEntrega,
  FiltrosHistorialEntregas,
} from "../types";

import {
  formatearFechaEntrega,
} from "../utils/entregas.utils";

// =========================================================
// PROPIEDADES DEL COMPONENTE
// =========================================================

interface EntregasHistorialProps {
  historial: ReservaEntrega[];
  filtrosHistorial: FiltrosHistorialEntregas;
  hayFiltrosActivos: boolean;
  cargando: boolean;
  actualizarFiltroHistorial: <
    K extends keyof FiltrosHistorialEntregas
  >(
    campo: K,
    valor: FiltrosHistorialEntregas[K]
  ) => void;
  restablecerFiltrosHistorial: () => void;
}

// =========================================================
// ESTILOS COMPARTIDOS
// =========================================================

const ESTILOS_INPUT =
  "h-11 w-full min-w-0 rounded-xl border border-[#DCE4EF] bg-[#F8FAFD] px-3 text-sm text-[#14285B] outline-none transition-colors focus:border-[#0755D8] focus:ring-2 focus:ring-[#0755D8]/15";

// =========================================================
// COMPONENTE PRINCIPAL
// =========================================================

export default function EntregasHistorial({
  historial,
  filtrosHistorial,
  hayFiltrosActivos,
  cargando,
  actualizarFiltroHistorial,
  restablecerFiltrosHistorial,
}: EntregasHistorialProps) {
  return (
    <section
      aria-labelledby="historial-entregas-titulo"
      className="min-w-0 rounded-[22px] border border-[#DCE9F8] bg-white p-4 shadow-[0_3px_12px_rgba(20,40,91,0.04)] sm:p-5"
    >
      {/* ENCABEZADO */}

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FF] text-[#0755D8]">
            <History
              size={23}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <h2
              id="historial-entregas-titulo"
              className="text-base font-bold text-[#14285B] sm:text-lg"
            >
              Historial de entregas
            </h2>

            <p className="mt-1 text-xs leading-relaxed text-[#64748B] sm:text-sm">
              Consulta las reservas que ya fueron entregadas
              en tu sede farmacéutica.
            </p>
          </div>
        </div>

        <span className="rounded-full bg-[#E8F1FF] px-3 py-1.5 text-xs font-semibold text-[#0755D8]">
          {historial.length} registros
        </span>
      </div>

      {/* FILTROS DEL HISTORIAL */}

      <div className="mt-5 rounded-2xl border border-[#E2EAF4] bg-[#F8FAFD] p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_auto]">

          {/* BUSCADOR */}

          <div className="min-w-0 sm:col-span-2 xl:col-span-1">
            <label
              htmlFor="historial-busqueda"
              className="mb-2 block text-xs font-semibold text-[#475569]"
            >
              Buscar entrega
            </label>

            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                aria-hidden="true"
              />

              <input
                id="historial-busqueda"
                type="search"
                value={filtrosHistorial.busqueda}
                onChange={(event) =>
                  actualizarFiltroHistorial(
                    "busqueda",
                    event.target.value
                  )
                }
                placeholder="Código, paciente o medicamento"
                className={`${ESTILOS_INPUT} bg-white pl-10 placeholder:text-[#94A3B8]`}
              />
            </div>
          </div>

          {/* FECHA DESDE */}

          <div className="min-w-0">
            <label
              htmlFor="historial-fecha-desde"
              className="mb-2 block text-xs font-semibold text-[#475569]"
            >
              Fecha desde
            </label>

            <input
              id="historial-fecha-desde"
              type="date"
              value={filtrosHistorial.fechaDesde}
              max={filtrosHistorial.fechaHasta || undefined}
              onChange={(event) =>
                actualizarFiltroHistorial(
                  "fechaDesde",
                  event.target.value
                )
              }
              className={`${ESTILOS_INPUT} bg-white`}
            />
          </div>

          {/* FECHA HASTA */}

          <div className="min-w-0">
            <label
              htmlFor="historial-fecha-hasta"
              className="mb-2 block text-xs font-semibold text-[#475569]"
            >
              Fecha hasta
            </label>

            <input
              id="historial-fecha-hasta"
              type="date"
              value={filtrosHistorial.fechaHasta}
              min={filtrosHistorial.fechaDesde || undefined}
              onChange={(event) =>
                actualizarFiltroHistorial(
                  "fechaHasta",
                  event.target.value
                )
              }
              className={`${ESTILOS_INPUT} bg-white`}
            />
          </div>

          {/* RESTABLECER FILTROS */}

          <div className="flex items-end sm:col-span-2 xl:col-span-1">
            <Button
              type="button"
              variant="outline"
              onClick={restablecerFiltrosHistorial}
              disabled={!hayFiltrosActivos}
              className="h-11 w-full gap-2 rounded-xl border-[#DCE4EF] bg-white px-4 text-[#475569] hover:bg-[#F1F5F9]"
            >
              <RotateCcw
                size={16}
                aria-hidden="true"
              />

              Restablecer
            </Button>
          </div>
        </div>

        {/* INFORMACIÓN DE RESULTADOS */}

        <div
          role="status"
          className="mt-3 flex flex-wrap items-center justify-between gap-2"
        >
          <p className="text-xs text-[#64748B]">
            {historial.length}{" "}
            {historial.length === 1
              ? "entrega encontrada"
              : "entregas encontradas"}
          </p>

          {hayFiltrosActivos && (
            <span className="rounded-full bg-[#E8F1FF] px-2.5 py-1 text-[11px] font-medium text-[#0755D8]">
              Filtros activos
            </span>
          )}
        </div>
      </div>

      {/* ESTADO DE CARGA */}

      {cargando ? (
        <div
          role="status"
          className="flex min-h-[220px] flex-col items-center justify-center gap-3"
        >
          <Loader2
            size={28}
            className="animate-spin text-[#0755D8]"
            aria-hidden="true"
          />

          <p className="text-sm text-[#64748B]">
            Cargando historial de entregas...
          </p>
        </div>
      ) : historial.length === 0 ? (

        /* ESTADO VACÍO */

        <div className="flex min-h-[240px] flex-col items-center justify-center px-4 py-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F1FF] text-[#0755D8]">
            <Inbox
              size={30}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </div>

          <h3 className="mt-4 text-base font-bold text-[#14285B]">
            {hayFiltrosActivos
              ? "No encontramos resultados"
              : "Aún no hay entregas registradas"}
          </h3>

          <p className="mt-2 max-w-[360px] text-sm leading-relaxed text-[#64748B]">
            {hayFiltrosActivos
              ? "Intenta modificar los filtros para encontrar la entrega que estás buscando."
              : "Las reservas entregadas aparecerán en este historial."}
          </p>

          {hayFiltrosActivos && (
            <Button
              type="button"
              variant="outline"
              onClick={restablecerFiltrosHistorial}
              className="mt-4 gap-2 rounded-xl border-[#DCE4EF] text-[#0755D8]"
            >
              <RotateCcw
                size={16}
                aria-hidden="true"
              />

              Restablecer filtros
            </Button>
          )}
        </div>
      ) : (
        <>
          {/* TABLA PARA ESCRITORIO */}

          <div className="mt-5 hidden overflow-hidden rounded-2xl border border-[#E2EAF4] xl:block">
            <table className="w-full table-fixed text-left">
              <caption className="sr-only">
                Historial de medicamentos entregados
              </caption>

              <thead className="border-b border-[#E2EAF4] bg-[#F5F9FF]">
                <tr>
                  <th
                    scope="col"
                    className="w-[13%] px-3 py-3.5 text-xs font-semibold text-[#475569]"
                  >
                    Código
                  </th>

                  <th
                    scope="col"
                    className="w-[22%] px-3 py-3.5 text-xs font-semibold text-[#475569]"
                  >
                    Beneficiario
                  </th>

                  <th
                    scope="col"
                    className="w-[23%] px-3 py-3.5 text-xs font-semibold text-[#475569]"
                  >
                    Medicamento
                  </th>

                  <th
                    scope="col"
                    className="w-[10%] px-2 py-3.5 text-center text-xs font-semibold text-[#475569]"
                  >
                    Cantidad
                  </th>

                  <th
                    scope="col"
                    className="w-[19%] px-3 py-3.5 text-xs font-semibold text-[#475569]"
                  >
                    Fecha de entrega
                  </th>

                  <th
                    scope="col"
                    className="w-[13%] px-2 py-3.5 text-center text-xs font-semibold text-[#475569]"
                  >
                    Estado
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E2EAF4]">
                {historial.map((reserva) => (
                  <tr
                    key={reserva.id}
                    className="transition-colors hover:bg-[#F8FAFD]"
                  >
                    <td className="break-words px-3 py-4 text-sm font-semibold text-[#0755D8]">
                      {reserva.codigo}
                    </td>

                    <td className="px-3 py-4">
                      <p className="break-words text-sm font-semibold text-[#14285B]">
                        {reserva.beneficiario.nombreCompleto}
                      </p>

                      <p className="mt-1 text-xs text-[#64748B]">
                        {reserva.beneficiario.tipo === "TITULAR"
                          ? "Titular"
                          : "Dependiente"}
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <p className="break-words text-sm font-semibold text-[#14285B]">
                        {reserva.medicamento.nombre}
                      </p>

                      <p className="mt-1 break-words text-xs text-[#64748B]">
                        {reserva.medicamento.concentracion}
                        {" · "}
                        {reserva.medicamento.presentacion}
                      </p>
                    </td>

                    <td className="px-2 py-4 text-center text-sm font-semibold text-[#14285B]">
                      {reserva.medicamento.cantidad}
                    </td>

                    <td className="break-words px-3 py-4 text-xs leading-relaxed text-[#475569]">
                      {formatearFechaEntrega(
                        reserva.fechaEntrega
                      )}
                    </td>

                    <td className="px-2 py-4 text-center">
                      <span className="inline-block max-w-full rounded-full bg-[#E4F6EC] px-2 py-1.5 text-[11px] font-semibold text-[#15803D]">
                        Entregada
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TARJETAS PARA MÓVILES Y TABLETAS */}

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:hidden">
            {historial.map((reserva) => (
              <article
                key={reserva.id}
                className="min-w-0 rounded-2xl border border-[#E2EAF4] bg-[#F8FAFD] p-4"
              >
                {/* CÓDIGO Y ESTADO */}

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="break-all text-sm font-bold text-[#0755D8]">
                    {reserva.codigo}
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E4F6EC] px-2.5 py-1.5 text-[11px] font-semibold text-[#15803D]">
                    <PackageCheck
                      size={13}
                      aria-hidden="true"
                    />

                    Entregada
                  </span>
                </div>

                {/* BENEFICIARIO */}

                <div className="mt-4">
                  <p className="text-xs text-[#64748B]">
                    Beneficiario
                  </p>

                  <p className="mt-1 break-words text-sm font-semibold text-[#14285B]">
                    {reserva.beneficiario.nombreCompleto}
                  </p>

                  <p className="mt-1 text-xs text-[#64748B]">
                    {reserva.beneficiario.tipo === "TITULAR"
                      ? "Titular"
                      : "Dependiente"}
                  </p>
                </div>

                {/* MEDICAMENTO */}

                <div className="mt-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-[#64748B]">
                      Medicamento
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold text-[#14285B]">
                      {reserva.medicamento.nombre}
                    </p>

                    <p className="mt-1 break-words text-xs text-[#64748B]">
                      {reserva.medicamento.concentracion}
                      {" · "}
                      {reserva.medicamento.presentacion}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xs text-[#64748B]">
                      Cantidad
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#14285B]">
                      {reserva.medicamento.cantidad}
                    </p>
                  </div>
                </div>

                {/* FECHA DE ENTREGA */}

                <div className="mt-4 flex items-start gap-2 border-t border-[#E2EAF4] pt-3">
                  <CalendarDays
                    size={17}
                    className="shrink-0 text-[#0755D8]"
                    aria-hidden="true"
                  />

                  <div className="min-w-0">
                    <p className="text-xs text-[#64748B]">
                      Fecha de entrega
                    </p>

                    <p className="mt-1 text-xs font-medium text-[#14285B]">
                      {formatearFechaEntrega(
                        reserva.fechaEntrega
                      )}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* PIE DEL HISTORIAL */}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-[#64748B]">
              Mostrando {historial.length}{" "}
              {historial.length === 1
                ? "entrega"
                : "entregas"}
            </p>

            <p className="text-xs text-[#64748B]">
              Ordenadas desde la más reciente.
            </p>
          </div>
        </>
      )}
    </section>
  );
}