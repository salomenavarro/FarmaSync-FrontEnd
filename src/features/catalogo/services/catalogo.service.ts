import { apiClient } from "@/lib/api";
import type { Medicamento, SedeFarmacia, StockSede } from "../types";

// Estructura que devuelve GET /medicines en el backend NestJS.
// Mantenerla aislada aquí evita que los componentes dependan directamente
// del formato crudo de Prisma/UseCase.
interface SedeApiItem {
  id: number | string;
  nombre: string;
  ciudad?: string | null;
  zona?: string | null;
  direccion?: string | null;
  latitud?: number | null;
  longitud?: number | null;
}

interface InventarioApiItem {
  sedeId: number | string;
  cantidad: number;
  estadoInventario?: "ROJO" | "AMARILLO" | "VERDE";
  distanciaKm?: number;
  sede?: SedeApiItem | null;
}

interface MedicamentoApiResponse {
  id: number | string;
  codigo: string;
  nombreGenerico: string;
  presentacion: string;
  concentracion?: string | null;
  descripcion?: string | null;
  requiereOrden?: boolean;
  puedeActivarAlerta?: boolean;
  inventarios?: InventarioApiItem[];
}

export interface ConsultaCatalogoParams {
  search?: string;
  sedeId?: string;
  ciudad?: string;
  zona?: string;
  lat?: number;
  lng?: number;
}

export interface CatalogoConsultaResultado {
  medicamentos: Medicamento[];
  sedes: SedeFarmacia[];
}

function mapearMedicamentoYStock(raw: MedicamentoApiResponse): {
  medicamento: Medicamento;
  sedes: SedeFarmacia[];
} {
  const inventariosRaw = Array.isArray(raw.inventarios) ? raw.inventarios : [];
  const sedesExtraidas: SedeFarmacia[] = [];

  const stockPorSede: StockSede[] = inventariosRaw.map((inv) => {
    const sedeIdStr = String(inv.sedeId);

    if (inv.sede) {
      sedesExtraidas.push({
        id: String(inv.sede.id ?? sedeIdStr),
        nombre: inv.sede.nombre,
        ciudad: inv.sede.ciudad ?? "Medellín",
        zona: inv.sede.zona ?? "General",
        direccion: inv.sede.direccion ?? "",
        latitud: inv.sede.latitud ?? null,
        longitud: inv.sede.longitud ?? null,
        distanciaKm: inv.distanciaKm,
      });
    }

    return {
      sedeId: sedeIdStr,
      cantidad: Number(inv.cantidad ?? 0),
      estadoInventario: inv.estadoInventario,
      distanciaKm: inv.distanciaKm,
    };
  });

  const concentracionTexto = raw.concentracion?.trim() ?? "";
  const presentacionTexto = raw.presentacion?.trim() ?? "";
  const descripcionTexto =
    raw.descripcion?.trim() ||
    `${presentacionTexto}${concentracionTexto ? ` · ${concentracionTexto}` : ""}`;

  return {
    medicamento: {
      id: String(raw.id),
      codigo: raw.codigo,
      nombreGenerico: raw.nombreGenerico,
      concentracion: concentracionTexto,
      presentacion: presentacionTexto,
      descripcion: descripcionTexto,
      requiereOrden: raw.requiereOrden,
      puedeActivarAlerta: raw.puedeActivarAlerta,
      stockPorSede,
    },
    sedes: sedesExtraidas,
  };
}

// Capa HTTP del catálogo: consulta medicamentos con filtros opcionales y
// gestiona la suscripción a alertas de reabastecimiento.
export const catalogoService = {
  async listarCatalogo(
    params?: ConsultaCatalogoParams
  ): Promise<CatalogoConsultaResultado> {
    const queryParams: Record<string, string> = {};

    if (params?.search?.trim()) {
      queryParams.search = params.search.trim();
    }
    if (params?.sedeId?.trim()) {
      queryParams.sedeId = params.sedeId.trim();
    }
    if (params?.ciudad?.trim()) {
      queryParams.ciudad = params.ciudad.trim();
    }
    if (params?.zona?.trim()) {
      queryParams.zona = params.zona.trim();
    }
    if (params?.lat !== undefined) {
      queryParams.lat = String(params.lat);
    }
    if (params?.lng !== undefined) {
      queryParams.lng = String(params.lng);
    }

    const response = await apiClient.get<MedicamentoApiResponse[]>(
      "/medicines",
      { params: queryParams }
    );

    const items = Array.isArray(response.data) ? response.data : [];
    const sedesMap = new Map<string, SedeFarmacia>();
    const medicamentos: Medicamento[] = [];

    for (const rawMed of items) {
      const { medicamento, sedes } = mapearMedicamentoYStock(rawMed);
      medicamentos.push(medicamento);

      for (const sede of sedes) {
        if (!sedesMap.has(sede.id)) {
          sedesMap.set(sede.id, sede);
        }
      }
    }

    return {
      medicamentos,
      sedes: Array.from(sedesMap.values()),
    };
  },

  async activarAlertaStock(medicamentoId: string): Promise<void> {
    await apiClient.post(`/medicines/${medicamentoId}/alertas`);
  },
};