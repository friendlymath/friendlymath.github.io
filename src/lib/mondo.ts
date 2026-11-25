import type { Lingua } from './lingua';
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

/* ---------- English ---------- */

const GRADI_EN: Record<number, Pick<Grado, 'nome' | 'equipaggiamento' | 'regione' | 'fase'>> = {
  1: { nome: 'Recruit', equipaggiamento: 'a stick (and plenty of enthusiasm)', regione: 'Village of Digits', fase: 'Primary school' },
  2: { nome: 'Squire', equipaggiamento: 'a sling and a wooden shield', regione: 'Forest of Fractions', fase: 'Lower secondary' },
  3: { nome: 'Warrior', equipaggiamento: 'a short sword', regione: 'Algebra Mountains', fase: 'Upper secondary, first years' },
  4: { nome: 'Knight', equipaggiamento: 'armour and a horse', regione: 'Valley of Functions and Tower of Infinity', fase: 'Upper secondary, final years' },
  5: { nome: 'Paladin', equipaggiamento: 'a longsword and a banner', regione: 'City of Vectors', fase: 'First years of university' },
  6: { nome: 'Winged Knight', equipaggiamento: 'a winged horse', regione: 'Imaginary Skies', fase: 'Advanced mathematics' },
};
const MACRO_EN: Record<string, { nome: string; descrizione: string }> = {
  numeri: { nome: 'Numbers and arithmetic', descrizione: 'Counting, operations, fractions, powers, divisibility.' },
  geometria: { nome: 'Geometry', descrizione: 'Shapes, measures, theorems, transformations.' },
  algebra: { nome: 'Algebra', descrizione: 'Letters instead of numbers: expressions, equations, systems.' },
  'funzioni-analisi': { nome: 'Functions and calculus', descrizione: 'Graphs, limits, derivatives, integrals.' },
  'probabilita-statistica': { nome: 'Probability and statistics', descrizione: 'Chance, data, predictions.' },
  'logica-insiemi': { nome: 'Logic and sets', descrizione: 'Reasoning with precision.' },
  'algebra-lineare': { nome: 'Linear algebra', descrizione: 'Vectors, matrices, transformations.' },
  'strutture-avanzate': { nome: 'Advanced structures', descrizione: 'Complex numbers, quaternions, groups, topology.' },
};
export const DISTRATTORI_EN: Record<SlugDistrattore, { nome: string; motto: string }> = {
  mercante: { nome: 'the Shortcut Merchant', motto: 'Handy rules. Shame they’re wrong.' },
  menestrello: { nome: 'the Minstrel of “I’m Just Not a Maths Person”', motto: 'Sings sad songs about your (alleged) inability.' },
  gnomo: { nome: 'the Copycat Gnome', motto: 'Offers you the ready-made answer. Free. Almost.' },
  barone: { nome: 'the Baron of Panic', motto: 'Makes every problem look like a dragon.' },
  sirena: { nome: 'the Siren of Later', motto: '“Oh, you can study it tomorrow…”' },
};
export const PERSONAGGI_EN: Record<keyof typeof PERSONAGGI, { nome: string; icona: string }> = {
  civetta: { nome: 'Ottavia the Owl', icona: '🦉' },
  fabbro: { nome: 'Brontolo the Blacksmith', icona: '🔨' },
  narratore: { nome: 'The Narrator', icona: '📜' },
};

/** Grado nella lingua richiesta (gli slug restano italiani: sono indirizzi). */
export const gradoL = (n: number, l: Lingua): Grado => (l === 'en' ? { ...grado(n), ...GRADI_EN[n] } : grado(n));
export const gradiL = (l: Lingua): Grado[] => GRADI.map((g) => gradoL(g.numero, l));
export const macroL = (slug: string, l: Lingua) => (l === 'en' ? { ...macro(slug), ...MACRO_EN[slug] } : macro(slug));
export const macroargomentiL = (l: Lingua) => MACROARGOMENTI.map((m) => macroL(m.slug, l));
export const distrattoriL = (l: Lingua) => (l === 'en' ? DISTRATTORI_EN : DISTRATTORI);
export const personaggiL = (l: Lingua) => (l === 'en' ? PERSONAGGI_EN : PERSONAGGI);
