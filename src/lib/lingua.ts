/**
 * Due lingue: italiano (radice del sito) e inglese (sotto /en/).
 * Ogni pagina ha un solo file di impaginazione con i testi delle due lingue affiancati: t('italiano', 'English').
 */
export type Lingua = 'it' | 'en';

/** Tutte le pagine hanno la versione inglese (un test controlla che ogni pagina italiana abbia la sua gemella). */
const ESCLUSE = new Set<string>(['/404/']);
const tradotta = (p: string) => !ESCLUSE.has(p);

const normalizza = (p: string) => (p.endsWith('/') ? p : `${p}/`);

export function linguaDa(url: URL | string): Lingua {
  const p = typeof url === 'string' ? url : url.pathname;
  return p === '/en' || p.startsWith('/en/') ? 'en' : 'it';
}

/** Il percorso senza il prefisso di lingua. */
export function percorsoBase(url: URL | string): string {
  const p = normalizza(typeof url === 'string' ? url : url.pathname);
  return p.startsWith('/en/') ? p.slice(3) || '/' : p;
}

/** Link interno nella lingua giusta: in inglese aggiunge /en solo se quella pagina è tradotta. */
export function href(l: Lingua, p: string): string {
  if (l === 'it') return p;
  const [base, ancora] = p.split('#');
  if (!tradotta(normalizza(base))) return p;
  return `/en${base === '/' ? '/' : normalizza(base)}${ancora ? `#${ancora}` : ''}`;
}

/** La stessa pagina nell'altra lingua (se tradotta), altrimenti la home dell'altra lingua. */
export function altraLingua(url: URL): string {
  const base = percorsoBase(url);
  if (linguaDa(url) === 'en') return base;
  return tradotta(base) ? `/en${base}` : '/en/';
}

export const esisteInInglese = (url: URL) => tradotta(percorsoBase(url));

/** Restituisce la funzione di traduzione per la lingua data. */
export const traduttore = (l: Lingua) => (it: string, en: string) => (l === 'en' ? en : it);

/** Lato browser: la lingua della pagina corrente. */
export const linguaPagina = (): Lingua => (typeof document !== 'undefined' && document.documentElement.lang === 'en' ? 'en' : 'it');
