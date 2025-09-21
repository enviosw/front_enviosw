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

    const listaComprasRef = useRef<HTMLTextAreaElement | null>(null);
    const direccionEntregaRef = useRef<HTMLInputElement | null>(null);
    const telefonoEntregaRef = useRef<HTMLInputElement | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [showToast3, setShowToast3] = useState(false);

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
        if (formData[field].trim() === '') {
            if (field === 'listaCompras') {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);
            } else if (field === 'direccionEntrega') {
                setShowToast2(true);
                setTimeout(() => setShowToast2(false), 2500);
            } else if (field === 'telefonoEntrega') {
                setShowToast3(true);
                setTimeout(() => setShowToast3(false), 2500);
            }
            return; // Evita continuar si está vacío
        }

        setCompleted(prev => ({ ...prev, [field]: true }));

        if (field === 'listaCompras') {
            setCurrentStep(2);
            setTimeout(() => direccionEntregaRef.current?.focus(), 100);
        } else if (field === 'direccionEntrega') {
            setCurrentStep(3);
            setTimeout(() => telefonoEntregaRef.current?.focus(), 100);
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
        const numeroWhatsApp = '3134089563';

        const mensaje = `*PEDIDO* desde la pagina\n\n` +   // 👈 activador
            `🛒 ¡Hola! Me gustaría realizar una compra:\n\n` +
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

            {showToast && (
                <div
                    style={{
                        marginTop: '80px', // Ajusta la distancia de la parte superior
                    }}
                    className="toast z-50 toast-top toast-center lg:toast-end transition-opacity duration-300"
                >
                    <div className="alert alert-warning shadow-lg flex items-start gap-2">
                        <span className="text-xl">❗</span>
                        <div className="flex flex-col text-left">
                            <span>Te falta el listado de compras.</span>
                            <span>Escríbelo para poder enviar el pedido.</span>
                        </div>
                    </div>
                </div>
            )}

            {showToast2 && (
                <div
                    style={{
                        marginTop: '80px', // Ajusta la distancia de la parte superior
                    }}
                    className="toast z-50 toast-top toast-center lg:toast-end transition-opacity duration-300"
                >
                    <div className="alert alert-warning shadow-lg flex items-start gap-2">
                        <span className="text-xl">❗</span>
                        <div className="flex flex-col text-left">
                            <span>Te falta la dirección.</span>
                            <span>Escríbela para poder enviar el pedido.</span>
                        </div>
                    </div>
                </div>
            )}

            {showToast3 && (
                <div
                    style={{
                        marginTop: '80px', // Ajusta la distancia de la parte superior
                    }}
                    className="toast z-50 toast-top toast-center lg:toast-end transition-opacity duration-300"
                >
                    <div className="alert alert-warning shadow-lg flex items-start gap-2">
                        <span className="text-xl">❗</span>
                        <div className="flex flex-col text-left">
                            <span>Te falta el teléfono.</span>
                            <span>Escríbelo para poder enviar el pedido.</span>
                        </div>
                    </div>
                </div>
            )}


            <h2 className="text-2xl text-left font-bold mb-4">Compras 🛒</h2>
            <form className="flex flex-col w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

                    {/* Lista de Compras */}
                    {/* Lista de Compras como <textarea> */}
                    <div className="flex justify-between items-start gap-2 w-full">
                        <div className="flex flex-col w-full">
                            <label htmlFor="listaCompras" className="font-semibold mb-1">Lista de Compras</label>
                            <textarea
                                name="listaCompras"
                                id="listaCompras"
                                ref={listaComprasRef as React.RefObject<HTMLTextAreaElement>}
                                value={formData.listaCompras}
                                onChange={handleChange}
                                placeholder="¿Qué necesitas comprar?"
                                rows={4}
                                className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition shadow-sm resize-none"
                            />
                        </div>
                        <button
                            type="button"
                            className={`btn btn-lg btn-circle text-2xl text-white self-end ${buttonColor(completed.listaCompras)}`}
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
                                type='number'
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
