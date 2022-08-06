import styled from 'styled-components';

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors.primary};
  box-shadow: 0px 2px 4px rgba(200, 200, 200, 0.1);

  h1 {
    font-family: ${(props) => props.theme.fonts.logo}, cursive;
    font-size: 2rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
  }
`;
