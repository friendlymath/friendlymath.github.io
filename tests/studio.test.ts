import { describe, it, expect } from 'vitest';
import { studioVuoto, cambiaProfilo, cambiaRegolazione, validaStudio, caricaStudio, salvaStudio } from '../src/lib/studio';
import { esportaPergamena, progressoVuoto } from '../src/lib/progresso';

function finto(): Storage {
  const m = new Map<string, string>();
  return { get length() { return m.size; }, clear: () => m.clear(), getItem: (k) => m.get(k) ?? null, key: () => null, removeItem: (k) => { m.delete(k); }, setItem: (k, v) => { m.set(k, String(v)); } };
}

describe('profilo di studio', () => {
  it('attivare un profilo accende le sue regolazioni', () => {
    const s = cambiaProfilo(studioVuoto(), 'dislessia', true);
    expect(s.profili).toEqual(['dislessia']);
    expect(s.regolazioni).toEqual(expect.arrayContaining(['leggibile', 'leggimi', 'righello']));
  });
  it('spegnere un profilo non toglie le regolazioni richieste da un altro profilo attivo', () => {
    let s = cambiaProfilo(studioVuoto(), 'dislessia', true);
    s = cambiaProfilo(s, 'disgrafia', true); // anche disgrafia usa «leggibile»
    s = cambiaProfilo(s, 'dislessia', false);
    expect(s.regolazioni).toContain('leggibile');
    expect(s.regolazioni).not.toContain('righello');
  });
  it('le regolazioni si cambiano una per una', () => {
    let s = cambiaProfilo(studioVuoto(), 'adhd', true);
    s = cambiaRegolazione(s, 'calmo', false);
    expect(s.regolazioni).not.toContain('calmo');
    expect(s.profili).toEqual(['adhd']);
  });
  it('valida e ripulisce dati strani', () => {
    expect(validaStudio(null)).toEqual(studioVuoto());
    expect(validaStudio({ profili: ['dislessia', 'boh'], regolazioni: ['focus', 42] })).toEqual({ profili: ['dislessia'], regolazioni: ['focus'] });
  });
  it('salva e ricarica', () => {
    const st = finto();
    const s = cambiaProfilo(studioVuoto(), 'autismo', true);
    expect(salvaStudio(s, st)).toBe(true);
    expect(caricaStudio(st)).toEqual(s);
  });
  it('il profilo di studio NON finisce mai nella Pergamena', () => {
    const p = { ...progressoVuoto(), studio: cambiaProfilo(studioVuoto(), 'dislessia', true) } as any;
    const testo = esportaPergamena(p);
    expect(testo).not.toContain('dislessia');
    expect(testo).not.toContain('studio');
  });
});
