// src/services/imc-estadisticas-service.ts

import axios from 'axios';
import {ImcMensual, ImcEstadisticas } from '../interfaces/imc-estadisticas';

const API_URL = process.env.VITE_API_URL;

export async function getHistorial(): Promise<ImcMensual[]> {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/historial`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getEstadisticas(): Promise<ImcEstadisticas> {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/estadisticas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
