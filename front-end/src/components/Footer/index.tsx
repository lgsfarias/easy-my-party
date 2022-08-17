import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ThemeContext } from 'styled-components';
import * as S from './style';
import useParty from '../../hooks/useParty';

export default function Footer() {
  const { party } = useParty();
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { donePercentage } = useParty();

  return (
    <S.Footer>
      <p
        onClick={() => navigate(party ? `/party/${party.id}/guests` : '#')}
      >
        Convidados

      </p>
      <Link to={party ? `/party/${party.id}/tasks` : '#'}>
        <CircularProgressbar
          className="progressbar"
          value={donePercentage}
          text="Tarefas"
          background
          backgroundPadding={6}
          styles={{
            path: {
              stroke: `${theme.colors.yellow}`,
              strokeLinecap: 'round',
            },
            trail: {
              stroke: `${theme.colors.primary}`,
              strokeLinecap: 'round',
            },
            text: {
              fill: `${theme.colors.text}`,
              fontSize: '14px',
              fontFamily: `${theme.fonts.logo}`,
            },
            background: {
              fill: `${theme.colors.primary}`,
            },
            root: {
              borderRadius: '50%',
              border: `2px solid ${theme.colors.yellow}`,
              cursor: 'pointer',
            },
          }}
        />
      </Link>
      <p
        onClick={() => navigate(party ? `/party/${party.id}/budget` : '#')}
      >
        Orçamentos

      </p>
    </S.Footer>
  );
}
