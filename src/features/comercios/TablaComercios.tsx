import React, { useState } from 'react';
import { useComercios } from '../../services/comerciosService';
import Loader from '../../utils/Loader';
import { formatDate } from '../../utils/formatearFecha';
import DataTable from '../../shared/components/DataTable';
import TableCell from '../../shared/components/TableCell';
import Modal from '../../shared/components/Modal';
import { useModal } from '../../context/ModalContext';
import FormularioComercio from './FormularioComercio';
import { FaPen, FaRegCheckSquare } from 'react-icons/fa';

const TablaComercios: React.FC = () => {
    const [page, setPage] = useState(1);

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

    const headers = [
        'ID',
        'Acciones',
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

    const renderRow = (comercio: any) => (
        <tr key={comercio.id} className="hover:bg-gray-100 bg-white">
            <TableCell>{comercio.id}</TableCell>
            <TableCell>
                <button onClick={() => openCustomModal(comercio)}>
                    <FaPen />
                </button>
            </TableCell>
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
        <div className="overflow-x-auto space-y-4">
            <button onClick={() => openCustomModal()} className="btn btn-success">
                <FaRegCheckSquare className="mr-2" /> Registrar
            </button>

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
                <div className="text-center text-blue-600">Cargando Comercios... <Loader /></div>
            ) : error ? (
                <p className="text-red-600">Error: {(error as Error).message}</p>
            ) : (
                <>
                    <DataTable headers={headers} data={comercios?.data ?? []} renderRow={renderRow} />

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
