/** Il Regno di Numeria: gradi, regioni e macroargomenti. */

export type Grado = {
  numero: number;
  nome: string;
  equipaggiamento: string;
  regione: string;
  slugRegione: string;
  fase: string;
  colore: string;
  icona: string;
};

export const GRADI: Grado[] = [
  { numero: 1, nome: 'Recluta', equipaggiamento: 'un bastone (e tanto entusiasmo)', regione: 'Villaggio delle Cifre', slugRegione: 'villaggio-delle-cifre', fase: 'Elementari', colore: 'var(--g1)', icona: '🪵' },
  { numero: 2, nome: 'Scudiero', equipaggiamento: 'fionda e scudo di legno', regione: 'Bosco delle Frazioni', slugRegione: 'bosco-delle-frazioni', fase: 'Medie', colore: 'var(--g2)', icona: '🛡️' },
  { numero: 3, nome: 'Guerriero', equipaggiamento: 'spada corta', regione: "Montagne dell'Algebra", slugRegione: 'montagne-dell-algebra', fase: 'Biennio superiori', colore: 'var(--g3)', icona: '🗡️' },
  { numero: 4, nome: 'Cavaliere', equipaggiamento: 'armatura e cavallo', regione: "Valle delle Funzioni e Torre dell'Infinito", slugRegione: 'valle-delle-funzioni', fase: 'Triennio e maturità', colore: 'var(--g4)', icona: '🐴' },
  { numero: 5, nome: 'Paladino', equipaggiamento: 'spada lunga e stendardo', regione: 'Città dei Vettori', slugRegione: 'citta-dei-vettori', fase: 'Primi anni di università', colore: 'var(--g5)', icona: '🚩' },
  { numero: 6, nome: 'Cavaliere alato', equipaggiamento: 'un cavallo alato', regione: 'Cieli Immaginari', slugRegione: 'cieli-immaginari', fase: 'Matematica avanzata', colore: 'var(--g6)', icona: '🪽' },
];

export const MACROARGOMENTI = [
  { slug: 'numeri', nome: 'Numeri e aritmetica', descrizione: 'Contare, operare, frazioni, potenze, divisibilità.' },
  { slug: 'geometria', nome: 'Geometria', descrizione: 'Forme, misure, teoremi, trasformazioni.' },
  { slug: 'algebra', nome: 'Algebra', descrizione: 'Lettere al posto dei numeri: espressioni, equazioni, sistemi.' },
  { slug: 'funzioni-analisi', nome: 'Funzioni e analisi', descrizione: 'Grafici, limiti, derivate, integrali.' },
  { slug: 'probabilita-statistica', nome: 'Probabilità e statistica', descrizione: 'Caso, dati, previsioni.' },
  { slug: 'logica-insiemi', nome: 'Logica e insiemi', descrizione: 'Ragionare con precisione.' },
  { slug: 'algebra-lineare', nome: 'Algebra lineare', descrizione: 'Vettori, matrici, trasformazioni.' },
  { slug: 'strutture-avanzate', nome: 'Strutture avanzate', descrizione: 'Numeri complessi, quaternioni, gruppi, topologia.' },
] as const;

export type SlugMacro = (typeof MACROARGOMENTI)[number]['slug'];
export const SLUG_MACRO = MACROARGOMENTI.map((m) => m.slug) as [SlugMacro, ...SlugMacro[]];

export const DISTRATTORI = {
  mercante: { nome: 'il Mercante di Scorciatoie', motto: 'Regole comode, peccato che siano sbagliate.' },
  menestrello: { nome: 'il Menestrello del "Non sono portato"', motto: 'Canta canzoni tristi sulla tua (presunta) incapacità.' },
  gnomo: { nome: 'lo Gnomo Copione', motto: 'Ti offre la soluzione già pronta. Gratis. Quasi.' },
  barone: { nome: 'il Barone del Panico', motto: 'Fa sembrare ogni problema un drago.' },
  sirena: { nome: 'la Sirena del Dopo', motto: '«Ma sì, lo studi domani…»' },
} as const;
export type SlugDistrattore = keyof typeof DISTRATTORI;

export const PERSONAGGI = {
  civetta: { nome: 'Ottavia la Civetta', icona: '🦉' },
  fabbro: { nome: 'Brontolo il Fabbro', icona: '🔨' },
  narratore: { nome: 'Il Narratore', icona: '📜' },
} as const;

export const grado = (n: number) => GRADI.find((g) => g.numero === n)!;
export const macro = (slug: string) => MACROARGOMENTI.find((m) => m.slug === slug)!;
