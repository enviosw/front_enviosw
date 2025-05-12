import React, { useState, useEffect } from 'react';
import { useGetHorariosComercio } from '../../services/comerciosService';
import { useActualizarHorariosComercio } from '../../services/comerciosService';

interface ComercioHorarioComponentProps {
    comercioId: number;
}

const ComercioHorario: React.FC<ComercioHorarioComponentProps> = ({ comercioId }) => {
    const { data: comercio, isLoading } = useGetHorariosComercio(comercioId);
    const { mutate: actualizarHorarios } = useActualizarHorariosComercio();

    const [horarios, setHorarios] = useState<any>({});

    useEffect(() => {
        if (comercio?.horarios?.horarios) {


            // Extraemos los horarios de la estructura correcta
            setHorarios(comercio.horarios.horarios);
        } else {
            // Si no hay horarios, inicializamos con valores vacíos
            setHorarios({
                lunes: { apertura: '', cierre: '' },
                martes: { apertura: '', cierre: '' },
                miercoles: { apertura: '', cierre: '' },
                jueves: { apertura: '', cierre: '' },
                viernes: { apertura: '', cierre: '' },
                sabado: { apertura: '', cierre: '' },
                domingo: { apertura: '', cierre: '' }
            });
        }
    }, [comercio]);

    const handleChange = (dia: string, tipo: 'apertura' | 'cierre', value: string) => {
        setHorarios((prevHorarios: any) => ({
            ...prevHorarios,
            [dia]: {
                ...prevHorarios[dia],
                [tipo]: value,
            },
        }));
    };


    // Función para actualizar los horarios
    const handleUpdateHorarios = () => {
        if (comercio) {
            actualizarHorarios({ id: comercio.id, horarios });
        }
    };

    if (isLoading) return <div>Cargando...</div>;

    return (
        <div>
            <div className="col-span-3">
                <h3 className="text-lg font-semibold">Horarios</h3>
                {['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'].map((dia) => (
                    <div key={dia} className="grid grid-cols-2 gap-2 mb-3 bg-gray-200 rounded-2xl px-2 py-1">
                        <label>{dia.charAt(0).toUpperCase() + dia.slice(1)}</label>
                        <div className="flex space-x-2 ">
                            {/* Accediendo a los valores de cada día de comercio.horarios.horarios */}
                            <input
                                value={horarios[dia]?.apertura || ''}
                                placeholder="Apertura"
                                className="input input-bordered w-full"
                                onChange={(e) => handleChange(dia, 'apertura', e.target.value)} // Actualiza apertura
                            />
                            <input
                                value={horarios[dia]?.cierre || ''}
                                placeholder="Cierre"
                                className="input input-bordered w-full"
                                onChange={(e) => handleChange(dia, 'cierre', e.target.value)} // Actualiza cierre
                            />
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleUpdateHorarios} className="btn btn-primary mt-4">Actualizar Horarios</button>
        </div>
    );
};

export default ComercioHorario;
