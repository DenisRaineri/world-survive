import React from 'react';
import { RotateCcw } from 'lucide-react';
import type { AnoDisponivel, CriteriosPainel } from '../types/types';
import { anosDisponiveis, regioes } from '../data/dadosQueimadas';

interface FiltrosProps {
  criterios: CriteriosPainel;
  onCriteriosChange: React.Dispatch<React.SetStateAction<CriteriosPainel>>;
  onRedefinir: () => void;
}

const Filtros: React.FC<FiltrosProps> = ({
  criterios,
  onCriteriosChange,
  onRedefinir,
}) => {
  return (
    <div className="painel-card mb-8 p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-lg font-semibold text-[var(--cor-texto)]">
          Critérios da visão
        </h2>
        <button
          type="button"
          onClick={onRedefinir}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--cor-borda)] bg-[var(--cor-fundo-suave)] px-3 py-1.5 text-sm font-medium text-[var(--cor-texto)] transition hover:bg-white/80"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Redefinir
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="filtro-ano"
            className="text-sm font-medium text-[var(--cor-texto-mudo)]"
          >
            Ano de referência
          </label>
          <select
            id="filtro-ano"
            className="rounded-lg border border-[var(--cor-borda)] bg-white px-3 py-2 text-[var(--cor-texto)] shadow-sm focus:border-[var(--cor-acento)] focus:outline-none focus:ring-2 focus:ring-[var(--cor-acento)]/25"
            value={criterios.ano}
            onChange={(e) =>
              onCriteriosChange((prev) => ({
                ...prev,
                ano: e.target.value as AnoDisponivel,
              }))
            }
          >
            {anosDisponiveis.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="filtro-regiao"
            className="text-sm font-medium text-[var(--cor-texto-mudo)]"
          >
            Macroregião
          </label>
          <select
            id="filtro-regiao"
            className="rounded-lg border border-[var(--cor-borda)] bg-white px-3 py-2 text-[var(--cor-texto)] shadow-sm focus:border-[var(--cor-acento)] focus:outline-none focus:ring-2 focus:ring-[var(--cor-acento)]/25"
            value={criterios.regiao ?? 'todas'}
            onChange={(e) => {
              const v = e.target.value;
              onCriteriosChange((prev) => ({
                ...prev,
                regiao: v === 'todas' ? null : v,
              }));
            }}
          >
            <option value="todas">Brasil (todas)</option>
            {regioes.map((regiao) => (
              <option key={regiao} value={regiao}>
                {regiao}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filtros;
