// Quita caracteres de formato y espacios invisibles, normaliza espacios y recorta.
export function limpiarTextoWhatsApp(t?: string | null): string {
  if (!t) return "";
  return String(t)
    .replace(/[\u200B-\u200D\uFEFF]/g, "") // zero-width, BOM
    .replace(/\u00A0/g, " ")               // NBSP → espacio normal
    .replace(/[*_~`>]/g, "")               // símbolos de markdown
    .replace(/\s+/g, " ")                  // colapsa espacios múltiples
    .trim();                                // quita espacios al borde
}

// Envuelve en *...* solo si hay contenido y SIN espacios adentro
export function negritaSegura(t?: string | null): string {
  const limpio = limpiarTextoWhatsApp(t);
  return limpio ? `*${limpio}*` : "";
}
