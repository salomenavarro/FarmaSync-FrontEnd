// Coincide con el seed de la migración (0001_init_auth_module):
// 1=paciente, 2=cuidador, 3=farmaceutico, 4=administrador_eps.
// Si en el futuro los roles se vuelven dinámicos (tabla consultable
// desde el frontend), esto se reemplaza por esa consulta.
const ROLE_LABELS: Record<number, string> = {
  1: "Paciente",
  2: "Cuidador",
  3: "Farmacéutico",
  4: "Administrador EPS",
};

export function getRoleLabel(roleId: number): string {
  return ROLE_LABELS[roleId] ?? "Usuario";
}
