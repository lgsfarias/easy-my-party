import styled from 'styled-components';
import Wrapper from '../../styles/elements/wrapper';
import Input from '../../styles/elements/input';
import AddButton from '../../styles/elements/addButton';

export const HomeWrapper = styled(Wrapper)`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;
  overflow-y: auto;

  .add-party {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

export const ModalInput = styled(Input)``;

export { AddButton };
