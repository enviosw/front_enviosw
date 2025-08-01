import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useProductosPublicos } from '../../../services/productosServices';
import MenuItem from '../shop/MenuItem';
import Cart from '../shop/Cart';
import { FaArrowLeft, FaSearch, FaTimes } from 'react-icons/fa';
// import Ubicacion from './Ubicacion';
// import CartaMenu from '../shop/CartaMenu';
import CategoryCarousel from '../shop/CategoryCarousel';
import ComercioHeader from './ComercioHeader';
import { BASE_URL } from '../../../utils/baseUrl';
import Modal from '../../../shared/components/Modal';
import { Producto } from '../../../shared/types/productosInterface';
import ToastNotification from './components/ToastNotification';
// import WhatsappShareIconButton from '../../../shared/components/WhatsappShareButton';
import SocialShareModalButton from '../../../shared/components/SocialShareModalButton';

const MenuList: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Aquí `id` es el id del comercio
    const [page, setPage] = useState(1);
    const [productos, setProductos] = useState<Producto[]>([]);
    const { state } = useLocation();
    const { comercio } = state || {};  // Accediendo al comercio desde location.state
    const [search, setSearch] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const location = useLocation();

    console.log(location)
    // Ahora puedes usar el objeto comercio aquí
    // console.log(comercio);  // Aquí tendrás todos los datos del comercio


    const [categoriaId, setCategoriaId] = useState<number | undefined>(undefined);
    const [selectedCategoriaId, setSelectedCategoriaId] = useState<number | undefined>(undefined);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const { data } = useProductosPublicos(Number(id), categoriaId, search, page); const lastPage = data?.lastPage || 1;
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);


    // FALTA ESTA FUNCIÓN:
    const handleLoadMore = () => {
        if (page < lastPage) {
            setPage((prev) => prev + 1);
        }
    };


    const productosAdaptados = productos?.map((producto) => ({
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: parseFloat(String(producto.precio)),
        precio_descuento: producto.precio_descuento
            ? parseFloat(String(producto.precio_descuento))
            : parseFloat(String(producto.precio)),
        categoria: producto.categoria?.nombre || 'Sin Categoría',
        unidad: producto.unidad || 'Unidad',
        estado: producto.estado || 'activo',
        estado_descuento: producto.estado_descuento || 'inactivo',
        fecha_creacion: producto.fecha_creacion,
        fecha_actualizacion: producto.fecha_actualizacion,
        image: producto.imagen_url,
    }));

    useEffect(() => {
        if (data) {
            if (page === 1) {
                setProductos(data.data);
            } else {
                setProductos((prev) => [...prev, ...data.data]);
            }
        }
    }, [data, page])


    useEffect(() => {
        setPage(1); // Reinicia a la primera página cuando cambia la categoría
    }, [categoriaId]);


    const handleSearch = () => {
        setSearch(searchValue.trim());
        setPage(1);
    };

    const handleClearSearch = () => {
        setSearchValue('');
        setSearch('');
        setPage(1);
    };


    useEffect(() => {
        if (searchValue === '') {
            setSearch('');
            setPage(1);
        }
    }, [searchValue]);

    const triggerToast = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
    };


    return (
        <div className="w-full min-h-screen bg-[#F3F4F6] text-gray-900">
            <div className="flex flex-col md:flex-row">
                {/* Contenido principal */}
                <div className="flex-1 flex flex-col items-center md:ml-0">
                    {/* Header */}
                    <header className="w-full fixed top-0 z-20 bg-transparent text-white px-4 py-4">
                        <div className="container mx-auto flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="text-white hover:text-[#FFD166] transition"
                                >
                                    <FaArrowLeft size={20} />
                                </button>
                                <img
                                    className="w-10 h-10 rounded-full border-2  text-gray-900"
                                    src={`${BASE_URL}/${comercio?.logo_url}`}
                                    alt="Logo"
                                />
                                {/* <h1 className="text-xl font-bold">{comercio?.nombre_comercial ?? 'Nombre Comercial'}</h1> */}
                            </div>
                            <div className="gap-4">
                                {/* <Ubicacion /> */}
{/* <WhatsappShareIconButton
  message={`Hola, te comparto el menú de *${comercio?.nombre_comercial ?? 'este comercio'}*: ${BASE_URL}${location.pathname}`}
/> */}

<SocialShareModalButton
  message={`Hola, mira el menú de *${comercio?.nombre_comercial ?? 'este comercio'}*:`}
  url={`${BASE_URL}${location.pathname}`}
/>
                     {/* <CartaMenu /> */}
                            </div>
                            <div className="fixed bottom-16 right-6 z-50">
                                <Cart />
                            </div>
                        </div>
                    </header>
                    <ComercioHeader
                        nombre={comercio?.nombre_comercial ?? 'Comercio'}
                        descripcion={comercio?.descripcion ?? 'Descripcion'}
                        horario="Lunes a Viernes · 9:00 AM - 6:00 PM" // Este dato lo puedes actualizar si está disponible
                        imagen={`${BASE_URL}/${comercio?.logo_url}`}
                    />

                    {/* Categorías */}
                    <div className=' rounded-t-4xl -translate-y-14 w-full h-full'>
                        <section className="w-full container pt-10 lg:pt-0 lg:mt-14 mx-auto px-4">
                            <div className="flex flex-col items-start space-y-2">
                                {/* Título pequeño */}
                                <h2 className="text-md font-medium text-gray-500 mx-auto lg:m-0 tracking-wide">
                                    Selecciona una categoría
                                </h2>

                                {/* Carrusel de categorías */}
                                <CategoryCarousel
                                    comercioId={Number(id)}
                                    onSelectCategoria={(id) => {
                                        setCategoriaId(id);
                                        setSelectedCategoriaId(id);
                                    }}
                                    selectedCategoriaId={selectedCategoriaId}
                                />
                            </div>
                        </section>

                        {/* Lista de productos */}
                        <main className="w-full container mx-auto px-4 py-6">
                            <div className="flex justify-start items-center mb-3">
                                <div className="relative w-full flex items-center">
                                    <input
                                        type="text"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        placeholder="Buscar productos..."
                                        className="w-full py-3 pl-10 pr-20 bg-[#FFB84D]/20 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out"
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        aria-label="Buscar productos"
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-600 transition-all duration-300"
                                        aria-label="Buscar"
                                    >
                                        <FaSearch />
                                    </button>
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


                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                                {productosAdaptados.map((item) => (
                                    <MenuItem key={item.id} {...item} comercioId={id} onAddToCartSuccess={triggerToast} // ⬅️ Nueva prop
                                    />
                                ))}
                            </div>

                            {page < lastPage && (
                                <div className="flex justify-center mt-8">
                                    <button
                                        onClick={handleLoadMore}
                                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-md"
                                    >
                                        Ver más productos
                                    </button>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
            <Modal />

            <ToastNotification
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />

        </div>
    );
};

export default MenuList;
