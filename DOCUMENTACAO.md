# World Survive — Documentação técnica

Painel web de visualização de focos de calor no Brasil (trabalho acadêmico).

---

## Informações do projeto

| Campo            | Valor                                      |
| ---------------- | ------------------------------------------ |
| **Instituição**  | Universidade Paulista (UNIP)               |
| **Curso**        | Ciência da Computação                      |
| **Semestre**     | 4º semestre                                |
| **Discente**     | Denis Pimentel Raineri                     |
| **Repositório**  | `world-survive`                            |

---

## Resumo executivo

O **World Survive** é um painel interativo que consolida, em uma única página, filtros por **ano** e **macroregião**, cartões-resumo, quatro visualizações com **Chart.js** e um **mapa** baseado em GeoJSON (`react-simple-maps`). A série temporal cobre **2019 a 2025**; os valores são mantidos em **TypeScript** como dataset estático, separados da camada de apresentação.

---

## Objetivos

### Objetivo geral

Proporcionar uma interface responsiva para explorar, de forma didática, a distribuição de focos por UF, macroregião e bioma no Brasil.

### Objetivos específicos

- Centralizar critérios de visualização (ano + macroregião) e propagá-los aos componentes
- Expor agregações (totais, variação anual, participação regional) de forma explícita no código (`estatisticasAgregadas`)
- Registrar dependências do **Chart.js** uma única vez (`lib/chartRegistrar.ts`)
- Carregar geometria do mapa via **fetch**, com tentativa sequencial de fontes e fallback visual
- Manter tipagem consistente (`CriteriosPainel`, `AnoPainel`, séries por ano)

---

## Transparência acadêmica e origem dos dados

1. **Dataset numérico**  
   O arquivo `src/data/dadosQueimadas.ts` contém um **conjunto estático** usado para o trabalho. Ele **não** é uma réplica automatizada nem uma exportação oficial em tempo real do INPE ou de outro órgão.

2. **Referência para dados oficiais**  
   Para comparações com a realidade e citações bibliográficas, utilize fontes oficiais, por exemplo o **Programa Queimadas / INPE**, **MMA** e publicações do **IBGE**, conforme orientação do professor.

3. **Ferramentas e autoria**  
   Se no desenvolvimento foram utilizados **templates**, **ambientes de prototipagem** (por exemplo Bolt) ou **assistentes de IA**, o regulamento da disciplina costuma exigir **declaração explícita** no relatório ou na defesa. Esta documentação descreve a arquitetura **atual** do repositório; a responsabilidade pela honestidade acadêmica é do discente e das regras da UNIP.

---

## Tecnologias

| Área            | Tecnologias principais                          |
| --------------- | ----------------------------------------------- |
| Runtime / UI    | React 18, TypeScript                            |
| Build           | Vite                                            |
| Estilo          | Tailwind CSS, variáveis CSS em `index.css`      |
| Gráficos        | Chart.js, react-chartjs-2                       |
| Mapa            | react-simple-maps                               |
| Ícones          | Lucide React                                    |
| Qualidade       | ESLint, typescript-eslint                       |

Versões exatas: ver `package.json`.

---

## Arquitetura e estrutura de diretórios

### Visão geral

- **Component-based**: cada gráfico e o mapa são componentes isolados.
- **Estado local**: critérios globais do painel vêm de `useFiltrosDashboard` e descem por props (sem Redux neste escopo).
- **Separação de responsabilidades**: dados brutos em `data/`, transformações em `utils/`, tipos em `types/`, constantes de domínio em `constants/`.

### Árvore relevante

```
src/
├── components/
│   ├── charts/
│   │   ├── GraficoBarraEstados.tsx
│   │   ├── GraficoDiscoBiomas.tsx
│   │   ├── GraficoLinhaComparativo.tsx
│   │   └── GraficoPizzaRegioes.tsx
│   ├── map/
│   │   ├── MapaBrasil.tsx
│   │   └── MapaBrasilAlternativo.tsx   # variante simplificada (não usada no Dashboard padrão)
│   ├── CardTotais.tsx
│   ├── Dashboard.tsx
│   ├── Filtros.tsx
│   └── Header.tsx
├── constants/
│   └── cronologia.ts          # ANOS_CRONOLOGICOS, tipo AnoPainel
├── data/
│   └── dadosQueimadas.ts      # séries por bioma, macroregião e UF
├── hooks/
│   └── useFiltrosDashboard.ts
├── lib/
│   └── chartRegistrar.ts      # Chart.register centralizado
├── types/
│   └── types.ts
├── utils/
│   ├── dataUtils.ts           # preparação de séries para gráficos e mapa
│   ├── estatisticasAgregadas.ts
│   └── mapeamentoBrasil.ts    # UF ↔ macroregião, inferência de sigla no GeoJSON
├── App.tsx
├── main.tsx                   # importa chartRegistrar antes da árvore React
├── index.css
└── vite-env.d.ts
```

---

## Fluxo de dados e filtros

1. `Dashboard` chama `useFiltrosDashboard()` e obtém `criterios` (`ano`, `regiao`) e `setCriterios`.
2. `Filtros` altera `criterios` e oferece `onRedefinir` para voltar ao estado inicial.
3. Componentes filhos recebem `ano` e/ou `regiao` e consultam `dataUtils` ou `estatisticasAgregadas` conforme necessário.

---

## Funcionalidades por módulo

### Filtros (`Filtros.tsx`)

- Ano: um dos valores de `ANOS_CRONOLOGICOS`.
- Macroregião: valor do dataset ou “Brasil (todas)”.
- Botão **Redefinir** restaura ano padrão e macroregião nula.

### Cartões (`CardTotais.tsx`)

- Total nacional no ano (soma das macroregiões do dataset).
- Variação percentual em relação ao ano anterior, quando aplicável.
- Com macroregião selecionada: total da macro e percentual sobre o nacional.

### Gráficos

- **Barras**: UF; respeita filtro de macroregião.
- **Pizza**: partilha entre macroregiões no ano.
- **Rosca**: partilha entre biomas no ano.
- **Linhas**: série 2019–2025; com macroregião filtrada, uma série por UF da macro; sem filtro, uma série por macroregião.

### Mapa (`MapaBrasil.tsx`)

- Tenta carregar GeoJSON de URL pública; em seguida `/brasil-estados.json` se existir no `public/`.
- Cores por macroregião com opacidade proporcional ao volume regional no ano.
- Se todas as fontes falharem, exibe **grade por macroregião** com os mesmos totais do painel.

### Paleta no mapa (referência)

- **Norte**: azul  
- **Nordeste**: laranja  
- **Centro-Oeste**: verde  
- **Sudeste**: vermelho  
- **Sul**: roxo  

(Alinhado à legenda interna do componente de mapa.)

---

## Modelo de dados (TypeScript)

```typescript
// constants/cronologia.ts
export const ANOS_CRONOLOGICOS = [
  '2019', '2020', '2021', '2022', '2023', '2024', '2025',
] as const;
export type AnoPainel = (typeof ANOS_CRONOLOGICOS)[number];
```

```typescript
// types/types.ts (trecho)
export interface SeriePorAno {
  anos: Record<AnoPainel, number>;
}

export interface DadosBioma extends SeriePorAno {
  bioma: string;
}

export interface DadosRegiao extends SeriePorAno {
  regiao: string;
}

export interface DadosEstado extends SeriePorAno {
  estado: string;
  sigla: string;
  regiao: string;
}

export interface CriteriosPainel {
  ano: AnoPainel;
  regiao: string | null;
}

/** Alias legado para compatibilidade com nomenclatura anterior */
export type AnoDisponivel = AnoPainel;
```

### Domínio coberto pelo dataset

- **Biomas**: Amazônia, Caatinga, Cerrado, Mata Atlântica, Pampa, Pantanal  
- **Macroregiões**: Centro-Oeste, Nordeste, Norte, Sudeste, Sul  
- **UFs**: 26 estados + DF  

---

## Instalação e execução

### Pré-requisitos

- Node.js 18 ou superior (recomendado LTS atual)

### Comandos

```bash
git clone <url-do-repositorio>
cd world-survive
npm install
npm run dev
```

- Desenvolvimento: `http://localhost:5173`  
- Produção: `npm run build` e `npm run preview`

### Scripts npm

| Script            | Função                          |
| ----------------- | ------------------------------- |
| `npm run dev`     | Servidor Vite em desenvolvimento |
| `npm run build`   | Compilação para `dist/`         |
| `npm run preview` | Servir o build gerado           |
| `npm run lint`    | ESLint no projeto               |

---

## Metodologia e boas práticas

- Tipagem estática em interfaces de dados e props.
- Evitar `Chart.register` duplicado nos componentes de gráfico.
- Evitar efeitos colaterais no render (ex.: carregamento do mapa tratado com `fetch` + `useEffect`).
- Estilos reutilizáveis: classe `.painel-card` e variáveis `--cor-*` em `index.css`.

Testes automatizados não estão no escopo atual; validação por inspeção manual e `lint`/`build`.

---

## Responsividade

- Grid com `grid-cols-1` e breakpoints `md:` / `lg:` do Tailwind.
- Gráficos com altura fixa em container (`h-80`) e `maintainAspectRatio: false` no Chart.js.

---

## Melhorias futuras sugeridas

- Integração com API oficial ou exportação CSV atualizável.
- Testes (Vitest + Testing Library).
- Melhorias de acessibilidade (ARIA nos gráficos, contraste, foco).
- Internacionalização (pt/en).

---

## Referências

### Documentação de ferramentas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Chart.js](https://www.chartjs.org/docs/)
- [react-simple-maps](https://www.react-simple-maps.io/)

### Contexto ambiental e dados oficiais (consulta e citação)

- INPE — Programa Queimadas  
- Ministério do Meio Ambiente (MMA)  
- IBGE — malhas e divisões territoriais  

---

## Considerações finais

Este documento descreve a implementação atual do **World Survive** como painel de visualização educacional. A separação entre **dados estáticos do repositório** e **fontes oficiais** deve ficar clara tanto na documentação quanto na apresentação ao professor, em linha com as exigências de integridade acadêmica da instituição.

---

**Denis Pimentel Raineri** — UNIP — Ciência da Computação — 4º semestre.
