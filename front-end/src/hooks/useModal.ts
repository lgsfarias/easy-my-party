import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';

export default function useModal() {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error('useAlert must be used inside a AlertContext Provider');
  }

  return modalContext;
}
