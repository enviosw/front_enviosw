export const formatDate = (date: string): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Mes empieza en 0
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};
