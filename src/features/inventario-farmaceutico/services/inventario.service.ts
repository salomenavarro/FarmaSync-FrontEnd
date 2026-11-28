import { catalogoService } from "@/features/catalogo/services/catalogo.service";

import type { MedicamentoInventario } from "../types";

// =========================================================
// SERVICIO DE INVENTARIO DEL FARMACÉUTICO
// =========================================================

export const inventarioService = {
  async listarInventario(
    sedeId: string,
  ): Promise<MedicamentoInventario[]> {
    const sede = sedeId.trim();

    if (!/^[1-9]\d*$/.test(sede)) {
      throw new Error(
        "Se requiere una sede válida para consultar el inventario.",
      );
    }

    const { medicamentos } =
      await catalogoService.listarCatalogo({
        sedeId: sede,
      });

    const inventario: MedicamentoInventario[] = [];

    for (const medicamento of medicamentos) {
      const stock = medicamento.stockPorSede.find(
        (item) => item.sedeId === sede,
      );

      // No incluir medicamentos sin inventario en esta sede.
      if (!stock) {
        continue;
      }

      inventario.push({
        id: medicamento.id,
        codigo: medicamento.codigo,
        nombreGenerico: medicamento.nombreGenerico,
        concentracion: medicamento.concentracion,
        presentacion: medicamento.presentacion,
        sedeId: stock.sedeId,
        cantidad: stock.cantidad,
        estadoInventario: stock.estadoInventario,
      });
    }

    return inventario;
  },
};