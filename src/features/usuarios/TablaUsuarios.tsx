import React from 'react';
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
    const { data: usuarios, isLoading, error } = useUsuarios();
    const { openModal, setModalTitle, setModalContent } = useModal();

    const headers = [
        'ID',
        'Acciones',
        'Nombre',
        'Email',
        'Rol',
        'Estado',
        'Fecha de Creación',
    ];

    // Condicional para cuando se está cargando
    if (isLoading) {
        return (
            <div className="text-center text-blue-600">
                Cargando Usuarios... <Loader />
            </div>
        );
    }

    if (error instanceof Error) {
        return <p className="text-center text-red-600">Error: {error.message}</p>;
    }

    const renderRow = (usuario: any) => (
        <tr key={usuario.id} className="hover:bg-gray-100 bg-white">
            <TableCell>{usuario.id}</TableCell>
            <TableCell>
                <button onClick={() => openCustomModal(usuario)} className="py-3">
                    <FaPen />
                </button>
            </TableCell>
            <TableCell>{usuario.nombre}</TableCell>
            <TableCell>{usuario.email}</TableCell>
            <TableCell>{usuario.rol}</TableCell>
            <TableCell>{usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}</TableCell>
            <TableCell>{formatDate(usuario.fecha_creacion)}</TableCell>
        </tr>
    );

    const openCustomModal = (usuario?: any) => {
        if (usuario) {
            setModalTitle('Editar Usuario');
            setModalContent(<FormularioUsuario usuario={usuario} />);
        } else {
            setModalTitle('Registrar Usuario');
            setModalContent(<FormularioUsuario />);
        }
        openModal();
    };

    return (
        <div className="overflow-x-auto">
            <button onClick={() => openCustomModal()} className="btn btn-success mb-4">
                <FaRegCheckSquare className="mr-2" />
                Registrar Usuario
            </button>
            <DataTable headers={headers} data={usuarios ?? []} renderRow={renderRow} />
            <Modal />
        </div>
    );
};

export default TablaUsuarios;
