import { describe, it, expect } from 'vitest';
import { linguaDa, percorsoBase, href, altraLingua, traduttore } from '../src/lib/lingua';

describe('lingua', () => {
  it('riconosce la lingua dal percorso', () => {
    expect(linguaDa('/en/')).toBe('en');
    expect(linguaDa('/en')).toBe('en');
    expect(linguaDa('/enigmi/')).toBe('it');
    expect(linguaDa('/libro/')).toBe('it');
  });
  it('toglie il prefisso', () => {
    expect(percorsoBase('/en/privacy/')).toBe('/privacy/');
    expect(percorsoBase('/en/')).toBe('/');
    expect(percorsoBase('/libro')).toBe('/libro/');
  });
  it('i link inglesi puntano a /en solo per le pagine tradotte', () => {
    expect(href('en', '/privacy/')).toBe('/en/privacy/');
    expect(href('en', '/')).toBe('/en/');
    expect(href('en', '/libro/')).toBe('/libro/');
    expect(href('it', '/privacy/')).toBe('/privacy/');
    expect(href('en', '/studio/#x')).toBe('/en/studio/#x');
  });
  it('trova la pagina corrispondente', () => {
    expect(altraLingua(new URL('https://x.it/privacy/'))).toBe('/en/privacy/');
    expect(altraLingua(new URL('https://x.it/libro/'))).toBe('/en/');
    expect(altraLingua(new URL('https://x.it/en/studio/'))).toBe('/studio/');
  });
  it('traduce', () => {
    expect(traduttore('en')('ciao', 'hello')).toBe('hello');
    expect(traduttore('it')('ciao', 'hello')).toBe('ciao');
  });
});
