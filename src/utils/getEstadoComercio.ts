export const getEstadoComercio = (horarios: any) => {
  // Verificamos que el objeto 'horarios' no sea nulo ni indefinido
  if (!horarios || !horarios.horarios) {
    return 'cerrado'; // Si no hay horarios o no está definida la estructura de días, consideramos el comercio cerrado
  }

  // Obtener la hora actual en Colombia
  const colombiaTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Bogota',
  });
  const currentDate = new Date(colombiaTime);
  const diaSemana = currentDate.getDay(); // 0: domingo, 1: lunes, ..., 6: sábado
  const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const today = dias[diaSemana];

  console.log(`Hoy es: ${today}`); // Verificamos el día actual

  // Accedemos a los horarios dentro de la estructura
  const horario = horarios.horarios[today];

  // Verificamos que el horario para el día actual no sea nulo ni indefinido
  if (!horario) {
    console.log(`No hay horario para el día ${today}`);
    return 'cerrado'; // Si no hay horario para ese día, lo consideramos cerrado
  }

  // Si alguno de los horarios es "CERRADO", directamente devolvemos "cerrado"
  if (horario.apertura === 'CERRADO' || horario.cierre === 'CERRADO') {
    console.log(`${today}: El comercio está cerrado.`);
    return 'cerrado';
  }

  // Si los horarios no están marcados como "CERRADO", procedemos a comprobar la hora
  const apertura = convertToDate(horario.apertura);
  const cierre = convertToDate(horario.cierre);

  console.log(`Apertura: ${apertura}, Cierre: ${cierre}, Hora actual: ${currentDate}`);

  // Comprobamos si la hora actual está entre la apertura y cierre
  if (currentDate >= apertura && currentDate <= cierre) {
    console.log(`${today}: El comercio está abierto.`);
    return 'abierto';
  } else {
    console.log(`${today}: El comercio está cerrado.`);
    return 'cerrado';
  }
};

// Convertir hora en formato de 12 horas a Date
const convertToDate = (hora: string): Date => {
  // Si la hora es "CERRADO", no necesitamos convertir nada
  if (hora === 'CERRADO') {
    return new Date(); // Retornamos una fecha que no impacte la comparación
  }

  const [time, modifier] = hora.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  const date = new Date();
  date.setHours(modifier === 'AM' ? hours : hours + 12, minutes, 0, 0);

  return date;
};
