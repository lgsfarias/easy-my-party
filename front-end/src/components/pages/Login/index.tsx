/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom';
import * as S from './style';

export default function Login() {
  const navigate = useNavigate();
  return (
    <S.LoginWrapper>
      <S.Title>Easy My Party</S.Title>
      <S.Form>
        <S.Input
          type="email"
          placeholder="e-mail"
        />
        <S.Input
          type="password"
          placeholder="senha"
        />
        <S.Button>Login</S.Button>
        <h2
          className="link"
          onClick={() => navigate('/signup')}
        >
          Primeira vez? Cadastre-se!
        </h2>
      </S.Form>
    </S.LoginWrapper>
  );
}
