export interface ImcHistorial {
  id: number;
  fecha: string;
  altura: number;
  peso: number;
  imc: number;
  categoria: string;
}

export interface ImcMensual {
  mes: string;
  imc: number;
}

export interface VariacionPeso {
  mes: string;
  peso: number;
}

export interface ImcEstadisticas {
  imcMensual: ImcMensual[];
  variacionPeso: VariacionPeso[];
  promedioIMC: number;
}
