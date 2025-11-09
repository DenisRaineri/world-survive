# Dashboard de Queimadas no Brasil

Dashboard interativo para monitoramento de queimadas no Brasil, desenvolvido com React, TypeScript e Tailwind CSS.

## 🔥 Funcionalidades

- **Visualização por ano**: Dados de 2019 a 2025
- **Filtros por região**: Norte, Nordeste, Centro-Oeste, Sudeste, Sul
- **Múltiplos gráficos**: Barras, pizza, linha e disco
- **Mapa interativo**: Visualização geográfica das queimadas
- **Cards informativos**: Totais por bioma, região e estado

## 🛠️ Tecnologias

- React 18
- TypeScript
- Tailwind CSS
- Chart.js
- React Simple Maps
- Vite

## 🚀 Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd project

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

## 📊 Estrutura dos Dados

O dashboard apresenta dados organizados por:

- **Biomas**: Amazônia, Caatinga, Cerrado, Mata Atlântica, Pampa, Pantanal
- **Regiões**: Norte, Nordeste, Centro-Oeste, Sudeste, Sul
- **Estados**: Todos os 26 estados + DF
- **Anos**: 2019-2025

## 🗂️ Estrutura do Projeto

```
src/
├── components/
│   ├── charts/          # Gráficos
│   ├── map/            # Mapa do Brasil
│   ├── Dashboard.tsx   # Componente principal
│   ├── Filtros.tsx     # Filtros de ano/região
│   └── Header.tsx      # Cabeçalho
├── data/
│   └── dadosQueimadas.ts # Dados das queimadas
├── types/
│   └── types.ts        # Tipos TypeScript
└── utils/
    └── dataUtils.ts    # Funções utilitárias
```

## 📱 Responsividade

O dashboard é totalmente responsivo, adaptando-se a diferentes tamanhos de tela com layout em grid flexível.

## 🎨 Design

Interface moderna com:
- Cores diferenciadas por região
- Animações suaves
- Estados de carregamento
- Tratamento de erros
- Tooltips informativos