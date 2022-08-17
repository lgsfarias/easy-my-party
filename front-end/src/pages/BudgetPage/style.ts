import styled from 'styled-components';
import Wrapper from '../../styles/elements/wrapper';
import Input from '../../styles/elements/input';

export const BudgetPageWrapper = styled(Wrapper)`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 80px;
  min-height: 0;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;
  overflow-y: auto;

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

export const ModalInput = styled(Input)``;
