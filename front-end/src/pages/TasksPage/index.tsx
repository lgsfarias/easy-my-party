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

// import * as S from './style';

export default function TasksPage() {
  const { partyId } = useParams();
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const { openModal, closeModal } = useModal();
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [taskDescription, setTaskDescription] = useState<string>('');

  async function getTasks() {
    try {
      const response = await api.get(`/parties/${partyId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      closeModal();
      // setMessage({ type: 'success', text: 'Tarefa adicionada com sucesso' });
      getTasks();
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao adicionar tarefa' });
    }
  }

  useEffect(() => {
    getTasks();
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
        <div className="tasks">
          {tasks?.map((task) => (
            <div key={task.id} className="task">
              <h1>{task.description}</h1>
              <p>
                {JSON.stringify(task.done)}
              </p>
            </div>
          ))}
        </div>
      </S.TasksPageWrapper>
      <Footer />
    </>
  );
}
