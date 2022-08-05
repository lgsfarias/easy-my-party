import { ThemeProvider } from 'styled-components';
import AppRoutes from './Routes';
import * as S from './styles/global';
import theme from './styles/themes/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <S.Reset />
      <S.Global />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
