import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImcForm from './components/imc-form';
import Login from './components/login';
import Register from './components/register';
import ProtectedRoute from './components/protected-route';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <ImcForm />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
