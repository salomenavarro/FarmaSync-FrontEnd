import type {
  SedeFarmacia,
  Farmaceutico,
  IndicadoresDashboard,
  AlertaStock,
  DemandaMedicamentos,
  EfectividadReservas,
} from "../types";

// =========================================================
// SEDES DE FARMACIA
// =========================================================

export const sedesMock: SedeFarmacia[] = [
  {
    id: 1,
    nombre: "Sede Centro",
    direccion: "Centro de Medellín",
    ciudad: "Medellín",
    activa: true,
  },
  {
    id: 2,
    nombre: "Sede Belén",
    direccion: "Belén",
    ciudad: "Medellín",
    activa: true,
  },
  {
    id: 3,
    nombre: "Sede Laureles",
    direccion: "Laureles",
    ciudad: "Medellín",
    activa: true,
  },
  {
    id: 4,
    nombre: "Sede Envigado",
    direccion: "Zona centro",
    ciudad: "Envigado",
    activa: true,
  },
  {
    id: 5,
    nombre: "Sede Sabaneta",
    direccion: "Zona centro",
    ciudad: "Sabaneta",
    activa: true,
  },
  {
    id: 6,
    nombre: "Sede Robledo",
    direccion: "Robledo",
    ciudad: "Medellín",
    activa: true,
  },
  {
    id: 7,
    nombre: "Sede Itagüí",
    direccion: "Zona centro",
    ciudad: "Itagüí",
    activa: true,
  },
  {
    id: 8,
    nombre: "Sede Poblado",
    direccion: "El Poblado",
    ciudad: "Medellín",
    activa: true,
  },
];

// =========================================================
// FARMACÉUTICOS
// =========================================================

export const farmaceuticosMock: Farmaceutico[] = [
  {
    id: 1,
    nombres: "María",
    apellidos: "Gómez",
    numeroDocumento: "1000000001",
    correo: "maria.gomez@example.com",
    telefono: "3000000001",
    sedeId: 1,
    estado: "ACTIVO",
    fechaCreacion: "2026-11-01",
  },
  {
    id: 2,
    nombres: "Carlos",
    apellidos: "Pérez",
    numeroDocumento: "1000000002",
    correo: "carlos.perez@example.com",
    telefono: "3000000002",
    sedeId: 2,
    estado: "ACTIVO",
    fechaCreacion: "2026-11-02",
  },
  {
    id: 3,
    nombres: "Laura",
    apellidos: "Martínez",
    numeroDocumento: "1000000003",
    correo: "laura.martinez@example.com",
    telefono: "3000000003",
    sedeId: 3,
    estado: "INACTIVO",
    fechaCreacion: "2026-11-03",
  },
  {
    id: 4,
    nombres: "Andrés",
    apellidos: "Ramírez",
    numeroDocumento: "1000000004",
    correo: "andres.ramirez@example.com",
    telefono: "3000000004",
    sedeId: 4,
    estado: "ACTIVO",
    fechaCreacion: "2026-11-04",
  },
  {
    id: 5,
    nombres: "Valentina",
    apellidos: "Restrepo",
    numeroDocumento: "1000000005",
    correo: "valentina.restrepo@example.com",
    telefono: "3000000005",
    sedeId: 5,
    estado: "ACTIVO",
    fechaCreacion: "2026-11-05",
  },
  {
    id: 6,
    nombres: "Daniel",
    apellidos: "Morales",
    numeroDocumento: "1000000006",
    correo: "daniel.morales@example.com",
    telefono: "3000000006",
    sedeId: 6,
    estado: "ACTIVO",
    fechaCreacion: "2026-11-06",
  },
];

// =========================================================
// ALERTAS DE DESABASTECIMIENTO
// =========================================================

export const alertasStockMock: AlertaStock[] = [
  {
    id: 1,
    medicamento: "Losartán 50 mg",
    sedeId: 1,
    unidadesDisponibles: 0,
    nivel: "CRITICO",
  },
  {
    id: 2,
    medicamento: "Metformina 850 mg",
    sedeId: 2,
    unidadesDisponibles: 6,
    nivel: "BAJO",
  },
  {
    id: 3,
    medicamento: "Omeprazol 20 mg",
    sedeId: 3,
    unidadesDisponibles: 0,
    nivel: "CRITICO",
  },
  {
    id: 4,
    medicamento: "Acetaminofén 500 mg",
    sedeId: 4,
    unidadesDisponibles: 12,
    nivel: "BAJO",
  },
  {
    id: 5,
    medicamento: "Amoxicilina 500 mg",
    sedeId: 5,
    unidadesDisponibles: 3,
    nivel: "BAJO",
  },
  {
    id: 6,
    medicamento: "Atorvastatina 20 mg",
    sedeId: 6,
    unidadesDisponibles: 0,
    nivel: "CRITICO",
  },
];

// =========================================================
// EFECTIVIDAD DE RESERVAS
// =========================================================

export const efectividadReservasMock: EfectividadReservas = {
  totalReservas: 1246,
  reservasEntregadas: 1146,
  reservasNoEfectuadas: 100,
};

// =========================================================
// INDICADORES DEL DASHBOARD
// =========================================================

export const indicadoresMock: IndicadoresDashboard = {
  farmaceuticosActivos: farmaceuticosMock.filter(
    (farmaceutico) => farmaceutico.estado === "ACTIVO"
  ).length,

  sedesRegistradas: sedesMock.length,

  reservasTotales: efectividadReservasMock.totalReservas,

  medicamentosEnAlerta: alertasStockMock.length,
};

// =========================================================
// DEMANDA DE MEDICAMENTOS POR SEDE
// =========================================================

export const demandaMock: DemandaMedicamentos[] = [
  // SEDE CENTRO

  { fecha: "2026-11-16", sedeId: 1, cantidadSolicitudes: 42 },
  { fecha: "2026-11-17", sedeId: 1, cantidadSolicitudes: 65 },
  { fecha: "2026-11-18", sedeId: 1, cantidadSolicitudes: 53 },
  { fecha: "2026-11-19", sedeId: 1, cantidadSolicitudes: 85 },
  { fecha: "2026-11-20", sedeId: 1, cantidadSolicitudes: 72 },
  { fecha: "2026-11-21", sedeId: 1, cantidadSolicitudes: 98 },
  { fecha: "2026-11-22", sedeId: 1, cantidadSolicitudes: 89 },

  // SEDE BELÉN

  { fecha: "2026-11-16", sedeId: 2, cantidadSolicitudes: 30 },
  { fecha: "2026-11-17", sedeId: 2, cantidadSolicitudes: 45 },
  { fecha: "2026-11-18", sedeId: 2, cantidadSolicitudes: 38 },
  { fecha: "2026-11-19", sedeId: 2, cantidadSolicitudes: 60 },
  { fecha: "2026-11-20", sedeId: 2, cantidadSolicitudes: 51 },
  { fecha: "2026-11-21", sedeId: 2, cantidadSolicitudes: 75 },
  { fecha: "2026-11-22", sedeId: 2, cantidadSolicitudes: 68 },

  // SEDE LAURELES

  { fecha: "2026-11-16", sedeId: 3, cantidadSolicitudes: 20 },
  { fecha: "2026-11-17", sedeId: 3, cantidadSolicitudes: 32 },
  { fecha: "2026-11-18", sedeId: 3, cantidadSolicitudes: 28 },
  { fecha: "2026-11-19", sedeId: 3, cantidadSolicitudes: 42 },
  { fecha: "2026-11-20", sedeId: 3, cantidadSolicitudes: 38 },
  { fecha: "2026-11-21", sedeId: 3, cantidadSolicitudes: 56 },
  { fecha: "2026-11-22", sedeId: 3, cantidadSolicitudes: 49 },
];