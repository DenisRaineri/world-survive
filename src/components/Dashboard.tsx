import React, { useState } from 'react';
import Filtros from './Filtros';
import CardTotais from './CardTotais';
import GraficoBarraEstados from './charts/GraficoBarraEstados';
import GraficoPizzaRegioes from './charts/GraficoPizzaRegioes';
import GraficoDiscoBiomas from './charts/GraficoDiscoBiomas';
import GraficoLinhaComparativo from './charts/GraficoLinhaComparativo';
import MapaBrasil from './map/MapaBrasil';
import { FiltrosType } from '../types/types';

const Dashboard: React.FC = () => {
  const [filtros, setFiltros] = useState<FiltrosType>({
    ano: '2024',
    regiao: null
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <Filtros
        filtros={filtros}
        setFiltros={setFiltros}
      />
      
      <CardTotais
        ano={filtros.ano}
        regiao={filtros.regiao}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GraficoBarraEstados
          ano={filtros.ano}
          regiao={filtros.regiao}
        />
        <GraficoPizzaRegioes
          ano={filtros.ano}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GraficoDiscoBiomas
          ano={filtros.ano}
        />
        <GraficoLinhaComparativo
          regiao={filtros.regiao}
        />
      </div>
      
      <div className="mb-6">
        <MapaBrasil
          ano={filtros.ano}
          regiao={filtros.regiao}
        />
      </div>
    </div>
  );
};

export default Dashboard;