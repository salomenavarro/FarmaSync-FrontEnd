"use client";

import { Info } from "lucide-react";

import { useSolicitudes } from "../hooks/useSolicitudes";

import SolicitudesHeader from "./SolicitudesHeader";
import SolicitudesIndicadores from "./SolicitudesIndicadores";
import SolicitudesFilters from "./SolicitudesFilters";
import SolicitudesTable from "./SolicitudesTable";
import SolicitudDetalle from "./SolicitudDetalle";

interface SolicitudesViewProps {
  codigoInicial?: string;
}

export default function SolicitudesView({
  codigoInicial = "",
}: SolicitudesViewProps) {
  const {
    filas,
    indicadores,
    indicadoresSla,
    filtros,
    cargando,
    hayFiltrosActivos,
    solicitudSeleccionada,
    actualizarFiltro,
    restablecerFiltros,
    seleccionarSolicitud,
    cerrarDetalle,
  } = useSolicitudes(codigoInicial);

  return (
    <div
      className="
        mx-auto flex w-full min-w-0
        max-w-[1600px] flex-col gap-4
        p-3 sm:p-5 lg:p-6
      "
    >
      {/* ENCABEZADO PRINCIPAL */}

      <SolicitudesHeader />

      {/* AVISO TEMPORAL DE DATOS DE PRUEBA */}

      <div
        className="
          flex items-start gap-2.5
          rounded-xl border border-[#D6E5FF]
          bg-[#EDF5FF] px-4 py-3
        "
      >
        <Info
          size={18}
          aria-hidden="true"
          className="shrink-0 text-[#0755D8]"
        />

        <p className="text-xs leading-relaxed text-[#475569]">
          <span className="font-semibold text-[#0755D8]">
            Modo demostración:
          </span>{" "}
          las solicitudes mostradas son datos de prueba.
          La conexión con el backend está pendiente.
        </p>
      </div>

      {/* INDICADORES Y SEMÁFORO SLA */}

      <SolicitudesIndicadores
        indicadores={indicadores}
        indicadoresSla={indicadoresSla}
      />

      {/* BUSCADOR Y FILTROS */}

      <SolicitudesFilters
        filtros={filtros}
        hayFiltrosActivos={hayFiltrosActivos}
        totalResultados={filas.length}
        actualizarFiltro={actualizarFiltro}
        restablecerFiltros={restablecerFiltros}
      />

      {/* TABLA DE SOLICITUDES */}

      <SolicitudesTable
        filas={filas}
        cargando={cargando}
        hayFiltrosActivos={hayFiltrosActivos}
        seleccionarSolicitud={seleccionarSolicitud}
        restablecerFiltros={restablecerFiltros}
      />

      {/* VENTANA DE DETALLE */}

      {solicitudSeleccionada && (
        <SolicitudDetalle
          key={solicitudSeleccionada.id}
          solicitud={solicitudSeleccionada}
          cerrarDetalle={cerrarDetalle}
        />
      )}
    </div>
  );
}