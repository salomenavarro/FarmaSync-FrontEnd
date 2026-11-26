"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, RefreshCw, X } from "lucide-react";

import AdminStats from "./AdminStats";
import FarmaceuticosTable from "./FarmaceuticosTable";
import FarmaceuticoModal from "./FarmaceuticoModal";
import DemandaChart from "./DemandaChart";
import AlertasStock from "./AlertasStock";
import EfectividadChart from "./EfectividadChart";

import { useAdminDashboard } from "../hooks/useAdminDashboard";
import {
  useCambiarEstadoFarmaceutico,
  useFarmaceuticos,
  useGuardarFarmaceutico,
} from "../hooks/useEmpleadosAdmin";
import { getAdminErrorMessage } from "../utils/get-admin-error-message";
import type {
  Farmaceutico,
  FarmaceuticoFormData,
} from "../types";

// =========================================================
// CONTENIDO DEL DASHBOARD ADMINISTRATIVO (CONECTADO AL API)
// =========================================================

export default function AdminDashboardContent() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [farmaceuticoSeleccionado, setFarmaceuticoSeleccionado] =
    useState<Farmaceutico | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [errorAccion, setErrorAccion] = useState("");

  const dashboardQuery = useAdminDashboard();
  const empleadosQuery = useFarmaceuticos();
  const guardarMutation = useGuardarFarmaceutico();
  const cambiarEstadoMutation = useCambiarEstadoFarmaceutico();

  const farmaceuticos = empleadosQuery.data ?? [];
  const dashboardData = dashboardQuery.data;
  const sedes = dashboardData?.sedes ?? [];

  const indicadores = {
    farmaceuticosActivos:
      empleadosQuery.data !== undefined
        ? farmaceuticos.filter((f) => f.estado === "ACTIVO").length
        : (dashboardData?.indicadores.farmaceuticosActivos ?? 0),
    sedesRegistradas: dashboardData?.indicadores.sedesRegistradas ?? sedes.length,
    reservasTotales: dashboardData?.indicadores.reservasTotales ?? 0,
    medicamentosEnAlerta: dashboardData?.indicadores.medicamentosEnAlerta ?? 0,
  };

  function abrirCrear() {
    setFarmaceuticoSeleccionado(null);
    setModalAbierto(true);
    setMensaje("");
    setErrorAccion("");
  }

  function abrirEditar(farmaceutico: Farmaceutico) {
    setFarmaceuticoSeleccionado(farmaceutico);
    setModalAbierto(true);
    setMensaje("");
    setErrorAccion("");
  }

  function cerrarModal() {
    setModalAbierto(false);
    setFarmaceuticoSeleccionado(null);
  }

  async function guardarFarmaceutico(datos: FarmaceuticoFormData) {
    setErrorAccion("");

    try {
      await guardarMutation.mutateAsync({
        id: farmaceuticoSeleccionado?.id,
        datos,
      });

      setMensaje(
        farmaceuticoSeleccionado
          ? "La información del farmacéutico se actualizó correctamente."
          : "El farmacéutico se registró y asignó a su sede correctamente.",
      );
      cerrarModal();
    } catch (error) {
      setErrorAccion(getAdminErrorMessage(error));
    }
  }

  async function cambiarEstado(farmaceutico: Farmaceutico) {
    const estaActivo = farmaceutico.estado === "ACTIVO";
    const accion = estaActivo ? "desactivar" : "activar";
    const nombreCompleto = `${farmaceutico.nombres} ${farmaceutico.apellidos}`;

    const confirmado = window.confirm(
      `¿Estás seguro de que deseas ${accion} la cuenta de ${nombreCompleto}?`,
    );

    if (!confirmado) return;

    setErrorAccion("");

    try {
      await cambiarEstadoMutation.mutateAsync(farmaceutico.id);
      setMensaje(
        estaActivo
          ? "La cuenta del farmacéutico se desactivó correctamente."
          : "La cuenta del farmacéutico se activó correctamente.",
      );
    } catch (error) {
      setErrorAccion(getAdminErrorMessage(error));
    }
  }

  if (dashboardQuery.isLoading || empleadosQuery.isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-[20px] border border-[#E3EBF5] bg-white p-4"
            />
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-[20px] border border-[#E3EBF5] bg-white p-5" />
      </div>
    );
  }

  if (dashboardQuery.isError || empleadosQuery.isError) {
    const mensajeError = getAdminErrorMessage(
      dashboardQuery.error ?? empleadosQuery.error,
      "No pudimos cargar los datos del panel administrativo.",
    );

    return (
      <div className="rounded-[20px] border border-[#FECACA] bg-[#FFF5F5] p-6 text-center">
        <AlertCircle size={32} className="mx-auto text-[#DC2626]" />
        <h2 className="mt-3 text-base font-bold text-[#14285B]">
          Error al cargar el panel administrativo
        </h2>
        <p className="mt-1 text-xs text-[#64748B]">{mensajeError}</p>
        <button
          type="button"
          onClick={() => {
            dashboardQuery.refetch();
            empleadosQuery.refetch();
          }}
          className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#0755D8] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0647B8]"
        >
          <RefreshCw size={15} />
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AdminStats indicadores={indicadores} />

      {mensaje && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3"
        >
          <CheckCircle2
            size={21}
            aria-hidden="true"
            className="shrink-0 text-[#059669]"
          />
          <p className="flex-1 text-sm font-medium text-[#047857]">{mensaje}</p>
          <button
            type="button"
            onClick={() => setMensaje("")}
            aria-label="Cerrar mensaje"
            className="cursor-pointer rounded-lg p-1.5 text-[#047857] hover:bg-[#DCFCE7]"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      )}

      {errorAccion && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-xl border border-[#FECACA] bg-[#FFF5F5] px-4 py-3"
        >
          <AlertCircle
            size={21}
            aria-hidden="true"
            className="shrink-0 text-[#DC2626]"
          />
          <p className="flex-1 text-sm font-medium text-[#B91C1C]">
            {errorAccion}
          </p>
          <button
            type="button"
            onClick={() => setErrorAccion("")}
            aria-label="Cerrar error"
            className="cursor-pointer rounded-lg p-1.5 text-[#B91C1C] hover:bg-[#FEE2E2]"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-[1.15fr_1fr]">
        <FarmaceuticosTable
          farmaceuticos={farmaceuticos}
          sedes={sedes}
          onCrear={abrirCrear}
          onEditar={abrirEditar}
          onCambiarEstado={cambiarEstado}
        />

        <DemandaChart
          demanda={dashboardData?.demanda ?? []}
          sedes={sedes}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <AlertasStock
          alertas={dashboardData?.alertasStock ?? []}
          sedes={sedes}
        />

        <EfectividadChart
          efectividad={
            dashboardData?.efectividad ?? {
              totalReservas: 0,
              reservasEntregadas: 0,
              reservasNoEfectuadas: 0,
            }
          }
        />
      </div>

      {modalAbierto && (
        <FarmaceuticoModal
          key={farmaceuticoSeleccionado?.id ?? "nuevo"}
          farmaceutico={farmaceuticoSeleccionado}
          farmaceuticos={farmaceuticos}
          sedes={sedes}
          onCerrar={cerrarModal}
          onGuardar={guardarFarmaceutico}
        />
      )}
    </div>
  );
}