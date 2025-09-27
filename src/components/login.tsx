import { useState } from 'react';
import { login } from '../services/auth-service';
import { LoginRequest } from '../interfaces/login-request';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data: LoginRequest = { email, password };
      const res = await login(data);
      localStorage.setItem('token', res.access_token);
      navigate('/');
    } catch (err: any) {
      console.error('Error de login:', err);
      // Mostrar el mensaje de error del backend
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="card">
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}
            <input
              type="email"
              placeholder="Usuario"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Ingresar'}
            </button>
          </form>
          <p>
            ¿No tienes cuenta? <a href="/register">Crear cuenta</a>
          </p>
        </div>
        <div className="purple-decoration"></div>
      </div>
    </div>
  );
}
