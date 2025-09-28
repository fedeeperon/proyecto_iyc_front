// src/services/user-service.ts
export async function updatePassword(userId: number, password: string, token: string) {
  const API_URL = process.env.VITE_API_URL;
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });
  return res.json();
}
