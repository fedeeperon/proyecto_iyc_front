// src/services/user-service.ts
import { api } from '../api';

export async function updatePassword(userId: number, password: string, token: string) {
  const res = await api.patch(`/users/${userId}`, { password }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
