import { describe, it, expect } from 'vitest';
import { schemaLezione, schemaCuriosita, schemaStoria, schemaEsperimento } from '../src/lib/schemi';

const fonte = { titolo: 'MacTutor', url: 'https://mathshistory.st-andrews.ac.uk/', editore: 'University of St Andrews', consultato: '2026-11-22' };
const lezione = { titolo: 'X', descrizione: 'Y', macroargomento: 'numeri', sottoargomento: 'Z', grado: 1 };

describe('schemi', () => {
  it('lezione minima valida', () => {
    expect(schemaLezione.safeParse(lezione).success).toBe(true);
  });
  it('grado 7 non valido', () => {
    expect(schemaLezione.safeParse({ ...lezione, grado: 7 }).success).toBe(false);
  });
  it('macroargomento sconosciuto non valido', () => {
    expect(schemaLezione.safeParse({ ...lezione, macroargomento: 'astrologia' }).success).toBe(false);
  });
  it('stanza senza regione non valida', () => {
    expect(schemaLezione.safeParse({ ...lezione, stanza: 1 }).success).toBe(false);
  });
  it.each([
    ['curiosità', schemaCuriosita],
    ['storia', schemaStoria],
    ['esperimento', schemaEsperimento],
  ])('%s senza fonti non valida, con fonti valida', (_n, s) => {
    const base = { titolo: 'T', descrizione: 'D' };
    expect(s.safeParse({ ...base, fonti: [] }).success).toBe(false);
    expect(s.safeParse(base).success).toBe(false);
    expect(s.safeParse({ ...base, fonti: [fonte] }).success).toBe(true);
  });
  it('fonte con URL non valido', () => {
    expect(schemaCuriosita.safeParse({ titolo: 'T', descrizione: 'D', fonti: [{ ...fonte, url: 'boh' }] }).success).toBe(false);
  });
});
