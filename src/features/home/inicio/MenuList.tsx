import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductosPublicos } from '../../../services/productosServices';
import MenuItem from '../shop/MenuItem';
import Cart from '../shop/Cart';
import WhatsappButton from '../../../shared/components/buttons/WhatsappButton';
import { FaArrowLeft } from 'react-icons/fa';
import Ubicacion from './Ubicacion';
import CartaMenu from '../shop/CartaMenu';
import CategoryCarousel from '../shop/CategoryCarousel';
import ComercioHeader from './ComercioHeader';

const MenuList: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [categoriaId, setCategoriaId] = useState<number | undefined>(undefined);

    const { data: productos, isLoading, isError } = useProductosPublicos(Number(id), categoriaId);


    if (isLoading) return <div className="text-center py-10 text-gray-600">Cargando productos...</div>;
    if (isError) return <div className="text-center py-10 text-red-500">Error al cargar los productos.</div>;

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
        image: 'https://i.revistapym.com.co/old/2016/10/las-comidas-rapidas-1.png?w=728',
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
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUgdNmoM2kp33Mo_JHrQ9MXdxR5eeTuh0ng&s"
                                    alt="Logo"
                                />
                                <h1 className="text-xl font-bold">Sason del Alma</h1>
                            </div>
                            <div className="hidden lg:flex gap-4">
                                <Ubicacion />
                                <WhatsappButton phoneNumber="32321122112" message="Hola, quiero hacer un pedido" />
                                <CartaMenu />
                            </div>
                            <div className="fixed bottom-10 right-6 z-50">
                                <Cart />
                            </div>
                        </div>
                    </header>
                    <ComercioHeader
                        nombre="Sazón del Alma"
                        descripcion="Comida casera con amor, ideal para compartir en familia."
                        horario="Lunes a Viernes · 9:00 AM - 6:00 PM"
                        imagen="https://carloscortes.com.co/wp-content/uploads/2019/10/Logo-del-pollo-frisby-1024x448.jpg"
                    />

                    {/* Categorías */}
                    <section className="w-full container mt-24 mx-auto flex justify-center items-center px-4">
                        <CategoryCarousel
                            comercioId={Number(id)}
                            onSelectCategoria={setCategoriaId}
                        />
                    </section>

                    {/* Lista de productos */}
                    <main className="w-full container mx-auto px-4 py-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-white shadow-md rounded-xl py-4 px-3">
                            {productosAdaptados?.map((item) => (
                                <MenuItem key={item.id} {...item} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default MenuList;
