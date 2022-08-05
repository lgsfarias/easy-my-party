import { createContext } from 'react';
import usePersistedState from '../hooks/usePersistedState';

interface AuthContextInterface {
  token: string | null;
  login: (token: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

const LOCAL_STORAGE_KEY = 'emp-token';

export function AuthProvider({ children }: Props) {
  const [token, setToken] = usePersistedState(LOCAL_STORAGE_KEY, null);

  function login(empToken : string) {
    setToken(empToken);
  }

  function signOut() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
