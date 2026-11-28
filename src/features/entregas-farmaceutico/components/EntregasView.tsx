"use client";

import { Info } from "lucide-react";

import { useEntregas } from "../hooks/useEntregas";

import EntregasHeader from "./EntregasHeader";
import EntregasIndicadores from "./EntregasIndicadores";
import EntregasBusqueda from "./EntregasBusqueda";
import EntregaDetalle from "./EntregaDetalle";
import EntregasHistorial from "./EntregasHistorial";

// =========================================================
// PROPIEDADES DE LA VISTA
// =========================================================

interface EntregasViewProps {
  codigoInicial?: string;
}

// =========================================================
// VISTA PRINCIPAL DEL MÓDULO
// =========================================================

export default function EntregasView({
  codigoInicial = "",
}: EntregasViewProps) {
  const {
    cargando,
    reservaSeleccionada,
    estadoBusqueda,
    codigoBuscado,
    mensajeEstado,

    verificaciones,
    verificacionesCompletas,
    permiteVerificacion,
    cantidadVerificaciones,

    indicadores,
    historial,
    filtrosHistorial,
    hayFiltrosActivos,

    buscarReserva,
    limpiarBusqueda,
    actualizarVerificacion,
    actualizarFiltroHistorial,
    restablecerFiltrosHistorial,
  } = useEntregas(codigoInicial);

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-[1600px] flex-col gap-4 p-3 sm:p-5 lg:p-6">

      {/* ENCABEZADO DEL MÓDULO */}

      <EntregasHeader />

      {/* AVISO DE DATOS DE PRUEBA */}

      <div className="flex items-start gap-2.5 rounded-xl border border-[#D6E5FF] bg-[#EDF5FF] px-4 py-3">
        <Info
          size={18}
          aria-hidden="true"
          className="shrink-0 text-[#0755D8]"
        />

        <p className="text-xs leading-relaxed text-[#475569]">
          <span className="font-semibold text-[#0755D8]">
            Modo demostración:
          </span>{" "}
          las reservas y entregas mostradas corresponden a
          datos de prueba. El escaneo QR y la confirmación
          de entregas están pendientes de integración.
        </p>
      </div>

      {/* INDICADORES */}

      <EntregasIndicadores
        indicadores={indicadores}
      />

      {/* FORMULARIO DE BÚSQUEDA */}

      <EntregasBusqueda
        key={codigoInicial}
        codigoBuscado={
          cargando ? codigoInicial : codigoBuscado
        }
        estadoBusqueda={estadoBusqueda}
        cargando={cargando}
        buscarReserva={buscarReserva}
        limpiarBusqueda={limpiarBusqueda}
      />

      {/* DETALLE DE LA RESERVA ENCONTRADA */}

      {reservaSeleccionada && (
        <EntregaDetalle
          key={reservaSeleccionada.id}
          reserva={reservaSeleccionada}
          mensajeEstado={mensajeEstado}
          verificaciones={verificaciones}
          verificacionesCompletas={
            verificacionesCompletas
          }
          permiteVerificacion={permiteVerificacion}
          cantidadVerificaciones={
            cantidadVerificaciones
          }
          actualizarVerificacion={
            actualizarVerificacion
          }
        />
      )}

      {/* HISTORIAL DE ENTREGAS */}

      <EntregasHistorial
        historial={historial}
        filtrosHistorial={filtrosHistorial}
        hayFiltrosActivos={hayFiltrosActivos}
        cargando={cargando}
        actualizarFiltroHistorial={
          actualizarFiltroHistorial
        }
        restablecerFiltrosHistorial={
          restablecerFiltrosHistorial
        }
      />
    </div>
  );
}