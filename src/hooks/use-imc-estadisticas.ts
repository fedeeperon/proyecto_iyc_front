import { useState, useEffect } from 'react';
import { api } from '../api';
import { ImcHistorial, ImcEstadisticas } from '../interfaces/imc-estadisticas';

export function useImcEstadisticas() {
  const [historial, setHistorial] = useState<ImcHistorial[]>([]);
  const [estadisticas, setEstadisticas] = useState<ImcEstadisticas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Usuario no autenticado');
      setLoading(false);
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    Promise.all([
      api.get('/imc/historial', { headers }),
      api.get('/imc/estadisticas', { headers }),
    ])
      .then(([historialRes, estadisticasRes]) => {
        setHistorial(historialRes.data);
        setEstadisticas(estadisticasRes.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Error al cargar historial/estadísticas');
      })
      .finally(() => setLoading(false));
  }, []);

  return { historial, estadisticas, loading, error };
}

