/** Anos cobertos pelo conjunto estático do painel (série 2019–2025). */
export const ANOS_CRONOLOGICOS = [
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
] as const;

export type AnoPainel = (typeof ANOS_CRONOLOGICOS)[number];
