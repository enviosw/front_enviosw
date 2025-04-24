import React from 'react';
import { useModal } from '../context/ModalContext';
import { FaTimes } from 'react-icons/fa';

const Modal: React.FC = () => {
    const { isOpen, closeModal, modalTitle, modalContent } = useModal();

    return (
        <div className={`modal ${isOpen ? 'modal-open' : ''}`} role="dialog">
            <div className="modal-box w-11/12 max-w-5xl relative">
                <h3 className="text-lg font-bold">{modalTitle}</h3>
                <div className="py-4">{modalContent}</div>
                <div className="modal-action absolute top-0 right-5">
                    <button className="cursor-pointer" onClick={closeModal}>
                        <FaTimes className="text-xl text-gray-500 hover:text-red-500 transition " />

                    </button>
                </div>
            </div>
            <label className="modal-backdrop" onClick={closeModal}></label>
        </div>
    );
};

export default Modal;
