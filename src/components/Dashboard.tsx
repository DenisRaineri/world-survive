import React from 'react';
import { useFiltrosDashboard } from '../hooks/useFiltrosDashboard';
import Filtros from './Filtros';
import CardTotais from './CardTotais';
import GraficoBarraEstados from './charts/GraficoBarraEstados';
import GraficoPizzaRegioes from './charts/GraficoPizzaRegioes';
import GraficoDiscoBiomas from './charts/GraficoDiscoBiomas';
import GraficoLinhaComparativo from './charts/GraficoLinhaComparativo';
import MapaBrasil from './map/MapaBrasil';

const Dashboard: React.FC = () => {
  const { criterios, setCriterios, redefinirFiltros } = useFiltrosDashboard();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Filtros
        criterios={criterios}
        onCriteriosChange={setCriterios}
        onRedefinir={redefinirFiltros}
      />

      <CardTotais ano={criterios.ano} regiao={criterios.regiao} />

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GraficoBarraEstados ano={criterios.ano} regiao={criterios.regiao} />
        <GraficoPizzaRegioes ano={criterios.ano} />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GraficoDiscoBiomas ano={criterios.ano} />
        <GraficoLinhaComparativo regiao={criterios.regiao} />
      </div>

      <div className="mb-4">
        <MapaBrasil ano={criterios.ano} regiao={criterios.regiao} />
      </div>
    </div>
  );
};

export default Dashboard;
