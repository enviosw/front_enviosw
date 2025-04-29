import React, { useState, useRef } from 'react';
import InputField from '../../../../shared/components/InputField';
import { FaCheckCircle, FaEdit } from 'react-icons/fa';

interface RecogidasFormProps {
    tipoString: string;
}

type FormDataKeys = 'direccionRecoger' | 'telefonoRecoger' | 'direccionEntrega' | 'telefonoEntrega';

const RecogidasForm: React.FC<RecogidasFormProps> = ({ tipoString }) => {
    const [formData, setFormData] = useState({
        direccionRecoger: '',
        telefonoRecoger: '',
        direccionEntrega: '',
        telefonoEntrega: '',
    });

    const [completed, setCompleted] = useState({
        direccionRecoger: false,
        telefonoRecoger: false,
        direccionEntrega: false,
        telefonoEntrega: false,
    });

    const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1); // Controla qué campo se muestra

    const direccionRecogerRef = useRef<HTMLInputElement | null>(null);
    const telefonoRecogerRef = useRef<HTMLInputElement | null>(null);
    const direccionEntregaRef = useRef<HTMLInputElement | null>(null);
    const telefonoEntregaRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirm = (field: FormDataKeys) => {
        if (formData[field]) {
            setCompleted(prev => ({ ...prev, [field]: true }));
            if (field === 'direccionRecoger') {
                setCurrentStep(2); // Muestra el siguiente campo (Teléfono de Recoger)
            } else if (field === 'telefonoRecoger') {
                setCurrentStep(3); // Muestra el siguiente campo (Dirección de Entrega)
            } else if (field === 'direccionEntrega') {
                setCurrentStep(4); // Muestra el siguiente campo (Teléfono de Entrega)
            }
        }
    };

    const handleEdit = (field: FormDataKeys) => {
        setCompleted(prev => ({ ...prev, [field]: false }));

        // Enfocar el campo correspondiente cuando se edite
        if (field === 'direccionRecoger' && direccionRecogerRef.current) {
            direccionRecogerRef.current.focus();
        } else if (field === 'telefonoRecoger' && telefonoRecogerRef.current) {
            telefonoRecogerRef.current.focus();
        } else if (field === 'direccionEntrega' && direccionEntregaRef.current) {
            direccionEntregaRef.current.focus();
        } else if (field === 'telefonoEntrega' && telefonoEntregaRef.current) {
            telefonoEntregaRef.current.focus();
        }
    };

    const handleSubmit = () => {
        alert('Formulario enviado');
    };

    if (tipoString !== 'recogidas') return null;

    return (
        <div className='w-full pb-5'>
            <h2 className="text-2xl text-left font-bold mb-4">Recogidas 🛵</h2>
            <form className="flex flex-col w-full">
                {/* Dirección de Recogida */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="flex justify-between items-center gap-2 w-full">
                        <InputField
                            label="Dirección de Recoger"
                            name="direccionRecoger"
                            value={formData.direccionRecoger}
                            onChange={handleChange}
                            placeholder="¿Dónde recogemos?"
                            ref={direccionRecogerRef}
                        />
                        <button
                            type="button"
                            className="btn btn-lg btn-circle text-2xl bg-[#ff6600] text-white"
                            onClick={() => {
                                if (completed.direccionRecoger) {
                                    handleEdit('direccionRecoger');
                                } else {
                                    handleConfirm('direccionRecoger');
                                }
                            }}
                        >
                            {completed.direccionRecoger ? <FaEdit /> : <FaCheckCircle />}
                        </button>
                    </div>

                    {/* Teléfono de Recogida */}
                    {(currentStep >= 2) && (
                        <div className="flex justify-between items-center gap-2 w-full">
                            <InputField
                                label="Teléfono de Recoger"
                                name="telefonoRecoger"
                                value={formData.telefonoRecoger}
                                onChange={handleChange}
                                placeholder="Teléfono contacto"
                                ref={telefonoRecogerRef}
                            />
                            <button
                                type="button"
                                className="btn btn-lg btn-circle text-2xl bg-[#ff6600] text-white"
                                onClick={() => {
                                    if (completed.telefonoRecoger) {
                                        handleEdit('telefonoRecoger');
                                    } else {
                                        handleConfirm('telefonoRecoger');
                                    }
                                }}
                            >
                                {completed.telefonoRecoger ? <FaEdit /> : <FaCheckCircle />}
                            </button>
                        </div>
                    )}

                    {/* Dirección de Entrega */}
                    {(currentStep >= 3) && completed.telefonoRecoger && (
                        <div className="flex justify-between items-center gap-2 w-full">
                            <InputField
                                label="Dirección de Entrega"
                                name="direccionEntrega"
                                value={formData.direccionEntrega}
                                onChange={handleChange}
                                placeholder="¿Dónde entregamos?"
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
                    {(currentStep >= 4) && completed.direccionEntrega && (
                        <div className="flex justify-between items-center gap-2 w-full">
                            <InputField
                                label="Teléfono de Entrega"
                                name="telefonoEntrega"
                                value={formData.telefonoEntrega}
                                onChange={handleChange}
                                placeholder="Teléfono destino"
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
                {(currentStep === 4 && completed.telefonoEntrega) && (
                    <button
                        type="button"
                        className="bg-green-500 text-white p-3 w-full rounded-md"
                        onClick={handleSubmit}
                    >
                          Confirmar Servicio
                    </button>
                )}
            </form>
        </div>
    );
};

export default RecogidasForm;
