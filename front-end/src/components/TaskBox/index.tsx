import { BsCheckSquareFill } from 'react-icons/bs';
import { ThreeDots } from 'react-loader-spinner';
import { AxiosError } from 'axios';
import { TaskInterface } from '../../interfaces';
import * as S from './style';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import useAlert from '../../hooks/useAlert';

interface Props{
  task: TaskInterface;
  getTasks: () => void;
}

export default function TaskBox({ task, getTasks }: Props) {
  const { token } = useAuth();
  const { setMessage } = useAlert();

  async function finishTask() {
    try {
      const response = await api.put(`/parties/${task.partyId}/tasks/${task.id}/finish`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTasks();
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        setMessage({
          type: 'error',
          text: error.response.data.message,
        });
      }
    }
  }

  const loading = false;
  return (
    <S.TaskWrapper>
      <h1>{task.description}</h1>
      {loading ? (
        <div className="loading">
          <ThreeDots color="#fff" height={11} />
        </div>
      ) : (
        <BsCheckSquareFill
          className="check"
          fill={task.done ? '#8FC549' : '#E7E7E7'}
          size={50}
          onClick={finishTask}
        />
      )}
    </S.TaskWrapper>
  );
}
