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

    setLoading(true);
    setError("");

    try {
      const result = await imcService.calcularImc(alturaNum, pesoNum);
      setResultado(result);
    } catch (err: any) {
      console.error("❌ Error al calcular el IMC:", err);
      let errorMessage = "Error al calcular el IMC";
      
      // Si el error tiene múltiples mensajes
      if (err.response?.data?.message) {
        const messages = err.response.data.message;
        if (Array.isArray(messages)) {
          errorMessage = messages.join('\n');
        } else {
          errorMessage = messages;
        }
      }
      
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
    calculateImc,
  };
}
