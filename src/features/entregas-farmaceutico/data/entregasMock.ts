import { solicitudesMock } from "@/features/solicitudes-farmaceutico/data/solicitudesMock";

import type { ReservaEntrega } from "../types";

// =========================================================
// RESERVAS DE PRUEBA PARA EL MÓDULO DE ENTREGAS
// =========================================================

export const entregasMock: ReservaEntrega[] =
  solicitudesMock.map((solicitud) => ({
    ...solicitud,
    medicamento: {
      ...solicitud.medicamento,
    },
    beneficiario: {
      ...solicitud.beneficiario,
    },
    sede: {
      ...solicitud.sede,
    },
  }));