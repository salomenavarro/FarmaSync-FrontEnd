import Link from "next/link";
import { Inter } from "next/font/google";

import {
  ArrowRight,
  Bell,
  Boxes,
  Check,
  ClipboardList,
  Clock,
  Info,
  Package,
  Printer,
  QrCode,
  Search,
  Tag,
  TriangleAlert,
  Users,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import BannerWaves from "@/components/layout/BannerWaves";

const titleFont = Inter({
  subsets: ["latin"],
  weight: ["700", "800"],
});

// ========================================
// DATOS DE EJEMPLO
// ========================================

type NivelSla = "Verde" | "Amarillo" | "Rojo";

type Solicitud = {
  codigo: string;
  paciente: string;
  medicamento: string;
  tiempo: string;
  sla: NivelSla;
};

const semaforo: {
  nivel: NivelSla;
  cantidad: number;
  rango: string;
  detalle: string;
  icono: LucideIcon;
  fondo: string;
  circulo: string;
}[] = [
  {
    nivel: "Verde",
    cantidad: 6,
    rango: "< 1 hora",
    detalle: "Dentro del tiempo",
    icono: Check,
    fondo: "border-[#BFE6D1] bg-[#E4F6EC]",
    circulo: "bg-[#12A150] text-white",
  },
  {
    nivel: "Amarillo",
    cantidad: 3,
    rango: "1 – 2 horas",
    detalle: "Requiere atención",
    icono: Clock,
    fondo: "border-[#F6DDA6] bg-[#FFF3DC]",
    circulo: "bg-[#FFE2A3] text-[#B97700]",
  },
  {
    nivel: "Rojo",
    cantidad: 4,
    rango: "> 2 horas",
    detalle: "Alerta prioritaria",
    icono: TriangleAlert,
    fondo: "border-[#F5BDBD] bg-[#FDE8E8]",
    circulo: "bg-[#FAD0D0] text-[#C62828]",
  },
];

const solicitudes: Solicitud[] = [
  {
    codigo: "FS-8K7L",
    paciente: "María Gómez Pérez",
    medicamento: "Acetaminofén 500 mg",
    tiempo: "2 h 35 min",
    sla: "Rojo",
  },
  {
    codigo: "FS-4D9M",
    paciente: "Carlos Ramírez",
    medicamento: "Loratadina 10 mg",
    tiempo: "2 h 10 min",
    sla: "Rojo",
  },
  {
    codigo: "FS-6P2Q",
    paciente: "Ana Martínez",
    medicamento: "Ibuprofeno 400 mg",
    tiempo: "1 h 40 min",
    sla: "Amarillo",
  },
  {
    codigo: "FS-9N3V",
    paciente: "Luis Herrera",
    medicamento: "Omeprazol 20 mg",
    tiempo: "1 h 15 min",
    sla: "Amarillo",
  },
  {
    codigo: "FS-7T8X",
    paciente: "Sofía Torres",
    medicamento: "Losartán 50 mg",
    tiempo: "45 min",
    sla: "Verde",
  },
];

const estilosSla: Record<
  NivelSla,
  { pastilla: string; punto: string }
> = {
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

// ========================================
// PANEL REUTILIZABLE
// ========================================

function Panel({
  icono: Icono,
  titulo,
  descripcion,
  accion,
  children,
  className = "",
}: {
  icono: LucideIcon;
  titulo: string;
  descripcion?: string;
  accion?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`
        flex min-h-0 min-w-0 flex-col
        rounded-[22px]
        border border-[#DCE9F8]
        bg-white p-3
        shadow-[0_6px_18px_rgba(37,91,160,0.06)]
        ${className}
      `}
    >
      <div className="flex shrink-0 items-start justify-between gap-2">
        <h2
          className={`
            ${titleFont.className}
            flex min-w-0 items-center gap-2
            text-[15px] font-extrabold
            leading-snug text-[#14285B]
            2xl:text-[16px]
          `}
        >
          <Icono
            size={20}
            className="shrink-0 text-[#0755D8]"
            aria-hidden="true"
          />

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

// ========================================
// BANNER PRINCIPAL
// ========================================

function Banner({ porAlistar }: { porAlistar: number }) {
  return (
    <section
      className="
        relative isolate flex min-h-[145px]
        shrink-0 items-center
        overflow-hidden rounded-[24px]
        bg-gradient-to-r
        from-[#0B1F5C]
        via-[#0755D8]
        to-[#0876E9]
        px-5 py-4 text-white
        shadow-[0_10px_26px_rgba(5,91,210,0.16)]
        sm:px-7
      "
    >
      {/* ONDAS DECORATIVAS REUTILIZABLES */}

      <BannerWaves />

      {/* TEXTO */}

      <div className="relative z-10 max-w-[570px]">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#D1F5FF]">
          FarmaSync · Operación en farmacia
        </p>

        <h1
          className={`
            ${titleFont.className}
            mt-1 text-[25px]
            font-extrabold leading-tight
          `}
        >
          Operación en farmacia
        </h1>

        <p className="mt-1.5 text-[13px] leading-[1.45] text-white/95">
          Gestiona las reservas de tu sede, verifica las
          entregas y actualiza el inventario.
        </p>
      </div>

      {/* ILUSTRACIÓN */}

      <svg
        aria-hidden="true"
        viewBox="0 0 260 150"
        className="
          pointer-events-none absolute
          bottom-0 right-[225px]
          hidden h-[125px] w-auto
          opacity-90 xl:block
        "
      >
        <g transform="rotate(8 175 75)">
          <rect
            x="130"
            y="14"
            width="92"
            height="122"
            rx="12"
            fill="#EAF4FF"
          />

          <rect
            x="161"
            y="6"
            width="30"
            height="16"
            rx="6"
            fill="#9CCBFF"
          />

          {[34, 62, 90].map((y) => (
            <g key={y}>
              <path
                d={`m142 ${y + 4} 6 6 11-12`}
                stroke="#0869EF"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <rect
                x="168"
                y={y - 2}
                width="42"
                height="5"
                rx="2.5"
                fill="#9CCBFF"
              />

              <rect
                x="168"
                y={y + 8}
                width="30"
                height="5"
                rx="2.5"
                fill="#CFE3FA"
              />
            </g>
          ))}
        </g>

        <rect
          x="52"
          y="34"
          width="78"
          height="22"
          rx="8"
          fill="#fff"
        />

        <rect
          x="46"
          y="52"
          width="90"
          height="86"
          rx="14"
          fill="#fff"
        />

        <path
          d="M91 74h10v10h10v10H91V94H81V84h10z"
          fill="#0869EF"
        />
      </svg>

      {/* ALERTA DE ALISTAMIENTO */}

      {porAlistar > 0 && (
        <Link
          href="/farmaceutico/reservas"
          className="
            absolute right-4 top-4 z-20
            inline-flex items-center gap-2
            rounded-xl border border-[#F4A8A8]
            bg-[#FFECEC] px-3 py-2
            text-[12px] font-extrabold
            text-[#C62828]
            shadow-[0_5px_14px_rgba(120,0,0,0.12)]
            transition hover:bg-white
            sm:right-5 sm:top-5
          "
        >
          <Bell size={17} aria-hidden="true" />

          {porAlistar} por alistar
        </Link>
      )}
    </section>
  );
}

// ========================================
// SEMÁFORO SLA
// ========================================

function SemaforoSla() {
  return (
    <Panel
      icono={Clock}
      titulo="Semáforo de alistamiento (SLA)"
      className="shrink-0"
    >
      <ul className="mt-2.5 grid grid-cols-3 gap-2">
        {semaforo.map(
          ({
            nivel,
            cantidad,
            rango,
            detalle,
            icono: Icono,
            fondo,
            circulo,
          }) => (
            <li
              key={nivel}
              className={`
                flex min-w-0 items-center
                gap-2 rounded-xl border
                px-2 py-2
                2xl:px-3
                ${fondo}
              `}
            >
              <span
                aria-hidden="true"
                className={`
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-full
                  ${circulo}
                `}
              >
                <Icono size={19} strokeWidth={2.4} />
              </span>

              <span className="min-w-0 leading-tight">
                <span
                  className={`
                    ${titleFont.className}
                    block text-[22px] font-extrabold
                    text-[#14285B]
                  `}
                >
                  {cantidad}
                </span>

                <span className="block text-[12px] font-extrabold text-[#14285B]">
                  {rango}
                </span>

                <span className="block text-[10px] text-[#344766]">
                  {detalle}
                </span>

                <span className="sr-only">
                  Nivel {nivel}
                </span>
              </span>
            </li>
          )
        )}
      </ul>
    </Panel>
  );
}

// ========================================
// SOLICITUDES PENDIENTES
// ========================================

function SolicitudesPendientes() {
  return (
    <Panel
      icono={ClipboardList}
      titulo="Solicitudes pendientes de alistamiento"
      className="min-h-0 flex-1"
      accion={
        <Link
          href="/farmaceutico/reservas"
          className="inline-flex shrink-0 items-center gap-1 text-[12px] font-bold text-[#0755D8] hover:underline"
        >
          Ver todas

          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      }
    >
      <p className="mt-1 shrink-0 text-[11px] text-[#526783]">
        13 reservas pendientes · Mostrando las 5 más urgentes
      </p>

      <div className="mt-2 min-h-0 flex-1 overflow-x-auto">
        <table className="h-full w-full min-w-[610px] text-left text-[12px] text-[#14285B]">
          <thead>
            <tr className="bg-[#EEF4FC] text-[11px]">
              <th
                scope="col"
                className="rounded-l-lg px-2 py-2 font-extrabold"
              >
                Código
              </th>

              <th
                scope="col"
                className="px-2 py-2 font-extrabold"
              >
                Paciente
              </th>

              <th
                scope="col"
                className="px-2 py-2 font-extrabold"
              >
                Medicamento
              </th>

              <th
                scope="col"
                className="px-2 py-2 font-extrabold"
              >
                Tiempo
              </th>

              <th
                scope="col"
                className="px-2 py-2 font-extrabold"
              >
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
            {solicitudes.map((fila) => (
              <tr
                key={fila.codigo}
                className="border-b border-[#E5EDF8] last:border-0 hover:bg-[#F7FAFF]"
              >
                <td className="px-2 py-2 font-extrabold">
                  {fila.codigo}
                </td>

                <td className="px-2 py-2">
                  {fila.paciente}
                </td>

                <td className="px-2 py-2">
                  {fila.medicamento}
                </td>

                <td className="px-2 py-2">
                  <span
                    className={`
                      inline-block whitespace-nowrap
                      rounded-full px-2 py-1
                      text-[11px] font-extrabold
                      ${estilosSla[fila.sla].pastilla}
                    `}
                  >
                    {fila.tiempo}
                  </span>
                </td>

                <td className="px-2 py-2">
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <span
                      aria-hidden="true"
                      className={`
                        h-2 w-2 rounded-full
                        ${estilosSla[fila.sla].punto}
                      `}
                    />

                    {fila.sla}
                  </span>
                </td>

                <td className="px-2 py-2 text-center">
                  <Link
                    href={`/farmaceutico/reservas?codigo=${fila.codigo}`}
                    aria-label={`Alistar la reserva ${fila.codigo}`}
                    className={`
                      inline-flex items-center gap-1
                      rounded-lg bg-[#0755D8]
                      px-2.5 py-1.5
                      text-[11px] font-bold text-white
                      hover:bg-[#0646DC]
                      ${FOCO}
                    `}
                  >
                    <Package
                      size={14}
                      aria-hidden="true"
                    />

                    Alistar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

// ========================================
// ENTREGA EN VENTANILLA
// ========================================

function EntregaVentanilla() {
  return (
    <Panel
      icono={Users}
      titulo="Entrega en ventanilla"
      descripcion="Busca la reserva por código y verifica la fórmula física."
      className="min-h-0 flex-1 justify-between"
    >
      <form
        action="/farmaceutico/entregas"
        role="search"
        className="mt-2.5 flex flex-col gap-2 sm:flex-row"
      >
        <div className="relative min-w-0 flex-1">
          <label
            htmlFor="codigo-reserva"
            className="sr-only"
          >
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
            placeholder="Ej. FS-8K7L"
            className={`
              w-full rounded-xl border
              border-[#B9C9DE] bg-white
              py-2 pl-9 pr-2
              text-[12px] text-[#14285B]
              placeholder:text-[#526783]
              ${FOCO}
            `}
          />
        </div>

        <Link
          href="/farmaceutico/entregas"
          className={`
            inline-flex shrink-0
            items-center justify-center gap-1.5
            rounded-xl bg-[#0755D8]
            px-3 py-2 text-[12px]
            font-bold text-white
            hover:bg-[#0646DC]
            ${FOCO}
          `}
        >
          <QrCode size={17} aria-hidden="true" />

          Escanear QR
        </Link>
      </form>

      <p className="mt-2 flex items-start gap-2 rounded-lg bg-[#E8F1FD] px-3 py-2 text-[11px] text-[#14285B]">
        <Info
          size={15}
          className="shrink-0 text-[#0755D8]"
          aria-hidden="true"
        />

        Confirma la entrega después de validar la fórmula.
      </p>
    </Panel>
  );
}

// ========================================
// ALISTAMIENTO Y ETIQUETADO
// ========================================

function AlistamientoEtiquetado() {
  return (
    <Panel
      icono={Printer}
      titulo="Alistamiento y etiquetado"
      descripcion="Prepara el medicamento y genera su identificación."
      className="min-h-0 flex-1 justify-between"
    >
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <Link
          href="/farmaceutico/reservas"
          className={`
            flex min-h-[56px] items-center
            justify-center gap-2 rounded-xl
            border border-[#8ABBF6]
            bg-[#E5F1FF] px-2 py-2
            text-center text-[11px]
            font-extrabold text-[#0755D8]
            transition hover:bg-[#D8E8FF]
            ${FOCO}
          `}
        >
          <Printer
            size={20}
            className="shrink-0"
            aria-hidden="true"
          />

          <span>Imprimir tirilla POS</span>
        </Link>

        <Link
          href="/farmaceutico/reservas"
          className={`
            flex min-h-[56px] items-center
            justify-center gap-2 rounded-xl
            border border-[#C7D3E3]
            bg-[#F3F6FA] px-2 py-2
            text-center text-[11px]
            font-extrabold text-[#14285B]
            transition hover:bg-[#E9EEF5]
            ${FOCO}
          `}
        >
          <Tag
            size={20}
            className="shrink-0"
            aria-hidden="true"
          />

          <span>Etiquetado manual</span>
        </Link>
      </div>
    </Panel>
  );
}

// ========================================
// INVENTARIO
// ========================================

function IngresoInventario() {
  return (
    <Panel
      icono={Boxes}
      titulo="Ingreso y ajuste de inventario"
      descripcion="Registra lotes, códigos EAN-13 y actualiza existencias."
      className="min-h-0 flex-1 justify-between"
    >
      <Link
        href="/farmaceutico/inventario"
        className={`
          mt-2.5 inline-flex w-full
          items-center justify-between
          rounded-xl border border-[#B9D7FC]
          bg-[#EAF3FF] px-3 py-2.5
          text-[12px] font-extrabold
          text-[#0755D8]
          transition hover:bg-[#DCEBFF]
          ${FOCO}
        `}
      >
        <span>Gestionar inventario</span>

        <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </Panel>
  );
}

// ========================================
// DASHBOARD FARMACÉUTICO
// ========================================

export default function FarmaceuticoDashboardPage() {
  const porAlistar =
    semaforo.find((item) => item.nivel === "Rojo")
      ?.cantidad ?? 0;

  return (
    <div
      className="
        flex min-h-dvh flex-col
        gap-3 bg-[#F5F9FF] p-3
        lg:h-dvh lg:min-h-0
        lg:overflow-hidden
      "
    >
      <Banner porAlistar={porAlistar} />

      <div
        className="
          grid min-h-0 flex-1
          gap-3
          xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]
          xl:items-stretch
        "
      >
        {/* COLUMNA IZQUIERDA */}

        <div className="flex min-h-0 min-w-0 flex-col gap-3">
          <SemaforoSla />

          <SolicitudesPendientes />
        </div>

        {/* COLUMNA DERECHA */}

        <div className="grid min-h-0 min-w-0 grid-rows-3 gap-3">
          <EntregaVentanilla />

          <AlistamientoEtiquetado />

          <IngresoInventario />
        </div>
      </div>
    </div>
  );
}