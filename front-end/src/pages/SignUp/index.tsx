import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import api from '../../services/api';
import * as S from '../Login/style';
import useAlert from '../../hooks/useAlert';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setMessage } = useAlert();

  async function handleSubmit(e : React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!email || !password || !confirmPassword || !name) {
      setMessage({ type: 'error', text: 'Todos os campos são obrigatórios!' });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'As senhas devem ser iguais!' });
      setLoading(false);
      return;
    }

    try {
      await api.post('/signup', {
        name,
        email,
        password,
        confirmPassword,
      });
      setMessage({ type: 'success', text: 'Usuário criado com sucesso!' });
      setLoading(false);
      navigate('/');
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
          type="text"
          placeholder="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
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
        <S.Input
          type="password"
          placeholder="confirmar senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
        />
        <S.Button type="submit" disabled={loading}>
          {
            loading
              ? <ThreeDots color="#FFF" />
              : 'Cadastrar'
          }
        </S.Button>
        <h2 className="link" onClick={() => navigate('/')}>
          Já tem uma conta? Entre agora!
        </h2>
      </S.Form>
    </S.LoginWrapper>
  );
}
