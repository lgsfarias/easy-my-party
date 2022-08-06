/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import Modal from 'react-modal';
import useModal from '../../hooks/useModal';
import * as S from './style';

Modal.setAppElement('#root');

interface Props {
  children: React.ReactNode;
}

export default function ModalComponent({ children } : Props) {
  const {
    afterOpenModal, closeModal, modalIsOpen,
  } = useModal();
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      contentLabel="Delete Modal"
      className="_"
      overlayClassName="_"
      contentElement={(props, contentElement) => (
        <S.ModalStyle {...props}>{contentElement}</S.ModalStyle>
      )}
      overlayElement={(props, overlayElement) => (
        <S.OverlayStyle {...props}>{overlayElement}</S.OverlayStyle>
      )}
    >
      {children}
    </Modal>
  );
}
