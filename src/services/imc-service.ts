import axios from "axios";
import { ImcResult } from "../interfaces/imc-result";
import { ImcRegister } from "../interfaces/imc-register";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const imcService = {
	async calcularImc(altura: number, peso: number): Promise<ImcResult> {
		const response = await axios.post(`${API_URL}/imc/calcular`, { altura, peso });
		return response.data;
	},

	async getHistorial(): Promise<ImcRegister[]> {
		const response = await axios.get(`${API_URL}/imc/historial`);
		return response.data;
	},
};
