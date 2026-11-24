// =========================================================
// ESTADO DEL FARMACÉUTICO
// =========================================================

export type EstadoFarmaceutico = "ACTIVO" | "INACTIVO";

// =========================================================
// SEDES DE FARMACIA
// =========================================================

export interface SedeFarmacia {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  activa: boolean;
}

// =========================================================
// FARMACÉUTICOS
// =========================================================

export interface Farmaceutico {
  id: number;
  nombres: string;
  apellidos: string;
  numeroDocumento: string;
  correo: string;
  telefono: string;
  sedeId: number;
  estado: EstadoFarmaceutico;
  fechaCreacion: string;
}

// =========================================================
// FORMULARIO DE CREACIÓN Y EDICIÓN
// =========================================================

export interface FarmaceuticoFormData {
  nombres: string;
  apellidos: string;
  numeroDocumento: string;
  correo: string;
  telefono: string;
  sedeId: number;
  estado: EstadoFarmaceutico;
}

// =========================================================
// INDICADORES DEL DASHBOARD
// =========================================================

export interface IndicadoresDashboard {
  farmaceuticosActivos: number;
  sedesRegistradas: number;
  reservasTotales: number;
  medicamentosEnAlerta: number;
}

// =========================================================
// ALERTAS DE DESABASTECIMIENTO
// =========================================================

export type NivelAlerta = "CRITICO" | "BAJO";

export interface AlertaStock {
  id: number;
  medicamento: string;
  sedeId: number;
  unidadesDisponibles: number;
  nivel: NivelAlerta;
}

// =========================================================
// DEMANDA DE MEDICAMENTOS
// =========================================================

export interface DemandaMedicamentos {
  fecha: string;
  sedeId: number;
  cantidadSolicitudes: number;
}

// =========================================================
// EFECTIVIDAD DE RESERVAS
// =========================================================

export interface EfectividadReservas {
  totalReservas: number;
  reservasEntregadas: number;
  reservasNoEfectuadas: number;
}