export type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const STEPS = [
  { id: 0, label: 'Inicio', short: 'Inicio' },
  { id: 1, label: 'Activar marca', short: 'Marca' },
  { id: 2, label: 'Anuncios 5€/día', short: 'Anuncios' },
  { id: 3, label: 'Pasa el tiempo', short: 'Clientes' },
  { id: 4, label: 'Firma exclusiva', short: 'Exclusiva' },
  { id: 5, label: 'Activar RIC', short: 'RIC' },
  { id: 6, label: 'Venta cerrada', short: 'Venta' },
] as const;
