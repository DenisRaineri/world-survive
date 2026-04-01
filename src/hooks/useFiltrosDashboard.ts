import { useCallback, useState } from 'react';
import type { CriteriosPainel } from '../types/types';

const estadoInicial: CriteriosPainel = {
  ano: '2024',
  regiao: null,
};

/**
 * Estado compartilhado do painel (ano + macroregião opcional).
 * Os dados exibidos derivam sempre destes critérios.
 */
export function useFiltrosDashboard() {
  const [criterios, setCriterios] = useState<CriteriosPainel>(estadoInicial);

  const redefinirFiltros = useCallback(() => {
    setCriterios(estadoInicial);
  }, []);

  return { criterios, setCriterios, redefinirFiltros };
}
