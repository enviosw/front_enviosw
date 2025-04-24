import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useModal } from '../context/ModalContext';
import Modal from './Modal';
import MapaDinamico from './MapaDinamico';


const Ubicacion: React.FC = () => {

    const { openModal, setModalTitle, setModalContent } = useModal();

    const openCustomModal = () => {
        setModalTitle('Nuestra Ubicacion');
        setModalContent(<MapaDinamico />);
        openModal();
    };

    return (
        <>
            <button
                onClick={openCustomModal}
                className="flex items-center gap-2 px-5 py-3 bg-white rounded-full text-[#25D366] hover:bg-green-500 hover:text-white transition-all shadow-md"
            >
                <FaMapMarkerAlt size={20} className="text-red-500" />
            </button>
            <Modal />
        </>
    )
}

export default Ubicacion