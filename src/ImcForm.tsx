import React, { useState, useEffect } from "react";
import { api } from "./api";
import "./index.css";

interface ImcResult {
  imc: number;
  categoria: string;
}

interface ImcRegistro {
  id: number;
  peso: number;
  altura: number;
  imc: number;
  categoria: string;
  fecha: string;
}

function ImcForm() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [resultado, setResultado] = useState<ImcResult | null>(null);
  const [error, setError] = useState("");
  const [historial, setHistorial] = useState<ImcRegistro[]>([]);
  const [mostrarTodos, setMostrarTodos] = useState(false); // nuevo estado

  // Obtener historial desde el backend
  const fetchHistorial = async () => {
    try {
      const response = await api.get("/imc/historial");
      setHistorial(response.data);
    } catch (err) {
      console.error("❌ Error al cargar historial", err);
    }
  };

  useEffect(() => {
    fetchHistorial();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const alturaNum = parseFloat(altura);
    const pesoNum = parseFloat(peso);

    if (isNaN(alturaNum) || isNaN(pesoNum) || alturaNum <= 0 || pesoNum <= 0) {
      setError("⚠ Ingresa valores válidos (positivos y numéricos).");
      setResultado(null);
      return;
    }

    try {
      const response = await api.post("/imc/calcular", {
        altura: alturaNum,
        peso: pesoNum,
      });
      setResultado(response.data);
      setError("");
      fetchHistorial(); // refresca historial
    } catch (err) {
      console.error(err);
      setError("❌ Error al calcular el IMC. Verifica si el backend está corriendo.");
      setResultado(null);
    }
  };

  // solo muestra los primeros 10 registros si no está en "mostrarTodos"
  const historialAMostrar = mostrarTodos ? historial : historial.slice(0, 5);

  return (
    <div className="container-flex">
      <div className="card">
        <div className="icon">🔥</div>
        <div className="kcal">Kcal</div>
        <h1>Calculadora IMC</h1>
        <form onSubmit={handleSubmit}>
          <label>Ingresa tu altura (en m):</label>
          <input
            type="number"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            step="0.01"
            min="0.1"
            placeholder="Ej: 1.65"
          />

          <label>Ingresa tu peso (en kg):</label>
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            min="1"
            placeholder="Ej: 68"
          />

          <button type="submit">Calcular</button>
        </form>

        {resultado && (
          <div className="resultado success">
            <p><strong>IMC:</strong> {resultado.imc.toFixed(2)}</p>
            <p><strong>Categoría:</strong> {resultado.categoria}</p>
          </div>
        )}

        {error && (
          <div className="resultado error">
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* --- HISTORIAL --- */}
      {historial.length > 0 && (
        <div className="historial">
          <h2>📋 Historial de cálculos</h2>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Peso (kg)</th>
                <th>Altura (m)</th>
                <th>IMC</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {historialAMostrar.map((item) => (
                <tr key={item.id}>
                  <td>{new Date(item.fecha).toLocaleString()}</td>
                  <td>{item.peso}</td>
                  <td>{item.altura}</td>
                  <td>{item.imc.toFixed(2)}</td>
                  <td>{item.categoria}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Botón Ver más / Ver menos */}
          {historial.length > 10 && (
            <button onClick={() => setMostrarTodos(!mostrarTodos)}>
              {mostrarTodos ? "Ver menos" : "Ver más"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ImcForm;
