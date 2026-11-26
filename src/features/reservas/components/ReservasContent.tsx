"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, RefreshCw } from "lucide-react";

import ReservasHeader from "./ReservasHeader";
import ReservasStats from "./ReservasStats";
import ReservasFilters from "./ReservasFilters";
import ReservaCard from "./ReservaCard";
import ReservaDetalleModal from "./ReservaDetalleModal";
import CancelarReservaModal from "./CancelarReservaModal";
import ReservasEmptyState from "./ReservasEmptyState";

import { useMisReservas } from "../hooks/useMisReservas";
import { useSolicitarProrroga } from "../hooks/useSolicitarProrroga";
import { useCancelarReserva } from "../hooks/useCancelarReserva";
import { getReservasErrorMessage } from "../utils/get-reservas-error-message";

import type {
  Reserva,
  FiltrosReservas,
  CancelarReservaData,
  IndicadoresReservas,
} from "../types";

type ReservasContentProps = {
  reservasIniciales?: Reserva[];
  fechaInicial?: number;
};

// Calcular los indicadores según las reservas existentes
function calcularIndicadores(
  reservas: Reserva[],
  ahora: number
): IndicadoresReservas {
  const resueltas = reservas.map((reserva) => {
    const esActiva =
      reserva.estado === "ACTIVA" || reserva.estado === "PENDIENTE";
    if (
      esActiva &&
      new Date(reserva.fechaVencimiento).getTime() <= ahora
    ) {
      return "VENCIDA";
    }
    if (reserva.estado === "PENDIENTE") return "ACTIVA";
    if (reserva.estado === "ENTREGADA") return "COMPLETADA";
    if (reserva.estado === "CANCELADA_USUARIO") return "CANCELADA";
    if (reserva.estado === "EXPIRADA") return "VENCIDA";
    return reserva.estado;
  });

  return {
    total: resueltas.length,
    activas: resueltas.filter((e) => e === "ACTIVA").length,
    completadas: resueltas.filter((e) => e === "COMPLETADA").length,
    canceladas: resueltas.filter((e) => e === "CANCELADA").length,
    vencidas: resueltas.filter((e) => e === "VENCIDA").length,
  };
}

export default function ReservasContent({
  fechaInicial,
}: ReservasContentProps) {
  const searchParams = useSearchParams();
  const esHistorial = searchParams.get("vista") === "historial";

  const [ahora, setAhora] = useState<number>(
    () => fechaInicial ?? Date.now()
  );

  const [filtros, setFiltros] = useState<FiltrosReservas>({
    busqueda: "",
    estado: esHistorial ? "COMPLETADA" : "TODAS",
  });

  const [modalDetalle, setModalDetalle] = useState<{
    reservaId: number;
    modo: "detalles" | "codigo";
  } | null>(null);

  const [reservaACancelarId, setReservaACancelarId] = useState<
    number | null
  >(null);

  const [feedbackBanner, setFeedbackBanner] = useState<{
    tipo: "exito" | "error";
    mensaje: string;
  } | null>(null);

  const {
    data: reservas = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useMisReservas();

  const prorrogaMutation = useSolicitarProrroga();
  const cancelarMutation = useCancelarReserva();

  // Sincronizar pestaña cuando cambia el query param ?vista=historial
  useEffect(() => {
    setFiltros((prev) => ({
      ...prev,
      estado: esHistorial ? "COMPLETADA" : "TODAS",
    }));
  }, [esHistorial]);

  // Actualizar referencia de tiempo periódicamente para vigilar vencimientos
  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setAhora(Date.now());
    }, 60_000);

    return () => window.clearInterval(intervalo);
  }, []);

  const indicadores = useMemo(
    () => calcularIndicadores(reservas, ahora),
    [reservas, ahora]
  );

  const reservasResueltas = useMemo(() => {
    return reservas.map((reserva) => {
      const esActiva =
        reserva.estado === "ACTIVA" || reserva.estado === "PENDIENTE";
      const vencidaPorTiempo =
        esActiva &&
        new Date(reserva.fechaVencimiento).getTime() <= ahora;

      let estadoEfectivo = reserva.estado;
      if (vencidaPorTiempo) estadoEfectivo = "VENCIDA";
      else if (reserva.estado === "PENDIENTE") estadoEfectivo = "ACTIVA";
      else if (reserva.estado === "ENTREGADA") estadoEfectivo = "COMPLETADA";
      else if (reserva.estado === "CANCELADA_USUARIO")
        estadoEfectivo = "CANCELADA";
      else if (reserva.estado === "EXPIRADA") estadoEfectivo = "VENCIDA";

      return {
        ...reserva,
        estado: estadoEfectivo,
      };
    });
  }, [reservas, ahora]);

  const reservasFiltradas = useMemo(() => {
    const texto = filtros.busqueda.trim().toLocaleLowerCase("es");

    return reservasResueltas.filter((reserva) => {
      const coincideEstado =
        filtros.estado === "TODAS" || reserva.estado === filtros.estado;

      if (!coincideEstado) return false;
      if (!texto) return true;

      const nombreMed =
        reserva.medicamento.nombre.toLocaleLowerCase("es");
      const codigo = reserva.codigo.toLocaleLowerCase("es");
      const beneficiario =
        reserva.beneficiario.nombreCompleto.toLocaleLowerCase("es");

      return (
        nombreMed.includes(texto) ||
        codigo.includes(texto) ||
        beneficiario.includes(texto)
      );
    });
  }, [reservasResueltas, filtros]);

  const reservaDetalleActual: Reserva | null = useMemo(() => {
    if (!modalDetalle) return null;
    return (
      reservasResueltas.find((r) => r.id === modalDetalle.reservaId) ?? null
    );
  }, [modalDetalle, reservasResueltas]);

  const reservaCancelarActual: Reserva | null = useMemo(() => {
    if (reservaACancelarId === null) return null;
    return (
      reservasResueltas.find((r) => r.id === reservaACancelarId) ?? null
    );
  }, [reservaACancelarId, reservasResueltas]);

  async function manejarSolicitarProrroga(reserva: Reserva) {
    setFeedbackBanner(null);

    try {
      await prorrogaMutation.mutateAsync(reserva.id);
      setFeedbackBanner({
        tipo: "exito",
        mensaje: `Se aplicó una prórroga de 24 horas a la reserva ${reserva.codigo}.`,
      });
    } catch (err) {
      setFeedbackBanner({
        tipo: "error",
        mensaje: getReservasErrorMessage(
          err,
          "No se pudo solicitar la prórroga para esta reserva."
        ),
      });
    }
  }

  async function manejarConfirmarCancelacion(datos: CancelarReservaData) {
    setFeedbackBanner(null);

    try {
      await cancelarMutation.mutateAsync(datos.reservaId);
      setReservaACancelarId(null);
      setFeedbackBanner({
        tipo: "exito",
        mensaje:
          "Reserva cancelada correctamente. La unidad volvió al stock disponible.",
      });
    } catch {
      // El error también queda disponible dentro del modal mediante cancelarMutation.error
    }
  }

  const hayFiltros =
    filtros.busqueda.trim() !== "" || filtros.estado !== "TODAS";

  return (
    <div className="space-y-5">
      <ReservasHeader />

      {feedbackBanner && (
        <div
          role={feedbackBanner.tipo === "error" ? "alert" : "status"}
          className={`rounded-2xl border px-4 py-3 text-xs font-semibold ${
            feedbackBanner.tipo === "error"
              ? "border-[#FADADA] bg-[#FEECEC] text-[#B91C1C]"
              : "border-[#CDEDDD] bg-[#E6F7EF] text-[#047857]"
          }`}
        >
          {feedbackBanner.mensaje}
        </div>
      )}

      <ReservasStats indicadores={indicadores} />

      <ReservasFilters
        filtros={filtros}
        indicadores={indicadores}
        onChange={setFiltros}
      />

      {isLoading ? (
        <div className="space-y-4">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-[150px] animate-pulse rounded-[20px] border border-[#E0E8F3] bg-white p-5"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-[20px] border border-[#FADADA] bg-[#FFF8F8] px-5 py-10 text-center">
          <AlertCircle
            size={34}
            className="mx-auto text-[#DC2626]"
            aria-hidden="true"
          />
          <h2 className="mt-3 text-base font-bold text-[#14285B]">
            No pudimos cargar tus reservas
          </h2>
          <p className="mx-auto mt-1.5 max-w-md text-xs text-[#64748B]">
            {getReservasErrorMessage(error)}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#0755D8] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#0646B3]"
          >
            <RefreshCw size={15} aria-hidden="true" />
            Reintentar
          </button>
        </div>
      ) : reservasFiltradas.length === 0 ? (
        <ReservasEmptyState
          hayFiltros={hayFiltros}
          esHistorial={esHistorial}
          onLimpiarFiltros={() =>
            setFiltros({
              busqueda: "",
              estado: "TODAS",
            })
          }
        />
      ) : (
        <section
          aria-label="Listado de reservas"
          className="space-y-4"
        >
          {reservasFiltradas.map((reserva) => (
            <ReservaCard
              key={reserva.id}
              reserva={reserva}
              ahora={ahora}
              onVerDetalles={(item) =>
                setModalDetalle({ reservaId: item.id, modo: "detalles" })
              }
              onVerCodigo={(item) =>
                setModalDetalle({ reservaId: item.id, modo: "codigo" })
              }
              onSolicitarProrroga={manejarSolicitarProrroga}
              prorrogaEnCursoId={
                prorrogaMutation.isPending
                  ? (prorrogaMutation.variables ?? null)
                  : null
              }
              onCancelar={(item) => {
                cancelarMutation.reset();
                setReservaACancelarId(item.id);
              }}
            />
          ))}
        </section>
      )}

      {modalDetalle && reservaDetalleActual && (
        <ReservaDetalleModal
          reserva={reservaDetalleActual}
          modo={modalDetalle.modo}
          ahora={ahora}
          onCerrar={() => setModalDetalle(null)}
        />
      )}

      {reservaCancelarActual && (
        <CancelarReservaModal
          reserva={reservaCancelarActual}
          ahora={ahora}
          isSubmitting={cancelarMutation.isPending}
          errorExterno={
            cancelarMutation.isError
              ? getReservasErrorMessage(
                  cancelarMutation.error,
                  "No se pudo cancelar la reserva."
                )
              : null
          }
          onCerrar={() => {
            if (!cancelarMutation.isPending) {
              setReservaACancelarId(null);
            }
          }}
          onConfirmar={manejarConfirmarCancelacion}
        />
      )}
    </div>
  );
}