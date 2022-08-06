import styled from 'styled-components';
import Wrapper from '../../styles/elements/wrapper';
import Input from '../../styles/elements/input';

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
    font-weight: 500;
  }
`;

export const AddButton = styled.button`
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

export const ModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 5px;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  position: relative;
  h1 {
    font-weight: 700;
    font-size: 34px;
    text-align: center;
    color: ${(props) => props.theme.colors.text};
    align-self: flex-start;
    margin-bottom: 20px;
  }
  .date-picker {
    margin-bottom: 20px;
    background-color: ${(props) => props.theme.colors.text};
    border-radius: 5px;
    border: none;
    width: 100%;
    height: 46px;
    padding: 0 10px;
    font-size: 1.2rem;
    color: #000;
    outline: none;
    transition: all 0.2s ease-in-out;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 10px;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 46px;
      border-radius: 5px;
      border: none;
      font-family: 'Lato';
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      &.white {
        background-color: ${(props) => props.theme.colors.text};
        color: ${(props) => props.theme.colors.secondary};
      }
      &.blue {
        background-color: ${(props) => props.theme.colors.secondary};
        color: ${(props) => props.theme.colors.text};
        border: 1px solid ${(props) => props.theme.colors.yellow};
      }
    }
  }
`;

export const OverlayStyle = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
`;

export const ModalInput = styled(Input)``;
