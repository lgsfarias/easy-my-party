import styled from 'styled-components';
import Wrapper from '../../styles/elements/wrapper';

export const TaskWrapper = styled(Wrapper)`
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0;
  flex-shrink: 0;
  width: 100%;
  padding: 30px;
  padding-right: calc(25px + 50px + 25px);
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    opacity: 0.8;
  }

  h1 {
    font-size: 2rem;
  }

  .check {
    position: absolute;
    right: 25px;
  }

  .delete {
    position: absolute;
    left: 10px;
    top: 10px;
  }
`;
