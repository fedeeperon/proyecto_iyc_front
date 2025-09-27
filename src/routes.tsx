// src/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImcForm from './components/imc-form';
import Login from './components/login';
import Register from './components/register';
import ProtectedRoute from './components/protected-route';
import ImcEstadisticas from './components/imc-estadisticas';
import MiPerfil from './components/mi-perfil';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <ImcForm />
          </ProtectedRoute>
        } />
        <Route path="/estadisticas" element={
          <ProtectedRoute>
            <ImcEstadisticas />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/mi-perfil" element={<MiPerfil />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
