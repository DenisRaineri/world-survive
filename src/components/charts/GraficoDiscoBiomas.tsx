import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { AnoDisponivel } from '../../types/types';
import { obterDadosBiomasPorAno } from '../../utils/dataUtils';
import { coresBiomas } from '../../data/dadosQueimadas';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface GraficoDiscoBiomasProps {
  ano: AnoDisponivel;
}

const GraficoDiscoBiomas: React.FC<GraficoDiscoBiomasProps> = ({ ano }) => {
  const { labels, dados } = obterDadosBiomasPorAno(ano);
  const total = dados.reduce((acc, curr) => acc + curr, 0);

  const data = {
    labels,
    datasets: [
      {
        data: dados,
        backgroundColor: coresBiomas,
        borderColor: coresBiomas.map(cor => cor.replace(/[0-9.]+\)$/, '1)')),
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '50%',
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: `Distribuição de Queimadas por Bioma em ${ano}`,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value.toLocaleString('pt-BR')} (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 500,
    },
  };

  return (
    <div className="h-80 bg-white rounded-lg shadow-md p-4 transition-all duration-300">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default GraficoDiscoBiomas;