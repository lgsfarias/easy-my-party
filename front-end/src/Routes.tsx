import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PartyPage from './pages/PartyPage';
import SignUp from './pages/SignUp';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/party/:partyId" element={<PartyPage />} />
      </Routes>
    </Router>
  );
}
