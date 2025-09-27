import { useState, useEffect } from "react";
import { ImcRegister } from "../interfaces/imc-register";
import { imcService } from "../services/imc-service";

type UseImcHistoryProps = {
  recargaTrigger?: any;
};

export function useImcHistory({ recargaTrigger }: UseImcHistoryProps = {}) {
  const [historial, setHistorial] = useState<ImcRegister[]>([]);
  const [pagina, setPagina] = useState(1);
  const [porPagina] = useState(3);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroFecha, setFiltroFecha] = useState(""); // Filtro por fecha

  const fetchHistorial = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await imcService.getHistorial();
      setHistorial(data);
    } catch (err: any) {
      console.error("❌ Error al cargar historial", err);
      // Mostrar el mensaje de error del backend, o un mensaje genérico
      const errorMessage = err.response?.data?.message || "Error al cargar el historial";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorial();
  }, [recargaTrigger]);

  // Formatea fecha en YYYY-MM-DD en hora local (Argentina)
  const formatFechaLocal = (fecha: string) => {
    const d = new Date(fecha);
    return d.toLocaleDateString("sv-SE", {
      timeZone: "America/Argentina/Buenos_Aires",
    });
  };

  const registrosFiltrados = historial.filter((item) => {
    const coincideCategoria =
      filtroCategoria === "" || item.categoria === filtroCategoria;

    const coincideFecha =
      filtroFecha === "" || formatFechaLocal(item.fecha) === filtroFecha;

    return coincideCategoria && coincideFecha;
  });

  const indiceUltimo = pagina * porPagina;
  const indicePrimero = indiceUltimo - porPagina;
  const registrosPagina = registrosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(registrosFiltrados.length / porPagina);

  return {
    registrosPagina,
    pagina,
    setPagina,
    totalPaginas,
    filtroCategoria,
    setFiltroCategoria,
    filtroFecha,
    setFiltroFecha,
    fetchHistorial,
    error,
    loading,
  };
}
