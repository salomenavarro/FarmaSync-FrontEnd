"use client";

import { useState } from "react";
import { CheckCircle2, X, Info } from "lucide-react";

import AdminStats from "./AdminStats";
import FarmaceuticosTable from "./FarmaceuticosTable";
import FarmaceuticoModal from "./FarmaceuticoModal";
import DemandaChart from "./DemandaChart";
import AlertasStock from "./AlertasStock";
import EfectividadChart from "./EfectividadChart";

import {
  farmaceuticosMock,
  sedesMock,
  indicadoresMock,
  demandaMock,
  alertasStockMock,
  efectividadReservasMock,
} from "../data/administradorMock";

import type {
  Farmaceutico,
  FarmaceuticoFormData,
} from "../types";

// =========================================================
// CONTENIDO DEL DASHBOARD
// =========================================================

export default function AdminDashboardContent() {
  const [farmaceuticos, setFarmaceuticos] =
    useState<Farmaceutico[]>(farmaceuticosMock);

  const [modalAbierto, setModalAbierto] =
    useState(false);

  const [farmaceuticoSeleccionado, setFarmaceuticoSeleccionado] =
    useState<Farmaceutico | null>(null);

  const [mensaje, setMensaje] = useState("");

  // =======================================================
  // INDICADORES DINÁMICOS
  // =======================================================

  const indicadores = {
    ...indicadoresMock,

    farmaceuticosActivos: farmaceuticos.filter(
      (farmaceutico) => farmaceutico.estado === "ACTIVO"
    ).length,
  };

  // =======================================================
  // ABRIR FORMULARIO DE CREACIÓN
  // =======================================================

  function abrirCrear() {
    setFarmaceuticoSeleccionado(null);
    setModalAbierto(true);
    setMensaje("");
  }

  // =======================================================
  // ABRIR FORMULARIO DE EDICIÓN
  // =======================================================

  function abrirEditar(farmaceutico: Farmaceutico) {
    setFarmaceuticoSeleccionado(farmaceutico);
    setModalAbierto(true);
    setMensaje("");
  }

  // =======================================================
  // CERRAR FORMULARIO
  // =======================================================

  function cerrarModal() {
    setModalAbierto(false);
    setFarmaceuticoSeleccionado(null);
  }

  // =======================================================
  // CREAR O EDITAR FARMACÉUTICO
  // =======================================================

  function guardarFarmaceutico(
    datos: FarmaceuticoFormData
  ) {
    if (farmaceuticoSeleccionado) {
      const id = farmaceuticoSeleccionado.id;

      setFarmaceuticos((anteriores) =>
        anteriores.map((farmaceutico) =>
          farmaceutico.id === id
            ? {
                ...farmaceutico,
                ...datos,
              }
            : farmaceutico
        )
      );

      setMensaje(
        "La información del farmacéutico se actualizó correctamente en la simulación."
      );
    } else {
      const fechaCreacion = new Date().toISOString();

      setFarmaceuticos((anteriores) => {
        const nuevoId =
          Math.max(
            0,
            ...anteriores.map(
              (farmaceutico) => farmaceutico.id
            )
          ) + 1;

        const nuevoFarmaceutico: Farmaceutico = {
          id: nuevoId,
          ...datos,
          fechaCreacion,
        };

        return [
          nuevoFarmaceutico,
          ...anteriores,
        ];
      });

      setMensaje(
        "El farmacéutico se registró correctamente en la simulación."
      );
    }

    cerrarModal();
  }

  // =======================================================
  // ACTIVAR O DESACTIVAR CUENTA
  // =======================================================

  function cambiarEstado(farmaceutico: Farmaceutico) {
    const estaActivo =
      farmaceutico.estado === "ACTIVO";

    const accion = estaActivo
      ? "desactivar"
      : "activar";

    const confirmado = window.confirm(
      `¿Estás seguro de que deseas ${accion} la cuenta de ${farmaceutico.nombres} ${farmaceutico.apellidos}?`
    );

    if (!confirmado) {
      return;
    }

    setFarmaceuticos((anteriores) =>
      anteriores.map((empleado) =>
        empleado.id === farmaceutico.id
          ? {
              ...empleado,
              estado: estaActivo
                ? "INACTIVO"
                : "ACTIVO",
            }
          : empleado
      )
    );

    setMensaje(
      estaActivo
        ? "La cuenta se desactivó correctamente en la simulación."
        : "La cuenta se activó correctamente en la simulación."
    );
  }

  return (
    <div className="space-y-4">

      {/* INDICADORES GENERALES */}

      <AdminStats indicadores={indicadores} />

      {/* MENSAJE DE CONFIRMACIÓN */}

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

          <p className="flex-1 text-sm font-medium text-[#047857]">
            {mensaje}
          </p>

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

      {/* GESTIÓN DE EMPLEADOS Y DEMANDA */}

      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-[1.15fr_1fr]">

        <FarmaceuticosTable
          farmaceuticos={farmaceuticos}
          sedes={sedesMock}
          onCrear={abrirCrear}
          onEditar={abrirEditar}
          onCambiarEstado={cambiarEstado}
        />

        <DemandaChart
          demanda={demandaMock}
          sedes={sedesMock}
        />

      </div>

      {/* ALERTAS Y EFECTIVIDAD */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        <AlertasStock
          alertas={alertasStockMock}
          sedes={sedesMock}
        />

        <EfectividadChart
          efectividad={efectividadReservasMock}
        />

      </div>

      {/* INFORMACIÓN DEL ENTORNO */}

      <div className="flex items-center gap-2 px-1 py-1 text-xs text-[#64748B]">

        <Info
          size={15}
          aria-hidden="true"
          className="shrink-0"
        />

        <p>
          Panel administrativo en desarrollo.
          Los datos y las operaciones son simulados.
        </p>

      </div>

      {/* MODAL DE CREACIÓN Y EDICIÓN */}

      {modalAbierto && (
        <FarmaceuticoModal
          key={farmaceuticoSeleccionado?.id ?? "nuevo"}
          farmaceutico={farmaceuticoSeleccionado}
          farmaceuticos={farmaceuticos}
          sedes={sedesMock}
          onCerrar={cerrarModal}
          onGuardar={guardarFarmaceutico}
        />
      )}

    </div>
  );
}