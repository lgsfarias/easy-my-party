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
import GuestConfirmationPage from './pages/GuestConfirmationPage';
import BudgetPage from './pages/BudgetPage';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/party/:partyId/tasks" element={<TasksPage />} />
        <Route path="/party/:partyId/guests" element={<GuestsPage />} />
        <Route path="/party/:partyId/budget" element={<BudgetPage />} />
        <Route path="/confirmation" element={<GuestConfirmationPage />} />
      </Routes>
    </Router>
  );
}
