// src/services/user-service.ts
export async function updatePassword(userId: number, password: string, token: string) {
  const res = await fetch(`http://localhost:3000/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });
  return res.json();
}
