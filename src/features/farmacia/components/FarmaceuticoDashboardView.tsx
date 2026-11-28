"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import {
  ArrowRight,
  Bell,
  Boxes,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock,
  Info,
  Package,
  Printer,
  QrCode,
  Search,
  Store,
  Tag,
  TriangleAlert,
  Users,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import BannerWaves from "@/components/layout/BannerWaves";
import FormularioLote from "@/app/(farmaceutico)/farmaceutico/FormularioLote";
import { useOperacionFarmacia } from "@/features/farmacia/hooks/useOperacionFarmacia";
import { farmaciaService } from "@/features/farmacia/services/farmacia.service";
import ModalTirillaPos from "@/features/farmacia/components/ModalTirillaPos";
import ModalRechazoReserva from "@/features/farmacia/components/ModalRechazoReserva";
import type {
  MetodoAlistamiento,
  NivelSla,
  ReservaOperacion,
} from "@/features/farmacia/types";

const titleFont = Inter({
  subsets: ["latin"],
  weight: ["700", "800"],
});

// Configuración visual de los tres niveles del semáforo SLA.
const CONFIG_SEMAFORO: Array<{
  nivel: NivelSla;
  rango: string;
  detalle: string;
  icono: LucideIcon;
  fondo: string;
  circulo: string;
}> = [
  {
    nivel: "Verde",
    rango: "< 1 hora",
    detalle: "Dentro del tiempo",
    icono: Check,
    fondo: "border-[#BFE6D1] bg-[#E4F6EC]",
    circulo: "bg-[#12A150] text-white",
  },
  {
    nivel: "Amarillo",
    rango: "1 – 2 horas",
    detalle: "Requiere atención",
    icono: Clock,
    fondo: "border-[#F6DDA6] bg-[#FFF3DC]",
    circulo: "bg-[#FFE2A3] text-[#B97700]",
  },
  {
    nivel: "Rojo",
    rango: "> 2 horas",
    detalle: "Alerta prioritaria",
    icono: TriangleAlert,
    fondo: "border-[#F5BDBD] bg-[#FDE8E8]",
    circulo: "bg-[#FAD0D0] text-[#C62828]",
  },
];

// Estilos de insignia y punto indicador según el nivel SLA.
const ESTILOS_SLA: Record<NivelSla, { pastilla: string; punto: string }> = {
  Rojo: {
    pastilla: "bg-[#FDE0E0] text-[#B42318]",
    punto: "bg-[#D92D20]",
  },
  Amarillo: {
    pastilla: "bg-[#FFF0C7] text-[#8A5A00]",
    punto: "bg-[#F5A524]",
  },
  Verde: {
    pastilla: "bg-[#DDF5E7] text-[#13693D]",
    punto: "bg-[#12A150]",
  },
};

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]";

// Extrae el mensaje de error enviado por la API si existe.
function extraerMensajeError(err: unknown, fallback: string): string {
  const msg = (err as { response?: { data?: { message?: string | string[] } } })
    ?.response?.data?.message;
  if (Array.isArray(msg)) return msg.join(", ");
  if (typeof msg === "string" && msg.trim().length > 0) return msg;
  return fallback;
}

// Resuelve el nombre del dependiente (si aplica) o del paciente titular.
function obtenerNombrePaciente(reserva: ReservaOperacion): string {
  if (reserva.dependiente) {
    return `${reserva.dependiente.nombres ?? ""} ${reserva.dependiente.apellidos ?? ""}`.trim();
  }
  return reserva.user.nombreCompleto ?? "Paciente";
}

// Tarjeta contenedora reutilizable para cada bloque del panel farmacéutico.
function Panel({
  id,
  icono: Icono,
  titulo,
  descripcion,
  accion,
  children,
  className = "",
}: {
  id?: string;
  icono: LucideIcon;
  titulo: string;
  descripcion?: string;
  accion?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`flex min-h-0 min-w-0 flex-col rounded-[22px] border border-[#DCE9F8] bg-white p-3 shadow-[0_6px_18px_rgba(37,91,160,0.06)] ${className}`}
    >
      <div className="flex shrink-0 items-start justify-between gap-2">
        <h2
          className={`${titleFont.className} flex min-w-0 items-center gap-2 text-[15px] font-extrabold leading-snug text-[#14285B] 2xl:text-[16px]`}
        >
          <Icono size={20} className="shrink-0 text-[#0755D8]" aria-hidden="true" />
          {titulo}
        </h2>
        {accion}
      </div>

      {descripcion && (
        <p className="mt-1 shrink-0 text-[12px] leading-[1.4] text-[#526783]">
          {descripcion}
        </p>
      )}

      {children}
    </section>
  );
}

// Banner superior con el contador permanente de reservas pendientes por alistar.
function Banner({ porAlistar }: { porAlistar: number }) {
  return (
    <section
      aria-labelledby="operacion-farmacia"
      className="relative isolate flex min-h-[150px] shrink-0 items-center overflow-hidden rounded-[24px] bg-gradient-to-r from-[#0B1F5C] via-[#0755D8] to-[#0876E9] px-5 py-4 text-white shadow-[0_10px_25px_rgba(5,91,210,0.18)] sm:px-8 lg:min-h-[186px]"
    >
      <BannerWaves />

      <div className="relative z-10 flex w-full flex-col gap-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
          <Store size={15} aria-hidden="true" />
          <span className="text-xs font-semibold">
            FarmaSync · Operación en farmacia
          </span>
        </div>

        <div className="min-w-0 lg:max-w-[60%]">
          <h1
            id="operacion-farmacia"
            className="text-[26px] font-extrabold tracking-tight sm:text-[30px]"
          >
            Operación en farmacia
          </h1>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-[#E1EDFF] sm:text-sm">
            Gestiona las reservas de tu sede, verifica las entregas y actualiza el
            inventario.
          </p>
        </div>

        {/* Badge permanente de solicitudes por alistar */}
        <Link
          href="#cola-alistamiento"
          className="relative z-20 inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-[#F4A8A8] bg-[#FFECEC] px-3 py-2 text-[12px] font-extrabold text-[#C62828] shadow-[0_5px_14px_rgba(120,0,0,0.12)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:absolute lg:right-0 lg:top-0"
        >
          <Bell size={17} aria-hidden="true" />
          {porAlistar} Reservas Por Alistar
        </Link>
      </div>
    </section>
  );
}

// Vista principal de operación en farmacia conectada al backend.
export default function FarmaceuticoDashboardView() {
  const {
    cola,
    isLoading,
    isError,
    refetch,
    alistarReserva,
    isAlistando,
    confirmarEntrega,
    isEntregando,
    rechazarReserva,
    isRechazando,
  } = useOperacionFarmacia();

  const [metodoSeleccionado, setMetodoSeleccionado] =
    useState<MetodoAlistamiento>("POS");
  const [tirillaActiva, setTirillaActiva] = useState<ReservaOperacion | null>(
    null,
  );

  const [codigoBusqueda, setCodigoBusqueda] = useState("");
  const [reservaVentanilla, setReservaVentanilla] =
    useState<ReservaOperacion | null>(null);
  const [buscandoVentanilla, setBuscandoVentanilla] = useState(false);
  const [codigoRechazo, setCodigoRechazo] = useState<string | null>(null);

  const [aviso, setAviso] = useState<{
    tipo: "exito" | "error";
    texto: string;
  } | null>(null);

  const pendientes = cola?.pendientesAlistamiento ?? [];
  const totalPorAlistar = cola?.totalPorAlistar ?? 0;

  // Refresca la cola de la sede devolviendo Promise<void>.
  const actualizarCola = async () => {
    await refetch();
  };

  // Marca una reserva como LISTA_PARA_RETIRO con POS o MANUAL.
  const manejarAlistar = async (
    codigoReserva: string,
    metodo: MetodoAlistamiento = metodoSeleccionado,
  ) => {
    setAviso(null);
    try {
      const actualizada = await alistarReserva({ codigoReserva, metodo });
      setAviso({
        tipo: "exito",
        texto: `Reserva ${actualizada.codigoReserva} marcada como lista para retiro (${metodo}).`,
      });
      if (metodo === "POS") {
        setTirillaActiva(actualizada);
      }
      if (reservaVentanilla?.codigoReserva === actualizada.codigoReserva) {
        setReservaVentanilla(actualizada);
      }
    } catch (err) {
      setAviso({
        tipo: "error",
        texto: extraerMensajeError(err, "No se pudo alistar la reserva."),
      });
    }
  };

  // Busca una reserva en ventanilla por código o lectura QR.
  const manejarBuscarVentanilla = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAviso(null);

    const limpio = codigoBusqueda.trim().toUpperCase();
    if (!limpio) {
      setAviso({
        tipo: "error",
        texto: "Ingresa o escanea un código de reserva (ej. FS-8K7L).",
      });
      return;
    }

    setBuscandoVentanilla(true);
    try {
      const encontrada = await farmaciaService.buscarReservaPorCodigo(limpio);
      setReservaVentanilla(encontrada);
    } catch (err) {
      setReservaVentanilla(null);
      setAviso({
        tipo: "error",
        texto: extraerMensajeError(
          err,
          `No se encontró la reserva con código ${limpio}.`,
        ),
      });
    } finally {
      setBuscandoVentanilla(false);
    }
  };

  // Confirma la entrega física tras validar la fórmula médica.
  const manejarConfirmarEntrega = async (codigoReserva: string) => {
    setAviso(null);
    try {
      const entregada = await confirmarEntrega(codigoReserva);
      setReservaVentanilla(entregada);
      setAviso({
        tipo: "exito",
        texto: `Entrega confirmada para la reserva ${entregada.codigoReserva}. Auditoría registrada.`,
      });
    } catch (err) {
      setAviso({
        tipo: "error",
        texto: extraerMensajeError(
          err,
          "No se pudo confirmar la entrega de la reserva.",
        ),
      });
    }
  };

  // Rechaza la reserva con motivo y devuelve la unidad al inventario.
  const manejarConfirmarRechazo = async (motivo: string) => {
    if (!codigoRechazo) return;
    setAviso(null);
    try {
      const rechazada = await rechazarReserva({
        codigoReserva: codigoRechazo,
        motivo,
      });
      setCodigoRechazo(null);
      if (reservaVentanilla?.codigoReserva === rechazada.codigoReserva) {
        setReservaVentanilla(rechazada);
      }
      setAviso({
        tipo: "exito",
        texto: `Reserva ${rechazada.codigoReserva} rechazada. El medicamento volvió al stock disponible.`,
      });
    } catch (err) {
      setAviso({
        tipo: "error",
        texto: extraerMensajeError(err, "No se pudo rechazar la reserva."),
      });
    }
  };

  return (
    <div className="flex min-h-dvh min-w-0 flex-col gap-3 bg-[#F5F9FF] p-3 lg:min-h-0">
      <Banner porAlistar={totalPorAlistar} />

      {aviso && (
        <div
          role="status"
          className={`flex items-center justify-between gap-2 rounded-2xl border px-4 py-2.5 text-xs font-bold ${
            aviso.tipo === "exito"
              ? "border-[#BFE6D1] bg-[#E4F6EC] text-[#13693D]"
              : "border-[#F5BDBD] bg-[#FDE8E8] text-[#B42318]"
          }`}
        >
          <span className="flex items-center gap-2">
            {aviso.tipo === "exito" ? (
              <CheckCircle2 size={16} />
            ) : (
              <XCircle size={16} />
            )}
            {aviso.texto}
          </span>
          <button
            type="button"
            onClick={() => setAviso(null)}
            className="text-[11px] underline"
          >
            Ocultar
          </button>
        </div>
      )}

      <div className="grid flex-1 gap-3 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] xl:items-start">
        {/* COLUMNA IZQUIERDA: SEMÁFORO SLA Y SOLICITUDES PENDIENTES */}
        <div className="flex min-h-0 min-w-0 flex-col gap-3">
          <Panel icono={Clock} titulo="Semáforo de alistamiento (SLA)">
            <ul className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {CONFIG_SEMAFORO.map(
                ({
                  nivel,
                  rango,
                  detalle,
                  icono: Icono,
                  fondo,
                  circulo,
                }) => {
                  const cantidad = cola?.semaforo?.[nivel] ?? 0;

                  return (
                    <li
                      key={nivel}
                      className={`flex min-w-0 items-center gap-2 rounded-xl border px-2 py-2 2xl:px-3 ${fondo}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${circulo}`}
                      >
                        <Icono size={19} strokeWidth={2.4} />
                      </span>

                      <span className="min-w-0 leading-tight">
                        <span
                          className={`${titleFont.className} block text-[22px] font-extrabold text-[#14285B]`}
                        >
                          {isLoading ? "—" : cantidad}
                        </span>
                        <span className="block text-[12px] font-extrabold text-[#14285B]">
                          {rango}
                        </span>
                        <span className="block text-[10px] text-[#344766]">
                          {detalle}
                        </span>
                      </span>
                    </li>
                  );
                },
              )}
            </ul>
          </Panel>

          <Panel
            id="cola-alistamiento"
            icono={ClipboardList}
            titulo="Solicitudes pendientes de alistamiento"
            accion={
              <button
                type="button"
                onClick={actualizarCola}
                className="inline-flex shrink-0 items-center gap-1 text-[12px] font-bold text-[#0755D8] hover:underline"
              >
                Actualizar
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            }
          >
            <p className="mt-1 shrink-0 text-[11px] text-[#526783]">
              {isLoading
                ? "Cargando solicitudes de la sede..."
                : `${totalPorAlistar} reservas pendientes por alistar · Listas para retiro: ${cola?.listasParaRetiro.length ?? 0}`}
            </p>

            {isError && (
              <p className="mt-2 rounded-xl bg-[#FDE8E8] px-3 py-2 text-xs font-semibold text-[#B42318]">
                No se pudo cargar la cola de la sede. Verifica tu sesión y que
                el backend esté activo.
              </p>
            )}

            <div className="mt-2 min-h-0 flex-1 overflow-x-auto">
              <table className="w-full min-w-[610px] text-left text-[12px] text-[#14285B]">
                <thead>
                  <tr className="bg-[#EEF4FC] text-[11px]">
                    <th scope="col" className="rounded-l-lg px-2 py-2 font-extrabold">
                      Código
                    </th>
                    <th scope="col" className="px-2 py-2 font-extrabold">
                      Paciente
                    </th>
                    <th scope="col" className="px-2 py-2 font-extrabold">
                      Medicamento
                    </th>
                    <th scope="col" className="px-2 py-2 font-extrabold">
                      Tiempo
                    </th>
                    <th scope="col" className="px-2 py-2 font-extrabold">
                      SLA
                    </th>
                    <th
                      scope="col"
                      className="rounded-r-lg px-2 py-2 text-center font-extrabold"
                    >
                      Acción
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!isLoading && pendientes.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-3 py-6 text-center text-xs text-[#526783]"
                      >
                        No hay reservas pendientes por alistar en este momento.
                      </td>
                    </tr>
                  ) : (
                    pendientes.map((fila) => (
                      <tr
                        key={fila.id}
                        className="border-b border-[#E5EDF8] last:border-0 hover:bg-[#F7FAFF]"
                      >
                        <td className="px-2 py-2 font-extrabold">
                          {fila.codigoReserva}
                        </td>
                        <td className="px-2 py-2">
                          {obtenerNombrePaciente(fila)}
                        </td>
                        <td className="px-2 py-2">
                          {fila.medicamento.nombreGenerico}{" "}
                          {fila.medicamento.concentracion ?? ""}
                        </td>
                        <td className="px-2 py-2">
                          <span
                            className={`inline-block whitespace-nowrap rounded-full px-2 py-1 text-[11px] font-extrabold ${ESTILOS_SLA[fila.sla].pastilla}`}
                          >
                            {fila.tiempoTranscurrido}
                          </span>
                        </td>
                        <td className="px-2 py-2">
                          <span className="inline-flex items-center gap-1 font-semibold">
                            <span
                              aria-hidden="true"
                              className={`h-2 w-2 rounded-full ${ESTILOS_SLA[fila.sla].punto}`}
                            />
                            {fila.sla}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-center">
                          <button
                            type="button"
                            disabled={isAlistando}
                            onClick={() =>
                              manejarAlistar(
                                fila.codigoReserva,
                                metodoSeleccionado,
                              )
                            }
                            aria-label={`Alistar la reserva ${fila.codigoReserva}`}
                            className={`inline-flex items-center gap-1 rounded-lg bg-[#0755D8] px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-[#0646DC] disabled:opacity-50 ${FOCO}`}
                          >
                            <Package size={14} aria-hidden="true" />
                            Alistar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        {/* COLUMNA DERECHA: VENTANILLA, ETIQUETADO E INVENTARIO */}
        <div className="flex min-h-0 min-w-0 flex-col gap-3">
          <Panel
            icono={Users}
            titulo="Entrega en ventanilla"
            descripcion="Busca la reserva por código o QR y valida la fórmula física."
          >
            <form
              onSubmit={manejarBuscarVentanilla}
              role="search"
              className="mt-2.5 flex flex-col gap-2 sm:flex-row"
            >
              <div className="relative min-w-0 flex-1">
                <label htmlFor="codigo-reserva" className="sr-only">
                  Código de reserva
                </label>
                <Search
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#526783]"
                />
                <input
                  id="codigo-reserva"
                  name="codigo"
                  type="text"
                  value={codigoBusqueda}
                  onChange={(e) => setCodigoBusqueda(e.target.value)}
                  placeholder="Ej. FS-8K7L"
                  className={`w-full rounded-xl border border-[#B9C9DE] bg-white py-2 pl-9 pr-2 text-[12px] text-[#14285B] placeholder:text-[#526783] ${FOCO}`}
                />
              </div>

              <button
                type="submit"
                disabled={buscandoVentanilla}
                className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#0755D8] px-3 py-2 text-[12px] font-bold text-white hover:bg-[#0646DC] disabled:opacity-50 ${FOCO}`}
              >
                <QrCode size={17} aria-hidden="true" />
                {buscandoVentanilla ? "Buscando..." : "Buscar / QR"}
              </button>
            </form>

            {reservaVentanilla && (
              <div className="mt-3 rounded-xl border border-[#DCE9F8] bg-[#F8FBFF] p-3 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-extrabold text-[#14285B]">
                    {reservaVentanilla.codigoReserva} ·{" "}
                    {obtenerNombrePaciente(reservaVentanilla)}
                  </span>
                  <span className="rounded-full bg-[#E5F1FF] px-2.5 py-0.5 text-[11px] font-bold text-[#0755D8]">
                    {reservaVentanilla.estado}
                  </span>
                </div>

                <p className="mt-1 text-[#526783]">
                  Medicamento:{" "}
                  <strong className="text-[#14285B]">
                    {reservaVentanilla.medicamento.nombreGenerico}
                  </strong>{" "}
                  · Orden: {reservaVentanilla.numeroOrdenMedica}
                </p>

                {(reservaVentanilla.estado === "PENDIENTE" ||
                  reservaVentanilla.estado === "LISTA_PARA_RETIRO") && (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={isEntregando}
                      onClick={() =>
                        manejarConfirmarEntrega(reservaVentanilla.codigoReserva)
                      }
                      className={`inline-flex items-center gap-1 rounded-lg bg-[#12A150] px-3 py-1.5 text-[11px] font-extrabold text-white hover:brightness-95 disabled:opacity-50 ${FOCO}`}
                    >
                      <Check size={14} />
                      Confirmar Entrega
                    </button>

                    <button
                      type="button"
                      disabled={isRechazando}
                      onClick={() =>
                        setCodigoRechazo(reservaVentanilla.codigoReserva)
                      }
                      className={`inline-flex items-center gap-1 rounded-lg border border-[#F5BDBD] bg-[#FDE8E8] px-3 py-1.5 text-[11px] font-extrabold text-[#B42318] hover:bg-[#FAD0D0] disabled:opacity-50 ${FOCO}`}
                    >
                      <XCircle size={14} />
                      Rechazar Reserva
                    </button>
                  </div>
                )}
              </div>
            )}

            <p className="mt-2 flex items-start gap-2 rounded-lg bg-[#E8F1FD] px-3 py-2 text-[11px] text-[#14285B]">
              <Info
                size={15}
                className="shrink-0 text-[#0755D8]"
                aria-hidden="true"
              />
              Mecanismo a prueba de fallos: si el paciente llega a ventanilla y
              la reserva aún está pendiente, puedes confirmar la entrega tras
              validar la fórmula física.
            </p>
          </Panel>

          <Panel
            icono={Printer}
            titulo="Alistamiento y etiquetado"
            descripcion="Selecciona el método para marcar reservas como listas para retiro."
          >
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMetodoSeleccionado("POS")}
                className={`flex min-h-[52px] items-center justify-center gap-2 rounded-xl border px-2 py-2 text-center text-[11px] font-extrabold transition ${
                  metodoSeleccionado === "POS"
                    ? "border-[#0755D8] bg-[#0755D8] text-white"
                    : "border-[#8ABBF6] bg-[#E5F1FF] text-[#0755D8] hover:bg-[#D8E8FF]"
                } ${FOCO}`}
              >
                <Printer size={18} className="shrink-0" aria-hidden="true" />
                <span>Tirilla POS</span>
              </button>

              <button
                type="button"
                onClick={() => setMetodoSeleccionado("MANUAL")}
                className={`flex min-h-[52px] items-center justify-center gap-2 rounded-xl border px-2 py-2 text-center text-[11px] font-extrabold transition ${
                  metodoSeleccionado === "MANUAL"
                    ? "border-[#14285B] bg-[#14285B] text-white"
                    : "border-[#C7D3E3] bg-[#F3F6FA] text-[#14285B] hover:bg-[#E9EEF5]"
                } ${FOCO}`}
              >
                <Tag size={18} className="shrink-0" aria-hidden="true" />
                <span>Etiquetado manual</span>
              </button>
            </div>
          </Panel>

          <Panel
            icono={Boxes}
            titulo="Ingreso y ajuste de inventario"
            descripcion="Registra lotes por código EAN-13 y actualiza existencias."
          >
            <FormularioLote
              sedeId={cola?.sedeId}
              onLoteRegistrado={actualizarCola}
            />
          </Panel>
        </div>
      </div>

      <ModalTirillaPos
        reserva={tirillaActiva}
        onCerrar={() => setTirillaActiva(null)}
      />

      <ModalRechazoReserva
        codigoReserva={codigoRechazo}
        cargando={isRechazando}
        onCerrar={() => setCodigoRechazo(null)}
        onConfirmarRechazo={manejarConfirmarRechazo}
      />
    </div>
  );
}