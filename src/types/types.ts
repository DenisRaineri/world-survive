export interface DadosBioma {
  bioma: string;
  anos: Record<string, number>;
}

export interface DadosRegiao {
  regiao: string;
  anos: Record<string, number>;
}

export interface DadosEstado {
  estado: string;
  sigla: string;
  regiao: string;
  anos: Record<string, number>;
}

export type AnoDisponivel = '2019' | '2020' | '2021' | '2022' | '2023' | '2024' | '2025';

export interface FiltrosType {
  ano: AnoDisponivel;
  regiao: string | null;
}