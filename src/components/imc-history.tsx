import { useImcHistory } from "../hooks/use-imc-history";


function ImcHistory({ recargaTrigger }: { recargaTrigger?: any }) {
  const {
    registrosPagina,
    pagina,
    setPagina,
    totalPaginas,
    filtroCategoria,
    setFiltroCategoria,
    filtroFecha,
    setFiltroFecha,
  } = useImcHistory({ recargaTrigger });

  return (
    <div className="historial">
      <h2>📋 Historial de cálculos</h2>

      <div className="filtros">
        <div className="filtro-categoria">
          <label>Filtrar por categoría: </label>
          <select
            value={filtroCategoria}
            onChange={(e) => {
              setFiltroCategoria(e.target.value);
              setPagina(1);
            }}
          >
            <option value="">Todas</option>
            <option value="Bajo peso">Bajo peso</option>
            <option value="Normal">Normal</option>
            <option value="Sobrepeso">Sobrepeso</option>
            <option value="Obeso">Obeso</option>
          </select>
        </div>

        <div className="filtro-fecha">
          <label>Filtrar por fecha: </label>
          <input
            type="date"
            value={filtroFecha}
            onChange={(e) => {
              setFiltroFecha(e.target.value);
              setPagina(1);
            }}
          />
        </div>
      </div>

      <table
        style={{ marginTop: "20px", borderCollapse: "collapse", width: "100%" }}
      >
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
          {registrosPagina.map((item) => (
            <tr key={item.id}>
              <td>
                {new Date(item.fecha).toLocaleString("es-AR", {
                  timeZone: "America/Argentina/Buenos_Aires",
                  hour12: false,
                })}
              </td>
              <td>{item.peso}</td>
              <td>{item.altura}</td>
              <td>{item.imc.toFixed(2)}</td>
              <td>{item.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paginacion">
        <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}>
          Anterior
        </button>
        <span>
          {pagina} / {totalPaginas}
        </span>
        <button
          onClick={() => setPagina(pagina + 1)}
          disabled={pagina === totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default ImcHistory;
