import { useQuery } from "@tanstack/react-query";
import {
  catalogoService,
  type ConsultaCatalogoParams,
} from "../services/catalogo.service";
import { catalogoKeys } from "./catalogo.keys";

// Hook de consulta del catálogo y disponibilidad por sedes.
// Mantiene los datos remotos sincronizados y aislados de los componentes de UI.
export function useMedicamentos(params?: ConsultaCatalogoParams) {
  return useQuery({
    queryKey: catalogoKeys.medicamentos(params),
    queryFn: () => catalogoService.listarCatalogo(params),
  });
}