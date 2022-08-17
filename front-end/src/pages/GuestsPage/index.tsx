import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import useAuth from '../../hooks/useAuth';
import * as S from './style';
import api from '../../services/api';
import useAlert from '../../hooks/useAlert';
import ModalComponent from '../../components/Modal';
import useModal from '../../hooks/useModal';
import { GuestInterface } from '../../interfaces';
import GuestBox from '../../components/GuestBox';

export default function GuestsPage() {
  const { partyId } = useParams();
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const { openModal, closeModal } = useModal();
  const [guests, setGuests] = useState<GuestInterface[]>([]);
  const [guestName, setGuestName] = useState<string>('');
  const [guestDependents, setGuestDependents] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const totalGuests = guests.reduce((acc, curr) => acc + curr.dependents + 1, 0);
  const totalGuestsConfirmed = guests
    .filter((guest) => guest.confirmed)
    .reduce((acc, curr) => acc + curr.dependents + 1, 0);

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
    setLoading(true);
    if (!guestName || !guestEmail || !guestDependents) {
      setMessage({ type: 'error', text: 'Preencha todos os campos' });
      setLoading(false);
      return;
    }

    try {
      await api.post(`/parties/${partyId}/guests`, {
        name: guestName,
        email: guestEmail,
        dependents: Number(guestDependents),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGuestName('');
      setGuestEmail('');
      setGuestDependents('');
      closeModal();
      getGuests();
      setMessage({ type: 'success', text: 'Convidado criado com sucesso' });
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        setMessage({ type: 'error', text: error.response.data.message });
      }
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
        />
        <S.ModalInput
          type="text"
          placeholder="Numero de Dependentes"
          value={guestDependents}
          onChange={(e) => setGuestDependents(e.target.value)}
          disabled={loading}
        />
        <S.ModalInput
          type="email"
          placeholder="Email"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
          disabled={loading}
        />
        <div className="buttons">
          <button type="button" className="white" onClick={closeModal} disabled={loading}>
            {
              loading
                ? <ThreeDots color="#222244" />
                : 'Cancelar'
            }
          </button>
          <button
            type="button"
            className="blue"
            onClick={handleCreateGuest}
            disabled={loading}
          >
            {
              loading
                ? <ThreeDots color="#fff" />
                : 'Confirmar'
            }
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
          <GuestBox key={guest.id} guest={guest} />
        ))}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%', marginTop: '2rem',
        }}
        >
          <h2>
            Total de convidados:
            {' '}
            {totalGuests}
          </h2>
          <h2>
            Confirmados:
            {' '}
            {totalGuestsConfirmed}
          </h2>
        </div>
      </S.GuestsPageWrapper>
      <Footer />
    </div>
  );
}
