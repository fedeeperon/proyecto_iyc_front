// src/services/imc-estadisticas-service.ts
import { api } from '../api';
import { ImcMensual, ImcEstadisticas } from '../interfaces/imc-estadisticas';

export async function getHistorial(): Promise<ImcMensual[]> {
  const token = localStorage.getItem('token');
  const res = await api.get('/historial', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getEstadisticas(): Promise<ImcEstadisticas> {
  const token = localStorage.getItem('token');
  const res = await api.get('/estadisticas', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

