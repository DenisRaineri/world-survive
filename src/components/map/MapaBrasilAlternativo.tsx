import React from 'react';
import { AnoDisponivel } from '../../types/types';
import { obterTotalPorRegiaoPorAno } from '../../utils/dataUtils';

interface MapaBrasilAlternativoProps {
  ano: AnoDisponivel;
  regiao: string | null;
}

const MapaBrasilAlternativo: React.FC<MapaBrasilAlternativoProps> = ({
  ano,
  regiao: macroSelecionada,
}) => {
  const dadosRegiao = obterTotalPorRegiaoPorAno(ano);

  const blocosRegiao = [
    { nome: 'NORTE', cor: 'rgba(33, 150, 243, 0.8)', posicao: 'top-4 left-8' },
    { nome: 'NORDESTE', cor: 'rgba(255, 152, 0, 0.8)', posicao: 'top-8 right-12' },
    { nome: 'CENTRO-OESTE', cor: 'rgba(76, 175, 80, 0.8)', posicao: 'top-1/2 left-1/3' },
    { nome: 'SUDESTE', cor: 'rgba(244, 67, 54, 0.8)', posicao: 'bottom-1/3 right-1/3' },
    { nome: 'SUL', cor: 'rgba(156, 39, 176, 0.8)', posicao: 'bottom-8 right-1/4' },
  ];

  const obterIntensidade = (nomeRegiao: string): number => {
    const valor = dadosRegiao[nomeRegiao] || 0;
    const maximo = Math.max(...Object.values(dadosRegiao));
    return maximo > 0 ? (valor / maximo) * 100 : 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">
        Mapa de Queimadas - {ano}
      </h2>
      
      {/* Mapa simplificado do Brasil */}
      <div className="relative h-[400px] bg-gray-50 rounded-lg overflow-hidden">
        {/* Contorno do Brasil simplificado */}
        <div className="absolute inset-4 bg-gray-200 rounded-lg" style={{
          clipPath: 'polygon(20% 10%, 80% 15%, 85% 30%, 90% 50%, 85% 70%, 75% 85%, 60% 90%, 40% 88%, 25% 80%, 15% 65%, 10% 45%, 15% 25%)'
        }}>
          {/* Regiões */}
          {blocosRegiao.map((bloco) => {
            const intensidade = obterIntensidade(bloco.nome);
            const destaque =
              !macroSelecionada || macroSelecionada === bloco.nome;
            const opacidade = destaque ? intensidade / 100 : 0.1;

            return (
              <div
                key={bloco.nome}
                className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all duration-300 cursor-pointer hover:scale-110 ${bloco.posicao}`}
                style={{
                  backgroundColor: bloco.cor,
                  opacity: 0.3 + opacidade * 0.7,
                  border: destaque ? '2px solid #fff' : '1px solid #ccc',
                }}
                title={`${bloco.nome}: ${dadosRegiao[bloco.nome] || 0} focos`}
              >
                <div className="text-center">
                  <div className="text-[8px]">{bloco.nome}</div>
                  <div className="text-[10px] font-bold">
                    {dadosRegiao[bloco.nome] || 0}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legenda */}
      <div className="mt-4 space-y-2">
        <div className="text-xs text-gray-600 text-center mb-2">
          Dados de queimadas por região
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
          {blocosRegiao.map((bloco) => (
            <div key={bloco.nome} className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: bloco.cor }}
              />
              <span className="text-gray-700">{bloco.nome}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapaBrasilAlternativo;