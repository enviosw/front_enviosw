export const getEstadoComercio = (horarios: any): 'abierto' | 'cerrado' => {
  if (!horarios || !Array.isArray(horarios.horarios)) {
    return 'cerrado';
  }

  // Hora actual en Colombia
  const colombiaTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Bogota',
  });
  const currentDate = new Date(colombiaTime);

  const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const diaSemana = currentDate.getDay(); // 0 = domingo
  const today = dias[diaSemana];

  // Buscar el horario del día actual en el array
  const horario = horarios.horarios.find((h: any) => h.dia === today);

  if (
    !horario ||
    !horario.apertura ||
    !horario.cierre ||
    horario.apertura.toLowerCase() === 'cerrado' ||
    horario.cierre.toLowerCase() === 'cerrado'
  ) {
    return 'cerrado';
  }

  const apertura = convertToDate(horario.apertura, currentDate);
  const cierre = convertToDate(horario.cierre, currentDate);

  if (currentDate >= apertura && currentDate <= cierre) {
    return 'abierto';
  } else {
    return 'cerrado';
  }
};

// Convierte hora tipo "07:00 AM" o "16:30" a un Date del día actual
const convertToDate = (hora: string, baseDate: Date): Date => {
  const date = new Date(baseDate); // usar misma fecha

  if (hora.includes('AM') || hora.includes('PM')) {
    const [time, modifier] = hora.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier.toUpperCase() === 'PM' && hours < 12) hours += 12;
    if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;
    date.setHours(hours, minutes, 0, 0);
  } else {
    const [hours, minutes] = hora.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);
  }

  return date;
};
