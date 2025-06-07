import React, { useState, useEffect } from 'react';
import { useGetHorariosComercio, useActualizarHorariosComercio } from '../../services/comerciosService';
import { AiOutlineClose } from 'react-icons/ai';

interface ComercioHorarioComponentProps {
    comercioId: number;
}

type DiaSemana = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

type Horario = {
    dia: DiaSemana;
    apertura: string;
    cierre: string;
};

type HorarioDia = {
    apertura: string;
    cierre: string;
};

type HorariosComercio = Record<DiaSemana, HorarioDia>;

const formatoHorarioRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$|^CERRADO$/;

const esHorarioValido = (valor: string, tipo: 'apertura' | 'cierre'): boolean => {
    const val = valor.trim().toUpperCase();
    if (val === 'CERRADO') return true;
    if (!formatoHorarioRegex.test(val)) return false;
    if (tipo === 'apertura' && !val.endsWith('AM')) return false;
    if (tipo === 'cierre' && !val.endsWith('PM')) return false;
    return true;
};

const formatearValor = (valor: string, tipo: 'apertura' | 'cierre'): string => {
    let val = valor.replace(/\s/g, '').toUpperCase();
    if (val === 'CERRADO') return 'CERRADO';

    const sufijo = tipo === 'apertura' ? 'AM' : 'PM';

    if (/^\d{4}$/.test(val)) {
        const hora = val.slice(0, 2);
        const minutos = val.slice(2, 4);
        return `${hora}:${minutos} ${sufijo}`;
    }

    return val.slice(0, 8);
};

const ComercioHorario: React.FC<ComercioHorarioComponentProps> = ({ comercioId }) => {
    const { data: comercio, isLoading } = useGetHorariosComercio(comercioId);
    const { mutate: actualizarHorarios } = useActualizarHorariosComercio();

    const dias: DiaSemana[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

    const inicializarHorarios = (): HorariosComercio =>
        Object.fromEntries(dias.map(dia => [dia, { apertura: '', cierre: '' }])) as HorariosComercio;

    const inicializarErrores = (): Record<DiaSemana, { apertura: boolean; cierre: boolean }> =>
        Object.fromEntries(dias.map(dia => [dia, { apertura: false, cierre: false }])) as Record<
            DiaSemana,
            { apertura: boolean; cierre: boolean }
        >;

    const [horarios, setHorarios] = useState<HorariosComercio>(inicializarHorarios);
    const [errores, setErrores] = useState(inicializarErrores);

    useEffect(() => {
        if (Array.isArray(comercio?.horarios?.horarios)) {
            const nuevoHorario = inicializarHorarios();
            const nuevosErrores = inicializarErrores();

            for (const { dia, apertura, cierre } of comercio.horarios.horarios as Horario[]) {
                nuevoHorario[dia] = { apertura, cierre };
                nuevosErrores[dia] = {
                    apertura: !esHorarioValido(apertura, 'apertura'),
                    cierre: !esHorarioValido(cierre, 'cierre'),
                };
            }

            setHorarios(nuevoHorario);
            setErrores(nuevosErrores);
        }
    }, [comercio]);

    const handleChange = (dia: DiaSemana, tipo: 'apertura' | 'cierre', value: string) => {
        const input = formatearValor(value, tipo);

        if (input === 'CERRADO') {
            setHorarios(prev => ({
                ...prev,
                [dia]: { apertura: 'CERRADO', cierre: 'CERRADO' }
            }));
        } else {
            setHorarios(prev => ({
                ...prev,
                [dia]: { ...prev[dia], [tipo]: input }
            }));
        }
    };

    const handleBlur = (dia: DiaSemana) => {
        const apertura = horarios[dia].apertura.trim().toUpperCase();
        const cierre = horarios[dia].cierre.trim().toUpperCase();

        const aperturaInvalida = !esHorarioValido(apertura, 'apertura');
        const cierreInvalida = !esHorarioValido(cierre, 'cierre');
        const inconsistencia =
            (apertura === 'CERRADO' && cierre !== 'CERRADO') || (cierre === 'CERRADO' && apertura !== 'CERRADO');

        setErrores(prev => ({
            ...prev,
            [dia]: {
                apertura: aperturaInvalida || inconsistencia,
                cierre: cierreInvalida || inconsistencia
            }
        }));
    };

    const limpiarCampo = (dia: DiaSemana, tipo: 'apertura' | 'cierre') => {
        setHorarios(prev => ({
            ...prev,
            [dia]: { ...prev[dia], [tipo]: '' }
        }));
        setErrores(prev => ({
            ...prev,
            [dia]: { ...prev[dia], [tipo]: false }
        }));
    };

    const handleUpdateHorarios = () => {
        const nuevosErrores = inicializarErrores();
        let hayErrores = false;

        for (const dia of dias) {
            const apertura = horarios[dia].apertura.trim().toUpperCase();
            const cierre = horarios[dia].cierre.trim().toUpperCase();

            const aperturaInvalida = !esHorarioValido(apertura, 'apertura');
            const cierreInvalida = !esHorarioValido(cierre, 'cierre');
            const inconsistencia =
                (apertura === 'CERRADO' && cierre !== 'CERRADO') || (cierre === 'CERRADO' && apertura !== 'CERRADO');

            nuevosErrores[dia] = {
                apertura: aperturaInvalida || inconsistencia,
                cierre: cierreInvalida || inconsistencia
            };

            if (nuevosErrores[dia].apertura || nuevosErrores[dia].cierre) {
                hayErrores = true;
            }
        }

        setErrores(nuevosErrores);

        if (hayErrores) {
            alert('Corrige los horarios:\n- Apertura debe ser AM\n- Cierre debe ser PM\n- O ambos deben ser CERRADO.');
            return;
        }

        const horariosArray: Horario[] = dias.map(dia => ({
            dia,
            apertura: horarios[dia].apertura.trim().toUpperCase(),
            cierre: horarios[dia].cierre.trim().toUpperCase()
        }));

        if (comercio) {
            actualizarHorarios({ id: comercio.id, horarios: horariosArray });
        }
    };

    if (isLoading) return <div>Cargando...</div>;

    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Horarios</h3>
            <p className="text-sm text-gray-500 mb-4">
                Usa el formato <strong>hhmm</strong>, <code>CERRADO</code> o deja en blanco. El sistema completa <code>AM/PM</code>.
            </p>

            {dias.map(dia => (
                <div key={dia} className="bg-gray-200 rounded-2xl p-2 mb-3">
                    <label className="font-medium capitalize block mb-1">{dia}</label>
                    <div className="flex space-x-2">
                        {(['apertura', 'cierre'] as const).map(tipo => (
                            <div key={tipo} className="relative w-full">
                                <input
                                    maxLength={8}
                                    value={horarios[dia][tipo] || ''}
                                    placeholder={tipo === 'apertura' ? 'Apertura' : 'Cierre'}
                                    className={`input input-bordered w-full uppercase pr-6 ${errores[dia][tipo] ? 'border-red-500' : ''
                                        }`}
                                    onChange={e => handleChange(dia, tipo, e.target.value)}
                                    onBlur={() => handleBlur(dia)}
                                />
                                {horarios[dia][tipo] && (
                                    <button
                                        type="button"
                                        className="absolute top-1 right-1 text-xs text-gray-400 hover:text-black"
                                        onClick={() => limpiarCampo(dia, tipo)}
                                    >
                                        <AiOutlineClose size={12} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {(errores[dia].apertura || errores[dia].cierre) && (
                        <p className="text-red-500 text-xs mt-1">Formato inválido o inconsistente. Revisa ambos campos.</p>
                    )}
                </div>
            ))}

            <button onClick={handleUpdateHorarios} className="btn btn-primary mt-4">
                Actualizar Horarios
            </button>
        </div>
    );
};

export default ComercioHorario;
