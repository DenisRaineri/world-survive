import { DadosEstado, DadosRegiao, DadosBioma, AnoDisponivel } from '../types/types';
import { dadosEstados, dadosRegiao, dadosBioma } from '../data/dadosQueimadas';

// Filtra os dados de estados por região (se especificada)
export const filtrarEstadosPorRegiao = (
  regiao: string | null
): DadosEstado[] => {
  if (!regiao) return dadosEstados;
  return dadosEstados.filter(estado => estado.regiao === regiao);
};

// Obtém os dados de estados para um ano específico, com filtro opcional de região
export const obterDadosEstadosPorAno = (
  ano: AnoDisponivel,
  regiao: string | null
): { labels: string[]; dados: number[] } => {
  const estadosFiltrados = filtrarEstadosPorRegiao(regiao);
  
  const labels = estadosFiltrados.map(estado => estado.sigla);
  const dados = estadosFiltrados.map(estado => estado.anos[ano]);
  
  return { labels, dados };
};

// Obtém os dados de regiões para um ano específico
export const obterDadosRegioesPorAno = (
  ano: AnoDisponivel
): { labels: string[]; dados: number[] } => {
  const labels = dadosRegiao.map(item => item.regiao);
  const dados = dadosRegiao.map(item => item.anos[ano]);
  
  return { labels, dados };
};

// Obtém os dados de biomas para um ano específico
export const obterDadosBiomasPorAno = (
  ano: AnoDisponivel
): { labels: string[]; dados: number[] } => {
  const labels = dadosBioma.map(item => item.bioma);
  const dados = dadosBioma.map(item => item.anos[ano]);
  
  return { labels, dados };
};

// Obtém os dados de todos os anos para comparativo
export const obterDadosComparativoPorAnos = (
  regiao: string | null
): { labels: string[]; datasets: any[] } => {
  const anos = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
  
  if (regiao) {
    // Se uma região for selecionada, mostrar os estados dessa região
    const estadosDaRegiao = dadosEstados.filter(estado => estado.regiao === regiao);
    
    return {
      labels: anos,
      datasets: estadosDaRegiao.map((estado, index) => ({
        label: estado.sigla,
        data: anos.map(ano => estado.anos[ano as AnoDisponivel]),
        borderColor: gerarCorAleatoria(index),
        fill: false,
        tension: 0.3
      }))
    };
  } else {
    // Se nenhuma região for selecionada, mostrar o total por região
    return {
      labels: anos,
      datasets: dadosRegiao.map((regiao, index) => ({
        label: regiao.regiao,
        data: anos.map(ano => regiao.anos[ano as AnoDisponivel]),
        borderColor: gerarCorAleatoria(index),
        fill: false,
        tension: 0.3
      }))
    };
  }
};

// Função para gerar cores aleatórias com base em um índice
const gerarCorAleatoria = (index: number): string => {
  const cores = [
    'rgba(76, 175, 80, 1)',   // Verde
    'rgba(255, 152, 0, 1)',   // Laranja
    'rgba(33, 150, 243, 1)',  // Azul
    'rgba(244, 67, 54, 1)',   // Vermelho
    'rgba(156, 39, 176, 1)',  // Roxo
    'rgba(255, 193, 7, 1)',   // Amarelo
    'rgba(0, 188, 212, 1)',   // Ciano
    'rgba(233, 30, 99, 1)',   // Rosa
    'rgba(63, 81, 181, 1)',   // Índigo
    'rgba(121, 85, 72, 1)',   // Marrom
  ];
  
  return cores[index % cores.length];
};

// Obtém o total de queimadas por região para um determinado ano
export const obterTotalPorRegiaoPorAno = (
  ano: AnoDisponivel
): Record<string, number> => {
  return dadosRegiao.reduce((acc, regiao) => {
    acc[regiao.regiao] = regiao.anos[ano];
    return acc;
  }, {} as Record<string, number>);
};