import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import useAuth from '../../hooks/useAuth';
import * as S from './style';
import api from '../../services/api';
import useAlert from '../../hooks/useAlert';
import ModalComponent from '../../components/Modal';
import useModal from '../../hooks/useModal';
import { GuestInterface } from '../../interfaces';

export default function GuestsPage() {
  const { partyId } = useParams();
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const { openModal, closeModal } = useModal();
  const [guests, setGuests] = useState<GuestInterface[]>([]);
  const [guestName, setGuestName] = useState<string>('');
  const [guestDependents, setGuestDependents] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');

  async function getGuests() {
    try {
      const response = await api.get(`/parties/${partyId}/guests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGuests(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao buscar convidados' });
    }
  }

  async function handleCreateGuest() {
    // if (!guestName || !guestEmail || !guestDependents) {
    //   setMessage({ type: 'error', text: 'Preencha todos os campos' });
    //   return;
    // }

    // try {
    //   await api.post(`/parties/${partyId}/guests`, {
    //     name: guestName,
    //     email: guestEmail,
    //     dependents: parseInt(guestDependents),
    //   }, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   setGuestName('');
    //   setGuestEmail('');
    //   setGuestDependents(0);
    //   closeModal();
    //   getGuests();
    // } catch (error: Error | AxiosError | any) {
    //   if (error.response) {
    //     setMessage({ type: 'error', text: error.response.data.message });
    //   }
    // }
    console.log('handleCreateGuest');
  }

  useEffect(() => {
    getGuests();
  }, []);

  return (
    <div>
      <ModalComponent>
        <h1>Novo Convidado</h1>
        <p style={{ marginBottom: '1rem' }}>
          O seu convidado receberá um email de confirmação com as
          informações da festa e poderá confirmar a presença por este email.
        </p>
        <S.ModalInput
          type="text"
          placeholder="Nome"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />
        <S.ModalInput
          type="number"
          placeholder="Numero de Dependentes"
          value={guestDependents}
          onChange={(e) => setGuestDependents(Number(e.target.value))}
        />
        <S.ModalInput
          type="email"
          placeholder="Email"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
        />
        <div className="buttons">
          <button type="button" className="white" onClick={closeModal}>
            Cancelar
          </button>
          <button
            type="button"
            className="blue"
            onClick={handleCreateGuest}
          >
            Confirmar
          </button>
        </div>
      </ModalComponent>
      <Header />
      <S.GuestsPageWrapper>
        <div className="add-guest">
          <h2>Adicionar Convidado</h2>
          <S.GuestsAddButton onClick={() => openModal()}>+</S.GuestsAddButton>
        </div>
        {guests.map((guest) => (
          <div key={guest.id}>
            <h1>{guest.name}</h1>
            <p>{guest.email}</p>
            <p>{guest.dependents}</p>
            <p>
              confirmed:
              {' '}
              {JSON.stringify(guest.confirmed)}
            </p>
          </div>
        ))}
      </S.GuestsPageWrapper>
      <Footer />
    </div>
  );
}
