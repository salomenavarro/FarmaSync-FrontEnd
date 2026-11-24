"use client";

import { useState } from "react";

import {
  UsersRound,
  UserPlus,
  Pencil,
  UserCheck,
  UserX,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import type {
  Farmaceutico,
  SedeFarmacia,
} from "../types";

// =========================================================
// TIPOS
// =========================================================

type FarmaceuticosTableProps = {
  farmaceuticos: Farmaceutico[];
  sedes: SedeFarmacia[];
  onCrear: () => void;
  onEditar: (farmaceutico: Farmaceutico) => void;
  onCambiarEstado: (farmaceutico: Farmaceutico) => void;
};

const REGISTROS_POR_PAGINA = 4;

// =========================================================
// TABLA DE FARMACÉUTICOS
// =========================================================

export default function FarmaceuticosTable({
  farmaceuticos,
  sedes,
  onCrear,
  onEditar,
  onCambiarEstado,
}: FarmaceuticosTableProps) {
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);

  // =======================================================
  // OBTENER NOMBRE DE LA SEDE
  // =======================================================

  const obtenerSede = (sedeId: number) => {
    return (
      sedes.find((sede) => sede.id === sedeId)?.nombre ??
      "Sin sede asignada"
    );
  };

  // =======================================================
  // BÚSQUEDA DE FARMACÉUTICOS
  // =======================================================

  const farmaceuticosFiltrados = farmaceuticos.filter(
    (farmaceutico) => {
      const texto = busqueda.trim().toLowerCase();

      const nombreCompleto =
        `${farmaceutico.nombres} ${farmaceutico.apellidos}`.toLowerCase();

      return (
        nombreCompleto.includes(texto) ||
        farmaceutico.correo.toLowerCase().includes(texto) ||
        farmaceutico.numeroDocumento.includes(texto) ||
        obtenerSede(farmaceutico.sedeId)
          .toLowerCase()
          .includes(texto)
      );
    }
  );

  // =======================================================
  // PAGINACIÓN
  // =======================================================

  const totalPaginas = Math.max(
    1,
    Math.ceil(
      farmaceuticosFiltrados.length / REGISTROS_POR_PAGINA
    )
  );

  const paginaActual = Math.min(pagina, totalPaginas);

  const inicio =
    (paginaActual - 1) * REGISTROS_POR_PAGINA;

  const farmaceuticosVisibles =
    farmaceuticosFiltrados.slice(
      inicio,
      inicio + REGISTROS_POR_PAGINA
    );

  return (
    <section className="min-w-0 rounded-[20px] border border-[#E3EBF5] bg-white p-4 shadow-[0_4px_16px_rgba(15,42,117,0.04)] sm:p-5">

      {/* ENCABEZADO */}

      <div className="flex flex-wrap items-center justify-between gap-3">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FF] text-[#0755D8]">
            <UsersRound size={22} aria-hidden="true" />
          </div>

          <div>
            <h2 className="text-base font-bold text-[#14285B]">
              Gestión de empleados
            </h2>

            <p className="mt-0.5 text-xs text-[#64748B]">
              Administra los farmacéuticos de la EPS
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={onCrear}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0755D8] px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0647B8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]"
        >
          <UserPlus size={17} aria-hidden="true" />

          Nuevo farmacéutico
        </button>

      </div>

      {/* BUSCADOR */}

      <div className="relative mt-4">

        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
        />

        <input
          type="search"
          value={busqueda}
          aria-label="Buscar farmacéuticos"
          onChange={(event) => {
            setBusqueda(event.target.value);
            setPagina(1);
          }}
          placeholder="Buscar farmacéutico o sede..."
          className="w-full rounded-xl border border-[#E3EBF5] bg-[#F8FAFD] py-2.5 pl-10 pr-3 text-sm text-[#14285B] outline-none transition-colors placeholder:text-[#64748B] focus:border-[#0755D8] focus:ring-2 focus:ring-[#0755D8]/10"
        />

      </div>

      {/* TABLA */}

      <div className="mt-4 overflow-x-auto">

        <table className="w-full min-w-[500px] text-left">

          <thead>

            <tr className="border-b border-[#E3EBF5] bg-[#F5F9FF] text-xs font-semibold text-[#526582]">

              <th scope="col" className="rounded-tl-lg px-3 py-3">
                Nombre
              </th>

              <th scope="col" className="px-3 py-3">
                Sede
              </th>

              <th scope="col" className="px-3 py-3">
                Estado
              </th>

              <th scope="col" className="rounded-tr-lg px-3 py-3 text-center">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-[#EDF2F8]">

            {farmaceuticosVisibles.map((farmaceutico) => {
              const activo =
                farmaceutico.estado === "ACTIVO";

              const nombreCompleto =
                `${farmaceutico.nombres} ${farmaceutico.apellidos}`;

              return (
                <tr
                  key={farmaceutico.id}
                  className="transition-colors hover:bg-[#F8FAFD]"
                >

                  {/* NOMBRE Y CORREO */}

                  <td className="px-3 py-3">

                    <div className="flex items-center gap-2.5">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-xs font-bold text-[#0755D8]">

                        {farmaceutico.nombres.charAt(0)}
                        {farmaceutico.apellidos.charAt(0)}

                      </div>

                      <div className="min-w-0">

                        <p className="whitespace-nowrap text-xs font-bold text-[#14285B]">
                          {nombreCompleto}
                        </p>

                        <p
                          title={farmaceutico.correo}
                          className="mt-0.5 max-w-[150px] truncate text-[11px] text-[#64748B]"
                        >
                          {farmaceutico.correo}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* SEDE ASIGNADA */}

                  <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-[#526582]">
                    {obtenerSede(farmaceutico.sedeId)}
                  </td>

                  {/* ESTADO */}

                  <td className="px-3 py-3">

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        activo
                          ? "bg-[#E7F8F0] text-[#047857]"
                          : "bg-[#F1F5F9] text-[#475569]"
                      }`}
                    >

                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${
                          activo
                            ? "bg-[#059669]"
                            : "bg-[#94A3B8]"
                        }`}
                      />

                      {activo ? "Activo" : "Inactivo"}

                    </span>

                  </td>

                  {/* ACCIONES */}

                  <td className="px-3 py-3">

                    <div className="flex items-center justify-center gap-1.5">

                      {/* EDITAR */}

                      <button
                        type="button"
                        onClick={() => onEditar(farmaceutico)}
                        title="Editar farmacéutico"
                        aria-label={`Editar a ${nombreCompleto}`}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-[#E8F1FF] text-[#0755D8] transition-colors hover:bg-[#D6E6FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]"
                      >
                        <Pencil size={15} aria-hidden="true" />
                      </button>

                      {/* ACTIVAR O DESACTIVAR */}

                      <button
                        type="button"
                        onClick={() =>
                          onCambiarEstado(farmaceutico)
                        }
                        title={
                          activo
                            ? "Desactivar cuenta"
                            : "Activar cuenta"
                        }
                        aria-label={`${
                          activo ? "Desactivar" : "Activar"
                        } cuenta de ${nombreCompleto}`}
                        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                          activo
                            ? "bg-[#FEECEC] text-[#DC2626] hover:bg-[#FCDADA]"
                            : "bg-[#E7F8F0] text-[#047857] hover:bg-[#D1FAE5]"
                        }`}
                      >

                        {activo ? (
                          <UserX size={16} aria-hidden="true" />
                        ) : (
                          <UserCheck size={16} aria-hidden="true" />
                        )}

                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

            {/* SIN RESULTADOS */}

            {farmaceuticosVisibles.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center"
                >

                  <UsersRound
                    size={32}
                    aria-hidden="true"
                    className="mx-auto text-[#94A3B8]"
                  />

                  <p className="mt-3 text-sm font-semibold text-[#14285B]">
                    No se encontraron farmacéuticos
                  </p>

                  <p className="mt-1 text-xs text-[#64748B]">
                    Prueba con otro nombre, documento o sede.
                  </p>

                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* PAGINACIÓN */}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E3EBF5] pt-3">

        <p className="text-xs text-[#64748B]">

          Mostrando{" "}

          {farmaceuticosFiltrados.length === 0
            ? 0
            : inicio + 1}

          {" - "}

          {Math.min(
            inicio + REGISTROS_POR_PAGINA,
            farmaceuticosFiltrados.length
          )}

          {" de "}

          {farmaceuticosFiltrados.length} registros

        </p>

        <div className="flex items-center gap-2">

          <button
            type="button"
            aria-label="Página anterior"
            disabled={paginaActual === 1}
            onClick={() => setPagina(paginaActual - 1)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#E3EBF5] text-[#526582] hover:bg-[#E8F1FF] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={17} aria-hidden="true" />
          </button>

          <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#0755D8] px-2 text-xs font-semibold text-white">
            {paginaActual}
          </span>

          <button
            type="button"
            aria-label="Página siguiente"
            disabled={paginaActual >= totalPaginas}
            onClick={() => setPagina(paginaActual + 1)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#E3EBF5] text-[#526582] hover:bg-[#E8F1FF] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={17} aria-hidden="true" />
          </button>

        </div>

      </div>

    </section>
  );
}