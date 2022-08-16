import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import br from 'date-fns/locale/pt-BR';
import { ThreeDots } from 'react-loader-spinner';
import PartyBox from '../../components/PartyBox';
import useAuth from '../../hooks/useAuth';
import { PartyInterface, AddressInterface } from '../../interfaces';
import api from '../../services/api';
import * as S from './style';
import 'react-datepicker/dist/react-datepicker.css';
import useAlert from '../../hooks/useAlert';
import ModalComponent from '../../components/Modal';
import useModal from '../../hooks/useModal';
import Header from '../../components/Header';

type PartyInterfaceWithAddress = PartyInterface & { address: AddressInterface };

export default function Home() {
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const { openModal, closeModal } = useModal();
  const [parties, setParties] = useState<PartyInterfaceWithAddress[] | null>(null);
  const [partyDate, setPartyDate] = useState<Date | null>(null);
  const [partyName, setPartyName] = useState<string>('');
  const [partyStreet, setPartyStreet] = useState<string>('');
  const [partyCity, setPartyCity] = useState<string>('');
  const [partyState, setPartyState] = useState<string>('');
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    if (!partyDate || !partyName) {
      setMessage({ type: 'error', text: 'Preencha todos os campos' });
      setLoading(false);
      return;
    }

    try {
      await api.post('/parties', {
        name: partyName,
        date: partyDate,
        street: partyStreet,
        city: partyCity,
        state: partyState,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      closeModal();
      setPartyName('');
      setPartyDate(null);
      setPartyStreet('');
      setPartyCity('');
      setPartyState('');
      getParties();
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao adicionar festa' });
    } finally {
      setLoading(false);
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
          disabled={loading}
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
          disabled={loading}
        />
        <S.ModalInput
          placeholder="Endereço"
          value={partyStreet}
          onChange={(e) => setPartyStreet(e.target.value)}
          disabled={loading}
        />
        <S.ModalInput
          placeholder="Cidade"
          value={partyCity}
          onChange={(e) => setPartyCity(e.target.value)}
          disabled={loading}
        />
        <S.ModalInput
          placeholder="Estado"
          value={partyState}
          onChange={(e) => setPartyState(e.target.value)}
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
            onClick={handleCreateParty}
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

      <S.HomeWrapper>
        <div className="add-party">
          <h2>Adicionar Festa</h2>
          <S.AddButton onClick={openModal}>+</S.AddButton>
        </div>
        {
          parties === null
            ? (
              <div
                className="loading"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  flex: 1,
                }}
              >
                <ThreeDots
                  color="#fff"
                />
              </div>
            ) : (
              parties.map((party) => (
                <PartyBox key={party.id} party={party} />
              )) || (
                <h3>
                  Nenhuma festa cadastrada
                </h3>
              )
            )
        }
      </S.HomeWrapper>
    </>
  );
}
