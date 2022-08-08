import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import br from 'date-fns/locale/pt-BR';
import PartyBox from '../../components/PartyBox';
import useAuth from '../../hooks/useAuth';
import { PartyInterface } from '../../interfaces';
import api from '../../services/api';
import * as S from './style';
import 'react-datepicker/dist/react-datepicker.css';
import useAlert from '../../hooks/useAlert';
import ModalComponent from '../../components/Modal';
import useModal from '../../hooks/useModal';
import Header from '../../components/Header';

export default function Home() {
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const { openModal, closeModal } = useModal();
  const [parties, setParties] = useState<PartyInterface[]>([]);
  const [partyDate, setPartyDate] = useState<Date | null>(null);
  const [partyName, setPartyName] = useState<string>('');
  registerLocale('br', br);

  async function getParties() {
    try {
      const response = await api.get('/parties', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setParties(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao buscar festas' });
    }
  }

  async function handleCreateParty() {
    if (!partyDate || !partyName) {
      setMessage({ type: 'error', text: 'Preencha todos os campos' });
      return;
    }

    try {
      const response = await api.post('/parties', {
        name: partyName,
        date: partyDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      closeModal();
      // setMessage({ type: 'success', text: 'Festa adicionada com sucesso' });
      getParties();
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao adicionar festa' });
    }
  }

  useEffect(() => {
    getParties();
  }, []);

  return (
    <>
      <ModalComponent>
        <h1>Nova Festa</h1>
        <S.ModalInput
          placeholder="Nome"
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
        />
        <DatePicker
          selected={partyDate}
          onChange={(newDate) => {
            setPartyDate(newDate);
            console.log(newDate);
          }}
          showTimeSelect
          locale="br"
          className="date-picker"
          placeholderText="Data"
        />
        <div className="buttons">
          <button type="button" className="white" onClick={closeModal}>
            Cancelar
          </button>
          <button
            type="button"
            className="blue"
            onClick={handleCreateParty}
          >
            Confirmar
          </button>
        </div>
      </ModalComponent>

      <Header />

      <S.HomeWrapper>
        <div className="add-party">
          <h2>Adicionar Festa</h2>
          <S.AddButton onClick={openModal}>+</S.AddButton>
        </div>
        {
          parties?.map((party) => (
            <PartyBox key={party.id} party={party} />
          ))
        }
      </S.HomeWrapper>
    </>
  );
}
