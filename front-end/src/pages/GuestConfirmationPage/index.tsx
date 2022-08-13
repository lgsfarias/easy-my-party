import { useEffect, useState } from 'react';
import api from '../../services/api';
import * as S from './style';

function GuestConfirmationPage() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const [message, setMessage] = useState('');

  async function confirm() {
    if (!token) {
      setMessage('Acesso não autorizado');
      return;
    }
    try {
      await api.post('/confirm', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Presença confirmada com sucesso!');
    } catch (err) {
      setMessage('Erro ao confirmar presença!');
    }
  }

  useEffect(() => {
    confirm();
  }, []);

  return (
    <S.ConfirmatonPageWrapper>
      {
        !message
          ? (
            <div>
              <h1>Estamos confirmando sua presença ...</h1>
            </div>
          )
          : (
            <div>
              <h1>{message}</h1>
            </div>
          )
      }
    </S.ConfirmatonPageWrapper>

  );
}

export default GuestConfirmationPage;
