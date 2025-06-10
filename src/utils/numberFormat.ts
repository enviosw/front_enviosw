import numeral from 'numeral';

/**
 * Formatea un número agregando puntos como separador de miles.
 * Ej: 1234567 => "1.234.567"
 */
export const formatMiles = (value: number | string): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0';
  return numeral(num).format('0,0').replace(/,/g, '.'); // convierte comas a puntos
};

/**
 * Desformatea un número con puntos a un valor numérico.
 * Ej: "1.234.567" => 1234567
 */
export const unformatMiles = (formatted: string): number => {
  const plain = formatted.replace(/\./g, ''); // elimina los puntos
  return Number(plain);
};
