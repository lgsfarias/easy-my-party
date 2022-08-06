import { useEffect, useState, useContext } from 'react';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import PartyBox from '../../components/PartyBox';
import useAuth from '../../hooks/useAuth';
import { PartyInterface } from '../../interfaces';
import api from '../../services/api';
import { Header } from '../../styles/elements/Header';
import * as S from './style';

export default function Home() {
  const [parties, setParties] = useState<PartyInterface[]>([]);
  const { token, signOut } = useAuth();
  const { colors } = useContext(ThemeContext);
  const navigate = useNavigate();

  async function getParties() {
    const response = await api.get('/parties', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setParties(response.data);
  }

  useEffect(() => {
    getParties();
  }, []);

  return (
    <>
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
          <S.AddButton>+</S.AddButton>
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
