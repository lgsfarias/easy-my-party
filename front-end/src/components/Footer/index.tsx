import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { ThemeContext } from 'styled-components';
import * as S from './style';

export default function Footer() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  return (
    <S.Footer>
      <p>Convidados</p>
      <CircularProgressbar
        className="progressbar"
        value={90}
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
      <p>Orçamentos</p>
    </S.Footer>
  );
}
