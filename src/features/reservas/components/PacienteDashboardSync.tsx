"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Clock3,
  Eye,
  Heart,
  MapPin,
  Pill,
  RefreshCw,
  Store,
  X,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import BannerWaves from "@/components/layout/BannerWaves";
import { catalogoService } from "@/features/catalogo/services/catalogo.service";
import type { Medicamento, SedeFarmacia } from "@/features/catalogo/types";
import { reservasService } from "@/features/reservas/services/reservas.service";
import type { Reserva } from "@/features/reservas/types";
import { useMedicamentosGuardados } from "@/features/mis-medicamentos/hooks/useMedicamentosGuardados";
import { resolverFavoritos } from "@/features/mis-medicamentos/utils/resolverFavoritos";
import type { Notificacion } from "@/features/notificaciones/types";
import { formatearTiempoRelativo } from "@/features/notificaciones/utils";

const fuenteTitulos = Inter({
  subsets: ["latin"],
  weight: ["700", "800"],
});

const ESTILOS_ESTADO: Record<string, string> = {
  COMPLETADA: "bg-[#D7F8E3] text-[#087443]",
  ENTREGADA: "bg-[#D7F8E3] text-[#087443]",
  CANCELADA: "bg-[#FFE0E2] text-[#C62828]",
  CANCELADA_USUARIO: "bg-[#FFE0E2] text-[#C62828]",
  RECHAZADA_FARMACIA: "bg-[#FFE0E2] text-[#C62828]",
  ACTIVA: "bg-[#DDF3FF] text-[#0755D8]",
  PENDIENTE: "bg-[#DDF3FF] text-[#0755D8]",
  LISTA_PARA_RETIRO: "bg-[#E0F2FE] text-[#0369A1]",
  VENCIDA: "bg-[#FFF0C7] text-[#8A5A00]",
  EXPIRADA: "bg-[#FFF0C7] text-[#8A5A00]",
};

const ETIQUETA_ESTADO: Record<string, string> = {
  ACTIVA: "En proceso",
  PENDIENTE: "En proceso",
  LISTA_PARA_RETIRO: "Lista para retiro",
  COMPLETADA: "Completada",
  ENTREGADA: "Completada",
  CANCELADA: "Cancelada",
  CANCELADA_USUARIO: "Cancelada",
  RECHAZADA_FARMACIA: "Cancelada",
  VENCIDA: "Vencida",
  EXPIRADA: "Vencida",
};

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]";

const BOTON_PRIMARIO = `
  inline-flex items-center justify-center gap-2
  rounded-full bg-gradient-to-r
  from-[#0755E8] to-[#0787F5]
  px-4 py-2 text-xs font-bold text-white
  shadow-[0_5px_14px_rgba(7,85,232,0.18)]
  transition hover:brightness-105
  ${FOCO}
`;

const BOTON_CONTORNO = `
  inline-flex items-center justify-center gap-2
  rounded-full border-2 border-[#2878ED]
  bg-white px-4 py-2
  text-xs font-bold text-[#0755C8]
  transition hover:bg-[#EEF6FF]
  ${FOCO}
`;

// Formatea una fecha ISO a texto legible en español de Colombia.
function formatearFechaCorta(fechaIso?: string): string {
  if (!fechaIso) return "";
  const fecha = new Date(fechaIso);
  if (Number.isNaN(fecha.getTime())) return "";
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(fecha);
}

// Ordena reservas activas de forma ascendente según su fecha de retiro más próxima.
function ordenarPorFechaMasProxima(reservas: Reserva[]): Reserva[] {
  return [...reservas].sort((a, b) => {
    const fechaA = new Date(
      a.fechaRetiro || a.fechaVencimiento || a.fechaCreacion,
    ).getTime();
    const fechaB = new Date(
      b.fechaRetiro || b.fechaVencimiento || b.fechaCreacion,
    ).getTime();

    const tsA = Number.isNaN(fechaA) ? Number.MAX_SAFE_INTEGER : fechaA;
    const tsB = Number.isNaN(fechaB) ? Number.MAX_SAFE_INTEGER : fechaB;

    return tsA - tsB;
  });
}

// Ordena reservas de más reciente a más antigua según su fecha de creación.
function ordenarPorMasReciente(reservas: Reserva[]): Reserva[] {
  return [...reservas].sort((a, b) => {
    const tsA = new Date(a.fechaCreacion).getTime();
    const tsB = new Date(b.fechaCreacion).getTime();
    return (Number.isNaN(tsB) ? 0 : tsB) - (Number.isNaN(tsA) ? 0 : tsA);
  });
}

// Determina el índice (0, 1 o 2) del paso exacto donde se canceló la reserva.
function obtenerIndiceCancelacion(reserva?: Reserva): number {
  if (!reserva) return 0;

  // Revisamos campos opcionales si el backend envía auditoría o fechas intermedias.
  const datos = reserva as Reserva & {
    estadoAnterior?: string;
    fechaConfirmacion?: string;
    fechaListaRetiro?: string;
  };

  const estadoPrevio = String(datos.estadoAnterior ?? "").toUpperCase();

  // Si alcanzó a estar lista para retiro, la cancelación ocurrió en el paso 3 (índice 2).
  if (datos.fechaListaRetiro || estadoPrevio === "LISTA_PARA_RETIRO") {
    return 2;
  }

  // Si alcanzó a ser confirmada por farmacia, la cancelación ocurrió en el paso 2 (índice 1).
  if (datos.fechaConfirmacion || estadoPrevio === "CONFIRMADA") {
    return 1;
  }

  // Si estaba recién creada (sin confirmar por farmacia), ocurrió en el paso 1 (índice 0).
  return 0;
}

// Verifica si la reserva ya cuenta con confirmación explícita de farmacia.
function estaConfirmadaPorFarmacia(reserva?: Reserva): boolean {
  if (!reserva) return false;

  const estado = String(reserva.estado).toUpperCase();
  if (estado === "LISTA_PARA_RETIRO" || estado === "COMPLETADA" || estado === "ENTREGADA") {
    return true;
  }

  const datos = reserva as Reserva & {
    confirmada?: boolean;
    fechaConfirmacion?: string;
    estadoRaw?: string;
  };

  return Boolean(
    datos.confirmada ||
      datos.fechaConfirmacion ||
      String(datos.estadoRaw ?? "").toUpperCase() === "CONFIRMADA",
  );
}

// Calcula los 4 pasos de seguimiento según el estado real de la reserva en backend.
function construirPasosSeguimiento(reserva?: Reserva) {
  const estado = String(reserva?.estado ?? "ACTIVA");
  const esCompletada = estado === "COMPLETADA" || estado === "ENTREGADA";
  const esCancelada =
    estado === "CANCELADA" ||
    estado === "CANCELADA_USUARIO" ||
    estado === "RECHAZADA_FARMACIA";
  const esListaParaRetiro = estado === "LISTA_PARA_RETIRO";
  const yaConfirmada = estaConfirmadaPorFarmacia(reserva);

  const fechaCreacion = reserva ? formatearFechaCorta(reserva.fechaCreacion) : "";

  // Caso 1: Reserva cancelada -> coloca la X roja y la hora en el paso exacto donde se detuvo.
  if (esCancelada) {
    const horaCancelacion =
      formatearFechaCorta(reserva?.fechaCancelacion) || fechaCreacion;
    const indiceCancelacion = obtenerIndiceCancelacion(reserva);

    const etiquetasBase = [
      "Reserva creada",
      "Confirmada",
      "Lista para retiro",
      "Retirada",
    ];

    return etiquetasBase.map((etiquetaBase, indice) => {
      if (indice < indiceCancelacion) {
        return {
          etiqueta: etiquetaBase,
          hora: fechaCreacion,
          estado: "hecho" as const,
          conectorHecho: indice + 1 < indiceCancelacion,
        };
      }

      if (indice === indiceCancelacion) {
        return {
          etiqueta: "Cancelada",
          hora: horaCancelacion,
          estado: "cancelada" as const,
          conectorHecho: false,
        };
      }

      return {
        etiqueta: etiquetaBase,
        hora: "",
        estado: "pendiente" as const,
        conectorHecho: false,
      };
    });
  }

  // Caso 2: Reserva ya entregada al paciente -> todos los pasos completados.
  if (esCompletada) {
    return [
      {
        etiqueta: "Reserva creada",
        hora: fechaCreacion,
        estado: "hecho" as const,
        conectorHecho: true,
      },
      {
        etiqueta: "Confirmada",
        hora: fechaCreacion,
        estado: "hecho" as const,
        conectorHecho: true,
      },
      {
        etiqueta: "Lista para retiro",
        hora: "",
        estado: "hecho" as const,
        conectorHecho: true,
      },
      {
        etiqueta: "Retirada",
        hora: formatearFechaCorta(reserva?.fechaEntrega),
        estado: "hecho" as const,
        conectorHecho: false,
      },
    ];
  }

 // Caso 3: Reserva confirmada y alistada por farmacia (LISTA_PARA_RETIRO),
  // esperando que el paciente vaya a reclamar y el farmacéutico confirme la entrega.
  if (esListaParaRetiro) {
    return [
      {
        etiqueta: "Reserva creada",
        hora: fechaCreacion,
        estado: "hecho" as const,
        conectorHecho: true,
      },
      {
        etiqueta: "Confirmada",
        hora: fechaCreacion,
        estado: "hecho" as const,
        conectorHecho: true,
      },
      {
        etiqueta: "Lista para retiro",
        hora: "",
        estado: "hecho" as const,
        conectorHecho: false,
      },
      {
        etiqueta: "Pendiente por retiro",
        hora: "",
        estado: "actual" as const,
        conectorHecho: false,
      },
    ];
  }

  // Caso 4A: Ya confirmada por farmacia, pero aún no alistada para retiro.
  if (yaConfirmada) {
    return [
      {
        etiqueta: "Reserva creada",
        hora: fechaCreacion,
        estado: "hecho" as const,
        conectorHecho: true,
      },
      {
        etiqueta: "Confirmada",
        hora: fechaCreacion,
        estado: "hecho" as const,
        conectorHecho: false,
      },
      {
        etiqueta: "Lista para retiro",
        hora: "",
        estado: "actual" as const,
        conectorHecho: false,
      },
      {
        etiqueta: "Retirada",
        hora: "",
        estado: "pendiente" as const,
        conectorHecho: false,
      },
    ];
  }

  // Caso 4B: Reserva recién creada y aún pendiente de confirmación por farmacia.
  return [
    {
      etiqueta: "Reserva creada",
      hora: fechaCreacion,
      estado: "hecho" as const,
      conectorHecho: false,
    },
    {
      etiqueta: "Pendiente por confirmación",
      hora: "",
      estado: "actual" as const,
      conectorHecho: false,
    },
    {
      etiqueta: "Lista para retiro",
      hora: "",
      estado: "pendiente" as const,
      conectorHecho: false,
    },
    {
      etiqueta: "Retirada",
      hora: "",
      estado: "pendiente" as const,
      conectorHecho: false,
    },
  ];
}

function Panel({
  icono: Icono,
  titulo,
  descripcion,
  accion,
  className = "",
  children,
}: {
  icono: LucideIcon;
  titulo: string;
  descripcion?: string;
  accion?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className={`
        min-w-0 rounded-[22px]
        border border-[#D6E5FA]
        bg-white p-3
        shadow-[0_6px_20px_rgba(28,83,160,0.07)]
        ${className}
      `}
    >
      <div className="flex items-center justify-between gap-2">
        <h2
          className={`
            ${fuenteTitulos.className}
            flex min-w-0 items-center gap-2.5
            text-[1.0625rem] font-extrabold
            leading-tight text-[#14285B]
            sm:text-lg
          `}
        >
          <Icono
            size={24}
            className="shrink-0 text-[#0755D8]"
            aria-hidden="true"
          />
          {titulo}
        </h2>
        {accion}
      </div>

      {descripcion && (
        <p className="mt-2 text-sm text-[#526783]">{descripcion}</p>
      )}

      {children}
    </section>
  );
}

function BurbujaIcono({ icono: Icono }: { icono: LucideIcon }) {
  return (
    <span
      aria-hidden="true"
      className="
        flex h-9 w-9 shrink-0
        items-center justify-center
        rounded-full bg-gradient-to-br
        from-[#E0F5FF] to-[#E3EDFF]
        text-[#0755D8]
      "
    >
      <Icono size={18} />
    </span>
  );
}

function VerTodo({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className={`
        flex shrink-0 items-center gap-1
        rounded-full text-xs font-bold
        text-[#0755D8] hover:underline
        ${FOCO}
      `}
    >
      Ver todo
      <ArrowRight size={15} aria-hidden="true" />
    </Link>
  );
}

interface PacienteDashboardSyncProps {
  nombre: string;
  notificaciones: Notificacion[];
  fechaInicial: number;
}

export default function PacienteDashboardSync({
  nombre,
  notificaciones,
  fechaInicial,
}: PacienteDashboardSyncProps) {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [cargandoReservas, setCargandoReservas] = useState(true);
  const [cancelandoId, setCancelandoId] = useState<number | null>(null);
  const [medicamentosCatalogo, setMedicamentosCatalogo] = useState<
    Medicamento[]
  >([]);
  const [sedesCatalogo, setSedesCatalogo] = useState<SedeFarmacia[]>([]);

  const { guardados, totalGuardados } = useMedicamentosGuardados();

  const cargarReservas = async () => {
    setCargandoReservas(true);
    try {
      const lista = await reservasService.listarMisReservas();
      setReservas(lista);
    } catch {
      setReservas([]);
    } finally {
      setCargandoReservas(false);
    }
  };

  const cargarCatalogo = async () => {
    try {
      const resultado = await catalogoService.listarCatalogo();
      setMedicamentosCatalogo(resultado.medicamentos);
      setSedesCatalogo(resultado.sedes);
    } catch {
      setMedicamentosCatalogo([]);
      setSedesCatalogo([]);
    }
  };

  useEffect(() => {
    void cargarReservas();
    void cargarCatalogo();
  }, []);

const [errorReserva, setErrorReserva] = useState<string | null>(null);

const manejarCancelarReserva = async (reservaId: number) => {
  setCancelandoId(reservaId);
  setErrorReserva(null);

  try {
    // Llamamos al servicio de reservas para cancelar la reserva en el backend.
    await reservasService.cancelarReserva(reservaId);
    // Recargamos la lista para reflejar el nuevo estado en el dashboard.
    await cargarReservas();
  } catch (error: unknown) {
    // Extraemos el mensaje del backend si viene en AxiosError o usamos uno por defecto.
    const mensajeBackend =
      (error as { response?: { data?: { message?: string | string[] } } })
        ?.response?.data?.message;

    if (Array.isArray(mensajeBackend)) {
      setErrorReserva(mensajeBackend.join(", "));
    } else if (typeof mensajeBackend === "string" && mensajeBackend.trim()) {
      setErrorReserva(mensajeBackend);
    } else {
      setErrorReserva(
        "No fue posible cancelar la reserva. Verifica su estado actual o que el backend esté activo.",
      );
    }
  } finally {
    // Liberamos el estado de carga sin importar si hubo éxito o error.
    setCancelandoId(null);
  }
};

  // Reservas activas ordenadas por la fecha de retiro más próxima.
  const reservasActivas = ordenarPorFechaMasProxima(
    reservas.filter((r) => {
      const estado = String(r.estado);
      return estado === "ACTIVA" || estado === "LISTA_PARA_RETIRO";
    }),
  );

  // Todas las reservas ordenadas de la más reciente a la más antigua.
  const reservasRecientes = ordenarPorMasReciente(reservas);

  // Reserva activa más próxima en fecha (para la tarjeta de farmacia activa).
  const reservaActivaProxima = reservasActivas[0];

  // En seguimiento: priorizamos la activa más próxima; si se canceló y no hay activas, mostramos la más reciente.
  const reservaSeguimiento = reservaActivaProxima ?? reservasRecientes[0];

  const pasosSeguimiento = construirPasosSeguimiento(reservaSeguimiento);
  const favoritosResueltos = resolverFavoritos(
    guardados,
    medicamentosCatalogo,
    sedesCatalogo,
  );

  const notificacionesSinLeer = notificaciones.filter((n) => !n.leida).length;
  const recientesNotificaciones = [...notificaciones]
    .sort(
      (a, b) =>
        new Date(b.fechaCreacion).getTime() -
        new Date(a.fechaCreacion).getTime(),
    )
    .slice(0, 2);

  const indicadores = [
    {
      valor: cargandoReservas ? "—" : reservasActivas.length,
      etiqueta: "Reservas activas",
      icono: CalendarDays,
      fondo: "from-[#DDF4FF] to-[#D8E7FF]",
      color: "text-[#0875E8]",
    },
    {
      valor: cargandoReservas ? "—" : reservas.length,
      etiqueta: "Reservas en el historial",
      icono: Clock,
      fondo: "from-[#E3ECFF] to-[#DAE5FF]",
      color: "text-[#2F5BE0]",
    },
    {
      valor: totalGuardados,
      etiqueta: "Favoritos",
      icono: Heart,
      fondo: "from-[#F0E8FF] to-[#E7DFFF]",
      color: "text-[#8052E8]",
    },
    {
      valor: notificacionesSinLeer,
      etiqueta: "Notificaciones sin leer",
      icono: Bell,
      fondo: "from-[#FFF4D9] to-[#FFEBC2]",
      color: "text-[#E58A00]",
    },
  ];

  const estadoSeguimiento = String(reservaSeguimiento?.estado ?? "");
  const puedeCancelarSeguimiento =
    estadoSeguimiento === "ACTIVA" || estadoSeguimiento === "LISTA_PARA_RETIRO";

  const claseBadgeSeguimiento = reservaSeguimiento
    ? (ESTILOS_ESTADO[reservaSeguimiento.estado] ??
      "bg-[#DDF3FF] text-[#0755D8]")
    : "bg-[#EEF4FC] text-[#526783]";

  const fechaRetiroTexto =
    formatearFechaCorta(reservaSeguimiento?.fechaRetiro) || "Por confirmar";

  return (
    <div
      className="
        flex min-h-full flex-col gap-3
        bg-[#F5F9FF] p-3
        lg:h-full lg:min-h-0 lg:overflow-y-auto
        2xl:justify-between
      "
    >
      {/* BANNER DE BIENVENIDA */}
      <section
        aria-labelledby="bienvenida"
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

        <div className="relative z-10 w-full lg:max-w-[62%]">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
            <Pill size={15} aria-hidden="true" />
            <span className="text-xs font-semibold">
              FarmaSync · Tu salud más cerca
            </span>
          </div>

          <h1
            id="bienvenida"
            className="text-[26px] font-extrabold tracking-tight sm:text-[30px]"
          >
            ¡Hola{nombre ? `, ${nombre}` : ""}!
            <span aria-hidden="true"> 👋</span>
          </h1>

          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-[#E1EDFF] sm:text-sm">
            Gestiona tus reservas, consulta la disponibilidad de medicamentos y
            realiza el seguimiento de tus retiros.
          </p>

          <Link
            href="/medicamentos"
            className={`
              mt-3 inline-flex items-center gap-2
              rounded-full bg-white px-4 py-2
              text-xs font-extrabold text-[#0755D8]
              shadow-[0_6px_16px_rgba(0,35,130,0.16)]
              transition hover:bg-[#EAF7FF]
              ${FOCO}
            `}
          >
            Buscar medicamentos
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ESTADÍSTICAS SINCRONIZADAS */}
      <ul className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {indicadores.map(
          ({ valor, etiqueta, icono: Icono, fondo, color }) => (
            <li
              key={etiqueta}
              className={`
                flex min-h-[68px] items-center gap-3
                rounded-[18px] border border-white/70
                bg-gradient-to-br ${fondo}
                px-3 py-2
                shadow-[0_4px_12px_rgba(37,91,160,0.04)]
              `}
            >
              <span
                aria-hidden="true"
                className={`
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-xl bg-white/85
                  shadow-sm ${color}
                `}
              >
                <Icono size={21} strokeWidth={2.2} />
              </span>

              <span className="min-w-0 leading-tight">
                <span
                  className={`
                    ${fuenteTitulos.className}
                    block text-[23px]
                    font-extrabold text-[#14285B]
                  `}
                >
                  {valor}
                </span>

                <span className="block text-[11px] font-medium text-[#344766]">
                  {etiqueta}
                </span>
              </span>
            </li>
          ),
        )}
      </ul>

      {/* CONTENIDO PRINCIPAL */}
      <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-3">
          {/* RESERVA EN SEGUIMIENTO */}
          <Panel
            icono={Pill}
            titulo="Reserva en seguimiento"
            accion={
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${claseBadgeSeguimiento}`}
              >
                {reservaSeguimiento
                  ? (ETIQUETA_ESTADO[reservaSeguimiento.estado] ??
                    reservaSeguimiento.estado)
                  : "Sin reservas"}
              </span>
            }
          >
            {reservaSeguimiento ? (
              <>
                <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="flex items-center gap-3 lg:w-[40%]">
                    <div
                      aria-hidden="true"
                      className="
                        flex h-[64px] w-[65px] shrink-0
                        items-center justify-center
                        rounded-[16px] bg-gradient-to-br
                        from-[#DDF5FF] to-[#D8E8FF]
                        text-[#0755D8]
                      "
                    >
                      <Pill size={32} strokeWidth={2.2} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-[#14285B]">
                        {reservaSeguimiento.medicamento.nombre}{" "}
                        {reservaSeguimiento.medicamento.concentracion}
                      </p>

                      <p className="mt-0.5 text-xs text-[#4A5B78]">
                        Reserva #{reservaSeguimiento.codigo}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-xs font-bold text-[#17366F]">
                        <CalendarDays
                          size={14}
                          className="shrink-0 text-[#0755D8]"
                          aria-hidden="true"
                        />
                        Retiro: {fechaRetiroTexto}
                      </p>
                    </div>
                  </div>

                  <ol className="grid flex-1 grid-cols-4">
                    {pasosSeguimiento.map((paso, indice) => {
                      const esUltimo = indice === pasosSeguimiento.length - 1;

                      return (
                        <li
                          key={`${paso.etiqueta}-${indice}`}
                          className="relative flex min-w-0 flex-col items-center text-center"
                        >
                          {!esUltimo && (
                            <span
                              aria-hidden="true"
                              className={`
                                absolute left-1/2 top-[12px]
                                h-[3px] w-full
                                ${
                                  paso.conectorHecho
                                    ? "bg-[#0875E8]"
                                    : "bg-[#C9D6E8]"
                                }
                              `}
                            />
                          )}

                          <span
                            className={`
                              relative z-10 flex
                              h-[26px] w-[26px]
                              items-center justify-center
                              rounded-full
                              ${
                                paso.estado === "hecho"
                                  ? "bg-gradient-to-br from-[#079DEB] to-[#0755E8] text-white"
                                  : paso.estado === "actual"
                                    ? "border-[3px] border-[#0875E8] bg-white ring-[3px] ring-[#E3F4FF]"
                                    : paso.estado === "cancelada"
                                      ? "bg-[#FFE0E2] text-[#C62828] ring-[3px] ring-[#FFF1F2]"
                                      : "bg-[#D3DDEB]"
                              }
                            `}
                          >
                            {paso.estado === "hecho" && (
                              <Check
                                size={15}
                                strokeWidth={3}
                                aria-hidden="true"
                              />
                            )}
                            {paso.estado === "cancelada" && (
                              <X
                                size={14}
                                strokeWidth={3}
                                aria-hidden="true"
                              />
                            )}
                          </span>

                          <span
                            className={`
                              mt-1.5 text-[10px] leading-tight
                              ${
                                paso.estado === "actual"
                                  ? "font-extrabold text-[#0755D8]"
                                  : paso.estado === "cancelada"
                                    ? "font-extrabold text-[#C62828]"
                                    : "font-semibold text-[#344766]"
                              }
                            `}
                          >
                            {paso.etiqueta}
                          </span>

                          {paso.hora && (
                            <span className="mt-0.5 text-[9px] leading-tight text-[#64748B]">
                              {paso.hora}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Link href="/reservas" className={BOTON_PRIMARIO}>
                    <Eye size={15} aria-hidden="true" />
                    Ver detalles
                  </Link>

                  {puedeCancelarSeguimiento && (
                    <button
                      type="button"
                      disabled={cancelandoId === reservaSeguimiento.id}
                      onClick={() =>
                        void manejarCancelarReserva(reservaSeguimiento.id)
                      }
                      className={BOTON_CONTORNO}
                    >
                      <XCircle size={15} aria-hidden="true" />
                      {cancelandoId === reservaSeguimiento.id
                        ? "Cancelando..."
                        : "Cancelar reserva"}
                    </button>
                  )}

                  <Link href="/medicamentos" className={BOTON_CONTORNO}>
                    <RefreshCw size={15} aria-hidden="true" />
                    Repetir reserva
                  </Link>
                </div>
                {errorReserva && (
                  <p role="alert" className="mt-2 text-xs font-semibold text-[#C62828]">
                    {errorReserva}
                  </p>
                )}
              </>
            ) : (
              <p className="py-4 text-xs text-[#526783]">
                {cargandoReservas
                  ? "Cargando estado de tus reservas..."
                  : "No tienes reservas registradas en este momento."}
              </p>
            )}
          </Panel>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
            {/* FAVORITOS */}
            <Panel
              icono={Heart}
              titulo="Favoritos"
              className="h-full"
              accion={<VerTodo href="/medicamentos?vista=guardados" />}
            >
              {favoritosResueltos.length > 0 ? (
                <ul className="mt-2 divide-y divide-[#E5EDF8]">
                  {favoritosResueltos.slice(0, 3).map((fav) => {
                    const fechaGuardadoTexto = formatearFechaCorta(
                      fav.fechaGuardado,
                    );

                    return (
                      <li key={fav.clave}>
                        <Link
                          href={fav.hrefDisponibilidad}
                          className={`
                            flex items-center gap-3
                            rounded-xl py-1.5
                            transition hover:bg-[#F2F8FF]
                            ${FOCO}
                          `}
                        >
                          <BurbujaIcono icono={Pill} />
                          <span className="min-w-0 flex-1 leading-tight">
                            <span className="block truncate text-xs font-extrabold text-[#14285B]">
                              {fav.nombreMedicamento}
                            </span>
                            <span className="mt-0.5 block truncate text-[11px] text-[#526783]">
                              {fav.nombreSede}
                              {fechaGuardadoTexto
                                ? ` · Guardado ${fechaGuardadoTexto}`
                                : ""}
                            </span>
                          </span>
                          <ChevronRight
                            size={17}
                            className="shrink-0 text-[#294B7D]"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="py-4 text-xs text-[#64748B]">
                  Aún no tienes medicamentos favoritos guardados.
                </p>
              )}
            </Panel>

            {/* HISTORIAL DE RESERVAS */}
            <Panel
              icono={Clock}
              titulo="Historial de reservas"
              className="h-full"
              accion={<VerTodo href="/reservas" />}
            >
              <div className="mt-2 overflow-x-auto">
                <table className="w-full min-w-[470px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#DDE8F6] text-[11px] text-[#435875]">
                      <th scope="col" className="py-2 pr-2 font-bold">
                        # Reserva
                      </th>
                      <th scope="col" className="py-2 pr-2 font-bold">
                        Medicamento
                      </th>
                      <th scope="col" className="py-2 pr-2 font-bold">
                        Fecha de retiro
                      </th>
                      <th scope="col" className="py-2 font-bold">
                        Estado
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#E5EDF8] text-[#142D60]">
                    {reservasRecientes.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-4 text-center text-xs text-[#64748B]"
                        >
                          {cargandoReservas
                            ? "Cargando historial..."
                            : "No hay reservas registradas todavía."}
                        </td>
                      </tr>
                    ) : (
                      reservasRecientes.slice(0, 3).map((fila) => (
                        <tr
                          key={fila.id}
                          className="transition hover:bg-[#F7FAFF]"
                        >
                          <td className="py-2 pr-2 font-bold">
                            {fila.codigo}
                          </td>
                          <td className="py-2 pr-2">
                            {fila.medicamento.nombre}{" "}
                            {fila.medicamento.concentracion}
                          </td>
                          <td className="py-2 pr-2 text-[#435875]">
                            {formatearFechaCorta(fila.fechaRetiro) ||
                              "Por confirmar"}
                          </td>
                          <td className="py-2">
                            <span
                              className={`
                                whitespace-nowrap rounded-full
                                px-2 py-1 text-[10px]
                                font-extrabold
                                ${
                                  ESTILOS_ESTADO[fila.estado] ??
                                  "bg-[#E5F1FF] text-[#0755D8]"
                                }
                              `}
                            >
                              {ETIQUETA_ESTADO[fila.estado] ?? fila.estado}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>
        </div>

        {/* COLUMNA LATERAL */}
        <div className="flex min-w-0 flex-col gap-3">
          <Panel
            icono={Bell}
            titulo="Notificaciones recientes"
            accion={<VerTodo href="/notificaciones" />}
          >
            {recientesNotificaciones.length > 0 ? (
              <ul className="mt-2 divide-y divide-[#E5EDF8]">
                {recientesNotificaciones.map((notificacion) => (
                  <li key={notificacion.id}>
                    <Link
                      href="/notificaciones"
                      className={`
                        flex items-center gap-3
                        rounded-xl py-2
                        transition hover:bg-[#F2F8FF]
                        ${FOCO}
                      `}
                    >
                      <BurbujaIcono icono={Bell} />
                      <span className="min-w-0 flex-1 leading-tight">
                        <span className="block truncate text-xs font-extrabold text-[#14285B]">
                          {notificacion.titulo}
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] text-[#526783]">
                          {notificacion.medicamentoNombre ||
                            notificacion.mensaje}
                        </span>
                        <time
                          dateTime={notificacion.fechaCreacion}
                          className="mt-1 block text-[10px] text-[#64748B]"
                        >
                          {formatearTiempoRelativo(
                            notificacion.fechaCreacion,
                            fechaInicial,
                          )}
                        </time>
                      </span>
                      {!notificacion.leida && (
                        <span
                          aria-label="Sin leer"
                          className="h-2 w-2 shrink-0 rounded-full bg-[#0755D8]"
                        />
                      )}
                      <ChevronRight
                        size={16}
                        className="shrink-0 text-[#294B7D]"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-5 text-center text-xs text-[#64748B]">
                No tienes notificaciones recientes.
              </p>
            )}
          </Panel>

          <Panel
            icono={Store}
            titulo="Farmacia de tu reserva"
            className="flex flex-1 flex-col"
          >
            <div className="mt-3 flex flex-1 flex-col justify-between gap-3">
              {reservaActivaProxima ? (
                <div className="flex gap-3">
                  <div
                    aria-hidden="true"
                    className="
                      flex h-[72px] w-[84px] shrink-0
                      items-center justify-center
                      rounded-[14px] bg-gradient-to-br
                      from-[#DDF5FF] to-[#D8E8FF]
                      text-[#0755D8]
                    "
                  >
                    <Store size={32} />
                  </div>

                  <div className="min-w-0 text-xs text-[#344766]">
                    <p className="text-sm font-extrabold text-[#14285B]">
                      {reservaActivaProxima.sede.nombre}
                    </p>

                    {reservaActivaProxima.sede.direccion && (
                      <p className="mt-1 flex items-start gap-1.5">
                        <MapPin
                          size={14}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-[#0755D8]"
                        />
                        {reservaActivaProxima.sede.direccion}
                      </p>
                    )}

                    {reservaActivaProxima.sede.horario && (
                      <p className="mt-1 flex items-start gap-1.5">
                        <Clock3
                          size={14}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-[#0755D8]"
                        />
                        <span>{reservaActivaProxima.sede.horario}</span>
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="py-2 text-xs text-[#526783]">
                  No tienes reservas activas en este momento.
                </p>
              )}

              <div className="flex justify-end">
                <Link href="/medicamentos?vista=mapa" className={BOTON_CONTORNO}>
                  <MapPin size={15} aria-hidden="true" />
                  Ver en mapa
                </Link>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}