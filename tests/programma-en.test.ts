import { describe, it, expect } from 'vitest';
import { titoliMancanti, PROGRAMMA_EN } from '../src/data/programma-en';
describe('programma in inglese', () => {
  it('ogni argomento ha il titolo inglese', () => expect(titoliMancanti()).toEqual([]));
  it('ogni anno ha classe e ciclo tradotti', () => {
    for (const a of PROGRAMMA_EN) { expect(a.classe).not.toMatch(/ª|elementare|media|superiore/); expect(a.ciclo).not.toMatch(/Scuola/); }
  });
});

import { tappeSenzaTraduzione } from '../src/data/timeline-en';
describe('linea del tempo in inglese', () => {
  it('ogni tappa ha il testo inglese', () => expect(tappeSenzaTraduzione()).toEqual([]));
});
