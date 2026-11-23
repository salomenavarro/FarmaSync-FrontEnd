
import type { Medicamento, SedeFarmacia } from "../types";

// ========================================
// SEDES DE FARMACIAS
// ========================================

export const sedesFarmacias: SedeFarmacia[] = [
  {
    id: "sede-001",
    nombre: "Farmacia Centro",
    ciudad: "Medellín",
    zona: "Centro",
    direccion: "Medellín, sector Centro",
    distanciaKm: 1.2,
  },
  {
    id: "sede-002",
    nombre: "Farmacia Laureles",
    ciudad: "Medellín",
    zona: "Laureles",
    direccion: "Medellín, sector Laureles",
    distanciaKm: 3.5,
  },
  {
    id: "sede-003",
    nombre: "Farmacia Belén",
    ciudad: "Medellín",
    zona: "Belén",
    direccion: "Medellín, sector Belén",
    distanciaKm: 4.8,
  },
  {
    id: "sede-004",
    nombre: "Farmacia Envigado",
    ciudad: "Envigado",
    zona: "Centro",
    direccion: "Envigado, sector Centro",
    distanciaKm: 8.4,
  },
];

// ========================================
// CATÁLOGO DE MEDICAMENTOS
// ========================================

export const medicamentosMock: Medicamento[] = [
  {
    id: "med-001",
    codigo: "MED-001",
    nombreGenerico: "Acetaminofén",
    concentracion: "500 mg",
    presentacion: "Tabletas",
    descripcion: "Medicamento analgésico y antipirético.",
    stockPorSede: [
      { sedeId: "sede-001", cantidad: 35 },
      { sedeId: "sede-002", cantidad: 12 },
      { sedeId: "sede-003", cantidad: 0 },
      { sedeId: "sede-004", cantidad: 24 },
    ],
  },
  {
    id: "med-002",
    codigo: "MED-002",
    nombreGenerico: "Loratadina",
    concentracion: "10 mg",
    presentacion: "Tabletas",
    descripcion: "Medicamento antihistamínico.",
    stockPorSede: [
      { sedeId: "sede-001", cantidad: 8 },
      { sedeId: "sede-002", cantidad: 20 },
      { sedeId: "sede-003", cantidad: 3 },
      { sedeId: "sede-004", cantidad: 0 },
    ],
  },
  {
    id: "med-003",
    codigo: "MED-003",
    nombreGenerico: "Losartán",
    concentracion: "50 mg",
    presentacion: "Tabletas",
    descripcion: "Medicamento antihipertensivo.",
    stockPorSede: [
      { sedeId: "sede-001", cantidad: 0 },
      { sedeId: "sede-002", cantidad: 0 },
      { sedeId: "sede-003", cantidad: 18 },
      { sedeId: "sede-004", cantidad: 5 },
    ],
  },
  {
    id: "med-004",
    codigo: "MED-004",
    nombreGenerico: "Omeprazol",
    concentracion: "20 mg",
    presentacion: "Cápsulas",
    descripcion: "Medicamento que reduce la producción de ácido gástrico.",
    stockPorSede: [
      { sedeId: "sede-001", cantidad: 0 },
      { sedeId: "sede-002", cantidad: 0 },
      { sedeId: "sede-003", cantidad: 0 },
      { sedeId: "sede-004", cantidad: 0 },
    ],
  },
  {
    id: "med-005",
    codigo: "MED-005",
    nombreGenerico: "Metformina",
    concentracion: "850 mg",
    presentacion: "Tabletas",
    descripcion: "Medicamento utilizado en el tratamiento de la diabetes tipo 2.",
    stockPorSede: [
      { sedeId: "sede-001", cantidad: 17 },
      { sedeId: "sede-002", cantidad: 6 },
      { sedeId: "sede-003", cantidad: 25 },
      { sedeId: "sede-004", cantidad: 0 },
    ],
  },
];
