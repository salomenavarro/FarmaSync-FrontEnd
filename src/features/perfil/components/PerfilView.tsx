"use client";

import { useState } from "react";

import PerfilHeader from "./PerfilHeader";
import PerfilTabs from "./PerfilTabs";
import DatosPersonalesView from "./DatosPersonalesView";
import EditarPerfilForm from "./EditarPerfilForm";
import SeguridadView from "./SeguridadView";
import CambiarPasswordForm from "./CambiarPasswordForm";

import type { PerfilPaciente, SeccionPerfil } from "../types";

interface PerfilViewProps {
  perfil: PerfilPaciente;
  seccionInicial?: SeccionPerfil;
}

export default function PerfilView({
  perfil,
  seccionInicial = "datos-personales",
}: PerfilViewProps) {
  const [seccionActiva, setSeccionActiva] =
    useState<SeccionPerfil>(seccionInicial);

  const [editandoPerfil, setEditandoPerfil] =
    useState(false);

  const [cambiandoPassword, setCambiandoPassword] =
    useState(false);

  // Cambiar de sección y cerrar los formularios abiertos.
  function cambiarSeccion(seccion: SeccionPerfil) {
    if (seccion === seccionActiva) return;

    setSeccionActiva(seccion);
    setEditandoPerfil(false);
    setCambiandoPassword(false);
  }

  return (
    <div className="min-h-full min-w-0 bg-[#F5F9FF] p-3">
      <div className="mx-auto w-full space-y-3">

        {/* Encabezado del módulo */}
        <PerfilHeader />

        {/* Navegación entre secciones */}
        <PerfilTabs
          seccionActiva={seccionActiva}
          onChange={cambiarSeccion}
        />

        {/* Sección de datos personales */}
        {seccionActiva === "datos-personales" && (
          <>
            {editandoPerfil ? (
              <EditarPerfilForm
                perfil={perfil}
                onCancelar={() => setEditandoPerfil(false)}
              />
            ) : (
              <DatosPersonalesView
                perfil={perfil}
                onEditar={() => setEditandoPerfil(true)}
              />
            )}
          </>
        )}

        {/* Sección de seguridad */}
        {seccionActiva === "seguridad" && (
          <>
            {cambiandoPassword ? (
              <CambiarPasswordForm
                onCancelar={() =>
                  setCambiandoPassword(false)
                }
              />
            ) : (
              <SeguridadView
                onCambiarPassword={() =>
                  setCambiandoPassword(true)
                }
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}