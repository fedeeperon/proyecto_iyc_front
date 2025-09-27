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
        <button className="navbar-item">Estadísticas</button>
        <button className="navbar-item">Mi perfil</button>
        <button className="navbar-item logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
        <div className="user-avatar">👤</div>
      </div>
    </nav>
  );
}