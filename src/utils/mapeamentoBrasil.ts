/**
 * Mapeia UF → macroregião IBGE (chaves alinhadas ao dataset regional do painel).
 */
export const UFS_POR_MACROREGIAO: Record<string, readonly string[]> = {
  NORTE: ['AC', 'AM', 'AP', 'PA', 'RO', 'RR', 'TO'],
  NORDESTE: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
  'CENTRO-OESTE': ['DF', 'GO', 'MS', 'MT'],
  SUDESTE: ['ES', 'MG', 'RJ', 'SP'],
  SUL: ['PR', 'RS', 'SC'],
} as const;

export type MacroregiaoPainel = keyof typeof UFS_POR_MACROREGIAO;

export function macroregiaoDaUf(sigla: string): MacroregiaoPainel | undefined {
  const uf = sigla?.toUpperCase();
  for (const [macro, ufs] of Object.entries(UFS_POR_MACROREGIAO)) {
    if ((ufs as readonly string[]).includes(uf)) {
      return macro as MacroregiaoPainel;
    }
  }
  return undefined;
}

/** Nome por extenso (GeoJSON comum) → sigla UF. */
const NOME_PARA_SIGLA: Record<string, string> = {
  Acre: 'AC',
  Alagoas: 'AL',
  Amapá: 'AP',
  Amazonas: 'AM',
  Bahia: 'BA',
  Ceará: 'CE',
  'Distrito Federal': 'DF',
  'Espírito Santo': 'ES',
  Goiás: 'GO',
  Maranhão: 'MA',
  'Mato Grosso': 'MT',
  'Mato Grosso do Sul': 'MS',
  'Minas Gerais': 'MG',
  Pará: 'PA',
  Paraíba: 'PB',
  Paraná: 'PR',
  Pernambuco: 'PE',
  Piauí: 'PI',
  'Rio de Janeiro': 'RJ',
  'Rio Grande do Norte': 'RN',
  'Rio Grande do Sul': 'RS',
  Rondônia: 'RO',
  Roraima: 'RR',
  'Santa Catarina': 'SC',
  'São Paulo': 'SP',
  Sergipe: 'SE',
  Tocantins: 'TO',
};

export function inferirSiglaUf(propriedades: Record<string, unknown>): string {
  const sigla =
    (propriedades.sigla as string | undefined) ||
    (propriedades.SIGLA as string | undefined) ||
    (propriedades.UF as string | undefined);
  if (sigla && sigla.length <= 3) return String(sigla).toUpperCase();

  const nome =
    (propriedades.name as string | undefined) ||
    (propriedades.NAME as string | undefined) ||
    (propriedades.estado as string | undefined) ||
    (propriedades.ESTADO as string | undefined) ||
    '';
  if (!nome) return '';
  return NOME_PARA_SIGLA[nome] ?? nome.toUpperCase().slice(0, 2);
}
