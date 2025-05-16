import React, { useState, useRef, useEffect } from 'react';
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

    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

    const listaComprasRef = useRef<HTMLInputElement | null>(null);
    const direccionEntregaRef = useRef<HTMLInputElement | null>(null);
    const telefonoEntregaRef = useRef<HTMLInputElement | null>(null);

    // ✅ Focus al primer input al cargar
    useEffect(() => {
        if (tipoString === 'compras') {
            listaComprasRef.current?.focus();
        }
    }, [tipoString]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirm = (field: FormDataKeys) => {
        if (formData[field]) {
            setCompleted(prev => ({ ...prev, [field]: true }));

            if (field === 'listaCompras') {
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
            if (field === 'listaCompras') listaComprasRef.current?.focus();
            else if (field === 'direccionEntrega') direccionEntregaRef.current?.focus();
            else if (field === 'telefonoEntrega') telefonoEntregaRef.current?.focus();
        }, 100);
    };

    const handleSubmit = () => {
        const numeroWhatsApp = '3232205900';

        const mensaje = `🛒 ¡Hola! Me gustaría realizar una compra:\n\n` +
            `🛍️ Lista de Compras: ${formData.listaCompras}\n` +
            `📍 Dirección de Entrega: ${formData.direccionEntrega}\n` +
            `📞 Teléfono de Entrega: ${formData.telefonoEntrega}`;

        const url = `https://wa.me/57${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    };

    if (tipoString !== 'compras') return null;

    const buttonColor = (completed: boolean) => completed ? 'bg-green-500' : 'bg-[#ff6600]';

    return (
        <div className='w-full pb-5'>
            <h2 className="text-2xl text-left font-bold mb-4">Compras 🛒</h2>
            <form className="flex flex-col w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

                    {/* Lista de Compras */}
                    <div className="flex justify-between items-center gap-2 w-full">
                        <InputField
                        type='text'
                            label="Lista de Compras"
                            name="listaCompras"
                            value={formData.listaCompras}
                            onChange={handleChange}
                            placeholder="¿Qué necesitas comprar?"
                            ref={listaComprasRef}
                        />
                        <button
                            type="button"
                            className={`btn btn-lg btn-circle text-2xl text-white ${buttonColor(completed.listaCompras)}`}
                            onClick={() => completed.listaCompras ? handleEdit('listaCompras') : handleConfirm('listaCompras')}
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
                                className={`btn btn-lg btn-circle text-2xl text-white ${buttonColor(completed.direccionEntrega)}`}
                                onClick={() => completed.direccionEntrega ? handleEdit('direccionEntrega') : handleConfirm('direccionEntrega')}
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
                                onClick={() => completed.telefonoEntrega ? handleEdit('telefonoEntrega') : handleConfirm('telefonoEntrega')}
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
                        className="bg-green-500 text-white p-3 w-full rounded-md mt-4"
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
