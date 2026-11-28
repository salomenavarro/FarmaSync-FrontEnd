import type { Medicamento, SedeFarmacia } from "@/features/catalogo/types";
import type { MedicamentoGuardado } from "@/features/mis-medicamentos/types";

export interface FavoritoResuelto {
  clave: string;
  medicamentoId: string;
  sedeId: string;
  codigoMedicamento: string;
  nombreMedicamento: string;
  nombreSede: string;
  fechaGuardado: string;
  hrefDisponibilidad: string;
}

// Cruza los favoritos guardados con medicamentos y sedes del catálogo usando Maps.
export function resolverFavoritos(
  guardados: MedicamentoGuardado[],
  medicamentos: Medicamento[] = [],
  sedes: SedeFarmacia[] = [],
): FavoritoResuelto[] {
  // Indexamos medicamentos por id en string para resolver código y nombre rápidamente.
  const medicamentosPorId = new Map(
    medicamentos.map((med) => [String(med.id), med]),
  );

  // Indexamos sedes por id en string para resolver el nombre de cada sede.
  const sedesPorId = new Map(
    sedes.map((sede) => [String(sede.id), sede]),
  );

  return guardados.map((item) => {
    const med = medicamentosPorId.get(String(item.medicamentoId));
    const sede = sedesPorId.get(String(item.sedeId));

    // Usamos el código del catálogo si existe; de lo contrario, usamos el ID guardado.
    const codigoBusqueda = med?.codigo?.trim() || String(item.medicamentoId);

    // Combinamos nombreGenerico y concentración si está disponible.
    const tituloMedicamento = med
      ? `${med.nombreGenerico}${med.concentracion ? ` ${med.concentracion}` : ""}`
      : `Medicamento #${item.medicamentoId}`;

    // Construimos la URL exacta para abrir la disponibilidad de ese medicamento en esa sede.
    const params = new URLSearchParams({
      busqueda: codigoBusqueda,
      sedeId: String(item.sedeId),
    });

    return {
      clave: `${item.medicamentoId}-${item.sedeId}`,
      medicamentoId: item.medicamentoId,
      sedeId: item.sedeId,
      codigoMedicamento: codigoBusqueda,
      nombreMedicamento: tituloMedicamento,
      nombreSede: sede?.nombre ?? `Sede #${item.sedeId}`,
      fechaGuardado: item.fechaGuardado,
      hrefDisponibilidad: `/medicamentos?${params.toString()}`,
    };
  });
}