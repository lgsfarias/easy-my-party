import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 5px;
  padding: 0 16px;
  margin-bottom: 13px;
  font-size: 20px;
  line-height: 23px;
  background-color: ${(props) => props.theme.colors.text};
  color: '#000';
`;

export default Input;
