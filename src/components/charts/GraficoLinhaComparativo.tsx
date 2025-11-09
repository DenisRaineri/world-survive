import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { obterDadosComparativoPorAnos } from '../../utils/dataUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraficoLinhaComparativoProps {
  regiao: string | null;
}

const GraficoLinhaComparativo: React.FC<GraficoLinhaComparativoProps> = ({ regiao }) => {
  const { labels, datasets } = obterDadosComparativoPorAnos(regiao);

  const data = {
    labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: regiao 
          ? `Evolução de Queimadas nos Estados da Região ${regiao} (2019-2025)`
          : 'Evolução de Queimadas por Região (2019-2025)',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw.toLocaleString('pt-BR')} ocorrências`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return value.toLocaleString('pt-BR');
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    animation: {
      duration: 500,
    },
  };

  return (
    <div className="h-80 bg-white rounded-lg shadow-md p-4 transition-all duration-300">
      <Line data={data} options={options} />
    </div>
  );
};

export default GraficoLinhaComparativo;