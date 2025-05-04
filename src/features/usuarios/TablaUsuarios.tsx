import React, { useState } from 'react';
import { useUsuarios } from '../../services/usuariosServices'; // Asegúrate de que la ruta sea correcta
import Loader from '../../utils/Loader';
import { formatDate } from '../../utils/formatearFecha';
import DataTable from '../../shared/components/DataTable';
import TableCell from '../../shared/components/TableCell';
import Modal from '../../shared/components/Modal';
import { useModal } from '../../context/ModalContext';
import FormularioUsuario from './FormularioUsuario'; // El formulario para registrar o editar usuarios
import { FaPen, FaRegCheckSquare } from 'react-icons/fa';

const TablaUsuarios: React.FC = () => {
    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const [filters, setFilters] = useState({
        search: '',
        estado: '',
        fechaInicio: '',
        fechaFin: '',
    });

    const [appliedFilters, setAppliedFilters] = useState({
        search: '',
        estado: '',
        fechaInicio: '',
        fechaFin: '',
    });

    const { data: usuarios, isLoading, error }: { data: any; isLoading: boolean; error: any } = useUsuarios({
        page,
        search: appliedFilters.search,
        estado: appliedFilters.estado,
        fechaInicio: appliedFilters.fechaInicio,
        fechaFin: appliedFilters.fechaFin,
    });

    const { openModal, setModalTitle, setModalContent } = useModal();

    const allSelected = !!usuarios?.data && usuarios.data.length > 0 && selectedIds.length === usuarios.data.length;

    const toggleSelectAll = () => {
        if (allSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(usuarios?.data.map((u: any) => u.id) || []);
        }
    };

    const toggleSelect = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const headers = [
        'ID',
        'Acciones',
        'Nombre',
        'Email',
        'Teléfono',
        'Dirección',
        'Estado',
        'Fecha de Creación',
    ];

    const handleEliminarSeleccionados = () => {
        console.log('IDs seleccionados:', selectedIds);
        // Aquí puedes llamar a tu servicio para eliminar los usuarios seleccionados
    };

    const renderRow = (usuario: any) => (
        <tr key={usuario.id} className="hover:bg-gray-100 bg-white">
            <td className="px-2">
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedIds.includes(usuario.id)}
                    onChange={() => toggleSelect(usuario.id)}
                />
            </td>

            <TableCell>{usuario.id}</TableCell>
            <TableCell>
                <button onClick={() => openCustomModal(usuario)}>
                    <FaPen />
                </button>
            </TableCell>
            <TableCell>{usuario.nombre}</TableCell>
            <TableCell>{usuario.email}</TableCell>
            <TableCell>{usuario.telefono}</TableCell>
            <TableCell>{usuario.direccion}</TableCell>
            <TableCell>{usuario.estado}</TableCell>
            <TableCell>{formatDate(usuario.fecha_creacion)}</TableCell>
        </tr>
    );

    const openCustomModal = (usuario?: any) => {
        const isEdit = usuario?.id !== undefined;
        const key = isEdit ? `edit-${usuario.id}` : `create-${Date.now()}`;
        setModalTitle(isEdit ? 'Actualizar Usuario' : 'Registrar Usuario');
        setModalContent(<FormularioUsuario key={key} usuario={usuario} />);
        openModal();
    };

    return (
        <div className="overflow-x-auto space-y-4">
            <div className="flex items-center justify-start gap-3">
                <button onClick={() => openCustomModal()} className="btn btn-success">
                    <FaRegCheckSquare className="mr-2" /> Registrar
                </button>
                {selectedIds.length > 0 && (
                    <div className="relative">
                        <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-1 rounded-md flex items-center gap-1 text-sm">
                            <span>Seleccionados: {selectedIds.length}</span>
                            <button
                                onClick={handleEliminarSeleccionados}
                                className="btn btn-error btn-xs ml-2"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={() => setSelectedIds([])}
                                className="text-red-500 hover:text-red-700 text-xs font-bold ml-1 cursor-pointer"
                                title="Deseleccionar todo"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-4 items-end justify-between">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={filters.search}
                    onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="input input-bordered input-sm"
                />
                <select
                    value={filters.estado}
                    onChange={e => setFilters(prev => ({ ...prev, estado: e.target.value }))}
                    className="select select-sm"
                >
                    <option value="">Todos los estados</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                </select>
                <input
                    type="date"
                    value={filters.fechaInicio}
                    onChange={e => setFilters(prev => ({ ...prev, fechaInicio: e.target.value }))}
                    className="input input-sm"
                />
                <input
                    type="date"
                    value={filters.fechaFin}
                    onChange={e => setFilters(prev => ({ ...prev, fechaFin: e.target.value }))}
                    className="input input-sm"
                />

                <button
                    onClick={() => {
                        setAppliedFilters({ ...filters });
                        setPage(1);
                    }}
                    className="btn btn-sm btn-primary"
                >
                    Filtrar
                </button>

                <button
                    onClick={() => {
                        const reset = {
                            search: '',
                            estado: '',
                            fechaInicio: '',
                            fechaFin: '',
                        };
                        setFilters(reset);
                        setAppliedFilters(reset);
                        setPage(1);
                    }}
                    className="btn btn-sm btn-secondary"
                >
                    Limpiar
                </button>
            </div>

            {isLoading ? (
                <div className="text-center text-blue-600">Cargando Usuarios... <Loader /></div>
            ) : error ? (
                <p className="text-red-600">Error: {(error as Error).message}</p>
            ) : (
                <>
                    <DataTable
                        headers={headers}
                        data={usuarios?.data ?? []}
                        renderRow={renderRow}
                        allSelected={allSelected}
                        toggleSelectAll={toggleSelectAll}
                    />

                    <div className="join mt-4">
                        <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="btn join-item">Anterior</button>
                        <button className="btn join-item btn-disabled">{page} / {usuarios?.lastPage}</button>
                        <button onClick={() => setPage(page + 1)} disabled={page >= (usuarios?.lastPage ?? 1)} className="btn join-item">Siguiente</button>
                    </div>
                </>
            )}

            <Modal />
        </div>
    );
};

export default TablaUsuarios;
