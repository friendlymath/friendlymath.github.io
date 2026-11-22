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
    { href: '/guida/', testo: 'Guida del sito', nota: 'come funziona tutto' },
    { href: '/faq/', testo: 'Domande frequenti', nota: 'privacy, salvataggi, gradi' },
    { href: '/fonti/', testo: 'Fonti e crediti', nota: 'tutte le fonti citate' },
    { href: '/mappa-del-sito/', testo: 'Mappa del sito completa', nota: 'ogni pagina, in un elenco' },
  ] },
];

const ora = new Date();
export const AGGIORNATO_ISO = ora.toISOString();
export const AGGIORNATO = ora.toLocaleString('it-IT', { timeZone: 'Europe/Rome', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
export const AGGIORNATO_GIORNO = ora.toLocaleDateString('it-IT', { timeZone: 'Europe/Rome', day: 'numeric', month: 'long', year: 'numeric' });
