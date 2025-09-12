import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDomiciliosPlataforma } from '../../services/domiServices'; // ⬅️ ajusta si está en otra ruta
import Loader from '../../utils/Loader';
import DataTable from '../../shared/components/DataTable';
import TableCell from '../../shared/components/TableCell';
import { formatDate } from '../../utils/formatearFecha';

const Domicilios: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: domicilios, isLoading, error  } = useDomiciliosPlataforma(3, { pollMs: 10000 });

  const headers = [
    'ID',
    'Cliente',
    'Origen',
    'Destino',
    'Estado',
    'Fecha',
    'Detalles',
  ];

  // No usamos selección múltiple aquí, pero DataTable lo espera
  const allSelected = false;
  const toggleSelectAll = () => {};

  const renderRow = (d: any) => (
    <tr key={d.id} className="hover:bg-gray-100 bg-white">
      <TableCell>{d.id}</TableCell>
      <TableCell>{d.numero_cliente}</TableCell>
      <TableCell>{d.origen_direccion}</TableCell>
      <TableCell>{d.destino_direccion}</TableCell>
      <TableCell>
        <span className="badge badge-info">PROCESO</span>
      </TableCell>
      <TableCell>{formatDate(d.fecha ?? d.fecha_creacion)}</TableCell>
      <TableCell>
        <div className="max-w-xs truncate" title={d.detalles_pedido || ''}>
          {d.detalles_pedido || '—'}
        </div>
      </TableCell>
    </tr>
  );

  return (
    <div className="overflow-x-auto w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Domicilios (Plataforma / Proceso)</h2>
        <button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ['domicilios', 'plataforma', { estado: 3 }] })
          }
          className="btn btn-sm btn-primary text-white"
        >
          Refrescar
        </button>
      </div>

      {isLoading ? (
        <div className="text-center text-blue-600">Cargando domicilios... <Loader /></div>
      ) : error ? (
        <p className="text-red-600">Error: {(error as Error).message}</p>
      ) : (
        <DataTable
          headers={headers}
          data={domicilios ?? []}
          renderRow={renderRow}
          allSelected={allSelected}
          toggleSelectAll={toggleSelectAll}
        />
      )}
    </div>
  );
};

export default Domicilios;
