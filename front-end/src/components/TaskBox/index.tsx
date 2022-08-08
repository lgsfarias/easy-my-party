import { BsCheckSquareFill } from 'react-icons/bs';
import { ThreeDots } from 'react-loader-spinner';
import { TaskInterface } from '../../interfaces';
import * as S from './style';

interface Props{
  task: TaskInterface;
  handleClick: () => void;

}
export default function TaskBox({ task, handleClick }: Props) {
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
          onClick={handleClick}
          size={50}
        />
      )}
    </S.TaskWrapper>
  );
}
