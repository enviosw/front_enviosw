import React, { useState } from 'react';
import { TipoServicios } from '../../../shared/types/tipos';
import InputField from '../../../shared/components/InputField';

const normalizeString = (str: string): string => {
    // Eliminar caracteres especiales y convertir a minúsculas
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

const TipoServicio: React.FC<TipoServicios> = ({ tipo }) => {
    // Normalizar el tipo y convertirlo a minúsculas
    const tipoString = normalizeString(String(tipo));

    // Estado para los inputs
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        destino: '',
        localComercial: '',
        compraDescripcion: '',
        direccionDestino: '',
        responsable: '',
        observacion: '',
        tramites: {
            tramite1: false,
            tramite2: false,
            tramite3: false,
        },
        direccionRecogida: '',
        direccionDestinoEnvio: '',
        responsableEnvio: '',
        destinatarioEnvio: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            tramites: { ...prevData.tramites, [name]: checked },
        }));
    };

    return (
        <div className="space-y-4 w-full bg-gray-50">
            {tipoString === 'recogidas' && (
                <div className="w-full p-6 rounded-lg">
                    <h2 className="text-2xl font-bold">Recogidas</h2>
                    <p>Sección para las recogidas. Aquí se muestra información sobre los servicios de recogida.</p>
                    <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <InputField
                            label="Nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre de la recogida"
                        />
                        <InputField
                            label="Descripción"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Descripción de la recogida"
                        />
                        <InputField
                            label="Destino"
                            name="destino"
                            value={formData.destino}
                            onChange={handleChange}
                            placeholder="Destino de la recogida"
                        />
                    </form>
                </div>
            )}

            {tipoString === 'compras' && (
                <div className="w-full p-6 rounded-lg">
                    <h2 className="text-2xl font-bold">Compras</h2>
                    <p>Sección para las compras. Aquí se muestra información sobre los servicios de compras.</p>
                    <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <InputField
                            label="Local Comercial"
                            name="localComercial"
                            value={formData.localComercial}
                            onChange={handleChange}
                            placeholder="Nombre del local comercial"
                        />
                        <InputField
                            label="Qué comprar"
                            name="compraDescripcion"
                            value={formData.compraDescripcion}
                            onChange={handleChange}
                            placeholder="Qué se necesita comprar"
                        />
                        <InputField
                            label="Dirección de Destino"
                            name="direccionDestino"
                            value={formData.direccionDestino}
                            onChange={handleChange}
                            placeholder="Dirección de destino"
                        />
                        <InputField
                            label="Responsable"
                            name="responsable"
                            value={formData.responsable}
                            onChange={handleChange}
                            placeholder="Nombre del responsable"
                        />
                        <InputField
                            label="Observación"
                            name="observacion"
                            value={formData.observacion}
                            onChange={handleChange}
                            placeholder="Observaciones sobre la compra"
                        />
                    </form>
                </div>
            )}

            {tipoString === 'pagos' && (
                <div className="w-full p-6 rounded-lg">
                    <h2 className="text-2xl font-bold">Pagos</h2>
                    <p>Sección para los pagos. Aquí se muestra información sobre los servicios de pago.</p>
                    <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-semibold">Seleccione los trámites</label>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="tramite1"
                                    checked={formData.tramites.tramite1}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <span>Trámite 1</span>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="tramite2"
                                    checked={formData.tramites.tramite2}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <span>Trámite 2</span>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="tramite3"
                                    checked={formData.tramites.tramite3}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <span>Trámite 3</span>
                            </div>
                        </div>
                        <InputField
                            label="Observación"
                            name="observacion"
                            value={formData.observacion}
                            onChange={handleChange}
                            placeholder="Observaciones sobre los pagos"
                        />
                    </form>
                </div>
            )}

            {tipoString === 'envios' && (
                <div className="w-full p-6 rounded-lg">
                    <h2 className="text-2xl font-bold">Envíos</h2>
                    <p>Sección para los envíos. Aquí se muestra información sobre los servicios de envío.</p>
                    <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <InputField
                            label="Dirección de Recogida"
                            name="direccionRecogida"
                            value={formData.direccionRecogida}
                            onChange={handleChange}
                            placeholder="Dirección de recogida"
                        />
                        <InputField
                            label="Dirección de Destino"
                            name="direccionDestinoEnvio"
                            value={formData.direccionDestinoEnvio}
                            onChange={handleChange}
                            placeholder="Dirección de destino"
                        />
                        <InputField
                            label="Responsable"
                            name="responsableEnvio"
                            value={formData.responsableEnvio}
                            onChange={handleChange}
                            placeholder="Responsable del envío"
                        />
                        <InputField
                            label="Destinatario"
                            name="destinatarioEnvio"
                            value={formData.destinatarioEnvio}
                            onChange={handleChange}
                            placeholder="Destinatario del envío"
                        />
                        <InputField
                            label="Observación"
                            name="observacion"
                            value={formData.observacion}
                            onChange={handleChange}
                            placeholder="Observaciones sobre el envío"
                        />
                    </form>
                </div>
            )}
        </div>
    );
};

export default TipoServicio;
