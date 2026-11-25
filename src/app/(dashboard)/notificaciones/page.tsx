import NotificacionesView from "@/features/notificaciones/components/NotificacionesView";

import { generarNotificacionesMock } from "@/features/notificaciones/data/notificacionesMock";

export const dynamic = "force-dynamic";

export default function NotificacionesPage() {
  const fechaInicial = Date.now();

  const notificacionesIniciales =
    generarNotificacionesMock(fechaInicial);

  return (
    <NotificacionesView
      notificacionesIniciales={notificacionesIniciales}
      fechaInicial={fechaInicial}
    />
  );
}