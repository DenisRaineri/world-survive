import React from 'react';
import { AnoDisponivel, FiltrosType } from '../types/types';
import { anosDisponiveis, regioes } from '../data/dadosQueimadas';

interface FiltrosProps {
  filtros: FiltrosType;
  setFiltros: React.Dispatch<React.SetStateAction<FiltrosType>>;
}

const Filtros: React.FC<FiltrosProps> = ({ filtros, setFiltros }) => {
  const handleChangeAno = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltros(prev => ({
      ...prev,
      ano: e.target.value as AnoDisponivel
    }));
  };

  const handleChangeRegiao = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = e.target.value;
    setFiltros(prev => ({
      ...prev,
      regiao: valor === 'todas' ? null : valor
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 transition-all duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="filtroAno" className="text-sm font-medium text-gray-700 mb-1">
            Ano
          </label>
          <select
            id="filtroAno"
            className="form-select rounded-md border-gray-300 shadow-sm p-2 border focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            value={filtros.ano}
            onChange={handleChangeAno}
          >
            {anosDisponiveis.map(ano => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="filtroRegiao" className="text-sm font-medium text-gray-700 mb-1">
            Região
          </label>
          <select
            id="filtroRegiao"
            className="form-select rounded-md border-gray-300 shadow-sm p-2 border focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            value={filtros.regiao || 'todas'}
            onChange={handleChangeRegiao}
          >
            <option value="todas">Todas as Regiões</option>
            {regioes.map(regiao => (
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