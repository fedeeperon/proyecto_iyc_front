import { api } from "../api";
import { ImcResult } from "../interfaces/imc-result";
import { ImcRegister } from "../interfaces/imc-register";

export const imcService = {
	async calcularImc(altura: number, peso: number): Promise<ImcResult> {
		const response = await api.post("/imc/calcular", { altura, peso });
		return response.data;
	},

	async getHistorial(): Promise<ImcRegister[]> {
		const response = await api.get("/imc/historial");
		return response.data;
	},
};
