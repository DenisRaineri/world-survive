import React from 'react';
import { Flame, MapPinned } from 'lucide-react';
import type { AnoDisponivel } from '../types/types';
import {
  participacaoRegionalNoNacional,
  totalNacionalNoAno,
  totalRegionalNoAno,
  variacaoAnualNacional,
} from '../utils/estatisticasAgregadas';

interface CardTotaisProps {
  ano: AnoDisponivel;
  regiao: string | null;
}

const CardTotais: React.FC<CardTotaisProps> = ({ ano, regiao }) => {
  const totalAnual = totalNacionalNoAno(ano);
  const variacao = variacaoAnualNacional(ano);
  const totalRegiao = regiao ? totalRegionalNoAno(regiao, ano) : null;
  const participacao =
    regiao != null
      ? participacaoRegionalNoNacional(regiao, ano)
      : null;

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
      <article className="painel-card p-5">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[var(--cor-texto)]">
            Total nacional — {ano}
          </h2>
          <Flame className="h-6 w-6 text-orange-500" aria-hidden />
        </div>
        <p className="text-3xl font-bold tabular-nums text-[var(--cor-acento-escuro)]">
          {totalAnual.toLocaleString('pt-BR')}
        </p>
        <p className="mt-1 text-xs text-[var(--cor-texto-mudo)]">
          Soma das macroregiões (conjunto estático do painel)
        </p>
        {variacao != null && (
          <p
            className={`mt-2 text-sm font-medium ${
              variacao > 0 ? 'text-red-600' : 'text-emerald-700'
            }`}
          >
            {variacao > 0 ? '▲' : '▼'}{' '}
            {Math.abs(variacao).toFixed(1)}% vs. {Number(ano) - 1}
          </p>
        )}
      </article>

      {regiao && (
        <article className="painel-card p-5">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[var(--cor-texto)]">
              {regiao}
            </h2>
            <MapPinned className="h-6 w-6 text-sky-600" aria-hidden />
          </div>
          <p className="text-3xl font-bold tabular-nums text-sky-700">
            {totalRegiao?.toLocaleString('pt-BR')}
          </p>
          {participacao != null && (
            <p className="mt-2 text-sm text-[var(--cor-texto-mudo)]">
              {participacao.toFixed(1)}% do total nacional em {ano}
            </p>
          )}
        </article>
      )}
    </div>
  );
};

export default CardTotais;
