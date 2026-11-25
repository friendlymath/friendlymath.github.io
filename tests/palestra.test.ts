import { describe, it, expect } from 'vitest';
import { FORMULE, serie, corretta, creaRng, formula } from '../src/lib/palestra';

describe('palestra', () => {
  it('stesso seme, stessi esercizi', () => {
    for (const f of FORMULE) expect(serie(f, 42)).toEqual(serie(f, 42));
  });
  it('semi diversi producono esercizi diversi (almeno in parte)', () => {
    for (const f of FORMULE) expect(serie(f, 1).map((e) => e.testo)).not.toEqual(serie(f, 999).map((e) => e.testo));
  });
  it('ogni esercizio ha risposta finita e passaggi', () => {
    for (const f of FORMULE) for (let s = 1; s < 60; s++) for (const e of serie(f, s, 3)) {
      expect(Number.isFinite(e.risposta), `${f.slug} ${e.testo}`).toBe(true);
      expect(e.passaggi.length).toBeGreaterThan(1);
    }
  });
  it('equazioni di primo grado: la soluzione verifica l’equazione', () => {
    const f = formula('equazione-primo-grado')!;
    for (let s = 1; s < 200; s++) {
      const e = f.genera(creaRng(s));
      const m = e.testo.match(/(\d+)x ([+−]) (\d+) = (-?\d+)/)!;
      const a = +m[1], b = (m[2] === '−' ? -1 : 1) * +m[3], c = +m[4];
      expect(a * e.risposta + b).toBe(c);
    }
  });
  it('secondo grado: la soluzione annulla il polinomio', () => {
    const f = formula('formula-risolutiva')!;
    for (let s = 1; s < 200; s++) {
      const e = f.genera(creaRng(s));
      const m = e.testo.match(/x²(?: ([+−]) (\d+)x)? ([+−]) (\d+) = 0/)!;
      const b = m[2] ? (m[1] === '−' ? -1 : 1) * +m[2] : 0;
      const c = (m[3] === '−' ? -1 : 1) * +m[4];
      const x = e.risposta;
      expect(x * x + b * x + c).toBe(0);
    }
  });
  it('pitagora: terne coerenti', () => {
    const f = formula('pitagora')!;
    for (let s = 1; s < 100; s++) {
      const e = f.genera(creaRng(s));
      const nums = e.testo.match(/\d+/g)!.map(Number);
      if (e.testo.startsWith('I cateti')) expect(nums[0] ** 2 + nums[1] ** 2).toBe(e.risposta ** 2);
      else expect(nums[0] ** 2 - nums[1] ** 2).toBe(e.risposta ** 2);
    }
  });
  it('una serie evita i doppioni', () => {
    for (const f of FORMULE) for (let s = 1; s < 30; s++) {
      const t = serie(f, s).map((e) => e.testo);
      expect(new Set(t).size, f.slug).toBe(t.length);
    }
  });
  it('corretta accetta la virgola e rifiuta testo', () => {
    const e = { testo: '', risposta: 0.25, tolleranza: 0.001, passaggi: [] };
    expect(corretta(e, '0,25')).toBe(true);
    expect(corretta(e, ' 0.25 ')).toBe(true);
    expect(corretta(e, 'boh')).toBe(false);
    expect(corretta(e, '0,3')).toBe(false);
  });
});

import { formulaL, FORMULE as TUTTE, serie as serieL } from '../src/lib/palestra';
describe('palestra in inglese', () => {
  it('ogni formula ha i testi inglesi per tutti i membri con nome', () => {
    for (const f of TUTTE) expect(f.en.membri.length).toBe(f.membri.filter((m) => m.nome).length);
  });
  it('stessa serie, stessi numeri nelle due lingue', () => {
    for (const f of TUTTE) {
      const it_ = serieL(f, 77, 6, 'it'), en = serieL(f, 77, 6, 'en');
      expect(en.map((e) => e.risposta)).toEqual(it_.map((e) => e.risposta));
      expect(en[0].testo).not.toBe(it_[0].testo);
    }
  });
  it('dopo una serie inglese, quella italiana resta italiana', () => {
    serieL(TUTTE[0], 3, 2, 'en');
    expect(serieL(TUTTE[0], 3, 1)[0].testo).toMatch(/stanza/);
    expect(formulaL(TUTTE[0], 'en').titolo).toBe('Area of a rectangle');
  });
});
