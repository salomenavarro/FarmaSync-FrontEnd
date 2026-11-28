"use client";

import { Building2, Info } from "lucide-react";

import InventarioHeader from "./InventarioHeader";
import InventarioIndicadores from "./InventarioIndicadores";
import InventarioIngresoForm from "./InventarioIngresoForm";
import InventarioFilters from "./InventarioFilters";
import InventarioTable from "./InventarioTable";

import { useInventario } from "../hooks/useInventario";

// =========================================================
// PROPIEDADES
// =========================================================

interface InventarioViewProps {
  sedeId?: string;
  nombreSede?: string;
}

// =========================================================
// VISTA PRINCIPAL DEL INVENTARIO
// =========================================================

export default function InventarioView({
  sedeId,
  nombreSede,
}: InventarioViewProps) {
  const {
    medicamentos,
    medicamentosFiltrados,
    indicadores,
    filtros,
    error,
    sedeDisponible,
    cargando,
    inventarioConsultado,
    hayFiltrosActivos,
    actualizarFiltro,
    restablecerFiltros,
    recargarInventario,
  } = useInventario(sedeId);

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-[1600px] flex-col gap-4 p-3 sm:p-5 lg:p-6">

      {/* =================================================
          ENCABEZADO PRINCIPAL
      ================================================= */}

      <InventarioHeader />

      {/* =================================================
          INFORMACIÓN DE LA SEDE
      ================================================= */}

      {sedeDisponible ? (
        <div className="flex items-center gap-3 rounded-xl border border-[#DCE9F8] bg-white px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E5F1FF] text-[#0755D8]">
            <Building2 size={21} aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium text-[#64748B]">
              Sede asignada
            </p>

            <p className="break-words text-sm font-bold text-[#14285B]">
              {nombreSede?.trim() || `Sede ${sedeId}`}
            </p>
          </div>
        </div>
      ) : (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3"
        >
          <Info
            size={20}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[#0755D8]"
          />

          <div className="min-w-0">
            <p className="text-sm font-bold text-[#1E40AF]">
              Identificación de la sede pendiente
            </p>

            <p className="mt-1 text-xs leading-relaxed text-[#1E40AF] sm:text-sm">
              La consulta del inventario estará disponible
              cuando se complete la integración de la sede
              asignada a tu cuenta. Por el momento, no se
              realizarán modificaciones de existencias.
            </p>
          </div>
        </div>
      )}

      {/* =================================================
          INDICADORES GENERALES
      ================================================= */}

      <InventarioIndicadores
        indicadores={indicadores}
        inventarioConsultado={inventarioConsultado}
        cargando={cargando}
      />

      {/* =================================================
          CONTENIDO PRINCIPAL
      ================================================= */}

      <div className="grid min-w-0 grid-cols-1 items-start gap-4 2xl:grid-cols-[minmax(0,1fr)_360px]">

        {/* COLUMNA DE CONSULTA */}

        <div className="flex min-w-0 flex-col gap-4">

          {/* Buscador y filtros */}

          <InventarioFilters
            filtros={filtros}
            hayFiltrosActivos={hayFiltrosActivos}
            totalResultados={medicamentosFiltrados.length}
            totalMedicamentos={medicamentos.length}
            cargando={cargando}
            inventarioConsultado={inventarioConsultado}
            sedeDisponible={sedeDisponible}
            actualizarFiltro={actualizarFiltro}
            restablecerFiltros={restablecerFiltros}
            recargarInventario={recargarInventario}
          />

          {/* Tabla de existencias */}

          <InventarioTable
            medicamentos={medicamentosFiltrados}
            cargando={cargando}
            error={error}
            sedeDisponible={sedeDisponible}
            inventarioConsultado={inventarioConsultado}
            hayFiltrosActivos={hayFiltrosActivos}
            recargarInventario={recargarInventario}
            restablecerFiltros={restablecerFiltros}
          />
        </div>

        {/* COLUMNA DE INGRESO */}

        <aside
          aria-label="Gestión de ingreso de medicamentos"
          className="min-w-0"
        >
          <InventarioIngresoForm />
        </aside>
      </div>
    </div>
  );
}