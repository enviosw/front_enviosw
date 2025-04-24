import React from 'react'
import { FaBook } from 'react-icons/fa'
import { useModal } from '../context/ModalContext';



const Menu = () => {
    return (
        <img className='w-full h-full' src="https://cdn.restauracionnews.com/2022/09/cartas-inspiradoras-para-tu-restaurante.jpg" alt="" />
    )
}




const CartaMenu: React.FC = () => {

    const { openModal, setModalTitle, setModalContent } = useModal();

    const openCustomModal = () => {
        setModalTitle('Carta');
        setModalContent(<Menu />);
        openModal();
    };




    return (
        <button
            onClick={openCustomModal}
            className="flex items-center gap-2 px-5 py-3 bg-white rounded-full text-blue-600 hover:bg-blue-500 hover:text-white transition-all shadow-md"
        >
            <FaBook size={20} />
        </button>
    )
}

export default CartaMenu