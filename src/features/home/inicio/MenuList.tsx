import React, { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useProductosPublicos } from '../../../services/productosServices';
import MenuItem from '../shop/MenuItem';
import Cart from '../shop/Cart';
import WhatsappButton from '../../../shared/components/buttons/WhatsappButton';
import { FaArrowLeft } from 'react-icons/fa';
import Ubicacion from './Ubicacion';
import CartaMenu from '../shop/CartaMenu';
import CategoryCarousel from '../shop/CategoryCarousel';
import ComercioHeader from './ComercioHeader';
import { BASE_URL } from '../../../utils/baseUrl';

const MenuList: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Aquí `id` es el id del comercio

    const { state } = useLocation();
    const { comercio } = state || {};  // Accediendo al comercio desde location.state

    // Ahora puedes usar el objeto comercio aquí
    console.log(comercio);  // Aquí tendrás todos los datos del comercio


    const [categoriaId, setCategoriaId] = useState<number | undefined>(undefined);
    const [selectedCategoriaId, setSelectedCategoriaId] = useState<number | undefined>(undefined);


    const { data: productos } = useProductosPublicos(Number(id), categoriaId);

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

    return (
        <div className="w-full min-h-screen bg-[#fafafa] text-gray-900">
            <div className="flex flex-col md:flex-row">
                {/* Contenido principal */}
                <div className="flex-1 flex flex-col items-center md:ml-0">
                    {/* Header */}
                    <header className="w-full sticky top-0 z-20 bg-[#000000] text-white px-4 py-4 shadow-lg">
                        <div className="container mx-auto flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Link to="/" className="text-white hover:text-[#FFD166] transition">
                                    <FaArrowLeft size={20} />
                                </Link>
                                <img
                                    className="w-10 h-10 rounded-full border-2 border-white"
                                    src={`${BASE_URL}/${comercio.logo_url}`}
                                    alt="Logo"
                                />
                                <h1 className="text-xl font-bold">{comercio.nombre_comercial || 'Nombre Comercial'}</h1>
                            </div>
                            <div className="hidden lg:flex gap-4">
                                <Ubicacion />
                                <WhatsappButton phoneNumber={comercio.telefono || 0} message="Hola, quiero hacer un pedido" />
                                <CartaMenu />
                            </div>
                            <div className="fixed bottom-10 right-6 z-50">
                                <Cart />
                            </div>
                        </div>
                    </header>
                    <ComercioHeader
                        nombre={comercio.nombre_comercial}
                        descripcion={comercio.descripcion}
                        horario="Lunes a Viernes · 9:00 AM - 6:00 PM" // Este dato lo puedes actualizar si está disponible
                        imagen={`${BASE_URL}/${comercio.logo_url}`}  // Suponiendo que `logo_url` está en `comercio`
                    />

                    {/* Categorías */}
                    <section className="w-full container lg:mt-14 mx-auto flex justify-center items-center px-4">
                        <CategoryCarousel
                            comercioId={Number(id)}
                            onSelectCategoria={(id) => {
                                setCategoriaId(id);
                                setSelectedCategoriaId(id);
                            }}
                            selectedCategoriaId={selectedCategoriaId}
                        />
                    </section>

                    {/* Lista de productos */}
                    <main className="w-full container mx-auto px-4 py-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-white shadow-md rounded-xl py-4 px-3">
                            {productosAdaptados?.map((item) => (
                                <MenuItem key={item.id} {...item} comercioId={id} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default MenuList;
