// Enmascara un número de documento dejando visibles únicamente los últimos 4
// caracteres para proteger datos sensibles en la vista de tarjeta.
export function ocultarDocumento(documento: string): string {
  const limpio = documento.trim();
  if (!limpio) return "****";
  return `****${limpio.slice(-4)}`;
}