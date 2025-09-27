// src/components/mi-perfil.tsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/mi-perfil.css';
import { updatePassword } from '../services/user-service';
import { UserProfile } from '../interfaces/user-profile';

export default function MiPerfil() {
  const navigate = useNavigate(); // <-- necesario para el botón Volver
  const [user, setUser] = useState<UserProfile | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Usuario no autenticado');
      return;
    }

    fetch('http://localhost:3000/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => toast.error('No se pudo cargar el perfil'));
  }, []);

  const handleChangePassword = async () => {
    if (!user) {
      toast.error('ID de usuario no disponible');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      await updatePassword(user.id, newPassword, token);
      toast.success('✅ Contraseña actualizada con éxito');
      setNewPassword('');
    } catch (err: any) {
      toast.error(err?.message || 'Error al cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mi-perfil-page">
      <div className="mi-perfil-container">
        <button className="volver-btn" onClick={() => navigate(-1)}>
          ← Volver
        </button>

        <h2>Mi Perfil</h2>

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={user?.email || ''}
          disabled
        />

        <label htmlFor="new-password">Nueva contraseña:</label>
        <input
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button onClick={handleChangePassword} disabled={loading}>
          {loading ? 'Actualizando...' : 'Cambiar contraseña'}
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
