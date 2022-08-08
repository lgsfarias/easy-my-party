import styled from 'styled-components';

const AddButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.yellow};
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

export default AddButton;
