/** Ambienti e oggetti disponibili per le stanze del palazzo della memoria. */
export const AMBIENTI = ['bottega', 'biblioteca', 'rifugio', 'mercato', 'fortezza', 'radura'] as const;
export const OGGETTI = [
  'scaffale', 'abaco', 'sedia', 'scacchiera', 'cesto', 'specchio', 'clessidra', 'pizza', 'forno', 'mappa', 'bilancia',
  'incudine', 'forziere', 'pergamena', 'torre', 'catapulta', 'lavagna', 'cannocchiale', 'ruota', 'dadi', 'calderone', 'trono',
] as const;
export type Ambiente = (typeof AMBIENTI)[number];
export type Oggetto = (typeof OGGETTI)[number];
