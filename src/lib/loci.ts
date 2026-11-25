/** Ambienti e oggetti disponibili per le stanze del palazzo della memoria. */
export const AMBIENTI = ['bottega', 'biblioteca', 'rifugio', 'mercato', 'fortezza', 'radura'] as const;
export const OGGETTI = [
  'scaffale', 'abaco', 'sedia', 'scacchiera', 'cesto', 'specchio', 'clessidra', 'pizza', 'forno', 'mappa', 'bilancia',
  'incudine', 'forziere', 'pergamena', 'torre', 'catapulta', 'lavagna', 'cannocchiale', 'ruota', 'dadi', 'calderone', 'trono',
] as const;
export type Ambiente = (typeof AMBIENTI)[number];
export type Oggetto = (typeof OGGETTI)[number];

/** Nomi degli oggetti da mostrare (gli identificativi restano in italiano). */
export const NOMI_OGGETTI_EN: Record<Oggetto, string> = {
  scaffale: 'shelf', abaco: 'abacus', sedia: 'chair', scacchiera: 'chessboard', cesto: 'basket', specchio: 'mirror', clessidra: 'hourglass',
  pizza: 'pizza', forno: 'oven', mappa: 'map', bilancia: 'scales', incudine: 'anvil', forziere: 'chest', pergamena: 'scroll', torre: 'tower',
  catapulta: 'catapult', lavagna: 'blackboard', cannocchiale: 'telescope', ruota: 'wheel', dadi: 'dice', calderone: 'cauldron', trono: 'throne',
};
export const nomeOggetto = (o: Oggetto, l: 'it' | 'en') => (l === 'en' ? NOMI_OGGETTI_EN[o] : o);
