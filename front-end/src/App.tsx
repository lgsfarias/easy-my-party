import { ThemeProvider } from 'styled-components';
import Alert from './components/Alert';
import { AlertProvider } from './contexts/AlertContext';
import AppRoutes from './Routes';
import * as S from './styles/global';
import theme from './styles/themes/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <S.Reset />
      <S.Global />
      <AlertProvider>
        <AppRoutes />
        <Alert />
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
