import React from 'react';
import { Bar } from 'react-chartjs-2';
import type { ChartOptions, TooltipItem } from 'chart.js';
import type { AnoDisponivel } from '../../types/types';
import { obterDadosEstadosPorAno } from '../../utils/dataUtils';

interface GraficoBarraEstadosProps {
  ano: AnoDisponivel;
  regiao: string | null;
}

const GraficoBarraEstados: React.FC<GraficoBarraEstadosProps> = ({
  ano,
  regiao,
}) => {
  const { labels, dados } = obterDadosEstadosPorAno(ano, regiao);

  const data = {
    labels,
    datasets: [
      {
        label: `Focos em ${ano}`,
        data: dados,
        backgroundColor: 'rgba(234, 88, 12, 0.75)',
        borderColor: 'rgba(194, 65, 12, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(194, 65, 12, 0.95)',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Por UF — ${ano}${regiao ? ` · ${regiao}` : ''}`,
        font: { size: 15, weight: '600' },
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'bar'>) => {
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
    animation: { duration: 480 },
  };

  return (
    <div className="painel-card h-80 p-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default GraficoBarraEstados;
