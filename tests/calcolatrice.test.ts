import { describe, it, expect } from 'vitest';
import { calcola } from '../src/lib/calcolatrice';

describe('calcolatrice', () => {
  it.each([
    ['2+3×4', 14], ['(2+3)×4', 20], ['10:4', 2.5], ['2^3^2', 512], ['-3^2', -9], ['(-3)^2', 9],
    ['3,5 + 1,5', 5], ['0,1+0,2', 0.3], ['7 − 10', -3], ['100 ÷ 8', 12.5], ['3.14*10*10', 314],
  ])('%s = %d', (e, r) => expect(calcola(e)).toBe(r));
  it.each(['', 'ciao', '2+', '(2+3', '2/0', 'alert(1)', '2++', '1e5'])('rifiuta «%s»', (e) => expect(calcola(e)).toBeNull());
});
