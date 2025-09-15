import { useImcCalculator } from "../hooks/use-imc-calculator";


function ImcCalculator({ onCalculoExitoso }: { onCalculoExitoso?: () => void }) {
  const { altura, setAltura, peso, setPeso, resultado, error, calculateImc } = useImcCalculator();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await calculateImc();
    setTimeout(() => {
      if (!error && onCalculoExitoso) onCalculoExitoso();
    }, 0);
  };

  return (
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
          placeholder="Ej: 1.65"
        />
        <label>Ingresa tu peso (en kg):</label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Ej: 68"
        />
        <button type="submit">Calcular</button>
      </form>

      {error && (
        <div className="resultado error" role="alert" aria-live="polite">
          <p>{error}</p>
        </div>
      )}

      {/* Resultado sólo si no hay errores */}
      {resultado && !error && (
        <div className="resultado success">
          <p><strong>IMC:</strong> {resultado.imc.toFixed(2)}</p>
          <p><strong>Categoría:</strong> {resultado.categoria}</p>
        </div>
      )}
    </div>
  );
}

export default ImcCalculator;