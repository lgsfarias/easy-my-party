import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 36px;
  &:hover,
  &:focus {
    opacity: 0.9;
  }
`;

export default Button;
