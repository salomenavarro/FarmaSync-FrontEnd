"use client";

import Image from "next/image";
import { useState } from "react";
import {
  AlertCircle,
  HeartHandshake,
  Info,
  Plus,
  RefreshCw,
  ShieldCheck,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";

import { useActualizarDependiente } from "../hooks/useActualizarDependiente";
import { useCrearDependiente } from "../hooks/useCrearDependiente";
import { useDependientes } from "../hooks/useDependientes";
import { useEliminarDependiente } from "../hooks/useEliminarDependiente";
import type { Dependiente, DependienteFormData } from "../types";
import { getGrupoFamiliarErrorMessage } from "../utils";
import DeleteDependienteDialog from "./DeleteDependienteDialog";
import DependienteCard from "./DependienteCard";
import DependienteForm from "./DependienteForm";

// Vista principal del feature grupo-familiar: coordina la consulta de
// dependientes, los estados de carga/error y los modales de crear/editar/eliminar,
// manteniendo la composición visual separada de la ruta en `app/`.
export default function GrupoFamiliarView() {
  const {
    data: dependientes = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useDependientes();

  const crearMutation = useCrearDependiente();
  const actualizarMutation = useActualizarDependiente();
  const eliminarMutation = useEliminarDependiente();

  // Estados locales exclusivos de interfaz (apertura de modales y selección actual)
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [dependienteEditar, setDependienteEditar] =
    useState<Dependiente | null>(null);
  const [dependienteEliminar, setDependienteEliminar] =
    useState<Dependiente | null>(null);
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(
    null
  );
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>(
    null
  );

  const abrirFormulario = () => {
    setDependienteEditar(null);
    setFormErrorMessage(null);
    setFormularioAbierto(true);
  };

  const cerrarFormulario = () => {
    setFormularioAbierto(false);
    setDependienteEditar(null);
    setFormErrorMessage(null);
  };

  const editarDependiente = (dependiente: Dependiente) => {
    setDependienteEditar(dependiente);
    setFormErrorMessage(null);
    setFormularioAbierto(true);
  };

  const abrirConfirmacionEliminar = (dependiente: Dependiente) => {
    setDeleteErrorMessage(null);
    setDependienteEliminar(dependiente);
  };

  const cerrarConfirmacionEliminar = () => {
    setDependienteEliminar(null);
    setDeleteErrorMessage(null);
  };

  // Ejecuta crear o editar según haya un dependiente seleccionado; propaga el
  // error para que DependienteForm muestre el mensaje y no se cierre si falla.
  const guardarDependiente = async (datos: DependienteFormData) => {
    setFormErrorMessage(null);

    try {
      if (dependienteEditar) {
        await actualizarMutation.mutateAsync({
          id: dependienteEditar.id,
          data: datos,
        });
        return;
      }

      await crearMutation.mutateAsync(datos);
    } catch (err) {
      const mensaje = getGrupoFamiliarErrorMessage(
        err,
        dependienteEditar
          ? "No se pudieron guardar los cambios del dependiente."
          : "No se pudo registrar el dependiente."
      );
      setFormErrorMessage(mensaje);
      throw err;
    }
  };

  // Confirma la eliminación/desactivación en el backend y refresca la lista
  // mediante la invalidación configurada en el hook.
  const confirmarEliminacion = async () => {
    if (!dependienteEliminar) return;

    setDeleteErrorMessage(null);

    try {
      await eliminarMutation.mutateAsync(dependienteEliminar.id);
    } catch (err) {
      const mensaje = getGrupoFamiliarErrorMessage(
        err,
        "No se pudo eliminar el dependiente."
      );
      setDeleteErrorMessage(mensaje);
      throw err;
    }
  };

  const isGuardando =
    crearMutation.isPending || actualizarMutation.isPending;
  const isEliminando = eliminarMutation.isPending;

  const totalDependientes = dependientes.length;
  const dependientesActivos = dependientes.filter(
    (dependiente) => dependiente.estado === "Activo"
  ).length;

  return (
    <main className="flex min-h-full flex-col bg-[#F5F9FF] p-3 lg:h-dvh lg:min-h-0 lg:overflow-hidden lg:p-4">
      <div className="mx-auto flex min-h-0 w-full max-w-[1450px] flex-1 flex-col gap-3">
        {/* BANNER PRINCIPAL */}
        <section className="relative isolate flex min-h-[165px] shrink-0 items-center overflow-hidden rounded-[25px] bg-gradient-to-r from-[#0755D8] via-[#087BE8] to-[#27B6E8] px-6 py-5 text-white shadow-[0_8px_22px_rgba(5,91,210,0.13)] sm:px-8">
          <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="pointer-events-none absolute bottom-[-75px] right-[300px] h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10 max-w-[620px] lg:max-w-[52%]">
            <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#D8F5FF]">
              <HeartHandshake size={17} />
              Plan familiar
            </p>

            <h1 className="mt-2 text-[29px] font-extrabold leading-tight tracking-tight sm:text-[33px]">
              Mi Grupo Familiar
            </h1>

            <p className="mt-2 max-w-[540px] text-[13px] leading-relaxed text-white/95">
              Administra los familiares a tu cargo y organiza sus reservas de
              medicamentos desde un solo lugar.
            </p>
          </div>

          <div className="pointer-events-none absolute bottom-0 right-3 hidden h-[150px] w-[36%] lg:block xl:right-5 xl:h-[155px]">
            <Image
              src="/images/familia.png"
              alt="Familia acompañada de elementos médicos"
              fill
              priority
              sizes="(min-width: 1280px) 500px, 350px"
              className="object-contain object-right-bottom"
            />
          </div>
        </section>

        {/* RESUMEN FAMILIAR */}
        <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-[20px] border border-[#DCE8F7] bg-white px-5 py-3.5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#0755D8]">
              <UsersRound size={25} />
            </div>

            <div>
              <p className="text-[12px] font-semibold text-[#526783]">
                Familiares registrados
              </p>
              <p className="mt-0.5 text-[25px] font-extrabold leading-none text-[#14285B]">
                {isLoading ? "—" : totalDependientes}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-[20px] border border-[#DCE8F7] bg-white px-5 py-3.5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E2F7EC] text-[#16834C]">
              <ShieldCheck size={25} />
            </div>

            <div>
              <p className="text-[12px] font-semibold text-[#526783]">
                Dependientes activos
              </p>
              <p className="mt-0.5 text-[25px] font-extrabold leading-none text-[#14285B]">
                {isLoading ? "—" : dependientesActivos}
              </p>
            </div>
          </div>
        </div>

        {/* MIS DEPENDIENTES */}
        <section className="flex min-h-0 flex-1 flex-col rounded-[24px] border border-[#DCE8F7] bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-[19px] font-extrabold text-[#14285B]">
                <UsersRound size={23} className="text-[#0755D8]" />
                Mis dependientes
              </h2>
              <p className="mt-1 text-[12px] text-[#64748B]">
                Consulta y administra tus familiares registrados.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={abrirFormulario}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0755D8] px-5 py-2.5 text-[13px] font-extrabold text-white shadow-[0_5px_14px_rgba(7,85,216,0.18)] transition hover:bg-[#0646B7]"
              >
                <Plus size={19} />
                Agregar dependiente
              </button>

              <span className="rounded-full bg-[#EAF3FF] px-3 py-2 text-[11px] font-bold text-[#0755D8]">
                {totalDependientes} registrados
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto pr-1 xl:grid-cols-2">
              {[0, 1].map((skeleton) => (
                <div
                  key={skeleton}
                  className="h-[190px] animate-pulse rounded-[22px] border border-[#D9E7F9] bg-[#F8FBFF] p-4"
                />
              ))}
            </div>
          ) : isError ? (
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-2xl border border-[#F5D2D2] bg-[#FFF8F8] px-5 py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0F0] text-[#D92D20]">
                <AlertCircle size={28} />
              </div>

              <h3 className="mt-4 text-[17px] font-extrabold text-[#14285B]">
                No pudimos cargar tu grupo familiar
              </h3>

              <p className="mt-2 max-w-[420px] text-[12px] leading-relaxed text-[#526783]">
                {getGrupoFamiliarErrorMessage(
                  error,
                  "Ocurrió un error al consultar tus dependientes."
                )}
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0755D8] px-4 py-2.5 text-[12px] font-bold text-white hover:bg-[#0646B7]"
              >
                <RefreshCw size={16} />
                Reintentar
              </button>
            </div>
          ) : dependientes.length > 0 ? (
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {dependientes.map((dependiente) => (
                  <DependienteCard
                    key={dependiente.id}
                    dependiente={dependiente}
                    onEdit={editarDependiente}
                    onDelete={abrirConfirmacionEliminar}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-[#C9D9EE] bg-[#F8FBFF] px-5 py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0755D8]">
                <UserRoundPlus size={28} />
              </div>

              <h3 className="mt-4 text-[17px] font-extrabold text-[#14285B]">
                Aún no tienes dependientes
              </h3>

              <p className="mt-2 max-w-[370px] text-[12px] leading-relaxed text-[#64748B]">
                Agrega a tus hijos o adultos mayores a cargo para comenzar a
                gestionar su información.
              </p>

              <button
                type="button"
                onClick={abrirFormulario}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0755D8] px-4 py-2.5 text-[12px] font-bold text-white hover:bg-[#0646B7]"
              >
                <Plus size={17} />
                Agregar dependiente
              </button>
            </div>
          )}
        </section>

        {/* INFORMACIÓN INFERIOR */}
        <section className="flex shrink-0 items-center gap-3 rounded-[16px] border border-[#C8DFFB] bg-[#EAF3FF] px-4 py-3">
          <Info size={19} className="shrink-0 text-[#0755D8]" />
          <p className="text-[11px] leading-relaxed text-[#526783]">
            <strong className="text-[#14285B]">Sobre tu grupo familiar:</strong>{" "}
            Los dependientes registrados quedan asociados a tu cuenta para
            facilitar la gestión de reservas.
          </p>
        </section>
      </div>

      {/* MODAL AGREGAR / EDITAR */}
      <DependienteForm
        isOpen={formularioAbierto}
        onClose={cerrarFormulario}
        onSave={guardarDependiente}
        isSubmitting={isGuardando}
        serverError={formErrorMessage}
        initialData={
          dependienteEditar
            ? {
                nombres: dependienteEditar.nombres,
                apellidos: dependienteEditar.apellidos,
                parentesco: dependienteEditar.parentesco,
                tipoDocumento: dependienteEditar.tipoDocumento,
                numeroDocumento: dependienteEditar.numeroDocumento,
                fechaNacimiento: dependienteEditar.fechaNacimiento,
                correoElectronico:
                  dependienteEditar.correoElectronico ?? "",
              }
            : undefined
        }
      />

      {/* CONFIRMACIÓN DE ELIMINACIÓN */}
      <DeleteDependienteDialog
        dependiente={dependienteEliminar}
        onClose={cerrarConfirmacionEliminar}
        onConfirm={confirmarEliminacion}
        isDeleting={isEliminando}
        errorMessage={deleteErrorMessage}
      />
    </main>
  );
}