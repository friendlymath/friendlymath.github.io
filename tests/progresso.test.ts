import { describe, it, expect } from 'vitest';
import {
  progressoVuoto, carica, salva, completa, battiGuardiano, gradoAttuale,
  regioneAperta, statoStanza, esportaPergamena, importaPergamena, unisci,
  CHIAVE, assegnaStelle, type Progresso,
} from '../src/lib/progresso';

function finto(iniziale: Record<string, string> = {}): Storage {
  const m = new Map(Object.entries(iniziale));
  return {
    get length() { return m.size; },
    clear: () => m.clear(),
    getItem: (k) => (m.has(k) ? m.get(k)! : null),
    key: (i) => [...m.keys()][i] ?? null,
    removeItem: (k) => { m.delete(k); },
    setItem: (k, v) => { m.set(k, String(v)); },
  };
}

const stanze = [
  { slug: 'a1', grado: 1, ordine: 1 },
  { slug: 'a2', grado: 1, ordine: 2 },
  { slug: 'b1', grado: 2, ordine: 1 },
  { slug: 'b2', grado: 2, ordine: 2 },
  { slug: 'bG', grado: 2, ordine: 3, guardiano: true },
];

describe('carica / salva', () => {
  it('senza storage restituisce progresso vuoto', () => {
    expect(carica(null)).toEqual(progressoVuoto());
  });
  it('con JSON corrotto restituisce progresso vuoto', () => {
    expect(carica(finto({ [CHIAVE]: '{rotto' })).completate).toEqual([]);
  });
  it('storage che lancia eccezioni non rompe nulla', () => {
    const cattivo = { getItem() { throw new Error('bloccato'); }, setItem() { throw new Error('bloccato'); } } as unknown as Storage;
    expect(carica(cattivo).completate).toEqual([]);
    expect(salva(progressoVuoto(), cattivo)).toBe(false);
  });
  it('round-trip', () => {
    const s = finto();
    const p = completa(progressoVuoto(), 'a1');
    expect(salva(p, s)).toBe(true);
    expect(carica(s).completate).toEqual(['a1']);
  });
});

describe('avanzamento', () => {
  it('completa è idempotente', () => {
    const p = completa(completa(progressoVuoto(), 'a1'), 'a1');
    expect(p.completate).toEqual(['a1']);
  });
  it('battiGuardiano aggiunge grado e badge', () => {
    const p = battiGuardiano(progressoVuoto(), 1);
    expect(p.guardiani).toEqual([1]);
    expect(p.badge).toContain('grado-1');
  });
  it('gradoAttuale parte da 1 e sale col guardiano più alto', () => {
    expect(gradoAttuale(progressoVuoto())).toBe(1);
    expect(gradoAttuale(battiGuardiano(progressoVuoto(), 3))).toBe(4);
    expect(gradoAttuale(battiGuardiano(progressoVuoto(), 6))).toBe(6);
  });
  it('regioneAperta: la 1 sempre, le altre dopo il guardiano precedente', () => {
    const p = progressoVuoto();
    expect(regioneAperta(p, 1)).toBe(true);
    expect(regioneAperta(p, 2)).toBe(false);
    expect(regioneAperta(battiGuardiano(p, 1), 2)).toBe(true);
  });
  it('partenza avanzata: battuto il guardiano 2, la regione 3 è aperta e la 1 resta rigiocabile', () => {
    const p = battiGuardiano(progressoVuoto(), 2);
    expect(regioneAperta(p, 3)).toBe(true);
    expect(regioneAperta(p, 1)).toBe(true);
  });
});

describe('statoStanza', () => {
  it('prima stanza della regione 1 aperta, la seconda bloccata', () => {
    const p = progressoVuoto();
    expect(statoStanza(p, stanze, 'a1')).toBe('aperta');
    expect(statoStanza(p, stanze, 'a2')).toBe('bloccata');
  });
  it('conquistata la precedente si apre la successiva', () => {
    const p = completa(progressoVuoto(), 'a1');
    expect(statoStanza(p, stanze, 'a1')).toBe('conquistata');
    expect(statoStanza(p, stanze, 'a2')).toBe('aperta');
  });
  it('regione chiusa → bloccata anche se completata nel Libro', () => {
    const p = completa(progressoVuoto(), 'b1');
    expect(statoStanza(p, stanze, 'b1')).toBe('bloccata');
  });
  it('lezione completata nel Libro risulta conquistata quando la regione è aperta', () => {
    const p = completa(battiGuardiano(progressoVuoto(), 1), 'b1');
    expect(statoStanza(p, stanze, 'b1')).toBe('conquistata');
    expect(statoStanza(p, stanze, 'b2')).toBe('aperta');
  });
  it('il Guardiano è sempre sfidabile (prova d’ingresso), anche a regione chiusa', () => {
    expect(statoStanza(progressoVuoto(), stanze, 'bG')).toBe('aperta');
    expect(statoStanza(completa(progressoVuoto(), 'bG'), stanze, 'bG')).toBe('conquistata');
  });
  it('slug sconosciuto → bloccata', () => {
    expect(statoStanza(progressoVuoto(), stanze, 'zzz')).toBe('bloccata');
  });
});

describe('stelle', () => {
  it('tiene il risultato migliore e resta tra 1 e 3', () => {
    let p = assegnaStelle(progressoVuoto(), 'a1', 2);
    p = assegnaStelle(p, 'a1', 1);
    expect(p.stelle).toEqual({ a1: 2 });
    p = assegnaStelle(p, 'a1', 7);
    expect(p.stelle).toEqual({ a1: 3 });
  });
  it('viaggiano nella Pergamena e si uniscono prendendo il massimo', () => {
    const a = assegnaStelle(progressoVuoto(), 'a1', 1);
    const r = importaPergamena(esportaPergamena(a));
    expect(r.ok && r.progresso.stelle).toEqual({ a1: 1 });
    const u = unisci(a, assegnaStelle(progressoVuoto(), 'a1', 3));
    expect(u.stelle).toEqual({ a1: 3 });
  });
});

describe('Pergamena', () => {
  it('round-trip export/import', () => {
    const p = battiGuardiano(completa(progressoVuoto(), 'a1'), 1);
    const r = importaPergamena(esportaPergamena(p));
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.progresso.completate).toEqual(['a1']);
      expect(r.progresso.guardiani).toEqual([1]);
    }
  });
  it.each([
    ['testo non JSON', 'ciao'],
    ['JSON di altra app', JSON.stringify({ app: 'altro', versione: 1, completate: [], guardiani: [], badge: [] })],
    ['versione futura', JSON.stringify({ app: 'friendlymath', versione: 2, completate: [], guardiani: [], badge: [] })],
    ['tipi sbagliati', JSON.stringify({ app: 'friendlymath', versione: 1, completate: 'a1', guardiani: [], badge: [] })],
    ['grado fuori range', JSON.stringify({ app: 'friendlymath', versione: 1, completate: [], guardiani: [9], badge: [] })],
    ['array', '[]'],
  ])('rifiuta %s', (_n, testo) => {
    const r = importaPergamena(testo);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errore.length).toBeGreaterThan(0);
  });
  it('unisci fa l’unione degli insiemi', () => {
    const a: Progresso = { ...progressoVuoto(), completate: ['a1'], guardiani: [1], badge: ['grado-1'] };
    const b: Progresso = { ...progressoVuoto(), completate: ['a1', 'b1'], guardiani: [2], badge: ['grado-2'] };
    const u = unisci(a, b);
    expect(u.completate.sort()).toEqual(['a1', 'b1']);
    expect(u.guardiani.sort()).toEqual([1, 2]);
    expect(gradoAttuale(u)).toBe(3);
  });
});
