"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { MedicamentoGuardado } from "../types";

// =========================================================
// ESTADO COMPARTIDO Y PERSISTENCIA LOCAL
// =========================================================

const STORAGE_KEY = "farmasync_medicamentos_guardados";
const ESTADO_INICIAL: MedicamentoGuardado[] = [];

let medicamentosGuardados: MedicamentoGuardado[] =
  leerDesdeStorage();

const listeners = new Set<() => void>();

function leerDesdeStorage(): MedicamentoGuardado[] {
  if (typeof window === "undefined") {
    return ESTADO_INICIAL;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return ESTADO_INICIAL;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : ESTADO_INICIAL;
  } catch {
    return ESTADO_INICIAL;
  }
}

function guardarEnStorage(items: MedicamentoGuardado[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items)
    );
  } catch {
    // Evita fallos si el almacenamiento está lleno o bloqueado
  }
}

// =========================================================
// SUSCRIPCIÓN AL ESTADO
// =========================================================

function suscribir(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function obtenerEstado() {
  return medicamentosGuardados;
}

function obtenerEstadoServidor() {
  return ESTADO_INICIAL;
}

function actualizarEstado(
  nuevoEstado: MedicamentoGuardado[]
) {
  medicamentosGuardados = nuevoEstado;
  guardarEnStorage(nuevoEstado);

  listeners.forEach((listener) => listener());
}

// =========================================================
// HOOK DE MEDICAMENTOS GUARDADOS
// =========================================================

export function useMedicamentosGuardados() {
  const guardados = useSyncExternalStore(
    suscribir,
    obtenerEstado,
    obtenerEstadoServidor
  );

  const guardarMedicamento = useCallback(
    (medicamentoId: string, sedeId: string) => {
      const existe = medicamentosGuardados.some(
        (item) =>
          item.medicamentoId === medicamentoId &&
          item.sedeId === sedeId
      );

      if (existe) return;

      const nuevoMedicamento: MedicamentoGuardado = {
        medicamentoId,
        sedeId,
        fechaGuardado: new Date().toISOString(),
      };

      actualizarEstado([
        nuevoMedicamento,
        ...medicamentosGuardados,
      ]);
    },
    []
  );

  const eliminarMedicamento = useCallback(
    (medicamentoId: string, sedeId: string) => {
      actualizarEstado(
        medicamentosGuardados.filter(
          (item) =>
            !(
              item.medicamentoId === medicamentoId &&
              item.sedeId === sedeId
            )
        )
      );
    },
    []
  );

  const estaGuardado = useCallback(
    (medicamentoId: string, sedeId: string) => {
      return guardados.some(
        (item) =>
          item.medicamentoId === medicamentoId &&
          item.sedeId === sedeId
      );
    },
    [guardados]
  );

  const alternarMedicamento = useCallback(
    (medicamentoId: string, sedeId: string) => {
      const existe = medicamentosGuardados.some(
        (item) =>
          item.medicamentoId === medicamentoId &&
          item.sedeId === sedeId
      );

      if (existe) {
        eliminarMedicamento(medicamentoId, sedeId);
      } else {
        guardarMedicamento(medicamentoId, sedeId);
      }
    },
    [eliminarMedicamento, guardarMedicamento]
  );

  return {
    guardados,
    totalGuardados: guardados.length,
    guardarMedicamento,
    eliminarMedicamento,
    estaGuardado,
    alternarMedicamento,
  };
}