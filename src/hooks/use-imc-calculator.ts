import { useState } from "react";
import { ImcResult } from "../interfaces/imc-result";
import { imcService } from "../services/imc-service";

export function useImcCalculator() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [resultado, setResultado] = useState<ImcResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const calculateImc = async () => {
    const alturaNum = parseFloat(altura);
    const pesoNum = parseFloat(peso);

    // Validaciones del frontend
    if (!/^\d+(\.\d{1,2})?$/.test(peso)) {
      setError("⚠ El peso debe tener como máximo 2 decimales.");
      setResultado(null);
      return;
    }
    if (isNaN(pesoNum) || pesoNum <= 0 || pesoNum > 499.99) {
      setError("⚠ Ingresa un valor de peso válido (entre 0 y 499.99).");
      setResultado(null);
      return;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(altura)) {
      setError("⚠ La altura debe tener como máximo 2 decimales.");
      setResultado(null);
      return;
    }
    if (isNaN(alturaNum) || alturaNum > 2.99 || alturaNum <= 0) {
      setError("⚠ Ingresa un valor de altura válido (entre 0 y 2.99).");
      setResultado(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await imcService.calcularImc(alturaNum, pesoNum);
      setResultado(result);
    } catch (err: any) {
      console.error("❌ Error al calcular el IMC:", err);
      // Mostrar mensaje de error del backend
      const errorMessage = err.response?.data?.message || "Error al calcular el IMC";
      setError(errorMessage);
      setResultado(null);
    } finally {
      setLoading(false);
    }
  };

  return { 
    altura, 
    setAltura, 
    peso, 
    setPeso, 
    resultado, 
    error, 
    loading,
    calculateImc 
  };
}