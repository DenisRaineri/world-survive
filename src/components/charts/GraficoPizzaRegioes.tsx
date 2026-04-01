import React from 'react';
import { Pie } from 'react-chartjs-2';
import type { ChartOptions, TooltipItem } from 'chart.js';
import type { AnoDisponivel } from '../../types/types';
import { obterDadosRegioesPorAno } from '../../utils/dataUtils';
import { coresRegioes } from '../../data/dadosQueimadas';

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
        borderColor: coresRegioes.map((cor) => cor.replace('0.8', '1')),
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: `Partilha por macroregião — ${ano}`,
        font: { size: 15, weight: '600' },
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'pie'>) => {
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
      <Pie data={data} options={options} />
    </div>
  );
};

export default GraficoPizzaRegioes;
