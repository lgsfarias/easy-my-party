import { BsCheckSquareFill } from 'react-icons/bs';
import { ThreeDots } from 'react-loader-spinner';
import { GuestInterface } from '../../interfaces';
import * as S from './style';

export default function GuestBox({ guest } : {guest: GuestInterface}) {
  const loading = false;
  return (
    <S.GuestWrapper>
      <h1>{guest.name}</h1>
      <p>
        Numero de dependentes:
        {' '}
        {guest.dependents}
      </p>
      {loading ? (
        <div className="loading">
          <ThreeDots color="#fff" height={11} />
        </div>
      ) : (
        <BsCheckSquareFill
          className="check"
          fill={guest.confirmed ? '#8FC549' : '#E7E7E7'}
          size={50}
        />
      )}
    </S.GuestWrapper>
  );
}
