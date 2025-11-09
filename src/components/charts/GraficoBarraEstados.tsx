import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { AnoDisponivel } from '../../types/types';
import { obterDadosEstadosPorAno } from '../../utils/dataUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface GraficoBarraEstadosProps {
  ano: AnoDisponivel;
  regiao: string | null;
}

const GraficoBarraEstados: React.FC<GraficoBarraEstadosProps> = ({ ano, regiao }) => {
  const { labels, dados } = obterDadosEstadosPorAno(ano, regiao);

  const data = {
    labels,
    datasets: [
      {
        label: `Queimadas em ${ano}`,
        data: dados,
        backgroundColor: 'rgba(244, 67, 54, 0.8)',
        borderColor: 'rgba(244, 67, 54, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(244, 67, 54, 1)',
      },
    ],
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
        text: `Queimadas por Estado em ${ano}${regiao ? ` - ${regiao}` : ''}`,
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
    animation: {
      duration: 500,
    },
  };

  return (
    <div className="h-80 bg-white rounded-lg shadow-md p-4 transition-all duration-300">
      <Bar data={data} options={options} />
    </div>
  );
};

export default GraficoBarraEstados;