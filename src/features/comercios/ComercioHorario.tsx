import React, { useEffect, useState } from 'react';
import { useGetHorariosComercio, useActualizarHorariosComercio } from '../../services/comerciosService';

interface DiaHorario {
    apertura: string;
    cierre: string;
    cerrado: boolean;
}

type Horarios = {
    [dia in 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo']: DiaHorario;
};

const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'] as const;

const ComercioHorario: React.FC<{ comercioId: number }> = ({ comercioId }) => {
    const { data: comercio, isLoading } = useGetHorariosComercio(comercioId);
    const { mutate: actualizarHorarios } = useActualizarHorariosComercio();

    console.log(comercio)
    const [horarios, setHorarios] = useState<Horarios>(() =>
        Object.fromEntries(
            diasSemana.map((dia) => [dia, { apertura: '', cierre: '', cerrado: false }])
        ) as Horarios
    );
    useEffect(() => {
        const datos = comercio?.horarios?.horarios;

        if (Array.isArray(datos)) {
            const nuevosHorarios = { ...horarios };

            diasSemana.forEach((dia) => {
                const horarioDia = datos.find((h) => h.dia === dia);
                const apertura = horarioDia?.apertura || '';
                const cierre = horarioDia?.cierre || '';
                nuevosHorarios[dia] = {
                    apertura,
                    cierre,
                    cerrado: !apertura && !cierre,
                };
            });

            setHorarios(nuevosHorarios);
        } else {
            console.warn('⚠️ El campo horarios.horarios no es un array:', datos);
        }
    }, [comercio]);




    const convertirHora12 = (hora24: string) => {
        if (!hora24) return '';
        const [h, m] = hora24.split(':');
        const hora = parseInt(h);
        const ampm = hora >= 12 ? 'PM' : 'AM';
        const hora12 = hora % 12 || 12;
        return `${hora12.toString().padStart(2, '0')}:${m} ${ampm}`;
    };

    const convertirHora24 = (hora12: string) => {
        const [horaMin, ampm] = hora12.split(' ');
        if (!horaMin || !ampm) return '';
        let [h, m] = horaMin.split(':');
        let hora = parseInt(h);
        if (ampm === 'PM' && hora < 12) hora += 12;
        if (ampm === 'AM' && hora === 12) hora = 0;
        return `${hora.toString().padStart(2, '0')}:${m}`;
    };

    const handleChange = (dia: string, tipo: 'apertura' | 'cierre', value: string) => {
        const formatoAMPM = convertirHora12(value);
        setHorarios((prev: any) => ({
            ...prev,
            [dia]: {
                ...prev[dia],
                [tipo]: formatoAMPM,
                cerrado: false,
            },
        }));
    };

    const toggleCerrado = (dia: string) => {
        setHorarios((prev: any) => ({
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
                        apertura: horarios[dia].apertura,
                        cierre: horarios[dia].cierre,
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
                <div key={dia} className="grid grid-cols-3 gap-2 mb-3 bg-gray-100 p-3 rounded-xl items-center">
                    <label className="font-medium capitalize">{dia}</label>
                    {horarios[dia].cerrado ? (
                        <div className="col-span-1 text-red-500 font-semibold">CERRADO</div>
                    ) : (
                        <div className="flex space-x-2">
                            <input
                                type="time"
                                className="input input-bordered"
                                value={
                                    horarios[dia].apertura
                                        ? convertirHora24(horarios[dia].apertura)
                                        : ''
                                }
                                onChange={(e) => handleChange(dia, 'apertura', e.target.value)}
                            />
                            <input
                                type="time"
                                className="input input-bordered"
                                value={
                                    horarios[dia].cierre
                                        ? convertirHora24(horarios[dia].cierre)
                                        : ''
                                }
                                onChange={(e) => handleChange(dia, 'cierre', e.target.value)}
                            />
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
