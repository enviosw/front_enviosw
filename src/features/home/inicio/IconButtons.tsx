import { FaUtensils, FaRegFileAlt, FaPills, FaWarehouse, FaTruck, FaShoppingCart, FaCreditCard, FaParachuteBox } from 'react-icons/fa';

const IconButtons = () => {
    return (
        <div className="flex justify-center overflow-x-auto space-x-6 py-4  scrollbar-hidden w-full pl-[350px] pr-5 lg:px-0">
            <div className="flex flex-col items-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 flex items-center justify-center">
                    <FaUtensils size={24} />
                </button>
                <span className="mt-2 text-black text-sm lg:text-lg font-semibold lg:font-normal">Restaurantes</span>
            </div>

            <div className="flex flex-col items-center">
                <button className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 flex items-center justify-center">
                    <FaRegFileAlt size={24} />
                </button>
                <span className="mt-2 text-black text-sm lg:text-lg font-semibold lg:font-normal">Detalles</span>
            </div>

            <div className="flex flex-col items-center">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-4 flex items-center justify-center">
                    <FaPills size={24} />
                </button>
                <span className="mt-2 text-black text-sm lg:text-lg font-semibold lg:font-normal">Droguerías</span>
            </div>

            <div className="flex flex-col items-center">
                <button className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-4 flex items-center justify-center">
                    <FaWarehouse size={24} />
                </button>
                <span className="mt-2 text-black text-sm lg:text-lg font-semibold lg:font-normal">Almacenes</span>
            </div>

            <div className="flex flex-col items-center">
                <button className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 flex items-center justify-center">
                    <FaTruck size={24} />
                </button>
                <span className="mt-2 text-black text-sm lg:text-lg font-semibold lg:font-normal">Recogidas</span>
            </div>

            <div className="flex flex-col items-center">
                <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 flex items-center justify-center">
                    <FaShoppingCart size={24} />
                </button>
                <span className="mt-2 text-black text-sm lg:text-lg font-semibold lg:font-normal">Compras</span>
            </div>

            <div className="flex flex-col items-center">
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-4 flex items-center justify-center">
                    <FaCreditCard size={24} />
                </button>
                <span className="mt-2 text-black text-sm lg:text-lg font-semibold lg:font-normal">Pagos</span>
            </div>

            <div className="flex flex-col items-center">
                <button className="bg-teal-500 hover:bg-teal-600 text-white rounded-full p-4 flex items-center justify-center">
                    <FaParachuteBox size={24} />
                </button>
                <span className="mt-2 text-black text-sm lg:text-lg font-semibold lg:font-normal">Envíos</span>
            </div>
        </div>
    );
};

export default IconButtons;
