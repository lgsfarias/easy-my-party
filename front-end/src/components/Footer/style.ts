import styled from 'styled-components';

export const Footer = styled.footer`
  height: 80px;
  z-index: 1;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: ${(props) => props.theme.colors.primary};
  box-shadow: 0px -2px 4px rgba(200, 200, 200, 0.1);

  p {
    font-family: ${(props) => props.theme.fonts.logo}, cursive;
    font-size: 16px;
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
  }

  .progressbar {
    position: absolute;
    bottom: 20px;
    right: 0;
    left: 0;
    margin: auto;
    width: 110px;
  }
`;
