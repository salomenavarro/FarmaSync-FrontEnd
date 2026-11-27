"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck, Info, X } from "lucide-react";
import { catalogoService } from "@/features/catalogo/services/catalogo.service";
import { obtenerEstadoStock } from "@/features/catalogo/types";

import type {
  Medicamento,
  SedeFarmacia,
} from "@/features/catalogo/types";

import type {
  FiltrosMisMedicamentos,
  MedicamentoGuardadoDetalle,
  IndicadoresMisMedicamentos,
} from "../types";

import { useMedicamentosGuardados } from "../hooks/useMedicamentosGuardados";

import MisMedicamentosHeader from "./MisMedicamentosHeader";
import MisMedicamentosStats from "./MisMedicamentosStats";
import MisMedicamentosFilters from "./MisMedicamentosFilters";
import MedicamentoGuardadoCard from "./MedicamentoGuardadoCard";
import MisMedicamentosEmptyState from "./MisMedicamentosEmptyState";

// =========================================================
// PROPIEDADES
// =========================================================

interface MisMedicamentosContentProps {
  medicamentos: Medicamento[];
  sedes: SedeFarmacia[];
}

// =========================================================
// FILTROS INICIALES
// =========================================================

const FILTROS_INICIALES: FiltrosMisMedicamentos = {
  busqueda: "",
  disponibilidad: "Todos",
};

// =========================================================
// NORMALIZAR TEXTO
// =========================================================

function normalizarTexto(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// =========================================================
// IDENTIFICADOR POR MEDICAMENTO Y SEDE
// =========================================================

function obtenerClave(
  medicamentoId: string,
  sedeId: string
) {
  return JSON.stringify([medicamentoId, sedeId]);
}

// =========================================================
// COMPONENTE PRINCIPAL
// =========================================================

export default function MisMedicamentosContent({
  medicamentos,
  sedes,
}: MisMedicamentosContentProps) {

  const router = useRouter();

  const {
    guardados,
    eliminarMedicamento,
  } = useMedicamentosGuardados();

  const [filtros, setFiltros] =
    useState<FiltrosMisMedicamentos>(
      FILTROS_INICIALES
    );

  const [alertasActivas, setAlertasActivas] =
    useState<string[]>([]);

  const [mensaje, setMensaje] =
    useState<string | null>(null);

// =======================================================
  // OBTENER MEDICAMENTOS GUARDADOS POR SEDE
  // =======================================================

  const medicamentosGuardados = useMemo(() => {

    const resultado: MedicamentoGuardadoDetalle[] = [];

    guardados.forEach((guardado) => {

      const medicamento = medicamentos.find(
        (item) => item.id === guardado.medicamentoId
      );

      const sede = sedes.find(
        (item) => item.id === guardado.sedeId
      );

      if (!medicamento || !sede) return;

      // STOCK DE LA SEDE GUARDADA

      const cantidad =
        medicamento.stockPorSede.find(
          (stock) => stock.sedeId === sede.id
        )?.cantidad ?? 0;

      const estadoGeneral =
        obtenerEstadoStock(cantidad);

      resultado.push({
        medicamento,
        sede,
        cantidad,
        fechaGuardado: guardado.fechaGuardado,
        disponibilidad: [],
        estadoGeneral,
      });
    });

    return resultado.sort(
      (a, b) =>
        new Date(b.fechaGuardado).getTime() -
        new Date(a.fechaGuardado).getTime()
    );

  }, [guardados, medicamentos, sedes]);

  // =======================================================
  // INDICADORES
  // =======================================================

  const indicadores =
    useMemo<IndicadoresMisMedicamentos>(() => {

      return {
        totalGuardados: medicamentosGuardados.length,

        disponibles: medicamentosGuardados.filter(
          (item) => item.cantidad > 0
        ).length,

        sinDisponibilidad: medicamentosGuardados.filter(
          (item) => item.cantidad === 0
        ).length,
      };

    }, [medicamentosGuardados]);

  // =======================================================
  // BÚSQUEDA Y FILTROS
  // =======================================================

  const medicamentosFiltrados = useMemo(() => {

    const busqueda = normalizarTexto(
      filtros.busqueda
    );

    return medicamentosGuardados.filter((item) => {

      const {
        medicamento,
        sede,
        estadoGeneral,
      } = item;

      const textoMedicamento = normalizarTexto(
        [
          medicamento.nombreGenerico,
          medicamento.codigo,
          medicamento.concentracion,
          medicamento.presentacion,
          sede.nombre,
          sede.ciudad,
          sede.zona,
          sede.direccion,
        ].join(" ")
      );

      const coincideBusqueda =
        textoMedicamento.includes(busqueda);

      const coincideDisponibilidad =
        filtros.disponibilidad === "Todos" ||
        estadoGeneral === filtros.disponibilidad;

      return (
        coincideBusqueda &&
        coincideDisponibilidad
      );
    });

  }, [medicamentosGuardados, filtros]);

  // =======================================================
  // LIMPIAR FILTROS
  // =======================================================

  const hayFiltros =
    filtros.busqueda.trim() !== "" ||
    filtros.disponibilidad !== "Todos";

  function limpiarFiltros() {
    setFiltros(FILTROS_INICIALES);
  }

  // =======================================================
  // ELIMINAR FAVORITO
  // =======================================================

  function manejarEliminar(
    medicamentoId: string,
    sedeId: string
  ) {

    const medicamento = medicamentos.find(
      (item) => item.id === medicamentoId
    );

    const sede = sedes.find(
      (item) => item.id === sedeId
    );

    eliminarMedicamento(
      medicamentoId,
      sedeId
    );

    setMensaje(
      `${medicamento?.nombreGenerico ?? "Medicamento"} de ${sede?.nombre ?? "la sede seleccionada"} eliminado de favoritos.`
    );
  }

  // =======================================================
  // CONSULTAR DISPONIBILIDAD POR SEDE
  // =======================================================

  function manejarVerDisponibilidad(
    medicamentoId: string,
    sedeId: string
  ) {

    const medicamento = medicamentos.find(
      (item) => item.id === medicamentoId
    );

    const sede = sedes.find(
      (item) => item.id === sedeId
    );

    if (!medicamento || !sede) return;

    const parametros = new URLSearchParams({
      busqueda: medicamento.codigo,
      sedeId: sede.id,
    });

    router.push(
      `/medicamentos?${parametros.toString()}`
    );
  }

  // =======================================================
  // ALERTA DE REABASTECIMIENTO POR SEDE
  // =======================================================

  async function manejarNotificar(
    medicamentoId: string,
    sedeId: string
  ) {

    const detalle = medicamentosGuardados.find(
      (item) =>
        item.medicamento.id === medicamentoId &&
        item.sede.id === sedeId
    );

    if (!detalle || detalle.cantidad !== 0) {
      return;
    }

    const clave = obtenerClave(
      medicamentoId,
      sedeId
    );

    if (alertasActivas.includes(clave)) {
      return;
    }

    try {
      await catalogoService.activarAlertaStock(medicamentoId);

      setAlertasActivas((anteriores) =>
        anteriores.includes(clave)
          ? anteriores
          : [...anteriores, clave]
      );

      setMensaje(
        `Alerta de reabastecimiento activada para ${detalle.medicamento.nombreGenerico} en ${detalle.sede.nombre}.`
      );
    } catch {
      setMensaje(
        `No se pudo registrar la alerta para ${detalle.medicamento.nombreGenerico}. Intenta nuevamente.`
      );
    }
  }
  // =======================================================
  // INTERFAZ
  // =======================================================

  return (
    <div className="min-h-full min-w-0 bg-[#F5F9FF] p-3">
      <div className="mx-auto w-full space-y-3">

        {/* ENCABEZADO */}

        <MisMedicamentosHeader />

        {/* INDICADORES */}

        <MisMedicamentosStats
          indicadores={indicadores}
        />

        {/* MENSAJES DE CONFIRMACIÓN */}

        {mensaje && (
          <div
            role="status"
            className="
              flex items-center justify-between gap-3
              rounded-[14px]
              border border-[#CDEDDD]
              bg-[#E6F7EF] px-4 py-3
              text-[#047857]
            "
          >
            <div className="flex items-center gap-2">
              <CircleCheck
                size={18}
                className="shrink-0"
              />

              <p className="text-[12px] font-semibold">
                {mensaje}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMensaje(null)}
              aria-label="Cerrar mensaje"
              className="
                shrink-0 rounded-lg p-1
                hover:bg-[#CDEDDD]
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-[#047857]
              "
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* BUSCADOR Y FILTROS */}

        <MisMedicamentosFilters
          filtros={filtros}
          onChange={setFiltros}
        />

        {/* RESUMEN DE RESULTADOS */}

        <div className="flex flex-wrap items-center justify-between gap-3">

          <div>
            <h2 className="text-[16px] font-extrabold text-[#14285B]">
              Tus medicamentos favoritos
            </h2>

            <p className="mt-1 text-[12px] text-[#71829B]">
              {medicamentosFiltrados.length}{" "}
              {medicamentosFiltrados.length === 1
                ? "resultado encontrado"
                : "resultados encontrados"}
            </p>
          </div>

          <span
            className="
              rounded-full border border-[#DCE8F7]
              bg-white px-3 py-2
              text-[11px] font-semibold text-[#62748E]
            "
          >
            {indicadores.totalGuardados}{" "}
            {indicadores.totalGuardados === 1
              ? "favorito guardado"
              : "favoritos guardados"}
          </span>
        </div>

        {/* TARJETAS DE MEDICAMENTOS */}

        {medicamentosFiltrados.length > 0 ? (

          <div
            className="
              grid grid-cols-1 gap-3
              lg:grid-cols-2 2xl:grid-cols-3
            "
          >
            {medicamentosFiltrados.map((detalle) => {

              const clave = obtenerClave(
                detalle.medicamento.id,
                detalle.sede.id
              );

              return (
                <MedicamentoGuardadoCard
                  key={clave}
                  detalle={detalle}
                  onEliminar={manejarEliminar}
                  onVerDisponibilidad={
                    manejarVerDisponibilidad
                  }
                  onNotificar={manejarNotificar}
                  notificacionActiva={
                    alertasActivas.includes(clave)
                  }
                />
              );
            })}
          </div>

        ) : (

          <MisMedicamentosEmptyState
            hayFiltros={
              medicamentosGuardados.length > 0 &&
              hayFiltros
            }
            onLimpiarFiltros={limpiarFiltros}
          />

        )}

        {/* INFORMACIÓN SOBRE DISPONIBILIDAD */}

        <div
          className="
            flex items-start gap-3
            rounded-[14px]
            border border-[#DCE8F7]
            bg-[#EAF3FF] p-3
          "
        >
          <Info
            size={18}
            className="shrink-0 text-[#0755D8]"
          />

          <p className="text-[11px] leading-relaxed text-[#62748E]">
            Cada favorito corresponde a un medicamento
            en una sede específica. La disponibilidad
            puede variar entre farmacias. Actualmente,
            los datos, favoritos y alertas corresponden
            a una simulación del sistema.
          </p>
        </div>
      </div>
    </div>
  );
}