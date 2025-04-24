import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definir el tipo de contexto
interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalTitle: string;
  setModalTitle: (title: string) => void;
  modalContent: ReactNode;
  setModalContent: (content: ReactNode) => void;
}

// Crear el contexto
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Componente proveedor del contexto
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        modalTitle,
        setModalTitle,
        modalContent,
        setModalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Hook para usar el contexto
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal debe ser usado dentro de un ModalProvider');
  }
  return context;
};
