import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import type { ChartOptions, TooltipItem } from 'chart.js';
import type { AnoDisponivel } from '../../types/types';
import { obterDadosBiomasPorAno } from '../../utils/dataUtils';
import { coresBiomas } from '../../data/dadosQueimadas';

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
        borderColor: coresBiomas.map((cor) =>
          cor.replace(/[0-9.]+\)$/, '1)')
        ),
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '52%',
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: `Por bioma — ${ano}`,
        font: { size: 15, weight: '600' },
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'doughnut'>) => {
            const value = ctx.raw as number;
            const pct = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return `${ctx.label}: ${value.toLocaleString('pt-BR')} (${pct}%)`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 480,
    },
  };

  return (
    <div className="painel-card h-80 p-4">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default GraficoDiscoBiomas;
