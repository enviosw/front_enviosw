export function limpiarTextoWhatsApp(texto: string) {
    return texto.replace(/[*_~`>]/g, ''); // Elimina caracteres conflictivos de Markdown
}
