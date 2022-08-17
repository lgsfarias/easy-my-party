import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import useAuth from '../../hooks/useAuth';
import * as S from './style';
import api from '../../services/api';
import useAlert from '../../hooks/useAlert';
import ModalComponent from '../../components/Modal';
import useModal from '../../hooks/useModal';
import { TaskInterface } from '../../interfaces';
import TaskBox from '../../components/TaskBox';
import useParty from '../../hooks/useParty';

export default function TasksPage() {
  const { partyId } = useParams();
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const { openModal, closeModal } = useModal();
  const { setDonePercentage } = useParty();
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [taskDescription, setTaskDescription] = useState<string>('');

  async function getDonePercentage() {
    try {
      const response = await api.get(`/parties/${partyId}/tasks/done-percentage`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDonePercentage(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao buscar porcentagem de tarefas concluídas' });
    }
  }

  async function getTasks() {
    try {
      const response = await api.get(`/parties/${partyId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getDonePercentage();
      setTasks(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao buscar tarefas' });
    }
  }

  async function handleCreateTask() {
    setLoading(true);
    if (!taskDescription) {
      setMessage({ type: 'error', text: 'Preencha todos os campos' });
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(`/parties/${partyId}/tasks`, {
        description: taskDescription,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setTaskDescription('');
      closeModal();
      getTasks();
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        setMessage({ type: 'error', text: error.response.data.message });
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTasks();
    getDonePercentage();
  }, []);

  return (
    <>
      <ModalComponent>
        <h1>Nova Tarefa</h1>
        <S.ModalInput
          placeholder="Nome"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          disabled={loading}
        />
        <div className="buttons">
          <button type="button" className="white" onClick={closeModal} disabled={loading}>
            {
              loading
                ? <ThreeDots color="#222244" />
                : 'Cancelar'
            }
          </button>
          <button
            type="button"
            className="blue"
            onClick={handleCreateTask}
            disabled={loading}
          >
            {
              loading
                ? <ThreeDots color="#fff" />
                : 'Confirmar'
            }
          </button>
        </div>
      </ModalComponent>

      <Header />

      <S.TasksPageWrapper>
        <div className="add-task">
          <h2>Adicionar Tarefa</h2>
          <S.TasksAddButton onClick={openModal}>+</S.TasksAddButton>
        </div>
        {tasks?.map((task) => (
          <TaskBox key={task.id} task={task} getTasks={() => getTasks()} />
        ))}
      </S.TasksPageWrapper>
      <Footer />
    </>
  );
}
