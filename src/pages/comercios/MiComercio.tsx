import React from 'react'
import TablaProductos from '../../features/productos/TablaProductos'
import TablaCategorias from '../../features/categorias/TablaCategorias'
import ComercioHorario from '../../features/comercios/ComercioHorario'
import { useAuth } from '../../context/AuthContext'
import { FiLogOut } from 'react-icons/fi'
import { AlertService } from '../../utils/AlertService'
import { useNavigate } from 'react-router-dom'

const MiComercio: React.FC = () => {
    const { user, logout } = useAuth();
    const comercioId = user?.comercioId;
    const navigate = useNavigate();

    const handleLogOut = async () => {
        const confirmed = await AlertService.confirm(
            '¿Cerrar sesión?',
            '¿Estás seguro de que deseas salir de tu cuenta?'
        );

        if (confirmed) {
            logout();
            navigate('/login');
        }
    }

    return (
        <>
            <div className="flex justify-end p-4 fixed top-10 right-10">
                <button
                    onClick={handleLogOut}
                    className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-all"
                >
                    <FiLogOut size={20} />
                    <span>Salir</span>
                </button>
            </div>

            <div className="tabs tabs-border">
                <input type="radio" name="my_tabs_2" className="tab" aria-label="Productos" defaultChecked />
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <TablaProductos />
                </div>

                <input type="radio" name="my_tabs_2" className="tab" aria-label="Categorias" />
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <TablaCategorias />
                </div>

                <input type="radio" name="my_tabs_2" className="tab" aria-label="Horarios" />
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <ComercioHorario comercioId={Number(comercioId)} />
                </div>
            </div>
        </>
    )
}

export default MiComercio
