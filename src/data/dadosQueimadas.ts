import { DadosBioma, DadosRegiao, DadosEstado } from '../types/types';

// Dados de queimadas por bioma
export const dadosBioma: DadosBioma[] = [
  { bioma: 'Amazônia', anos: { '2019': 7872, '2020': 4826, '2021': 2916, '2022': 2684, '2023': 3577, '2024': 8977, '2025': 2683 } },
  { bioma: 'Caatinga', anos: { '2019': 592, '2020': 415, '2021': 1066, '2022': 400, '2023': 981, '2024': 1127, '2025': 1498 } },
  { bioma: 'Cerrado', anos: { '2019': 3476, '2020': 3419, '2021': 2738, '2022': 3052, '2023': 3182, '2024': 4575, '2025': 2646 } },
  { bioma: 'Mata Atlântica', anos: { '2019': 2152, '2020': 2437, '2021': 2267, '2022': 1404, '2023': 1396, '2024': 1768, '2025': 1783 } },
  { bioma: 'Pampa', anos: { '2019': 184, '2020': 608, '2021': 273, '2022': 342, '2023': 280, '2024': 82, '2025': 284 } },
  { bioma: 'Pantanal', anos: { '2019': 674, '2020': 1815, '2021': 213, '2022': 214, '2023': 57, '2024': 653, '2025': 60 } }
];

// Dados de queimadas por região
export const dadosRegiao: DadosRegiao[] = [
  { regiao: 'CENTRO-OESTE', anos: { '2019': 4685, '2020': 6141, '2021': 3060, '2022': 3109, '2023': 2674, '2024': 5682, '2025': 1803 } },
  { regiao: 'NORDESTE', anos: { '2019': 2895, '2020': 1477, '2021': 2650, '2022': 1496, '2023': 2656, '2024': 3091, '2025': 3289 } },
  { regiao: 'NORTE', anos: { '2019': 5923, '2020': 3064, '2021': 1625, '2022': 1640, '2023': 2508, '2024': 6802, '2025': 2034 } },
  { regiao: 'SUDESTE', anos: { '2019': 913, '2020': 978, '2021': 956, '2022': 940, '2023': 839, '2024': 985, '2025': 903 } },
  { regiao: 'SUL', anos: { '2019': 534, '2020': 1860, '2021': 1182, '2022': 911, '2023': 796, '2024': 622, '2025': 925 } }
];

// Dados de queimadas por estado
export const dadosEstados: DadosEstado[] = [
  { estado: 'DISTRITO FEDERAL', sigla: 'DF', regiao: 'CENTRO-OESTE', anos: { '2019': 5, '2020': 9, '2021': 4, '2022': 10, '2023': 5, '2024': 10, '2025': 3 } },
  { estado: 'GOIÁS', sigla: 'GO', regiao: 'CENTRO-OESTE', anos: { '2019': 438, '2020': 432, '2021': 348, '2022': 409, '2023': 338, '2024': 580, '2025': 311 } },
  { estado: 'MATO GROSSO DO SUL', sigla: 'MS', regiao: 'CENTRO-OESTE', anos: { '2019': 1061, '2020': 1864, '2021': 502, '2022': 593, '2023': 356, '2024': 961, '2025': 343 } },
  { estado: 'MATO GROSSO', sigla: 'MT', regiao: 'CENTRO-OESTE', anos: { '2019': 3181, '2020': 3836, '2021': 2206, '2022': 2097, '2023': 1975, '2024': 4131, '2025': 1146 } },
  { estado: 'ALAGOAS', sigla: 'AL', regiao: 'NORDESTE', anos: { '2019': 57, '2020': 83, '2021': 116, '2022': 75, '2023': 92, '2024': 119, '2025': 97 } },
  { estado: 'BAHIA', sigla: 'BA', regiao: 'NORDESTE', anos: { '2019': 1260, '2020': 507, '2021': 1026, '2022': 627, '2023': 864, '2024': 995, '2025': 1117 } },
  { estado: 'CEARÁ', sigla: 'CE', regiao: 'NORDESTE', anos: { '2019': 210, '2020': 104, '2021': 270, '2022': 67, '2023': 270, '2024': 398, '2025': 322 } },
  { estado: 'MARANHÃO', sigla: 'MA', regiao: 'NORDESTE', anos: { '2019': 906, '2020': 290, '2021': 514, '2022': 387, '2023': 694, '2024': 809, '2025': 736 } },
  { estado: 'PARAIBA', sigla: 'PB', regiao: 'NORDESTE', anos: { '2019': 53, '2020': 83, '2021': 82, '2022': 25, '2023': 114, '2024': 68, '2025': 165 } },
  { estado: 'PERNAMBUCO', sigla: 'PE', regiao: 'NORDESTE', anos: { '2019': 102, '2020': 166, '2021': 194, '2022': 91, '2023': 203, '2024': 197, '2025': 294 } },
  { estado: 'PIAUÍ', sigla: 'PI', regiao: 'NORDESTE', anos: { '2019': 221, '2020': 148, '2021': 213, '2022': 156, '2023': 291, '2024': 374, '2025': 320 } },
  { estado: 'RIO GRANDO DO NORTE', sigla: 'RN', regiao: 'NORDESTE', anos: { '2019': 28, '2020': 47, '2021': 128, '2022': 22, '2023': 60, '2024': 68, '2025': 110 } },
  { estado: 'SERGIPE', sigla: 'SE', regiao: 'NORDESTE', anos: { '2019': 58, '2020': 49, '2021': 107, '2022': 46, '2023': 68, '2024': 63, '2025': 128 } },
  { estado: 'ACRE', sigla: 'AC', regiao: 'NORTE', anos: { '2019': 10, '2020': 21, '2021': 15, '2022': 33, '2023': 9, '2024': 25, '2025': 43 } },
  { estado: 'AMAZONAS', sigla: 'AM', regiao: 'NORTE', anos: { '2019': 249, '2020': 359, '2021': 105, '2022': 205, '2023': 147, '2024': 368, '2025': 104 } },
  { estado: 'AMAPÁ', sigla: 'AP', regiao: 'NORTE', anos: { '2019': 4, '2020': 4, '2021': 2, '2022': 12, '2023': 10, '2024': 6, '2025': 5 } },
  { estado: 'PARÁ', sigla: 'PA', regiao: 'NORTE', anos: { '2019': 519, '2020': 390, '2021': 609, '2022': 343, '2023': 576, '2024': 1058, '2025': 591 } },
  { estado: 'RONDÔNIA', sigla: 'RO', regiao: 'NORTE', anos: { '2019': 109, '2020': 166, '2021': 98, '2022': 138, '2023': 138, '2024': 214, '2025': 78 } },
  { estado: 'RORAIMA', sigla: 'RR', regiao: 'NORTE', anos: { '2019': 4579, '2020': 1640, '2021': 514, '2022': 607, '2023': 1209, '2024': 4609, '2025': 883 } },
  { estado: 'TOCANTINS', sigla: 'TO', regiao: 'NORTE', anos: { '2019': 453, '2020': 484, '2021': 282, '2022': 302, '2023': 419, '2024': 522, '2025': 330 } },
  { estado: 'ESPÍRITO SANTO', sigla: 'ES', regiao: 'SUDESTE', anos: { '2019': 100, '2020': 35, '2021': 127, '2022': 62, '2023': 45, '2024': 64, '2025': 71 } },
  { estado: 'MINAS GERAIS', sigla: 'MG', regiao: 'SUDESTE', anos: { '2019': 465, '2020': 359, '2021': 516, '2022': 509, '2023': 536, '2024': 494, '2025': 569 } },
  { estado: 'RIO DE JANEIRO', sigla: 'RJ', regiao: 'SUDESTE', anos: { '2019': 60, '2020': 33, '2021': 45, '2022': 62, '2023': 29, '2024': 58, '2025': 83 } },
  { estado: 'SÃO PAULO', sigla: 'SP', regiao: 'SUDESTE', anos: { '2019': 288, '2020': 551, '2021': 268, '2022': 307, '2023': 229, '2024': 369, '2025': 180 } },
  { estado: 'PARANÁ', sigla: 'PR', regiao: 'SUL', anos: { '2019': 220, '2020': 544, '2021': 424, '2022': 247, '2023': 207, '2024': 279, '2025': 216 } },
  { estado: 'RIO GRANDE DO SUL', sigla: 'RS', regiao: 'SUL', anos: { '2019': 229, '2020': 805, '2021': 423, '2022': 436, '2023': 402, '2024': 147, '2025': 401 } },
  { estado: 'SANTA CATARINA', sigla: 'SC', regiao: 'SUL', anos: { '2019': 85, '2020': 511, '2021': 335, '2022': 228, '2023': 187, '2024': 196, '2025': 308 } }
];

// Lista de regiões disponíveis
export const regioes = ['CENTRO-OESTE', 'NORDESTE', 'NORTE', 'SUDESTE', 'SUL'];

// Lista de anos disponíveis
export const anosDisponiveis = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];

// Cores para os gráficos
export const coresBiomas = [
  'rgba(46, 125, 50, 0.9)',   // Amazônia - Verde escuro
  'rgba(255, 152, 0, 0.9)',   // Caatinga - Laranja
  'rgba(255, 193, 7, 0.9)',   // Cerrado - Amarelo
  'rgba(56, 142, 60, 0.8)',   // Mata Atlântica - Verde médio
  'rgba(0, 150, 136, 0.8)',   // Pampa - Verde-água
  'rgba(121, 85, 72, 0.8)',   // Pantanal - Marrom
];

export const coresRegioes = [
  'rgba(76, 175, 80, 0.8)',   // Centro-Oeste - Verde
  'rgba(255, 152, 0, 0.8)',   // Nordeste - Laranja
  'rgba(33, 150, 243, 0.8)',  // Norte - Azul
  'rgba(244, 67, 54, 0.8)',   // Sudeste - Vermelho
  'rgba(156, 39, 176, 0.8)',  // Sul - Roxo
];