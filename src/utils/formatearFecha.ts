export const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric', // Año
        month: 'numeric',
        day: 'numeric', // Día
        hour: '2-digit', // Hora en formato 12
        minute: '2-digit', // Minutos
        second: '2-digit', // Segundos
        hour12: true, // Usar formato de 12 horas
    };

    const formattedDate = new Date(date).toLocaleString('es-CO', options); // Formato en español de Colombia
    return formattedDate;
};