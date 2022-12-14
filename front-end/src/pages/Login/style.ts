import styled from 'styled-components';
import Wrapper from '../../styles/elements/wrapper';
import Input from '../../styles/elements/input';
import Button from '../../styles/elements/button';
import Form from '../../styles/elements/form';

export const LoginWrapper = styled(Wrapper)`
  position: relative;
  width: 100vw;
  height: 100vh;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
  .link {
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.logo}, cursive;
  font-size: 48px;
  line-height: 50px;
  font-weight: 800;
  margin-bottom: 24px;
`;

export { Input, Button, Form };
