
import Link from "next/link";
import { Inter } from "next/font/google";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Eye,
  Pill,
  RefreshCw,
  XCircle,
  Activity,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { getCurrentUserServer } from "@/lib/auth/get-current-user.server";

const titleFont = Inter({ subsets: ["latin"], weight: ["700", "800"] });

/* =====================================================
   DATOS DE EJEMPLO (MOCK)
   ===================================================== */

const STATS = [
  {
    value: 3,
    label: "Reservas activas",
    icon: CalendarDays,
    bg: "bg-gradient-to-br from-[#DDF4FF] to-[#D8E7FF]",
    fg: "text-[#0875E8]",
  },
  {
    value: 12,
    label: "Reservas en el historial",
    icon: Clock,
    bg: "bg-gradient-to-br from-[#D9F8F7] to-[#D0F1F3]",
    fg: "text-[#00A6A6]",
  },
  {
    value: 5,
    label: "Medicamentos guardados",
    icon: Pill,
    bg: "bg-gradient-to-br from-[#F0E8FF] to-[#E7DFFF]",
    fg: "text-[#8052E8]",
  },
  {
    value: 2,
    label: "Recordatorios de retiro",
    icon: Bell,
    bg: "bg-gradient-to-br from-[#FFF4D9] to-[#FFEBC2]",
    fg: "text-[#E58A00]",
  },
];

const TRACKING_STEPS = [
  { label: "Reserva creada", time: "Hoy, 10:15 a. m.", state: "done" },
  { label: "Confirmada", time: "Hoy, 10:20 a. m.", state: "done" },
  { label: "Lista para retiro", time: "", state: "current" },
  { label: "Retirada", time: "", state: "pending" },
] as const;

const RECENT_MEDS = [
  { name: "Ibuprofeno 400 mg", seen: "Consultado hoy" },
  { name: "Loratadina 10 mg", seen: "Consultado ayer" },
  { name: "Omeprazol 20 mg", seen: "Consultado hace 3 días" },
];

const HISTORY = [
  {
    id: "RS-10426",
    med: "Loratadina 10 mg",
    date: "18 nov, 10:00 a. m.",
    status: "Completada",
  },
  {
    id: "RS-10425",
    med: "Ibuprofeno 400 mg",
    date: "15 nov, 2:30 p. m.",
    status: "Completada",
  },
  {
    id: "RS-10424",
    med: "Omeprazol 20 mg",
    date: "10 nov, 11:00 a. m.",
    status: "Cancelada",
  },
];

const ACTIVITY = [
  {
    title: "Reserva confirmada",
    detail: "Hoy, 10:20 a. m.",
    color: "bg-[#16A34A]",
  },
  {
    title: "Medicamento consultado",
    detail: "Hoy, 10:05 a. m.",
    color: "bg-[#0875E8]",
  },
  {
    title: "Recordatorio creado",
    detail: "Ayer, 4:30 p. m.",
    color: "bg-[#9333EA]",
  },
];

const STATUS_STYLE: Record<string, string> = {
  Completada: "bg-[#D7F8E3] text-[#087443]",
  Cancelada: "bg-[#FFE0E2] text-[#C62828]",
};

/* =====================================================
   ESTILOS REUTILIZABLES
   ===================================================== */

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075CE5]";

const BTN_PRIMARY = `inline-flex items-center justify-center gap-2 rounded-full border-2 border-transparent bg-gradient-to-r from-[#0755E8] to-[#0787F5] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(7,85,232,0.22)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105 ${FOCUS}`;

const BTN_OUTLINE = `inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#2878ED] bg-white px-5 py-2.5 text-sm font-bold text-[#0755C8] transition duration-200 hover:-translate-y-0.5 hover:bg-[#EEF6FF] ${FOCUS}`;

/* =====================================================
   COMPONENTES BASE
   ===================================================== */

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`min-w-0 rounded-[24px] border border-[#D6E5FA] bg-white p-4 shadow-[0_8px_24px_rgba(28,83,160,0.075)] sm:p-5 ${className}`}
    >
      {children}
    </section>
  );
}

function CardHeader({
  icon: Icon,
  title,
  action,
}: {
  icon: LucideIcon;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2
        className={`${titleFont.className} flex min-w-0 items-center gap-2.5 text-base font-extrabold leading-snug text-[#10285C] sm:text-lg`}
      >
        <Icon
          size={21}
          className="shrink-0 text-[#0875E8]"
          aria-hidden="true"
        />
        {title}
      </h2>
      {action}
    </div>
  );
}

function IconBubble({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E0F5FF] to-[#E3EDFF] text-[#0875E8]"
    >
      <Icon size={19} />
    </span>
  );
}

function SeeAll({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className={`flex shrink-0 items-center gap-1 rounded-full text-sm font-bold text-[#0755D8] transition hover:gap-2 hover:text-[#00A6B5] ${FOCUS}`}
    >
      Ver todo
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}

/* =====================================================
   BIENVENIDA
   ===================================================== */

function Welcome({ firstName }: { firstName: string }) {
  return (
    <section
      aria-labelledby="bienvenida"
      className="relative isolate min-h-[190px] overflow-hidden rounded-[26px] bg-gradient-to-r from-[#0649D8] via-[#0876E9] to-[#24B9E8] px-6 py-6 text-white shadow-[0_14px_32px_rgba(5,91,210,0.22)] sm:min-h-[202px] sm:px-10 sm:py-7"
    >
      {/* Ondas decorativas */}

      <svg
        aria-hidden="true"
        viewBox="0 0 1200 240"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      >
        <path
          d="M470 240C570 150 590 45 760 65c135 16 158 115 280 86 68-16 102-58 160-82v171H470Z"
          fill="#36BCEB"
          fillOpacity=".55"
        />

        <path
          d="M650 240c70-65 95-112 210-112 105 0 146 70 240 44 52-14 75-42 130-72v140H650Z"
          fill="#73D8F2"
          fillOpacity=".28"
        />

        <path
          d="M0 0h620c-80 34-120 95-245 91C230 87 155 36 0 75V0Z"
          fill="#063FC2"
          fillOpacity=".22"
        />

        <circle
          cx="1090"
          cy="140"
          r="112"
          fill="none"
          stroke="white"
          strokeOpacity=".2"
        />
      </svg>

      {/* Ilustración médica */}

      <svg
        aria-hidden="true"
        viewBox="0 0 340 210"
        className="pointer-events-none absolute -bottom-1 right-3 hidden h-[96%] w-auto sm:block lg:right-8"
      >
        <defs>
          <linearGradient id="bottleBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#D8F3FF" />
          </linearGradient>

          <linearGradient id="blueCap" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#65C9FF" />
            <stop offset="1" stopColor="#0752D9" />
          </linearGradient>

          <linearGradient id="capsuleBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset=".5" stopColor="#EAF8FF" />
            <stop offset=".51" stopColor="#27BCEB" />
            <stop offset="1" stopColor="#0874E8" />
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

        {/* Hojas */}

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

        <path
          d="M218 170c3-37 9-67 18-101"
          fill="none"
          stroke="#078F91"
          strokeWidth="3"
        />

        {/* Frasco */}

        <rect
          x="125"
          y="42"
          width="112"
          height="28"
          rx="8"
          fill="url(#blueCap)"
        />

        <path
          d="M137 66h88v12c0 7 10 11 10 22v76c0 12-9 19-20 19h-68c-12 0-20-7-20-19v-76c0-11 10-15 10-22V66Z"
          fill="url(#bottleBody)"
        />

        <path
          d="M137 67h88v9h-88z"
          fill="#B9E8FF"
        />

        <path
          d="M178 111h14v16h16v14h-16v16h-14v-16h-16v-14h16z"
          fill="#0875E8"
        />

        <path
          d="M145 91v70"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeOpacity=".75"
        />

        {/* Cápsula grande */}

        <g transform="translate(45 151) rotate(-27)">
          <rect
            width="82"
            height="34"
            rx="17"
            fill="url(#capsuleBlue)"
          />

          <path
            d="M41 1h24a16 16 0 0 1 0 32H41Z"
            fill="#0A6FE4"
            fillOpacity=".8"
          />

          <path
            d="M41 2v30"
            stroke="#B9E9FF"
            strokeWidth="2"
          />
        </g>

        {/* Cápsula pequeña */}

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

          <path
            d="M27 2v20"
            stroke="#B6E9F7"
            strokeWidth="2"
          />
        </g>

        {/* Destellos */}

        <path
          d="M84 55l-11-10M104 42l-5-15M65 78H48"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity=".8"
        />
      </svg>

      {/* Texto de bienvenida */}

      <div className="relative z-10 max-w-[620px] sm:max-w-[58%]">
        <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#C9F5FF]">
          FarmaSync · Tu salud más cerca
        </p>

        <h1
          id="bienvenida"
          className={`${titleFont.className} text-2xl font-extrabold tracking-tight sm:text-[2rem] lg:text-[2.2rem]`}
        >
          ¡Hola{firstName ? `, ${firstName}` : ""}!
          <span aria-hidden="true"> 👋</span>
        </h1>

        <p className="mt-2 max-w-[540px] text-sm leading-5 text-white/95 sm:text-base sm:leading-6">
          Gestiona tus reservas, consulta la disponibilidad de medicamentos
          y realiza el seguimiento de tus retiros.
        </p>

        <Link
          href="/medicamentos"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-[#0755D8] shadow-[0_8px_20px_rgba(0,35,130,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#EAF7FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Buscar medicamentos
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

/* =====================================================
   ESTADÍSTICAS
   ===================================================== */

function Stats() {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map(({ value, label, icon: Icon, bg, fg }) => (
        <li
          key={label}
          className={`group flex min-h-[88px] items-center gap-4 rounded-[21px] border border-white/70 px-4 py-3 shadow-[0_5px_18px_rgba(37,91,160,0.045)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(37,91,160,0.1)] ${bg}`}
        >
          <span
            aria-hidden="true"
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/85 shadow-sm ${fg}`}
          >
            <Icon size={25} strokeWidth={2.2} />
          </span>

          <span className="leading-tight">
            <span
              className={`${titleFont.className} block text-[1.75rem] font-extrabold text-[#10285C]`}
            >
              {value}
            </span>

            <span className="block text-[0.82rem] font-medium text-[#344766]">
              {label}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/* =====================================================
   RESERVA EN SEGUIMIENTO
   ===================================================== */

function Tracking() {
  return (
    <Card className="h-full">
      <CardHeader
        icon={Pill}
        title="Reserva en seguimiento"
        action={
          <span className="shrink-0 rounded-full bg-[#DDF3FF] px-3 py-1 text-xs font-extrabold text-[#0755D8]">
            En proceso
          </span>
        }
      />

      <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-center">
        {/* Medicamento */}

        <div className="flex items-center gap-4 lg:w-[42%]">
          <div
            aria-hidden="true"
            className="flex h-[82px] w-[88px] shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#DDF5FF] to-[#D8E8FF] text-[#0875E8]"
          >
            <Pill size={39} strokeWidth={2.2} />
          </div>

          <div className="min-w-0">
            <p className="font-extrabold text-[#10285C]">
              Acetaminofén 500 mg
            </p>

            <p className="mt-0.5 text-sm text-[#4A5B78]">
              Reserva #RS-10427
            </p>

            <p className="mt-1.5 flex items-center gap-1.5 text-sm font-bold text-[#17366F]">
              <CalendarDays
                size={16}
                aria-hidden="true"
                className="shrink-0 text-[#0875E8]"
              />
              Retiro: Hoy, 3:00 p. m.
            </p>
          </div>
        </div>

        {/* Línea de progreso */}

        <ol className="grid flex-1 grid-cols-4">
          {TRACKING_STEPS.map((step, index) => {
            const isLast = index === TRACKING_STEPS.length - 1;

            return (
              <li
                key={step.label}
                className="relative flex min-w-0 flex-col items-center text-center"
              >
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 top-[14px] h-[3px] w-full ${
                      step.state === "done"
                        ? "bg-gradient-to-r from-[#0785EC] to-[#0861E6]"
                        : "bg-[#C9D6E8]"
                    }`}
                  />
                )}

                <span
                  className={`relative z-10 flex h-[29px] w-[29px] items-center justify-center rounded-full ${
                    step.state === "done"
                      ? "bg-gradient-to-br from-[#079DEB] to-[#0755E8] text-white shadow-[0_3px_8px_rgba(7,85,232,0.25)]"
                      : step.state === "current"
                        ? "border-[3px] border-[#0875E8] bg-white shadow-[0_0_0_4px_#E3F4FF]"
                        : "bg-[#D3DDEB]"
                  }`}
                >
                  {step.state === "done" && (
                    <Check
                      size={16}
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  )}
                </span>

                <span
                  className={`mt-2 text-[0.7rem] leading-tight sm:text-xs ${
                    step.state === "current"
                      ? "font-extrabold text-[#0755D8]"
                      : "font-semibold text-[#344766]"
                  }`}
                >
                  {step.label}

                  <span className="sr-only">
                    {step.state === "done"
                      ? " (completado)"
                      : step.state === "current"
                        ? " (paso actual)"
                        : " (pendiente)"}
                  </span>
                </span>

                {step.time && (
                  <span className="mt-1 text-[0.65rem] leading-tight text-[#64748B]">
                    {step.time}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Acciones */}

      <div className="mt-5 flex flex-wrap gap-2.5">
        <Link href="/reservas" className={BTN_PRIMARY}>
          <Eye size={16} aria-hidden="true" />
          Ver detalles
        </Link>

        <button type="button" className={BTN_OUTLINE}>
          <XCircle size={16} aria-hidden="true" />
          Cancelar reserva
        </button>

        <button type="button" className={BTN_OUTLINE}>
          <RefreshCw size={16} aria-hidden="true" />
          Repetir reserva
        </button>
      </div>
    </Card>
  );
}

/* =====================================================
   ACTIVIDAD RECIENTE
   ===================================================== */

function RecentActivity() {
  return (
    <Card className="h-full">
      <CardHeader icon={Activity} title="Actividad reciente" />

      <ol className="mt-5">
        {ACTIVITY.map((item, index) => (
          <li
            key={item.title}
            className="relative flex gap-3 pb-5 last:pb-0"
          >
            {index !== ACTIVITY.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[7px] top-4 h-full w-px bg-[#D8E6F7]"
              />
            )}

            <span
              className={`relative z-10 mt-1.5 h-4 w-4 shrink-0 rounded-full border-[3px] border-white ${item.color} shadow-sm`}
            />

            <span className="min-w-0 border-b border-[#E6EEF9] pb-3 last:border-0 last:pb-0">
              <span className="block text-sm font-extrabold text-[#10285C]">
                {item.title}
              </span>

              <span className="mt-0.5 block text-xs text-[#526783]">
                {item.detail}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

/* =====================================================
   MEDICAMENTOS CONSULTADOS
   ===================================================== */


function RecentMeds() {
  return (
    <Card className="h-full !p-3 sm:!p-4">
      <CardHeader
        icon={Pill}
        title="Medicamentos consultados recientemente"
      />

      <ul className="mt-2 divide-y divide-[#E5EDF8]">
        {RECENT_MEDS.map((med) => (
          <li key={med.name}>
            <Link
              href="/medicamentos"
              className={`flex items-center gap-3 rounded-xl py-2 transition hover:bg-[#F2F8FF] ${FOCUS}`}
            >
              <IconBubble icon={Pill} />

              <span className="flex-1 leading-tight">
                <span className="block text-sm font-extrabold text-[#10285C]">
                  {med.name}
                </span>

                <span className="mt-0.5 block text-xs text-[#526783]">
                  {med.seen}
                </span>
              </span>

              <ChevronRight
                size={19}
                aria-hidden="true"
                className="text-[#294B7D]"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}


/* =====================================================
   HISTORIAL DE RESERVAS
   ===================================================== */

function History() {
  return (
    <Card className="h-full">
      <CardHeader
        icon={Clock}
        title="Historial de reservas"
        action={<SeeAll href="/historial" />}
      />

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[470px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#DDE8F6] text-xs text-[#435875]">
              <th scope="col" className="py-2.5 pr-3 font-bold">
                # Reserva
              </th>

              <th scope="col" className="py-2.5 pr-3 font-bold">
                Medicamento
              </th>

              <th scope="col" className="py-2.5 pr-3 font-bold">
                Fecha de retiro
              </th>

              <th scope="col" className="py-2.5 font-bold">
                Estado
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E5EDF8] text-[#142D60]">
            {HISTORY.map((row) => (
              <tr
                key={row.id}
                className="transition hover:bg-[#F7FAFF]"
              >
                <td className="py-3 pr-3 font-bold">
                  {row.id}
                </td>

                <td className="py-3 pr-3">
                  {row.med}
                </td>

                <td className="py-3 pr-3 text-[#435875]">
                  {row.date}
                </td>

                <td className="py-3">
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-extrabold ${STATUS_STYLE[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* =====================================================
   PÁGINA PRINCIPAL DEL DASHBOARD
   ===================================================== */

export default async function DashboardHomePage() {
  const usuario = await getCurrentUserServer();

  const primerNombre =
    usuario?.nombreCompleto.trim().split(/\s+/)[0] ?? "";

  return (
    <main className="flex flex-col gap-4 bg-[#F5F9FF] p-4 sm:gap-4 sm:p-5">

      {/* Bienvenida */}

      <Welcome firstName={primerNombre} />

      {/* Estadísticas */}

      <Stats />

      {/* Seguimiento y actividad reciente */}

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
        <Tracking />
        <RecentActivity />
      </div>

      {/* Medicamentos e historial */}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <RecentMeds />
        <History />
      </div>

    </main>
  );
}
