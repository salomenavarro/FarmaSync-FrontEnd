// src/features/administrador/hooks/useAdminDashboard.ts
import { useQuery } from "@tanstack/react-query";
import { obtenerDashboardEps } from "../services/administrador.service";
import { administradorKeys } from "./administrador.keys";

export function useAdminDashboard() {
  return useQuery({
    queryKey: administradorKeys.dashboard(),
    queryFn: obtenerDashboardEps,
    staleTime: 30_000,
  });
}