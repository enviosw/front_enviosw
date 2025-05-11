import React, { useState, useRef } from 'react';
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

    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1); // Controla qué campo se muestra

    const descripcionTramiteRef = useRef<HTMLInputElement | null>(null);
    const direccionEntregaRef = useRef<HTMLInputElement | null>(null);
    const telefonoEntregaRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirm = (field: FormDataKeys) => {
        if (formData[field]) {
            setCompleted(prev => ({ ...prev, [field]: true }));
            if (field === 'descripcionTramite') {
                setCurrentStep(2); // Muestra el siguiente campo (Dirección de Entrega)
            } else if (field === 'direccionEntrega') {
                setCurrentStep(3); // Muestra el siguiente campo (Teléfono de Entrega)
            }
        }
    };

    const handleEdit = (field: FormDataKeys) => {
        setCompleted(prev => ({ ...prev, [field]: false }));

        // Enfocar el campo correspondiente cuando se edite
        if (field === 'descripcionTramite' && descripcionTramiteRef.current) {
            descripcionTramiteRef.current.focus();
        } else if (field === 'direccionEntrega' && direccionEntregaRef.current) {
            direccionEntregaRef.current.focus();
        } else if (field === 'telefonoEntrega' && telefonoEntregaRef.current) {
            telefonoEntregaRef.current.focus();
        }
    };

    const handleSubmit = () => {
        const numeroWhatsApp = '3232205900'; // Cambia por el número real del negocio

        // Construir el mensaje con la información del formulario
        const mensaje = `📦 ¡Hola! Me gustaría realizar un trámite:\n\n` +
            `🔧 Descripción del Trámite: ${formData.descripcionTramite}\n` +
            `📍 Dirección de Entrega: ${formData.direccionEntrega}\n` +
            `📞 Teléfono de Entrega: ${formData.telefonoEntrega}`;

        // Crear la URL de WhatsApp
        const url = `https://wa.me/57${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

        // Abrir el enlace en una nueva pestaña
        window.open(url, '_blank');
    };

    if (tipoString !== 'envios') return null;

    return (
        <div className='w-full pb-5'>
            <h2 className="text-2xl text-left font-bold mb-4">Envios 🖥</h2>
            <form className="flex flex-col w-full">
                {/* Descripción del Trámite */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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
                            className="btn btn-lg btn-circle text-2xl bg-[#ff6600] text-white"
                            onClick={() => {
                                if (completed.descripcionTramite) {
                                    handleEdit('descripcionTramite');
                                } else {
                                    handleConfirm('descripcionTramite');
                                }
                            }}
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
                                className="btn btn-lg btn-circle text-2xl bg-[#ff6600] text-white"
                                onClick={() => {
                                    if (completed.direccionEntrega) {
                                        handleEdit('direccionEntrega');
                                    } else {
                                        handleConfirm('direccionEntrega');
                                    }
                                }}
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
                                className="btn btn-lg btn-circle text-2xl bg-[#ff6600] text-white"
                                onClick={() => {
                                    if (completed.telefonoEntrega) {
                                        handleEdit('telefonoEntrega');
                                    } else {
                                        handleConfirm('telefonoEntrega');
                                    }
                                }}
                            >
                                {completed.telefonoEntrega ? <FaEdit /> : <FaCheckCircle />}
                            </button>
                        </div>
                    )}
                </div>

                {/* Botón de Enviar */}
                {(currentStep === 3 && completed.telefonoEntrega) && (
                    <button
                        type="button"
                        className="bg-green-500 text-white p-3 w-full rounded-md"
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
