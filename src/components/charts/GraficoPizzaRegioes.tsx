import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { AnoDisponivel } from '../../types/types';
import { obterDadosRegioesPorAno } from '../../utils/dataUtils';
import { coresRegioes } from '../../data/dadosQueimadas';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface GraficoPizzaRegioesProps {
  ano: AnoDisponivel;
}

const GraficoPizzaRegioes: React.FC<GraficoPizzaRegioesProps> = ({ ano }) => {
  const { labels, dados } = obterDadosRegioesPorAno(ano);
  const total = dados.reduce((acc, curr) => acc + curr, 0);

  const data = {
    labels,
    datasets: [
      {
        data: dados,
        backgroundColor: coresRegioes,
        borderColor: coresRegioes.map(cor => cor.replace('0.8', '1')),
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: `Distribuição de Queimadas por Região em ${ano}`,
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
      <Pie data={data} options={options} />
    </div>
  );
};

export default GraficoPizzaRegioes;