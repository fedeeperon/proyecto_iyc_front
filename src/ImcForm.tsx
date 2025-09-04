import React, { useState } from "react";
import "./index.css"; 
import { api } from "./api"; 

interface ImcResult {
  imc: number;
  categoria: string;
}

function ImcForm() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [resultado, setResultado] = useState<ImcResult | null>(null);
  const [error, setError] = useState("");

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
    } catch (err) {
      console.error(err);
      setError("❌ Error al calcular el IMC. Verifica si el backend está corriendo.");
      setResultado(null);
    }
  };

  return (
    <div className="container">
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
    </div>
  );
}

export default ImcForm;
