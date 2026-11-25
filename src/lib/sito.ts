import type { Lingua } from './lingua';

/** Struttura del sito e data dell'ultimo aggiornamento (calcolata a ogni pubblicazione). */
export const SEZIONI = [
  { gruppo: 'Studiare', icona: '📖', voci: [
    { href: '/libro/', testo: 'Il Libro', nota: 'tutti gli argomenti, per anno o per tema' },
    { href: '/palestra/', testo: 'La Palestra', nota: 'formule spiegate ed esercizi stampabili' },
    { href: '/mappe/', testo: 'Mappe mentali', nota: 'gli argomenti in un colpo d’occhio' },
  ] },
  { gruppo: 'Giocare', icona: '🗺️', voci: [
    { href: '/cammino/', testo: 'Il Cammino', nota: 'la mappa di Numeria da esplorare' },
    { href: '/eroe/', testo: 'Crea il tuo eroe', nota: 'corpo, classe, aspetto, caratteristiche' },
    { href: '/zaino/', testo: 'Zaino dell’eroe', nota: 'progressi, badge e Pergamena' },
  ] },
  { gruppo: 'Scoprire', icona: '✨', voci: [
    { href: '/curiosita/', testo: 'Curiosità', nota: 'fatti sorprendenti con le fonti' },
    { href: '/storia/', testo: 'Storia', nota: 'le persone dietro le idee' },
    { href: '/esperimenti/', testo: 'Esperimenti', nota: 'simulazioni da provare' },
  ] },
  { gruppo: 'Aiuto', icona: '🧭', voci: [
    { href: '/studio/', testo: 'Il tuo modo di studiare', nota: 'lettura facilitata, strumenti, focus: adatta il sito a te' },
    { href: '/guida/', testo: 'Guida del sito', nota: 'come funziona tutto' },
    { href: '/faq/', testo: 'Domande frequenti', nota: 'privacy, salvataggi, gradi' },
    { href: '/fonti/', testo: 'Fonti e crediti', nota: 'tutte le fonti citate' },
    { href: '/privacy/', testo: 'Privacy', nota: 'i tuoi dati restano sul tuo dispositivo' },
    { href: '/mappa-del-sito/', testo: 'Mappa del sito completa', nota: 'ogni pagina, in un elenco' },
  ] },
];

const ora = new Date();
export const AGGIORNATO_ISO = ora.toISOString();
export const AGGIORNATO = ora.toLocaleString('it-IT', { timeZone: 'Europe/Rome', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
export const AGGIORNATO_GIORNO = ora.toLocaleDateString('it-IT', { timeZone: 'Europe/Rome', day: 'numeric', month: 'long', year: 'numeric' });

export const AGGIORNATO_EN = ora.toLocaleString('en-GB', { timeZone: 'Europe/Rome', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
export const AGGIORNATO_GIORNO_EN = ora.toLocaleDateString('en-GB', { timeZone: 'Europe/Rome', day: 'numeric', month: 'long', year: 'numeric' });
export const aggiornatoL = (l: Lingua) => (l === 'en' ? AGGIORNATO_EN : AGGIORNATO);
export const aggiornatoGiornoL = (l: Lingua) => (l === 'en' ? AGGIORNATO_GIORNO_EN : AGGIORNATO_GIORNO);

const SEZIONI_EN: typeof SEZIONI = [
  { gruppo: 'Study', icona: '📖', voci: [
    { href: '/libro/', testo: 'The Book', nota: 'every topic, by school year or by theme' },
    { href: '/palestra/', testo: 'The Training Ground', nota: 'formulas explained, printable exercises' },
    { href: '/mappe/', testo: 'Mind maps', nota: 'topics at a glance' },
  ] },
  { gruppo: 'Play', icona: '🗺️', voci: [
    { href: '/cammino/', testo: 'The Quest', nota: 'explore the map of Numeria' },
    { href: '/eroe/', testo: 'Create your hero', nota: 'lineage, class, looks, abilities' },
    { href: '/zaino/', testo: 'Hero’s backpack', nota: 'progress, badges and Scroll' },
  ] },
  { gruppo: 'Discover', icona: '✨', voci: [
    { href: '/curiosita/', testo: 'Curiosities', nota: 'surprising facts, with sources' },
    { href: '/storia/', testo: 'History', nota: 'the people behind the ideas' },
    { href: '/esperimenti/', testo: 'Experiments', nota: 'simulations to try' },
  ] },
  { gruppo: 'Help', icona: '🧭', voci: [
    { href: '/studio/', testo: 'Your way of learning', nota: 'easier reading, tools, focus: adapt the site to you' },
    { href: '/guida/', testo: 'Site guide', nota: 'how everything works' },
    { href: '/faq/', testo: 'FAQ', nota: 'privacy, saving, grades' },
    { href: '/fonti/', testo: 'Sources and credits', nota: 'every source we cite' },
    { href: '/privacy/', testo: 'Privacy', nota: 'your data stays on your device' },
    { href: '/mappa-del-sito/', testo: 'Full site map', nota: 'every page, in one list' },
  ] },
];
export const sezioniL = (l: Lingua) => (l === 'en' ? SEZIONI_EN : SEZIONI);
