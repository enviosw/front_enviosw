import React, { useState, useRef, useEffect } from 'react';
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

    const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

    const direccionRecogerRef = useRef<HTMLInputElement | null>(null);
    const telefonoRecogerRef = useRef<HTMLInputElement | null>(null);
    const direccionEntregaRef = useRef<HTMLInputElement | null>(null);
    const telefonoEntregaRef = useRef<HTMLInputElement | null>(null);

    // ✅ Focus al primer input al cargar
    useEffect(() => {
        if (tipoString === 'recogidas') {
            direccionRecogerRef.current?.focus();
        }
    }, [tipoString]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirm = (field: FormDataKeys) => {
        if (formData[field]) {
            setCompleted(prev => ({ ...prev, [field]: true }));

            // Cambiar de paso y hacer focus al siguiente input
            if (field === 'direccionRecoger') {
                setCurrentStep(2);
                setTimeout(() => telefonoRecogerRef.current?.focus(), 100);
            } else if (field === 'telefonoRecoger') {
                setCurrentStep(3);
                setTimeout(() => direccionEntregaRef.current?.focus(), 100);
            } else if (field === 'direccionEntrega') {
                setCurrentStep(4);
                setTimeout(() => telefonoEntregaRef.current?.focus(), 100);
            }
        }
    };

    const handleEdit = (field: FormDataKeys) => {
        setCompleted(prev => ({ ...prev, [field]: false }));

        // Focus en el input al editar
        setTimeout(() => {
            if (field === 'direccionRecoger') direccionRecogerRef.current?.focus();
            else if (field === 'telefonoRecoger') telefonoRecogerRef.current?.focus();
            else if (field === 'direccionEntrega') direccionEntregaRef.current?.focus();
            else if (field === 'telefonoEntrega') telefonoEntregaRef.current?.focus();
        }, 100);
    };

    const handleSubmit = () => {
        const numeroWhatsApp = '3232205900';

        const mensaje = `🛵 ¡Hola! Quiero coordinar una recogida y entrega:\n\n` +
            `📍 Dirección de Recogida: ${formData.direccionRecoger}\n` +
            `📞 Teléfono de Recogida: ${formData.telefonoRecoger}\n\n` +
            `📍 Dirección de Entrega: ${formData.direccionEntrega}\n` +
            `📞 Teléfono de Entrega: ${formData.telefonoEntrega}`;

        const url = `https://wa.me/57${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    };

    if (tipoString !== 'recogidas') return null;

    const buttonColor = (completed: boolean) => completed ? 'bg-green-500' : 'bg-[#ff6600]';

    return (
        <div className='w-full pb-5'>
            <h2 className="text-2xl text-left font-bold mb-4">Recogidas 🛵</h2>
            <form className="flex flex-col w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

                    {/* Dirección de Recoger */}
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
                            className={`btn btn-lg btn-circle text-2xl text-white ${buttonColor(completed.direccionRecoger)}`}
                            onClick={() => completed.direccionRecoger ? handleEdit('direccionRecoger') : handleConfirm('direccionRecoger')}
                        >
                            {completed.direccionRecoger ? <FaEdit /> : <FaCheckCircle />}
                        </button>
                    </div>

                    {/* Teléfono de Recoger */}
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
                                className={`btn btn-lg btn-circle text-2xl text-white ${buttonColor(completed.telefonoRecoger)}`}
                                onClick={() => completed.telefonoRecoger ? handleEdit('telefonoRecoger') : handleConfirm('telefonoRecoger')}
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
                                className={`btn btn-lg btn-circle text-2xl text-white ${buttonColor(completed.direccionEntrega)}`}
                                onClick={() => completed.direccionEntrega ? handleEdit('direccionEntrega') : handleConfirm('direccionEntrega')}
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
                                className={`btn btn-lg btn-circle text-2xl text-white ${buttonColor(completed.telefonoEntrega)}`}
                                onClick={() => completed.telefonoEntrega ? handleEdit('telefonoEntrega') : handleConfirm('telefonoEntrega')}
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

export default RecogidasForm;
