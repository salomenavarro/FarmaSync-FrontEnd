"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  CheckCircle2,
  FileText,
  MapPin,
  Pill,
  Ticket,
  UserRound,
  X,
} from "lucide-react";

import { apiClient } from "@/lib/api";
import { useCrearReserva } from "@/features/reservas/hooks/useCrearReserva";
import type { Reserva } from "@/features/reservas/types";
import { getReservasErrorMessage } from "@/features/reservas/utils/get-reservas-error-message";
import type { Medicamento, SedeFarmacia } from "../types";

interface DependienteOpcion {
  id: number;
  nombres?: string;
  apellidos?: string;
  nombreCompleto?: string;
  parentesco?: string;
}

interface CrearReservaModalProps {
  isOpen: boolean;
  medicamento: Medicamento;
  sedeInicial: SedeFarmacia;
  sedes: SedeFarmacia[];
  onCerrar: () => void;
  onReservaCreada?: (reserva: Reserva) => void;
}

// Calcula la fecha máxima permitida sumando 5 días hábiles (lunes a viernes)
// desde hoy, en formato YYYY-MM-DD para inputs tipo date.
function calcularFechaMaximaHabilIso(desde: Date = new Date()): string {
  const fecha = new Date(desde);
  let diasHabiles = 0;

  while (diasHabiles < 5) {
    fecha.setDate(fecha.getDate() + 1);
    const diaSemana = fecha.getDay();
    if (diaSemana !== 0 && diaSemana !== 6) {
      diasHabiles++;
    }
  }

  return fecha.toISOString().split("T")[0];
}

function obtenerHoyIso(): string {
  return new Date().toISOString().split("T")[0];
}

export default function CrearReservaModal({
  isOpen,
  medicamento,
  sedeInicial,
  sedes,
  onCerrar,
  onReservaCreada,
}: CrearReservaModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const sedesConStock = useMemo(() => {
    return sedes.filter((sede) => {
      const stock = medicamento.stockPorSede.find(
        (item) => item.sedeId === sede.id
      );
      return (stock?.cantidad ?? 0) > 0;
    });
  }, [sedes, medicamento.stockPorSede]);

  const sedePorDefectoId = useMemo(() => {
    const stockInicial = medicamento.stockPorSede.find(
      (item) => item.sedeId === sedeInicial.id
    );
    if ((stockInicial?.cantidad ?? 0) > 0) {
      return sedeInicial.id;
    }
    return sedesConStock[0]?.id ?? sedeInicial.id;
  }, [medicamento.stockPorSede, sedeInicial.id, sedesConStock]);

  const [sedeId, setSedeId] = useState<string>(sedePorDefectoId);
  const [beneficiarioSeleccionado, setBeneficiarioSeleccionado] =
    useState<string>("TITULAR");
  const [numeroOrdenMedica, setNumeroOrdenMedica] = useState<string>("");
  const [fechaRecogida, setFechaRecogida] = useState<string>(obtenerHoyIso());
  const [errorForm, setErrorForm] = useState<string | null>(null);
  const [reservaConfirmada, setReservaConfirmada] = useState<Reserva | null>(
    null
  );

  const crearReservaMutation = useCrearReserva();

  // Consulta opcional de integrantes del Plan Familiar para elegir beneficiario.
  const { data: dependientes = [] } = useQuery<DependienteOpcion[]>({
    queryKey: ["grupo-familiar", "dependientes-reserva"],
    queryFn: async () => {
      try {
        const res = await apiClient.get<
          DependienteOpcion[] | { data?: DependienteOpcion[] }
        >("/users/grupo-familiar");
        if (Array.isArray(res.data)) return res.data;
        if (Array.isArray(res.data?.data)) return res.data.data;
        return [];
      } catch {
        return [];
      }
    },
    enabled: isOpen,
    retry: false,
  });

  useEffect(() => {
    setSedeId(sedePorDefectoId);
    setBeneficiarioSeleccionado("TITULAR");
    setNumeroOrdenMedica("");
    setFechaRecogida(obtenerHoyIso());
    setErrorForm(null);
    setReservaConfirmada(null);
  }, [sedePorDefectoId, medicamento.id, isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const fechaMinima = obtenerHoyIso();
  const fechaMaxima = calcularFechaMaximaHabilIso();

  const stockSedeElegida =
    medicamento.stockPorSede.find((item) => item.sedeId === sedeId)
      ?.cantidad ?? 0;

  async function manejarSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorForm(null);

    const ordenLimpia = numeroOrdenMedica.trim();
    if (ordenLimpia.length < 4) {
      setErrorForm(
        "Ingresa un número de fórmula u orden médica EPS válido (mínimo 4 caracteres)."
      );
      return;
    }

    if (!sedeId) {
      setErrorForm("Selecciona una sede de retiro.");
      return;
    }

    if (stockSedeElegida <= 0) {
      setErrorForm(
        "El stock se agotó en esta sede. Elige otra sede con disponibilidad."
      );
      return;
    }

    const dependienteId =
      beneficiarioSeleccionado === "TITULAR"
        ? undefined
        : Number(beneficiarioSeleccionado);

    try {
      const creada = await crearReservaMutation.mutateAsync({
        sedeId: Number(sedeId),
        medicamentoId: Number(medicamento.id),
        ...(dependienteId ? { dependienteId } : {}),
        numeroOrdenMedica: ordenLimpia,
        fechaRecogida,
      });

      setReservaConfirmada(creada);
      onReservaCreada?.(creada);
    } catch (error) {
      setErrorForm(
        getReservasErrorMessage(
          error,
          "No se pudo completar la reserva. Verifica los datos e inténtalo de nuevo."
        )
      );
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="titulo-crear-reserva"
      onCancel={(event) => {
        event.preventDefault();
        onCerrar();
      }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-[540px] overflow-y-auto rounded-[24px] border border-[#E0E8F3] bg-white p-0 text-[#14285B] shadow-2xl backdrop:bg-[#0B1F5C]/50 backdrop:backdrop-blur-sm"
    >
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[#E0E8F3] bg-white px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FF] text-[#0755D8]">
            <Pill size={22} aria-hidden="true" />
          </div>

          <div>
            <h2
              id="titulo-crear-reserva"
              className="text-lg font-bold text-[#14285B]"
            >
              Reservar medicamento
            </h2>
            <p className="mt-0.5 text-xs text-[#64748B]">
              {medicamento.nombreGenerico} {medicamento.concentracion} ·{" "}
              {medicamento.codigo}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar ventana"
          className="cursor-pointer rounded-xl p-2 text-[#64748B] transition-colors hover:bg-[#E8F1FF] hover:text-[#0755D8]"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </header>

      <div className="p-5 sm:p-6">
        {reservaConfirmada ? (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6F7EF] text-[#047857]">
              <CheckCircle2 size={30} aria-hidden="true" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-[#14285B]">
                ¡Reserva confirmada!
              </h3>
              <p className="mt-1 text-xs text-[#64748B]">
                Presenta este código al reclamar tu medicamento en la sede.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D6E5FF] bg-[#F5F9FF] p-4">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#64748B]">
                <Ticket size={16} className="text-[#0755D8]" />
                Código de reserva
              </div>
              <p className="mt-1.5 text-2xl font-extrabold tracking-wider text-[#0755D8]">
                {reservaConfirmada.codigo}
              </p>
            </div>

            <button
              type="button"
              onClick={onCerrar}
              className="w-full cursor-pointer rounded-xl bg-[#0755D8] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0646B3]"
            >
              Listo
            </button>
          </div>
        ) : (
          <form onSubmit={manejarSubmit} className="space-y-4">
            {/* BENEFICIARIO */}
            <div>
              <label
                htmlFor="beneficiario-reserva"
                className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[#14285B]"
              >
                <UserRound size={15} className="text-[#0755D8]" />
                Beneficiario de la reserva
              </label>
              <select
                id="beneficiario-reserva"
                value={beneficiarioSeleccionado}
                onChange={(e) => setBeneficiarioSeleccionado(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#DCE4EF] bg-[#F8FAFD] px-3 text-xs font-semibold text-[#14285B] outline-none focus:border-[#0755D8] focus:bg-white"
              >
                <option value="TITULAR">Yo (Paciente titular)</option>
                {dependientes.map((dep) => {
                  const nombre =
                    dep.nombreCompleto?.trim() ||
                    [dep.nombres, dep.apellidos]
                      .filter(Boolean)
                      .join(" ")
                      .trim() ||
                    `Dependiente #${dep.id}`;
                  return (
                    <option key={dep.id} value={String(dep.id)}>
                      {nombre}
                      {dep.parentesco ? ` (${dep.parentesco})` : ""}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* SEDE DE RETIRO */}
            <div>
              <label
                htmlFor="sede-reserva"
                className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[#14285B]"
              >
                <MapPin size={15} className="text-[#0755D8]" />
                Sede de retiro
              </label>
              <select
                id="sede-reserva"
                value={sedeId}
                onChange={(e) => setSedeId(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#DCE4EF] bg-[#F8FAFD] px-3 text-xs font-semibold text-[#14285B] outline-none focus:border-[#0755D8] focus:bg-white"
              >
                {sedes.map((sede) => {
                  const cant =
                    medicamento.stockPorSede.find(
                      (item) => item.sedeId === sede.id
                    )?.cantidad ?? 0;
                  return (
                    <option key={sede.id} value={sede.id}>
                      {sede.nombre} ({cant}{" "}
                      {cant === 1 ? "unidad" : "unidades"})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* NÚMERO DE FÓRMULA / ORDEN MÉDICA */}
            <div>
              <label
                htmlFor="orden-medica-reserva"
                className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[#14285B]"
              >
                <FileText size={15} className="text-[#0755D8]" />
                Número de fórmula / orden médica EPS{" "}
                <span className="text-[#DC2626]">*</span>
              </label>
              <input
                id="orden-medica-reserva"
                type="text"
                required
                value={numeroOrdenMedica}
                onChange={(e) => setNumeroOrdenMedica(e.target.value)}
                placeholder="Ej. ORD-2026-98412"
                className="h-11 w-full rounded-xl border border-[#DCE4EF] bg-[#F8FAFD] px-3.5 text-xs text-[#14285B] outline-none placeholder:text-[#94A3B8] focus:border-[#0755D8] focus:bg-white"
              />
            </div>

            {/* FECHA DE RECOGIDA (MÁX. 5 DÍAS HÁBILES) */}
            <div>
              <label
                htmlFor="fecha-recogida-reserva"
                className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[#14285B]"
              >
                <CalendarDays size={15} className="text-[#0755D8]" />
                Fecha de recogida (máximo 5 días hábiles)
              </label>
              <input
                id="fecha-recogida-reserva"
                type="date"
                required
                min={fechaMinima}
                max={fechaMaxima}
                value={fechaRecogida}
                onChange={(e) => setFechaRecogida(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#DCE4EF] bg-[#F8FAFD] px-3.5 text-xs font-semibold text-[#14285B] outline-none focus:border-[#0755D8] focus:bg-white"
              />
            </div>

            {errorForm && (
              <div
                role="alert"
                className="rounded-xl border border-[#FADADA] bg-[#FEECEC] px-3.5 py-2.5 text-xs font-semibold text-[#B91C1C]"
              >
                {errorForm}
              </div>
            )}

            <div className="flex flex-col-reverse gap-2.5 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onCerrar}
                className="cursor-pointer rounded-xl border border-[#DCE4EF] bg-white px-4 py-2.5 text-xs font-bold text-[#475569] hover:bg-[#F1F5F9]"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={
                  crearReservaMutation.isPending || stockSedeElegida <= 0
                }
                className="cursor-pointer rounded-xl bg-[#0755D8] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0646B3] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {crearReservaMutation.isPending
                  ? "Reservando..."
                  : "Confirmar reserva"}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}