import React, { useState } from "react";
import { useClientes, useOcultarClientes } from "../../services/clientesServices";
import { useModal } from "../../context/ModalContext";
import TableCell from "../../shared/components/TableCell";
import { FaPen } from "react-icons/fa";
import { formatDate } from "../../utils/formatearFecha";
import DataTable from "../../shared/components/DataTable";
import Modal from "../../shared/components/Modal";
import Loader from "../../utils/Loader";
import FormularioCliente from "./FormularioCliente";
import FiltrosDeBusqueda from "../../shared/components/FiltrosDeBusqueda";


const TablaClientes: React.FC = () => {

    const { mutate: ocultarClientes } = useOcultarClientes();
    

    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const [filters, setFilters] = useState({
        search: '',
        estado: 'activo',
        fechaInicio: '',
        fechaFin: '',
    });

    const [appliedFilters, setAppliedFilters] = useState({
        search: '',
        estado: 'activo',
        fechaInicio: '',
        fechaFin: '',
    });

    const { data: clientes, isLoading, error }: { data: any; isLoading: boolean; error: any } = useClientes({
        page,
        search: appliedFilters.search,
        estado: appliedFilters.estado,
        fechaInicio: appliedFilters.fechaInicio,
        fechaFin: appliedFilters.fechaFin,
    });

    const { openModal, setModalTitle, setModalContent } = useModal();

    const allSelected = !!clientes?.data && clientes.data.length > 0 && selectedIds.length === clientes.data.length;

    const toggleSelectAll = () => {
        if (allSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(clientes?.data.map((u: any) => u.id) || []);
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
        'Apellido',
        'Email',
        'Celular',
        'Teléfono',
        'Dirección',
        'Estado',
        'Fecha de Creación',
    ];

    const handleEliminarSeleccionados = () => {
        console.log('IDs seleccionados:', selectedIds);
        // Aquí puedes llamar a tu servicio para eliminar los clientes seleccionados

        ocultarClientes(selectedIds);
    };

    const renderRow = (cliente: any) => (
        <tr key={cliente.id} className="hover:bg-gray-100 bg-white">
            <td className="px-2 text-sm text-gray-700 border-gray-300 border-b">
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedIds.includes(cliente.id)}
                        onChange={() => toggleSelect(cliente.id)}
                    />

                    <button 
                        className="flex items-center gap-1 hover:underline cursor-pointer text-orange-600 hover:text-orange-900 mr-4" 
                        onClick={() => openCustomModal(cliente)}
                    >
                        <FaPen /> <span>Editar</span>
                    </button>
                </div>
            </td>

            <TableCell>{cliente.id}</TableCell>
            <TableCell>{cliente.name}</TableCell>
            <TableCell>{cliente.lastName}</TableCell>
            <TableCell>{cliente.email}</TableCell>
            <TableCell>{cliente.phone}</TableCell>
            <TableCell>{cliente.phone_2}</TableCell>
            <TableCell>{cliente.address}</TableCell>
            <TableCell>{cliente.status}</TableCell>
            <TableCell>{formatDate(cliente.fecha_creacion)}</TableCell>
        </tr>
    );

    const openCustomModal = (cliente?: any) => {
        const isEdit = cliente?.id !== undefined;
        const key = isEdit ? `edit-${cliente.id}` : `create-${Date.now()}`;
        setModalTitle(isEdit ? 'Detalles del Cliente' : 'Registrar Nuevo Cliente');
        setModalContent(<FormularioCliente key={key} cliente={cliente} />);
        openModal();
    };

    return (
        <div className="overflow-x-auto space-y-4">


            {/* Filtros */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm overflow-auto scroll-auto">
                
                <FiltrosDeBusqueda
                    filters={filters}
                    setFilters={setFilters}
                />

                <div className="grid md:grid-cols-12 gap-4">

                    <div className="md:col-span-8 md:order-1 order-2 flex items-center justify-start gap-3 mt-4">

                        {/* <button
                            onClick={() => openCustomModal()}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-orange-600 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            <FaRegCheckSquare className="mr-2" />Registrar
                        </button> */}

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

            {isLoading ? (
                <div className="text-center text-blue-600">Cargando Clientes... <Loader /></div>
            ) : error ? (
                <p className="text-red-600">Error: {(error as Error).message}</p>
            ) : (
                <>
                    <DataTable
                        headers={headers}
                        data={clientes?.data ?? []}
                        renderRow={renderRow}
                        allSelected={allSelected}
                        toggleSelectAll={toggleSelectAll}
                    />

                    <div className="join mt-4">
                        <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="btn join-item">Anterior</button>
                        <button className="btn join-item btn-disabled">{page} / {clientes?.lastPage}</button>
                        <button onClick={() => setPage(page + 1)} disabled={page >= (clientes?.lastPage ?? 1)} className="btn join-item">Siguiente</button>
                    </div>
                </>
            )}

            <Modal />
        </div>
    );
};

export default TablaClientes;
