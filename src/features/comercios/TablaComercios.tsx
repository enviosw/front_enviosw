import React, { useState } from 'react';
import { useComercios, useToggleActivarNumeroComercio } from '../../services/comerciosService';
import Loader from '../../utils/Loader';
import { formatDate } from '../../utils/formatearFecha';
import DataTable from '../../shared/components/DataTable';
import TableCell from '../../shared/components/TableCell';
import Modal from '../../shared/components/Modal';
import { useModal } from '../../context/ModalContext';
import FormularioComercio from './FormularioComercio';
import { FaPen } from 'react-icons/fa';
import FiltrosDeBusqueda from '../../shared/components/FiltrosDeBusqueda';

const TablaComercios: React.FC = () => {
    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const { mutate: toggleActivar } = useToggleActivarNumeroComercio();


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

    const { data: comercios, isLoading, error } = useComercios({
        page,
        search: appliedFilters.search,
        estado: appliedFilters.estado,
        fechaInicio: appliedFilters.fechaInicio,
        fechaFin: appliedFilters.fechaFin,
    });

    const { openModal, setModalTitle, setModalContent } = useModal();

    const allSelected = !!comercios?.data && comercios.data.length > 0 && selectedIds.length === comercios.data.length;

    const toggleSelectAll = () => {
        if (allSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(comercios?.data.map((c: any) => c.id) || []);
        }
    };

    const toggleSelect = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const headers = [
        'ID',
        'Aciones',
        'Enviar_a_w',
        'Nombre',
        'Razón',
        'NIT',
        'Responsable',
        'Email',
        'Teléfono',
        'Teléfono',
        'Dirección',
        'estado',
        'Fecha',
        'Tipo de Comercio',

    ];

    const handleEliminarSeleccionados = () => {
        console.log('IDs seleccionados:', selectedIds);
        // Aquí puedes llamar a tu servicio para eliminar los comercios
    };


    const renderRow = (comercio: any) => (
        <tr key={comercio.id} className="hover:bg-gray-100 bg-white">
            <TableCell>{comercio.id}</TableCell>

            <td className="px-2 text-sm text-gray-700 border-gray-300 border-b">
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedIds.includes(comercio.id)}
                        onChange={() => toggleSelect(comercio.id)}
                    />

                    <button
                        className="flex items-center gap-1 hover:underline cursor-pointer text-orange-600 hover:text-orange-900 mr-4"
                        onClick={() => openCustomModal(comercio)}
                    >
                        <FaPen /> <span>Editar</span>
                    </button>
                </div>

            </td>

            <TableCell> <input
                type="checkbox"
                className="toggle toggle-info"
                checked={comercio.activar_numero === 1}
                onChange={() => toggleActivar(comercio.id)}
            /></TableCell>
            <TableCell>{comercio.nombre_comercial}</TableCell>
            <TableCell>{comercio.razon_social}</TableCell>
            <TableCell>{comercio.nit}</TableCell>
            <TableCell>{comercio.responsable}</TableCell>
            <TableCell>{comercio.email_contacto}</TableCell>
            <TableCell>{comercio.telefono}</TableCell>
            <TableCell>{comercio.telefono_secundario}</TableCell>
            <TableCell>{comercio.direccion}</TableCell>
            <TableCell>{comercio.estado}</TableCell>
            <TableCell>{formatDate(comercio.fecha_creacion)}</TableCell>
            <TableCell>{comercio.servicio?.nombre ?? ''}</TableCell>



        </tr>
    );

    const openCustomModal = (comercio?: any) => {
        const isEdit = comercio?.id !== undefined;
        const key = isEdit ? `edit-${comercio.id}` : `create-${Date.now()}`;
        setModalTitle(isEdit ? 'Actualizar Comercio' : 'Registrar Comercio');
        setModalContent(<FormularioComercio key={key} comercio={comercio} />);
        openModal();
    };

    return (
        <div className="overflow-x-auto w-full space-y-4">
            {/* Filtros */}
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
                <div className="text-center text-blue-600">Cargando Comercios... <Loader /></div>
            ) : error ? (
                <p className="text-red-600">Error: {(error as Error).message}</p>
            ) : (
                <>
                    <DataTable headers={headers} data={comercios?.data ?? []} renderRow={renderRow} allSelected={allSelected}
                        toggleSelectAll={toggleSelectAll} />

                    <div className="join mt-4">
                        <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="btn join-item">Anterior</button>
                        <button className="btn join-item btn-disabled">{page} / {comercios?.lastPage}</button>
                        <button onClick={() => setPage(page + 1)} disabled={page >= (comercios?.lastPage ?? 1)} className="btn join-item">Siguiente</button>
                    </div>
                </>
            )}

            <Modal />
        </div>
    );
};

export default TablaComercios;
