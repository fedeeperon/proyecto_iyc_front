import { useState, useEffect } from "react";
import { ImcRegister } from "../interfaces/imc-register";
import { imcService } from "../services/imc-service";


export function useImcHistory() {
  const [historial, setHistorial] = useState<ImcRegister[]>([]);
  const [pagina, setPagina] = useState(1);
  const [porPagina] = useState(3);
  const [filtroCategoria, setFiltroCategoria] = useState("");

  const fetchHistorial = async () => {
    try {
      const data = await imcService.getHistorial();
      setHistorial(data);
    } catch (err) {
      console.error("❌ Error al cargar historial", err);
    }
  };

  useEffect(() => {
    fetchHistorial();
  }, []);

  const registrosFiltrados = historial.filter(item =>
    filtroCategoria === "" || item.categoria === filtroCategoria
  );

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
    fetchHistorial,
  };
}