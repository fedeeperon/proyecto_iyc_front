// src/components/ImcEstadisticas.tsx
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useImcEstadisticas } from '../hooks/use-imc-estadisticas';
import '../styles/imc-estadisticas.css';

export default function ImcEstadisticas() {
  const navigate = useNavigate();
  const { historial, estadisticas, loading, error } = useImcEstadisticas();

  if (loading) return <p>Cargando estadísticas...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!estadisticas || historial.length === 0) return <p>No hay datos para mostrar</p>;

  return (
    <div className="imc-estadisticas-page">
      <button className="volver-btn" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <h1>Estadísticas de IMC</h1>

      <div className="graficos-flex">
        <div className="grafico-marco">
          <h3>IMC Promedio Mensual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={estadisticas.imcMensual}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="imc" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grafico-marco">
          <h3>Variación de Peso Mensual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={estadisticas.variacionPeso}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="peso" fill="#7d70ddff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
