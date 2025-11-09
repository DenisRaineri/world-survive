import React from 'react';
import { Flame, Info } from 'lucide-react';
import { AnoDisponivel } from '../types/types';
import { dadosRegiao } from '../data/dadosQueimadas';

interface CardTotaisProps {
  ano: AnoDisponivel;
  regiao: string | null;
}

const CardTotais: React.FC<CardTotaisProps> = ({ ano, regiao }) => {
  // Calcula o total de queimadas para o ano selecionado
  const totalAnual = dadosRegiao.reduce((acc, item) => acc + item.anos[ano], 0);
  
  // Calcula o total da região selecionada (se houver)
  const totalRegiao = regiao 
    ? dadosRegiao.find(item => item.regiao === regiao)?.anos[ano] || 0
    : null;
  
  // Calcula a variação percentual em relação ao ano anterior (exceto para 2019)
  const calcularVariacao = () => {
    if (ano === '2019') return null;
    
    const anoAnterior = String(Number(ano) - 1) as AnoDisponivel;
    const totalAnoAnterior = dadosRegiao.reduce((acc, item) => acc + item.anos[anoAnterior], 0);
    
    const variacao = ((totalAnual - totalAnoAnterior) / totalAnoAnterior) * 100;
    return variacao;
  };
  
  const variacao = calcularVariacao();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col transition-all duration-300">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Total de Queimadas em {ano}
          </h2>
          <Flame size={24} className="text-red-500" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-3xl font-bold text-orange-600">
            {totalAnual.toLocaleString('pt-BR')}
          </div>
          {variacao !== null && (
            <div className={`text-sm flex items-center ${variacao > 0 ? 'text-red-500' : 'text-green-500'}`}>
              {variacao > 0 ? '▲' : '▼'} {Math.abs(variacao).toFixed(1)}% em relação a {Number(ano) - 1}
            </div>
          )}
        </div>
      </div>
      
      {regiao && (
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Queimadas na Região {regiao}
            </h2>
            <Info size={24} className="text-blue-500" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-3xl font-bold text-blue-600">
              {totalRegiao?.toLocaleString('pt-BR')}
            </div>
            <div className="text-sm text-gray-600">
              {totalRegiao && totalAnual ? ((totalRegiao / totalAnual) * 100).toFixed(1) : 0}% do total nacional
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardTotais;