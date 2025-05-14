import React, { useState, useRef, useEffect } from 'react';
import InputField from '../../../../shared/components/InputField';
import { FaCheckCircle, FaEdit } from 'react-icons/fa';

interface TramitesFormProps {
    tipoString: string;
}

type FormDataKeys = 'descripcionTramite' | 'direccionEntrega' | 'telefonoEntrega';

const TramitesForm: React.FC<TramitesFormProps> = ({ tipoString }) => {
    const [formData, setFormData] = useState({
        descripcionTramite: '',
        direccionEntrega: '',
        telefonoEntrega: '',
    });

    const [completed, setCompleted] = useState({
        descripcionTramite: false,
        direccionEntrega: false,
        telefonoEntrega: false,
    });

    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

    const descripcionTramiteRef = useRef<HTMLInputElement | null>(null);
    const direccionEntregaRef = useRef<HTMLInputElement | null>(null);
    const telefonoEntregaRef = useRef<HTMLInputElement | null>(null);

    // ✅ Focus al primer input al cargar
    useEffect(() => {
        if (tipoString === 'envios') {
            descripcionTramiteRef.current?.focus();
        }
    }, [tipoString]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirm = (field: FormDataKeys) => {
        if (formData[field]) {
            setCompleted(prev => ({ ...prev, [field]: true }));

            if (field === 'descripcionTramite') {
                setCurrentStep(2);
                setTimeout(() => direccionEntregaRef.current?.focus(), 100);
            } else if (field === 'direccionEntrega') {
                setCurrentStep(3);
                setTimeout(() => telefonoEntregaRef.current?.focus(), 100);
            }
        }
    };

    const handleEdit = (field: FormDataKeys) => {
        setCompleted(prev => ({ ...prev, [field]: false }));

        setTimeout(() => {
            if (field === 'descripcionTramite') descripcionTramiteRef.current?.focus();
            else if (field === 'direccionEntrega') direccionEntregaRef.current?.focus();
            else if (field === 'telefonoEntrega') telefonoEntregaRef.current?.focus();
        }, 100);
    };

    const handleSubmit = () => {
        const numeroWhatsApp = '3232205900';

        const mensaje = `📦 ¡Hola! Me gustaría realizar un trámite:\n\n` +
            `🔧 Descripción del Trámite: ${formData.descripcionTramite}\n` +
            `📍 Dirección de Entrega: ${formData.direccionEntrega}\n` +
            `📞 Teléfono de Entrega: ${formData.telefonoEntrega}`;

        const url = `https://wa.me/57${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    };

    if (tipoString !== 'envios') return null;

    const buttonColor = (completed: boolean) => completed ? 'bg-green-500' : 'bg-[#ff6600]';

    return (
        <div className='w-full pb-5'>
            <h2 className="text-2xl text-left font-bold mb-4">Envios 🖥</h2>
            <form className="flex flex-col w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

                    {/* Descripción del Trámite */}
                    <div className="flex justify-between items-center gap-2 w-full">
                        <InputField
                            label="Descripción del Trámite"
                            name="descripcionTramite"
                            value={formData.descripcionTramite}
                            onChange={handleChange}
                            placeholder="Explica el trámite que necesitas"
                            ref={descripcionTramiteRef}
                        />
                        <button
                            type="button"
                            className={`btn btn-lg btn-circle text-2xl text-white ${buttonColor(completed.descripcionTramite)}`}
                            onClick={() =>
                                completed.descripcionTramite
                                    ? handleEdit('descripcionTramite')
                                    : handleConfirm('descripcionTramite')
                            }
                        >
                            {completed.descripcionTramite ? <FaEdit /> : <FaCheckCircle />}
                        </button>
                    </div>

                    {/* Dirección de Entrega */}
                    {(currentStep >= 2) && (
                        <div className="flex justify-between items-center gap-2 w-full">
                            <InputField
                                label="Dirección de Entrega"
                                name="direccionEntrega"
                                value={formData.direccionEntrega}
                                onChange={handleChange}
                                placeholder="Dirección final"
                                ref={direccionEntregaRef}
                            />
                            <button
                                type="button"
                                className={`btn btn-lg btn-circle text-2xl text-white ${buttonColor(completed.direccionEntrega)}`}
                                onClick={() =>
                                    completed.direccionEntrega
                                        ? handleEdit('direccionEntrega')
                                        : handleConfirm('direccionEntrega')
                                }
                            >
                                {completed.direccionEntrega ? <FaEdit /> : <FaCheckCircle />}
                            </button>
                        </div>
                    )}

                    {/* Teléfono de Entrega */}
                    {(currentStep >= 3) && completed.direccionEntrega && (
                        <div className="flex justify-between items-center gap-2 w-full">
                            <InputField
                                label="Teléfono de Entrega"
                                name="telefonoEntrega"
                                value={formData.telefonoEntrega}
                                onChange={handleChange}
                                placeholder="Teléfono de contacto"
                                ref={telefonoEntregaRef}
                            />
                            <button
                                type="button"
                                className={`btn btn-lg btn-circle text-2xl text-white ${buttonColor(completed.telefonoEntrega)}`}
                                onClick={() =>
                                    completed.telefonoEntrega
                                        ? handleEdit('telefonoEntrega')
                                        : handleConfirm('telefonoEntrega')
                                }
                            >
                                {completed.telefonoEntrega ? <FaEdit /> : <FaCheckCircle />}
                            </button>
                        </div>
                    )}
                </div>

                {(currentStep === 3 && completed.telefonoEntrega) && (
                    <button
                        type="button"
                        className="bg-green-500 text-white p-3 w-full rounded-md mt-4"
                        onClick={handleSubmit}
                    >
                        Confirmar Envío
                    </button>
                )}
            </form>
        </div>
    );
};

export default TramitesForm;
