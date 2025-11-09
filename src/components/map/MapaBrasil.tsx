import React, { useState, useEffect } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  ZoomableGroup 
} from 'react-simple-maps';
import { AnoDisponivel } from '../../types/types';
import { obterTotalPorRegiaoPorAno } from '../../utils/dataUtils';

// URLs alternativas para o GeoJSON do Brasil
const geoUrls = [
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson",
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson",
  "/brasil-estados.json" // Arquivo local como último recurso
];

interface MapaBrasilProps {
  ano: AnoDisponivel;
  regiao: string | null;
}

const MapaBrasil: React.FC<MapaBrasilProps> = ({ ano, regiao }) => {
  const [geoUrl, setGeoUrl] = useState(geoUrls[0]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [urlIndex, setUrlIndex] = useState(0);
  const dadosRegiao = obterTotalPorRegiaoPorAno(ano);
  
  const estadosPorRegiao: Record<string, string[]> = {
    'NORTE': ['AC', 'AM', 'AP', 'PA', 'RO', 'RR', 'TO'],
    'NORDESTE': ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
    'CENTRO-OESTE': ['DF', 'GO', 'MS', 'MT'],
    'SUDESTE': ['ES', 'MG', 'RJ', 'SP'],
    'SUL': ['PR', 'RS', 'SC']
  };

  const obterCor = (regiaoEstado: string, intensidade: number): string => {
    const valorMaximo = Math.max(...Object.values(dadosRegiao));
    const normalizado = valorMaximo > 0 ? intensidade / valorMaximo : 0;
    
    const cores = {
      'NORTE': `rgba(33, 150, 243, ${0.2 + normalizado * 0.8})`,
      'NORDESTE': `rgba(255, 152, 0, ${0.2 + normalizado * 0.8})`,
      'CENTRO-OESTE': `rgba(76, 175, 80, ${0.2 + normalizado * 0.8})`,
      'SUDESTE': `rgba(244, 67, 54, ${0.2 + normalizado * 0.8})`,
      'SUL': `rgba(156, 39, 176, ${0.2 + normalizado * 0.8})`
    };
    
    return cores[regiaoEstado as keyof typeof cores] || '#f0f0f0';
  };

  const obterEstadoPorNome = (nome: string): string => {
    if (!nome) return '';
    
    const mapeamento: Record<string, string> = {
      'Acre': 'AC', 'Alagoas': 'AL', 'Amapá': 'AP', 'Amazonas': 'AM',
      'Bahia': 'BA', 'Ceará': 'CE', 'Distrito Federal': 'DF', 'Espírito Santo': 'ES',
      'Goiás': 'GO', 'Maranhão': 'MA', 'Mato Grosso': 'MT', 'Mato Grosso do Sul': 'MS',
      'Minas Gerais': 'MG', 'Pará': 'PA', 'Paraíba': 'PB', 'Paraná': 'PR',
      'Pernambuco': 'PE', 'Piauí': 'PI', 'Rio de Janeiro': 'RJ', 'Rio Grande do Norte': 'RN',
      'Rio Grande do Sul': 'RS', 'Rondônia': 'RO', 'Roraima': 'RR', 'Santa Catarina': 'SC',
      'São Paulo': 'SP', 'Sergipe': 'SE', 'Tocantins': 'TO'
    };
    
    return mapeamento[nome] || nome.toUpperCase().substring(0, 2);
  };

  const tentarProximaUrl = () => {
    if (urlIndex < geoUrls.length - 1) {
      const novoIndex = urlIndex + 1;
      setUrlIndex(novoIndex);
      setGeoUrl(geoUrls[novoIndex]);
      setCarregando(true);
      setErro(null);
    } else {
      setErro('Não foi possível carregar nenhuma fonte de dados do mapa');
      setCarregando(false);
    }
  };

  // Fallback para mapa simples se todas as URLs falharem
  const MapaSimples = () => (
    <div className="h-[400px] bg-gray-100 rounded-lg flex flex-col items-center justify-center p-8">
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {Object.entries(dadosRegiao).map(([nomeRegiao, valor]) => {
          const estaVisivel = !regiao || regiao === nomeRegiao;
          const cores = {
            'NORTE': 'bg-blue-500',
            'NORDESTE': 'bg-orange-500',
            'CENTRO-OESTE': 'bg-green-500',
            'SUDESTE': 'bg-red-500',
            'SUL': 'bg-purple-500'
          };
          
          return (
            <div
              key={nomeRegiao}
              className={`p-4 rounded-lg text-white text-center transition-all duration-300 ${
                cores[nomeRegiao as keyof typeof cores] || 'bg-gray-500'
              } ${estaVisivel ? 'opacity-100 scale-105' : 'opacity-50'}`}
            >
              <div className="text-sm font-semibold">{nomeRegiao}</div>
              <div className="text-lg font-bold">{valor}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (erro && urlIndex >= geoUrls.length - 1) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">
          Mapa de Queimadas - {ano}
        </h2>
        <MapaSimples />
        <div className="flex justify-center items-center mt-4">
          <div className="text-xs text-gray-600 text-center">
            Visualização simplificada - Dados de queimadas por região
          </div>
        </div>
      </div>
    );
  }

  if (carregando) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">
          Mapa de Queimadas - {ano}
        </h2>
        <div className="h-[400px] flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p>Carregando mapa...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">
        Mapa de Queimadas - {ano}
      </h2>
      <div className="h-[400px]">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 700,
            center: [-52, -15]
          }}
        >
          <ZoomableGroup>
            <Geographies 
              geography={geoUrl}
              onError={tentarProximaUrl}
            >
              {({ geographies }) => {
                setCarregando(false);
                return geographies.map(geo => {
                  const propriedades = geo.properties || {};
                  const nomeEstado = propriedades.name || propriedades.NAME || propriedades.estado || propriedades.ESTADO;
                  const siglaEstado = propriedades.sigla || obterEstadoPorNome(nomeEstado);
                  
                  const regiaoDoEstado = Object.entries(estadosPorRegiao).find(
                    ([_, estados]) => estados.includes(siglaEstado)
                  )?.[0];
                  
                  const estaVisivel = !regiao || regiao === regiaoDoEstado;
                  const intensidade = regiaoDoEstado ? dadosRegiao[regiaoDoEstado] : 0;
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={estaVisivel ? obterCor(regiaoDoEstado || '', intensidade) : '#f0f0f0'}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { 
                          outline: 'none', 
                          fill: estaVisivel ? '#FFD700' : '#f0f0f0',
                          cursor: 'pointer'
                        },
                        pressed: { outline: 'none' }
                      }}
                    />
                  );
                });
              }}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="text-xs text-gray-600 text-center">
          Intensidade de cores representa o volume de queimadas por região
        </div>
      </div>
    </div>
  );
};

export default MapaBrasil;