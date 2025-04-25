import React from 'react';
import { useComercios } from '../../services/comerciosService';
import Loader from '../../utils/Loader';
import { formatDate } from '../../utils/formatearFecha';
import DataTable from '../../shared/components/DataTable'; // Asegúrate de importar el componente DataTable
import TableCell from '../../shared/components/TableCell';

const TablaComercios: React.FC = () => {
    const { data: comercios, isLoading, error } = useComercios();

    const headers = [
        'ID',
        'Nombre',
        'Razón',
        'NIT',
        'Categoría',
        'Responsable',
        'Email',
        'Teléfono',
        'Teléfono',
        'Dirección',
        'Activo',
        'Fecha',
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

    if (error instanceof Error) {
        return <p className="text-center text-red-600">Error: {error.message}</p>;
    }

    const renderRow = (comercio: any) => (
        <tr key={comercio.id} className="hover:bg-gray-100 bg-white">
          <TableCell>{comercio.id}</TableCell>
          <TableCell>{comercio.nombre_comercial}</TableCell>
          <TableCell>{comercio.razon_social}</TableCell>
          <TableCell>{comercio.nit}</TableCell>
          <TableCell>{comercio.categoria}</TableCell>
          <TableCell>{comercio.responsable}</TableCell>
          <TableCell>{comercio.email_contacto}</TableCell>
          <TableCell>{comercio.telefono}</TableCell>
          <TableCell>{comercio.telefono_secundario}</TableCell>
          <TableCell>{comercio.direccion}</TableCell>
          <TableCell>{comercio.activo ? 'Sí' : 'No'}</TableCell>
          <TableCell>{formatDate(comercio.fecha_creacion)}</TableCell>
          <TableCell>{comercio.tipo.nombre}</TableCell>
          <TableCell>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              Ver detalles
            </button>
          </TableCell>
        </tr>
      );

    return (
        <div className="overflow-x-auto">
            <DataTable headers={headers} data={comercios ?? []} renderRow={renderRow} />
        </div>
    );
};

export default TablaComercios;
