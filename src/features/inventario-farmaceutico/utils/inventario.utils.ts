import {
  obtenerEstadoStock,
  type EstadoStock,
} from "@/features/catalogo/types";

import type {
  MedicamentoInventario,
  IndicadoresInventario,
  FiltrosInventario,
} from "../types";

// =========================================================
// NORMALIZACIÓN DE TEXTO
// =========================================================

export function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// =========================================================
// ESTADO DEL INVENTARIO
// =========================================================

export function obtenerEstadoInventario(
  medicamento: MedicamentoInventario,
): EstadoStock {
  switch (medicamento.estadoInventario) {
    case "VERDE":
      return "Disponible";

    case "AMARILLO":
      return "Disponibilidad limitada";

    case "ROJO":
      return "Agotado";

    default:
      return obtenerEstadoStock(medicamento.cantidad);
  }
}

// =========================================================
// CÁLCULO DE INDICADORES
// =========================================================

export function calcularIndicadoresInventario(
  medicamentos: MedicamentoInventario[],
): IndicadoresInventario {
  const indicadores: IndicadoresInventario = {
    totalMedicamentos: medicamentos.length,
    disponibles: 0,
    stockBajo: 0,
    agotados: 0,
    totalUnidades: 0,
  };

  for (const medicamento of medicamentos) {
    const estado = obtenerEstadoInventario(medicamento);

    indicadores.totalUnidades += medicamento.cantidad;

    switch (estado) {
      case "Disponible":
        indicadores.disponibles++;
        break;

      case "Disponibilidad limitada":
        indicadores.stockBajo++;
        break;

      case "Agotado":
        indicadores.agotados++;
        break;
    }
  }

  return indicadores;
}

// =========================================================
// BÚSQUEDA Y FILTROS
// =========================================================

export function filtrarInventario(
  medicamentos: MedicamentoInventario[],
  filtros: FiltrosInventario,
): MedicamentoInventario[] {
  const busqueda = normalizarTexto(filtros.busqueda);

  return medicamentos.filter((medicamento) => {
    const textoMedicamento = normalizarTexto(
      [
        medicamento.codigo,
        medicamento.nombreGenerico,
        medicamento.concentracion,
        medicamento.presentacion,
      ].join(" "),
    );

    const coincideBusqueda =
      !busqueda || textoMedicamento.includes(busqueda);

    const coincideEstado =
      filtros.estado === "TODOS" ||
      obtenerEstadoInventario(medicamento) === filtros.estado;

    return coincideBusqueda && coincideEstado;
  });
}

// =========================================================
// ORDENAMIENTO ALFABÉTICO
// =========================================================

export function ordenarInventario(
  medicamentos: MedicamentoInventario[],
): MedicamentoInventario[] {
  return [...medicamentos].sort((a, b) =>
    a.nombreGenerico.localeCompare(
      b.nombreGenerico,
      "es",
      { sensitivity: "base" },
    ),
  );
}

// =========================================================
// FORMATO DE CANTIDADES
// =========================================================

export function formatearCantidad(cantidad: number): string {
  return new Intl.NumberFormat("es-CO").format(cantidad);
}