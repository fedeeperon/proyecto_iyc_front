import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1 className="welcome-message">¡Bienvenido!</h1>
      <div className="navbar-menu">
        <button className="navbar-item" onClick={() => navigate('/estadisticas')}>
          Estadísticas
        </button>
        <button className="navbar-item" onClick={() => navigate('/mi-perfil')}>
          Mi perfil
        </button>
        <button className="navbar-item logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
        <div
          className="user-avatar"
          onClick={() => navigate('/mi-perfil')}
          style={{ cursor: 'pointer' }}
        >
          👤
        </div>
      </div>
    </nav>
  );
}
