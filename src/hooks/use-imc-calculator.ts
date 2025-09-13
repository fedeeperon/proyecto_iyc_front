import { useState } from "react";
import { ImcResult } from "../interfaces/imc-result";
import { imcService } from "../services/imc-service";

export function useImcCalculator() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [resultado, setResultado] = useState<ImcResult | null>(null);
  const [error, setError] = useState("");

  const calculateImc = async () => {
    const alturaNum = parseFloat(altura);
    const pesoNum = parseFloat(peso);

    if (isNaN(pesoNum) || pesoNum <= 0 || pesoNum > 499.99) {
      setError("⚠ Ingresa un valor de peso válido (entre 0 y 499.99).");
      setResultado(null);
      return;
    }

    if (isNaN(alturaNum) || alturaNum > 2.99 || alturaNum <= 0) {
      setError("⚠ Ingresa un valor de altura válido (entre 0 y 2.99).");
      setResultado(null);
      return;
    }

    try {
      const result = await imcService.calcularImc(alturaNum, pesoNum);
      setResultado(result);
      setError("");
    } catch (err) {
      setError("❌ Error al calcular el IMC. Verifica si el backend está corriendo.");
      setResultado(null);
    }
  };

  return { altura, setAltura, peso, setPeso, resultado, error, calculateImc };
}