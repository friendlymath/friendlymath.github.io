/** Le tre raccolte di approfondimento: testi e stile nelle due lingue. */
import type { Lingua } from './lingua';
export type Raccolta = 'curiosita' | 'storia' | 'esperimenti';
type Testi = { titolo: string; h1: string; descrizione: string; intro: string; nome: string };
export const RACCOLTE: Record<Raccolta, { icona: string; colore: string; it: Testi; en: Testi }> = {
  curiosita: { icona: '✨', colore: 'var(--magia)',
    it: { titolo: 'Curiosità', h1: 'Curiosità', nome: 'Curiosità', descrizione: 'Fatti sorprendenti, paradossi e storie strane della matematica. Ognuno con le sue fonti: niente leggende metropolitane.', intro: 'Fatti sorprendenti, paradossi e storie strane della matematica. Ognuno con le sue fonti: niente leggende metropolitane.' },
    en: { titolo: 'Curiosities', h1: 'Curiosities', nome: 'Curiosities', descrizione: 'Surprising facts, paradoxes and strange stories from mathematics. Each with its sources: no urban legends.', intro: 'Surprising facts, paradoxes and strange stories from mathematics. Each with its sources: no urban legends.' } },
  storia: { icona: '🏛️', colore: 'var(--storia-bd)',
    it: { titolo: 'Storia della matematica', h1: 'Storia della matematica', nome: 'Storia della matematica', descrizione: 'Le persone dietro le idee: chi ha inventato cosa, perché, e cosa stava succedendo intorno.', intro: 'Qui trovi le schede di approfondimento e, più sotto, la <a href="#titolo-linea">linea del tempo</a> dalle origini a oggi. Le persone dietro le idee: chi ha inventato cosa, perché, e cosa stava succedendo intorno.' },
    en: { titolo: 'History of mathematics', h1: 'History of mathematics', nome: 'History of mathematics', descrizione: 'The people behind the ideas: who invented what, why, and what was going on around them.', intro: 'Here you’ll find in-depth pages and, further down, the <a href="#titolo-linea">timeline</a> from the beginnings to today. The people behind the ideas: who invented what, why, and what was going on around them.' } },
  esperimenti: { icona: '🧪', colore: 'var(--gioco)',
    it: { titolo: 'Esperimenti', h1: 'Esperimenti', nome: 'Esperimenti', descrizione: 'Simulazioni e animazioni da provare con le tue mani: la matematica si vede, si tocca, si misura.', intro: 'Simulazioni e animazioni da provare con le tue mani: la matematica si vede, si tocca, si misura.' },
    en: { titolo: 'Experiments', h1: 'Experiments', nome: 'Experiments', descrizione: 'Simulations and animations to try with your own hands: maths you can see, touch and measure.', intro: 'Simulations and animations to try with your own hands: maths you can see, touch and measure.' } },
};
export const testiRaccolta = (r: Raccolta, l: Lingua) => RACCOLTE[r][l];
