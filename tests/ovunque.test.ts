import { describe, it, expect } from 'vitest';
import { luhnValido, luhnPassaggi, percorsoMinimo, mcm, mcd, type Grafo } from '../src/lib/ovunque';

describe('Luhn', () => {
  it('riconosce il numero di esempio valido', () => {
    expect(luhnValido('79927398713')).toBe(true);
  });
  it('scopre un errore di una cifra o uno scambio di cifre vicine', () => {
    expect(luhnValido('79927398710')).toBe(false);
    expect(luhnValido('79927398731')).toBe(false);
  });
  it('rifiuta lettere e input vuoti', () => {
    expect(luhnValido('')).toBe(false);
    expect(luhnValido('abc')).toBe(false);
  });
  it('i passaggi sommano a un multiplo di 10 quando valido', () => {
    expect(luhnPassaggi('79927398713').reduce((s, p) => s + p.vale, 0) % 10).toBe(0);
  });
});

describe('Dijkstra', () => {
  const g: Grafo = { A: { B: 4, C: 2 }, B: { A: 4, D: 5 }, C: { A: 2, B: 1, D: 8 }, D: { B: 5, C: 8 }, E: {} };
  it('trova il percorso più breve, anche se ha più fermate', () => {
    expect(percorsoMinimo(g, 'A', 'D')).toEqual({ percorso: ['A', 'C', 'B', 'D'], minuti: 8 });
  });
  it('nodo irraggiungibile o sconosciuto → null', () => {
    expect(percorsoMinimo(g, 'A', 'E')).toBeNull();
    expect(percorsoMinimo(g, 'A', 'Z')).toBeNull();
  });
  it('stessa fermata → 0 minuti', () => {
    expect(percorsoMinimo(g, 'B', 'B')).toEqual({ percorso: ['B'], minuti: 0 });
  });
});

describe('mcm e mcd', () => {
  it('autobus ogni 12 e 18 minuti si incontrano ogni 36', () => {
    expect(mcm(12, 18)).toBe(36);
    expect(mcd(12, 18)).toBe(6);
  });
});
