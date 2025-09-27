// src/interfaces/imc-estadisticas.ts

export interface Imc {
  id: number;
  peso: number;
  altura: number;
  imc: number;
  categoria: string;
  fecha: string;
}

export interface Estadisticas {
  imcMensual: { mes: string; imc: number }[];
  variacionPeso: { mes: string; peso: number }[];
  promedioIMC: number;
}
