"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  ArrowLeft,
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

import MisMedicamentosContent from "@/features/mis-medicamentos/components/MisMedicamentosContent";

import BannerWaves from "@/components/layout/BannerWaves";

// ========================================
// PROPIEDADES DEL CATÁLOGO
// ========================================

interface CatalogoContentProps {
  busquedaInicial: string;
  sedeInicial: string;
}

// ========================================
// CONTENIDO DEL CATÁLOGO
// ========================================

function CatalogoContent({
  busquedaInicial,
  sedeInicial,
}: CatalogoContentProps) {

  const [busqueda, setBusqueda] =
    useState(busquedaInicial);

  const [filtros, setFiltros] =
    useState<FiltrosMedicamentos>({
      sedeId: sedeInicial,
      ubicacion: "",
      cercania: "cercanas",
    });

  const [
    medicamentoSeleccionado,
    setMedicamentoSeleccionado,
  ] = useState<Medicamento | null>(null);

  const [sedeDetalle, setSedeDetalle] =
    useState<SedeFarmacia | null>(null);

  // ========================================
  // FILTRAR Y ORDENAR SEDES
  // ========================================

  const sedesFiltradas = useMemo(() => {

    const resultado = sedesFarmacias.filter((sede) => {

      const coincideSede =
        !filtros.sedeId ||
        sede.id === filtros.sedeId;

      const coincideUbicacion =
        !filtros.ubicacion ||
        `${sede.ciudad} - ${sede.zona}` ===
          filtros.ubicacion;

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

    const texto = busqueda
      .trim()
      .toLocaleLowerCase("es");

    if (!texto) return medicamentosMock;

    return medicamentosMock.filter((medicamento) => {

      const nombre =
        medicamento.nombreGenerico.toLocaleLowerCase("es");

      const codigo =
        medicamento.codigo.toLocaleLowerCase("es");

      return (
        nombre.includes(texto) ||
        codigo.includes(texto)
      );
    });

  }, [busqueda]);

  // ========================================
  // RESULTADOS POR MEDICAMENTO Y SEDE
  // ========================================

  const resultados = useMemo(() => {

    return medicamentosFiltrados.flatMap(
      (medicamento) =>
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
          (stock) =>
            stock.sedeId === sedeDetalle.id
        )?.cantidad ?? 0
      : 0;

  const agotadoEnTodas =
    medicamentoSeleccionado !== null &&
    medicamentoSeleccionado.stockPorSede.every(
      (stock) => stock.cantidad === 0
    );

  // ========================================
  // LIMPIAR BÚSQUEDA Y FILTROS
  // ========================================

  function limpiarFiltros() {
    setBusqueda("");

    setFiltros({
      sedeId: "",
      ubicacion: "",
      cercania: "cercanas",
    });

    cerrarDetalle();
  }

  // ========================================
  // INTERFAZ
  // ========================================

  return (
    <div className="min-h-full min-w-0 bg-[#F5F9FF] p-3">
      <div className="mx-auto w-full space-y-3">

        {/* ========================================
            ENCABEZADO
        ======================================== */}

        <section
          className="
            relative isolate flex min-h-[150px]
            shrink-0 items-center overflow-hidden
            rounded-[24px]
            bg-gradient-to-r from-[#0B1F5C]
            via-[#0755D8] to-[#0876E9]
            px-5 py-4 text-white
            shadow-[0_10px_25px_rgba(5,91,210,0.18)]
            sm:px-8 lg:min-h-[186px]
          "
        >
          <BannerWaves />

          <div className="relative z-10 w-full">

            {/* ETIQUETA */}

            <div
              className="
                mb-3 inline-flex items-center gap-2
                rounded-full border border-white/20
                bg-white/10 px-3 py-1.5
              "
            >
              <Pill size={15} />

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
              Buscar medicamentos
            </h1>

            {/* DESCRIPCIÓN */}

            <p
              className="
                mt-2 max-w-xl text-[13px]
                leading-relaxed text-[#E1EDFF]
                sm:text-sm
              "
            >
              Consulta medicamentos y disponibilidad por sede.
            </p>

          </div>
        </section>

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

            {/* VOLVER A LOS RESULTADOS */}

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

            {/* INFORMACIÓN DEL MEDICAMENTO */}

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

                <div className="min-w-0">

                  <h2 className="text-[18px] font-extrabold text-[#14285B]">
                    {medicamentoSeleccionado.nombreGenerico}{" "}
                    {medicamentoSeleccionado.concentracion}
                  </h2>

                  <p className="mt-1 text-[12px] text-[#71829B]">
                    {medicamentoSeleccionado.codigo} ·{" "}
                    {medicamentoSeleccionado.presentacion}
                  </p>

                </div>
              </div>

              <p className="mt-4 text-[13px] leading-relaxed text-[#62748E]">
                {medicamentoSeleccionado.descripcion}
              </p>

              {/* INFORMACIÓN DE LA SEDE */}

              <div
                className="
                  mt-4 rounded-[16px]
                  border border-[#DFE9F6]
                  bg-[#F7FAFF] p-4
                "
              >
                <div className="flex items-start gap-3">

                  <div
                    className="
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-[12px]
                      bg-[#EAF3FF] text-[#0755D8]
                    "
                  >
                    <Store size={20} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <h3 className="text-[14px] font-bold text-[#14285B]">
                      {sedeDetalle.nombre}
                    </h3>

                    <p className="mt-1 text-[12px] text-[#71829B]">
                      {sedeDetalle.ciudad} · {sedeDetalle.zona}
                    </p>

                    <p className="mt-1 text-[12px] text-[#71829B]">
                      {sedeDetalle.direccion}
                    </p>

                  </div>
                </div>

                {/* STOCK DISPONIBLE */}

                <div
                  className="
                    mt-4 flex items-center justify-between
                    gap-3 border-t border-[#DFE9F6] pt-3
                  "
                >
                  <span className="text-[12px] font-medium text-[#62748E]">
                    Stock disponible
                  </span>

                  <span
                    className={`
                      text-[15px] font-extrabold
                      ${
                        cantidadDetalle > 15
                          ? "text-[#059669]"
                          : cantidadDetalle > 0
                            ? "text-[#D97706]"
                            : "text-[#DC2626]"
                      }
                    `}
                  >
                    {cantidadDetalle}{" "}
                    {cantidadDetalle === 1
                      ? "unidad"
                      : "unidades"}
                  </span>
                </div>

              </div>

              {/* DISPONIBILIDAD LIMITADA */}

              {cantidadDetalle > 0 &&
                cantidadDetalle <= 15 && (

                  <div
                    className="
                      mt-4 rounded-[12px]
                      border border-[#FCE7B5]
                      bg-[#FFF4DE] p-3
                    "
                  >
                    <p className="text-[12px] font-semibold text-[#A96508]">
                      Quedan pocas unidades en esta sede.
                      ¡Reserva pronto!
                    </p>
                  </div>

                )}

              {/* MEDICAMENTO AGOTADO */}

              {cantidadDetalle === 0 && (

                <div
                  className="
                    mt-4 rounded-[12px]
                    border border-[#FADADA]
                    bg-[#FEECEC] p-3
                  "
                >
                  <p className="text-[12px] font-semibold text-[#B91C1C]">
                    Actualmente no hay unidades disponibles
                    en esta sede.
                  </p>
                </div>

              )}

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
                  Resultados de búsqueda
                </h2>

                <p className="mt-1 text-[12px] text-[#71829B]">
                  {resultados.length}{" "}
                  {resultados.length === 1
                    ? "resultado encontrado"
                    : "resultados encontrados"}
                </p>
              </div>

              <div
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

                {sedesFiltradas.length}{" "}
                {sedesFiltradas.length === 1
                  ? "sede"
                  : "sedes"}
              </div>

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
                {resultados.map(
                  ({ medicamento, sede }) => (

                    <MedicamentoCard
                      key={`${medicamento.id}-${sede.id}`}
                      medicamento={medicamento}
                      sede={sede}
                      onVerDisponibilidad={() =>
                        abrirDetalle(medicamento, sede)
                      }
                    />

                  )
                )}
              </div>

            ) : (

              /* ========================================
                 ESTADO VACÍO
              ======================================== */

              <section
                className="
                  flex min-h-[280px] flex-col
                  items-center justify-center
                  rounded-[20px]
                  border border-[#DFE9F6]
                  bg-white p-8 text-center
                "
              >
                <div
                  className="
                    flex h-16 w-16 items-center
                    justify-center rounded-[20px]
                    bg-[#EAF3FF] text-[#0755D8]
                  "
                >
                  <PackageSearch size={30} />
                </div>

                <h3 className="mt-4 text-[16px] font-extrabold text-[#14285B]">
                  No encontramos medicamentos
                </h3>

                <p className="mt-2 max-w-md text-[12px] leading-relaxed text-[#71829B]">
                  No hay resultados que coincidan con tu
                  búsqueda o los filtros seleccionados.
                  Intenta con otro nombre, código o sede.
                </p>

                <button
                  type="button"
                  onClick={limpiarFiltros}
                  className="
                    mt-5 inline-flex items-center
                    justify-center gap-2
                    rounded-[12px]
                    bg-[#0755D8] px-5 py-3
                    text-[12px] font-bold text-white
                    transition-colors hover:bg-[#0647B6]
                  "
                >
                  <Search size={16} />

                  Limpiar búsqueda y filtros
                </button>

              </section>

            )}

          </>

        )}

        {/* ========================================
            INFORMACIÓN SOBRE LOS DATOS
        ======================================== */}

        <div
          className="
            rounded-[14px]
            border border-[#DCE8F7]
            bg-[#EAF3FF] p-3
          "
        >
          <p className="text-[11px] leading-relaxed text-[#62748E]">
            La disponibilidad de medicamentos puede variar
            según la sede seleccionada. Actualmente los
            datos de inventario corresponden a una
            simulación del sistema.
          </p>
        </div>

      </div>
    </div>
  );
}

// ========================================
// CONTROL DE VISTAS
// ========================================

function MedicinesContent() {

  const searchParams = useSearchParams();

  const mostrarGuardados =
    searchParams.get("vista") === "guardados";

  const busquedaInicial =
    searchParams.get("busqueda") ?? "";

  const sedeId =
    searchParams.get("sedeId") ?? "";

  // VALIDAR QUE LA SEDE EXISTA

  const sedeInicial = sedesFarmacias.some(
    (sede) => sede.id === sedeId
  )
    ? sedeId
    : "";

  // ========================================
  // VISTA DE MIS MEDICAMENTOS
  // ========================================

  if (mostrarGuardados) {

    return (
      <MisMedicamentosContent
        medicamentos={medicamentosMock}
        sedes={sedesFarmacias}
      />
    );

  }

  // ========================================
  // VISTA DEL CATÁLOGO
  // ========================================

  return (
    <CatalogoContent
      key={JSON.stringify([
        busquedaInicial,
        sedeInicial,
      ])}
      busquedaInicial={busquedaInicial}
      sedeInicial={sedeInicial}
    />
  );
}

// ========================================
// PÁGINA PRINCIPAL
// ========================================

export default function MedicinesPage() {

  return (
    <Suspense
      fallback={
        <div
          className="
            flex min-h-[400px] items-center
            justify-center bg-[#F5F9FF]
          "
        >
          <div className="flex flex-col items-center gap-3">

            <div
              className="
                h-9 w-9 animate-spin
                rounded-full border-4
                border-[#DCE8F7]
                border-t-[#0755D8]
              "
            />

            <p className="text-[12px] font-medium text-[#62748E]">
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