"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  CalendarDays,
  History,
  CircleCheck,
  Info,
  X,
} from "lucide-react";

import ReservasHeader from "./ReservasHeader";
import ReservasStats from "./ReservasStats";
import ReservasFilters from "./ReservasFilters";
import ReservaCard from "./ReservaCard";
import ReservaDetalleModal from "./ReservaDetalleModal";
import CancelarReservaModal from "./CancelarReservaModal";
import ReservasEmptyState from "./ReservasEmptyState";

import { calcularIndicadores } from "../data/reservasMock";

import type {
  Reserva,
  FiltrosReservas,
  CancelarReservaData,
} from "../types";

type ReservasContentProps = {
  reservasIniciales: Reserva[];
  fechaInicial: number;
};

type ModalReserva = {
  reservaId: number;
  modo: "detalles" | "codigo" | "cancelar";
} | null;

// Normalizar textos para facilitar las búsquedas
function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function ReservasContent({
  reservasIniciales,
  fechaInicial,
}: ReservasContentProps) {
  const searchParams = useSearchParams();

  const esHistorial =
    searchParams.get("vista") === "historial";

  // ESTADOS PRINCIPALES
  const [reservas, setReservas] =
    useState<Reserva[]>(reservasIniciales);

  const [ahora, setAhora] = useState(fechaInicial);

  const [filtros, setFiltros] =
    useState<FiltrosReservas>({
      busqueda: "",
      estado: "TODAS",
    });

  const [modal, setModal] =
    useState<ModalReserva>(null);

  const [mensaje, setMensaje] = useState("");

  // ACTUALIZAR EL TIEMPO CADA 30 SEGUNDOS
  useEffect(() => {
    setAhora(Date.now());

    const intervalo = window.setInterval(() => {
      setAhora(Date.now());
    }, 30000);

    return () => window.clearInterval(intervalo);
  }, []);

  // RESTABLECER LOS FILTROS AL CAMBIAR DE VISTA
  useEffect(() => {
    setFiltros({
      busqueda: "",
      estado: "TODAS",
    });

    setModal(null);
    setMensaje("");
  }, [esHistorial]);

  // OCULTAR MENSAJES AUTOMÁTICAMENTE
  useEffect(() => {
    if (!mensaje) return;

    const temporizador = window.setTimeout(() => {
      setMensaje("");
    }, 5000);

    return () =>
      window.clearTimeout(temporizador);
  }, [mensaje]);

  // ACTUALIZAR LOS ESTADOS SEGÚN EL VENCIMIENTO
  const reservasActualizadas = useMemo(() => {
    return reservas.map((reserva): Reserva => {
      const vencimiento = new Date(
        reserva.fechaVencimiento
      ).getTime();

      if (
        reserva.estado === "ACTIVA" &&
        vencimiento <= ahora
      ) {
        return {
          ...reserva,
          estado: "VENCIDA",
        };
      }

      return reserva;
    });
  }, [reservas, ahora]);

  // INDICADORES GENERALES
  const indicadores = useMemo(() => {
    return calcularIndicadores(
      reservasActualizadas
    );
  }, [reservasActualizadas]);

  // RESERVAS SEGÚN LA VISTA ACTUAL
  const reservasVista = useMemo(() => {
    if (esHistorial) {
      return reservasActualizadas.filter(
        (reserva) => reserva.estado !== "ACTIVA"
      );
    }

    return reservasActualizadas;
  }, [reservasActualizadas, esHistorial]);

  // INDICADORES DE LOS FILTROS
  const indicadoresVista = useMemo(() => {
    return calcularIndicadores(reservasVista);
  }, [reservasVista]);

  // BÚSQUEDA Y FILTRADO
  const reservasFiltradas = useMemo(() => {
    const busqueda = normalizarTexto(
      filtros.busqueda
    );

    return reservasVista
      .filter((reserva) => {
        const informacion = normalizarTexto(
          [
            reserva.medicamento.nombre,
            reserva.medicamento.concentracion,
            reserva.codigo,
            reserva.sede.nombre,
            reserva.beneficiario.nombreCompleto,
          ].join(" ")
        );

        const coincideBusqueda =
          !busqueda ||
          informacion.includes(busqueda);

        const coincideEstado =
          filtros.estado === "TODAS" ||
          reserva.estado === filtros.estado;

        return (
          coincideBusqueda &&
          coincideEstado
        );
      })
      .sort((a, b) => {
        // Mostrar primero las reservas activas
        if (
          a.estado === "ACTIVA" &&
          b.estado !== "ACTIVA"
        ) {
          return -1;
        }

        if (
          a.estado !== "ACTIVA" &&
          b.estado === "ACTIVA"
        ) {
          return 1;
        }

        // Ordenar de la más reciente a la más antigua
        return (
          new Date(b.fechaCreacion).getTime() -
          new Date(a.fechaCreacion).getTime()
        );
      });
  }, [reservasVista, filtros]);

  // IDENTIFICAR SI HAY FILTROS ACTIVOS
  const hayFiltros =
    filtros.busqueda.trim() !== "" ||
    filtros.estado !== "TODAS";

  // OBTENER LA RESERVA SELECCIONADA
  const reservaSeleccionada = modal
    ? reservasActualizadas.find(
        (reserva) =>
          reserva.id === modal.reservaId
      )
    : undefined;

  // LIMPIAR FILTROS
  function limpiarFiltros() {
    setFiltros({
      busqueda: "",
      estado: "TODAS",
    });
  }

  // ABRIR MODAL DE DETALLES
  function verDetalles(reserva: Reserva) {
    setModal({
      reservaId: reserva.id,
      modo: "detalles",
    });
  }

  // ABRIR MODAL DEL CÓDIGO
  function verCodigo(reserva: Reserva) {
    setModal({
      reservaId: reserva.id,
      modo: "codigo",
    });
  }

  // ABRIR MODAL DE CANCELACIÓN
  function cancelarReserva(reserva: Reserva) {
    setModal({
      reservaId: reserva.id,
      modo: "cancelar",
    });
  }

  // CERRAR MODALES
  function cerrarModal() {
    setModal(null);
  }

  // CONFIRMAR CANCELACIÓN SIMULADA
  function confirmarCancelacion(
    datos: CancelarReservaData
  ) {
    const momentoActual = Date.now();

    const reserva = reservas.find(
      (item) => item.id === datos.reservaId
    );

    if (!reserva) return;

    const fechaRetiro = new Date(
      reserva.fechaRetiro
    ).getTime();

    const fechaVencimiento = new Date(
      reserva.fechaVencimiento
    ).getTime();

    // Validar nuevamente las reglas de negocio
    const puedeCancelar =
      reserva.estado === "ACTIVA" &&
      fechaVencimiento > momentoActual &&
      fechaRetiro - momentoActual >=
        60 * 60 * 1000;

    if (!puedeCancelar) {
      setAhora(momentoActual);
      return;
    }

    // Actualizar la reserva
    setReservas((anteriores) =>
      anteriores.map((item): Reserva =>
        item.id === datos.reservaId
          ? {
              ...item,
              estado: "CANCELADA",
              fechaCancelacion:
                new Date(
                  momentoActual
                ).toISOString(),
              motivoCancelacion: datos.motivo,
            }
          : item
      )
    );

    setAhora(momentoActual);

    // Mostrar todas las reservas después de cancelar
    limpiarFiltros();

    cerrarModal();

    setMensaje(
      `La reserva ${reserva.codigo} fue cancelada correctamente en la demostración.`
    );
  }

  return (
<div className="min-w-0 space-y-3 p-3">
      {/* ENCABEZADO PRINCIPAL */}
      <ReservasHeader />

      {/* INDICADORES GENERALES */}
      <ReservasStats
        indicadores={indicadores}
      />

      {/* MENSAJE DE CONFIRMACIÓN */}
      {mensaje && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-2xl border border-[#CDEDDD] bg-[#E6F7EF] p-4"
        >
          <CircleCheck
            size={23}
            className="mt-0.5 shrink-0 text-[#059669]"
            aria-hidden="true"
          />

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-[#047857]">
              Cancelación exitosa
            </h3>

            <p className="mt-1 text-sm text-[#047857]">
              {mensaje}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMensaje("")}
            aria-label="Cerrar notificación"
            className="cursor-pointer rounded-lg p-1 text-[#047857] transition-colors hover:bg-[#CDEDDD]"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* BÚSQUEDA Y FILTROS */}
      <ReservasFilters
        filtros={filtros}
        indicadores={indicadoresVista}
        onChange={setFiltros}
      />

      {/* ENCABEZADO DE RESULTADOS */}
      <div className="flex flex-wrap items-center justify-between gap-3">

        <div className="flex items-center gap-2.5">

          {esHistorial ? (
            <History
              size={21}
              className="text-[#0755D8]"
              aria-hidden="true"
            />
          ) : (
            <CalendarDays
              size={21}
              className="text-[#0755D8]"
              aria-hidden="true"
            />
          )}

          <h2 className="text-base font-bold text-[#14285B]">
            {esHistorial
              ? "Historial de reservas"
              : "Listado de reservas"}
          </h2>
        </div>

        <p
          aria-live="polite"
          className="text-xs font-medium text-[#64748B]"
        >
          Mostrando {reservasFiltradas.length} de{" "}
          {reservasVista.length} reservas
        </p>
      </div>

      {/* LISTADO DE RESERVAS */}
      {reservasFiltradas.length > 0 ? (
        <section
          aria-label={
            esHistorial
              ? "Historial de reservas"
              : "Listado de reservas"
          }
          className="space-y-3"
        >
          {reservasFiltradas.map((reserva) => (
            <ReservaCard
              key={reserva.id}
              reserva={reserva}
              ahora={ahora}
              onVerDetalles={verDetalles}
              onVerCodigo={verCodigo}
              onCancelar={cancelarReserva}
            />
          ))}
        </section>
      ) : (
        <ReservasEmptyState
          hayFiltros={hayFiltros}
          esHistorial={esHistorial}
          onLimpiarFiltros={limpiarFiltros}
        />
      )}

      {/* AVISO INFORMATIVO */}
      <div className="flex items-start gap-2.5 rounded-xl border border-[#D6E5FF] bg-[#F0F6FF] p-3.5">

        <Info
          size={18}
          className="mt-0.5 shrink-0 text-[#0755D8]"
          aria-hidden="true"
        />

        <p className="text-xs leading-relaxed text-[#475569]">
          Recuerda que las reservas tienen un plazo
          máximo de cinco días hábiles y únicamente
          pueden cancelarse con mínimo una hora de
          anticipación al retiro programado.
          Actualmente estás visualizando datos
          simulados.
        </p>
      </div>

      {/* MODAL DE DETALLES O CÓDIGO */}
      {modal &&
        reservaSeleccionada &&
        modal.modo !== "cancelar" && (
          <ReservaDetalleModal
            key={`${modal.reservaId}-${modal.modo}`}
            reserva={reservaSeleccionada}
            modo={modal.modo}
            ahora={ahora}
            onCerrar={cerrarModal}
          />
        )}

      {/* MODAL DE CANCELACIÓN */}
      {modal?.modo === "cancelar" &&
        reservaSeleccionada && (
          <CancelarReservaModal
            key={modal.reservaId}
            reserva={reservaSeleccionada}
            ahora={ahora}
            onCerrar={cerrarModal}
            onConfirmar={confirmarCancelacion}
          />
        )}
    </div>
  );
}