"use client";

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { inventarioService } from "../services/inventario.service";

import type {
  MedicamentoInventario,
  FiltrosInventario,
  EstadoCargaInventario,
} from "../types";

import {
  calcularIndicadoresInventario,
  filtrarInventario,
  ordenarInventario,
} from "../utils/inventario.utils";

// =========================================================
// FILTROS INICIALES
// =========================================================

const FILTROS_INICIALES: FiltrosInventario = {
  busqueda: "",
  estado: "TODOS",
};

// =========================================================
// HOOK DE INVENTARIO
// =========================================================

export function useInventario(sedeId?: string) {
  const sede = sedeId?.trim() ?? "";

  const [medicamentos, setMedicamentos] = useState<
    MedicamentoInventario[]
  >([]);

  const [estadoCarga, setEstadoCarga] =
    useState<EstadoCargaInventario>("INICIAL");

  const [error, setError] = useState<string | null>(null);

  const [filtros, setFiltros] =
    useState<FiltrosInventario>(FILTROS_INICIALES);

  const [intentoConsulta, setIntentoConsulta] = useState(0);

  const [sedeConsultada, setSedeConsultada] =
    useState<string | null>(null);

  const sedeDisponible = /^[1-9]\d*$/.test(sede);

  // =========================================================
  // CONSULTA DEL INVENTARIO
  // =========================================================

  useEffect(() => {
    let activo = true;

    async function cargarInventario() {
      if (!sedeDisponible) {
        setMedicamentos([]);
        setEstadoCarga("INICIAL");
        setError(null);
        setSedeConsultada(null);
        return;
      }

      setEstadoCarga("CARGANDO");
      setError(null);
      setMedicamentos([]);
      setSedeConsultada(null);

      try {
        const resultado =
          await inventarioService.listarInventario(sede);

        if (!activo) return;

        setMedicamentos(ordenarInventario(resultado));
        setSedeConsultada(sede);
        setEstadoCarga("EXITOSO");
      } catch {
        if (!activo) return;

        setMedicamentos([]);
        setEstadoCarga("ERROR");

        setError(
          "No fue posible consultar el inventario. Inténtalo nuevamente.",
        );
      }
    }

    void cargarInventario();

    return () => {
      activo = false;
    };
  }, [sede, sedeDisponible, intentoConsulta]);

  // =========================================================
  // INVENTARIO DE LA SEDE ACTUAL
  // =========================================================

  const inventarioActual = useMemo(() => {
    if (!sedeDisponible || sedeConsultada !== sede) {
      return [];
    }

    return medicamentos;
  }, [
    medicamentos,
    sede,
    sedeDisponible,
    sedeConsultada,
  ]);

  // =========================================================
  // INDICADORES
  // =========================================================

  const indicadores = useMemo(
    () => calcularIndicadoresInventario(inventarioActual),
    [inventarioActual],
  );

  // =========================================================
  // MEDICAMENTOS FILTRADOS
  // =========================================================

  const medicamentosFiltrados = useMemo(
    () => filtrarInventario(inventarioActual, filtros),
    [inventarioActual, filtros],
  );

  const hayFiltrosActivos =
    filtros.busqueda.trim() !== "" ||
    filtros.estado !== "TODOS";

  // =========================================================
  // ACTUALIZACIÓN DE FILTROS
  // =========================================================

  const actualizarFiltro = useCallback(
    <K extends keyof FiltrosInventario>(
      campo: K,
      valor: FiltrosInventario[K],
    ) => {
      setFiltros((anteriores) => ({
        ...anteriores,
        [campo]: valor,
      }));
    },
    [],
  );

  // =========================================================
  // RESTABLECER FILTROS
  // =========================================================

  const restablecerFiltros = useCallback(() => {
    setFiltros({ ...FILTROS_INICIALES });
  }, []);

  // =========================================================
  // RECARGAR INVENTARIO
  // =========================================================

  const recargarInventario = useCallback(() => {
    setIntentoConsulta((anterior) => anterior + 1);
  }, []);

  // =========================================================
  // VALORES EXPUESTOS A LOS COMPONENTES
  // =========================================================

  return {
    medicamentos: inventarioActual,
    medicamentosFiltrados,
    indicadores,
    filtros,
    estadoCarga,
    error,
    sedeDisponible,

    cargando: estadoCarga === "CARGANDO",

    inventarioConsultado:
      sedeDisponible &&
      sedeConsultada === sede &&
      estadoCarga === "EXITOSO",

    hayFiltrosActivos,

    actualizarFiltro,
    restablecerFiltros,
    recargarInventario,
  };
}