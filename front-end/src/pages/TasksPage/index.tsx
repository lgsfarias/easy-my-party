import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

// import * as S from './style';

export default function TasksPage() {
  const { partyId } = useParams();
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const { openModal, closeModal } = useModal();
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [donePercentage, setDonePercentage] = useState<number>(0);

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
    if (!taskDescription) {
      setMessage({ type: 'error', text: 'Preencha todos os campos' });
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
      // setMessage({ type: 'success', text: 'Tarefa adicionada com sucesso' });
      getTasks();
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao adicionar tarefa' });
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
        />
        <div className="buttons">
          <button type="button" className="white" onClick={closeModal}>
            Cancelar
          </button>
          <button
            type="button"
            className="blue"
            onClick={handleCreateTask}
          >
            Confirmar
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
      <Footer donePercentage={donePercentage} />
    </>
  );
}
