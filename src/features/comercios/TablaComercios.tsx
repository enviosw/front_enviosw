import React from 'react';
import { useComercios } from '../../services/comerciosService';
import Loader from '../../utils/Loader';

const TablaComercios: React.FC = () => {
    // Obtener los datos de los comercios desde el servicio
    const { data: comercios, isLoading, error } = useComercios();

    // Definir los headers de la tabla
    const headers = [
        'ID',
        'Nombre Comercial',
        'Razón Social',
        'NIT',
        'Categoría',
        'Responsable',
        'Email Contacto',
        'Teléfono',
        'Teléfono Secundario',
        'Dirección',
        'Activo',
        'Fecha Creación',
        'Fecha Actualización',
        'Tipo de Comercio',
        'Acciones'
    ];

    // Condicional para cuando se está cargando
    if (isLoading) {
        return (
            <p className="text-center text-blue-600">
                Cargando Comercios... <Loader />
            </p>
        );
    }

    // Condicional para mostrar el error si ocurre
    if (error instanceof Error) {
        return <p className="text-center text-red-600">Error: {error.message}</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {comercios?.map((comercio) => (
                        <tr key={comercio.id} className="hover:bg-gray-100">
                            <td className="px-6 py-3 text-sm text-gray-700 border-b">{comercio.id}</td>
                            <td className="px-6 py-3 text-sm text-gray-700 border-b">{comercio.nombre_comercial}</td>
                            <td className="px-6 py-3 text-sm text-gray-700 border-b">{comercio.razon_social}</td>
                            <td className="px-6 py-3 text-sm text-gray-700 border-b">{comercio.nit}</td>
                            <td className="px-6 py-3 text-sm text-gray-700 border-b">{comercio.categoria}</td>
                            <td className="px-6 py-3 text-sm text-gray-700 border-b">{comercio.responsable}</td>
                            <td className="px-6 py-3 text-sm text-gray-700 border-b">{comercio.email_contacto}</td>
                            <td className="px-6 py-3 text-sm text-gray-700 border-b">{comercio.telefono}</td>
                            <td className="px-6 py-3 text-sm text-gray-700 border-b">{comercio.telefono_secundario}</td>
                            <td className="px-6 py-3 text-sm text-gray-700 border-b">{comercio.direccion}</td>
                            <td className="px-6 py-3 text-sm text-gray-700 border-b">
                                {comercio.activo ? 'Sí' : 'No'}
                            </td>
                            <td className="px-6 py-3 text-sm text-gray-700 border-b">{comercio.fecha_creacion}</td>
                            <td className="px-6 py-3 text-sm text-gray-700 border-b">{comercio.fecha_actualizacion}</td>
                            <td className="px-6 py-3 text-sm text-gray-700 border-b">{comercio.tipo.nombre}</td>
                            <td className="px-6 py-3 text-sm text-gray-700 border-b">
                                <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                                    Ver detalles
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaComercios;
