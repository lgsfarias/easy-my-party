import styled from 'styled-components';
import Wrapper from '../../styles/elements/wrapper';

export const GuestWrapper = styled(Wrapper)`
  align-items: flex-start;
  gap: 0.5rem;
  height: 100px;
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
    font-size: 1.5rem;
  }

  .check {
    position: absolute;
    right: 25px;
  }
`;
