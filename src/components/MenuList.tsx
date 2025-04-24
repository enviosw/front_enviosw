import React, { useState } from 'react';
import MenuItem from './MenuItem';
import MenuFilters from './MenuFilters';
import Cart from './Cart';
import WhatsappButton from './WhatsappButton';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Ubicacion from './Ubicacion';
import CartaMenu from './CartaMenu';
import { menuData } from '../utils/array-items';
import InstagramButton from './InstagramButton';
import FacebookButton from './FacebookButton';
import CategoryCarousel from './CategoryCarousel';


const MenuList: React.FC = () => {
    const [filters, setFilters] = useState({
        category: '',
        minPrice: 0,
        maxPrice: 100,
        sortBy: '',
        search: '',
    });

    const categories = [...new Set(menuData.map((item) => item.category))];

    const filteredMenu = menuData
        .filter((item) =>
            (!filters.category || item.category === filters.category) &&
            item.name.toLowerCase().includes(filters.search.toLowerCase())
        )
        .sort((a, b) => {
            switch (filters.sortBy) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'name-asc': return a.name.localeCompare(b.name);
                case 'name-desc': return b.name.localeCompare(a.name);
                default: return 0;
            }
        });

    return (
        <div className="w-full min-h-screen flex flex-col relative bg-white overflow-hidden">
            {/* Contenedor principal */}
            <div className="flex flex-col md:flex-row w-full h-full">

                {/* Sidebar: visible solo en md+ */}
                <div className="hidden md:block w-[280px] fixed top-0 left-0 h-screen z-10 ">
                    <div className="flex flex-col justify-between  gap-5">
                        <div>
                            <Link to="/" className="flex items-center gap-2 justify-center py-2 rounded-full text-white bg-[#E63946] hover:bg-white hover:text-[#FF6900] px-2.5 mb-5 absolute top-3 left-3">
                                <FaArrowLeft size={20} />
                            </Link>

                            <div className="w-full h-40 bg-cover bg-center" style={{ backgroundImage: 'url(https://www.eafit.edu.co/servicios/PublishingImages/logo-domicilios/frisby-logo.jpg)' }}></div>

                            <h3 className="text-xl text-center font-bold text-[#FF6900] mt-4">Nombre del Local</h3>
                            <p className="text-center text-sm text-gray-600 mt-1">Horario de atención: Lunes - Viernes, 9:00 AM - 6:00 PM</p>

                            <div className="flex justify-center gap-2 mt-4">
                                <InstagramButton username="your_instagram_username" />
                                <FacebookButton pageId="your_facebook_page_id" />
                            </div>
                        </div>


                        <img className='mt-5' src="https://img.hwnstatic.com/500/350/80/false/S9z7b46NbIHwtT5s9oOjMrRdFCruUs1QTvrx4TYFzxzKqi7KVz.t20s.1t8dFogslr1oNN4Q54NCB1:6AkqyMTO82o3HotPVQ6ZxI3JPUnRTBx8ehGGvaIKKqGEjgeZ5uBRCKEIJVEWoerimbQIFDjqI1HDmraS.XWMwWT8Grau0sElS97s_" alt="" />

                        <img className='mt-5' src="https://wpa.aquarius.frisby.com.co/wp-content/uploads/2025/01/banner-secundario.jpg" alt="" />
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="flex-1 md:ml-[280px] flex flex-col items-center">

                    {/* Header fijo */}
                    <div className="w-full sticky top-0 z-10 bg-[#E63946] px-4 py-3">

                        <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">

                            {/* Logo + Nombre */}
                            <div className="flex items-center gap-2 min-w-[200px]">

                                <Link to="/">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUgdNmoM2kp33Mo_JHrQ9MXdxR5eeTuh0ng&s"
                                        alt="Logo"
                                    />
                                </Link>

                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                                    Sason del Alma
                                </h2>
                            </div>


                            {/* Botones alineados horizontalmente con scroll si no caben */}
                            <div className="flex-1 overflow-x-auto md:overflow-visible">
                                <div className="flex items-center gap-2 justify-end min-w-max">
                                    <div className='hidden lg:flex gap-2'>
                                        <Ubicacion />
                                        <WhatsappButton phoneNumber='32321122112' message='Hola, quiero hacer un pedido' />
                                        <CartaMenu />
                                    </div>
                                    <div className='fixed bottom-10 right-10'>
                                        <Cart />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>



                    {/* Contenido con padding para evitar que quede detrás del header */}
                    <div className="w-full mt-[20px] px-4 overflow-hidden">
                        <div className='overflow-hidden'>
                            <CategoryCarousel />
                        </div>

                        <MenuFilters categories={categories} onFilterChange={setFilters} />
                        <div className="pt-6 flex flex-wrap gap-5">
                            {filteredMenu.map((item, index) => (
                                <MenuItem key={index} {...item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MenuList;