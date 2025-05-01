import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { useComerciosPublicos } from '../../../services/comerciosService';
import { Comercio } from '../../../shared/types/comercioInterface';
import Skeleton from '../../../utils/Skeleton';

// Custom Hook para obtener comercios
const useComercios = (servicioId: number | null) => {
    const { data, isLoading, isError, error } = useComerciosPublicos(servicioId);

    if (isLoading) {
        return { isLoading, comercios: [] };
    }

    if (isError) {
        console.error(error);
        return { isLoading, comercios: [] };
    }

    return { isLoading, comercios: data || [] };
};

const LocalesComerciales: React.FC<{ servicioId: number | null }> = ({ servicioId }) => {
    const navigate = useNavigate();
    const { isLoading, comercios } = useComercios(servicioId);

    if (isLoading) {
        return <Skeleton />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6">
            {comercios?.map((comercio: Comercio) => (
                <div
                    key={comercio.id}
                    onClick={() => navigate(`/local/${comercio.id}`)}
                    className="group cursor-pointer bg-white hover:bg-[#E63946] rounded-3xl hover:shadow-xl transition duration-300 overflow-hidden relative border border-gray-200"
                >
                    <div className="relative h-48">
                        <img
                            src={comercio.logo_url || 'logo_w_fondo_negro.jpeg'}
                            alt={comercio.nombre_comercial}
                            className="w-full h-full object-cover transition-transform min-w-72 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

                        <div className="absolute bottom-2 right-2 z-20 bg-white text-green-600 font-semibold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow">
                            <AiFillStar className="text-green-500" /> {comercio.servicio ? comercio.servicio.nombre : 'Sin tipo'}
                        </div>
                    </div>

                    <div className="p-4 space-y-2">
                        <h3 className="text-base font-bold text-gray-800 group-hover:text-white truncate">{comercio.nombre_comercial}</h3>
                        <p className="text-sm text-gray-500 group-hover:text-white line-clamp-2">{comercio.descripcion}</p>

                        <div className="flex items-center justify-between text-xs font-medium group-hover:text-white text-gray-600 pt-2">
                            <div className="flex items-center gap-1">
                                <FaClock className="text-green-600 group-hover:text-white" />
                                15-25 min
                            </div>
                            <span className="flex items-center group-hover:text-white text-green-600 gap-1">
                                <FaCheckCircle /> Disponible
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LocalesComerciales;
