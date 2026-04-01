import type { AnoPainel } from '../constants/cronologia';
import { dadosRegiao } from '../data/dadosQueimadas';

export function totalNacionalNoAno(ano: AnoPainel): number {
  return dadosRegiao.reduce((soma, item) => soma + item.anos[ano], 0);
}

export function totalRegionalNoAno(regiao: string, ano: AnoPainel): number {
  return dadosRegiao.find((item) => item.regiao === regiao)?.anos[ano] ?? 0;
}

/** Variação percentual face ao ano anterior; `null` se não houver ano anterior na série. */
export function variacaoAnualNacional(ano: AnoPainel): number | null {
  if (ano === '2019') return null;
  const anterior = String(Number(ano) - 1) as AnoPainel;
  const atual = totalNacionalNoAno(ano);
  const ref = totalNacionalNoAno(anterior);
  if (ref === 0) return null;
  return ((atual - ref) / ref) * 100;
}

export function participacaoRegionalNoNacional(
  regiao: string,
  ano: AnoPainel
): number {
  const nacional = totalNacionalNoAno(ano);
  if (nacional === 0) return 0;
  return (totalRegionalNoAno(regiao, ano) / nacional) * 100;
}
