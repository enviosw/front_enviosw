import React, { useState, useRef } from 'react';
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

    // Refs para hacer foco en los campos cuando se hace "Editar"
    const direccionInputRef = useRef<HTMLInputElement | null>(null);
    const telefonoInputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirm = (field: FormDataKeys) => {
        if (formData[field]) {
            setCompleted(prev => ({ ...prev, [field]: true }));
            if (field === 'direccionRecogidaPago') {
                setShowTelefono(true);  // Mostrar el siguiente input (teléfono) cuando se confirme el primero
            }
        }
    };

    const handleEdit = (field: FormDataKeys) => {
        setCompleted(prev => ({ ...prev, [field]: false }));

        // Hacer foco en el input correspondiente cuando se edite
        if (field === 'direccionRecogidaPago' && direccionInputRef.current) {
            direccionInputRef.current.focus();
        } else if (field === 'telefonoRecogidaPago' && telefonoInputRef.current) {
            telefonoInputRef.current.focus();
        }
    };

    const handleSubmit = () => {
        const numeroWhatsApp = '3232205900'; // Cambia por el número real del negocio

        // Construir el mensaje con la información del formulario
        const mensaje = `💰¡Hola! Me gustaría solicitar el servicio de pagos:\n\n` +
            `🛵📍Dirección de Recogida: ${formData.direccionRecogidaPago}\n` +
            `📞 Teléfono: ${formData.telefonoRecogidaPago}`;

        // Crear la URL de WhatsApp
        const url = `https://wa.me/57${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

        // Abrir el enlace en una nueva pestaña
        window.open(url, '_blank');
    };

    if (tipoString !== 'pagos') return null;

    return (
        <div className='w-full pb-5'>
            <h2 className="text-xl text-left font-bold pt-4 pb-5 uppercase">Tramite de Pagos 💰</h2>
            <form className="flex flex-col gap-6 w-full items-center justify-center">
                {/* Dirección de Recogida */}
                <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mx-auto'>
                    <div className="flex justify-between items-center gap-2 w-full">
                        <InputField
                            label="Dirección de Recogida"
                            name="direccionRecogidaPago"
                            value={formData.direccionRecogidaPago}
                            onChange={handleChange}
                            placeholder="¿Dónde recogemos el dinero?"
                            ref={direccionInputRef}  // Asignar la referencia para el enfoque
                        />
                        <div>
                            <button
                                type="button"
                                className="btn btn-lg btn-circle text-2xl bg-[#ff6600] text-white"
                                onClick={() => {
                                    if (completed.direccionRecogidaPago) {
                                        handleEdit('direccionRecogidaPago');
                                    } else {
                                        handleConfirm('direccionRecogidaPago');
                                    }
                                }}
                            >
                                {completed.direccionRecogidaPago ? <FaEdit /> : <FaCheckCircle />}
                            </button>
                        </div>
                    </div>

                    {/* Teléfono de Recogida */}
                    {showTelefono && (
                        <div className="flex justify-between items-center gap-2 w-full">
                            <InputField
                                label="Teléfono"
                                name="telefonoRecogidaPago"
                                value={formData.telefonoRecogidaPago}
                                onChange={handleChange}
                                placeholder="Teléfono contacto"
                                ref={telefonoInputRef}  // Asignar la referencia para el enfoque
                            />
                            <button
                                type="button"
                                className="btn btn-lg btn-circle text-2xl bg-[#ff6600] text-white"
                                onClick={() => {
                                    if (completed.telefonoRecogidaPago) {
                                        handleEdit('telefonoRecogidaPago');
                                    } else {
                                        handleConfirm('telefonoRecogidaPago');
                                    }
                                }}
                            >
                                {completed.telefonoRecogidaPago ? <FaEdit /> : <FaCheckCircle />}
                            </button>
                        </div>
                    )}
                </div>

                {(completed.direccionRecogidaPago || formData.direccionRecogidaPago) &&
                    (completed.telefonoRecogidaPago || formData.telefonoRecogidaPago) && (
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

export default PagosForm;
