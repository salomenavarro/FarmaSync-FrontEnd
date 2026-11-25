import type { Notificacion } from "../types";

// Genera fechas relativas para los datos de prueba.
function generarFecha(
  referencia: number,
  minutos: number
): string {
  return new Date(referencia + minutos * 60000).toISOString();
}

export function generarNotificacionesMock(
  ahora: number = Date.now()
): Notificacion[] {
  return [
    {
      id: "NOT-001",
      tipo: "CONFIRMACION_RESERVA",
      categoria: "RESERVA",
      prioridad: "INFORMATIVA",
      titulo: "¡Tu reserva ha sido confirmada!",
      mensaje:
        "Tu reserva FS-8K7L de Acetaminofén 500 mg ha sido confirmada en la sede Medellín Centro. Consulta el plazo establecido para realizar el retiro.",
      fechaCreacion: generarFecha(ahora, -10),
      leida: false,
      reservaId: "1",
      codigoReserva: "FS-8K7L",
      medicamentoNombre: "Acetaminofén 500 mg",
      sedeNombre: "Medellín Centro",
      fechaVencimiento: generarFecha(ahora, 2880),
    },
    {
      id: "NOT-002",
      tipo: "MEDICAMENTO_LISTO",
      categoria: "MEDICAMENTO",
      prioridad: "IMPORTANTE",
      titulo: "¡Tu medicamento está listo!",
      mensaje:
        "Tu paquete de Losartán 50 mg ha sido rotulado y está listo para retirar en la sede Laureles. Presenta tu código de reserva al llegar.",
      fechaCreacion: generarFecha(ahora, -30),
      leida: false,
      reservaId: "2",
      codigoReserva: "FS-3M9P",
      medicamentoNombre: "Losartán 50 mg",
      sedeNombre: "Laureles",
      fechaVencimiento: generarFecha(ahora, 1440),
    },
    {
      id: "NOT-003",
      tipo: "VENCIMIENTO_2H",
      categoria: "RESERVA",
      prioridad: "URGENTE",
      titulo: "Tu reserva vence en menos de 2 horas",
      mensaje:
        "La reserva FS-5A2B de Omeprazol 20 mg está próxima a vencer. Realiza el retiro antes del plazo establecido para evitar la liberación del stock.",
      fechaCreacion: generarFecha(ahora, -45),
      leida: false,
      reservaId: "3",
      codigoReserva: "FS-5A2B",
      medicamentoNombre: "Omeprazol 20 mg",
      sedeNombre: "Belén",
      fechaVencimiento: generarFecha(ahora, 75),
    },
    {
      id: "NOT-004",
      tipo: "INCONSISTENCIA_LOTE",
      categoria: "INCIDENCIA",
      prioridad: "URGENTE",
      titulo: "Incidencia detectada en tu reserva",
      mensaje:
        "La farmacia detectó una inconsistencia en el lote de Amoxicilina 500 mg. Tu reserva FS-7C4D fue cancelada y el stock reservado fue liberado. Puedes consultar otras sedes disponibles.",
      fechaCreacion: generarFecha(ahora, -120),
      leida: false,
      reservaId: "4",
      codigoReserva: "FS-7C4D",
      medicamentoNombre: "Amoxicilina 500 mg",
      sedeNombre: "Medellín Centro",
    },
    {
      id: "NOT-005",
      tipo: "REABASTECIMIENTO",
      categoria: "MEDICAMENTO",
      prioridad: "IMPORTANTE",
      titulo: "¡Tu medicamento vuelve a estar disponible!",
      mensaje:
        "La Metformina 850 mg, para la cual activaste una alerta de disponibilidad, cuenta nuevamente con stock en la sede Laureles. Consulta su disponibilidad actual.",
      fechaCreacion: generarFecha(ahora, -180),
      leida: false,
      medicamentoNombre: "Metformina 850 mg",
      sedeNombre: "Laureles",
    },
    {
      id: "NOT-006",
      tipo: "RETRASO_ALISTAMIENTO",
      categoria: "INCIDENCIA",
      prioridad: "IMPORTANTE",
      titulo: "Retraso en el alistamiento de tu medicamento",
      mensaje:
        "El alistamiento de tu reserva FS-9H3K está tomando más tiempo del habitual. Te notificaremos cuando tu paquete esté listo para retirar.",
      fechaCreacion: generarFecha(ahora, -360),
      leida: false,
      reservaId: "5",
      codigoReserva: "FS-9H3K",
      medicamentoNombre: "Loratadina 10 mg",
      sedeNombre: "Belén",
    },
    {
      id: "NOT-007",
      tipo: "PRORROGA",
      categoria: "RESERVA",
      prioridad: "INFORMATIVA",
      titulo: "Tu reserva ha sido prorrogada",
      mensaje:
        "La reserva FS-2R6T ha recibido una extensión de 24 horas. Consulta la nueva fecha límite para retirar tu medicamento.",
      fechaCreacion: generarFecha(ahora, -1500),
      leida: true,
      fechaLectura: generarFecha(ahora, -1470),
      reservaId: "6",
      codigoReserva: "FS-2R6T",
      medicamentoNombre: "Enalapril 10 mg",
      sedeNombre: "Laureles",
      fechaVencimiento: generarFecha(ahora, 600),
    },
    {
      id: "NOT-008",
      tipo: "VENCIMIENTO_24H",
      categoria: "RESERVA",
      prioridad: "IMPORTANTE",
      titulo: "Recordatorio de vencimiento de reserva",
      mensaje:
        "Te recordamos que faltan 24 horas para el vencimiento de tu reserva FS-5A2B. Organiza el retiro de tu medicamento dentro del plazo establecido.",
      fechaCreacion: generarFecha(ahora, -1365),
      leida: true,
      fechaLectura: generarFecha(ahora, -1335),
      reservaId: "3",
      codigoReserva: "FS-5A2B",
      medicamentoNombre: "Omeprazol 20 mg",
      sedeNombre: "Belén",
      fechaVencimiento: generarFecha(ahora, 75),
    },
    {
      id: "NOT-009",
      tipo: "EXPIRACION",
      categoria: "RESERVA",
      prioridad: "IMPORTANTE",
      titulo: "Tu reserva ha vencido",
      mensaje:
        "El plazo de retiro de la reserva FS-6N8W ha finalizado. Las unidades reservadas fueron liberadas. Puedes consultar nuevamente la disponibilidad del medicamento.",
      fechaCreacion: generarFecha(ahora, -2880),
      leida: true,
      fechaLectura: generarFecha(ahora, -2820),
      reservaId: "7",
      codigoReserva: "FS-6N8W",
      medicamentoNombre: "Ibuprofeno 400 mg",
      sedeNombre: "Medellín Centro",
      fechaVencimiento: generarFecha(ahora, -2880),
    },
    {
      id: "NOT-010",
      tipo: "CANCELACION_FARMACIA",
      categoria: "INCIDENCIA",
      prioridad: "URGENTE",
      titulo: "Reserva cancelada por la farmacia",
      mensaje:
        "La farmacia identificó que el empaque físico del medicamento asociado a la reserva FS-4J7Q se encontraba deteriorado. La reserva fue cancelada. Consulta otras sedes con disponibilidad.",
      fechaCreacion: generarFecha(ahora, -4320),
      leida: true,
      fechaLectura: generarFecha(ahora, -4260),
      reservaId: "8",
      codigoReserva: "FS-4J7Q",
      medicamentoNombre: "Cetirizina 10 mg",
      sedeNombre: "Belén",
    },
  ];
}