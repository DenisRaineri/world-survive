import type { ChartDataset } from 'chart.js';
import { ANOS_CRONOLOGICOS, type AnoPainel } from '../constants/cronologia';
import type { DadosEstado } from '../types/types';
import { dadosBioma, dadosEstados, dadosRegiao } from '../data/dadosQueimadas';

const PALETA_SERIES_TEMPORAIS = [
  'rgb(34, 197, 94)',
  'rgb(249, 115, 22)',
  'rgb(59, 130, 246)',
  'rgb(239, 68, 68)',
  'rgb(168, 85, 247)',
  'rgb(234, 179, 8)',
  'rgb(6, 182, 212)',
  'rgb(236, 72, 153)',
  'rgb(99, 102, 241)',
  'rgb(120, 113, 108)',
] as const;

function corDaSerie(indice: number): string {
  return PALETA_SERIES_TEMPORAIS[indice % PALETA_SERIES_TEMPORAIS.length];
}

export function estadosFiltradosPorRegiao(regiao: string | null): DadosEstado[] {
  if (!regiao) return dadosEstados;
  return dadosEstados.filter((e) => e.regiao === regiao);
}

export function obterDadosEstadosPorAno(
  ano: AnoPainel,
  regiao: string | null
): { labels: string[]; dados: number[] } {
  const lista = estadosFiltradosPorRegiao(regiao);
  return {
    labels: lista.map((e) => e.sigla),
    dados: lista.map((e) => e.anos[ano]),
  };
}

export function obterDadosRegioesPorAno(ano: AnoPainel): {
  labels: string[];
  dados: number[];
} {
  return {
    labels: dadosRegiao.map((item) => item.regiao),
    dados: dadosRegiao.map((item) => item.anos[ano]),
  };
}

export function obterDadosBiomasPorAno(ano: AnoPainel): {
  labels: string[];
  dados: number[];
} {
  return {
    labels: dadosBioma.map((item) => item.bioma),
    dados: dadosBioma.map((item) => item.anos[ano]),
  };
}

export function obterDadosComparativoPorAnos(regiao: string | null): {
  labels: string[];
  datasets: ChartDataset<'line'>[];
} {
  const labels = [...ANOS_CRONOLOGICOS];

  if (regiao) {
    const estadosDaRegiao = dadosEstados.filter((e) => e.regiao === regiao);
    return {
      labels,
      datasets: estadosDaRegiao.map((estado, index) => ({
        type: 'line' as const,
        label: estado.sigla,
        data: labels.map((a) => estado.anos[a]),
        borderColor: corDaSerie(index),
        backgroundColor: corDaSerie(index),
        fill: false,
        tension: 0.35,
      })),
    };
  }

  return {
    labels,
    datasets: dadosRegiao.map((reg, index) => ({
      type: 'line' as const,
      label: reg.regiao,
      data: labels.map((a) => reg.anos[a]),
      borderColor: corDaSerie(index),
      backgroundColor: corDaSerie(index),
      fill: false,
      tension: 0.35,
    })),
  };
}

export function obterTotalPorRegiaoPorAno(
  ano: AnoPainel
): Record<string, number> {
  return dadosRegiao.reduce<Record<string, number>>((acc, item) => {
    acc[item.regiao] = item.anos[ano];
    return acc;
  }, {});
}
