import React, { useEffect, useState } from 'react';
import { useDomiciliarios, useToggleEstadoDomiciliario, useEliminarDomiciliario } from '../../services/domiServices';
import { DomiciliarioType } from '../../shared/types/domiInterface';
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { useModal } from '../../context/ModalContext';
import Modal from '../../shared/components/Modal';
import DataTable from '../../shared/components/DataTable';
import TableCell from '../../shared/components/TableCell';
import { AlertService } from '../../utils/AlertService';
import FormularioDomiciliario from './FormularioDomiciliario';

const TablaDomiciliarios: React.FC = () => {
  const { data: domiciliarios, isLoading, error } = useDomiciliarios();
  const toggleEstadoMutation = useToggleEstadoDomiciliario();
  const eliminarMutation = useEliminarDomiciliario();

  const { openModal, setModalTitle, setModalContent } = useModal();

  const [search, setSearch] = useState('');
  const [filteredList, setFilteredList] = useState<DomiciliarioType[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    if (!domiciliarios) return;
    const filtered = domiciliarios.filter((d) =>
      `${d.nombre} ${d.apellido}`.toLowerCase().includes(search.toLowerCase()) ||
      d.telefono_whatsapp.includes(search)
    );
    setFilteredList(filtered);
  }, [search, domiciliarios]);

  const handleToggleEstado = async (domiciliario: DomiciliarioType) => {
    const mensaje = domiciliario.estado
      ? '¿Estás seguro de desactivar este domiciliario?'
      : '¿Estás seguro de activar este domiciliario?';

    const subtitulo = domiciliario.estado
      ? 'El domiciliario quedará inactivo.'
      : 'El domiciliario podrá recibir pedidos.';

    const confirmado = await AlertService.confirm(mensaje, subtitulo);
    if (confirmado) {
      toggleEstadoMutation.mutate(domiciliario.id!);
    }
  };

  const handleEliminar = async (domiciliario: DomiciliarioType) => {
    const confirmado = await AlertService.confirm(
      '¿Eliminar este domiciliario?',
      `Esta acción no se puede deshacer.\n\n${domiciliario.nombre} ${domiciliario.apellido} (${domiciliario.telefono_whatsapp})`
    );
    if (!confirmado) return;

    try {
      await eliminarMutation.mutateAsync(domiciliario.id!);
      // El hook ya hace invalidateQueries y muestra success.
    } catch (e) {
      // El hook ya muestra el error, esto es por seguridad si quieres logs.
      console.error(e);
    }
  };

  const handleToggleEstadosSeleccionados = async () => {
    if (selectedIds.length === 0) return;

    const confirmado = await AlertService.confirm(
      '¿Cambiar el estado de los seleccionados?',
      'Esto activará o desactivará los domiciliarios seleccionados.'
    );

    if (confirmado) {
      for (const id of selectedIds) {
        toggleEstadoMutation.mutate(id);
      }
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredList.map((d) => d.id!));
    }
  };

  const handleEditar = (domiciliario: DomiciliarioType) => {
    setModalTitle("Editar Domiciliario");
    setModalContent(<FormularioDomiciliario domiciliario={domiciliario} />);
    openModal();
  };

  const handleRegistrar = () => {
    setModalTitle("Registrar Domiciliario");
    setModalContent(<FormularioDomiciliario />);
    openModal();
  };

  const headers = [
    'Acciones',
    '# Chaqueta',
    'Nombre',
    'Teléfono',
    'Disponible',
    'Estado',
  ];

  const renderRow = (d: DomiciliarioType) => (
    <tr key={d.id} className="hover:bg-gray-100 bg-white text-center">

      <TableCell>
        <div className="flex justify-center gap-3 items-center">
          <input
            type="hidden"
            className="checkbox"
            checked={selectedIds.includes(d.id!)}
            onChange={() => toggleSelect(d.id!)}
          />

          <button
            onClick={() => handleEditar(d)}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            title="Editar"
          >
            <FaPen /> Editar
          </button>

          <button
            onClick={() => handleEliminar(d)}
            className="text-red-600 hover:text-red-800 flex items-center gap-1 disabled:opacity-50"
            title="Eliminar"
            disabled={eliminarMutation.isPending}
          >
            <FaTrash /> {eliminarMutation.isPending ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </TableCell>
      <TableCell>{d.numero_chaqueta}</TableCell>

      <TableCell>{d.nombre} {d.apellido}</TableCell>
      <TableCell>{d.telefono_whatsapp}</TableCell>
      <TableCell>{d.disponible ? '✔️' : '❌'}</TableCell>
      <TableCell>
        <button
          onClick={() => handleToggleEstado(d)}
          className={`btn btn-xs ${d.estado ? 'btn-warning' : 'btn-success'}`}
        >
          {d.estado ? 'Inactivar' : 'Activar'}
        </button>
      </TableCell>
    </tr>
  );

  return (
    <div className="overflow-x-auto w-full space-y-4">
      {/* Filtros */}
      <div className="collapse bg-base-100 border-base-300 border rounded-md">
        <input type="checkbox" />
        <div className="collapse-title font-semibold">Filtros</div>
        <div className="collapse-content">
          <input
            className="input input-bordered input-sm w-full max-w-xs"
            type="text"
            placeholder="Buscar por nombre o teléfono"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Botones de acciones */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button onClick={handleRegistrar} className="btn btn-primary btn-sm">
            <FaPlus className="mr-1" /> Registrar Domiciliario
          </button>

          {selectedIds.length > 0 && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-1 rounded-md flex items-center gap-2 text-sm">
              <span>Seleccionados: {selectedIds.length}</span>
              <button onClick={handleToggleEstadosSeleccionados} className="btn btn-xs btn-error">
                Cambiar Estado
              </button>
              <button onClick={() => setSelectedIds([])} className="text-red-500 hover:text-red-700 text-xs font-bold">
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabla */}
      {isLoading ? (
        <div className="text-center text-blue-600">Cargando domiciliarios...</div>
      ) : error ? (
        <div className="text-red-500 text-center">Error: {(error as Error).message}</div>
      ) : (
        <DataTable
          headers={headers}
          data={filteredList}
          renderRow={renderRow}
          allSelected={selectedIds.length === filteredList.length && filteredList.length > 0}
          toggleSelectAll={toggleSelectAll}
        />
      )}

      <Modal />
    </div>
  );
};

export default TablaDomiciliarios;
