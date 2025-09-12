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
  const [pagina, setPagina] = useState(1);
  const [porPagina] = useState(3);
  const [filtroCategoria, setFiltroCategoria] = useState("");

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

  // Filtrar y paginar
  const registrosFiltrados = historial.filter(item =>
    filtroCategoria === "" || item.categoria === filtroCategoria
  );

  const indiceUltimo = pagina * porPagina;
  const indicePrimero = indiceUltimo - porPagina;
  const registrosPagina = registrosFiltrados.slice(indicePrimero, indiceUltimo);

  const totalPaginas = Math.ceil(registrosFiltrados.length / porPagina);

  return (
    <div className="container-flex">
      {/* --- CALCULADORA --- */}
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
      <div className="historial">
        <h2>📋 Historial de cálculos</h2>

        <label>Filtrar por categoría:</label>
        <select value={filtroCategoria} onChange={e => { setFiltroCategoria(e.target.value); setPagina(1); }}>
          <option value="">Todas</option>
          <option value="Bajo Peso">Bajo Peso</option>
          <option value="Normal">Normal</option>
          <option value="Sobrepeso">Sobrepeso</option>
          <option value="Obeso">Obeso</option>
        </select>

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
            {registrosPagina.map(item => (
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

        <div className="paginacion">
          <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}>Anterior</button>
          <span>{pagina} / {totalPaginas}</span>
          <button onClick={() => setPagina(pagina + 1)} disabled={pagina === totalPaginas}>Siguiente</button>
        </div>
      </div>
    </div>
  );
}

export default ImcForm;
