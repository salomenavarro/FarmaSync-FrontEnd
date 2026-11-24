"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { MedicamentoGuardado } from "../types";

// =========================================================
// ESTADO COMPARTIDO
// =========================================================

const ESTADO_INICIAL: MedicamentoGuardado[] = [];

let medicamentosGuardados: MedicamentoGuardado[] =
  ESTADO_INICIAL;

const listeners = new Set<() => void>();

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

  // =======================================================
  // GUARDAR MEDICAMENTO POR SEDE
  // =======================================================

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

  // =======================================================
  // ELIMINAR MEDICAMENTO POR SEDE
  // =======================================================

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

  // =======================================================
  // VERIFICAR SI ESTÁ GUARDADO
  // =======================================================

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

  // =======================================================
  // ALTERNAR FAVORITO
  // =======================================================

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

  // =======================================================
  // RETORNAR FUNCIONALIDADES
  // =======================================================

  return {
    guardados,
    totalGuardados: guardados.length,
    guardarMedicamento,
    eliminarMedicamento,
    estaGuardado,
    alternarMedicamento,
  };
}