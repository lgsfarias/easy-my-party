import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { flexbox } from '@mui/system';
import * as S from './style';
import api from '../../services/api';
import useAlert from '../../hooks/useAlert';
import useAuth from '../../hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setMessage } = useAlert();
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

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
      setLoading(false);
      navigate('/home');
    } catch (error: Error | AxiosError | any) {
      setLoading(false);
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
          disabled={loading}
        />
        <S.Input
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <S.Button
          type="submit"
          disabled={loading}
        >
          {
            loading
              ? <ThreeDots color="#FFF" />
              : 'Login'
          }
        </S.Button>
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
