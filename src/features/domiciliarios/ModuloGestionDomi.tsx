import React from 'react';
import { DomiciliarioType } from '../../shared/types/domiInterface';
import { useDomiciliariosPorDisponibilidad, useSiguienteDomiciliario, useReiniciarTurnosACero } from '../../services/domiServices';
import DataTable from '../../shared/components/DataTable';
import TableCell from '../../shared/components/TableCell';
import { AlertService } from '../../utils/AlertService';

const ModuloGestionDomi: React.FC = () => {
  // 👉 Hooks que consumen los 3 endpoints nuevos
  const {
    data: domisOrdenados,
    isLoading: loadingOrden,
    error: errorOrden,
    refetch: refetchOrden
  } = useDomiciliariosPorDisponibilidad();

  const {
    data: siguiente,
    isLoading: loadingSiguiente,
    error: errorSiguiente,
    refetch: refetchSiguiente
  } = useSiguienteDomiciliario();

  const { mutate: reiniciar, isPending: reiniciando } = useReiniciarTurnosACero();

  const headers = ['ID', 'Nombre', 'Teléfono', 'Disponible', 'Turno'];

  const renderRow = (d: DomiciliarioType) => (
    <tr key={d.id} className="hover:bg-gray-100 bg-white text-center">
      <TableCell>{d.id}</TableCell>
      <TableCell>{d.nombre} {d.apellido}</TableCell>
      <TableCell>{d.telefono_whatsapp}</TableCell>
      <TableCell>{d.disponible ? '✔️' : '❌'}</TableCell>
      <TableCell>{d.turno_orden}</TableCell>
    </tr>
  );

  const handleReiniciar = async () => {
    const ok = await AlertService.confirm(
      '¿Reiniciar turnos a 0 y dejar a todos NO disponibles?',
      'Esta acción actualizará todos los domiciliarios activos.'
    );
    if (!ok) return;

    reiniciar(undefined, {
      onSuccess: async () => {
        await Promise.all([refetchOrden(), refetchSiguiente()]);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header acciones */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Gestión de Domiciliarios</h2>
        <div className="flex gap-2">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              refetchOrden();
              refetchSiguiente();
            }}
          >
            Refrescar
          </button>
          <button
            className={`btn btn-error btn-sm ${reiniciando ? 'btn-disabled' : ''}`}
            onClick={handleReiniciar}
            disabled={reiniciando}
          >
            {reiniciando ? 'Reiniciando...' : 'Reiniciar turnos a 0'}
          </button>
        </div>
      </div>

      {/* Siguiente disponible */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-4">
          <h3 className="font-medium mb-2">Siguiente disponible (sin asignar)</h3>
          {loadingSiguiente ? (
            <p className="text-blue-600">Cargando…</p>
          ) : errorSiguiente ? (
            <p className="text-red-600">Error: {(errorSiguiente as Error).message}</p>
          ) : siguiente ? (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm">
              <div><span className="font-semibold">ID:</span> {siguiente.id}</div>
              <div><span className="font-semibold">Nombre:</span> {siguiente.nombre} {siguiente.apellido}</div>
              <div><span className="font-semibold">Teléfono:</span> {siguiente.telefono_whatsapp}</div>
              <div><span className="font-semibold">Turno:</span> {siguiente.turno_orden}</div>
            </div>
          ) : (
            <p className="text-gray-600">No hay domiciliarios disponibles ahora mismo.</p>
          )}
        </div>
      </div>

      {/* Listado por disponibilidad */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-4">
          <h3 className="font-medium mb-2">Listado por disponibilidad</h3>
          {loadingOrden ? (
            <p className="text-blue-600">Cargando…</p>
          ) : errorOrden ? (
            <p className="text-red-600">Error: {(errorOrden as Error).message}</p>
          ) : (
            <DataTable
              headers={headers}
              data={domisOrdenados || []}
              renderRow={renderRow}
              allSelected={false}
              toggleSelectAll={() => {}}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuloGestionDomi;
