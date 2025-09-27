import { useState, useEffect } from "react";

export function useImcEstadisticas() {
  const [historial, setHistorial] = useState<any[]>([]);
  const [estadisticas, setEstadisticas] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Usuario no autenticado");
      setLoading(false);
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    Promise.all([
      fetch("http://localhost:3000/imc/historial", { headers }).then((r) => {
        if (!r.ok) throw new Error("Error al cargar historial");
        return r.json();
      }),
      fetch("http://localhost:3000/imc/estadisticas", { headers }).then((r) => {
        if (!r.ok) throw new Error("Error al cargar estadísticas");
        return r.json();
      }),
    ])
      .then(([historialData, estadisticasData]) => {
        setHistorial(historialData);
        setEstadisticas(estadisticasData);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Error al cargar historial/estadísticas");
      })
      .finally(() => setLoading(false));
  }, []);

  return { historial, estadisticas, loading, error };
}
