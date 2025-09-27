import { useImcHistory } from "../hooks/use-imc-history";
import '../styles/imc-history.css';

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
    error,
    loading,
  } = useImcHistory({ recargaTrigger });

  return (
    <div className="historial">
      <div className="historial-header">
        <h2>Historial 📊</h2>
      </div>
      <div className="filtros">
        <div className="filtro-categoria">
          <label>Filtrar por categoría:</label>
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
          <label>Filtrar por fecha:</label>
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

      {error && (
        <div className="historial-error">
          {error}
        </div>
      )}

      {loading && (
        <div className="historial-loading">
          Cargando historial...
        </div>
      )}

      {!loading && !error && (
        <>
          {registrosPagina.length === 0 ? (
            <div className="historial-empty">
              No hay registros para mostrar
            </div>
          ) : (
            <>
              <table className="tabla-historial">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Altura</th>
                    <th>Peso</th>
                    <th>IMC</th>
                    <th>Categoría</th>
                  </tr>
                </thead>
                <tbody>
                  {registrosPagina.map((item, index) => (
                    <tr key={`${item.id}-${index}-${item.fecha}`}>
                      <td>
                        {new Date(item.fecha).toLocaleDateString("es-AR")}
                        <br />
                        <small style={{ color: '#6b7280' }}>
                          {new Date(item.fecha).toLocaleTimeString("es-AR", { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </small>
                      </td>
                      <td>{item.altura}m</td>
                      <td>{item.peso}kg</td>
                      <td className="imc-value">{item.imc.toFixed(2)}</td>
                      <td>
                        <span className={`estado-${item.categoria.toLowerCase().replace(' ', '-').replace('bajo-peso', 'bajo-peso')}`}>
                          {item.categoria}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="paginacion">
                <button 
                  onClick={() => setPagina(pagina - 1)} 
                  disabled={pagina === 1}
                >
                  Anterior
                </button>
                <span className="page-info">
                  {pagina} / {totalPaginas}
                </span>
                <button
                  onClick={() => setPagina(pagina + 1)}
                  disabled={pagina === totalPaginas}
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ImcHistory;
