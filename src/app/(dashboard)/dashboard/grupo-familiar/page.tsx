"use client";

import Image from "next/image";
import { useState } from "react";

import {
  HeartHandshake,
  Info,
  Plus,
  ShieldCheck,
  Trash2,
  UserRoundPlus,
  UsersRound,
  X,
} from "lucide-react";

import DependienteCard from "@/features/grupo-familiar/components/DependienteCard";
import DependienteForm from "@/features/grupo-familiar/components/DependienteForm";
import BannerWaves from "@/components/layout/BannerWaves";

import type {
  Dependiente,
  DependienteFormData,
} from "@/features/grupo-familiar/types";

// ========================================
// DATOS DE DEMOSTRACIÓN
// ========================================

const dependientesIniciales: Dependiente[] = [
  {
    id: "1",
    nombres: "María",
    apellidos: "Gómez Pérez",
    parentesco: "Hijo / Hija",
    tipoDocumento: "RC",
    numeroDocumento: "1023456789",
    fechaNacimiento: "2018-05-12",
    estado: "Activo",
  },
  {
    id: "2",
    nombres: "Carlos",
    apellidos: "Ramírez Gómez",
    parentesco: "Padre / Madre",
    tipoDocumento: "CC",
    numeroDocumento: "9876543210",
    fechaNacimiento: "1962-08-20",
    correoElectronico: "carlos@example.com",
    estado: "Activo",
  },
];

// ========================================
// PÁGINA MI GRUPO FAMILIAR
// ========================================

export default function GrupoFamiliarPage() {
  const [dependientes, setDependientes] =
    useState<Dependiente[]>(dependientesIniciales);

  const [formularioAbierto, setFormularioAbierto] =
    useState(false);

  const [dependienteEditar, setDependienteEditar] =
    useState<Dependiente | null>(null);

  const [dependienteEliminar, setDependienteEliminar] =
    useState<Dependiente | null>(null);

  // ========================================
  // ABRIR Y CERRAR FORMULARIO
  // ========================================

  const abrirFormulario = () => {
    setDependienteEditar(null);
    setFormularioAbierto(true);
  };

  const cerrarFormulario = () => {
    setFormularioAbierto(false);
    setDependienteEditar(null);
  };

  const editarDependiente = (dependiente: Dependiente) => {
    setDependienteEditar(dependiente);
    setFormularioAbierto(true);
  };

  // ========================================
  // GUARDAR DEPENDIENTE
  // ========================================

  const guardarDependiente = (datos: DependienteFormData) => {
    if (dependienteEditar) {
      setDependientes((actuales) =>
        actuales.map((dependiente) =>
          dependiente.id === dependienteEditar.id
            ? { ...dependiente, ...datos }
            : dependiente
        )
      );

      return;
    }

    const nuevoDependiente: Dependiente = {
      ...datos,
      id: crypto.randomUUID(),
      estado: "Activo",
    };

    setDependientes((actuales) => [
      ...actuales,
      nuevoDependiente,
    ]);
  };

  // ========================================
  // ELIMINAR DEPENDIENTE
  // ========================================

  const confirmarEliminacion = () => {
    if (!dependienteEliminar) return;

    setDependientes((actuales) =>
      actuales.filter(
        (dependiente) =>
          dependiente.id !== dependienteEliminar.id
      )
    );

    setDependienteEliminar(null);
  };

  // ========================================
  // ESTADÍSTICAS
  // ========================================

  const totalDependientes = dependientes.length;

  const dependientesActivos = dependientes.filter(
    (dependiente) => dependiente.estado === "Activo"
  ).length;

  return (
    <main className="flex min-h-full min-w-0 flex-col bg-[#F5F9FF] p-3 lg:h-dvh lg:min-h-0 lg:overflow-hidden">
      <div className="mx-auto flex min-h-0 w-full flex-1 flex-col gap-3">

        {/* =====================================
            BANNER PRINCIPAL
        ===================================== */}

        <section
          className="
            relative isolate flex min-h-[150px]
            shrink-0 items-center overflow-hidden
            rounded-[24px]
            bg-gradient-to-r
            from-[#0B1F5C]
            via-[#0755D8]
            to-[#0876E9]
            px-5 py-4 text-white
            shadow-[0_10px_25px_rgba(5,91,210,0.18)]
            sm:px-8 lg:min-h-[186px]
          "
        >
          {/* ONDAS DECORATIVAS */}

          <BannerWaves />

          {/* CONTENIDO DEL ENCABEZADO */}

          <div className="relative z-10 w-full lg:max-w-[60%]">

            {/* ETIQUETA SUPERIOR */}

            <div
              className="
                mb-3 inline-flex items-center gap-2
                rounded-full border border-white/20
                bg-white/10 px-3 py-1.5
              "
            >
              <HeartHandshake
                size={15}
                aria-hidden="true"
              />

              <span className="text-xs font-semibold">
                Plan familiar
              </span>
            </div>

            {/* TÍTULO */}

            <h1
              className="
                text-[26px] font-extrabold
                tracking-tight sm:text-[30px]
              "
            >
              Mi Grupo Familiar
            </h1>

            {/* DESCRIPCIÓN */}

            <p
              className="
                mt-2 max-w-xl text-[13px]
                leading-relaxed text-[#E1EDFF]
                sm:text-sm
              "
            >
              Administra los familiares a tu cargo y
              organiza sus reservas de medicamentos
              desde un solo lugar.
            </p>
          </div>

          {/* ILUSTRACIÓN MÉDICA Y FAMILIAR */}

          <div
            className="
              pointer-events-none absolute bottom-0
              right-3 hidden h-[150px] w-[36%]
              lg:block xl:right-5 xl:h-[155px]
            "
          >
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

        {/* =====================================
            RESUMEN FAMILIAR
        ===================================== */}

        <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2">

          {/* FAMILIARES REGISTRADOS */}

          <div className="flex items-center gap-4 rounded-[20px] border border-[#DCE8F7] bg-white px-5 py-3.5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#0755D8]">
              <UsersRound size={25} />
            </div>

            <div>
              <p className="text-[12px] font-semibold text-[#526783]">
                Familiares registrados
              </p>

              <p className="mt-0.5 text-[25px] font-extrabold leading-none text-[#14285B]">
                {totalDependientes}
              </p>
            </div>
          </div>

          {/* DEPENDIENTES ACTIVOS */}

          <div className="flex items-center gap-4 rounded-[20px] border border-[#DCE8F7] bg-white px-5 py-3.5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E2F7EC] text-[#16834C]">
              <ShieldCheck size={25} />
            </div>

            <div>
              <p className="text-[12px] font-semibold text-[#526783]">
                Dependientes activos
              </p>

              <p className="mt-0.5 text-[25px] font-extrabold leading-none text-[#14285B]">
                {dependientesActivos}
              </p>
            </div>
          </div>
        </div>

        {/* =====================================
            MIS DEPENDIENTES
        ===================================== */}

        <section className="flex min-h-0 flex-1 flex-col rounded-[24px] border border-[#DCE8F7] bg-white p-4 shadow-sm sm:p-5">

          {/* ENCABEZADO Y BOTÓN */}

          <div className="mb-4 flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-[19px] font-extrabold text-[#14285B]">
                <UsersRound
                  size={23}
                  className="text-[#0755D8]"
                />

                Mis dependientes
              </h2>

              <p className="mt-1 text-[12px] text-[#64748B]">
                Consulta y administra tus familiares registrados.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">

              {/* BOTÓN AGREGAR DEPENDIENTE */}

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

          {/* LISTA DE DEPENDIENTES */}

          {dependientes.length > 0 ? (
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {dependientes.map((dependiente) => (
                  <DependienteCard
                    key={dependiente.id}
                    dependiente={dependiente}
                    onEdit={editarDependiente}
                    onDelete={setDependienteEliminar}
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
                Agrega a tus hijos o adultos mayores
                a cargo para comenzar a gestionar
                su información.
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

        {/* =====================================
            INFORMACIÓN INFERIOR
        ===================================== */}

        <section className="flex shrink-0 items-center gap-3 rounded-[16px] border border-[#C8DFFB] bg-[#EAF3FF] px-4 py-3">
          <Info
            size={19}
            className="shrink-0 text-[#0755D8]"
          />

          <p className="text-[11px] leading-relaxed text-[#526783]">
            <strong className="text-[#14285B]">
              Sobre tu grupo familiar:
            </strong>{" "}
            Este módulo está en desarrollo.
            Los datos actuales son de demostración.
          </p>
        </section>
      </div>

      {/* =====================================
          MODAL AGREGAR / EDITAR
      ===================================== */}

      <DependienteForm
        isOpen={formularioAbierto}
        onClose={cerrarFormulario}
        onSave={guardarDependiente}
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

      {/* =====================================
          CONFIRMACIÓN DE ELIMINACIÓN
      ===================================== */}

      {dependienteEliminar && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#071B42]/60 p-4">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="eliminar-dependiente-titulo"
            aria-describedby="eliminar-dependiente-descripcion"
            className="w-full max-w-[430px] rounded-[24px] bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0F0] text-[#D92D20]">
                <Trash2 size={23} />
              </div>

              <button
                type="button"
                onClick={() => setDependienteEliminar(null)}
                aria-label="Cerrar confirmación"
                className="rounded-lg p-1.5 text-[#64748B] hover:bg-[#F1F5F9]"
              >
                <X size={20} />
              </button>
            </div>

            <h2
              id="eliminar-dependiente-titulo"
              className="mt-4 text-xl font-extrabold text-[#14285B]"
            >
              ¿Eliminar dependiente?
            </h2>

            <p
              id="eliminar-dependiente-descripcion"
              className="mt-2 text-sm leading-relaxed text-[#526783]"
            >
              ¿Estás seguro de que deseas eliminar a{" "}
              <strong>
                {dependienteEliminar.nombres}{" "}
                {dependienteEliminar.apellidos}
              </strong>
              ?
            </p>

            <p className="mt-2 text-xs text-[#64748B]">
              Esta acción solo modificará los datos
              temporales de esta demostración.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDependienteEliminar(null)}
                className="rounded-xl border border-[#D6E3F4] px-4 py-2.5 text-sm font-bold text-[#263D65] hover:bg-[#F5F9FF]"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmarEliminacion}
                className="rounded-xl bg-[#D92D20] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#B42318]"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}