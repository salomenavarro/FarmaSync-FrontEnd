"use client";

import { useState } from "react";
import { Minus, Package, Plus, ScanBarcode } from "lucide-react";

/* Formulario de "Inventario": botón para escanear el EAN-13, campo del
   código, cantidad con botones − / + y botón para registrar el lote. */

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]";

export default function FormularioLote() {
  const [cantidad, setCantidad] = useState(1);

  /* La cantidad nunca baja de 1 */
  const cambiarCantidad = (nuevo: number) => setCantidad(Math.max(1, nuevo || 1));

  return (
    <form
      className="mt-4 flex flex-col gap-3"
      onSubmit={(evento) => {
        evento.preventDefault();
        /* Conecta aquí el registro del lote (EAN + cantidad) */
      }}
    >
      {/* Escanear con la pistola lectora o la cámara */}
      <button
        type="button"
        className={`flex items-center justify-center gap-3 rounded-xl border-2 border-[#8ABBF6] bg-[#E5F1FF] px-4 py-3 text-base font-extrabold text-[#0755D8] transition hover:bg-[#D8E8FF] ${FOCO}`}
      >
        <ScanBarcode size={26} aria-hidden="true" />
        Escanear EAN-13
      </button>

      {/* Código + cantidad */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
        <div>
          <label htmlFor="ean" className="text-sm font-bold text-[#14285B]">
            Código / EAN-13
          </label>
          <input
            id="ean"
            name="ean"
            type="text"
            inputMode="numeric"
            placeholder="7501234567890"
            className={`mt-1 h-11 w-full rounded-xl border border-[#B9C9DE] bg-white px-3 text-sm text-[#14285B] placeholder:text-[#6B7C98] ${FOCO}`}
          />
        </div>

        <div>
          <label htmlFor="cantidad" className="text-sm font-bold text-[#14285B]">
            Cantidad
          </label>
          <div className="mt-1 flex h-11 items-center overflow-hidden rounded-xl border border-[#B9C9DE] bg-white">
            <button
              type="button"
              aria-label="Disminuir cantidad"
              onClick={() => cambiarCantidad(cantidad - 1)}
              className={`flex h-full w-10 items-center justify-center bg-[#EAF2FF] text-[#0755D8] transition hover:bg-[#D8E8FF] ${FOCO}`}
            >
              <Minus size={18} aria-hidden="true" />
            </button>
            <input
              id="cantidad"
              name="cantidad"
              type="number"
              min={1}
              value={cantidad}
              onChange={(evento) => cambiarCantidad(Number(evento.target.value))}
              className={`h-full w-14 text-center text-sm font-bold text-[#14285B] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${FOCO}`}
            />
            <button
              type="button"
              aria-label="Aumentar cantidad"
              onClick={() => cambiarCantidad(cantidad + 1)}
              className={`flex h-full w-10 items-center justify-center bg-[#EAF2FF] text-[#0755D8] transition hover:bg-[#D8E8FF] ${FOCO}`}
            >
              <Plus size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Registrar */}
      <button
        type="submit"
        className={`flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0649D8] to-[#0876E9] px-4 py-3.5 text-base font-extrabold text-white shadow-[0_8px_18px_rgba(5,91,210,0.22)] transition hover:brightness-95 ${FOCO}`}
      >
        <Package size={21} aria-hidden="true" />
        Registrar lote
      </button>
    </form>
  );
}
