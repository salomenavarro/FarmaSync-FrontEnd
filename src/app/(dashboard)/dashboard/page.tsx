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
  MapPin,
  Pill,
  RefreshCw,
  Store,
  XCircle,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { getCurrentUserServer } from "@/lib/auth/get-current-user.server";
import BannerWaves from "@/components/layout/BannerWaves";

import { generarNotificacionesMock } from "@/features/notificaciones/data/notificacionesMock";

import type { Notificacion } from "@/features/notificaciones/types";

import {
  formatearTiempoRelativo,
} from "@/features/notificaciones/utils";

// =========================================
// FUENTE DE LOS TÍTULOS
// =========================================

const fuenteTitulos = Inter({
  subsets: ["latin"],
  weight: ["700", "800"],
});

// =========================================
// DATOS DE EJEMPLO (MOCK)
// =========================================

const estadisticas = [
  {
    valor: 3,
    etiqueta: "Reservas activas",
    icono: CalendarDays,
    fondo: "from-[#DDF4FF] to-[#D8E7FF]",
    color: "text-[#0875E8]",
  },
  {
    valor: 12,
    etiqueta: "Reservas en el historial",
    icono: Clock,
    fondo: "from-[#E3ECFF] to-[#DAE5FF]",
    color: "text-[#2F5BE0]",
  },
  {
    valor: 5,
    etiqueta: "Medicamentos guardados",
    icono: Pill,
    fondo: "from-[#F0E8FF] to-[#E7DFFF]",
    color: "text-[#8052E8]",
  },
];

const pasosSeguimiento = [
  {
    etiqueta: "Reserva creada",
    hora: "Hoy, 10:15 a. m.",
    estado: "hecho",
  },
  {
    etiqueta: "Confirmada",
    hora: "Hoy, 10:20 a. m.",
    estado: "hecho",
  },
  {
    etiqueta: "Lista para retiro",
    hora: "",
    estado: "actual",
  },
  {
    etiqueta: "Retirada",
    hora: "",
    estado: "pendiente",
  },
] as const;

const medicamentosRecientes = [
  {
    nombre: "Ibuprofeno 400 mg",
    consulta: "Consultado hoy",
  },
  {
    nombre: "Loratadina 10 mg",
    consulta: "Consultado ayer",
  },
  {
    nombre: "Omeprazol 20 mg",
    consulta: "Consultado hace 3 días",
  },
];

const historial = [
  {
    id: "RS-10426",
    medicamento: "Loratadina 10 mg",
    fecha: "18 nov, 10:00 a. m.",
    estado: "Completada",
  },
  {
    id: "RS-10425",
    medicamento: "Ibuprofeno 400 mg",
    fecha: "15 nov, 2:30 p. m.",
    estado: "Completada",
  },
  {
    id: "RS-10424",
    medicamento: "Omeprazol 20 mg",
    fecha: "10 nov, 11:00 a. m.",
    estado: "Cancelada",
  },
];

const estilosEstado: Record<string, string> = {
  Completada: "bg-[#D7F8E3] text-[#087443]",
  Cancelada: "bg-[#FFE0E2] text-[#C62828]",
};

// =========================================
// ESTILOS REUTILIZABLES
// =========================================

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

// =========================================
// COMPONENTES BASE
// =========================================

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
        <p className="mt-2 text-sm text-[#526783]">
          {descripcion}
        </p>
      )}

      {children}
    </section>
  );
}

/* BURBUJA CON ICONO */

function BurbujaIcono({
  icono: Icono,
}: {
  icono: LucideIcon;
}) {
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

/* ENLACE VER TODO */

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

// =========================================
// BANNER DE BIENVENIDA
// =========================================

function Banner({ nombre }: { nombre: string }) {
  return (
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
      {/* ONDAS DECORATIVAS */}

      <BannerWaves />

      {/* ILUSTRACIÓN MÉDICA */}

      <svg
        aria-hidden="true"
        viewBox="0 0 340 210"
        className="
          pointer-events-none absolute
          -bottom-2 right-3 hidden
          h-full w-auto
          lg:block lg:right-8
        "
      >
        <defs>
          <linearGradient
            id="paciente-frasco"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#D8F3FF" />
          </linearGradient>

          <linearGradient
            id="paciente-tapa"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0" stopColor="#65C9FF" />
            <stop offset="1" stopColor="#0752D9" />
          </linearGradient>
        </defs>

        <ellipse
          cx="190"
          cy="192"
          rx="140"
          ry="10"
          fill="#0646B8"
          fillOpacity=".18"
        />

        <path
          d="M235 174C242 98 291 50 327 48c-2 58-30 111-92 126Z"
          fill="#0AAE9B"
        />

        <path
          d="M245 174c9-50 43-91 76-116"
          fill="none"
          stroke="#087E83"
          strokeWidth="3"
        />

        <path
          d="M215 177c-18-48-9-91 21-116 26 38 23 81-21 116Z"
          fill="#35D0B5"
        />

        <rect
          x="125"
          y="42"
          width="112"
          height="28"
          rx="8"
          fill="url(#paciente-tapa)"
        />

        <path
          d="M137 66h88v12c0 7 10 11 10 22v76c0 12-9 19-20 19h-68c-12 0-20-7-20-19v-76c0-11 10-15 10-22V66Z"
          fill="url(#paciente-frasco)"
        />

        <path
          d="M178 111h14v16h16v14h-16v16h-14v-16h-16v-14h16z"
          fill="#0875E8"
        />

        <g transform="translate(45 151) rotate(-27)">
          <rect
            width="82"
            height="34"
            rx="17"
            fill="#F8FDFF"
          />

          <path
            d="M41 1h24a16 16 0 0 1 0 32H41Z"
            fill="#0A6FE4"
          />

          <path
            d="M41 2v30"
            stroke="#B9E9FF"
            strokeWidth="2"
          />
        </g>

        <g transform="translate(95 178) rotate(18)">
          <rect
            width="54"
            height="24"
            rx="12"
            fill="#F8FDFF"
          />

          <path
            d="M27 1h15a11 11 0 0 1 0 22H27Z"
            fill="#37BEE9"
          />
        </g>
      </svg>

      {/* CONTENIDO DEL ENCABEZADO */}

      <div className="relative z-10 w-full lg:max-w-[62%]">

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
            FarmaSync · Tu salud más cerca
          </span>
        </div>

        {/* SALUDO PERSONALIZADO */}

        <h1
          id="bienvenida"
          className="
            text-[26px] font-extrabold
            tracking-tight sm:text-[30px]
          "
        >
          ¡Hola{nombre ? `, ${nombre}` : ""}!

          <span aria-hidden="true"> 👋</span>
        </h1>

        {/* DESCRIPCIÓN */}

        <p
          className="
            mt-2 max-w-xl text-[13px]
            leading-relaxed text-[#E1EDFF]
            sm:text-sm
          "
        >
          Gestiona tus reservas, consulta la disponibilidad
          de medicamentos y realiza el seguimiento de tus
          retiros.
        </p>

        {/* BOTÓN BUSCAR MEDICAMENTOS */}

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
  );
}

// =========================================
// ESTADÍSTICAS
// =========================================

function Estadisticas({
  notificacionesSinLeer,
}: {
  notificacionesSinLeer: number;
}) {
  const indicadores = [
    ...estadisticas,
    {
      valor: notificacionesSinLeer,
      etiqueta: "Notificaciones sin leer",
      icono: Bell,
      fondo: "from-[#FFF4D9] to-[#FFEBC2]",
      color: "text-[#E58A00]",
    },
  ];

  return (
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
        )
      )}
    </ul>
  );
}

// =========================================
// RESERVA EN SEGUIMIENTO
// =========================================

function Seguimiento() {
  return (
    <Panel
      icono={Pill}
      titulo="Reserva en seguimiento"
      accion={
        <span
          className="
            shrink-0 rounded-full
            bg-[#DDF3FF] px-2.5 py-1
            text-[11px] font-extrabold
            text-[#0755D8]
          "
        >
          En proceso
        </span>
      }
    >
      <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center">

        {/* MEDICAMENTO */}

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
              Acetaminofén 500 mg
            </p>

            <p className="mt-0.5 text-xs text-[#4A5B78]">
              Reserva #RS-10427
            </p>

            <p className="mt-1 flex items-center gap-1 text-xs font-bold text-[#17366F]">
              <CalendarDays
                size={14}
                className="shrink-0 text-[#0755D8]"
                aria-hidden="true"
              />

              Retiro: Hoy, 3:00 p. m.
            </p>
          </div>
        </div>

        {/* PROGRESO DE LA RESERVA */}

        <ol className="grid flex-1 grid-cols-4">
          {pasosSeguimiento.map((paso, indice) => {
            const esUltimo =
              indice === pasosSeguimiento.length - 1;

            return (
              <li
                key={paso.etiqueta}
                className="
                  relative flex min-w-0
                  flex-col items-center text-center
                "
              >
                {!esUltimo && (
                  <span
                    aria-hidden="true"
                    className={`
                      absolute left-1/2 top-[12px]
                      h-[3px] w-full
                      ${
                        paso.estado === "hecho"
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
                </span>

                <span
                  className={`
                    mt-1.5 text-[10px] leading-tight
                    ${
                      paso.estado === "actual"
                        ? "font-extrabold text-[#0755D8]"
                        : "font-semibold text-[#344766]"
                    }
                  `}
                >
                  {paso.etiqueta}

                  <span className="sr-only">
                    {paso.estado === "hecho"
                      ? " (completado)"
                      : paso.estado === "actual"
                      ? " (paso actual)"
                      : " (pendiente)"}
                  </span>
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

      {/* ACCIONES */}

      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href="/reservas"
          className={BOTON_PRIMARIO}
        >
          <Eye size={15} aria-hidden="true" />

          Ver detalles
        </Link>

        <button
          type="button"
          className={BOTON_CONTORNO}
        >
          <XCircle size={15} aria-hidden="true" />

          Cancelar reserva
        </button>

        <button
          type="button"
          className={BOTON_CONTORNO}
        >
          <RefreshCw size={15} aria-hidden="true" />

          Repetir reserva
        </button>
      </div>
    </Panel>
  );
}

// =========================================
// NOTIFICACIONES RECIENTES
// =========================================

function NotificacionesRecientes({
  notificaciones,
  fechaInicial,
}: {
  notificaciones: Notificacion[];
  fechaInicial: number;
}) {
  const recientes = [...notificaciones]
    .sort(
      (a, b) =>
        new Date(b.fechaCreacion).getTime() -
        new Date(a.fechaCreacion).getTime()
    )
    .slice(0, 2);

  return (
    <Panel
      icono={Bell}
      titulo="Notificaciones recientes"
      accion={<VerTodo href="/notificaciones" />}
    >
      {recientes.length > 0 ? (
        <ul className="mt-2 divide-y divide-[#E5EDF8]">
          {recientes.map((notificacion) => (
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
                      fechaInicial
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
  );
}

// =========================================
// FARMACIA DE TU RESERVA
// =========================================

function FarmaciaReserva() {
  return (
    <Panel
      icono={Store}
      titulo="Farmacia de tu reserva"
      className="flex flex-1 flex-col"
    >
      <div className="mt-3 flex flex-1 flex-col justify-between gap-3">
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
              Farmacia Sanitas
            </p>

            <p className="mt-1 flex items-start gap-1.5">
              <MapPin
                size={14}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[#0755D8]"
              />

              Cra. 48 # 10-25, Medellín
            </p>

            <p className="mt-1 flex items-start gap-1.5">
              <Clock3
                size={14}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[#0755D8]"
              />

              <span>
                Lun - Sáb: 7:00 a. m. – 8:00 p. m.
                <br />
                Dom: 8:00 a. m. – 2:00 p. m.
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            href="/medicamentos"
            className={BOTON_CONTORNO}
          >
            <MapPin size={15} aria-hidden="true" />

            Ver en mapa
          </Link>
        </div>
      </div>
    </Panel>
  );
}

// =========================================
// MEDICAMENTOS CONSULTADOS RECIENTEMENTE
// =========================================

function MedicamentosRecientes() {
  return (
    <Panel
      icono={Pill}
      titulo="Medicamentos consultados recientemente"
      className="h-full"
    >
      <ul className="mt-2 divide-y divide-[#E5EDF8]">
        {medicamentosRecientes.map((medicamento) => (
          <li key={medicamento.nombre}>
            <Link
              href="/medicamentos"
              className={`
                flex items-center gap-3
                rounded-xl py-1.5
                transition hover:bg-[#F2F8FF]
                ${FOCO}
              `}
            >
              <BurbujaIcono icono={Pill} />

              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-xs font-extrabold text-[#14285B]">
                  {medicamento.nombre}
                </span>

                <span className="mt-0.5 block text-[11px] text-[#526783]">
                  {medicamento.consulta}
                </span>
              </span>

              <ChevronRight
                size={17}
                className="shrink-0 text-[#294B7D]"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

// =========================================
// HISTORIAL DE RESERVAS
// =========================================

function HistorialReservas() {
  return (
    <Panel
      icono={Clock}
      titulo="Historial de reservas"
      className="h-full"
      accion={
        <VerTodo href="/reservas?vista=historial" />
      }
    >
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[470px] text-left text-xs">
          <thead>
            <tr className="border-b border-[#DDE8F6] text-[11px] text-[#435875]">
              <th
                scope="col"
                className="py-2 pr-2 font-bold"
              >
                # Reserva
              </th>

              <th
                scope="col"
                className="py-2 pr-2 font-bold"
              >
                Medicamento
              </th>

              <th
                scope="col"
                className="py-2 pr-2 font-bold"
              >
                Fecha de retiro
              </th>

              <th
                scope="col"
                className="py-2 font-bold"
              >
                Estado
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E5EDF8] text-[#142D60]">
            {historial.map((fila) => (
              <tr
                key={fila.id}
                className="transition hover:bg-[#F7FAFF]"
              >
                <td className="py-2 pr-2 font-bold">
                  {fila.id}
                </td>

                <td className="py-2 pr-2">
                  {fila.medicamento}
                </td>

                <td className="py-2 pr-2 text-[#435875]">
                  {fila.fecha}
                </td>

                <td className="py-2">
                  <span
                    className={`
                      whitespace-nowrap rounded-full
                      px-2 py-1 text-[10px]
                      font-extrabold
                      ${estilosEstado[fila.estado]}
                    `}
                  >
                    {fila.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

// =========================================
// DASHBOARD DEL PACIENTE
// =========================================

export default async function DashboardHomePage() {
  const usuario = await getCurrentUserServer();

  const primerNombre =
    usuario?.nombreCompleto.trim().split(/\s+/)[0] ?? "";

  // DATOS SIMULADOS DEL MÓDULO DE NOTIFICACIONES

  const fechaInicial = Date.now();

  const notificaciones =
    generarNotificacionesMock(fechaInicial);

  const notificacionesSinLeer =
    notificaciones.filter(
      (notificacion) => !notificacion.leida
    ).length;

  return (
    <div
      className="
        flex min-h-full flex-col gap-3
        bg-[#F5F9FF] p-3
        lg:h-full lg:min-h-0 lg:overflow-y-auto
        2xl:justify-between
      "
    >
      {/* ENCABEZADO PRINCIPAL */}

      <Banner nombre={primerNombre} />

      {/* ESTADÍSTICAS */}

      <Estadisticas
        notificacionesSinLeer={notificacionesSinLeer}
      />

      {/* CONTENIDO PRINCIPAL */}

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">

        {/* COLUMNA PRINCIPAL */}

        <div className="flex min-w-0 flex-col gap-3">
          <Seguimiento />

          <div className="grid gap-3 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
            <MedicamentosRecientes />

            <HistorialReservas />
          </div>
        </div>

        {/* COLUMNA LATERAL */}

        <div className="flex min-w-0 flex-col gap-3">
          <NotificacionesRecientes
            notificaciones={notificaciones}
            fechaInicial={fechaInicial}
          />

          <FarmaciaReserva />
        </div>
      </div>
    </div>
  );
}