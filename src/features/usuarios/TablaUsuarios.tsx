import React, { useState } from 'react';
import { useUsuarios } from '../../services/usuariosServices'; // Asegúrate de que la ruta sea correcta
import Loader from '../../utils/Loader';
import { formatDate } from '../../utils/formatearFecha';
import DataTable from '../../shared/components/DataTable';
import TableCell from '../../shared/components/TableCell';
import Modal from '../../shared/components/Modal';
import { useModal } from '../../context/ModalContext';
import FormularioUsuario from './FormularioUsuario'; // El formulario para registrar o editar usuarios
import { FaPen } from 'react-icons/fa';
import FiltrosDeBusqueda from '../../shared/components/FiltrosDeBusqueda';

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

            <td className="px-2 text-sm text-gray-700 border-gray-300 border-b">
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedIds.includes(usuario.id)}
                        onChange={() => toggleSelect(usuario.id)}
                    />

                    <button
                        className="flex items-center gap-1 hover:underline cursor-pointer text-orange-600 hover:text-orange-900 mr-4"
                        onClick={() => openCustomModal(usuario)}
                    >
                        <FaPen /> <span>Editar</span>
                    </button>
                </div>
            </td>

            <TableCell>{usuario.id}</TableCell>
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

    const multiOption = true;

    return (
        <div className="overflow-x-auto space-y-4">

            <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm overflow-auto scroll-auto">

                <div className="collapse bg-base-100 border-base-300 border">
                    <input type="checkbox" />
                    <div className="collapse-title font-semibold">Abrir filtros</div>
                    <div className="collapse-content text-sm">
                        <FiltrosDeBusqueda
                            filters={filters}
                            setFilters={setFilters}
                        />

                        <div className="grid md:grid-cols-12 gap-4">

                            <div className="md:col-span-8 md:order-1 order-2 flex items-center justify-start gap-3 mt-4">


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

                            <div className="md:col-span-4 md:order-2 order-1 flex justify-end gap-2 mt-4">

                                <button
                                    onClick={() => {
                                        setAppliedFilters({ ...filters });
                                        setPage(1);
                                    }}
                                    className="btn btn-md btn-primary rounded-md hover:opacity-70 px-4 text-white"
                                >
                                    Buscar
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
                                    className="btn btn-md btn-secondary rounded-md hover:opacity-70 px-4 text-white"
                                >
                                    Limpiar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>




            </div>

            <button onClick={() => openCustomModal()} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-orange-600 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                Registrar
            </button>


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
                        multiOption={multiOption}
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
