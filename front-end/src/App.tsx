import { ThemeProvider } from 'styled-components';
import Alert from './components/Alert';
import { AlertProvider } from './contexts/AlertContext';
import { AuthProvider } from './contexts/AuthContext';
import { ModalProvider } from './contexts/ModalContext';
import AppRoutes from './Routes';
import * as S from './styles/global';
import theme from './styles/themes/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <S.Reset />
      <S.Global />
      <ModalProvider>
        <AlertProvider>
          <AuthProvider>
            <AppRoutes />
            <Alert />
          </AuthProvider>
        </AlertProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
