import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaSearch, FaTimes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { useComerciosPublicos } from '../../../services/comerciosService';
import { Comercio } from '../../../shared/types/comercioInterface';
import Skeleton from '../../../utils/Skeleton';
import { BASE_URL } from '../../../utils/baseUrl';
import { getEstadoComercio } from '../../../utils/getEstadoComercio';

const LocalesComerciales: React.FC<{ servicioId: number | null }> = ({ servicioId }) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useComerciosPublicos({ servicioId, search, page });

    console.log(data)

    const [locales, setLocales] = useState<Comercio[]>([]);
    const lastPage = data?.lastPage || 1;

    // Cuando cambia la data, acumulo resultados si es paginación, si es nueva búsqueda, reseteo.
    useEffect(() => {
        if (data) {
            if (page === 1) {
                setLocales(data.data);
            } else {
                setLocales((prev) => [...prev, ...data.data]);
            }
        }
    }, [data, page]);

    // Resetear búsqueda cuando se borra el input
    useEffect(() => {
        if (searchValue === '') {
            setSearch('');
            setPage(1);
        }
    }, [searchValue]);

    const handleSearch = () => {
        setSearch(searchValue.trim());
        setPage(1); // Reinicia a la primera página
    };

    const handleClearSearch = () => {
        setSearchValue('');
        setSearch('');
        setPage(1);
    };

    const handleLoadMore = () => {
        if (page < lastPage) {
            setPage(prev => prev + 1);
        }
    };

    if (isLoading && page === 1) {
        return <Skeleton />;
    }

    if (isError) {
        return <div>Error al cargar locales</div>;
    }

    return (
        <div className='w-full'>
            {/* Buscador */}
            <div className="flex justify-start items-center mb-6">
                <div className="relative w-full max-w-full flex items-center">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Buscar..."
                        className="w-full py-3 pl-10 pr-20 bg-[#FFB84D]/20 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out"
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        aria-label="Buscar contenido"
                    />
                    {/* Botón de búsqueda */}
                    <button
                        onClick={handleSearch}
                        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-600 transition-all duration-300"
                        aria-label="Realizar búsqueda"
                    >
                        <FaSearch />
                    </button>
                    {/* Botón de limpiar */}
                    {searchValue && (
                        <button
                            onClick={handleClearSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition-all duration-300"
                            aria-label="Limpiar búsqueda"
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>
            </div>

            {/* Lista de locales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6">
                {locales?.map((comercio: Comercio) => {

                    const estado = getEstadoComercio(comercio.horarios); // Llamamos a la función con los horarios e id del comercio
                    return (
                        <div
                            key={comercio.id}
                            onClick={() => navigate(`/comercio/${comercio.id}/productos`, { state: { comercio } })}
                            className="cursor-pointer bg-white border-b-[1px] border-gray-200 hover:rounded-2xl rounded-t-2xl hover:shadow-xl transition duration-300 overflow-hidden relative"
                        >
                            <div className="relative h-[180px]">
                                <img
                                    src={comercio.logo_url ? `${BASE_URL}/${comercio.logo_url}` : "logo_w_fondo_negro.jpeg"}
                                    alt={comercio.nombre_comercial}
                                    className="w-full rounded-2xl overflow-hidden h-full object-cover transition-transform min-w-72 break-words break-normal whitespace-nowrap truncate"

                                />
                                <div className="absolute bottom-2 right-2 z-20 bg-white text-green-600 font-semibold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                    <AiFillStar className="text-green-500" /> {comercio.servicio?.nombre || 'Sin tipo'}
                                </div>
                            </div>
                            <div className="pb-3 pt-1 px-2">
                                <h3 className="text-base font-bold text-[#2E2C36] truncate">{comercio.nombre_comercial}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2">{comercio.descripcion}</p>
                                <div className="flex items-center justify-between text-xs font-medium text-gray-600 pt-2">
                                    <div className="flex items-center gap-1 truncate">
                                        <FaMapMarkerAlt className="text-green-600" />
                                        <span>{comercio.direccion || 'Sin dirección'}</span>
                                    </div>
                                    <span
                                        className="flex items-center text-green-600 gap-1 bg-gray-50 px-3 py-1 rounded-full"
                                        aria-live="polite"  // Para informar cambios de estado
                                    >
                                        {/* Mostrar el estado con íconos y texto */}
                                        {estado === 'abierto' ? (
                                            <>
                                                <FaCheckCircle
                                                    className="text-green-500"
                                                    aria-label="Servicio abierto" // Añadir descripción al icono
                                                />
                                                <span className="text-green-500 font-semibold">Abierto</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaTimesCircle
                                                    className="text-red-500"
                                                    aria-label="Servicio cerrado" // Añadir descripción al icono
                                                />
                                                <span className="text-red-500 font-semibold">Cerrado</span>
                                            </>
                                        )}
                                    </span>

                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Ver más locales */}
            {page < lastPage && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleLoadMore}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-md"
                    >
                        Ver más locales
                    </button>
                </div>
            )}
        </div>
    );
};

export default LocalesComerciales;
