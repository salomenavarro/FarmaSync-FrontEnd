
import { ArrowRight, MapPin, MapPinned, Store } from "lucide-react";

import type { Medicamento, SedeFarmacia } from "../types";
import StockBadge from "./StockBadge";

interface SedesAlternativasProps {
  medicamento: Medicamento;
  sedeActual: SedeFarmacia;
  sedes: SedeFarmacia[];
  onSeleccionarSede?: (sede: SedeFarmacia) => void;
}

export default function SedesAlternativas({
  medicamento,
  sedeActual,
  sedes,
  onSeleccionarSede,
}: SedesAlternativasProps) {
  // Buscar sedes diferentes a la seleccionada
  // que tengan al menos una unidad disponible.
  const alternativas = sedes
    .filter((sede) => sede.id !== sedeActual.id)
    .map((sede) => {
      const stock = medicamento.stockPorSede.find(
        (item) => item.sedeId === sede.id
      );

      return {
        sede,
        cantidad: stock?.cantidad ?? 0,
      };
    })
    .filter((item) => item.cantidad > 0)
    .sort((a, b) => a.sede.distanciaKm - b.sede.distanciaKm);

  // No mostrar alternativas cuando no hay existencias
  // en ninguna de las otras sedes.
  if (alternativas.length === 0) {
    return (
      <div
        className="
          rounded-[18px] border border-[#F5D4D6]
          bg-[#FFF7F7] p-4
        "
      >
        <div className="flex items-start gap-3">
          <div
            className="
              flex h-10 w-10 shrink-0 items-center
              justify-center rounded-[12px]
              bg-[#FDEBEC] text-[#D13438]
            "
          >
            <Store size={20} />
          </div>

          <div>
            <h3 className="text-[13px] font-extrabold text-[#14285B]">
              Sin disponibilidad en otras sedes
            </h3>

            <p className="mt-1 text-[12px] leading-relaxed text-[#62748E]">
              Actualmente no encontramos existencias de{" "}
              <strong>
                {medicamento.nombreGenerico}{" "}
                {medicamento.concentracion}
              </strong>{" "}
              en las sedes consultadas.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      className="
        rounded-[20px] border border-[#DCE8F7]
        bg-white p-4
      "
    >
      {/* ENCABEZADO */}
      <div className="mb-4 flex items-start gap-3">
        <div
          className="
            flex h-10 w-10 shrink-0 items-center
            justify-center rounded-[12px]
            bg-[#EAF3FF] text-[#0755D8]
          "
        >
          <MapPinned size={20} />
        </div>

        <div>
          <h3 className="text-[14px] font-extrabold text-[#14285B]">
            Sedes alternativas disponibles
          </h3>

          <p className="mt-1 text-[12px] leading-relaxed text-[#71829B]">
            Este medicamento está agotado en{" "}
            <strong>{sedeActual.nombre}</strong>.
            Puedes consultar otras sedes con existencias.
          </p>
        </div>
      </div>

      {/* LISTADO DE SEDES */}
      <div className="space-y-3">
        {alternativas.map(({ sede, cantidad }) => (
          <div
            key={sede.id}
            className="
              flex flex-col gap-3 rounded-[15px]
              border border-[#E4EDF9] bg-[#F8FBFF]
              p-3 sm:flex-row sm:items-center
              sm:justify-between
            "
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <MapPin
                  size={16}
                  className="shrink-0 text-[#0876E9]"
                />

                <h4 className="text-[12px] font-bold text-[#14285B]">
                  {sede.nombre}
                </h4>
              </div>

              <p className="mt-1 pl-6 text-[11px] text-[#71829B]">
                {sede.ciudad} · {sede.zona}
              </p>

              <p className="mt-1 pl-6 text-[11px] text-[#71829B]">
                Distancia de prueba: {sede.distanciaKm.toFixed(1)} km
              </p>
            </div>

            <div className="flex items-center gap-3 sm:shrink-0">
              <div className="flex flex-col items-start gap-1">
                <StockBadge cantidad={cantidad} />

                <span className="text-[11px] font-semibold text-[#62748E]">
                  {cantidad}{" "}
                  {cantidad === 1 ? "unidad" : "unidades"}
                </span>
              </div>

              {onSeleccionarSede && (
                <button
                  type="button"
                  onClick={() => onSeleccionarSede(sede)}
                  aria-label={`Seleccionar ${sede.nombre}`}
                  className="
                    flex h-9 w-9 items-center
                    justify-center rounded-[10px]
                    bg-[#EAF3FF] text-[#0755D8]
                    transition-colors hover:bg-[#D7E9FF]
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-[#0755D8]
                  "
                >
                  <ArrowRight size={17} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-[#71829B]">
        Las distancias y existencias mostradas son datos de demostración.
      </p>
    </section>
  );
}
