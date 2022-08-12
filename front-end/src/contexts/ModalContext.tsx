import { createContext, useState } from 'react';

interface ModalContextInterface {
  modalIsOpen: boolean;
  openModal: () => void;
  afterOpenModal: () => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

export function ModalProvider({ children }: Props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider value={{
      modalIsOpen, openModal, afterOpenModal, closeModal,
    }}
    >
      {children}
    </ModalContext.Provider>
  );
}
