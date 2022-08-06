import styled from 'styled-components';
import Wrapper from '../../styles/elements/wrapper';

export const HomeWrapper = styled(Wrapper)`
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;

  .add-party {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
  }

  h2 {
    font-size: 1.5rem;
  }
`;

export const AddButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  border: none;
  border-radius: 5px;
  width: 2rem;
  height: 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;
