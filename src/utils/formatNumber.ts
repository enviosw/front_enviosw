export const formatNumber = (value: number | string): string => {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
  
    if (isNaN(value)) return '0';
  
    return value.toLocaleString('es-CO'); // Formato colombiano: puntos para miles, coma para decimales
  };
  