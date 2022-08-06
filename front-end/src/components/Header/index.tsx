import { useContext } from 'react';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import useAuth from '../../hooks/useAuth';
import * as S from './style';

export default function Header() {
  const navigate = useNavigate();
  const { colors } = useContext(ThemeContext);
  const { signOut } = useAuth();

  return (
    <S.Header>
      <h1 onClick={() => navigate('/home')}>Easy My Party</h1>
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
    </S.Header>
  );
}
