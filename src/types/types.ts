import type { AnoPainel } from '../constants/cronologia';

/** @deprecated use AnoPainel */
export type AnoDisponivel = AnoPainel;

export interface SeriePorAno {
  anos: Record<AnoPainel, number>;
}

export interface DadosBioma extends SeriePorAno {
  bioma: string;
}

export interface DadosRegiao extends SeriePorAno {
  regiao: string;
}

export interface DadosEstado extends SeriePorAno {
  estado: string;
  sigla: string;
  regiao: string;
}

export interface CriteriosPainel {
  ano: AnoPainel;
  regiao: string | null;
}
