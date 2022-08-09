import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import TasksPage from './pages/TasksPage';
import SignUp from './pages/SignUp';
import GuestsPage from './pages/GuestsPage';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/party/:partyId/tasks" element={<TasksPage />} />
        <Route path="/party/:partyId/guests" element={<GuestsPage />} />
      </Routes>
    </Router>
  );
}
