"use client";

import { Suspense, useMemo, useState,useEffect } from "react";
import { useSearchParams } from "next/navigation";

import {
  AlertCircle,
  ArrowLeft,
  BookmarkPlus,
  ClipboardList,
  PackageSearch,
  Pill,
  RefreshCw,
  Search,
  Store,
} from "lucide-react";

import { useMedicamentos } from "../hooks/useMedicamentos";
import type {
  FiltrosCatalogo,
  Medicamento,
  SedeFarmacia,
} from "../types";
import { getCatalogoErrorMessage } from "../utils/get-catalogo-error-message";

import MedicamentoCard from "./MedicamentoCard";
import MedicamentoSearch from "./MedicamentoSearch";
import MedicamentoFilters from "./MedicamentoFilters";
import SedesAlternativas from "./SedesAlternativas";
import AlertaReabastecimiento from "./AlertaReabastecimiento";

import BannerWaves from "@/components/layout/BannerWaves";
import CrearReservaModal from "./CrearReservaModal";

// ========================================
// CONTENIDO DEL CATÁLOGO
// ========================================

function CatalogoContent() {
  const searchParams = useSearchParams();

  const mostrarGuardados =
    searchParams.get("vista") === "guardados";

  const [busqueda, setBusqueda] = useState("");

  const [filtros, setFiltros] = useState<FiltrosCatalogo>({
    sedeId: "",
    ubicacion: "",
    cercania: "cercanas",
  });

  const [medicamentoSeleccionado, setMedicamentoSeleccionado] =
    useState<Medicamento | null>(null);

  const [sedeDetalle, setSedeDetalle] =
    useState<SedeFarmacia | null>(null);

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setCoords(null);
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 300000,
      },
    );
  }, []);

  const [reservaModal, setReservaModal] = useState<{
    medicamento: Medicamento;
    sede: SedeFarmacia;
  } | null>(null);

  // Separar ubicación ("Ciudad - Zona") para enviar ciudad/zona al backend
  // cuando el usuario seleccione una ubicación específica.
  const [ciudadFiltro, zonaFiltro] = useMemo(() => {
    if (!filtros.ubicacion) return [undefined, undefined];
    const [ciudad, ...zonaParts] = filtros.ubicacion.split(" - ");
    return [
      ciudad?.trim() || undefined,
      zonaParts.join(" - ").trim() || undefined,
    ];
  }, [filtros.ubicacion]);

  // Consulta base (sin filtro de sede/ubicación) para mantener siempre
  // disponibles todas las opciones en los selectores de Sede y Ciudad/Zona.
  const { data: catalogoBase } = useMedicamentos({
    search: busqueda.trim() || undefined,
    lat: coords?.lat,
    lng: coords?.lng,
  });

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useMedicamentos({
    search: busqueda.trim() || undefined,
    sedeId: filtros.sedeId || undefined,
    ciudad: ciudadFiltro,
    zona: zonaFiltro,
    lat: coords?.lat,
    lng: coords?.lng,
  });

  const todasLasSedes = catalogoBase?.sedes?.length
    ? catalogoBase.sedes
    : data?.sedes ?? [];

  const sedesCatalogo = data?.sedes ?? [];
  const medicamentosCatalogo = data?.medicamentos ?? [];

  // ========================================
  // FILTRAR Y ORDENAR SEDES
  // ========================================

  const sedesFiltradas = useMemo(() => {
    const resultado = sedesCatalogo.filter((sede) => {
      const coincideSede =
        !filtros.sedeId || sede.id === filtros.sedeId;

      const coincideUbicacion =
        !filtros.ubicacion ||
        `${sede.ciudad} - ${sede.zona}` === filtros.ubicacion;

      return coincideSede && coincideUbicacion;
    });

    return [...resultado].sort((a, b) => {
      const distA = a.distanciaKm ?? Number.POSITIVE_INFINITY;
      const distB = b.distanciaKm ?? Number.POSITIVE_INFINITY;

      if (distA !== distB) {
        return filtros.cercania === "lejanas"
          ? distB - distA
          : distA - distB;
      }

      return a.nombre.localeCompare(b.nombre, "es");
    });
  }, [sedesCatalogo, filtros]);

  // ========================================
  // BÚSQUEDA POR NOMBRE O CÓDIGO
  // ========================================

  const medicamentosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLocaleLowerCase("es");

    if (!texto) return medicamentosCatalogo;

    return medicamentosCatalogo.filter((medicamento) => {
      const nombre =
        medicamento.nombreGenerico.toLocaleLowerCase("es");

      const codigo =
        medicamento.codigo.toLocaleLowerCase("es");

      return nombre.includes(texto) || codigo.includes(texto);
    });
  }, [medicamentosCatalogo, busqueda]);

  // ========================================
  // RESULTADOS POR MEDICAMENTO Y SEDE
  // ========================================

  const resultados = useMemo(() => {
    return sedesFiltradas.flatMap((sede) =>
      medicamentosFiltrados.map((medicamento) => ({
        medicamento,
        sede,
      }))
    );
  }, [medicamentosFiltrados, sedesFiltradas]);
  
  const abrirDetalle = (
    medicamento: Medicamento,
    sede: SedeFarmacia
  ) => {
    setMedicamentoSeleccionado(medicamento);
    setSedeDetalle(sede);
  };

  const cerrarDetalle = () => {
    setMedicamentoSeleccionado(null);
    setSedeDetalle(null);
  };

  const abrirReserva = (
    medicamento: Medicamento,
    sede: SedeFarmacia
  ) => {
    setReservaModal({ medicamento, sede });
  };

  const cerrarReserva = () => {
    setReservaModal(null);
  };

  const medicamentoActualDetalle = useMemo(() => {
    if (!medicamentoSeleccionado) return null;
    return (
      medicamentosCatalogo.find(
        (item) => item.id === medicamentoSeleccionado.id
      ) ?? medicamentoSeleccionado
    );
  }, [medicamentosCatalogo, medicamentoSeleccionado]);

  const cantidadDetalle =
    medicamentoActualDetalle?.stockPorSede.find(
      (item) => item.sedeId === sedeDetalle?.id
    )?.cantidad ?? 0;

  // Considera agotado en todas las sedes si no hay unidades en las sedes
  // disponibles en el catálogo (o si el backend marca puedeActivarAlerta).
  const agotadoEnTodas =
    medicamentoActualDetalle !== null &&
    (medicamentoActualDetalle.puedeActivarAlerta === true ||
      (medicamentoActualDetalle.stockPorSede.length > 0 &&
        medicamentoActualDetalle.stockPorSede.every(
          (item) => item.cantidad === 0
        )));

  return (
    <div className="min-h-full bg-[#F5F9FF] p-4 md:p-6">
      <div className="mx-auto max-w-[1450px] space-y-5">

        {/* ========================================
            ENCABEZADO PRINCIPAL
        ======================================== */}

        <header
          className="
            relative isolate overflow-hidden
            rounded-[24px]
            bg-gradient-to-r
            from-[#0B1F5C]
            via-[#0755D8]
            to-[#0876E9]
            p-5 text-white md:p-7
          "
        >
          <BannerWaves />

          <div className="relative z-10 flex items-center gap-4">
            <div
              className="
                flex h-12 w-12 shrink-0 items-center
                justify-center rounded-[15px]
                bg-white/15
              "
            >
              <Pill size={25} />
            </div>

            <div>
              <p className="text-[11px] font-semibold text-blue-100">
                FarmaSync · Catálogo de medicamentos
              </p>

              <h1 className="mt-1 text-xl font-extrabold md:text-2xl">
                {mostrarGuardados
                  ? "Mis medicamentos"
                  : "Buscar medicamentos"}
              </h1>

              <p className="mt-1 text-[12px] text-blue-100">
                Consulta medicamentos y disponibilidad por sede.
              </p>
            </div>
          </div>
        </header>

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
              sedes={todasLasSedes}
              filtros={filtros}
              onChange={(nuevosFiltros) => {
                setFiltros(nuevosFiltros);
                cerrarDetalle();
              }}
            />

            {/* ========================================
                DETALLE DEL MEDICAMENTO
            ======================================== */}

            {medicamentoActualDetalle && sedeDetalle ? (
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
                        {medicamentoActualDetalle.nombreGenerico}{" "}
                        {medicamentoActualDetalle.concentracion}
                      </h2>

                      <p className="mt-1 text-[12px] text-[#71829B]">
                        {medicamentoActualDetalle.codigo} ·{" "}
                        {medicamentoActualDetalle.presentacion}
                      </p>

                      <p className="mt-2 text-[12px] text-[#62748E]">
                        {medicamentoActualDetalle.descripcion}
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
                          Quedan pocas unidades en esta sede. ¡Reserva pronto!
                        </p>
                      )}

                    {/* MEDICAMENTO AGOTADO */}

                    {cantidadDetalle === 0 && (
                      <p className="mt-2 text-[12px] font-semibold text-[#D13438]">
                        Medicamento agotado en esta sede.
                      </p>
                    )}

                    {/* RESERVAR DESDE EL DETALLE */}

                    {cantidadDetalle > 0 && (
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() =>
                            abrirReserva(medicamentoActualDetalle, sedeDetalle)
                          }
                          className="
                            inline-flex items-center justify-center gap-2
                            rounded-[12px] bg-[#0755D8]
                            px-4 py-2.5
                            text-[12px] font-bold text-white
                            transition-colors
                            hover:bg-[#0647B6]
                          "
                        >
                          <BookmarkPlus size={16} />
                          Reservar medicamento
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* ========================================
                    SEDES ALTERNATIVAS
                ======================================== */}

                {cantidadDetalle === 0 && (
                  <SedesAlternativas
                    medicamento={medicamentoActualDetalle}
                    sedeActual={sedeDetalle}
                    sedes={todasLasSedes}
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
                    key={medicamentoActualDetalle.id}
                    medicamento={medicamentoActualDetalle}
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
                      {isLoading
                        ? "Consultando disponibilidad..."
                        : `${resultados.length} ${
                            resultados.length === 1
                              ? "resultado encontrado"
                              : "resultados encontrados"
                          }`}
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

                {isLoading ? (
                  <div
                    className="
                      grid grid-cols-1 gap-4
                      lg:grid-cols-2 2xl:grid-cols-3
                    "
                  >
                    {[0, 1, 2].map((skeleton) => (
                      <div
                        key={skeleton}
                        className="h-[250px] animate-pulse rounded-[20px] border border-[#DFE9F6] bg-white p-4"
                      />
                    ))}
                  </div>
                ) : isError ? (
                  <div
                    className="
                      rounded-[20px] border border-[#F5D2D2]
                      bg-[#FFF8F8] px-5 py-10 text-center
                    "
                  >
                    <AlertCircle
                      size={34}
                      className="mx-auto text-[#D92D20]"
                    />

                    <h3 className="mt-3 text-[15px] font-bold text-[#14285B]">
                      No pudimos cargar el catálogo de medicamentos
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-[12px] text-[#62748E]">
                      {getCatalogoErrorMessage(error)}
                    </p>

                    <button
                      type="button"
                      onClick={() => refetch()}
                      className="
                        mt-4 inline-flex items-center gap-2
                        rounded-[12px] bg-[#0755D8]
                        px-4 py-2.5
                        text-[12px] font-bold text-white
                        hover:bg-[#0647B6]
                      "
                    >
                      <RefreshCw size={15} />
                      Reintentar
                    </button>
                  </div>
                ) : resultados.length > 0 ? (
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
                        onReservar={(med, sedeItem) =>
                          abrirReserva(med, sedeItem)
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
                      Prueba con otro nombre, código o combinación de filtros.
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
          </>
        )}
      </div>

      {/* ========================================
          MODAL CREAR RESERVA
      ======================================== */}

      {reservaModal && (
        <CrearReservaModal
          isOpen={Boolean(reservaModal)}
          medicamento={reservaModal.medicamento}
          sedeInicial={reservaModal.sede}
          sedes={todasLasSedes}
          onCerrar={cerrarReserva}
        />
      )}
    </div>
  );
}

// ========================================
// PÁGINA PRINCIPAL
// ========================================

export default function CatalogoView() {
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
      <CatalogoContent />
    </Suspense>
  );
}