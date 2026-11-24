"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  ArrowLeft,
  ClipboardList,
  PackageSearch,
  Pill,
  Search,
  Store,
} from "lucide-react";

import {
  medicamentosMock,
  sedesFarmacias,
} from "@/features/catalogo/data/medicamentosMock";

import type {
  Medicamento,
  SedeFarmacia,
} from "@/features/catalogo/types";

import MedicamentoCard from "@/features/catalogo/components/MedicamentoCard";
import MedicamentoSearch from "@/features/catalogo/components/MedicamentoSearch";
import MedicamentoFilters from "@/features/catalogo/components/MedicamentoFilters";
import type { FiltrosMedicamentos } from "@/features/catalogo/components/MedicamentoFilters";
import SedesAlternativas from "@/features/catalogo/components/SedesAlternativas";
import AlertaReabastecimiento from "@/features/catalogo/components/AlertaReabastecimiento";

import BannerWaves from "@/components/layout/BannerWaves";

// ========================================
// CONTENIDO DEL CATÁLOGO
// ========================================

function MedicinesContent() {
  const searchParams = useSearchParams();

  const mostrarGuardados =
    searchParams.get("vista") === "guardados";

  const [busqueda, setBusqueda] = useState("");

  const [filtros, setFiltros] = useState<FiltrosMedicamentos>({
    sedeId: "",
    ubicacion: "",
    cercania: "cercanas",
  });

  const [medicamentoSeleccionado, setMedicamentoSeleccionado] =
    useState<Medicamento | null>(null);

  const [sedeDetalle, setSedeDetalle] =
    useState<SedeFarmacia | null>(null);

  // ========================================
  // FILTRAR Y ORDENAR SEDES
  // ========================================

  const sedesFiltradas = useMemo(() => {
    const resultado = sedesFarmacias.filter((sede) => {
      const coincideSede =
        !filtros.sedeId || sede.id === filtros.sedeId;

      const coincideUbicacion =
        !filtros.ubicacion ||
        `${sede.ciudad} - ${sede.zona}` === filtros.ubicacion;

      return coincideSede && coincideUbicacion;
    });

    return resultado.sort((a, b) =>
      filtros.cercania === "lejanas"
        ? b.distanciaKm - a.distanciaKm
        : a.distanciaKm - b.distanciaKm
    );
  }, [filtros]);

  // ========================================
  // BÚSQUEDA POR NOMBRE O CÓDIGO
  // ========================================

  const medicamentosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLocaleLowerCase("es");

    if (!texto) return medicamentosMock;

    return medicamentosMock.filter((medicamento) => {
      const nombre =
        medicamento.nombreGenerico.toLocaleLowerCase("es");

      const codigo =
        medicamento.codigo.toLocaleLowerCase("es");

      return nombre.includes(texto) || codigo.includes(texto);
    });
  }, [busqueda]);

  // ========================================
  // RESULTADOS DEL CATÁLOGO
  // ========================================

  const resultados = useMemo(() => {
    return medicamentosFiltrados.flatMap((medicamento) =>
      sedesFiltradas.map((sede) => ({
        medicamento,
        sede,
      }))
    );
  }, [medicamentosFiltrados, sedesFiltradas]);

  // ========================================
  // DETALLE DEL MEDICAMENTO
  // ========================================

  function abrirDetalle(
    medicamento: Medicamento,
    sede: SedeFarmacia
  ) {
    setMedicamentoSeleccionado(medicamento);
    setSedeDetalle(sede);
  }

  function cerrarDetalle() {
    setMedicamentoSeleccionado(null);
    setSedeDetalle(null);
  }

  const cantidadDetalle =
    medicamentoSeleccionado && sedeDetalle
      ? medicamentoSeleccionado.stockPorSede.find(
          (stock) => stock.sedeId === sedeDetalle.id
        )?.cantidad ?? 0
      : 0;

  const agotadoEnTodas =
    medicamentoSeleccionado !== null &&
    medicamentoSeleccionado.stockPorSede.every(
      (stock) => stock.cantidad === 0
    );

  return (
    <div className="min-h-full min-w-0 bg-[#F5F9FF] p-3">
      <div className="mx-auto w-full space-y-3">

        {/* ========================================
            ENCABEZADO PRINCIPAL
        ======================================== */}

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
          <BannerWaves />

          <div className="relative z-10 w-full">

            {/* ETIQUETA SUPERIOR */}

            <div
              className="
                mb-3 inline-flex items-center gap-2
                rounded-full border border-white/20
                bg-white/10 px-3 py-1.5
              "
            >
              <Pill size={15} aria-hidden="true" />

              <span className="text-xs font-semibold">
                Catálogo de medicamentos
              </span>
            </div>

            {/* TÍTULO */}

            <h1
              className="
                text-[26px] font-extrabold
                tracking-tight sm:text-[30px]
              "
            >
              {mostrarGuardados
                ? "Mis medicamentos"
                : "Buscar medicamentos"}
            </h1>

            {/* DESCRIPCIÓN */}

            <p
              className="
                mt-2 max-w-xl text-[13px]
                leading-relaxed text-[#E1EDFF]
                sm:text-sm
              "
            >
              {mostrarGuardados
                ? "Consulta y organiza tus medicamentos favoritos."
                : "Consulta medicamentos y disponibilidad por sede."}
            </p>
          </div>
        </section>

        {/* ========================================
            VISTA DE MIS MEDICAMENTOS
        ======================================== */}

        {mostrarGuardados ? (
          <section
            className="
              rounded-[20px] border border-[#DFE9F6]
              bg-white p-8 text-center
            "
          >
            <ClipboardList
              size={34}
              className="mx-auto text-[#0755D8]"
            />

            <h2 className="mt-3 text-[16px] font-bold text-[#14285B]">
              Mis medicamentos
            </h2>

            <p className="mx-auto mt-2 max-w-md text-[12px] text-[#71829B]">
              Aquí aparecerán tus medicamentos guardados cuando
              implementemos esa funcionalidad.
            </p>
          </section>
        ) : (
          <>
            {/* ========================================
                BUSCADOR
            ======================================== */}

            <section
              className="
                rounded-[20px] border border-[#DFE9F6]
                bg-white p-4
              "
            >
              <MedicamentoSearch
                value={busqueda}
                onChange={(valor) => {
                  setBusqueda(valor);
                  cerrarDetalle();
                }}
              />
            </section>

            {/* ========================================
                FILTROS
            ======================================== */}

            <MedicamentoFilters
              sedes={sedesFarmacias}
              filtros={filtros}
              onChange={(nuevosFiltros) => {
                setFiltros(nuevosFiltros);
                cerrarDetalle();
              }}
            />

            {/* ========================================
                DETALLE DEL MEDICAMENTO
            ======================================== */}

            {medicamentoSeleccionado && sedeDetalle ? (
              <section className="space-y-4">
                <button
                  type="button"
                  onClick={cerrarDetalle}
                  className="
                    inline-flex items-center gap-2
                    text-[12px] font-bold text-[#0755D8]
                    hover:text-[#043C9E]
                  "
                >
                  <ArrowLeft size={16} />

                  Volver a los resultados
                </button>

                <div
                  className="
                    rounded-[20px] border border-[#DFE9F6]
                    bg-white p-5
                  "
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="
                        flex h-12 w-12 shrink-0 items-center
                        justify-center rounded-[14px]
                        bg-[#EAF3FF] text-[#0755D8]
                      "
                    >
                      <Pill size={24} />
                    </div>

                    <div>
                      <h2 className="text-lg font-extrabold text-[#14285B]">
                        {medicamentoSeleccionado.nombreGenerico}{" "}
                        {medicamentoSeleccionado.concentracion}
                      </h2>

                      <p className="mt-1 text-[12px] text-[#71829B]">
                        {medicamentoSeleccionado.codigo} ·{" "}
                        {medicamentoSeleccionado.presentacion}
                      </p>

                      <p className="mt-2 text-[12px] text-[#62748E]">
                        {medicamentoSeleccionado.descripcion}
                      </p>
                    </div>
                  </div>

                  {/* INFORMACIÓN DE LA SEDE */}

                  <div
                    className="
                      mt-4 rounded-[14px]
                      border border-[#E4EDF9]
                      bg-[#F7FAFF] p-4
                    "
                  >
                    <div className="flex items-center gap-2">
                      <Store
                        size={17}
                        className="text-[#0755D8]"
                      />

                      <span className="text-[13px] font-bold text-[#14285B]">
                        {sedeDetalle.nombre}
                      </span>
                    </div>

                    <p className="mt-2 text-[12px] text-[#62748E]">
                      {sedeDetalle.ciudad} · {sedeDetalle.zona}
                    </p>

                    <p className="mt-2 text-[12px] font-bold text-[#14285B]">
                      Stock: {cantidadDetalle}{" "}
                      {cantidadDetalle === 1
                        ? "unidad"
                        : "unidades"}
                    </p>

                    {/* DISPONIBILIDAD LIMITADA */}

                    {cantidadDetalle > 0 &&
                      cantidadDetalle <= 15 && (
                        <p className="mt-2 text-[12px] font-semibold text-[#A96508]">
                          Quedan pocas unidades en esta sede.
                          ¡Reserva pronto!
                        </p>
                      )}

                    {/* MEDICAMENTO AGOTADO */}

                    {cantidadDetalle === 0 && (
                      <p className="mt-2 text-[12px] font-semibold text-[#D13438]">
                        Medicamento agotado en esta sede.
                      </p>
                    )}
                  </div>
                </div>

                {/* ========================================
                    SEDES ALTERNATIVAS
                ======================================== */}

                {cantidadDetalle === 0 && (
                  <SedesAlternativas
                    medicamento={medicamentoSeleccionado}
                    sedeActual={sedeDetalle}
                    sedes={sedesFarmacias}
                    onSeleccionarSede={(sede) =>
                      setSedeDetalle(sede)
                    }
                  />
                )}

                {/* ========================================
                    ALERTA DE REABASTECIMIENTO
                ======================================== */}

                {agotadoEnTodas && (
                  <AlertaReabastecimiento
                    key={medicamentoSeleccionado.id}
                    medicamento={medicamentoSeleccionado}
                  />
                )}
              </section>
            ) : (
              <>
                {/* ========================================
                    RESUMEN DE RESULTADOS
                ======================================== */}

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-[16px] font-extrabold text-[#14285B]">
                      Medicamentos disponibles para consulta
                    </h2>

                    <p className="mt-1 text-[12px] text-[#71829B]">
                      {resultados.length}{" "}
                      {resultados.length === 1
                        ? "resultado encontrado"
                        : "resultados encontrados"}
                    </p>
                  </div>

                  <span
                    className="
                      inline-flex items-center gap-2
                      rounded-full border border-[#DCE8F7]
                      bg-white px-3 py-2
                      text-[11px] font-semibold text-[#62748E]
                    "
                  >
                    <Store
                      size={14}
                      className="text-[#0755D8]"
                    />

                    {sedesFiltradas.length} sedes
                  </span>
                </div>

                {/* ========================================
                    TARJETAS DE MEDICAMENTOS
                ======================================== */}

                {resultados.length > 0 ? (
                  <div
                    className="
                      grid grid-cols-1 gap-4
                      lg:grid-cols-2 2xl:grid-cols-3
                    "
                  >
                    {resultados.map(({ medicamento, sede }) => (
                      <MedicamentoCard
                        key={`${medicamento.id}-${sede.id}`}
                        medicamento={medicamento}
                        sede={sede}
                        onVerDisponibilidad={() =>
                          abrirDetalle(medicamento, sede)
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    className="
                      rounded-[20px] border border-[#DFE9F6]
                      bg-white px-5 py-12 text-center
                    "
                  >
                    <PackageSearch
                      size={36}
                      className="mx-auto text-[#0876E9]"
                    />

                    <h3 className="mt-3 text-[15px] font-bold text-[#14285B]">
                      No encontramos resultados
                    </h3>

                    <p className="mt-2 text-[12px] text-[#71829B]">
                      Prueba con otro nombre, código o combinación
                      de filtros.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setBusqueda("");

                        setFiltros({
                          sedeId: "",
                          ubicacion: "",
                          cercania: "cercanas",
                        });
                      }}
                      className="
                        mt-4 inline-flex items-center gap-2
                        rounded-[12px] bg-[#0755D8]
                        px-4 py-2.5
                        text-[12px] font-bold text-white
                        hover:bg-[#0647B6]
                      "
                    >
                      <Search size={15} />

                      Mostrar todos
                    </button>
                  </div>
                )}
              </>
            )}

            {/* NOTA DE DATOS SIMULADOS */}

            <p className="pb-2 text-[11px] text-[#71829B]">
              Los medicamentos, existencias y distancias mostrados
              son datos de demostración. No representan inventario
              actualizado en tiempo real.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ========================================
// PÁGINA PRINCIPAL
// ========================================

export default function MedicinesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-full items-center justify-center bg-[#F5F9FF] p-6">
          <div className="flex flex-col items-center gap-3">
            <div
              className="
                h-9 w-9 animate-spin rounded-full
                border-4 border-[#DCE8F7]
                border-t-[#0755D8]
              "
            />

            <p className="text-sm font-semibold text-[#62748E]">
              Cargando medicamentos...
            </p>
          </div>
        </div>
      }
    >
      <MedicinesContent />
    </Suspense>
  );
}