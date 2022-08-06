import { useEffect, useState, useContext } from 'react';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import br from 'date-fns/locale/pt-BR';
import PartyBox from '../../components/PartyBox';
import useAuth from '../../hooks/useAuth';
import { PartyInterface } from '../../interfaces';
import api from '../../services/api';
import { Header } from '../../styles/elements/Header';
import * as S from './style';
import 'react-datepicker/dist/react-datepicker.css';
import useAlert from '../../hooks/useAlert';

Modal.setAppElement('#root');

export default function Home() {
  const [parties, setParties] = useState<PartyInterface[]>([]);
  const { token, signOut } = useAuth();
  const { setMessage } = useAlert();
  const { colors } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [partyDate, setPartyDate] = useState<Date | null>(null);
  const [partyName, setPartyName] = useState<string>('');
  registerLocale('br', br);

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

  async function getParties() {
    const response = await api.get('/parties', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setParties(response.data);
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
      setIsOpen(false);
      setMessage({ type: 'success', text: 'Festa adicionada com sucesso' });
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
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Delete Modal"
        className="_"
        overlayClassName="_"
        contentElement={(props, children) => (
          <S.ModalStyle {...props}>{children}</S.ModalStyle>
        )}
        overlayElement={(props, contentElement) => (
          <S.OverlayStyle {...props}>{contentElement}</S.OverlayStyle>
        )}
      >
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
      </Modal>
      <Header>
        <h1>Easy My Party</h1>
        <MdLogout
          size="2rem"
          color={colors.text}
          onClick={
          () => {
            signOut();
            navigate('/');
          }
        }
        />
      </Header>
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
