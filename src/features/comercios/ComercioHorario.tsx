import React, { useEffect, useState } from 'react';
import { useGetHorariosComercio, useActualizarHorariosComercio } from '../../services/comerciosService';

interface DiaHorario {
  apertura: string;
  cierre: string;
  cerrado: boolean;
}

type Horarios = {
  lunes: DiaHorario;
  martes: DiaHorario;
  miercoles: DiaHorario;
  jueves: DiaHorario;
  viernes: DiaHorario;
  sabado: DiaHorario;
  domingo: DiaHorario;
};

const diasSemana = [
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
  'domingo',
] as const;

type DiaSemana = typeof diasSemana[number];

const ComercioHorario: React.FC<{ comercioId: number }> = ({ comercioId }) => {
  const { data: comercio, isLoading } = useGetHorariosComercio(comercioId);
  const { mutate: actualizarHorarios } = useActualizarHorariosComercio();

  const [horarios, setHorarios] = useState<Horarios>(() =>
    Object.fromEntries(
      diasSemana.map((dia) => [dia, { apertura: '', cierre: '', cerrado: false }])
    ) as Horarios
  );

  const convertirHora24 = (hora12: string) => {
    const [horaMin, ampm] = hora12.split(' ');
    if (!horaMin || !ampm) return '';
    let [h, m] = horaMin.split(':');
    let hora = parseInt(h);
    if (ampm === 'PM' && hora < 12) hora += 12;
    if (ampm === 'AM' && hora === 12) hora = 0;
    return `${hora.toString().padStart(2, '0')}:${m}`;
  };

  const convertirHora12 = (hora24: string) => {
    if (!hora24) return '';
    const [h, m] = hora24.split(':');
    const hora = parseInt(h);
    const ampm = hora >= 12 ? 'PM' : 'AM';
    const hora12 = hora % 12 || 12;
    return `${hora12.toString().padStart(2, '0')}:${m} ${ampm}`;
  };

  useEffect(() => {
    const horariosApi = comercio?.horarios?.horarios;

    if (!horariosApi) return;

    const nuevosHorarios = { ...horarios };

    if (Array.isArray(horariosApi)) {
      diasSemana.forEach((dia) => {
        const horarioDia = horariosApi.find((h: any) => h.dia === dia);
        const apertura = horarioDia?.apertura ? convertirHora24(horarioDia.apertura) : '';
        const cierre = horarioDia?.cierre ? convertirHora24(horarioDia.cierre) : '';
        nuevosHorarios[dia] = {
          apertura,
          cierre,
          cerrado: !apertura && !cierre,
        };
      });
    } else if (typeof horariosApi === 'object') {
      diasSemana.forEach((dia) => {
        const horarioDia = horariosApi[dia];
        const apertura = horarioDia?.apertura ? convertirHora24(horarioDia.apertura) : '';
        const cierre = horarioDia?.cierre ? convertirHora24(horarioDia.cierre) : '';
        nuevosHorarios[dia] = {
          apertura,
          cierre,
          cerrado: !apertura && !cierre,
        };
      });
    }

    setHorarios(nuevosHorarios);
  }, [comercio]);

  const handleChange = (dia: DiaSemana, tipo: 'apertura' | 'cierre', value: string) => {
    setHorarios((prev) => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [tipo]: value,
        cerrado: false,
      },
    }));
  };

  const limpiarCampo = (dia: DiaSemana, tipo: 'apertura' | 'cierre') => {
    setHorarios((prev) => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [tipo]: '',
        cerrado: !prev[dia].apertura && !prev[dia].cierre,
      },
    }));
  };

  const toggleCerrado = (dia: DiaSemana) => {
    setHorarios((prev) => ({
      ...prev,
      [dia]: {
        apertura: '',
        cierre: '',
        cerrado: !prev[dia].cerrado,
      },
    }));
  };

  const handleUpdateHorarios = () => {
    const data = {
      id: comercio.id,
      horarios: diasSemana.map((dia) => ({
        dia,
        ...(horarios[dia].cerrado
          ? { apertura: '', cierre: '' }
          : {
              apertura: convertirHora12(horarios[dia].apertura),
              cierre: convertirHora12(horarios[dia].cierre),
            }),
      })),
    };
    actualizarHorarios(data);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      <h3 className="text-lg font-semibold">Horarios</h3>
      {diasSemana.map((dia) => (
        <div
          key={dia}
          className="grid grid-cols-3 gap-2 mb-3 bg-gray-100 p-3 rounded-xl items-center"
        >
          <label className="font-medium capitalize">{dia}</label>
          {horarios[dia].cerrado ? (
            <div className="col-span-1 text-red-500 font-semibold">CERRADO</div>
          ) : (
            <div className="flex gap-2 items-center">
              <div className="relative">
                <input
                  type="time"
                  className="input input-bordered pr-6"
                  value={horarios[dia].apertura}
                  onChange={(e) => handleChange(dia, 'apertura', e.target.value)}
                />
                {horarios[dia].apertura && (
                  <button
                    type="button"
                    className="absolute top-1 right-1 text-xs text-gray-400 hover:text-red-500"
                    onClick={() => limpiarCampo(dia, 'apertura')}
                  >
                    ❌
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="time"
                  className="input input-bordered pr-6"
                  value={horarios[dia].cierre}
                  onChange={(e) => handleChange(dia, 'cierre', e.target.value)}
                />
                {horarios[dia].cierre && (
                  <button
                    type="button"
                    className="absolute top-1 right-1 text-xs text-gray-400 hover:text-red-500"
                    onClick={() => limpiarCampo(dia, 'cierre')}
                  >
                    ❌
                  </button>
                )}
              </div>
            </div>
          )}
          <div className="text-right">
            <label className="cursor-pointer label justify-end">
              <span className="label-text text-sm">Cerrado</span>
              <input
                type="checkbox"
                className="ml-2 toggle toggle-sm"
                checked={horarios[dia].cerrado}
                onChange={() => toggleCerrado(dia)}
              />
            </label>
          </div>
        </div>
      ))}
      <button onClick={handleUpdateHorarios} className="btn btn-primary mt-4">
        Guardar horarios
      </button>
    </div>
  );
};

export default ComercioHorario;
