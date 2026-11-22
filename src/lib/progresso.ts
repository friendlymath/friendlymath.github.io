/**
 * Progressi dell'eroe: logica pura, nessun accesso diretto al DOM.
 * Tutto resta nel browser della persona; nessun dato personale.
 */

import { validaEroe, type Eroe } from './eroe';

export const CHIAVE = 'friendlymath:progresso';
export const VERSIONE = 1;
export const GRADO_MAX = 6;

export type Progresso = {
  /** slug delle lezioni/stanze completate (nel Libro o nel Cammino) */
  completate: string[];
  /** gradi i cui Guardiani sono stati battuti */
  guardiani: number[];
  badge: string[];
  aggiornato: string;
  /** il personaggio: viaggia nella Pergamena, ma vive in una chiave a parte del browser */
  eroe?: Eroe;
  /** stelle per lezione (1–3): miglior risultato al primo tentativo */
  stelle?: Record<string, number>;
};

/** `grado` qui è il numero della regione; il Guardiano è l'ultima stanza della regione. */
export type StanzaRif = { slug: string; grado: number; ordine: number; guardiano?: boolean };
export type StatoStanza = 'bloccata' | 'aperta' | 'conquistata';
export type EsitoImport = { ok: true; progresso: Progresso } | { ok: false; errore: string };

export function progressoVuoto(): Progresso {
  return { completate: [], guardiani: [], badge: [], aggiornato: '' };
}

const unici = <T,>(xs: T[]) => [...new Set(xs)];
const ora = () => new Date().toISOString();

function isStringhe(x: unknown): x is string[] {
  return Array.isArray(x) && x.every((v) => typeof v === 'string');
}
function isGradi(x: unknown): x is number[] {
  return Array.isArray(x) && x.every((v) => Number.isInteger(v) && v >= 1 && v <= GRADO_MAX);
}

/** Valida un oggetto qualunque; restituisce un errore leggibile o il progresso. */
function valida(o: unknown): EsitoImport {
  if (typeof o !== 'object' || o === null || Array.isArray(o)) {
    return { ok: false, errore: 'Il file non contiene una Pergamena.' };
  }
  const r = o as Record<string, unknown>;
  if (r.app !== 'friendlymath') return { ok: false, errore: 'Questo file non è una Pergamena di FriendlyMath.' };
  if (typeof r.versione !== 'number') return { ok: false, errore: 'La Pergamena non indica la sua versione.' };
  if (r.versione > VERSIONE) {
    return { ok: false, errore: 'La Pergamena viene da una versione più recente del sito: ricarica la pagina e riprova.' };
  }
  if (!isStringhe(r.completate) || !isGradi(r.guardiani) || !isStringhe(r.badge)) {
    return { ok: false, errore: 'La Pergamena è danneggiata: alcuni dati non sono leggibili.' };
  }
  return {
    ok: true,
    progresso: {
      completate: unici(r.completate),
      guardiani: unici(r.guardiani),
      badge: unici(r.badge),
      aggiornato: typeof r.aggiornato === 'string' ? r.aggiornato : '',
      ...(validaEroe(r.eroe) ? { eroe: validaEroe(r.eroe)! } : {}),
      ...(validaStelle(r.stelle) ? { stelle: validaStelle(r.stelle)! } : {}),
    },
  };
}

function validaStelle(x: unknown): Record<string, number> | null {
  if (typeof x !== 'object' || x === null || Array.isArray(x)) return null;
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(x)) if (typeof k === 'string' && Number.isInteger(v) && (v as number) >= 1 && (v as number) <= 3) out[k] = v as number;
  return out;
}

/** Registra le stelle di una lezione tenendo il risultato migliore. */
export function assegnaStelle(p: Progresso, slug: string, n: number): Progresso {
  const v = Math.max(1, Math.min(3, Math.round(n)));
  const prima = p.stelle?.[slug] ?? 0;
  if (v <= prima) return p;
  return { ...p, stelle: { ...(p.stelle ?? {}), [slug]: v }, aggiornato: ora() };
}

function storageDefault(): Storage | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null;
  }
}

export function carica(storage: Storage | null = storageDefault()): Progresso {
  if (!storage) return progressoVuoto();
  try {
    const testo = storage.getItem(CHIAVE);
    if (!testo) return progressoVuoto();
    const r = valida(JSON.parse(testo));
    return r.ok ? r.progresso : progressoVuoto();
  } catch {
    return progressoVuoto();
  }
}

export function salva(p: Progresso, storage: Storage | null = storageDefault()): boolean {
  if (!storage) return false;
  try {
    storage.setItem(CHIAVE, esportaPergamena(p));
    return true;
  } catch {
    return false;
  }
}

export function completa(p: Progresso, slug: string): Progresso {
  if (p.completate.includes(slug)) return p;
  return { ...p, completate: [...p.completate, slug], aggiornato: ora() };
}

export function battiGuardiano(p: Progresso, grado: number): Progresso {
  const badge = `grado-${grado}`;
  return {
    ...p,
    guardiani: unici([...p.guardiani, grado]),
    badge: unici([...p.badge, badge]),
    aggiornato: ora(),
  };
}

export function gradoAttuale(p: Progresso): number {
  const max = p.guardiani.length ? Math.max(...p.guardiani) : 0;
  return Math.min(GRADO_MAX, Math.max(1, max + 1));
}

/** La regione 1 è sempre aperta; la N si apre battendo il Guardiano N-1 o uno successivo. */
export function regioneAperta(p: Progresso, grado: number): boolean {
  if (grado <= 1) return true;
  return p.guardiani.some((g) => g >= grado - 1);
}

export function statoStanza(p: Progresso, stanze: StanzaRif[], slug: string): StatoStanza {
  const s = stanze.find((x) => x.slug === slug);
  if (!s) return 'bloccata';
  if (p.completate.includes(slug) && (s.guardiano || regioneAperta(p, s.grado))) return 'conquistata';
  // Il Guardiano si può sempre sfidare: è la prova d'ingresso per chi è già avanti.
  if (s.guardiano) return 'aperta';
  if (!regioneAperta(p, s.grado)) return 'bloccata';
  const precedenti = stanze.filter((x) => x.grado === s.grado && x.ordine < s.ordine);
  const prec = precedenti.sort((a, b) => b.ordine - a.ordine)[0];
  if (!prec || p.completate.includes(prec.slug)) return 'aperta';
  return 'bloccata';
}

/** Solo i campi previsti: nessun altro dato (per esempio il profilo di studio) può finire nel file. */
export function esportaPergamena(p: Progresso): string {
  const { completate, guardiani, badge, stelle, eroe } = p;
  return JSON.stringify({
    app: 'friendlymath', versione: VERSIONE, completate, guardiani, badge,
    ...(stelle && Object.keys(stelle).length ? { stelle } : {}),
    ...(eroe ? { eroe } : {}),
    aggiornato: p.aggiornato || ora(),
  }, null, 2);
}

export function importaPergamena(testo: string): EsitoImport {
  let o: unknown;
  try {
    o = JSON.parse(testo);
  } catch {
    return { ok: false, errore: 'Il file non è leggibile: assicurati di aver scelto la tua Pergamena (.json).' };
  }
  return valida(o);
}

export function unisci(a: Progresso, b: Progresso): Progresso {
  const eroe = b.eroe ?? a.eroe;
  const stelle: Record<string, number> = { ...(a.stelle ?? {}) };
  for (const [k, v] of Object.entries(b.stelle ?? {})) stelle[k] = Math.max(stelle[k] ?? 0, v);
  return {
    ...(eroe ? { eroe } : {}),
    ...(Object.keys(stelle).length ? { stelle } : {}),
    completate: unici([...a.completate, ...b.completate]),
    guardiani: unici([...a.guardiani, ...b.guardiani]),
    badge: unici([...a.badge, ...b.badge]),
    aggiornato: ora(),
  };
}
