import type { Reserva, IndicadoresReservas } from "../types";

// Generar fechas relativas para las pruebas
function generarFecha(dias: number, hora = 16): string {
  const fecha = new Date();

  fecha.setDate(fecha.getDate() + dias);
  fecha.setHours(hora, 0, 0, 0);

  return fecha.toISOString();
}

// Beneficiarios simulados
const titular = {
  id: 1,
  nombreCompleto: "María Fernanda Gómez",
  tipo: "TITULAR" as const,
};

const dependiente = {
  id: 2,
  nombreCompleto: "Samuel Gómez",
  tipo: "DEPENDIENTE" as const,
};

// Sedes de farmacia simuladas
const sedeCentro = {
  id: 1,
  nombre: "Sede Centro",
  direccion: "Calle 52 # 48-35",
  ciudad: "Medellín",
  horario: "Lunes a sábado, 8:00 a. m. - 6:00 p. m.",
};

const sedeBelen = {
  id: 2,
  nombre: "Sede Belén",
  direccion: "Carrera 76 # 30A-20",
  ciudad: "Medellín",
  horario: "Lunes a sábado, 8:00 a. m. - 5:00 p. m.",
};

const sedeLaureles = {
  id: 3,
  nombre: "Sede Laureles",
  direccion: "Circular 73 # 39-15",
  ciudad: "Medellín",
  horario: "Lunes a sábado, 8:00 a. m. - 6:00 p. m.",
};

// Reservas simuladas
export const reservasMock: Reserva[] = [
  {
    id: 1,
    codigo: "FS-2026-0001",
    medicamento: {
      id: 1,
      nombre: "Losartán",
      concentracion: "50 mg",
      presentacion: "Caja x 30 tabletas",
      cantidad: 1,
    },
    sede: sedeCentro,
    beneficiario: titular,
    estado: "ACTIVA",
    fechaCreacion: generarFecha(-1),
    fechaRetiro: generarFecha(1),
    fechaVencimiento: generarFecha(2, 18),
  },
  {
    id: 2,
    codigo: "FS-2026-0002",
    medicamento: {
      id: 2,
      nombre: "Metformina",
      concentracion: "850 mg",
      presentacion: "Caja x 60 tabletas",
      cantidad: 2,
    },
    sede: sedeBelen,
    beneficiario: titular,
    estado: "ACTIVA",
    fechaCreacion: generarFecha(0, 0),
    fechaRetiro: generarFecha(3),
    fechaVencimiento: generarFecha(4, 17),
  },
  {
    id: 3,
    codigo: "FS-2026-0003",
    medicamento: {
      id: 3,
      nombre: "Salbutamol",
      concentracion: "100 mcg",
      presentacion: "Inhalador x 200 dosis",
      cantidad: 1,
    },
    sede: sedeLaureles,
    beneficiario: dependiente,
    estado: "COMPLETADA",
    fechaCreacion: generarFecha(-6),
    fechaRetiro: generarFecha(-4),
    fechaVencimiento: generarFecha(-3),
    fechaEntrega: generarFecha(-4),
  },
  {
    id: 4,
    codigo: "FS-2026-0004",
    medicamento: {
      id: 4,
      nombre: "Omeprazol",
      concentracion: "20 mg",
      presentacion: "Caja x 30 cápsulas",
      cantidad: 1,
    },
    sede: sedeCentro,
    beneficiario: titular,
    estado: "CANCELADA",
    fechaCreacion: generarFecha(-8),
    fechaRetiro: generarFecha(-6),
    fechaVencimiento: generarFecha(-5),
    fechaCancelacion: generarFecha(-7),
    motivoCancelacion: "No puedo asistir a la sede.",
  },
  {
    id: 5,
    codigo: "FS-2026-0005",
    medicamento: {
      id: 5,
      nombre: "Acetaminofén",
      concentracion: "500 mg",
      presentacion: "Caja x 20 tabletas",
      cantidad: 2,
    },
    sede: sedeBelen,
    beneficiario: titular,
    estado: "COMPLETADA",
    fechaCreacion: generarFecha(-12),
    fechaRetiro: generarFecha(-10),
    fechaVencimiento: generarFecha(-9),
    fechaEntrega: generarFecha(-10),
  },
  {
    id: 6,
    codigo: "FS-2026-0006",
    medicamento: {
      id: 6,
      nombre: "Loratadina",
      concentracion: "10 mg",
      presentacion: "Caja x 10 tabletas",
      cantidad: 1,
    },
    sede: sedeLaureles,
    beneficiario: dependiente,
    estado: "VENCIDA",
    fechaCreacion: generarFecha(-10),
    fechaRetiro: generarFecha(-8),
    fechaVencimiento: generarFecha(-7),
  },
  {
    id: 7,
    codigo: "FS-2026-0007",
    medicamento: {
      id: 7,
      nombre: "Atorvastatina",
      concentracion: "20 mg",
      presentacion: "Caja x 30 tabletas",
      cantidad: 1,
    },
    sede: sedeCentro,
    beneficiario: titular,
    estado: "COMPLETADA",
    fechaCreacion: generarFecha(-18),
    fechaRetiro: generarFecha(-16),
    fechaVencimiento: generarFecha(-15),
    fechaEntrega: generarFecha(-16),
  },
  {
    id: 8,
    codigo: "FS-2026-0008",
    medicamento: {
      id: 8,
      nombre: "Amoxicilina",
      concentracion: "500 mg",
      presentacion: "Caja x 21 cápsulas",
      cantidad: 1,
    },
    sede: sedeBelen,
    beneficiario: titular,
    estado: "COMPLETADA",
    fechaCreacion: generarFecha(-22),
    fechaRetiro: generarFecha(-20),
    fechaVencimiento: generarFecha(-19),
    fechaEntrega: generarFecha(-20),
  },
];

// Calcular los indicadores según las reservas existentes
export function calcularIndicadores(
  reservas: Reserva[]
): IndicadoresReservas {
  return {
    total: reservas.length,

    activas: reservas.filter(
      (reserva) => reserva.estado === "ACTIVA"
    ).length,

    completadas: reservas.filter(
      (reserva) => reserva.estado === "COMPLETADA"
    ).length,

    canceladas: reservas.filter(
      (reserva) => reserva.estado === "CANCELADA"
    ).length,

    vencidas: reservas.filter(
      (reserva) => reserva.estado === "VENCIDA"
    ).length,
  };
}