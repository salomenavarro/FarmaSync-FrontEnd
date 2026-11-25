import { useQuery } from "@tanstack/react-query";
import { grupoFamiliarService } from "../services/grupo-familiar.service";
import { grupoFamiliarKeys } from "./grupo-familiar.keys";

// Hook de consulta para el estado remoto del grupo familiar.
// Encapsula TanStack Query para que GrupoFamiliarView no maneje directamente
// peticiones HTTP ni claves de caché.
export function useDependientes() {
  return useQuery({
    queryKey: grupoFamiliarKeys.lists(),
    queryFn: () => grupoFamiliarService.listar(),
  });
}