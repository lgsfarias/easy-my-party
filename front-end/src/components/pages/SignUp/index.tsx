/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom';
import * as S from '../Login/style';

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <S.LoginWrapper>
      <S.Title>Easy My Party</S.Title>
      <S.Form>
        <S.Input
          type="text"
          placeholder="nome"
        />
        <S.Input
          type="email"
          placeholder="e-mail"
        />
        <S.Input
          type="password"
          placeholder="senha"
        />
        <S.Input
          type="password"
          placeholder="confirmar senha"
        />
        <S.Button>Cadastrar</S.Button>
        <h2 className="link" onClick={() => navigate('/')}>
          Já tem uma conta? Entre agora!
        </h2>
      </S.Form>
    </S.LoginWrapper>
  );
}
