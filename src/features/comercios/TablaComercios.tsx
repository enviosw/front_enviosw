import React from 'react';
import { useComercios } from '../../services/comerciosService';
import Loader from '../../utils/Loader';
import { formatDate } from '../../utils/formatearFecha';
import DataTable from '../../shared/components/DataTable'; // Asegúrate de importar el componente DataTable
import TableCell from '../../shared/components/TableCell';
import Modal from '../../shared/components/Modal';
import { useModal } from '../../context/ModalContext';
import FormularioComercio from './FormularioComercio';
import { FaPen, FaRegCheckSquare } from 'react-icons/fa';

const TablaComercios: React.FC = () => {
    const { data: comercios, isLoading, error } = useComercios();
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
        'Activo',
        'Fecha',
        'Tipo de Comercio',
    ];

    // Condicional para cuando se está cargando
    if (isLoading) {
        return (
            <div className="text-center text-blue-600">
                Cargando Comercios... <Loader />
            </div>
        );
    }

    if (error instanceof Error) {
        return <p className="text-center text-red-600">Error: {error.message}</p>;
    }

    const renderRow = (comercio: any) => (
        <tr key={comercio.id} className="hover:bg-gray-100 bg-white">
            <TableCell>{comercio.id}</TableCell>
            <TableCell>
                <button onClick={openCustomModal} className="">
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
            <TableCell>{comercio.activo ? 'Sí' : 'No'}</TableCell>
            <TableCell>{formatDate(comercio.fecha_creacion)}</TableCell>
            <TableCell>{comercio.tipo.nombre}</TableCell>

        </tr>
    );

    const openCustomModal = () => {
        setModalTitle('Registrar Comercio');
        setModalContent(<FormularioComercio />);
        openModal();
    };

    return (
        <div className="overflow-x-auto">
            <button onClick={openCustomModal} className="btn btn-success mb-4">
                <FaRegCheckSquare className="mr-2" />
                Registrar
            </button>
            <DataTable headers={headers} data={comercios ?? []} renderRow={renderRow} />
            <Modal />
        </div>
    );
};

export default TablaComercios;
