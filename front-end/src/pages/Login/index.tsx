import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import * as S from './style';
import api from '../../services/api';
import useAlert from '../../hooks/useAlert';
import useAuth from '../../hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setMessage } = useAlert();
  const { login } = useAuth();

  async function handleSubmit(e : React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!email || !password) {
      setMessage({ type: 'error', text: 'Todos os campos são obrigatórios!' });
      return;
    }

    try {
      const {
        data: { token },
      } = await api.post('/login', {
        email,
        password,
      });
      console.log(token);
      login(token);
      navigate('/home');
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        setMessage({
          type: 'error',
          text: error.response.data.message,
        });
      }
    }
  }

  return (
    <S.LoginWrapper>
      <S.Title>Easy My Party</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          type="email"
          placeholder="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <S.Input
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <S.Button type="submit">Login</S.Button>
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