import { useNavigate } from 'react-router-dom';
import { PartyInterface } from '../../interfaces';
import * as S from './style';

export default function PartyBox({ party } : {party: PartyInterface}) {
  const navigate = useNavigate();
  const date = new Date(party.date);
  const dateOptions : Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
  };

  return (
    <S.PartyWrapper
      onClick={() => {
        navigate(`/party/${party.id}/tasks`);
      }}
    >
      <h1>{party.name}</h1>
      <p>
        {date.toLocaleDateString('pt-BR', dateOptions)}
      </p>
    </S.PartyWrapper>
  );
}
