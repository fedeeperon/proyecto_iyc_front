import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Función para verificar si el token es válido
const isValidToken = (token: string | null): boolean => {
  if (!token) return false;
  
  try {
    // Decodificar el JWT para verificar si no ha expirado
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000;
    
    // Verificar si el token no ha expirado
    return payload.exp > now;
  } catch (error) {
    // Si hay error al decodificar, el token no es válido
    return false;
  }
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  
  // Si no hay token o no es válido, redirigir a login
  if (!isValidToken(token)) {
    // Limpiar token inválido si existe
    if (token) {
      localStorage.removeItem('token');
    }
    return <Navigate to="/login" replace />;
  }

  // Si hay token válido, mostrar el componente hijo
  return <>{children}</>;
}