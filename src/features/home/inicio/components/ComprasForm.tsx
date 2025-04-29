import React, { useState, useRef } from 'react';
import InputField from '../../../../shared/components/InputField';
import { FaCheckCircle, FaEdit } from 'react-icons/fa';

interface ComprasFormProps {
    tipoString: string;
}

type FormDataKeys = 'listaCompras' | 'direccionEntrega' | 'telefonoEntrega';

const ComprasForm: React.FC<ComprasFormProps> = ({ tipoString }) => {
    const [formData, setFormData] = useState({
        listaCompras: '',
        direccionEntrega: '',
        telefonoEntrega: '',
    });

    const [completed, setCompleted] = useState({
        listaCompras: false,
        direccionEntrega: false,
        telefonoEntrega: false,
    });

    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1); // Controla qué campo se muestra

    const listaComprasRef = useRef<HTMLInputElement | null>(null);
    const direccionEntregaRef = useRef<HTMLInputElement | null>(null);
    const telefonoEntregaRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirm = (field: FormDataKeys) => {
        if (formData[field]) {
            setCompleted(prev => ({ ...prev, [field]: true }));
            if (field === 'listaCompras') {
                setCurrentStep(2); // Muestra el siguiente campo (Dirección de Entrega)
            } else if (field === 'direccionEntrega') {
                setCurrentStep(3); // Muestra el siguiente campo (Teléfono de Entrega)
            }
        }
    };

    const handleEdit = (field: FormDataKeys) => {
        setCompleted(prev => ({ ...prev, [field]: false }));

        // Enfocar el campo correspondiente cuando se edite
        if (field === 'listaCompras' && listaComprasRef.current) {
            listaComprasRef.current.focus();
        } else if (field === 'direccionEntrega' && direccionEntregaRef.current) {
            direccionEntregaRef.current.focus();
        } else if (field === 'telefonoEntrega' && telefonoEntregaRef.current) {
            telefonoEntregaRef.current.focus();
        }
    };

    const handleSubmit = () => {
        alert('Formulario enviado');
    };

    if (tipoString !== 'compras') return null;

    return (
        <div className='w-full pb-5'>
            <h2 className="text-2xl text-left font-bold mb-4">Compras 🛒</h2>
            <form className="flex flex-col w-full">
                {/* Lista de Compras */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="flex justify-between items-center gap-2 w-full">
                        <InputField
                            label="Lista de Compras"
                            name="listaCompras"
                            value={formData.listaCompras}
                            onChange={handleChange}
                            placeholder="¿Qué necesitas comprar?"
                            ref={listaComprasRef}
                        />
                        <button
                            type="button"
                            className="btn btn-lg btn-circle text-2xl bg-[#ff6600] text-white"
                            onClick={() => {
                                if (completed.listaCompras) {
                                    handleEdit('listaCompras');
                                } else {
                                    handleConfirm('listaCompras');
                                }
                            }}
                        >
                            {completed.listaCompras ? <FaEdit /> : <FaCheckCircle />}
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
                                placeholder="Dirección para entregar"
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
                        Confirmar Compra
                    </button>
                )}
            </form>
        </div>
    );
};

export default ComprasForm;
