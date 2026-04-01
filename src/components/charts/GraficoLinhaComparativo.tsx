import React from 'react';
import { Line } from 'react-chartjs-2';
import type { ChartOptions, TooltipItem } from 'chart.js';
import { obterDadosComparativoPorAnos } from '../../utils/dataUtils';

interface GraficoLinhaComparativoProps {
  regiao: string | null;
}

const GraficoLinhaComparativo: React.FC<GraficoLinhaComparativoProps> = ({
  regiao,
}) => {
  const { labels, datasets } = obterDadosComparativoPorAnos(regiao);

  const data = { labels, datasets };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: regiao
          ? `Série 2019–2025 · UFs em ${regiao}`
          : `Série 2019–2025 · Macroregiões`,
        font: { size: 15, weight: '600' },
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'line'>) => {
            const v = ctx.parsed.y;
            if (v == null) return '';
            return `${ctx.dataset.label}: ${Number(v).toLocaleString('pt-BR')} focos`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) =>
            typeof value === 'number'
              ? value.toLocaleString('pt-BR')
              : value,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animation: { duration: 480 },
  };

  return (
    <div className="painel-card h-80 p-4">
      <Line data={data} options={options} />
    </div>
  );
};

export default GraficoLinhaComparativo;
