import React, { useState, useRef, useEffect } from 'react';
import InputField from '../../../../shared/components/InputField';
import { FaCheckCircle, FaEdit } from 'react-icons/fa';

interface PagosFormProps {
    tipoString: string;
}

type FormDataKeys = 'direccionRecogidaPago' | 'telefonoRecogidaPago';

const PagosForm: React.FC<PagosFormProps> = ({ tipoString }) => {
    const [formData, setFormData] = useState({
        direccionRecogidaPago: '',
        telefonoRecogidaPago: '',
    });

    const [completed, setCompleted] = useState({
        direccionRecogidaPago: false,
        telefonoRecogidaPago: false,
    });

    const [showTelefono, setShowTelefono] = useState(false);

    const direccionInputRef = useRef<HTMLInputElement | null>(null);
    const telefonoInputRef = useRef<HTMLInputElement | null>(null);

    // ✅ Focus al primer input al cargar
    useEffect(() => {
        if (tipoString === 'pagos') {
            direccionInputRef.current?.focus();
        }
    }, [tipoString]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirm = (field: FormDataKeys) => {
        if (formData[field]) {
            setCompleted(prev => ({ ...prev, [field]: true }));

            if (field === 'direccionRecogidaPago') {
                setShowTelefono(true);
                setTimeout(() => telefonoInputRef.current?.focus(), 100);
            }
        }
    };

    const handleEdit = (field: FormDataKeys) => {
        setCompleted(prev => ({ ...prev, [field]: false }));

        setTimeout(() => {
            if (field === 'direccionRecogidaPago') direccionInputRef.current?.focus();
            else if (field === 'telefonoRecogidaPago') telefonoInputRef.current?.focus();
        }, 100);
    };

    const handleSubmit = () => {
        const numeroWhatsApp = '3134089563';

        const mensaje = `💰¡Hola! Me gustaría solicitar el servicio de pagos:\n\n` +
            `🛵📍Dirección de Recogida: ${formData.direccionRecogidaPago}\n` +
            `📞 Teléfono: ${formData.telefonoRecogidaPago}`;

        const url = `https://wa.me/57${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    };

    if (tipoString !== 'pagos') return null;

    const buttonColor = (completed: boolean) => completed ? 'bg-green-500' : 'bg-[#ff6600]';

    return (
        <div className='w-full pb-5'>
            <h2 className="text-2xl text-left font-bold mb-4">Trámite de Pagos 💰</h2>
            <form className="flex flex-col gap-6 w-full items-center justify-center">
                <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mx-auto'>

                    {/* Dirección de Recogida */}
                    <div className="flex justify-between items-center gap-2 w-full">
                        <InputField
                            label="Dirección de Recogida"
                            name="direccionRecogidaPago"
                            value={formData.direccionRecogidaPago}
                            onChange={handleChange}
                            placeholder="¿Dónde recogemos el dinero?"
                            ref={direccionInputRef}
                        />
                        <button
                            type="button"
                            className={`btn btn-lg btn-circle text-2xl text-white ${buttonColor(completed.direccionRecogidaPago)}`}
                            onClick={() =>
                                completed.direccionRecogidaPago
                                    ? handleEdit('direccionRecogidaPago')
                                    : handleConfirm('direccionRecogidaPago')
                            }
                        >
                            {completed.direccionRecogidaPago ? <FaEdit /> : <FaCheckCircle />}
                        </button>
                    </div>

                    {/* Teléfono */}
                    {showTelefono && (
                        <div className="flex justify-between items-center gap-2 w-full">
                            <InputField
                                label="Teléfono"
                                name="telefonoRecogidaPago"
                                value={formData.telefonoRecogidaPago}
                                onChange={handleChange}
                                placeholder="Teléfono contacto"
                                ref={telefonoInputRef}
                            />
                            <button
                                type="button"
                                className={`btn btn-lg btn-circle text-2xl text-white ${buttonColor(completed.telefonoRecogidaPago)}`}
                                onClick={() =>
                                    completed.telefonoRecogidaPago
                                        ? handleEdit('telefonoRecogidaPago')
                                        : handleConfirm('telefonoRecogidaPago')
                                }
                            >
                                {completed.telefonoRecogidaPago ? <FaEdit /> : <FaCheckCircle />}
                            </button>
                        </div>
                    )}
                </div>

                {(completed.direccionRecogidaPago && completed.telefonoRecogidaPago) && (
                    <button
                        type="button"
                        className="bg-green-500 text-white p-3 w-full rounded-md mt-4"
                        onClick={handleSubmit}
                    >
                        Confirmar Servicio
                    </button>
                )}
            </form>
        </div>
    );
};

export default PagosForm;
