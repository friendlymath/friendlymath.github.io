import { describe, it, expect } from 'vitest';
import { eroePredefinito, cambiaCar, puntiRimasti, validaEroe, eroeCasuale, avatarSvg, nomeClasse, PUNTI_BASE, CAR_MAX } from '../src/lib/eroe';
import { esportaPergamena, importaPergamena, progressoVuoto } from '../src/lib/progresso';

describe('eroe', () => {
  it('il predefinito ha i punti tutti distribuiti', () => {
    expect(puntiRimasti(eroePredefinito())).toBe(0);
  });
  it('non si superano i punti né i limiti', () => {
    let e = eroePredefinito();
    expect(cambiaCar(e, 'logica', 1)).toBe(e); // nessun punto libero
    e = cambiaCar(e, 'pazienza', -1);
    expect(puntiRimasti(e)).toBe(1);
    e = cambiaCar(e, 'logica', 1);
    expect(e.car.logica).toBe(4);
    let x = { ...eroePredefinito(), car: { logica: PUNTI_BASE, intuizione: PUNTI_BASE, pazienza: PUNTI_BASE, curiosita: PUNTI_BASE } };
    expect(cambiaCar(x, 'logica', -1)).toBe(x);
    for (let i = 0; i < 10; i++) x = cambiaCar(x, 'logica', 1);
    expect(x.car.logica).toBe(CAR_MAX);
  });
  it('validaEroe rifiuta spazzatura e ripulisce il nome', () => {
    expect(validaEroe(null)).toBeNull();
    expect(validaEroe({ corpo: 'alieno', classe: 'mago' })).toBeNull();
    const e = validaEroe({ ...eroePredefinito(), nome: '<script>Ada</script> Lovelace ma molto molto lungo', pelle: 99 })!;
    expect(e.nome).not.toContain('<');
    expect(e.nome.length).toBeLessThanOrEqual(24);
    expect(e.pelle).toBe(0);
  });
  it('validaEroe riporta al predefinito caratteristiche truccate', () => {
    const e = validaEroe({ ...eroePredefinito(), car: { logica: 6, intuizione: 6, pazienza: 6, curiosita: 6 } })!;
    expect(puntiRimasti(e)).toBeGreaterThanOrEqual(0);
  });
  it('eroeCasuale è sempre valido', () => {
    for (let i = 0; i < 50; i++) {
      const e = eroeCasuale();
      expect(validaEroe(e)).toEqual(e);
      expect(puntiRimasti(e)).toBe(0);
    }
  });
  it('nomi di classe secondo il corpo', () => {
    expect(nomeClasse({ ...eroePredefinito(), corpo: 'femminile', classe: 'mago' })).toBe('Maga delle Formule');
    expect(nomeClasse({ ...eroePredefinito(), corpo: 'maschile', classe: 'mago' })).toBe('Mago delle Formule');
  });
  it('avatar è un svg', () => {
    expect(avatarSvg(eroePredefinito(), 4)).toMatch(/^<svg[\s\S]*<\/svg>$/);
  });
  it('la Pergamena trasporta l’eroe e ignora un eroe rovinato', () => {
    const p = { ...progressoVuoto(), eroe: { ...eroePredefinito(), nome: 'Ada' } };
    const r = importaPergamena(esportaPergamena(p));
    expect(r.ok && r.progresso.eroe?.nome).toBe('Ada');
    const rotta = JSON.parse(esportaPergamena(progressoVuoto()));
    rotta.eroe = { corpo: 'boh' };
    const r2 = importaPergamena(JSON.stringify(rotta));
    expect(r2.ok).toBe(true);
    expect(r2.ok && r2.progresso.eroe).toBeUndefined();
  });
});

import { cariche, dono, nomeStirpe, ABILITA, STIRPI } from '../src/lib/eroe';
describe('stirpi e abilità', () => {
  it('un eroe vecchio senza stirpe diventa umano', () => {
    const { stirpe: _s, ...vecchio } = eroePredefinito();
    expect(validaEroe(vecchio)!.stirpe).toBe('umano');
  });
  it('stirpe sconosciuta → umano; il dono del mezzelfo sopravvive alla Pergamena', () => {
    expect(validaEroe({ ...eroePredefinito(), stirpe: 'orco' })!.stirpe).toBe('umano');
    const e = { ...eroePredefinito(), stirpe: 'mezzelfo' as const, donoMezzelfo: 'halfling' as const };
    expect(dono(validaEroe(e)!)).toBe('halfling');
    expect(validaEroe({ ...e, donoMezzelfo: 'mezzelfo' })!.donoMezzelfo).toBeUndefined();
  });
  it('cariche: base 1, +1 con caratteristica ≥5, +1 umano; Guardiano sempre 1', () => {
    const base = { ...eroePredefinito(), stirpe: 'elfo' as const, classe: 'mago' as const, car: { logica: 3, intuizione: 3, pazienza: 4, curiosita: 4 } };
    expect(cariche(base)).toBe(1);
    expect(cariche({ ...base, car: { ...base.car, logica: 5 } })).toBe(2);
    expect(cariche({ ...base, stirpe: 'umano', car: { ...base.car, logica: 6 } })).toBe(3);
    expect(cariche({ ...base, stirpe: 'umano', car: { ...base.car, logica: 6 } }, true)).toBe(1);
  });
  it('ogni classe ha la sua abilità e la classe scaltro esiste', () => {
    expect(nomeClasse({ ...eroePredefinito(), corpo: 'femminile', classe: 'scaltro' })).toBe('Scaltra dei Trucchi');
    expect(Object.keys(ABILITA).length).toBe(6);
    expect(nomeStirpe({ ...eroePredefinito(), corpo: 'femminile', stirpe: 'nano' })).toBe('Nana');
    expect(Object.keys(STIRPI)).toEqual(['umano', 'elfo', 'nano', 'halfling', 'mezzelfo']);
  });
  it('avatar valido per ogni stirpe', () => {
    for (const s of Object.keys(STIRPI)) expect(avatarSvg({ ...eroePredefinito(), stirpe: s as never, corpo: 'maschile' })).toMatch(/<\/g><\/svg>$/);
  });
});
