import React from 'react'
import { useModal } from '../../context/ModalContext';
import GestionarWelcomeImage from '../../features/config/GestionarWelcomeImage';
import Modal from '../../shared/components/Modal';

const Config: React.FC = () => {
  const { openModal, setModalTitle, setModalContent } = useModal();

  return (
    <div className='w-full'>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Configurar imagen chatbot</h1>

      <button
        className="btn btn-outline"
        onClick={() => {
          setModalTitle("Imagen de bienvenida");
          setModalContent(<GestionarWelcomeImage />);
          openModal();
        }}
      >
        Gestionar imagen de bienvenida
      </button>

      {/* ✅ IMPORTANTE */}
      <Modal />
    </div>
  )
}

export default Config;
