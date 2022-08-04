import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}