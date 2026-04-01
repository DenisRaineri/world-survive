# World Survive — Painel de focos de calor

Aplicação web (painel) para visualização de **focos de calor / queimadas** no Brasil por ano, macroregião, UF e bioma, desenvolvida como trabalho acadêmico na UNIP. Stack: **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **Chart.js** e **react-simple-maps**.

## Funcionalidades

- **Critérios de visão**: ano (2019–2025) e macroregião opcional (ou Brasil inteiro), com botão **Redefinir**
- **Cards**: total nacional, variação em relação ao ano anterior (quando existir) e destaque regional com participação no total
- **Gráficos**: barras por UF, pizza por macroregião, rosca por bioma, linhas comparativas na série temporal
- **Mapa**: geometria dos estados (GeoJSON remoto ou fallback local) com intensidade por macroregião; fallback em grade se o mapa não carregar

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm

## Instalação e scripts

```bash
git clone <url-do-repositorio>
cd world-survive
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador.

| Comando           | Descrição                    |
| ----------------- | ---------------------------- |
| `npm run dev`     | Servidor de desenvolvimento  |
| `npm run build`   | Build de produção (`dist/`)  |
| `npm run preview` | Pré-visualização do build      |
| `npm run lint`    | ESLint                       |

## Estrutura do código (resumo)

```
src/
├── components/       # UI: Dashboard, Filtros, Header, CardTotais, charts/, map/
├── constants/        # cronologia (anos da série)
├── data/             # dados estáticos (dadosQueimadas.ts)
├── hooks/            # useFiltrosDashboard
├── lib/              # chartRegistrar (Chart.js registrado uma vez)
├── types/            # tipos TypeScript
├── utils/            # dataUtils, mapeamentoBrasil, estatisticasAgregadas
├── App.tsx
├── main.tsx
└── index.css         # variáveis de tema (--cor-*)
```

## Dados e uso acadêmico

Os números exibidos vêm de um **arquivo estático** (`src/data/dadosQueimadas.ts`), adequado para demonstração e estudo. **Não substituem** bases oficiais em tempo real. Para dados institucionais, use fontes como o **INPE / Programa Queimadas** e normas da sua disciplina sobre citação e originalidade.

Documentação técnica detalhada: [`DOCUMENTACAO.md`](./DOCUMENTACAO.md).

## Autoria

**Denis Pimentel Raineri** — UNIP, Ciência da Computação (4º semestre).
